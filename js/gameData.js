/**
 * Configurazione Dati e Livelli - "I Tre Porcellini"
 * Pensato per bambini in età prescolare (con testi parlati semplici che fanno riferimento ai colori e alla manina guida).
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
          hint: 'Ciao bimbi! Aiutatemi a costruire la casetta di paglia! Toccate il cerchio giallo con la paglia dove c\'è la manina!',
          actionLabel: 'Tocca la paglia per iniziare!'
        },
        {
          hint: 'Bravissimi! Toccate ancora il mucchio di paglia gialla!',
          actionLabel: 'Aggiungi altra paglia alla base!'
        },
        {
          hint: 'Che bello! Toccate ancora la paglia per alzare tutti i muri!',
          actionLabel: 'Costruisci i muri di paglia!'
        },
        {
          hint: 'I muri sono pronti! Toccate ancora il mucchio giallo per fare il tetto!',
          actionLabel: 'Metti la paglia sul tetto!'
        },
        {
          hint: 'Continuate così! Un altro tocco sulla paglia per coprire tutto il tetto!',
          actionLabel: 'Completa il tetto di paglia!'
        },
        {
          hint: 'Ora facciamo il comignolo lassù in alto! Toccate ancora la paglia!',
          actionLabel: 'Costruisci il comignolo!'
        },
        {
          hint: 'Adesso mettiamo una bella porta per entrare! Toccate il mucchio giallo!',
          actionLabel: 'Aggiungi la porta!'
        },
        {
          hint: 'Mettiamo le tendine colorate alle finestre! Toccate ancora la paglia!',
          actionLabel: 'Aggiungi le tendine!'
        },
        {
          hint: 'Ultimo tocco! Toccate la paglia per decorare tutta la casetta!',
          actionLabel: 'Ultimo tocco!'
        },
        {
          hint: 'Evviva! Avete costruito tutta la Casetta di Paglia! Siete stati super bravi!',
          actionLabel: 'Casetta completata!'
        }
      ]
    },

    wood: {
      key: 'wood',
      title: 'La Casetta di Legno',
      pigName: 'Timmi (Legno)',
      pigAvatar: 'Porcellino legno.jfif',
      mechanicLabel: 'Trascina la legna dove indica la manina!',
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
      stepsInfo: [
        {
          targetZone: { top: 63, left: 16, width: 68, height: 22 },
          levelName: 'In basso: Base dei Muri',
          itemIcon: '🪵',
          itemLabel: 'Assi Base',
          hint: 'Ora costruiamo la Casetta di Legno! Guardate la manina: prendete il legno marrone e portatelo in basso nel riquadro verde!'
        },
        {
          targetZone: { top: 47, left: 16, width: 68, height: 19 },
          levelName: 'Al centro: Metà dei Muri',
          itemIcon: '🪵',
          itemLabel: 'Assi Centrali',
          hint: 'Bravissimi! Adesso portate il legno un po\' più su, al centro della casa vicino alle finestre!'
        },
        {
          targetZone: { top: 28, left: 20, width: 42, height: 20 },
          levelName: 'In alto: Sottotetto',
          itemIcon: '🪵',
          itemLabel: 'Assi Alte',
          hint: 'Saliamo ancora! Portate il legno in alto, dove indica la manina!'
        },
        {
          targetZone: { top: 34, left: 42, width: 46, height: 21 },
          levelName: 'Tetto in basso',
          itemIcon: '🟫',
          itemLabel: 'Scandole Basse',
          hint: 'I muri sono pronti! Ora prendete le tegole di legno e portatele sulla parte bassa del tetto!'
        },
        {
          targetZone: { top: 14, left: 32, width: 46, height: 21 },
          levelName: 'Cima del Tetto',
          itemIcon: '🟫',
          itemLabel: 'Scandole Alte',
          hint: 'Quasi finito il tetto! Portate il legno lassù in cima al tetto!'
        },
        {
          targetZone: { top: 4, left: 50, width: 20, height: 24 },
          levelName: 'Il Camino in cima',
          itemIcon: '🧱',
          itemLabel: 'Camino',
          hint: 'Adesso portate il pezzo lassù in alto per fare il camino che fuma!'
        },
        {
          targetZone: { top: 53, left: 26, width: 19, height: 30 },
          levelName: 'La Porta d\'Ingresso',
          itemIcon: '🚪',
          itemLabel: 'Porta di Legno',
          hint: 'Prendete la porta di legno e mettetela in basso per chiudere l\'entrata!'
        },
        {
          targetZone: { top: 33, left: 28, width: 52, height: 38 },
          levelName: 'Le Finestre',
          itemIcon: '🪟',
          itemLabel: 'Tendine Verdi',
          hint: 'Che bella! Portate le tendine verdi sulle finestre della casetta!'
        },
        {
          targetZone: { top: 64, left: 40, width: 40, height: 18 },
          levelName: 'I Fiori sotto le Finestre',
          itemIcon: '🌸',
          itemLabel: 'Fioriere in Legno',
          hint: 'Mettiamo i fiorellini colorati! Portateli sotto le finestre nel riquadro verde!'
        },
        {
          targetZone: { top: 72, left: 64, width: 22, height: 19 },
          levelName: 'Legnaia in basso a destra',
          itemIcon: '🪵',
          itemLabel: 'Scorta di Legna',
          hint: 'Ultimo pezzo! Portate i tronchetti di legna in basso a destra vicino al prato!'
        },
        {
          targetZone: null,
          levelName: 'Casetta di Legno Completata!',
          itemIcon: '⭐',
          itemLabel: 'Completata!',
          hint: 'Evviva! Anche la Casetta di Legno è pronta! Siete stati bravissimi!'
        }
      ]
    },

    brick: {
      key: 'brick',
      title: 'La Casetta di Mattoni',
      pigName: 'Tommy (Mattoni)',
      pigAvatar: 'Porcellino mattoni.jfif',
      mechanicLabel: 'Alterna la malta con la cazzuola e i mattoni!',
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
      stepsInfo: [
        {
          actionType: 'mortar',
          courseNumber: 1,
          targetZone: { top: 73, left: 17, width: 66, height: 13 },
          levelName: 'Livello 1: Spargi la Malta!',
          targetBadge: '🥄 Strofina qui la Cazzuola avanti e indietro!',
          hint: 'Costruiamo la Casetta di Mattoni! Guardate la manina: prendete la cazzuola grigia e strofinatela avanti e indietro nel riquadro blu per spargere tutta la malta!'
        },
        {
          actionType: 'brick',
          courseNumber: 1,
          targetZone: { top: 73, left: 17, width: 66, height: 13 },
          levelName: 'Livello 1: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Bravo, la malta è stesa! Ora prendi i mattoni rossi qui sotto e portali nel riquadro verde!'
        },
        {
          actionType: 'mortar',
          courseNumber: 2,
          targetZone: { top: 70, left: 17, width: 66, height: 13 },
          levelName: 'Livello 2: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola avanti e indietro!',
          hint: 'Adesso ci vuole altra malta! Prendi la cazzuola grigia e passala tante volte avanti e indietro nel riquadro blu!'
        },
        {
          actionType: 'brick',
          courseNumber: 2,
          targetZone: { top: 70, left: 17, width: 66, height: 13 },
          levelName: 'Livello 2: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Perfetto! Ora prendi i mattoni rossi e portali sopra la malta nel riquadro verde!'
        },
        {
          actionType: 'mortar',
          courseNumber: 3,
          targetZone: { top: 67, left: 17, width: 66, height: 13 },
          levelName: 'Livello 3: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola avanti e indietro!',
          hint: 'Il muro cresce! Prendi ancora la cazzuola grigia e strofinala bene da un lato all\'altro nel riquadro blu!'
        },
        {
          actionType: 'brick',
          courseNumber: 3,
          targetZone: { top: 67, left: 17, width: 66, height: 13 },
          levelName: 'Livello 3: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Molto bene! Ora prendi i mattoni rossi e posali nel riquadro verde!'
        },
        {
          actionType: 'mortar',
          courseNumber: 4,
          targetZone: { top: 64, left: 17, width: 66, height: 13 },
          levelName: 'Livello 4: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola avanti e indietro!',
          hint: 'Tocca ancora alla malta! Passa la cazzuola grigia avanti e indietro nel riquadro blu finché non è pieno!'
        },
        {
          actionType: 'brick',
          courseNumber: 4,
          targetZone: { top: 64, left: 17, width: 66, height: 13 },
          levelName: 'Livello 4: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Bravissimo! Adesso trascina i mattoni rossi nel riquadro verde!'
        },
        {
          actionType: 'mortar',
          courseNumber: 5,
          targetZone: { top: 61, left: 17, width: 66, height: 13 },
          levelName: 'Livello 5: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola avanti e indietro!',
          hint: 'Siamo quasi alle finestre! Prendi la cazzuola grigia e strofinala avanti e indietro nel riquadro blu!'
        },
        {
          actionType: 'brick',
          courseNumber: 5,
          targetZone: { top: 61, left: 17, width: 66, height: 13 },
          levelName: 'Livello 5: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Ottimo! Ora porta i mattoni rossi nel riquadro verde sotto le finestre!'
        },
        {
          actionType: 'mortar',
          courseNumber: 6,
          targetZone: { top: 28, left: 18, width: 64, height: 32 },
          levelName: 'Parte Alta: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola in alto!',
          hint: 'Adesso prepariamo la parte alta della casa! Prendi la cazzuola grigia e passala avanti e indietro nel riquadro blu in alto!'
        },
        {
          actionType: 'brick',
          courseNumber: 6,
          targetZone: { top: 22, left: 18, width: 64, height: 38 },
          levelName: 'Parte Alta: Posa Mattoni e Tetto!',
          targetBadge: '🧱 Porta qui gli ultimi Mattoni!',
          hint: 'Ultimo passo! Prendi i mattoni rossi e portali in alto nel riquadro verde per finire tutta la casa!'
        },
        {
          actionType: 'done',
          targetZone: null,
          levelName: 'Casetta di Mattoni Completata!',
          targetBadge: 'Completata!',
          hint: 'Urrà! Hai costruito una Casetta di Mattoni fortissima! I tre porcellini ti dicono grazie!'
        }
      ]
    }
  };

  global.HOUSES_CONFIG = HOUSES_CONFIG;
})(window);
