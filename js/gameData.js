/**
 * Configurazione Dati e Livelli - "I Tre Porcellini"
 * Mappa completa degli asset, testi guida per bambini e coordinate dei livelli.
 */
(function (global) {
  const HOUSES_CONFIG = {
    straw: {
      key: 'straw',
      title: 'La Casetta di Paglia',
      pigName: 'Gimmi (Paglia)',
      pigAvatar: 'Porcellino paglia.jfif',
      mechanicLabel: 'Tocca il mucchio di paglia!',
      maxSteps: 9,
      images: [
        'Casa paglia 0.jfif',
        'Casa paglia 1.jpg',
        'Casa paglia 2.jpg',
        'Casa paglia 3.jpg',
        'Casa paglia 4.jpg',
        'Casa paglia 5.jpg',
        'Casa paglia 6.jpg',
        'Casa paglia 7.jpg',
        'Casa paglia 8.jpg',
        'Casa paglia 9.jpg'
      ],
      stepsInfo: [
        {
          hint: 'Ciao! Aiutami a costruire la mia casetta! Tocca il mucchio di paglia dorata!',
          actionLabel: 'Tocca la paglia per iniziare la base!'
        },
        {
          hint: 'Evviva! Abbiamo messo il primo strato! Tocca ancora il mucchio di paglia!',
          actionLabel: 'Rinforza la base di paglia!'
        },
        {
          hint: 'Che bella! Ora alziamo i muri di paglia: tocca ancora il mucchio!',
          actionLabel: 'Costruisci i muri di paglia!'
        },
        {
          hint: 'I muri sono pronti! Adesso iniziamo a coprire il tetto!',
          actionLabel: 'Metti la paglia sul tetto!'
        },
        {
          hint: 'Continua così! Copriamo tutto il tetto con tanta paglia morbida!',
          actionLabel: 'Completa il tetto di paglia!'
        },
        {
          hint: 'Manca il comignolo lassù in alto! Tocca il mucchio di paglia!',
          actionLabel: 'Intreccia il comignolo di paglia!'
        },
        {
          hint: 'Ora ci serve una bella porta di legno per entrare in casa!',
          actionLabel: 'Aggiungi la porta!'
        },
        {
          hint: 'Mettiamo delle tendine colorate alle finestre!',
          actionLabel: 'Aggiungi le tendine!'
        },
        {
          hint: 'Un ultimo tocco per decorare la casetta con tante belle spighe!',
          actionLabel: 'Ultimo tocco: decora la casetta!'
        },
        {
          hint: 'Urrà! La Casetta di Paglia è finita! Sei stato bravissimo!',
          actionLabel: 'Casetta completata!'
        }
      ]
    },

    wood: {
      key: 'wood',
      title: 'La Casetta di Legno',
      pigName: 'Timmi (Legno)',
      pigAvatar: 'Porcellino legno.jfif',
      mechanicLabel: 'Trascina la legna al livello giusto della casa!',
      maxSteps: 10,
      images: [
        'Casa legno 0.jpg',
        'Casa legno 1.jpg',
        'Casa legno 2.jpg',
        'Casa legno 3.jpg',
        'Casa legno 4.jpg',
        'Casa legno 5.jpg',
        'Casa legno 6.jpg',
        'Casa legno 7.jpg',
        'Casa legno 8.jpg',
        'Casa legno 9.jpg',
        'Casa legno finale.jpg'
      ],
      /**
       * Ogni step (da 0 a 9) richiede di trascinare la legna nella zona/livello corrispondente
       * per passare a step + 1. Coordinate espresse in percentuale rispetto al riquadro dell'immagine casa.
       */
      stepsInfo: [
        {
          targetZone: { top: 63, left: 16, width: 68, height: 22 },
          levelName: 'Livello 1: Base dei Muri (In basso)',
          itemIcon: '🪵',
          itemLabel: 'Assi Base',
          hint: 'Iniziamo dal basso! Trascina le assi di legno nella fascia BASSA dei muri!'
        },
        {
          targetZone: { top: 47, left: 16, width: 68, height: 19 },
          levelName: 'Livello 2: Metà dei Muri (Al centro)',
          itemIcon: '🪵',
          itemLabel: 'Assi Centrali',
          hint: 'Ottimo! Ora porta le assi un po\' più su, al livello MEDIO intorno alle finestre!'
        },
        {
          targetZone: { top: 28, left: 20, width: 42, height: 20 },
          levelName: 'Livello 3: Cima dei Muri (Sottotetto)',
          itemIcon: '🪵',
          itemLabel: 'Assi Alte',
          hint: 'Saliamo ancora! Porta le assi in ALTO vicino alla finestrella del sottotetto!'
        },
        {
          targetZone: { top: 34, left: 42, width: 46, height: 21 },
          levelName: 'Livello 4: Parte Bassa del Tetto',
          itemIcon: '🟫',
          itemLabel: 'Scandole Basse',
          hint: 'I muri sono finiti! Ora trascina le tegole di legno nella parte BASSA del tetto!'
        },
        {
          targetZone: { top: 14, left: 32, width: 46, height: 21 },
          levelName: 'Livello 5: Cima del Tetto',
          itemIcon: '🟫',
          itemLabel: 'Scandole Alte',
          hint: 'Quasi tutto coperto! Porta le tegole di legno fino in CIMA al tetto!'
        },
        {
          targetZone: { top: 4, left: 50, width: 20, height: 24 },
          levelName: 'Livello 6: Il Camino (In alto a destra)',
          itemIcon: '🧱',
          itemLabel: 'Camino',
          hint: 'Adesso completiamo il CAMINO lassù in cima al tetto!'
        },
        {
          targetZone: { top: 53, left: 26, width: 19, height: 30 },
          levelName: 'Livello 7: La Porta d\'Ingresso',
          itemIcon: '🚪',
          itemLabel: 'Porta di Legno',
          hint: 'Trascina la robusta PORTA di legno nell\'arco d\'ingresso in basso!'
        },
        {
          targetZone: { top: 33, left: 28, width: 52, height: 38 },
          levelName: 'Livello 8: Le Finestre',
          itemIcon: '🪟',
          itemLabel: 'Tendine Verdi',
          hint: 'Che bella! Portiamo le tendine verdi a quadretti sulle FINESTRE!'
        },
        {
          targetZone: { top: 64, left: 40, width: 40, height: 18 },
          levelName: 'Livello 9: Fioriere sotto le Finestre',
          itemIcon: '🌸',
          itemLabel: 'Fioriere in Legno',
          hint: 'Aggiungiamo le FIORIERE di legno piene di fiori sotto le finestre!'
        },
        {
          targetZone: { top: 72, left: 64, width: 22, height: 19 },
          levelName: 'Livello 10: Catasta di Legna (In basso a destra)',
          itemIcon: '🪵',
          itemLabel: 'Scorta di Legna',
          hint: 'Ultimo passo! Metti la scorta di legna per l\'inverno in basso a destra accanto alla casa!'
        },
        {
          targetZone: null,
          levelName: 'Casetta di Legno Completata!',
          itemIcon: '⭐',
          itemLabel: 'Completata!',
          hint: 'Fantastico! Hai costruito tutta la Casetta di Legno mettendo ogni pezzo al livello giusto!'
        }
      ]
    },

    // Livello 3: Casa di Malta e Mattoni (Alternanza Cazzuola con Malta -> Posa Mattoni)
    brick: {
      key: 'brick',
      title: 'La Casetta di Mattoni',
      pigName: 'Tommy (Mattoni)',
      pigAvatar: 'Porcellino mattoni.jfif',
      mechanicLabel: 'Alterna la malta con la cazzuola e i mattoni al livello giusto!',
      comingSoon: false,
      maxSteps: 12,
      images: [
        'Casa mattoni 0.jpg',
        'Casa mattoni 1.jpg',
        'Casa mattoni 2.jpg',
        'Casa mattoni 3.jpg',
        'Casa mattoni 4.jpg',
        'Casa mattoni 5.jpg',
        'Casa mattoni 6.jpg',
        'Casa mattoni 7.jpg',
        'Casa mattoni 8.jpg',
        'Casa mattoni 9.jpg',
        'Casa mattoni 10.jpg',
        'Casa mattoni 10.jpg',
        'Casa mattoni finale.jpg'
      ],
      /**
       * Ogni livello richiede due fasi:
       * 1) actionType: 'mortar' -> Passare la cazzuola nel punto giusto per spargere la malta.
       * 2) actionType: 'brick'  -> Portare i mattoni nel giusto livello sopra la malta.
       */
      stepsInfo: [
        {
          actionType: 'mortar',
          courseNumber: 1,
          targetZone: { top: 73, left: 17, width: 66, height: 13 },
          levelName: 'Livello 1 (Base): Spargi la Malta!',
          targetBadge: '🥄 Passa qui la Cazzuola con la Malta! (Livello 1)',
          hint: 'Ciao! Costruiamo una casa fortissima! Prima prendi la CAZZUOLA e passala sulla base per spargere la malta!'
        },
        {
          actionType: 'brick',
          courseNumber: 1,
          targetZone: { top: 73, left: 17, width: 66, height: 13 },
          levelName: 'Livello 1 (Base): Posa i Mattoni!',
          targetBadge: '🧱 Posa qui i Mattoni sopra la malta! (Livello 1)',
          hint: 'Bravo! La malta è pronta! Ora trascina i MATTONI sul primo livello sopra la malta!'
        },
        {
          actionType: 'mortar',
          courseNumber: 2,
          targetZone: { top: 70, left: 17, width: 66, height: 13 },
          levelName: 'Livello 2: Spargi la Malta!',
          targetBadge: '🥄 Passa qui la Cazzuola con la Malta! (Livello 2)',
          hint: 'Primo giro di mattoni messo! Adesso alterniamo: passa la CAZZUOLA sul secondo livello per stendere la malta!'
        },
        {
          actionType: 'brick',
          courseNumber: 2,
          targetZone: { top: 70, left: 17, width: 66, height: 13 },
          levelName: 'Livello 2: Posa i Mattoni!',
          targetBadge: '🧱 Posa qui i Mattoni! (Livello 2)',
          hint: 'Perfetto! Ora prendi i MATTONI e portali sul secondo livello sopra la malta fresca!'
        },
        {
          actionType: 'mortar',
          courseNumber: 3,
          targetZone: { top: 67, left: 17, width: 66, height: 13 },
          levelName: 'Livello 3: Spargi la Malta!',
          targetBadge: '🥄 Passa qui la Cazzuola con la Malta! (Livello 3)',
          hint: 'Il muro sale! Prendi di nuovo la CAZZUOLA e spargi la malta sul terzo livello!'
        },
        {
          actionType: 'brick',
          courseNumber: 3,
          targetZone: { top: 67, left: 17, width: 66, height: 13 },
          levelName: 'Livello 3: Posa i Mattoni!',
          targetBadge: '🧱 Posa qui i Mattoni! (Livello 3)',
          hint: 'Ottimo lavoro con la cazzuola! Ora trascina i MATTONI sul terzo livello!'
        },
        {
          actionType: 'mortar',
          courseNumber: 4,
          targetZone: { top: 64, left: 17, width: 66, height: 13 },
          levelName: 'Livello 4: Spargi la Malta!',
          targetBadge: '🥄 Passa qui la Cazzuola con la Malta! (Livello 4)',
          hint: 'Tocca ancora alla malta! Passa la CAZZUOLA sul quarto livello dei muri!'
        },
        {
          actionType: 'brick',
          courseNumber: 4,
          targetZone: { top: 64, left: 17, width: 66, height: 13 },
          levelName: 'Livello 4: Posa i Mattoni!',
          targetBadge: '🧱 Posa qui i Mattoni! (Livello 4)',
          hint: 'Malta stesa! Adesso porta i MATTONI al quarto livello della casa!'
        },
        {
          actionType: 'mortar',
          courseNumber: 5,
          targetZone: { top: 61, left: 17, width: 66, height: 13 },
          levelName: 'Livello 5: Spargi la Malta!',
          targetBadge: '🥄 Passa qui la Cazzuola con la Malta! (Livello 5)',
          hint: 'Siamo quasi alle finestre! Passa la CAZZUOLA sul quinto livello per mettere la malta!'
        },
        {
          actionType: 'brick',
          courseNumber: 5,
          targetZone: { top: 61, left: 17, width: 66, height: 13 },
          levelName: 'Livello 5: Posa i Mattoni!',
          targetBadge: '🧱 Posa qui i Mattoni! (Livello 5)',
          hint: 'Bravissimo! Ora posa i MATTONI sul quinto livello fino al davanzale delle finestre!'
        },
        {
          actionType: 'mortar',
          courseNumber: 6,
          targetZone: { top: 28, left: 18, width: 64, height: 32 },
          levelName: 'Livello 6 (Parte Alta): Spargi la Malta!',
          targetBadge: '🥄 Passa qui la Cazzuola sui Muri Alti! (Livello 6)',
          hint: 'La base è solidissima! Ora passa la CAZZUOLA nella parte ALTA della casa per preparare i muri superiori!'
        },
        {
          actionType: 'brick',
          courseNumber: 6,
          targetZone: { top: 22, left: 18, width: 64, height: 38 },
          levelName: 'Livello 6 (Parte Alta): Posa Mattoni e Tetto!',
          targetBadge: '🧱 Porta qui gli ultimi Mattoni e Tegole! (Livello 6)',
          hint: 'Ultimo passo! Trascina i MATTONI nella parte ALTA per completare i muri, il tetto e le fioriere!'
        },
        {
          actionType: 'done',
          targetZone: null,
          levelName: 'Casetta di Mattoni Completata!',
          targetBadge: 'Completata!',
          hint: 'Urrà! Hai costruito una Casetta di Malta e Mattoni super resistente! Nessun lupo potrà buttarla giù!'
        }
      ]
    }
  };

  global.HOUSES_CONFIG = HOUSES_CONFIG;
})(window);
