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
        'Casa mattoni prog 1.jpg',
        'Casa mattoni prog 2.jpg',
        'Casa mattoni prog 3.jpg',
        'Casa mattoni prog 4.jpg',
        'Casa mattoni prog 5.jpg',
        'Casa mattoni prog 6.jpg',
        'Casa mattoni prog 7.jpg',
        'Casa mattoni prog 8.jpg',
        'Casa mattoni prog 9.jpg',
        'Casa mattoni prog 10.jpg',
        'Casa mattoni prog 11.jpg',
        'Casa mattoni finale.jpg'
      ],
      stepsInfo: [
        {
          actionType: 'mortar',
          courseNumber: 1,
          targetZone: { top: 69, left: 17, width: 66, height: 15 },
          levelName: '1. Base dei Muri: Spargi la Malta!',
          targetBadge: '🥄 Strofina qui la Cazzuola avanti e indietro!',
          hint: 'Costruiamo la Casetta di Mattoni! Guardate la manina: prendete la cazzuola grigia e strofinatela avanti e indietro in basso nel riquadro blu per spargere la malta!'
        },
        {
          actionType: 'brick',
          courseNumber: 1,
          targetZone: { top: 69, left: 17, width: 66, height: 15 },
          levelName: '1. Base dei Muri: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Guardate quanta malta grigia! Ora prendete i mattoni rossi e portateli in basso nel riquadro verde!'
        },
        {
          actionType: 'mortar',
          courseNumber: 2,
          targetZone: { top: 61, left: 17, width: 66, height: 15 },
          levelName: '2. Sotto le Finestre: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola avanti e indietro!',
          hint: 'I primi mattoni sono al loro posto! Prendete ancora la cazzuola grigia e strofinatela nel riquadro blu sotto le finestre!'
        },
        {
          actionType: 'brick',
          courseNumber: 2,
          targetZone: { top: 61, left: 17, width: 66, height: 15 },
          levelName: '2. Sotto le Finestre: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Bravissimi, la malta è pronta! Ora portate i mattoni rossi nel riquadro verde fino alle finestre!'
        },
        {
          actionType: 'mortar',
          courseNumber: 3,
          targetZone: { top: 53, left: 17, width: 66, height: 16 },
          levelName: '3. Metà Muri e Finestre: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola sui Muri Centrali!',
          hint: 'Adesso saliamo a metà casa! Prendete la cazzuola grigia e strofinatela avanti e indietro nel riquadro blu vicino alle finestre!'
        },
        {
          actionType: 'brick',
          courseNumber: 3,
          targetZone: { top: 53, left: 17, width: 66, height: 16 },
          levelName: '3. Metà Muri e Finestre: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'La malta grigia è pronta! Ora portate i mattoni rossi nel riquadro verde per alzare i muri intorno alle finestre!'
        },
        {
          actionType: 'mortar',
          courseNumber: 4,
          targetZone: { top: 44, left: 17, width: 66, height: 17 },
          levelName: '4. Arco della Porta e Muri Alti: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola sopra la Porta!',
          hint: 'Saliamo ancora! Prendete la cazzuola grigia e strofinatela nel riquadro blu sopra l\'arco della porta e le finestre!'
        },
        {
          actionType: 'brick',
          courseNumber: 4,
          targetZone: { top: 44, left: 17, width: 66, height: 17 },
          levelName: '4. Arco della Porta e Muri Alti: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni rossi!',
          hint: 'Perfetto! Adesso trascinate i mattoni rossi nel riquadro verde per completare l\'arco della porta e tutto il piano terra!'
        },
        {
          actionType: 'mortar',
          courseNumber: 5,
          targetZone: { top: 22, left: 18, width: 42, height: 28 },
          levelName: '5. Il Sottotetto: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola sul Sottotetto!',
          hint: 'Che alti questi muri! Ora prendete la cazzuola grigia e strofinatela avanti e indietro nel riquadro blu in alto sul sottotetto!'
        },
        {
          actionType: 'brick',
          courseNumber: 5,
          targetZone: { top: 22, left: 18, width: 42, height: 28 },
          levelName: '5. Il Sottotetto: Posa i Mattoni!',
          targetBadge: '🧱 Porta qui i Mattoni per il Sottotetto!',
          hint: 'Il sottotetto ha tutta la malta! Portate i mattoni rossi nel riquadro verde in alto per arrivare fino alla punta del tetto!'
        },
        {
          actionType: 'mortar',
          courseNumber: 6,
          targetZone: { top: 8, left: 36, width: 52, height: 38 },
          levelName: '6. Tetto e Camino: Spargi la Malta!',
          targetBadge: '🥄 Strofina la Cazzuola su Tetto e Camino!',
          hint: 'Mancano solo il tetto e il camino lassù in cima! Prendete la cazzuola grigia e strofinatela avanti e indietro nel riquadro blu in alto!'
        },
        {
          actionType: 'brick',
          courseNumber: 6,
          targetZone: { top: 8, left: 36, width: 52, height: 38 },
          levelName: '6. Tetto e Camino: Ultimi Mattoni!',
          targetBadge: '🧱 Porta qui gli ultimi Mattoni!',
          hint: 'Ultimo passo! Prendete i mattoni rossi e portateli lassù nel riquadro verde per completare il tetto, il camino e tutta la casa!'
        },
        {
          actionType: 'done',
          targetZone: null,
          levelName: 'Casetta di Mattoni Completata!',
          targetBadge: 'Completata!',
          hint: 'Urrà! Avete costruito una Casetta di Mattoni fortissima passo dopo passo! I tre porcellini vi dicono grazie!'
        }
      ]
    }
  };

  global.HOUSES_CONFIG = HOUSES_CONFIG;
})(window);
