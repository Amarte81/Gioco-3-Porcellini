# Architettura e Struttura del Gioco: "I Tre Porcellini"

Documento di riferimento tecnico e funzionale pensato per sviluppatori umani e agenti IA per comprendere, mantenere ed espandere il gioco educativo per bambini **"I Tre Porcellini"**.

---

## 1. Panoramica del Progetto

- **Target**: Bambini (interfaccia colorata, pulsanti grandi, feedback visivi/sonori immediati, supporto sia Mouse che Touch).
- **Formato Visivo**: Layout fisso proporzionale **16:9** (`aspect-ratio: 16 / 9`, risoluzione logica di riferimento `1920x1080` scalata automaticamente nel viewport).
- **Tecnologie**: HTML5 semantico, CSS3 (variabili, animazioni fluide, layout responsivo 16:9), JavaScript Vanilla modulare (senza dipendenze esterne, eseguibile direttamente nel browser anche da `file://` o server locale).
- **Audio**: Effetti sonori sintetizzati tramite **Web Audio API** (nessun file audio esterno richiesto; suoni allegri per click, posizionamento corretto, errore morbido e vittoria).

---

## 2. Mappa degli Asset Grafici Presenti nella Cartella

Tutti gli asset si trovano nella root del progetto (`./`):

### Personaggi
| File | Descrizione | Utilizzo |
| :--- | :--- | :--- |
| `Porcellini uniti.jfif` | I tre porcellini insieme (mattoni, paglia, legno) | Schermata Menù Principale e Mappa Selezione Livelli |
| `Porcellino paglia.jfif` | Porcellino con camicia a quadri e fascio di paglia | Guida/Mascotte nel Livello 1 (Casa di Paglia) |
| `Porcellino legno.jfif` | Porcellino con salopette verde e legnetti | Guida/Mascotte nel Livello 2 (Casa di Legno) |
| `Porcellino mattoni.jfif` | Porcellino con salopette blu, cappellino rosso e cazzuola | Guida/Mascotte nel Livello 3 (Casa di Mattoni - *Fase futura*) |

### Costruzione Casa di Paglia (Livello 1)
Meccanica: **Click / Tap semplice** sul mucchio di paglia.
| Step | File Asset | Descrizione Visiva dello Stato |
| :---: | :--- | :--- |
| `0` | `Casa paglia 0.jfif` | Scheletro in pali di legno legati sul prato (stato iniziale) |
| `1` | `Casa paglia 1.jpg` | Base inferiore delle pareti coperta di paglia |
| `2` | `Casa paglia 2.jpg` | Base inferiore infoltita con spighe |
| `3` | `Casa paglia 3.jpg` | Pareti laterali e frontali coperte fino al tetto |
| `4` | `Casa paglia 4.jpg` | Falda sinistra e fascia bassa del tetto in paglia |
| `5` | `Casa paglia 5.jpg` | Tetto interamente coperto di paglia (comignolo scoperto) |
| `6` | `Casa paglia 6.jpg` | Comignolo di paglia intrecciata completato |
| `7` | `Casa paglia 7.jpg` | Porta in legno con pomello dorato installata |
| `8` | `Casa paglia 8.jpg` | Tendine colorate aggiunte alle finestre |
| `9` | `Casa paglia 9.jpg` / `Casa paglia.jfif` | Casa di paglia completata con spighe decorative |

### Costruzione Casa di Legno (Livello 2)
Meccanica: **Drag & Drop mirato al livello giusto** della casa. Il bambino trascina le assi/elementi di legno dalla catasta verso la zona evidenziata sulla casa corrispondente allo step attuale.
| Step | File Asset | Zona / Livello Target (Coordinate % nell'area casa) | Descrizione Visiva dello Stato |
| :---: | :--- | :--- | :--- |
| `0` | `Casa legno 0.jpg` | — (Stato iniziale) | Scheletro di travi di legno sul pavimento in assi |
| `1` | `Casa legno 1.jpg` | **Fascia Bassa Pareti** (`top: 62%`, `height: 22%`) | Assi posizionate nella parte inferiore delle pareti |
| `2` | `Casa legno 2.jpg` | **Fascia Media Pareti** (`top: 46%`, `height: 20%`) | Assi posizionate intorno alle finestre del piano terra |
| `3` | `Casa legno 3.jpg` | **Fascia Alta Pareti / Timpano** (`top: 26%`, `height: 22%`) | Pareti completate fino al sottotetto |
| `4` | `Casa legno 4.jpg` | **Falda Bassa del Tetto** (`top: 32%`, `height: 22%`) | Tegole di legno nella metà inferiore del tetto |
| `5` | `Casa legno 5.jpg` | **Falda Alta del Tetto** (`top: 12%`, `height: 22%`) | Tetto interamente coperto di scandole di legno |
| `6` | `Casa legno 6.jpg` | **Camino in Cima** (`top: 4%`, `left: 48%`, `width: 22%`, `height: 22%`) | Camino in pietra fumante e vetri alle finestre |
| `7` | `Casa legno 7.jpg` | **Porta d'Ingresso** (`top: 52%`, `left: 26%`, `width: 20%`, `height: 32%`) | Porta in legno con cardini in ferro installata |
| `8` | `Casa legno 8.jpg` | **Finestre (Tendine)** (`top: 34%`, `height: 40%`) | Tendine verdi a quadretti montate alle finestre |
| `9` | `Casa legno 9.jpg` | **Fioriere Finestre** (`top: 62%`, `height: 20%`) | Fioriere fiorite sotto le finestre |
| `10` | `Casa legno finale.jpg` | **Catasta Esterna / Rifinitura** (`top: 72%`, `left: 62%`, `width: 25%`, `height: 20%`) | Casa di legno completata con legnaia esterna |

### Costruzione Casa di Malta e Mattoni (Livello 3 — *Implementato*)
Meccanica: **Alternanza Malta (Cazzuola) + Mattoni (Drag & Drop al livello giusto)** per 6 livelli (12 passaggi totali):
1. Negli **step pari** (`0 -> 1`, `2 -> 3`, `4 -> 5`, `6 -> 7`, `8 -> 9`, `10 -> 11`): il bambino prende la **cazzuola** (`#draggable-trowel-piece`) e la passa lungo la zona blu del livello corrente per stendere la malta (`actionType: 'mortar'`).
2. Negli **step dispari** (`1 -> 2`, `3 -> 4`, `5 -> 6`, `7 -> 8`, `9 -> 10`, `11 -> 12`): il bambino trascina i **mattoni** (`#draggable-brick-piece`) sul livello verde dove è appena stata stesa la malta (`actionType: 'brick'`).

| Step | File Asset | Azione Richiesta per Raggiungerlo |
| :---: | :--- | :--- |
| `0` | `Casa mattoni 0.jpg` | Stato iniziale (fondazioni + pallet mattoni + secchio malta) |
| `1` | `Casa mattoni 1.jpg` | Passare la cazzuola con malta sul **Livello 1** (base fondazioni) |
| `2` | `Casa mattoni 2.jpg` | Trascinare i mattoni sul **Livello 1** |
| `3` | `Casa mattoni 3.jpg` | Passare la cazzuola con malta sul **Livello 2** |
| `4` | `Casa mattoni 4.jpg` | Trascinare i mattoni sul **Livello 2** |
| `5` | `Casa mattoni 5.jpg` | Passare la cazzuola con malta sul **Livello 3** |
| `6` | `Casa mattoni 6.jpg` | Trascinare i mattoni sul **Livello 3** |
| `7` | `Casa mattoni 7.jpg` | Passare la cazzuola con malta sul **Livello 4** |
| `8` | `Casa mattoni 8.jpg` | Trascinare i mattoni sul **Livello 4** |
| `9` | `Casa mattoni 9.jpg` | Passare la cazzuola con malta sul **Livello 5** (sotto le finestre) |
| `10` | `Casa mattoni 10.jpg` | Trascinare i mattoni sul **Livello 5** |
| `11` | `Casa mattoni 10.jpg` (+ malta alta) | Passare la cazzuola con malta sul **Livello 6** (muri alti) |
| `12` | `Casa mattoni finale.jpg` | Trascinare gli ultimi mattoni e tegole sul **Livello 6** |

---

## 3. Struttura dei File del Progetto

```text
Gioco 3 porcellini/
├── index.html          # Struttura DOM 16:9, schermate (Menu, Mappa, Gioco, Vittoria)
├── css/
│   └── style.css       # Stili 16:9, UI per bambini, animazioni, zone drop e feedback
├── js/
│   ├── saveSystem.js   # Gestione salvataggio/caricamento progressi in localStorage
│   ├── audio.js        # Effetti sonori sintetizzati (Web Audio API) e sintesi vocale opzionale
│   ├── gameData.js     # Configurazione step, testi guida e coordinate dei livelli delle case
│   └── main.js         # Macchina a stati, gestione Menu, Livello Paglia, Livello Legno e predisposizione futuri livelli
└── STRUTTURA_GIOCO.md  # Questo documento di architettura
```

---

## 4. Sistema di Salvataggio (`SaveSystem` in `js/saveSystem.js`)

I progressi vengono salvati automaticamente in `localStorage` con la chiave `tre_porcellini_save_v1`.

### Schema JSON dello Stato Salvato
```json
{
  "version": 1,
  "hasStarted": true,
  "currentScene": "map",
  "houses": {
    "straw": {
      "unlocked": true,
      "completed": false,
      "currentStep": 0,
      "maxSteps": 9
    },
    "wood": {
      "unlocked": false,
      "completed": false,
      "currentStep": 0,
      "maxSteps": 10
    },
    "brick": {
      "unlocked": false,
      "completed": false,
      "currentStep": 0,
      "maxSteps": 11
    }
  },
  "wolfPhase": {
    "unlocked": false,
    "completed": false,
    "currentStage": 0
  },
  "lastUpdated": "2026-11-07T11:00:00.000Z"
}
```

### API di `SaveSystem`
- `SaveSystem.load()`: Carica lo stato da `localStorage` (o restituisce lo stato di default se assente).
- `SaveSystem.save(state)`: Salva lo stato aggiornando `lastUpdated`.
- `SaveSystem.reset()`: Azzera i progressi per **Nuova Partita** e sblocca solo la Casa di Paglia.
- `SaveSystem.updateHouseStep(houseKey, step)`: Aggiorna lo step di una casa; se `step >= maxSteps`, imposta `completed = true` e sblocca automaticamente la casa successiva (`straw -> wood -> brick`).
- `SaveSystem.hasSavedGame()`: Ritorna `true` se esiste una partita iniziata con progressi (`hasStarted === true`).

---

## 5. Flusso delle Schermate e Gameplay Attuale (Fase 1 - Parte A)

1. **Menù Principale (`#screen-menu`)**:
   - Mostra il titolo giocoso **"I Tre Porcellini"** e l'illustrazione `Porcellini uniti.jfif`.
   - Pulsante **Nuova Partita**: se c'è un salvataggio esistente chiede conferma amichevole, poi azzera i progressi (`SaveSystem.reset()`) e avvia l'esperienza.
   - Pulsante **Continua Partita**: visibile/attivo se esistono progressi salvati in `localStorage`; porta direttamente alla mappa delle casette o riprende dallo step salvato.
2. **Mappa del Villaggio / Selezione Casette (`#screen-map`)**:
   - Mostra le 3 tappe della Parte 1:
     1. **Casa di Paglia** (Sempre sbloccata all'inizio).
     2. **Casa di Legno** (Si sblocca completando la Casa di Paglia, oppure selezionabile liberamente se già sbloccata).
     3. **Casa di Mattoni** (Mostrata con badge *"Prossimamente"* / bloccata in questa prima release, pronta per lo sblocco).
3. **Costruzione Casa di Paglia (`straw` mode)**:
   - Al centro: il cantiere della casa (`Casa paglia 0.jfif` -> `Casa paglia 9.jpg`).
   - A sinistra: il Porcellino della Paglia (`Porcellino paglia.jfif`) con fumetto guida e barra di avanzamento stellata.
   - A destra / in basso: un grande **Mucchio di Paglia interattivo** che pulsa dolcemente.
   - Ad ogni click/tap sul mucchio di paglia:
     - Parte un'animazione di ciuffi di paglia che volano verso la casa.
     - Lo step avanza di 1 (`SaveSystem.updateHouseStep('straw', step)`).
     - Al raggiungimento dello step 9, festa di coriandoli, suono di vittoria e sblocco della **Casa di Legno**!
4. **Costruzione Casa di Legno (`wood` mode)**:
   - Al centro: il cantiere della casa (`Casa legno 0.jpg` -> `Casa legno finale.jpg`).
   - Sovrapposte alla casa: **fasce di livello (Drop Zones)** corrispondenti ai livelli della casa (basso, medio, alto, tetto basso, tetto alto, camino, porta, finestre, fioriere).
   - La zona del livello corrente viene evidenziata con un bordo luminoso tratteggiato e un'indicazione chiara per guidare il bambino.
   - A destra: la **Catasta di Legna trascinabile** (supporta `Pointer Events` unificati per Mouse e Touch).
   - Se il bambino rilascia la legna nel **livello giusto** della casa:
     - Effetto particellare + suono di costruzione legnosa, avanzamento allo step successivo e salvataggio automatico.
   - Se il bambino rilascia la legna in un **livello sbagliato** o fuori bersaglio:
     - L'asse di legno torna dolcemente al posto di partenza, il livello giusto lampeggia per aiutare il bambino e il porcellino dà un suggerimento incoraggiante.

---

## 6. Guida per gli Sviluppi Futuri (Per Agenti e Sviluppatori)

### Come attivare la Casa di Malta e Mattoni (Fase 1 - Parte B)
1. In `js/gameData.js`, l'oggetto `HOUSES_CONFIG.brick` contiene già l'elenco ordinato delle 12 immagini (`Casa mattoni 0.jpg` ... `Casa mattoni finale.jpg`) e le coordinate dei 5 livelli dei corsi di mattoni.
2. In `js/main.js`, implementare la funzione `setupBrickInteraction(step)`:
   - Se `step` è pari (`0, 2, 4, 6, 8`): attivare lo strumento **Cazzuola** (`#tool-trowel`). L'utente trascina la cazzuola lungo la drop-zone orizzontale del livello corrente (`scrubProgress` da `0%` a `100%`). Raggiunto il 100%, avanzare a `step + 1`.
   - Se `step` è dispari (`1, 3, 5, 7, 9`): attivare lo strumento **Mattoni** (`#tool-bricks`). L'utente trascina i mattoni sulla malta appena stesa nel livello corrispondente. Al drop corretto, avanzare a `step + 1`.
   - A `step === 10`: ultimo click/drop per posare il tetto e passare a `Casa mattoni finale.jpg` (`step = 11`).
3. Rimuovere il flag `comingSoon: true` da `HOUSES_CONFIG.brick` in `js/gameData.js`.

### Come implementare la Seconda Parte: Interazione col Lupo (Fase 2)
1. Quando `houses.straw.completed && houses.wood.completed && houses.brick.completed` sono tutti `true`, `SaveSystem` imposta automaticamente `wolfPhase.unlocked = true`.
2. Aggiungere una schermata `#screen-wolf` in `index.html` e uno stato `'wolf'` in `js/main.js`:
   - **Scena 1**: Il Lupo soffia sulla Casa di Paglia (`Casa paglia 9.jpg` -> `Casa paglia 0.jfif`) e il primo porcellino scappa nella Casa di Legno.
   - **Scena 2**: Il Lupo soffia più forte sulla Casa di Legno (`Casa legno finale.jpg` -> `Casa legno 0.jpg`) e i due porcellini scappano nella Casa di Mattoni.
   - **Scena 3**: Il Lupo prova a soffiare sulla Casa di Mattoni (`Casa mattoni finale.jpg`), ma la casa resiste!
