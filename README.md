# I Tre Porcellini - Gioco Educativo per Bambini 🐷🌾🪵🧱

Un gioco interattivo ed educativo per bambini basato sulla celebre fiaba de **"I Tre Porcellini"**, realizzato in HTML5, CSS3 e JavaScript Vanilla in formato **16:9** responsivo.

🌐 **Gioca online su GitHub Pages**: [https://amarte81.github.io/gioco-3-porcellini/](https://amarte81.github.io/gioco-3-porcellini/)

---

## 🎮 Funzionalità del Gioco

- **Formato 16:9 proporzionale**: si adatta e scala su qualsiasi schermo (desktop, tablet, LIM).
- **Adatto ai bambini**: pulsanti grandi, illustrazioni a colori, animazioni elastiche e controlli semplici.
- **Salvataggio automatico progressi (`localStorage`)**:
  - **Nuova Partita**: con richiesta di conferma amichevole in caso di salvataggi preesistenti.
  - **Continua Partita**: per riprendere subito da dove si era rimasti.
- **Difficoltà progressiva**:
  1. **Livello 1 - Casetta di Paglia**: tocca o clicca sul mucchio di paglia dorata per costruire passo dopo passo la casetta (9 step).
  2. **Livello 2 - Casetta di Legno**: trascina le assi di legno al **giusto livello della casa** (fascia bassa, media, sottotetto, tetto, camino, porta, finestre, fioriere, legnaia - 10 step). Il porcellino guida aiuta se il pezzo viene posizionato troppo in alto o troppo in basso!
  3. **Livello 3 - Casetta di Malta e Mattoni**: alterna la **malta** e i **mattoni** per 6 livelli (12 step). Prima passa la **cazzuola** nel punto giusto per stendere la malta, poi trascina i **mattoni** sul livello corrispondente!
- **Controlli HUD**: pulsante **Suoni On/Off** (`🔊`/`🔇`) e pulsante **Schermo Intero On/Off** (`⛶`/`🗗`).
- **Effetti Sonori Integrati**: sintetizzati in tempo reale con le **Web Audio API** (nessun caricamento audio esterno, veloce e leggero).
- **Supporto Mouse e Touch**: testato e funzionante sia su PC che su dispositivi touch/tablet.

---

## 🛠️ Architettura e Struttura

Per i dettagli sull'architettura tecnica e le linee guida di espansione (casa di mattoni e interazione col lupo), consulta il file:
👉 [STRUTTURA_GIOCO.md](./STRUTTURA_GIOCO.md)
