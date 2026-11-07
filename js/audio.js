/**
 * Sistema Audio e Voce Narrante per Bambini in Età Prescolare - "I Tre Porcellini"
 * - Sintetizza effetti sonori allegri con Web Audio API (nessun file esterno richiesto)
 * - Voce narrante femminile e giovane in Italiano (Web Speech API) che guida i bimbi passo passo
 */
(function (global) {
  let audioCtx = null;
  let soundEnabled = true;
  let selectedItalianVoice = null;
  let lastSpokenText = '';
  let hasUserInteracted = false;
  let pendingSpeechText = null;

  function getCtx() {
    if (!audioCtx) {
      const AudioContextClass = global.AudioContext || global.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, delay = 0, volume = 0.18) {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  /**
   * Seleziona la miglior voce femminile italiana disponibile nel browser/sistema operativo.
   */
  function pickYoungFemaleItalianVoice() {
    if (!global.speechSynthesis) return null;
    const voices = global.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;

    const itVoices = voices.filter(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith('it')
    );

    if (!itVoices.length) return voices[0];

    // Ordine di preferenza per voci femminili italiane naturali/giovani
    const preferredKeywords = [
      'elsa',
      'isabella',
      'alice',
      'federica',
      'fabiola',
      'google italiano',
      'siri',
      'female',
      'femminile',
      'paola',
      'chiara'
    ];

    // Escludi voci notoriamente maschili se c'è alternativa
    const maleKeywords = ['cosimo', 'diego', 'luca', 'male', 'maschile'];

    for (const kw of preferredKeywords) {
      const match = itVoices.find((v) => v.name.toLowerCase().includes(kw));
      if (match) return match;
    }

    const nonMale = itVoices.find(
      (v) => !maleKeywords.some((m) => v.name.toLowerCase().includes(m))
    );
    return nonMale || itVoices[0];
  }

  if (global.speechSynthesis) {
    selectedItalianVoice = pickYoungFemaleItalianVoice();
    if (global.speechSynthesis.onvoiceschanged !== undefined) {
      global.speechSynthesis.onvoiceschanged = () => {
        selectedItalianVoice = pickYoungFemaleItalianVoice();
      };
    }
  }

  // Sblocca l'audio e la voce al primo tocco del bambino sullo schermo
  function onFirstInteraction() {
    if (hasUserInteracted) return;
    hasUserInteracted = true;
    getCtx();
    if (pendingSpeechText && soundEnabled) {
      const txt = pendingSpeechText;
      pendingSpeechText = null;
      setTimeout(() => {
        SoundFX.speak(txt, true);
      }, 120);
    }
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', onFirstInteraction, { passive: true });
    document.addEventListener('keydown', onFirstInteraction, { passive: true });
  }

  const SoundFX = {
    isEnabled() {
      return soundEnabled;
    },

    toggle() {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        this.click();
        if (lastSpokenText) {
          this.speak(lastSpokenText, true);
        }
      } else if (global.speechSynthesis) {
        global.speechSynthesis.cancel();
      }
      return soundEnabled;
    },

    /**
     * Pronuncia una frase in italiano con voce femminile giovane e allegra,
     * pensata per bambini in età prescolare che non sanno ancora leggere.
     */
    speak(text, interrupt = true) {
      if (!text) return;
      lastSpokenText = text;
      if (!soundEnabled || !global.speechSynthesis) return;

      // Rimuove emoji e simboli così la voce legge solo le parole in modo naturale
      const cleanText = text
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}⭐☆✅🔒🚧🔄🏠🗺️🔊🔇⛶🗗]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) return;

      if (!hasUserInteracted) {
        pendingSpeechText = cleanText;
      }

      try {
        if (interrupt) {
          global.speechSynthesis.cancel();
        }

        const utter = new SpeechSynthesisUtterance(cleanText);
        if (!selectedItalianVoice) {
          selectedItalianVoice = pickYoungFemaleItalianVoice();
        }
        if (selectedItalianVoice) {
          utter.voice = selectedItalianVoice;
        }
        utter.lang = 'it-IT';
        // Pitch leggermente più alto (1.26) e ritmo chiaro (0.96) per voce giovane, dolce ed entusiasta
        utter.pitch = 1.26;
        utter.rate = 0.96;
        utter.volume = 1.0;

        global.speechSynthesis.speak(utter);
      } catch (e) {
        console.warn('Sintesi vocale non disponibile:', e);
      }
    },

    /** Ripete l'ultima istruzione vocale */
    repeatLastSpeech() {
      if (lastSpokenText) {
        this.speak(lastSpokenText, true);
      }
    },

    /** Suono morbido per click sui bottoni */
    click() {
      playTone(520, 'sine', 0.09, 0, 0.15);
      playTone(660, 'triangle', 0.11, 0.04, 0.12);
    },

    /** Suono frusciante/allegro quando si aggiunge la paglia */
    strawPlace(stepIndex = 1) {
      const baseFreq = 380 + stepIndex * 32;
      playTone(baseFreq, 'triangle', 0.12, 0, 0.18);
      playTone(baseFreq * 1.25, 'sine', 0.16, 0.06, 0.18);
    },

    /** Suono legnoso "toc-toc" + nota positiva quando si posiziona un'asse di legno */
    woodPlace(stepIndex = 1) {
      playTone(190, 'square', 0.06, 0, 0.12);
      playTone(240, 'triangle', 0.07, 0.05, 0.14);
      const chime = 420 + stepIndex * 28;
      playTone(chime, 'sine', 0.18, 0.09, 0.18);
    },

    /** Suono morbido quando si spalma la malta con la cazzuola */
    mortarScrub() {
      playTone(310 + Math.random() * 90, 'sine', 0.06, 0, 0.08);
    },

    /** Suono quando lo strato di malta è completato */
    mortarComplete(stepIndex = 1) {
      playTone(360, 'triangle', 0.09, 0, 0.15);
      playTone(480 + stepIndex * 18, 'sine', 0.16, 0.06, 0.18);
    },

    /** Suono solido di posa dei mattoni sulla malta */
    brickPlace(stepIndex = 1) {
      playTone(150, 'triangle', 0.07, 0, 0.16);
      playTone(210, 'square', 0.07, 0.05, 0.12);
      const chime = 440 + stepIndex * 25;
      playTone(chime, 'sine', 0.2, 0.1, 0.19);
    },

    /** Suono delicato "boing" quando il livello non è quello giusto */
    gentleWrong() {
      playTone(280, 'sine', 0.14, 0, 0.14);
      playTone(220, 'triangle', 0.2, 0.1, 0.12);
    },

    /** Fanfara festosa di completamento casa */
    victory() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, idx) => {
        playTone(n, 'triangle', 0.24, idx * 0.11, 0.2);
      });
      playTone(1046.5, 'sine', 0.45, 0.45, 0.22);
    }
  };

  global.SoundFX = SoundFX;
})(window);
