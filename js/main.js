/**
 * Controller Principale del Gioco - "I Tre Porcellini"
 * Gestisce il Menù Principale, la Mappa delle Casette, il Salvataggio,
 * la Voce Narrante femminile per bambini in età prescolare, l'animazione
 * della Manina Guida e le meccaniche progressive per:
 * - Casa di Paglia (Click sul mucchio di paglia)
 * - Casa di Legno (Drag & Drop della legna al livello giusto della casa)
 * - Casa di Malta e Mattoni (Alternanza: spargere la malta strofinando la cazzuola avanti e indietro nel riquadro -> posare i mattoni al livello giusto)
 */
(function (global) {
  const App = {
    state: null,
    currentScreen: 'menu',
    activeHouseKey: null,
    isDraggingWood: false,
    isDraggingBrickTool: false,
    activeBrickToolType: null, // 'trowel' | 'brick'
    mortarScrubProgress: 0,
    lastScrubX: null,
    lastScrubY: null,
    dragPointerId: null,
    saveToastTimer: null,
    handGuideRaf: null,

    init() {
      this.cacheDOM();
      this.bindEvents();
      this.state = global.SaveSystem.load();
      this.refreshMenuUI();
      this.showScreen('menu', false);
      this.preloadImages();
    },

    cacheDOM() {
      this.gameStage = document.getElementById('game-stage');
      this.kidHandGuide = document.getElementById('kid-hand-guide');

      // HUD
      this.btnHudMenu = document.getElementById('btn-hud-menu');
      this.btnHudMap = document.getElementById('btn-hud-map');
      this.hudTitleBadge = document.getElementById('hud-title-badge');
      this.saveToast = document.getElementById('save-toast');
      this.btnSoundToggle = document.getElementById('btn-sound-toggle');
      this.btnFullscreenToggle = document.getElementById('btn-fullscreen-toggle');

      // Schermate
      this.screenMenu = document.getElementById('screen-menu');
      this.screenMap = document.getElementById('screen-map');
      this.screenBuilder = document.getElementById('screen-builder');

      // Menu Principale
      this.btnMenuVoice = document.getElementById('btn-menu-voice');
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
      this.cardBrick = document.getElementById('card-house-brick');
      this.mapBarStraw = document.getElementById('map-bar-straw');
      this.mapStatusStraw = document.getElementById('map-status-straw');
      this.btnPlayStraw = document.getElementById('btn-play-straw');
      this.mapBarWood = document.getElementById('map-bar-wood');
      this.mapStatusWood = document.getElementById('map-status-wood');
      this.btnPlayWood = document.getElementById('btn-play-wood');
      this.lockOverlayWood = document.getElementById('lock-overlay-wood');
      this.mapBarBrick = document.getElementById('map-bar-brick');
      this.mapStatusBrick = document.getElementById('map-status-brick');
      this.btnPlayBrick = document.getElementById('btn-play-brick');
      this.lockOverlayBrick = document.getElementById('lock-overlay-brick');

      // Builder
      this.pigHelperCard = document.getElementById('pig-helper-card');
      this.builderPigAvatar = document.getElementById('builder-pig-avatar');
      this.builderPigName = document.getElementById('builder-pig-name');
      this.builderSpeechBubble = document.getElementById('builder-speech-bubble');
      this.btnRepeatVoice = document.getElementById('btn-repeat-voice');
      this.builderStepCounter = document.getElementById('builder-step-counter');
      this.builderProgressFill = document.getElementById('builder-progress-fill');
      this.builderStarsRow = document.getElementById('builder-stars-row');
      this.btnRestartHouse = document.getElementById('btn-restart-house');

      this.houseCanvasBox = document.getElementById('house-canvas-box');
      this.houseStageImg = document.getElementById('house-stage-img');
      this.woodLevelsOverlay = document.getElementById('wood-levels-overlay');
      this.woodActiveTarget = document.getElementById('wood-active-target');
      this.woodTargetLabel = document.getElementById('wood-target-label');
      this.mortarSpreadLayer = document.getElementById('mortar-spread-layer');
      this.mortarSpreadFill = document.getElementById('mortar-spread-fill');
      this.upperMortarVisual = document.getElementById('upper-mortar-visual');
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

      // Strumenti Casa di Malta e Mattoni
      this.toolPanelBrick = document.getElementById('tool-panel-brick');
      this.brickLevelNameDisplay = document.getElementById('brick-level-name-display');
      this.trowelSourceSlot = document.getElementById('trowel-source-slot');
      this.draggableTrowelPiece = document.getElementById('draggable-trowel-piece');
      this.trowelPieceLabel = document.getElementById('trowel-piece-label');
      this.trowelScrubBar = document.getElementById('trowel-scrub-bar');
      this.trowelStatusText = document.getElementById('trowel-status-text');
      this.brickSourceSlot = document.getElementById('brick-source-slot');
      this.draggableBrickPiece = document.getElementById('draggable-brick-piece');
      this.brickPieceLabel = document.getElementById('brick-piece-label');
      this.brickStatusText = document.getElementById('brick-status-text');

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
        if (enabled) {
          global.SoundFX.repeatLastSpeech();
        }
      });

      // Pulsanti Voce Narrante per bambini
      if (this.btnMenuVoice) {
        this.btnMenuVoice.addEventListener('click', () => {
          global.SoundFX.click();
          this.speakMenuWelcome();
        });
      }

      if (this.btnRepeatVoice) {
        this.btnRepeatVoice.addEventListener('click', (e) => {
          e.stopPropagation();
          global.SoundFX.click();
          global.SoundFX.repeatLastSpeech();
          this.scheduleHandGuideUpdate();
        });
      }

      if (this.pigHelperCard) {
        this.pigHelperCard.addEventListener('click', () => {
          global.SoundFX.repeatLastSpeech();
        });
      }

      // Ricalcola posizione manina su resize / cambio orientamento
      window.addEventListener('resize', () => {
        this.scheduleHandGuideUpdate();
      });

      // Schermo Intero On/Off
      if (this.btnFullscreenToggle) {
        this.btnFullscreenToggle.addEventListener('click', () => {
          global.SoundFX.click();
          this.toggleFullscreen();
        });

        const updateFsIcon = () => {
          const isFs = !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
          );
          this.btnFullscreenToggle.textContent = isFs ? '🗗' : '⛶';
          this.btnFullscreenToggle.title = isFs
            ? 'Esci dallo Schermo Intero'
            : 'Attiva Schermo Intero';
          this.scheduleHandGuideUpdate();
        };

        document.addEventListener('fullscreenchange', updateFsIcon);
        document.addEventListener('webkitfullscreenchange', updateFsIcon);
        document.addEventListener('mozfullscreenchange', updateFsIcon);
        document.addEventListener('MSFullscreenChange', updateFsIcon);
      }

      // Menu Principale
      this.btnNewGame.addEventListener('click', () => {
        global.SoundFX.click();
        const current = global.SaveSystem.load();
        const hasProgress =
          current.houses.straw.currentStep > 0 ||
          current.houses.wood.currentStep > 0 ||
          current.houses.brick.currentStep > 0;

        if (hasProgress) {
          this.modalConfirmReset.classList.remove('hidden');
          this.hideKidHandGuide();
          global.SoundFX.speak(
            'Vuoi ricominciare da capo tutte le casette? Tocca il pulsante verde per ricominciare, oppure quello grigio per tornare indietro!'
          );
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
        this.scheduleHandGuideUpdate();
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
          global.SoundFX.speak(
            'Questa casetta di legno ha ancora il lucchetto! Costruiamo prima tutta la casetta di paglia!'
          );
          return;
        }
        global.SoundFX.click();
        this.openHouseBuilder('wood');
      });

      this.cardBrick.addEventListener('click', () => {
        this.state = global.SaveSystem.load();
        if (!this.state.houses.brick.unlocked) {
          global.SoundFX.gentleWrong();
          global.SoundFX.speak(
            'La casetta di mattoni ha ancora il lucchetto! Finisci prima la casetta di legno!'
          );
          return;
        }
        global.SoundFX.click();
        this.openHouseBuilder('brick');
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

      // Costruzione Casa di Legno e Casa di Mattoni: Drag & Drop / Passaggio Cazzuola
      this.setupWoodDragAndDrop();
      this.setupBrickInteractions();

      // Bottoni Modale Vittoria
      this.btnVictoryNext.addEventListener('click', () => {
        global.SoundFX.click();
        this.modalVictory.classList.add('hidden');
        if (this.activeHouseKey === 'straw') {
          this.openHouseBuilder('wood');
        } else if (this.activeHouseKey === 'wood') {
          this.openHouseBuilder('brick');
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
     * Pronuncia l'invito iniziale ai bambini nella schermata del Menù Principale.
     */
    speakMenuWelcome() {
      const hasSaved = global.SaveSystem.hasSavedGame();
      if (hasSaved) {
        global.SoundFX.speak(
          'Ciao bimbi! Aiutiamo insieme i tre porcellini a costruire le loro casette! Toccate il pulsante dove c\'è la manina per continuare a giocare!'
        );
      } else {
        global.SoundFX.speak(
          'Ciao bimbi! Aiutiamo insieme i tre porcellini a costruire le loro casette! Toccate il pulsante verde dove c\'è la manina per iniziare!'
        );
      }
    },

    /**
     * Pronuncia la spiegazione vocale nella Mappa delle Casette.
     */
    speakMapWelcome() {
      this.state = global.SaveSystem.load();
      const straw = this.state.houses.straw;
      const wood = this.state.houses.wood;
      const brick = this.state.houses.brick;

      if (!straw.completed) {
        global.SoundFX.speak(
          'Ecco le tre casette! Iniziamo dalla Casetta di Paglia gialla! Toccate la carta dove batte la manina!'
        );
      } else if (wood.unlocked && !wood.completed) {
        global.SoundFX.speak(
          'Evviva! Adesso possiamo costruire la Casetta di Legno! Toccate la carta al centro dove batte la manina!'
        );
      } else if (brick.unlocked && !brick.completed) {
        global.SoundFX.speak(
          'Che bravi! Ora costruiamo la grande Casetta di Malta e Mattoni! Toccate la carta a destra dove batte la manina!'
        );
      } else {
        global.SoundFX.speak(
          'Siete stati bravissimi, avete costruito tutte le casette dei tre porcellini! Toccate una casetta per rigiocare!'
        );
      }
    },

    /**
     * Aggiorna il fumetto del porcellino e pronuncia il messaggio con la voce femminile italiana.
     */
    setSpeechAndSpeak(text) {
      this.builderSpeechBubble.textContent = text;
      global.SoundFX.speak(text);
    },

    /**
     * Nasconde temporaneamente la manina guida (es. durante il trascinamento o con modale aperta).
     */
    hideKidHandGuide() {
      if (!this.kidHandGuide) return;
      this.kidHandGuide.classList.add('hidden');
      this.kidHandGuide.classList.remove('gesture-tap', 'gesture-drag', 'gesture-scrub');
    },

    /**
     * Pianifica il ricalcolo della posizione della manina guida al prossimo frame di layout.
     */
    scheduleHandGuideUpdate() {
      if (this.handGuideRaf) {
        cancelAnimationFrame(this.handGuideRaf);
      }
      this.handGuideRaf = requestAnimationFrame(() => {
        this.updateKidHandGuide();
      });
    },

    /**
     * Restituisce le coordinate (x, y, width, height, left, right) di un elemento rispetto a #game-stage.
     */
    getStageRelativeBox(el) {
      if (!el || !this.gameStage) return null;
      const stageRect = this.gameStage.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return null;

      return {
        cx: rect.left - stageRect.left + rect.width * 0.5,
        cy: rect.top - stageRect.top + rect.height * 0.5,
        left: rect.left - stageRect.left,
        right: rect.right - stageRect.left,
        top: rect.top - stageRect.top,
        bottom: rect.bottom - stageRect.top,
        width: rect.width,
        height: rect.height
      };
    },

    /**
     * Posiziona e anima la manina da bimbo (#kid-hand-guide) per mostrare visivamente
     * ai bambini in età prescolare quale gesto compiere (toccare, trascinare o strofinare la malta).
     */
    updateKidHandGuide() {
      if (!this.kidHandGuide || !this.gameStage) return;

      // Se l'utente sta già trascinando o c'è una modale aperta, nascondi la manina
      const modalOpen =
        !this.modalVictory.classList.contains('hidden') ||
        !this.modalConfirmReset.classList.contains('hidden');

      if (this.isDraggingWood || this.isDraggingBrickTool || modalOpen) {
        this.hideKidHandGuide();
        return;
      }

      const hand = this.kidHandGuide;
      hand.classList.remove('gesture-tap', 'gesture-drag', 'gesture-scrub');

      if (this.currentScreen === 'menu') {
        const targetBtn = !this.btnContinueGame.classList.contains('hidden')
          ? this.btnContinueGame
          : this.btnNewGame;
        const box = this.getStageRelativeBox(targetBtn);
        if (!box) {
          this.hideKidHandGuide();
          return;
        }
        hand.style.setProperty('--hand-start-x', `${Math.round(box.cx + 35)}px`);
        hand.style.setProperty('--hand-start-y', `${Math.round(box.cy + 10)}px`);
        hand.classList.remove('hidden');
        hand.classList.add('gesture-tap');
        return;
      }

      if (this.currentScreen === 'map') {
        const straw = this.state.houses.straw;
        const wood = this.state.houses.wood;
        const brick = this.state.houses.brick;

        let targetBtn = this.btnPlayStraw;
        if (straw.completed && wood.unlocked && !wood.completed) {
          targetBtn = this.btnPlayWood;
        } else if (wood.completed && brick.unlocked && !brick.completed) {
          targetBtn = this.btnPlayBrick;
        }

        const box = this.getStageRelativeBox(targetBtn);
        if (!box) {
          this.hideKidHandGuide();
          return;
        }
        hand.style.setProperty('--hand-start-x', `${Math.round(box.cx)}px`);
        hand.style.setProperty('--hand-start-y', `${Math.round(box.cy)}px`);
        hand.classList.remove('hidden');
        hand.classList.add('gesture-tap');
        return;
      }

      if (this.currentScreen === 'builder' && this.activeHouseKey) {
        const houseKey = this.activeHouseKey;
        const houseState = this.state.houses[houseKey];
        const cfg = global.HOUSES_CONFIG[houseKey];
        if (!houseState || houseState.currentStep >= houseState.maxSteps) {
          this.hideKidHandGuide();
          return;
        }

        // 1. Casa di Paglia: mostra il tocco sul mucchio di paglia
        if (houseKey === 'straw') {
          const box = this.getStageRelativeBox(this.btnStrawPile);
          if (!box) {
            this.hideKidHandGuide();
            return;
          }
          hand.style.setProperty('--hand-start-x', `${Math.round(box.cx)}px`);
          hand.style.setProperty('--hand-start-y', `${Math.round(box.cy)}px`);
          hand.classList.remove('hidden');
          hand.classList.add('gesture-tap');
          return;
        }

        // 2. Casa di Legno: mostra il trascinamento dal pezzo di legna al riquadro verde sulla casa
        if (houseKey === 'wood') {
          const fromBox = this.getStageRelativeBox(this.draggableWoodPiece);
          const toBox = this.getStageRelativeBox(this.woodActiveTarget);
          if (!fromBox || !toBox) {
            this.hideKidHandGuide();
            return;
          }
          hand.style.setProperty('--hand-start-x', `${Math.round(fromBox.cx)}px`);
          hand.style.setProperty('--hand-start-y', `${Math.round(fromBox.cy)}px`);
          hand.style.setProperty('--hand-end-x', `${Math.round(toBox.cx)}px`);
          hand.style.setProperty('--hand-end-y', `${Math.round(toBox.cy)}px`);
          hand.classList.remove('hidden');
          hand.classList.add('gesture-drag');
          return;
        }

        // 3. Casa di Malta e Mattoni:
        if (houseKey === 'brick') {
          const stepInfo = cfg.stepsInfo[houseState.currentStep];
          const toBox = this.getStageRelativeBox(this.woodActiveTarget);
          if (!stepInfo || !toBox) {
            this.hideKidHandGuide();
            return;
          }

          if (stepInfo.actionType === 'mortar') {
            // Mostra la manina che prende la cazzuola e strofina avanti e indietro lungo tutto il riquadro blu
            const fromBox = this.getStageRelativeBox(this.draggableTrowelPiece);
            if (!fromBox) {
              this.hideKidHandGuide();
              return;
            }
            const scrubLeft = toBox.left + toBox.width * 0.16;
            const scrubRight = toBox.left + toBox.width * 0.84;
            hand.style.setProperty('--hand-start-x', `${Math.round(fromBox.cx)}px`);
            hand.style.setProperty('--hand-start-y', `${Math.round(fromBox.cy)}px`);
            hand.style.setProperty('--hand-end-x', `${Math.round(toBox.cx)}px`);
            hand.style.setProperty('--hand-end-y', `${Math.round(toBox.cy)}px`);
            hand.style.setProperty('--hand-scrub-left', `${Math.round(scrubLeft)}px`);
            hand.style.setProperty('--hand-scrub-right', `${Math.round(scrubRight)}px`);
            hand.classList.remove('hidden');
            hand.classList.add('gesture-scrub');
            return;
          } else {
            // Mostra la manina che trascina i mattoni rossi nel riquadro verde
            const fromBox = this.getStageRelativeBox(this.draggableBrickPiece);
            if (!fromBox) {
              this.hideKidHandGuide();
              return;
            }
            hand.style.setProperty('--hand-start-x', `${Math.round(fromBox.cx)}px`);
            hand.style.setProperty('--hand-start-y', `${Math.round(fromBox.cy)}px`);
            hand.style.setProperty('--hand-end-x', `${Math.round(toBox.cx)}px`);
            hand.style.setProperty('--hand-end-y', `${Math.round(toBox.cy)}px`);
            hand.classList.remove('hidden');
            hand.classList.add('gesture-drag');
            return;
          }
        }
      }

      this.hideKidHandGuide();
    },

    /**
     * Attiva o disattiva la modalità a Schermo Intero (Fullscreen API con fallback prefissi).
     */
    toggleFullscreen() {
      const doc = document;
      const elem = doc.documentElement;

      const isFs = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isFs) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          doc.exitFullscreen().catch(() => {});
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
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
     * Cambia schermata attiva, aggiorna la barra superiore, avvia la voce guida e posiziona la manina.
     */
    showScreen(screenName, persistScene = true) {
      this.currentScreen = screenName;
      this.screenMenu.classList.add('hidden');
      this.screenMap.classList.add('hidden');
      this.screenBuilder.classList.add('hidden');

      if (screenName === 'menu') {
        this.screenMenu.classList.remove('hidden');
        this.btnHudMenu.classList.add('hidden');
        this.btnHudMap.classList.add('hidden');
        this.hudTitleBadge.textContent = '🐷 I Tre Porcellini';
        this.speakMenuWelcome();
      } else if (screenName === 'map') {
        this.screenMap.classList.remove('hidden');
        this.btnHudMenu.classList.remove('hidden');
        this.btnHudMap.classList.add('hidden');
        this.hudTitleBadge.textContent = '🗺️ Mappa delle Casette';
        this.speakMapWelcome();
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

      this.scheduleHandGuideUpdate();
    },

    /**
     * Aggiorna il Menù Principale in base ai progressi salvati in localStorage.
     */
    refreshMenuUI() {
      this.state = global.SaveSystem.load();
      const straw = this.state.houses.straw;
      const wood = this.state.houses.wood;
      const brick = this.state.houses.brick;
      const hasSaved = global.SaveSystem.hasSavedGame();

      if (hasSaved) {
        this.btnContinueGame.classList.remove('hidden');
        const strawTxt = straw.completed ? 'Paglia ✅' : `Paglia ${straw.currentStep}/${straw.maxSteps}`;
        const woodTxt = wood.completed
          ? 'Legno ✅'
          : wood.unlocked
          ? `Legno ${wood.currentStep}/${wood.maxSteps}`
          : 'Legno 🔒';
        const brickTxt = brick.completed
          ? 'Mattoni ✅'
          : brick.unlocked
          ? `Mattoni ${brick.currentStep}/${brick.maxSteps}`
          : 'Mattoni 🔒';
        this.continueProgressLabel.textContent = `${strawTxt} • ${woodTxt} • ${brickTxt}`;
        this.menuSaveSummary.textContent = `💾 Progressi salvati: ${strawTxt} | ${woodTxt} | ${brickTxt}`;
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
      const brick = this.state.houses.brick;

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

      // Card 3: Malta e Mattoni
      const brickPct = Math.round((brick.currentStep / brick.maxSteps) * 100);
      this.mapBarBrick.style.width = `${brickPct}%`;

      if (brick.unlocked) {
        this.cardBrick.classList.remove('locked', 'coming-soon');
        this.cardBrick.classList.add('unlocked');
        this.lockOverlayBrick.classList.add('hidden');
        this.btnPlayBrick.disabled = false;
        this.mapStatusBrick.textContent = brick.completed
          ? '✅ Completata! (12 / 12)'
          : `${brick.currentStep} / ${brick.maxSteps} passaggi`;
        this.btnPlayBrick.textContent = brick.completed
          ? '🧱 Rigioca o Guarda!'
          : brick.currentStep > 0
          ? '🧱 Continua!'
          : '🧱 Costruisci!';
      } else {
        this.cardBrick.classList.add('locked');
        this.cardBrick.classList.remove('unlocked', 'coming-soon');
        this.lockOverlayBrick.classList.remove('hidden');
        this.btnPlayBrick.disabled = true;
        this.mapStatusBrick.textContent = '🔒 Completa prima il Legno';
        this.btnPlayBrick.textContent = '🔒 Bloccata';
      }
    },

    /**
     * Apre il cantiere di costruzione per la casa selezionata ('straw', 'wood', 'brick').
     */
    openHouseBuilder(houseKey) {
      this.activeHouseKey = houseKey;
      this.state = global.SaveSystem.load();
      this.modalVictory.classList.add('hidden');
      this.showScreen('builder');
      this.renderBuilderState();
    },

    /**
     * Renderizza lo stato corrente del cantiere (immagine casa, fumetto, voce narrante, manina guida, barra, strumenti).
     */
    renderBuilderState() {
      const houseKey = this.activeHouseKey;
      const cfg = global.HOUSES_CONFIG[houseKey];
      const houseState = this.state.houses[houseKey];
      const step = houseState.currentStep;
      const maxSteps = houseState.maxSteps;

      this.mortarScrubProgress = 0;

      // Aggiorna Porcellino guida e pronuncia l'istruzione del passaggio
      this.builderPigAvatar.src = cfg.pigAvatar;
      this.builderPigName.textContent = cfg.pigName;

      const stepInfo = cfg.stepsInfo[step] || cfg.stepsInfo[cfg.stepsInfo.length - 1];
      this.setSpeechAndSpeak(stepInfo.hint);

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
      void this.houseStageImg.offsetWidth;
      this.houseStageImg.classList.add('pop-anim');

      // Nascondi tutti i pannelli strumenti e attiva quello giusto
      this.toolPanelStraw.classList.add('hidden');
      this.toolPanelWood.classList.add('hidden');
      this.toolPanelBrick.classList.add('hidden');
      this.mortarSpreadLayer.classList.add('hidden');
      this.upperMortarVisual.classList.add('hidden');
      this.woodActiveTarget.classList.remove('mortar-target-style');

      if (houseKey === 'straw') {
        this.toolPanelStraw.classList.remove('hidden');
        this.woodLevelsOverlay.classList.add('hidden');
        this.strawActionSubtext.textContent = stepInfo.actionLabel || '';
      } else if (houseKey === 'wood') {
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
      } else if (houseKey === 'brick') {
        this.toolPanelBrick.classList.remove('hidden');

        // Se siamo allo step 11 (malta già stesa sui muri alti prima dell'ultimo step di mattoni), mostriamo l'indicatore
        if (step === 11) {
          this.upperMortarVisual.classList.remove('hidden');
        }

        if (step < maxSteps && stepInfo.targetZone) {
          this.woodLevelsOverlay.classList.remove('hidden');
          const tz = stepInfo.targetZone;
          this.woodActiveTarget.style.top = `${tz.top}%`;
          this.woodActiveTarget.style.left = `${tz.left}%`;
          this.woodActiveTarget.style.width = `${tz.width}%`;
          this.woodActiveTarget.style.height = `${tz.height}%`;
          this.woodTargetLabel.textContent = stepInfo.targetBadge || stepInfo.levelName;
          this.brickLevelNameDisplay.textContent = stepInfo.levelName;

          if (stepInfo.actionType === 'mortar') {
            this.woodActiveTarget.classList.add('mortar-target-style');
            this.mortarSpreadLayer.classList.remove('hidden');
            this.mortarSpreadFill.style.width = '0%';
            this.trowelScrubBar.style.width = '0%';

            this.trowelSourceSlot.classList.add('active-slot');
            this.trowelSourceSlot.classList.remove('locked-slot');
            this.brickSourceSlot.classList.remove('active-slot');
            this.brickSourceSlot.classList.add('locked-slot');

            this.trowelStatusText.textContent =
              'Strofina la cazzuola avanti e indietro nel riquadro blu!';
            this.brickStatusText.textContent = 'Aspetta: prima devi spargere la malta!';
          } else {
            // actionType === 'brick'
            this.woodActiveTarget.classList.remove('mortar-target-style');
            this.mortarSpreadLayer.classList.add('hidden');
            this.trowelScrubBar.style.width = '100%';

            this.trowelSourceSlot.classList.remove('active-slot');
            this.trowelSourceSlot.classList.add('locked-slot');
            this.brickSourceSlot.classList.add('active-slot');
            this.brickSourceSlot.classList.remove('locked-slot');

            this.trowelStatusText.textContent = 'Malta stesa su questo livello! ✅';
            this.brickStatusText.textContent = 'Ora trascina i mattoni nel riquadro verde!';
          }
        } else {
          this.woodLevelsOverlay.classList.add('hidden');
          this.brickLevelNameDisplay.textContent = 'Casetta di Mattoni Completata!';
          this.trowelSourceSlot.classList.remove('active-slot');
          this.brickSourceSlot.classList.remove('active-slot');
        }
      }

      this.scheduleHandGuideUpdate();
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
        this.hideKidHandGuide();

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
        this.scheduleHandGuideUpdate();
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

    /**
     * Configura le interazioni per la Casa di Malta e Mattoni (Livello 3):
     * - Cazzuola (#draggable-trowel-piece): si strofina avanti e indietro lungo il riquadro blu per spargere la malta.
     * - Mattoni (#draggable-brick-piece): si trascinano sopra il livello giusto dopo aver steso la malta.
     */
    setupBrickInteractions() {
      const trowelEl = this.draggableTrowelPiece;
      const brickEl = this.draggableBrickPiece;

      // 1. Inizio trascinamento CAZZUOLA
      trowelEl.addEventListener('pointerdown', (e) => {
        if (this.activeHouseKey !== 'brick') return;
        const houseState = this.state.houses.brick;
        if (houseState.currentStep >= houseState.maxSteps) return;

        const stepInfo = global.HOUSES_CONFIG.brick.stepsInfo[houseState.currentStep];
        if (stepInfo.actionType !== 'mortar') {
          global.SoundFX.gentleWrong();
          this.setSpeechAndSpeak(
            'La malta c\'è già! Adesso prendi i mattoni rossi a destra dove ti mostra la manina e portali nel riquadro verde!'
          );
          this.scheduleHandGuideUpdate();
          return;
        }

        e.preventDefault();
        this.isDraggingBrickTool = true;
        this.activeBrickToolType = 'trowel';
        this.dragPointerId = e.pointerId;
        this.wasInMortarTarget = false;
        this.lastScrubX = e.clientX;
        this.lastScrubY = e.clientY;
        this.hideKidHandGuide();

        trowelEl.classList.add('dragging-source');
        this.ghostIcon.textContent = '🥄';
        this.dragGhost.classList.remove('hidden');
        this.moveDragGhost(e.clientX, e.clientY);
        global.SoundFX.click();
      });

      // 2. Inizio trascinamento MATTONI
      brickEl.addEventListener('pointerdown', (e) => {
        if (this.activeHouseKey !== 'brick') return;
        const houseState = this.state.houses.brick;
        if (houseState.currentStep >= houseState.maxSteps) return;

        const stepInfo = global.HOUSES_CONFIG.brick.stepsInfo[houseState.currentStep];
        if (stepInfo.actionType !== 'brick') {
          global.SoundFX.gentleWrong();
          this.setSpeechAndSpeak(
            'Aspetta! Prima prendi la cazzuola a sinistra dove c\'è la manina e strofinala nel riquadro blu per mettere la malta!'
          );
          this.scheduleHandGuideUpdate();
          return;
        }

        e.preventDefault();
        this.isDraggingBrickTool = true;
        this.activeBrickToolType = 'brick';
        this.dragPointerId = e.pointerId;
        this.hideKidHandGuide();

        brickEl.classList.add('dragging-source');
        this.ghostIcon.textContent = '🧱';
        this.dragGhost.classList.remove('hidden');
        this.moveDragGhost(e.clientX, e.clientY);
        global.SoundFX.click();
      });

      // 3. Movimento puntatore (Spalmatura malta con cazzuola su distanza aumentata oppure trasporto mattoni)
      window.addEventListener('pointermove', (e) => {
        if (!this.isDraggingBrickTool || e.pointerId !== this.dragPointerId) return;
        this.moveDragGhost(e.clientX, e.clientY);

        const inTarget = this.isPointInElement(e.clientX, e.clientY, this.woodActiveTarget, 26);
        if (inTarget) {
          this.woodActiveTarget.classList.add('drag-hover');
        } else {
          this.woodActiveTarget.classList.remove('drag-hover');
        }

        // Se stiamo passando la cazzuola dentro la zona del livello giusto, stendiamo la malta!
        if (this.activeBrickToolType === 'trowel' && inTarget && this.wasInMortarTarget) {
          const dx = e.clientX - (this.lastScrubX ?? e.clientX);
          const dy = e.clientY - (this.lastScrubY ?? e.clientY);
          // Premiamo soprattutto il movimento orizzontale avanti e indietro dentro il riquadro
          const rawDist = Math.hypot(dx, dy * 0.55);
          const effectiveDist = Math.min(rawDist, 36);

          if (effectiveDist > 1.5) {
            const targetRect = this.woodActiveTarget.getBoundingClientRect();
            const targetWidth = Math.max(240, targetRect.width || 320);
            // Distanza aumentata: servono circa 3.5 passate complete avanti e indietro dentro il riquadro
            const requiredDistancePx = targetWidth * 3.4;
            const incrementPct = (effectiveDist / requiredDistancePx) * 100;
            this.applyMortarScrub(incrementPct, e.clientX, e.clientY);
          }
        }

        this.wasInMortarTarget = inTarget;
        this.lastScrubX = e.clientX;
        this.lastScrubY = e.clientY;
      });

      // 4. Rilascio puntatore
      const endBrickToolDrag = (e) => {
        if (!this.isDraggingBrickTool || e.pointerId !== this.dragPointerId) return;
        const toolType = this.activeBrickToolType;

        this.isDraggingBrickTool = false;
        this.activeBrickToolType = null;
        this.dragPointerId = null;

        trowelEl.classList.remove('dragging-source');
        brickEl.classList.remove('dragging-source');
        this.dragGhost.classList.add('hidden');
        this.woodActiveTarget.classList.remove('drag-hover');

        if (toolType === 'trowel') {
          this.evaluateTrowelRelease(e.clientX, e.clientY);
        } else if (toolType === 'brick') {
          this.evaluateBrickDrop(e.clientX, e.clientY);
        }

        this.scheduleHandGuideUpdate();
      };

      window.addEventListener('pointerup', endBrickToolDrag);
      window.addEventListener('pointercancel', endBrickToolDrag);

      // Accessibilità da tastiera
      trowelEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const step = this.state.houses.brick.currentStep;
          const info = global.HOUSES_CONFIG.brick.stepsInfo[step];
          if (info && info.actionType === 'mortar') {
            this.advanceBrickStep(50, 68, 'mortar');
          }
        }
      });

      brickEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const step = this.state.houses.brick.currentStep;
          const info = global.HOUSES_CONFIG.brick.stepsInfo[step];
          if (info && info.actionType === 'brick') {
            this.advanceBrickStep(50, 68, 'brick');
          }
        }
      });
    },

    /**
     * Incrementa la percentuale di malta stesa mentre la cazzuola viene strofinata nel riquadro blu.
     */
    applyMortarScrub(amount, clientX, clientY) {
      if (this.activeHouseKey !== 'brick') return;
      const houseState = this.state.houses.brick;
      const stepInfo = global.HOUSES_CONFIG.brick.stepsInfo[houseState.currentStep];
      if (!stepInfo || stepInfo.actionType !== 'mortar') return;

      const prevFloor = Math.floor(this.mortarScrubProgress / 20);
      this.mortarScrubProgress = Math.min(100, this.mortarScrubProgress + amount);
      const currFloor = Math.floor(this.mortarScrubProgress / 20);

      const pct = Math.round(this.mortarScrubProgress);
      this.mortarSpreadFill.style.width = `${pct}%`;
      this.trowelScrubBar.style.width = `${pct}%`;

      if (currFloor > prevFloor && this.mortarScrubProgress < 100) {
        global.SoundFX.mortarScrub();
      }

      if (this.mortarScrubProgress >= 100) {
        // Interrompe il drag corrente e completa lo step della malta!
        this.isDraggingBrickTool = false;
        this.activeBrickToolType = null;
        this.dragPointerId = null;
        this.draggableTrowelPiece.classList.remove('dragging-source');
        this.dragGhost.classList.add('hidden');
        this.woodActiveTarget.classList.remove('drag-hover');

        const boxRect = this.houseCanvasBox.getBoundingClientRect();
        const relX = ((clientX - boxRect.left) / boxRect.width) * 100;
        const relY = ((clientY - boxRect.top) / boxRect.height) * 100;
        this.advanceBrickStep(relX, relY, 'mortar');
      }
    },

    /**
     * Valuta il rilascio della cazzuola:
     * Non completa più istantaneamente al semplice rilascio, ma incoraggia il bambino
     * a strofinare la cazzuola avanti e indietro lungo il riquadro blu finché non è pieno al 100%.
     */
    evaluateTrowelRelease(clientX, clientY) {
      if (this.activeHouseKey !== 'brick') return;
      const houseState = this.state.houses.brick;
      if (houseState.currentStep >= houseState.maxSteps) return;

      const inTarget = this.isPointInElement(clientX, clientY, this.woodActiveTarget, 28);

      if (inTarget && this.mortarScrubProgress < 12) {
        // Piccolo progresso iniziale se il bimbo ha solo appoggiato la cazzuola nel riquadro
        this.applyMortarScrub(10, clientX, clientY);
      }

      if (this.mortarScrubProgress > 0 && this.mortarScrubProgress < 100) {
        const pct = Math.round(this.mortarScrubProgress);
        this.trowelStatusText.textContent = `Malta al ${pct}%: strofina ancora avanti e indietro!`;
        this.setSpeechAndSpeak(
          'Bravo! Continua a strofinare la cazzuola avanti e indietro in tutto il riquadro blu, proprio come fa la manina, finché non è tutto pieno di malta!'
        );
        return;
      }

      if (this.isPointInElement(clientX, clientY, this.houseCanvasBox, 0)) {
        this.giveWrongLevelFeedback(clientY, 'la cazzuola con la malta', 'blu');
        return;
      }

      global.SoundFX.gentleWrong();
      this.setSpeechAndSpeak(
        'Porta la cazzuola dentro il riquadro blu sulla casa e strofinala avanti e indietro come fa la manina!'
      );
    },

    /**
     * Valuta dove il bambino ha rilasciato i mattoni:
     * - Se nel livello giusto (#wood-active-target): posa i mattoni e avanza!
     * - Se a un livello sbagliato: dà un suggerimento vocale.
     */
    evaluateBrickDrop(clientX, clientY) {
      if (this.activeHouseKey !== 'brick') return;
      const houseState = this.state.houses.brick;
      if (houseState.currentStep >= houseState.maxSteps) return;

      if (this.isPointInElement(clientX, clientY, this.woodActiveTarget, 28)) {
        const boxRect = this.houseCanvasBox.getBoundingClientRect();
        const relX = ((clientX - boxRect.left) / boxRect.width) * 100;
        const relY = ((clientY - boxRect.top) / boxRect.height) * 100;
        this.advanceBrickStep(relX, relY, 'brick');
        return;
      }

      if (this.isPointInElement(clientX, clientY, this.houseCanvasBox, 0)) {
        this.giveWrongLevelFeedback(clientY, 'i mattoni rossi', 'verde');
        return;
      }

      global.SoundFX.gentleWrong();
      this.setSpeechAndSpeak(
        'Trascina i mattoni rossi fin dentro il riquadro verde sulla casa, dove ti mostra la manina!'
      );
    },

    /**
     * Messaggio vocale e visivo di aiuto quando il bambino tocca un livello sbagliato (troppo alto o troppo basso).
     */
    giveWrongLevelFeedback(clientY, itemLabel, colorName) {
      global.SoundFX.gentleWrong();
      const targetRect = this.woodActiveTarget.getBoundingClientRect();
      const targetCenterY = (targetRect.top + targetRect.bottom) / 2;

      this.woodActiveTarget.classList.remove('wrong-flash');
      void this.woodActiveTarget.offsetWidth;
      this.woodActiveTarget.classList.add('wrong-flash');

      if (clientY < targetCenterY) {
        this.setSpeechAndSpeak(
          `Ops! Lì è troppo in alto! Porta ${itemLabel} più in basso, dentro il riquadro ${colorName} dove va la manina!`
        );
      } else {
        this.setSpeechAndSpeak(
          `Ops! Lì è troppo in basso! Porta ${itemLabel} più in alto, dentro il riquadro ${colorName} dove va la manina!`
        );
      }
    },

    /**
     * Avanza di uno step nella costruzione della Casa di Malta e Mattoni.
     */
    advanceBrickStep(fxPercentX = 50, fxPercentY = 65, actionType = 'brick') {
      const houseState = this.state.houses.brick;
      const nextStep = houseState.currentStep + 1;

      if (actionType === 'mortar') {
        global.SoundFX.mortarComplete(nextStep);
        this.spawnParticles(['🥄', '💧', '✨', '🪣'], fxPercentX, fxPercentY);
      } else {
        global.SoundFX.brickPlace(nextStep);
        this.spawnParticles(['🧱', '🔨', '⭐', '✨'], fxPercentX, fxPercentY);
      }

      this.state = global.SaveSystem.updateHouseStep('brick', nextStep);
      this.triggerSaveToast();
      this.renderBuilderState();

      if (nextStep >= houseState.maxSteps) {
        setTimeout(() => {
          global.SoundFX.victory();
          this.showVictoryModal('brick');
        }, 650);
      }
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
     * - Se è sulla casa ma a un livello sbagliato: dà un suggerimento vocale.
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
        this.giveWrongLevelFeedback(clientY, 'la legna', 'verde');
        return;
      }

      // 3. Rilasciato fuori dalla casa
      global.SoundFX.gentleWrong();
      this.setSpeechAndSpeak(
        'Trascina la legna fin dentro il riquadro verde sulla casa, seguendo la manina!'
      );
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
     * Mostra la modale festosa di completamento casetta e pronuncia i complimenti.
     */
    showVictoryModal(houseKey) {
      const cfg = global.HOUSES_CONFIG[houseKey];
      const finalImg = cfg.images[cfg.images.length - 1];
      this.victoryHouseImg.src = finalImg;
      this.hideKidHandGuide();

      if (houseKey === 'straw') {
        this.victoryTitle.textContent = '🎉 Casetta di Paglia Completata!';
        this.victoryMessage.textContent =
          'Bravissimo! Hai costruito tutta la Casetta di Paglia e hai sbloccato la Casetta di Legno!';
        this.btnVictoryNext.classList.remove('hidden');
        this.btnVictoryNext.textContent = '🪵 Costruisci la Casetta di Legno!';
        global.SoundFX.speak(
          'Evviva! Siete stati bravissimi! Avete costruito tutta la Casetta di Paglia! Toccate il pulsante verde per costruire la Casetta di Legno!'
        );
      } else if (houseKey === 'wood') {
        this.victoryTitle.textContent = '🏆 Casetta di Legno Completata!';
        this.victoryMessage.textContent =
          'Straordinario! Hai portato tutta la legna al livello giusto e hai sbloccato la Casetta di Mattoni!';
        this.btnVictoryNext.classList.remove('hidden');
        this.btnVictoryNext.textContent = '🧱 Costruisci la Casetta di Mattoni!';
        global.SoundFX.speak(
          'Straordinario! Avete costruito tutta la Casetta di Legno! Toccate il pulsante verde per costruire la Casetta di Malta e Mattoni!'
        );
      } else if (houseKey === 'brick') {
        this.victoryTitle.textContent = '🏰 Casetta di Malta e Mattoni Completata!';
        this.victoryMessage.textContent =
          'Capolavoro! Hai alternato malta e mattoni costruendo tutte e tre le casette dei Porcellini!';
        this.btnVictoryNext.classList.add('hidden');
        global.SoundFX.speak(
          'Che capolavoro! Avete costruito la robustissima Casetta di Malta e Mattoni! I tre porcellini vi dicono grazie di cuore!'
        );
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
        ...global.HOUSES_CONFIG.brick.images,
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
