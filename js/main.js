/**
 * Controller Principale del Gioco - "I Tre Porcellini"
 * Gestisce il Menù Principale, la Mappa delle Casette, il Salvataggio
 * e le meccaniche progressive per Casa di Paglia (Click) e Casa di Legno (Drag & Drop al livello giusto).
 */
(function (global) {
  const App = {
    state: null,
    activeHouseKey: null,
    isDraggingWood: false,
    dragPointerId: null,
    saveToastTimer: null,

    init() {
      this.cacheDOM();
      this.bindEvents();
      this.state = global.SaveSystem.load();
      this.refreshMenuUI();
      this.showScreen('menu', false);
      this.preloadImages();
    },

    cacheDOM() {
      // HUD
      this.btnHudMenu = document.getElementById('btn-hud-menu');
      this.btnHudMap = document.getElementById('btn-hud-map');
      this.hudTitleBadge = document.getElementById('hud-title-badge');
      this.saveToast = document.getElementById('save-toast');
      this.btnSoundToggle = document.getElementById('btn-sound-toggle');

      // Schermate
      this.screenMenu = document.getElementById('screen-menu');
      this.screenMap = document.getElementById('screen-map');
      this.screenBuilder = document.getElementById('screen-builder');

      // Menu Principale
      this.btnNewGame = document.getElementById('btn-new-game');
      this.btnContinueGame = document.getElementById('btn-continue-game');
      this.continueProgressLabel = document.getElementById('continue-progress-label');
      this.menuSaveSummary = document.getElementById('menu-save-summary');
      this.modalConfirmReset = document.getElementById('modal-confirm-reset');
      this.btnConfirmResetYes = document.getElementById('btn-confirm-reset-yes');
      this.btnConfirmResetNo = document.getElementById('btn-confirm-reset-no');

      // Mappa Casette
      this.cardStraw = document.getElementById('card-house-straw');
      this.cardWood = document.getElementById('card-house-wood');
      this.mapBarStraw = document.getElementById('map-bar-straw');
      this.mapStatusStraw = document.getElementById('map-status-straw');
      this.btnPlayStraw = document.getElementById('btn-play-straw');
      this.mapBarWood = document.getElementById('map-bar-wood');
      this.mapStatusWood = document.getElementById('map-status-wood');
      this.btnPlayWood = document.getElementById('btn-play-wood');
      this.lockOverlayWood = document.getElementById('lock-overlay-wood');

      // Builder
      this.builderPigAvatar = document.getElementById('builder-pig-avatar');
      this.builderPigName = document.getElementById('builder-pig-name');
      this.builderSpeechBubble = document.getElementById('builder-speech-bubble');
      this.builderStepCounter = document.getElementById('builder-step-counter');
      this.builderProgressFill = document.getElementById('builder-progress-fill');
      this.builderStarsRow = document.getElementById('builder-stars-row');
      this.btnRestartHouse = document.getElementById('btn-restart-house');

      this.houseCanvasBox = document.getElementById('house-canvas-box');
      this.houseStageImg = document.getElementById('house-stage-img');
      this.woodLevelsOverlay = document.getElementById('wood-levels-overlay');
      this.woodActiveTarget = document.getElementById('wood-active-target');
      this.woodTargetLabel = document.getElementById('wood-target-label');
      this.fxLayer = document.getElementById('fx-layer');

      // Strumenti Paglia e Legno
      this.toolPanelStraw = document.getElementById('tool-panel-straw');
      this.btnStrawPile = document.getElementById('btn-straw-pile');
      this.strawActionSubtext = document.getElementById('straw-action-subtext');

      this.toolPanelWood = document.getElementById('tool-panel-wood');
      this.woodLevelNameDisplay = document.getElementById('wood-level-name-display');
      this.draggableWoodPiece = document.getElementById('draggable-wood-piece');
      this.woodPieceIcon = document.getElementById('wood-piece-icon');
      this.woodPieceLabel = document.getElementById('wood-piece-label');
      this.woodFeedbackMsg = document.getElementById('wood-feedback-msg');
      this.dragGhost = document.getElementById('drag-ghost');
      this.ghostIcon = document.getElementById('ghost-icon');

      // Modale Vittoria
      this.modalVictory = document.getElementById('modal-victory');
      this.victoryTitle = document.getElementById('victory-title');
      this.victoryMessage = document.getElementById('victory-message');
      this.victoryHouseImg = document.getElementById('victory-house-img');
      this.btnVictoryNext = document.getElementById('btn-victory-next');
      this.btnVictoryMap = document.getElementById('btn-victory-map');
      this.btnVictoryReplay = document.getElementById('btn-victory-replay');
    },

    bindEvents() {
      // HUD
      this.btnHudMenu.addEventListener('click', () => {
        global.SoundFX.click();
        this.refreshMenuUI();
        this.showScreen('menu');
      });

      this.btnHudMap.addEventListener('click', () => {
        global.SoundFX.click();
        this.refreshMapUI();
        this.showScreen('map');
      });

      this.btnSoundToggle.addEventListener('click', () => {
        const enabled = global.SoundFX.toggle();
        this.btnSoundToggle.textContent = enabled ? '🔊' : '🔇';
      });

      // Menu Principale
      this.btnNewGame.addEventListener('click', () => {
        global.SoundFX.click();
        const current = global.SaveSystem.load();
        const hasProgress =
          current.houses.straw.currentStep > 0 ||
          current.houses.wood.currentStep > 0;

        if (hasProgress) {
          this.modalConfirmReset.classList.remove('hidden');
        } else {
          this.startNewGame();
        }
      });

      this.btnConfirmResetYes.addEventListener('click', () => {
        global.SoundFX.click();
        this.modalConfirmReset.classList.add('hidden');
        this.startNewGame();
      });

      this.btnConfirmResetNo.addEventListener('click', () => {
        global.SoundFX.click();
        this.modalConfirmReset.classList.add('hidden');
      });

      this.btnContinueGame.addEventListener('click', () => {
        global.SoundFX.click();
        this.state = global.SaveSystem.load();
        this.refreshMapUI();
        this.showScreen('map');
      });

      // Mappa Casette
      this.cardStraw.addEventListener('click', () => {
        global.SoundFX.click();
        this.openHouseBuilder('straw');
      });

      this.cardWood.addEventListener('click', () => {
        this.state = global.SaveSystem.load();
        if (!this.state.houses.wood.unlocked) {
          global.SoundFX.gentleWrong();
          return;
        }
        global.SoundFX.click();
        this.openHouseBuilder('wood');
      });

      // Ricomincia singola casetta
      this.btnRestartHouse.addEventListener('click', () => {
        if (!this.activeHouseKey) return;
        global.SoundFX.click();
        this.state = global.SaveSystem.restartHouse(this.activeHouseKey);
        this.triggerSaveToast();
        this.renderBuilderState();
      });

      // Costruzione Casa di Paglia: Click sul mucchio di paglia
      this.btnStrawPile.addEventListener('click', () => {
        this.handleStrawClick();
      });

      // Costruzione Casa di Legno: Drag & Drop unificato (Pointer Events)
      this.setupWoodDragAndDrop();

      // Bottoni Modale Vittoria
      this.btnVictoryNext.addEventListener('click', () => {
        global.SoundFX.click();
        this.modalVictory.classList.add('hidden');
        if (this.activeHouseKey === 'straw') {
          this.openHouseBuilder('wood');
        } else {
          this.refreshMapUI();
          this.showScreen('map');
        }
      });

      this.btnVictoryMap.addEventListener('click', () => {
        global.SoundFX.click();
        this.modalVictory.classList.add('hidden');
        this.refreshMapUI();
        this.showScreen('map');
      });

      this.btnVictoryReplay.addEventListener('click', () => {
        global.SoundFX.click();
        this.modalVictory.classList.add('hidden');
        if (this.activeHouseKey) {
          this.state = global.SaveSystem.restartHouse(this.activeHouseKey);
          this.triggerSaveToast();
          this.renderBuilderState();
        }
      });
    },

    /**
     * Avvia una Nuova Partita azzerando il salvataggio e aprendo la mappa.
     */
    startNewGame() {
      this.state = global.SaveSystem.reset();
      this.triggerSaveToast();
      this.refreshMapUI();
      this.showScreen('map');
    },

    /**
     * Mostra l'indicatore "Salvato" nell'HUD superiore.
     */
    triggerSaveToast() {
      this.saveToast.classList.add('show');
      if (this.saveToastTimer) clearTimeout(this.saveToastTimer);
      this.saveToastTimer = setTimeout(() => {
        this.saveToast.classList.remove('show');
      }, 1600);
    },

    /**
     * Cambia schermata attiva e aggiorna i pulsanti della barra superiore.
     */
    showScreen(screenName, persistScene = true) {
      this.screenMenu.classList.add('hidden');
      this.screenMap.classList.add('hidden');
      this.screenBuilder.classList.add('hidden');

      if (screenName === 'menu') {
        this.screenMenu.classList.remove('hidden');
        this.btnHudMenu.classList.add('hidden');
        this.btnHudMap.classList.add('hidden');
        this.hudTitleBadge.textContent = '🐷 I Tre Porcellini';
      } else if (screenName === 'map') {
        this.screenMap.classList.remove('hidden');
        this.btnHudMenu.classList.remove('hidden');
        this.btnHudMap.classList.add('hidden');
        this.hudTitleBadge.textContent = '🗺️ Mappa delle Casette';
      } else if (screenName === 'builder') {
        this.screenBuilder.classList.remove('hidden');
        this.btnHudMenu.classList.remove('hidden');
        this.btnHudMap.classList.remove('hidden');
        const cfg = global.HOUSES_CONFIG[this.activeHouseKey];
        this.hudTitleBadge.textContent = cfg ? `🔨 ${cfg.title}` : '🔨 Costruzione';
      }

      if (persistScene && screenName !== 'menu') {
        this.state = global.SaveSystem.setScene(screenName);
      }
    },

    /**
     * Aggiorna il Menù Principale in base ai progressi salvati in localStorage.
     */
    refreshMenuUI() {
      this.state = global.SaveSystem.load();
      const straw = this.state.houses.straw;
      const wood = this.state.houses.wood;
      const hasSaved = global.SaveSystem.hasSavedGame();

      if (hasSaved) {
        this.btnContinueGame.classList.remove('hidden');
        const strawTxt = straw.completed ? 'Paglia ✅' : `Paglia ${straw.currentStep}/${straw.maxSteps}`;
        const woodTxt = wood.completed
          ? 'Legno ✅'
          : wood.unlocked
          ? `Legno ${wood.currentStep}/${wood.maxSteps}`
          : 'Legno 🔒';
        this.continueProgressLabel.textContent = `${strawTxt} • ${woodTxt}`;
        this.menuSaveSummary.textContent = `💾 Progressi salvati trovati: ${strawTxt} | ${woodTxt}`;
      } else {
        this.btnContinueGame.classList.add('hidden');
        this.menuSaveSummary.textContent = '✨ Inizia una Nuova Partita per costruire le casette!';
      }
    },

    /**
     * Aggiorna le card nella schermata Mappa delle Casette.
     */
    refreshMapUI() {
      this.state = global.SaveSystem.load();
      const straw = this.state.houses.straw;
      const wood = this.state.houses.wood;

      // Card 1: Paglia
      const strawPct = Math.round((straw.currentStep / straw.maxSteps) * 100);
      this.mapBarStraw.style.width = `${strawPct}%`;
      this.mapStatusStraw.textContent = straw.completed
        ? '✅ Completata! (9 / 9)'
        : `${straw.currentStep} / ${straw.maxSteps} passaggi`;
      this.btnPlayStraw.textContent = straw.completed
        ? '🌾 Rigioca o Guarda!'
        : straw.currentStep > 0
        ? '🌾 Continua!'
        : '🌾 Costruisci!';

      // Card 2: Legno
      const woodPct = Math.round((wood.currentStep / wood.maxSteps) * 100);
      this.mapBarWood.style.width = `${woodPct}%`;

      if (wood.unlocked) {
        this.cardWood.classList.remove('locked');
        this.cardWood.classList.add('unlocked');
        this.lockOverlayWood.classList.add('hidden');
        this.btnPlayWood.disabled = false;
        this.mapStatusWood.textContent = wood.completed
          ? '✅ Completata! (10 / 10)'
          : `${wood.currentStep} / ${wood.maxSteps} passaggi`;
        this.btnPlayWood.textContent = wood.completed
          ? '🪵 Rigioca o Guarda!'
          : wood.currentStep > 0
          ? '🪵 Continua!'
          : '🪵 Costruisci!';
      } else {
        this.cardWood.classList.add('locked');
        this.cardWood.classList.remove('unlocked');
        this.lockOverlayWood.classList.remove('hidden');
        this.btnPlayWood.disabled = true;
        this.mapStatusWood.textContent = '🔒 Completa prima la Paglia';
        this.btnPlayWood.textContent = '🔒 Bloccata';
      }
    },

    /**
     * Apre il cantiere di costruzione per la casa selezionata ('straw' o 'wood').
     */
    openHouseBuilder(houseKey) {
      this.activeHouseKey = houseKey;
      this.state = global.SaveSystem.load();
      this.modalVictory.classList.add('hidden');
      this.showScreen('builder');
      this.renderBuilderState();
    },

    /**
     * Renderizza lo stato corrente del cantiere (immagine casa, fumetto, barra, strumenti).
     */
    renderBuilderState() {
      const houseKey = this.activeHouseKey;
      const cfg = global.HOUSES_CONFIG[houseKey];
      const houseState = this.state.houses[houseKey];
      const step = houseState.currentStep;
      const maxSteps = houseState.maxSteps;

      // Aggiorna Porcellino guida
      this.builderPigAvatar.src = cfg.pigAvatar;
      this.builderPigName.textContent = cfg.pigName;

      const stepInfo = cfg.stepsInfo[step] || cfg.stepsInfo[cfg.stepsInfo.length - 1];
      this.builderSpeechBubble.textContent = stepInfo.hint;

      // Aggiorna Progresso e Stelline
      this.builderStepCounter.textContent = `${step} / ${maxSteps}`;
      const pct = Math.round((step / maxSteps) * 100);
      this.builderProgressFill.style.width = `${pct}%`;

      let starsHtml = '';
      for (let i = 1; i <= maxSteps; i++) {
        starsHtml += i <= step ? '⭐' : '☆';
      }
      this.builderStarsRow.textContent = starsHtml;

      // Aggiorna Immagine della Casetta
      const imgFile = cfg.images[Math.min(step, cfg.images.length - 1)];
      this.houseStageImg.src = imgFile;
      this.houseStageImg.classList.remove('pop-anim');
      void this.houseStageImg.offsetWidth; // trigger reflow
      this.houseStageImg.classList.add('pop-anim');

      // Configura pannello strumenti specifico (Paglia vs Legno)
      if (houseKey === 'straw') {
        this.toolPanelStraw.classList.remove('hidden');
        this.toolPanelWood.classList.add('hidden');
        this.woodLevelsOverlay.classList.add('hidden');
        this.strawActionSubtext.textContent = stepInfo.actionLabel || '';
      } else if (houseKey === 'wood') {
        this.toolPanelStraw.classList.add('hidden');
        this.toolPanelWood.classList.remove('hidden');

        if (step < maxSteps && stepInfo.targetZone) {
          this.woodLevelsOverlay.classList.remove('hidden');
          const tz = stepInfo.targetZone;
          this.woodActiveTarget.style.top = `${tz.top}%`;
          this.woodActiveTarget.style.left = `${tz.left}%`;
          this.woodActiveTarget.style.width = `${tz.width}%`;
          this.woodActiveTarget.style.height = `${tz.height}%`;
          this.woodTargetLabel.textContent = stepInfo.levelName;
          this.woodLevelNameDisplay.textContent = stepInfo.levelName;
          this.woodPieceIcon.textContent = stepInfo.itemIcon || '🪵';
          this.ghostIcon.textContent = stepInfo.itemIcon || '🪵';
          this.woodPieceLabel.textContent = `Trascina: ${stepInfo.itemLabel}`;
          this.draggableWoodPiece.classList.remove('hidden');
        } else {
          this.woodLevelsOverlay.classList.add('hidden');
          this.woodLevelNameDisplay.textContent = 'Casetta Completata!';
          this.draggableWoodPiece.classList.add('hidden');
        }
      }
    },

    /**
     * Gestisce il Click / Tap sul mucchio di paglia (Livello 1).
     */
    handleStrawClick() {
      if (this.activeHouseKey !== 'straw') return;
      const houseState = this.state.houses.straw;

      if (houseState.currentStep >= houseState.maxSteps) {
        this.showVictoryModal('straw');
        return;
      }

      const nextStep = houseState.currentStep + 1;
      global.SoundFX.strawPlace(nextStep);
      this.spawnParticles(['🌾', '✨', '🌾', '⭐'], 50, 50);

      this.state = global.SaveSystem.updateHouseStep('straw', nextStep);
      this.triggerSaveToast();
      this.renderBuilderState();

      if (nextStep >= houseState.maxSteps) {
        setTimeout(() => {
          global.SoundFX.victory();
          this.showVictoryModal('straw');
        }, 650);
      }
    },

    /**
     * Configura il Drag & Drop con Pointer Events per la Casa di Legno (Livello 2).
     */
    setupWoodDragAndDrop() {
      const piece = this.draggableWoodPiece;

      piece.addEventListener('pointerdown', (e) => {
        if (this.activeHouseKey !== 'wood') return;
        const houseState = this.state.houses.wood;
        if (houseState.currentStep >= houseState.maxSteps) return;

        e.preventDefault();
        this.isDraggingWood = true;
        this.dragPointerId = e.pointerId;
        piece.classList.add('dragging-source');

        this.dragGhost.classList.remove('hidden');
        this.moveDragGhost(e.clientX, e.clientY);
        global.SoundFX.click();
      });

      window.addEventListener('pointermove', (e) => {
        if (!this.isDraggingWood || e.pointerId !== this.dragPointerId) return;
        this.moveDragGhost(e.clientX, e.clientY);

        if (this.isPointInElement(e.clientX, e.clientY, this.woodActiveTarget, 24)) {
          this.woodActiveTarget.classList.add('drag-hover');
        } else {
          this.woodActiveTarget.classList.remove('drag-hover');
        }
      });

      const endDrag = (e) => {
        if (!this.isDraggingWood || e.pointerId !== this.dragPointerId) return;
        this.isDraggingWood = false;
        this.dragPointerId = null;

        piece.classList.remove('dragging-source');
        this.dragGhost.classList.add('hidden');
        this.woodActiveTarget.classList.remove('drag-hover');

        this.evaluateWoodDrop(e.clientX, e.clientY);
      };

      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);

      // Supporto accessibilità da tastiera (Invio o Spazio)
      piece.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.advanceWoodStep(50, 50);
        }
      });
    },

    moveDragGhost(clientX, clientY) {
      this.dragGhost.style.left = `${clientX}px`;
      this.dragGhost.style.top = `${clientY}px`;
    },

    /**
     * Verifica se il punto (x, y) cade dentro un elemento DOM (con margine di tolleranza per bambini).
     */
    isPointInElement(x, y, el, tolerancePx = 20) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        x >= rect.left - tolerancePx &&
        x <= rect.right + tolerancePx &&
        y >= rect.top - tolerancePx &&
        y <= rect.bottom + tolerancePx
      );
    },

    /**
     * Valuta dove il bambino ha rilasciato la legna:
     * - Se è nel livello giusto (#wood-active-target): avanza di step!
     * - Se è sulla casa ma a un livello sbagliato: dà un suggerimento su dove andare (più su / più giù).
     */
    evaluateWoodDrop(clientX, clientY) {
      if (this.activeHouseKey !== 'wood') return;
      const houseState = this.state.houses.wood;
      if (houseState.currentStep >= houseState.maxSteps) return;

      // 1. Controlla se rilasciato nel livello giusto (con tolleranza generosa di 28px)
      if (this.isPointInElement(clientX, clientY, this.woodActiveTarget, 28)) {
        const boxRect = this.houseCanvasBox.getBoundingClientRect();
        const relX = ((clientX - boxRect.left) / boxRect.width) * 100;
        const relY = ((clientY - boxRect.top) / boxRect.height) * 100;
        this.advanceWoodStep(relX, relY);
        return;
      }

      // 2. Controlla se rilasciato sulla casa ma al livello sbagliato
      if (this.isPointInElement(clientX, clientY, this.houseCanvasBox, 0)) {
        global.SoundFX.gentleWrong();
        const targetRect = this.woodActiveTarget.getBoundingClientRect();
        const targetCenterY = (targetRect.top + targetRect.bottom) / 2;

        this.woodActiveTarget.classList.remove('wrong-flash');
        void this.woodActiveTarget.offsetWidth;
        this.woodActiveTarget.classList.add('wrong-flash');

        if (clientY < targetCenterY) {
          this.builderSpeechBubble.textContent =
            'Ops! Lì è troppo in ALTO! Porta la legna più in BASSO nella zona verde illuminata!';
        } else {
          this.builderSpeechBubble.textContent =
            'Ops! Lì è troppo in BASSO! Porta la legna più in ALTO nella zona verde illuminata!';
        }
        return;
      }

      // 3. Rilasciato fuori dalla casa
      global.SoundFX.gentleWrong();
      this.builderSpeechBubble.textContent =
        'Trascina la legna fin dentro il riquadro verde tratteggiato sulla casa!';
    },

    /**
     * Avanza di uno step nella costruzione della Casa di Legno.
     */
    advanceWoodStep(fxPercentX = 50, fxPercentY = 50) {
      const houseState = this.state.houses.wood;
      const nextStep = houseState.currentStep + 1;

      global.SoundFX.woodPlace(nextStep);
      this.spawnParticles(['🪵', '🔨', '⭐', '✨'], fxPercentX, fxPercentY);

      this.state = global.SaveSystem.updateHouseStep('wood', nextStep);
      this.triggerSaveToast();
      this.renderBuilderState();

      if (nextStep >= houseState.maxSteps) {
        setTimeout(() => {
          global.SoundFX.victory();
          this.showVictoryModal('wood');
        }, 650);
      }
    },

    /**
     * Mostra la modale festosa di completamento casetta.
     */
    showVictoryModal(houseKey) {
      const cfg = global.HOUSES_CONFIG[houseKey];
      const finalImg = cfg.images[cfg.images.length - 1];
      this.victoryHouseImg.src = finalImg;

      if (houseKey === 'straw') {
        this.victoryTitle.textContent = '🎉 Casetta di Paglia Completata!';
        this.victoryMessage.textContent =
          'Bravissimo! Hai costruito tutta la Casetta di Paglia e hai sbloccato la Casetta di Legno!';
        this.btnVictoryNext.classList.remove('hidden');
        this.btnVictoryNext.textContent = '🪵 Costruisci la Casetta di Legno!';
      } else if (houseKey === 'wood') {
        this.victoryTitle.textContent = '🏆 Casetta di Legno Completata!';
        this.victoryMessage.textContent =
          'Straordinario! Hai portato tutte le legna al livello giusto della casa! I tuoi progressi sono salvati!';
        this.btnVictoryNext.classList.add('hidden');
      }

      this.modalVictory.classList.remove('hidden');
    },

    /**
     * Genera particelle celebrative nell'area della casa.
     */
    spawnParticles(emojis, originXPercent = 50, originYPercent = 50) {
      for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');
        span.className = 'fx-particle';
        span.textContent = emojis[i % emojis.length];
        span.style.left = `${originXPercent}%`;
        span.style.top = `${originYPercent}%`;

        const angle = (Math.PI * 2 * i) / 8;
        const dist = 55 + Math.random() * 55;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 20;
        const rot = Math.round((Math.random() - 0.5) * 140);

        span.style.setProperty('--tx', `${tx}px`);
        span.style.setProperty('--ty', `${ty}px`);
        span.style.setProperty('--rot', `${rot}deg`);

        this.fxLayer.appendChild(span);
        setTimeout(() => span.remove(), 800);
      }
    },

    /**
     * Precarica le immagini delle casette per transizioni fluide istantanee.
     */
    preloadImages() {
      const allImages = [
        ...global.HOUSES_CONFIG.straw.images,
        ...global.HOUSES_CONFIG.wood.images,
        'Porcellini uniti.jfif',
        'Porcellino paglia.jfif',
        'Porcellino legno.jfif',
        'Porcellino mattoni.jfif'
      ];
      allImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });

  global.GameApp = App;
})(window);
