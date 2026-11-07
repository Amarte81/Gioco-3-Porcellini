/**
 * Sistema Audio per Bambini - "I Tre Porcellini"
 * Sintetizza effetti sonori allegri con Web Audio API (nessun file esterno richiesto)
 * e supporta la lettura vocale opzionale dei suggerimenti (Web Speech API).
 */
(function (global) {
  let audioCtx = null;
  let soundEnabled = true;

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

  const SoundFX = {
    isEnabled() {
      return soundEnabled;
    },

    toggle() {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        this.click();
      } else if (global.speechSynthesis) {
        global.speechSynthesis.cancel();
      }
      return soundEnabled;
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
