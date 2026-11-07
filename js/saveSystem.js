/**
 * Sistema di Salvataggio Progressi - "I Tre Porcellini"
 * Salva e carica automaticamente i progressi in localStorage.
 */
(function (global) {
  const STORAGE_KEY = 'tre_porcellini_save_v1';

  function createDefaultState() {
    return {
      version: 1,
      hasStarted: false,
      currentScene: 'menu', // 'menu' | 'map' | 'straw' | 'wood' | 'brick' | 'wolf'
      houses: {
        straw: {
          unlocked: true,
          completed: false,
          currentStep: 0,
          maxSteps: 9
        },
        wood: {
          unlocked: false,
          completed: false,
          currentStep: 0,
          maxSteps: 10
        },
        brick: {
          unlocked: false,
          completed: false,
          currentStep: 0,
          maxSteps: 11
        }
      },
      wolfPhase: {
        unlocked: false,
        completed: false,
        currentStage: 0
      },
      lastUpdated: new Date().toISOString()
    };
  }

  const SaveSystem = {
    STORAGE_KEY,

    /**
     * Carica lo stato dal localStorage o restituisce lo stato di default.
     */
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createDefaultState();
        const parsed = JSON.parse(raw);
        const def = createDefaultState();
        // Merge sicuro con lo schema di default per compatibilità futura
        return {
          ...def,
          ...parsed,
          houses: {
            straw: { ...def.houses.straw, ...(parsed.houses && parsed.houses.straw) },
            wood: { ...def.houses.wood, ...(parsed.houses && parsed.houses.wood) },
            brick: { ...def.houses.brick, ...(parsed.houses && parsed.houses.brick) }
          },
          wolfPhase: {
            ...def.wolfPhase,
            ...(parsed.wolfPhase || {})
          }
        };
      } catch (err) {
        console.warn('Impossibile leggere il salvataggio dal localStorage, uso stato predefinito:', err);
        return createDefaultState();
      }
    },

    /**
     * Salva lo stato corrente in localStorage.
     */
    save(state) {
      try {
        const toSave = {
          ...state,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        return toSave;
      } catch (err) {
        console.warn('Impossibile salvare nel localStorage:', err);
        return state;
      }
    },

    /**
     * Inizia una Nuova Partita azzerando i progressi precedenti.
     */
    reset() {
      const freshState = createDefaultState();
      freshState.hasStarted = true;
      freshState.currentScene = 'map';
      return this.save(freshState);
    },

    /**
     * Verifica se esiste una partita salvata già avviata.
     */
    hasSavedGame() {
      const state = this.load();
      if (!state.hasStarted) return false;
      const strawProgress = state.houses.straw.currentStep > 0 || state.houses.straw.completed;
      const woodProgress = state.houses.wood.currentStep > 0 || state.houses.wood.completed;
      return state.hasStarted || strawProgress || woodProgress;
    },

    /**
     * Aggiorna la scena corrente.
     */
    setScene(sceneName) {
      const state = this.load();
      state.hasStarted = true;
      state.currentScene = sceneName;
      return this.save(state);
    },

    /**
     * Aggiorna lo step di costruzione di una casa e sblocca la successiva se completata.
     */
    updateHouseStep(houseKey, newStep) {
      const state = this.load();
      const house = state.houses[houseKey];
      if (!house) return state;

      state.hasStarted = true;
      const clampedStep = Math.max(0, Math.min(newStep, house.maxSteps));
      house.currentStep = clampedStep;

      if (clampedStep >= house.maxSteps) {
        house.completed = true;
        if (houseKey === 'straw') {
          state.houses.wood.unlocked = true;
        } else if (houseKey === 'wood') {
          state.houses.brick.unlocked = true;
        } else if (houseKey === 'brick') {
          state.wolfPhase.unlocked = true;
        }
      }

      return this.save(state);
    },

    /**
     * Riporta una singola casa allo step 0 per rigiocarla senza perdere le altre.
     */
    restartHouse(houseKey) {
      const state = this.load();
      const house = state.houses[houseKey];
      if (!house) return state;
      house.currentStep = 0;
      return this.save(state);
    }
  };

  global.SaveSystem = SaveSystem;
})(window);
