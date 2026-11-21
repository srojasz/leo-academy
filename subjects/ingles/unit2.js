'use strict';
/* ============================================================
   INGLÉS · Unit 2 — Listen to your art (Amazing Journey 5)
   Vocabulario: Adjectives 1 y 2
   Gramática: comparativos y superlativos · as … as / not as … as
   Funcional: buying tickets · pronunciación th · being polite
   Skills: reading (perspective, depth) · listening (A2 Flyers)
   ============================================================ */
(() => {
  /* ---------- Datos base ---------- */
  const ADJ1 = [
    ['bad', 'malo', '👎'], ['boring', 'aburrido', '😴'], ['cheap', 'barato', '🪙'], ['dark', 'oscuro', '🌑'],
    ['expensive', 'caro', '💰'], ['good', 'bueno', '👍'], ['horrible', 'horrible', '🤢'], ['light', 'claro, luminoso', '☀️'],
    ['modern', 'moderno', '🏙️'], ['silly', 'tonto, ridículo', '🤪'], ['weird', 'raro', '👽']
  ];
  const ADJ2 = [
    ['creative', 'creativo', '🎨'], ['exciting', 'emocionante', '🎢'], ['funny', 'gracioso', '😂'],
    ['inventive', 'ingenioso, que inventa', '💡'], ['lovely', 'precioso, encantador', '🌸'], ['popular', 'popular', '🙌'],
    ['shy', 'tímido', '🙈'], ['successful', 'que tiene éxito', '🏆'], ['talented', 'con talento', '⭐']
  ];
  const VOCAB = [...ADJ1, ...ADJ2];

  const COMP = [
    ['cheap', 'cheaper', 'cheapest'], ['dark', 'darker', 'darkest'], ['light', 'lighter', 'lightest'],
    ['weird', 'weirder', 'weirdest'], ['tall', 'taller', 'tallest'], ['old', 'older', 'oldest'],
    ['young', 'younger', 'youngest'], ['small', 'smaller', 'smallest'], ['big', 'bigger', 'biggest'],
    ['hot', 'hotter', 'hottest'], ['silly', 'sillier', 'silliest'], ['funny', 'funnier', 'funniest'],
    ['happy', 'happier', 'happiest'], ['expensive', 'more expensive', 'most expensive'],
    ['boring', 'more boring', 'most boring'], ['modern', 'more modern', 'most modern'],
    ['creative', 'more creative', 'most creative'], ['exciting', 'more exciting', 'most exciting'],
    ['popular', 'more popular', 'most popular'], ['talented', 'more talented', 'most talented'],
    ['successful', 'more successful', 'most successful'], ['good', 'better', 'best'], ['bad', 'worse', 'worst']
  ];
  const rule = a => {
    if (a === 'good') return '<b>good</b> es irregular: good → <b>better</b> → <b>the best</b>.';
    if (a === 'bad') return '<b>bad</b> es irregular: bad → <b>worse</b> → <b>the worst</b>.';
    const c = COMP.find(x => x[0] === a);
    if (c[1].startsWith('more')) return `<b>${a}</b> es una palabra larga → <b>more</b> / <b>the most</b>.`;
    if (a.endsWith('y')) return `<b>${a}</b> acaba en <b>-y</b> → quita la y y pon <b>-ier</b> / <b>-iest</b>.`;
    if (c[1] !== a + 'er') return `<b>${a}</b> es corta y acaba en vocal + consonante → <b>dobla la consonante</b>: ${c[1]}.`;
    return `<b>${a}</b> es corta → <b>+er</b> / <b>+est</b>.`;
  };

  const vocabTable = list => `<div class="vocab-grid">${list.map(([en, es, emo]) =>
    `<div class="vocab"><span class="emo">${emo}</span><say>${en}</say><span class="muted">${es}</span></div>`).join('')}</div>`;

  const tf = (q, isTrue, explain, extra) => ({ q, options: ['True', 'False'], answer: isTrue ? 'True' : 'False', keep: true, explain, ...extra });

  /* ---------- Contenido de juegos ---------- */
  const ADJ_CONTEXT = [
    { q: "The ticket costs €200! It's very ______.", qes: '¡La entrada cuesta 200 €! Es muy ______.', options: ['expensive', 'cheap', 'shy'], explain: '<b>expensive</b> = caro.' },
    { q: "This scarf only costs €3. It's ______.", qes: 'Esta bufanda solo cuesta 3 €. Es ______.', options: ['cheap', 'expensive', 'dark'], explain: '<b>cheap</b> = barato.' },
    { q: 'The match finished 0-0 and nothing happened. It was ______.', qes: 'El partido acabó 0-0 y no pasó nada. Fue ______.', options: ['boring', 'exciting', 'lovely'], explain: '<b>boring</b> = aburrido.' },
    { q: 'Barça won 4-3 in the last minute! The match was really ______!', qes: '¡El Barça ganó 4-3 en el último minuto! El partido fue muy ______.', options: ['exciting', 'boring', 'cheap'], explain: '<b>exciting</b> = emocionante.' },
    { q: "This painting is black and grey. It's very ______.", qes: 'Este cuadro es negro y gris. Es muy ______.', options: ['dark', 'light', 'funny'], explain: '<b>dark</b> = oscuro.' },
    { q: "This painting is white and yellow. It's very ______.", qes: 'Este cuadro es blanco y amarillo. Es muy ______.', options: ['light', 'dark', 'shy'], explain: '<b>light</b> = claro, luminoso.' },
    { q: "Tom doesn't talk much when he meets new people. He's ______.", qes: 'Tom no habla mucho cuando conoce a gente nueva. Es ______.', options: ['shy', 'popular', 'funny'], explain: '<b>shy</b> = tímido.' },
    { q: "The clown makes everybody laugh. He's very ______.", qes: 'El payaso hace reír a todo el mundo. Es muy ______.', options: ['funny', 'boring', 'dark'], explain: '<b>funny</b> = gracioso.' },
    { q: "Everybody likes Ana. She's really ______ at school.", qes: 'A todo el mundo le cae bien Ana. Es muy ______ en el colegio.', options: ['popular', 'shy', 'horrible'], explain: '<b>popular</b> = popular, le gusta a todos.' },
    { q: "Our team wins a lot of trophies. It's a very ______ team.", qes: 'Nuestro equipo gana muchos trofeos. Es un equipo muy ______.', options: ['successful', 'boring', 'cheap'], explain: '<b>successful</b> = que tiene éxito.' },
    { q: "Marc plays the piano very well. He's ______.", qes: 'Marc toca el piano muy bien. Es ______.', options: ['talented', 'silly', 'dark'], explain: '<b>talented</b> = con talento.' },
    { q: "Luke loves painting and drawing. He's very ______.", qes: 'A Luke le encanta pintar y dibujar. Es muy ______.', options: ['creative', 'shy', 'cheap'], explain: '<b>creative</b> = creativo.' },
    { q: "Ann can always think of a new way to do something. She's ______.", qes: 'Ann siempre piensa una forma nueva de hacer las cosas. Es ______.', options: ['inventive', 'boring', 'horrible'], explain: '<b>inventive</b> = ingeniosa, que inventa cosas.' },
    { q: "A cat with three eyes playing football? That's ______!", qes: '¿Un gato con tres ojos jugando al fútbol? ¡Eso es ______!', options: ['weird', 'cheap', 'light'], explain: '<b>weird</b> = raro.' },
    { q: "The new stadium has big screens and lots of new things. It's very ______.", qes: 'El estadio nuevo tiene pantallas gigantes y muchas cosas nuevas. Es muy ______.', options: ['modern', 'shy', 'boring'], explain: '<b>modern</b> = moderno.' },
    { q: "The flowers in the garden are beautiful. They're ______.", qes: 'Las flores del jardín son bonitas. Son ______.', options: ['lovely', 'horrible', 'dark'], explain: '<b>lovely</b> = precioso, encantador.' },
    { q: "I hate this painting! It's ______!", qes: '¡Odio este cuadro! ¡Es ______!', options: ['horrible', 'lovely', 'successful'], explain: '<b>horrible</b> = horrible. ¡Ojo! Decirlo delante del artista es de mala educación 😅' },
    { q: "My dog is wearing sunglasses and dancing. It's so ______!", qes: 'Mi perro lleva gafas de sol y está bailando. ¡Es tan ______!', options: ['silly', 'expensive', 'shy'], explain: '<b>silly</b> = tonto, ridículo (de risa).' },
    { q: "The pizza is cold and it tastes terrible. It's ______.", qes: 'La pizza está fría y sabe fatal. Es ______.', options: ['bad', 'good', 'talented'], explain: '<b>bad</b> = malo.' },
    { q: "Pedri passes the ball really well. He's a ______ player.", qes: 'Pedri pasa el balón muy bien. Es un jugador ______.', options: ['good', 'cheap', 'dark'], explain: '<b>good</b> = bueno.' }
  ];

  const LISTEN_WORDS = VOCAB.map(([en, es, emo]) => {
    const others = sample(VOCAB.filter(v => v[0] !== en), 2);
    return { say: en, q: '¿Qué palabra has oído?', options: [`${emo} ${es}`, ...others.map(o => `${o[2]} ${o[1]}`)] };
  });

  const SCRAMBLE = VOCAB.filter(v => v[0].length > 3).map(([word, hint, emoji]) => ({ word, hint, emoji }));

  const CLASSIFY_ADJ = [
    { text: 'dark', b: 'col' }, { text: 'light', b: 'col' },
    { text: 'cheap', b: 'mon' }, { text: 'expensive', b: 'mon' },
    { text: 'good', b: 'pos' }, { text: 'lovely', b: 'pos' }, { text: 'exciting', b: 'pos' }, { text: 'talented', b: 'pos' },
    { text: 'bad', b: 'neg' }, { text: 'horrible', b: 'neg' }, { text: 'boring', b: 'neg' }, { text: 'silly', b: 'neg' }
  ];

  const COMP_TYPE = COMP.flatMap(([a, c, s]) => [
    { prompt: `Comparativo de <b>${a}</b>:<br><span class="muted">(más … que)</span>`, answer: c, explain: rule(a) },
    { prompt: `Superlativo de <b>${a}</b>:<br>the ______ <span class="muted">(el más …)</span>`, answer: [s, 'the ' + s], explain: rule(a) }
  ]);

  const GRAMMAR_COMP = [
    { q: 'good → ______', options: ['better', 'gooder', 'more good'], explain: 'good es irregular: good → better → the best.' },
    { q: 'bad → the ______', options: ['worst', 'baddest', 'most bad'], explain: 'bad es irregular: bad → worse → the worst.' },
    { q: 'The Camp Nou is ______ than my school.', qes: 'El Camp Nou es más grande que mi colegio.', options: ['bigger', 'biger', 'more big'], explain: 'big → bi<b>gg</b>er: palabra corta que acaba en vocal + consonante → se dobla la consonante.' },
    { q: 'This shirt costs €90. That shirt costs €40. This shirt is ______ than that shirt.', qes: 'Esta camiseta cuesta 90 €. Esa cuesta 40 €. Esta camiseta es ______ que esa.', options: ['more expensive', 'expensiver', 'most expensive'], explain: 'expensive es larga → more expensive.' },
    { q: 'That shirt costs €40. This shirt costs €90. That shirt is ______ than this shirt.', options: ['cheaper', 'more cheap', 'cheapest'], explain: 'cheap es corta → cheap<b>er</b>. ¡Nunca «more cheaper»!' },
    { q: 'We never win. We are the ______ team in the league!', qes: 'Nunca ganamos. ¡Somos el ______ equipo de la liga!', options: ['worst', 'baddest', 'worse'], explain: 'El peor = <b>the worst</b>.' },
    { q: 'We always win. We are the ______ team in the league!', qes: 'Siempre ganamos. ¡Somos el ______ equipo de la liga!', options: ['best', 'goodest', 'better'], explain: 'El mejor = <b>the best</b>.' },
    { q: 'My joke is ______ than your joke.', qes: 'Mi chiste es más gracioso que tu chiste.', options: ['funnier', 'funnyer', 'more funny'], explain: 'funny acaba en -y → funn<b>ier</b>.' },
    { q: 'It was 5-4! I think it was the ______ match of the year!', options: ['most exciting', 'excitingest', 'more exciting'], explain: 'exciting es larga → the most exciting.' },
    { q: 'Marc is 1.50 m. Pau is 1.40 m. Marc is ______ than Pau.', options: ['taller', 'more tall', 'tallest'], explain: 'tall es corta → tall<b>er</b>.' },
    { q: 'Hugo is 10. Marc is 11. Hugo is ______ than Marc.', options: ['younger', 'more young', 'youngest'], explain: 'young es corta → young<b>er</b>.' },
    { q: "The clown's hat is the ______ hat in the room.", options: ['silliest', 'sillyest', 'most silly'], explain: 'silly acaba en -y → the sill<b>iest</b>.' },
    { q: 'Black is ______ than yellow.', options: ['darker', 'more dark', 'darkest'], explain: 'dark es corta → dark<b>er</b>.' },
    { q: 'Painting 1 is good, but painting 2 is ______.', options: ['better', 'gooder', 'best'], explain: 'Comparamos dos cosas → comparativo: <b>better</b>.' },
    { q: 'I think Pedri is ______ creative than me.', options: ['more', 'most', 'the'], explain: 'Comparativo de palabra larga: <b>more</b> creative <b>than</b>.' },
    { q: 'Barça is ______ most popular team in my class.', options: ['the', 'a', 'than'], explain: 'El superlativo siempre lleva <b>the</b>: the most popular.' },
    { q: 'My brother is taller ______ me.', options: ['than', 'that', 'as'], explain: 'Para comparar usamos <b>than</b> (= que).' },
    { q: 'Number 3 is ______ than number 1. I hate it!', options: ['worse', 'worst', 'badder'], explain: 'bad → <b>worse</b> (peor) → the worst (el peor).' }
  ];

  const ORDER_COMP = [
    { sentence: 'I think number 7 is the best painting.', es: 'Creo que el número 7 es el mejor cuadro.' },
    { sentence: 'The Camp Nou is bigger than my school.', es: 'El Camp Nou es más grande que mi colegio.' },
    { sentence: 'This shirt is more expensive than that shirt.', es: 'Esta camiseta es más cara que esa camiseta.' },
    { sentence: 'My little brother is the funniest person in my family.', es: 'Mi hermano pequeño es la persona más graciosa de mi familia.' },
    { sentence: 'Number 3 is worse than number 1.', es: 'El número 3 es peor que el número 1.' },
    { sentence: 'Football is more exciting than tennis.', es: 'El fútbol es más emocionante que el tenis.' },
    { sentence: 'Who is the most talented football player?', es: '¿Quién es el futbolista con más talento?' },
    { sentence: 'Black is darker than grey.', es: 'El negro es más oscuro que el gris.' }
  ];

  const DICTATION = ['cheaper', 'the biggest', 'better', 'the worst', 'funnier', 'more expensive', 'the silliest', 'worse', 'the best', 'more exciting', 'darker', 'the most popular']
    .map(w => ({ say: w, answer: w, prompt: 'Escucha y escribe lo que oyes.' }));

  /* Tabla de La Masia para as … as */
  const TABLE = `<div class="table-title">🏟️ Jugadores alevines de La Masia</div>
  <table class="tbl data"><tr><th></th><th>Marc</th><th>Pau</th><th>Hugo</th></tr>
  <tr><th>Age</th><td>11</td><td>11</td><td>10</td></tr>
  <tr><th>Height</th><td>1.45 m</td><td>1.40 m</td><td>1.40 m</td></tr>
  <tr><th>Goals</th><td>15</td><td>15</td><td>22</td></tr>
  <tr><th>Boots</th><td>€50</td><td>€80</td><td>€50</td></tr></table>`;

  const TABLE_TF = [
    tf('Marc is as old as Pau.', true, 'Los dos tienen 11 años.'),
    tf('Hugo is as old as Marc.', false, 'Hugo tiene 10 y Marc 11 → Hugo <b>isn\'t</b> as old as Marc.'),
    tf('Pau is as tall as Hugo.', true, 'Los dos miden 1.40 m.'),
    tf("Marc isn't as tall as Pau.", false, 'Marc mide 1.45 m y Pau 1.40 m → Marc es más alto.'),
    tf("Hugo isn't as old as Pau.", true, 'Hugo tiene 10 y Pau 11.'),
    tf("Marc's boots are as expensive as Hugo's boots.", true, 'Las dos botas cuestan 50 €.'),
    tf("Pau's boots aren't as expensive as Marc's boots.", false, 'Las de Pau cuestan 80 € → son MÁS caras.'),
    tf("Marc's boots aren't as expensive as Pau's boots.", true, '50 € no es tan caro como 80 €.'),
    tf('Marc is as successful as Pau.', true, 'Los dos han marcado 15 goles.'),
    tf("Pau isn't as successful as Hugo.", true, 'Pau 15 goles, Hugo 22.'),
    tf('Hugo is the most successful player.', true, 'Hugo es el que más goles ha marcado: 22.'),
    tf('Marc is the tallest player.', true, 'Marc mide 1.45 m, el que más.'),
    tf('Hugo is the oldest player.', false, 'Hugo es el más joven (10 años).'),
    tf("Hugo's boots are the most expensive.", false, 'Las más caras son las de Pau (80 €).')
  ];

  const TABLE_LISTEN = [
    tf('', true, 'Pau y Marc tienen 11 años.', { say: 'Pau is as old as Marc.' }),
    tf('', false, 'Marc (11) es mayor que Hugo (10).', { say: "Marc isn't as old as Hugo." }),
    tf('', true, 'Hugo y Pau miden 1.40 m.', { say: 'Hugo is as tall as Pau.' }),
    tf('', true, 'Pau (1.40) es más bajo que Marc (1.45).', { say: "Pau isn't as tall as Marc." }),
    tf('', false, 'Las de Hugo cuestan 50 € y las de Pau 80 €.', { say: "Hugo's boots are as expensive as Pau's boots." }),
    tf('', true, 'Las dos cuestan 50 €.', { say: "Hugo's boots are as cheap as Marc's boots." }),
    tf('', true, 'Marc 15 goles, Hugo 22.', { say: "Marc isn't as successful as Hugo." }),
    tf('', false, 'El más joven es Hugo.', { say: 'Pau is the youngest player.' }),
    tf('', true, 'Hugo tiene 10 y Pau 11.', { say: 'Hugo is younger than Pau.' }),
    tf('', true, 'Las de Pau cuestan 80 €.', { say: "Pau's boots are the most expensive." })
  ].map(x => ({ ...x, q: '¿Es verdad (True) o mentira (False)? Mira la tabla.' }));

  const GRAMMAR_ASAS = [
    { q: 'Marc ______ as old as Pau. (11 – 11)', options: ['is', "isn't", 'are'], explain: 'Tienen la misma edad → <b>is</b> as old as. Marc es uno solo → is.' },
    { q: 'Hugo ______ as old as Marc. (10 – 11)', options: ["isn't", 'is', "aren't"], explain: 'No tienen la misma edad → <b>isn\'t</b>.' },
    { q: "Marc's boots ______ as expensive as Hugo's boots. (€50 – €50)", options: ['are', 'is', "aren't"], explain: '<b>boots</b> son varias → <b>are</b>.' },
    { q: "Marc's boots ______ as expensive as Pau's boots. (€50 – €80)", options: ["aren't", "isn't", 'are'], explain: 'Varias cosas y NO iguales → <b>aren\'t</b>.' },
    { q: "The sports centre isn't as ______ as the museum.", options: ['big', 'bigger', 'biggest'], explain: 'Entre los dos <b>as</b> va el adjetivo normal: as <b>big</b> as.' },
    { q: "Children's paintings are as ______ as artists' paintings.", options: ['good', 'better', 'best'], explain: 'as <b>good</b> as. ¡Nunca «as better as»!' },
    { q: "My school isn't ______ big as the Camp Nou.", options: ['as', 'than', 'more'], explain: 'La estructura es <b>as</b> + adjetivo + <b>as</b>.' },
    { q: "Tennis isn't as exciting ______ football.", options: ['as', 'than', 'that'], explain: 'as exciting <b>as</b>.' },
    { q: 'A €5 ticket ______ as expensive as a €50 ticket.', options: ["isn't", 'is', "aren't"], explain: 'No cuestan lo mismo y es una entrada → <b>isn\'t</b>.' },
    { q: 'Both teams have 20 points. Team A is ______ good as Team B.', options: ['as', 'more', 'the'], explain: 'Mismos puntos → <b>as</b> good <b>as</b>.' }
  ];

  const ORDER_ASAS = [
    { sentence: 'Marc is as old as Pau.', es: 'Marc tiene la misma edad que Pau.' },
    { sentence: "Hugo isn't as tall as Marc.", es: 'Hugo no es tan alto como Marc.' },
    { sentence: 'My painting is as good as your painting.', es: 'Mi cuadro es tan bueno como tu cuadro.' },
    { sentence: "Tennis isn't as exciting as football.", es: 'El tenis no es tan emocionante como el fútbol.' },
    { sentence: "The tickets aren't as expensive as the shirts.", es: 'Las entradas no son tan caras como las camisetas.' },
    { sentence: "Jade's paintings aren't as expensive as Zac's.", es: 'Los cuadros de Jade no son tan caros como los de Zac.' }
  ];

  const TICKET_DIALOGUES = [
    { title: 'Ordena la conversación en la taquilla del museo 🖼️', lines: [
      'Hello, could I have two tickets, please?', 'Of course. Adults or children?', 'One adult and one child.',
      "OK, that's fifteen euros.", 'Here you are.', 'Thank you. Here are your tickets.'] },
    { title: 'Ordena la conversación en la taquilla del estadio ⚽', lines: [
      'Hello. How much are the tickets, please?', "They're €25 for adults and €12 for children.",
      'Could we have four tickets, please?', 'Of course. Adults or children?', 'Two adults and two children, please.',
      "That's €74, please.", 'Here you are.', "Thank you. Here's your change. Enjoy the match!"] },
    { title: 'Ordena la conversación en el museo nacional 🏛️', lines: [
      'How much are the tickets, please?', "They're €15 for adults and €8 for children under 16.",
      'Could we have three tickets, please?', 'Adults or children?', 'One adult and two children, please.',
      "That's €31 altogether.", 'OK. Here you are, €35.', "Thank you. Here's your change. Enjoy your visit!"] }
  ];

  const TICKETS_QUIZ = [
    { q: '🎟️ <b>Ticket seller:</b> Adults or children?<br>🙋 <b>You:</b> ______', options: ['Two adults, please.', 'Here you are.', 'Enjoy your visit!'] },
    { q: '🙋 <b>You:</b> How much are the tickets, please?<br>🎟️ <b>Ticket seller:</b> ______', options: ["They're €10 for adults and €5 for children.", 'Adults or children?', 'Pardon?'] },
    { q: "🎟️ <b>Ticket seller:</b> That's €20, please.<br>🙋 <b>You:</b> ______", options: ['Here you are.', 'How much are the tickets?', 'Adults or children?'] },
    { q: '🎟️ <b>Ticket seller:</b> Would you like a brochure?<br>🙋 <b>You:</b> ______', options: ['Yes, please.', 'Two adults.', "They're €8."] },
    { q: "🎟️ <b>Ticket seller:</b> Here's your change. Enjoy the match!<br>🙋 <b>You:</b> ______", options: ['Thank you!', 'Adults or children?', "That's €15."] },
    { q: 'No has entendido lo que te han dicho. ¿Qué dices?', options: ['Pardon?', 'Here you are.', 'Enjoy the match!'], explain: '<b>Pardon?</b> = ¿Perdón? ¿Cómo? (para que lo repitan).' },
    { q: 'Tickets: €12 adults, €6 children.<br>You want <b>1 adult + 2 children</b>. How much is it altogether?', options: ['€24', '€18', '€30'], explain: '12 + 6 + 6 = 24. <b>altogether</b> = en total.' },
    { q: 'Tickets: €25 adults, €12 children.<br>You want <b>2 adults + 2 children</b>. How much is it altogether?', options: ['€74', '€62', '€50'], explain: '25 + 25 + 12 + 12 = 74.' },
    { q: 'Tickets: €15 adults, €8 children.<br>You want <b>1 adult + 2 children</b>. How much is it altogether?', options: ['€31', '€23', '€38'], explain: '15 + 8 + 8 = 31.' },
    { q: 'The tickets cost €31. You pay €35. How much change do you get?', options: ['€4', '€6', '€3'], explain: '35 − 31 = 4. <b>change</b> = el cambio, la vuelta.' },
    { q: '¿Cuál es la forma educada de pedir entradas?', options: ['Could we have three tickets, please?', 'Give me three tickets!', 'Three tickets. Now.'], explain: '<b>Could we have…, please?</b> es muy educado.' }
  ];

  const D1 = [['Ticket seller', 'Hello! Can I help you?'], ['Boy', 'Hello. How much are the tickets, please?'], ['Ticket seller', "They're twenty euros for adults and ten euros for children."], ['Boy', 'Could we have three tickets, please? One adult and two children.'], ['Ticket seller', "That's forty euros altogether."]];
  const D2 = [['Ticket seller', 'Good afternoon. Adults or children?'], ['Girl', 'Two adults and one child, please.'], ['Ticket seller', "That's forty-five euros, please. Would you like a brochure?"], ['Girl', 'No, thank you. Here you are, fifty euros.'], ['Ticket seller', "Thank you. Here's your change, five euros. Enjoy the match!"]];
  const D3 = [['Ticket seller', 'Welcome to the National Museum!'], ['Man', 'Hello. Could I have two tickets, please?'], ['Ticket seller', 'Of course. Adults or children?'], ['Man', 'One adult and one child.'], ['Ticket seller', "OK, that's fifteen euros."], ['Man', 'Pardon?'], ['Ticket seller', 'Fifteen euros, please.'], ['Man', 'Here you are.']];
  const TICKETS_LISTEN = [
    { dialogue: D1, q: 'How many tickets do they buy?', qes: '¿Cuántas entradas compran?', options: ['3', '2', '4'] },
    { dialogue: D1, q: "How much is a child's ticket?", qes: '¿Cuánto cuesta la entrada de un niño?', options: ['€10', '€20', '€40'] },
    { dialogue: D1, q: 'How much do they pay altogether?', qes: '¿Cuánto pagan en total?', options: ['€40', '€30', '€14'] },
    { dialogue: D2, q: 'Do they buy a brochure?', qes: '¿Compran un folleto?', options: ['No, they don\'t.', 'Yes, they do.'], keep: true },
    { dialogue: D2, q: 'How much change does the girl get?', qes: '¿Cuánto cambio le dan a la chica?', options: ['€5', '€50', '€45'] },
    { dialogue: D2, q: 'Where are they going?', qes: '¿Adónde van?', options: ['⚽ to a football match', '🖼️ to a museum', '🎬 to the cinema'], explain: 'El vendedor dice «Enjoy the <b>match</b>!».' },
    { dialogue: D3, q: "What does the man say when he doesn't understand?", qes: '¿Qué dice el hombre cuando no entiende?', options: ['Pardon?', 'Here you are.', 'Thank you.'] },
    { dialogue: D3, q: 'How much are the two tickets?', qes: '¿Cuánto cuestan las dos entradas?', options: ['€15', '€50', '€5'], explain: '¡Cuidado! <b>fifteen</b> = 15 y <b>fifty</b> = 50.' }
  ];

  const TH_ITEMS = [
    ...['thanks', 'think', 'Thursday', 'teeth', 'thirsty', 'bath', 'three', 'birthday'].map(text => ({ text, b: 'soft' })),
    ...['the', 'these', 'brother', 'this', 'altogether', 'they', 'mother', 'father'].map(text => ({ text, b: 'hard' }))
  ];

  const POLITE_QUIZ = [
    { q: "Your friend has a new haircut. You don't like it. What do you say?", qes: 'Tu amigo se ha cortado el pelo y no te gusta. ¿Qué dices?', options: ['Your hair looks so different!', 'Why did you do that? You look silly!'], explain: 'Lo educado es no hacer daño: «¡Tu pelo se ve muy diferente!».' },
    { q: "Your uncle makes lunch, but you don't like it. What do you say?", qes: 'Tu tío hace la comida pero no te gusta. ¿Qué dices?', options: ["It's interesting. It's very unusual!", "I can't eat it. It's horrible."], explain: '«Es interesante, muy original» es mucho más educado.' },
    { q: 'Your friend comes last in an art competition. What do you say?', qes: 'Tu amigo queda último en un concurso de arte. ¿Qué dices?', options: ['Oh, I\'m sorry. I know you tried hard.', 'Your picture was weird and rubbish!'], explain: '«Lo siento, sé que te esforzaste mucho.»' },
    { q: 'Which expression is the rudest?', qes: '¿Qué frase es la más maleducada?', options: ["That picture's rubbish.", "It's not my favourite picture.", "I don't really like that picture very much."], explain: '<b>rubbish</b> = basura. ¡Es muy maleducado!' },
    { q: 'Your team wins 3-0. Your friend supports the other team. What do you say?', qes: 'Tu equipo gana 3-0. Tu amigo es del otro equipo. ¿Qué dices?', options: ['Your team played well too!', 'Your team is horrible!', 'Your team is the worst!'], explain: 'Un buen deportista es educado aunque gane. 🤝' },
    { q: 'James sees that the artist is behind him. How does James feel?', qes: 'James ve que el artista está detrás de él. ¿Cómo se siente James?', options: ['😳 embarrassed', '😄 happy', '😴 bored'], explain: '<b>embarrassed</b> = avergonzado.' },
    { q: '😠 = ?', options: ['angry', 'surprised', 'sad'], explain: '<b>angry</b> = enfadado.' },
    { q: '😲 = ?', options: ['surprised', 'angry', 'embarrassed'], explain: '<b>surprised</b> = sorprendido.' },
    { q: '😢 = ?', options: ['sad', 'silly', 'angry'], explain: '<b>sad</b> = triste.' }
  ];

  const FINAL_LISTEN = [
    { dialogue: [['Boy', 'Which picture do you like best, Jane? The one with the trees?'], ['Jane', "The trees are nice, but it's a bit dark. And I don't like the horse in the snow. It's too weird for me."], ['Boy', 'What about the sunflowers?'], ['Jane', "Yes! That's the best. It's the lightest and the most colourful."]],
      q: 'Which picture does Jane like best?', qes: '¿Qué cuadro le gusta más a Jane?', options: ['🌻 sunflowers', '🌲 trees', '🐴 horse in the snow'], explain: 'Ojo: nombra los tres, pero dice que el mejor es el de los <b>sunflowers</b> (girasoles).' },
    { dialogue: [['Girl', 'Which painting do you like, Mike?'], ['Mike', "I love the painting with the white flowers. It's lovely. The one with the red leaves is very modern. I like it too."], ['Girl', 'And the one with the dark sky?'], ['Mike', "No, I don't like that one. It's the most boring painting here."]],
      q: 'Which painting does Mike NOT like?', qes: '¿Qué cuadro NO le gusta a Mike?', options: ['⛈️ dark sky', '🌼 white flowers', '🍁 red leaves'] },
    { dialogue: [['Tom', 'How much are the tickets, please?'], ['Ticket seller', 'Fifteen euros for adults and ten euros for children.'], ['Tom', "One child, please. I'm eleven."]],
      q: 'How much is Tom\'s ticket?', qes: '¿Cuánto cuesta la entrada de Tom?', options: ['€10', '€15', '€50'], explain: 'Tom es un niño (11 años) → ten euros.' },
    { dialogue: [['Girl', 'Who is the most talented player in your team?'], ['Boy', 'Well, Marc is good, but Pau is better. And Hugo? He is the best! He is the most talented player in the team.']],
      q: 'Who is the most talented player?', qes: '¿Quién es el jugador con más talento?', options: ['Hugo', 'Pau', 'Marc'] },
    { dialogue: [['Mum', 'Which shirt do you want, Danny?'], ['Danny', "The black shirt is cheaper, but it's boring. The yellow one is weird. I want the blue and red shirt. It's more expensive, but it's the best!"]],
      q: 'Which shirt does Danny want?', qes: '¿Qué camiseta quiere Danny?', options: ['🔵🔴 blue and red', '⚫ black', '🟡 yellow'] },
    { dialogue: [['Boy', 'Is your sister a good painter?'], ['Girl', "Yes, she is! She's more creative than me. But I'm a better footballer than her!"]],
      q: 'Who is more creative?', qes: '¿Quién es más creativa/o?', options: ['her sister', 'the girl', 'the boy'] }
  ];

  const FINAL_CONVERSATION = [
    { q: '<b>Jane:</b> Which of those three boys is Pau?<br><b>Zach:</b> ______', options: ['Pau is the boy with the shortest hair.', 'Yes, he is.', 'He likes art.'] },
    { q: '<b>Jane:</b> Is he taller than Marc?<br><b>Zach:</b> ______', options: ["No, he isn't. Marc is the tallest.", 'Pau is my best friend.', "He's eleven."] },
    { q: '<b>Jane:</b> Is Hugo the funniest?<br><b>Zach:</b> ______', options: ['Yes, he is. He makes us laugh a lot.', 'Hugo is interested in art.', 'They are expensive.'] },
    { q: '<b>Jane:</b> Who is the most interesting?<br><b>Zach:</b> ______', options: ['I think Marc is more interesting than the others.', 'Yes, he is.', "He's ten."] },
    { q: '<b>Jane:</b> Are the tickets expensive?<br><b>Zach:</b> ______', options: ["No, they're cheaper than last year.", 'Yes, he is.', 'I like art.'] },
    { q: '<b>Jane:</b> Who is older, Marc or Hugo?<br><b>Zach:</b> ______', options: ["Marc. He's older than Hugo.", 'Hugo is the funniest.', 'Yes, they are.'] }
  ];

  const CLUES = [
    ['Claire is so ______. She makes us laugh!', 'funny'],
    ["Tom is ______ when he meets new people. He doesn't talk much.", 'shy'],
    ['Joanne is a very ______ pianist. She plays very well.', 'talented'],
    ['Jason is a ______ artist. He sells a lot of paintings.', 'successful'],
    ["I'm reading a really ______ book. I can't wait to see what happens next!", 'exciting'],
    ['Luke is very ______. He loves painting and drawing.', 'creative'],
    ["Everyone likes May. She's really ______ at school.", 'popular'],
    ["That's a ______ painting! It's beautiful.", 'lovely'],
    ['Ann is so ______! She can always think of a new way to do something.', 'inventive'],
    ["It costs a lot of money! It's so ______.", 'expensive'],
    ["It doesn't cost a lot of money. It's ______.", 'cheap'],
    ["It's not very interesting. I think it's ______.", 'boring'],
    ["I don't understand it, but I like it. It's ______.", 'weird']
  ].map(([s, w]) => ({ prompt: s.replace('______', `<span class="clue-gap">${w[0]}${' _'.repeat(w.length - 1)}</span>`) + `<br><span class="muted">(${w.length} letras)</span>`, answer: w }));


  /* ---------- Mini-explicaciones que salen antes de cada juego ---------- */
  const T = {
    adjVocab: [
      { t: '🖼️ Para opinar', ex: ['boring', 'weird', 'lovely', 'horrible'] },
      { t: '💶 Dinero', ex: ['cheap', 'expensive'], es: 'barato · caro' },
      { t: '🎨 Colores', ex: ['dark', 'light'], es: 'oscuro · claro' },
      { t: '🧑 Personas', ex: ['shy', 'funny', 'talented', 'successful'] }
    ],
    adjSentence: [
      { t: 'El adjetivo va ANTES de la cosa', ex: ['a boring match'], es: 'un partido aburrido' },
      { t: 'Busca la pista en la frase', html: '«costs <b>€200</b>» → <b>expensive</b><br>«<b>0-0</b>, nothing happened» → <b>boring</b>' }
    ],
    classify: [
      { t: '🎨 Colores', ex: ['dark', 'light'] },
      { t: '💶 Dinero', ex: ['cheap', 'expensive'] },
      { t: '👍 Opinión buena', ex: ['good', 'lovely'] },
      { t: '👎 Opinión mala', ex: ['bad', 'horrible'] }
    ],
    reading: [
      { t: '1️⃣ Lee la pregunta primero', html: 'Así sabes qué buscar.' },
      { t: '2️⃣ Busca la palabra clave', html: 'Un nombre, un número, un adjetivo…' },
      { t: '3️⃣ ¿Una palabra rara?', html: '¡Tócala y verás qué significa!' },
      { t: '💡 ¿Atascado?', html: 'Pulsa la pista y te marco la frase.' }
    ],
    comp: [
      { t: '1 sílaba → <b>+er / +est</b>', ex: ['cheap → cheaper → the cheapest'] },
      { t: 'Acaba en <b>-y</b> → <b>-ier / -iest</b>', ex: ['funny → funnier → the funniest'] },
      { t: 'Corta + 1 vocal + consonante → <b>doble</b>', ex: ['big → bigger → the biggest'] },
      { t: 'Larga → <b>more / the most</b>', ex: ['modern → more modern → the most modern'] },
      { t: '⚠️ Los rebeldes', ex: ['good → better → the best', 'bad → worse → the worst'] }
    ],
    compSentence: [
      { t: 'Comparar 2 cosas: <b>… than …</b>', ex: ['The Camp Nou is bigger than my school.'], es: 'más grande que' },
      { t: 'El que más de todos: <b>the …</b>', ex: ['Pedri is the most creative player.'], es: 'el más creativo' },
      { t: '🚩 Fuera de juego', html: '<s>gooder</s> → better · <s>more cheaper</s> → cheaper · <s>the bigest</s> → the biggest' }
    ],
    dictation: [
      { t: 'Escucha el final de la palabra', ex: ['cheaper', 'the cheapest'], es: '-er = más · the …-est = el más' },
      { t: 'Las largas llevan more / the most', ex: ['more expensive', 'the most popular'] }
    ],
    asas: [
      { t: 'Iguales: <b>as … as</b>', ex: ['Marc is as old as Pau.'], es: 'Marc tiene la misma edad que Pau.' },
      { t: 'No iguales: <b>isn\'t as … as</b>', ex: ["Hugo isn't as tall as Marc."], es: 'Hugo no es tan alto como Marc.' },
      { t: '1 cosa → <b>is</b> · varias → <b>are</b>', ex: ["The boots aren't as expensive as the shirt."] },
      { t: 'Entre los <b>as</b>: adjetivo normal', html: 'as <b>big</b> as ✅ · <s>as bigger as</s> ❌' }
    ],
    table: [
      { t: 'Mira los números', html: 'Marc <b>11</b> · Pau <b>11</b> → <b>Marc is as old as Pau</b> ✅' },
      { t: 'Si no son iguales…', html: 'Hugo <b>10</b> · Marc <b>11</b> → <b>Hugo isn\'t as old as Marc</b>' },
      { t: 'Palabras de la tabla', ex: ['age', 'height', 'goals', 'boots'], es: 'edad · altura · goles · botas' }
    ],
    tickets: [
      { t: '🙋 Preguntar el precio', ex: ['How much are the tickets, please?'] },
      { t: '🙋 Pedir entradas', ex: ['Could we have two tickets, please?'] },
      { t: '🎟️ Te preguntan', ex: ['Adults or children?', 'Would you like a brochure?'] },
      { t: '🙋 Pagar / no entender', ex: ['Here you are.', 'Pardon?'], es: 'Aquí tiene · ¿Perdón?' }
    ],
    ticketsListen: [
      { t: '👂 ¡Ojo con los números!', ex: ['fifteen', 'fifty'], es: '15 · 50' },
      { t: 'Palabras clave', ex: ['altogether', 'change'], es: 'en total · el cambio' }
    ],
    th: [
      { t: '🌬️ Soft th = nuestra <b>Z</b>', ex: ['thanks', 'three', 'Thursday'] },
      { t: '🐝 Hard th = <b>d</b> suave (como en «cada»)', ex: ['the', 'this', 'brother'] }
    ],
    polite: [
      { t: '😠 Rude (maleducado)', ex: ["It's rubbish!"] },
      { t: '😊 Polite (educado)', ex: ["It's not my favourite picture."] },
      { t: 'Emociones', html: '😠 angry · 😳 embarrassed · 😲 surprised · 😢 sad' }
    ],
    examListen: [
      { t: '👂 Lo oyes 2 veces', html: 'La 1ª para entender. La 2ª para comprobar.' },
      { t: '🪤 Trampa', html: 'A veces nombran las 3 cosas… ¡pero solo una es la buena!' },
      { t: 'Escucha bien', ex: ['I like', "I don't like", 'the best', 'the worst'] }
    ],
    examConv: [
      { t: 'Is he…? / Are they…?', ex: ['Yes, he is.', "No, he isn't."] },
      { t: 'Who…?', html: 'La respuesta tiene un <b>nombre</b>.' },
      { t: '✔ Truco de examen', html: 'Prueba TODAS las respuestas antes de elegir.' }
    ],
    cloze: [
      { t: '¿Ves <b>than</b>?', html: '→ comparativo: bigg<b>er</b> than, <b>more</b> … than' },
      { t: '¿Ves <b>the</b> / <b>the most</b>?', html: '→ superlativo: the bigg<b>est</b>, the <b>most</b> …' },
      { t: '¿Ves <b>as</b>?', html: '→ as + adjetivo normal + as' }
    ],
    spelling: [
      { t: 'Te doy la 1ª letra', html: '<b>f _ _ _ _</b> → funny' },
      { t: 'Repasa cómo se escriben', ex: ['successful', 'talented', 'expensive', 'weird'] }
    ],
    perspective: [
      { t: 'Palabras de arte', ex: ['foreground', 'background', 'flat'], es: 'primer plano · fondo · plano' },
      { t: 'Cerca y lejos', ex: ['closer', 'further away'], es: 'más cerca · más lejos' }
    ]
  };

  /* ---------- La unidad ---------- */
  registerUnit({
    subject: 'ingles',
    id: 'u2',
    number: 2,
    title: 'Listen to your art',
    titleEs: 'Escucha a tu arte',
    emoji: '🎨',
    summary: 'Adjetivos · Comparativos y superlativos · as … as · Comprar entradas',

    charla: [
      { id: 'adjetivos', emoji: '🎨', title: 'Los adjetivos: cómo describir cosas', html: `
        <p>Un <b>adjetivo</b> es una palabra que dice <b>cómo es</b> algo o alguien: aburrido, caro, gracioso…</p>
        <div class="rule">⚽ En inglés el adjetivo va <b>ANTES</b> de la cosa:<br><say>a boring match</say> = un partido aburrido</div>
        <div class="rule">⚽ El adjetivo <b>nunca cambia</b>, aunque haya muchas cosas:<br><say>two boring matches</say> ✅ &nbsp; <s>two borings matches</s> ❌</div>
        <h4>Adjectives 1: para opinar de cuadros (y de partidos)</h4>${vocabTable(ADJ1)}
        <h4>Adjectives 2: para describir a personas</h4>${vocabTable(ADJ2)}
        <h4>Parejas de opuestos</h4>
        <p><say>cheap</say> ↔ <say>expensive</say> · <say>dark</say> ↔ <say>light</say> · <say>good</say> ↔ <say>bad</say> · <say>boring</say> ↔ <say>exciting</say></p>
        <h4>Frases para dar tu opinión</h4>
        <ul>
          <li><say>I think it's lovely.</say> = Creo que es precioso.</li>
          <li><say>It's a bit weird.</say> = Es un poco raro.</li>
          <li><say>It's too dark for me.</say> = Es demasiado oscuro para mí.</li>
          <li><say>It's really exciting!</say> = ¡Es muy emocionante!</li>
          <li><say>It isn't very good.</say> = No es muy bueno.</li>
        </ul>` },
      { id: 'comparativos', emoji: '🏆', title: 'Comparar: «más … que» y «el más …»', html: `
        <p>Cuando <b>comparamos dos cosas</b> usamos el <b>comparativo</b> + <b>than</b> (= que).</p>
        <p class="ex"><say>The Camp Nou is bigger than my school.</say><br>El Camp Nou es más grande que mi colegio.</p>
        <p>Cuando decimos que algo es <b>el que más</b> de todos, usamos el <b>superlativo</b>. ¡Siempre con <b>the</b>!</p>
        <p class="ex"><say>I think Lamine Yamal is the most exciting player.</say><br>Creo que Lamine Yamal es el jugador más emocionante.</p>
        <h4>Las 4 reglas + los 2 rebeldes</h4>
        <div class="tbl-wrap"><table class="tbl">
          <tr><th>Tipo de palabra</th><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr>
          <tr><td>1️⃣ Corta (1 sílaba): <b>+er / +est</b></td><td>cheap</td><td>cheap<b>er</b></td><td>the cheap<b>est</b></td></tr>
          <tr><td>2️⃣ Acaba en <b>-y</b>: quita la y → <b>-ier / -iest</b></td><td>silly<br>funny</td><td>sill<b>ier</b><br>funn<b>ier</b></td><td>the sill<b>iest</b><br>the funn<b>iest</b></td></tr>
          <tr><td>3️⃣ Corta y acaba en vocal + consonante: <b>dobla la consonante</b></td><td>big<br>hot</td><td>bi<b>gg</b>er<br>ho<b>tt</b>er</td><td>the bi<b>gg</b>est<br>the ho<b>tt</b>est</td></tr>
          <tr><td>4️⃣ Larga (2 sílabas o más): <b>more / the most</b></td><td>expensive</td><td><b>more</b> expensive</td><td><b>the most</b> expensive</td></tr>
          <tr class="irr"><td>⚠️ Irregulares: ¡de memoria!</td><td>good<br>bad</td><td><b>better</b><br><b>worse</b></td><td><b>the best</b><br><b>the worst</b></td></tr>
        </table></div>
        <div class="tip">🧠 Truco: piensa en el Balón de Oro. <b>good → better → the best</b> (bueno → mejor → el mejor). Y al revés: <b>bad → worse → the worst</b> (malo → peor → el peor).</div>
        <h4>🚩 Fueras de juego (los errores más típicos)</h4>
        <div class="tbl-wrap"><table class="tbl errors">
          <tr><td>❌ gooder</td><td>✅ <say>better</say></td></tr>
          <tr><td>❌ the most good</td><td>✅ <say>the best</say></td></tr>
          <tr><td>❌ the bigest</td><td>✅ <say>the biggest</say></td></tr>
          <tr><td>❌ more cheaper</td><td>✅ <say>cheaper</say></td></tr>
          <tr><td>❌ worser</td><td>✅ <say>worse</say></td></tr>
          <tr><td>❌ taller that me</td><td>✅ <say>taller than me</say></td></tr>
          <tr><td>❌ he is most talented</td><td>✅ <say>he is the most talented</say></td></tr>
        </table></div>` },
      { id: 'asas', emoji: '⚖️', title: 'Igual de … que: as … as', html: `
        <p>Para decir que dos cosas son <b>iguales</b> en algo usamos <b>as + adjetivo + as</b> (= tan … como).</p>
        <p class="ex"><say>Marc is as old as Pau.</say><br>Marc es tan mayor como Pau (tienen la misma edad).</p>
        <p>Para decir que <b>NO</b> son iguales, usamos <b>isn't / aren't as … as</b> (= no tan … como).</p>
        <p class="ex"><say>My school isn't as big as the Camp Nou.</say><br>Mi colegio no es tan grande como el Camp Nou.</p>
        <div class="tbl-wrap"><table class="tbl">
          <tr><td>The sports centre</td><td>is<br>isn't</td><td rowspan="2"><b>as</b></td><td>big</td><td rowspan="2"><b>as</b></td><td>the museum.</td></tr>
          <tr><td>Children's paintings</td><td>are<br>aren't</td><td>good</td><td>artists' paintings.</td></tr>
        </table></div>
        <div class="rule">⚽ <b>Una</b> cosa (he, she, it) → <b>is / isn't</b>.<br>⚽ <b>Varias</b> cosas (they) → <b>are / aren't</b>.</div>
        <div class="rule">⚽ Entre los dos <b>as</b> va el adjetivo <b>normal</b>, ¡sin -er y sin more!<br><say>as big as</say> ✅ &nbsp; <s>as bigger as</s> ❌</div>
        <div class="tip">🧠 Truco: <b>isn't as big as</b> quiere decir lo mismo que <b>smaller than</b> (más pequeño que).</div>` },
      { id: 'tickets', emoji: '🎟️', title: 'Comprar entradas (Buying tickets)', html: `
        <p>Frases para comprar entradas en un museo… ¡o en el estadio!</p>
        <div class="tbl-wrap"><table class="tbl">
          <tr><th>🙋 Tú (customer)</th><th>🎟️ Taquillero (ticket seller)</th></tr>
          <tr><td><say>How much are the tickets, please?</say><br><span class="muted">¿Cuánto cuestan las entradas?</span></td><td><say>They're 15 euros for adults and 8 euros for children.</say><br><span class="muted">Cuestan 15 € los adultos y 8 € los niños.</span></td></tr>
          <tr><td><say>Could we have three tickets, please?</say><br><span class="muted">¿Nos da tres entradas, por favor?</span></td><td><say>Adults or children?</say><br><span class="muted">¿Adultos o niños?</span></td></tr>
          <tr><td><say>One adult and two children, please.</say><br><span class="muted">Un adulto y dos niños, por favor.</span></td><td><say>Would you like a brochure?</say><br><span class="muted">¿Quiere un folleto?</span></td></tr>
          <tr><td><say>Here you are.</say><br><span class="muted">Aquí tiene.</span></td><td><say>That's 31 euros altogether.</say><br><span class="muted">Son 31 € en total.</span></td></tr>
          <tr><td><say>Pardon?</say><br><span class="muted">¿Perdón? (no lo he entendido)</span></td><td><say>Here's your change. Enjoy the match!</say><br><span class="muted">Aquí tiene el cambio. ¡Disfrute del partido!</span></td></tr>
        </table></div>
        <div class="tip">🧮 Las cuentas: 1 adulto (15 €) + 2 niños (8 € + 8 €) = <b>31 € altogether</b>. Si pagas con 35 €, tu <b>change</b> (cambio) son 4 €.</div>
        <div class="tip">👂 ¡Cuidado con los números!: <say>fifteen</say> (15) y <say>fifty</say> (50) · <say>thirteen</say> (13) y <say>thirty</say> (30).</div>` },
      { id: 'th', emoji: '👅', title: 'El sonido «th»', html: `
        <p>En inglés hay dos sonidos para <b>th</b>. ¡Y los que hablamos castellano tenemos ventaja!</p>
        <div class="rule">🌬️ <b>Soft th</b>: suena como nuestra <b>Z</b> de «zapato». Pon la lengua entre los dientes y sopla.<br><say>thanks</say> · <say>think</say> · <say>three</say> · <say>Thursday</say> · <say>teeth</say> · <say>thirsty</say> · <say>bath</say></div>
        <div class="rule">🐝 <b>Hard th</b>: suena como la <b>d</b> suave de «ca<b>d</b>a» o «de<b>d</b>o», con vibración.<br><say>the</say> · <say>this</say> · <say>these</say> · <say>they</say> · <say>brother</say> · <say>mother</say> · <say>altogether</say></div>
        <p>Trabalenguas: <say>They say thanks for the three tickets.</say></p>` },
      { id: 'polite', emoji: '🤝', title: 'Ser educado al opinar', html: `
        <p>Puedes decir que algo no te gusta… ¡pero sin hacer daño! En la historia <i>The Art Competition</i>, James dice que un cuadro es <say>rubbish</say> (basura)… ¡y el pintor está justo detrás! 😳</p>
        <div class="tbl-wrap"><table class="tbl">
          <tr><th>😠 Rude (maleducado)</th><th>😊 Polite (educado)</th></tr>
          <tr><td><say>It's rubbish!</say></td><td><say>It's not my favourite picture.</say></td></tr>
          <tr><td><say>It's horrible. I hate it.</say></td><td><say>I don't really like it very much.</say></td></tr>
          <tr><td><say>You look silly!</say></td><td><say>Your hair looks so different!</say></td></tr>
          <tr><td><say>I can't eat it. It's horrible.</say></td><td><say>It's interesting. It's very unusual!</say></td></tr>
        </table></div>
        <h4>Emociones</h4>
        ${vocabTable([['angry', 'enfadado', '😠'], ['embarrassed', 'avergonzado', '😳'], ['sad', 'triste', '😢'], ['surprised', 'sorprendido', '😲'], ['happy', 'contento', '😄']])}` },
      { id: 'reading', emoji: '📖', title: 'Trucos para el reading y el listening', html: `
        <h4>📖 Reading: 5 pasos de crack</h4>
        <ol>
          <li><b>Mira el título y las imágenes.</b> ¿De qué irá el texto?</li>
          <li><b>Lee las preguntas ANTES que el texto.</b> Así sabes qué tienes que buscar.</li>
          <li><b>No hace falta entender todas las palabras.</b> Busca las <b>palabras clave</b> de la pregunta: nombres, números, adjetivos…</li>
          <li><b>Cuando encuentres la palabra clave, lee esa frase con calma.</b> ¡Ahí suele estar la respuesta!</li>
          <li><b>Lee TODAS las opciones antes de elegir</b> (es el consejo del examen Flyers).</li>
        </ol>
        <p>En los readings de esta web puedes <b>tocar cualquier palabra</b> para ver qué significa y oírla, pulsar <b>🔊 Leer en voz alta</b> y usar la <b>💡 Pista</b> para ver en qué frase está la respuesta.</p>
        <h4>🎧 Listening: con calma</h4>
        <ul>
          <li>En el examen lo escuchas <b>dos veces</b>. La 1ª, para saber de qué va. La 2ª, para comprobar.</li>
          <li>Antes de escuchar, <b>mira las opciones</b> y piensa cómo se dicen en inglés.</li>
          <li>¡Cuidado con las trampas! A veces nombran las tres cosas, pero solo una es la respuesta. Escucha bien <b>like / don't like</b> y <b>best / worst</b>.</li>
          <li>Si va muy rápido, usa el botón <b>🐢 Lento</b>.</li>
        </ul>` },
      { id: 'arte', emoji: '🖼️', title: 'Palabras de arte y conectores', html: `
        <p>En el tema también aprendes cómo los pintores crean <b>profundidad</b>:</p>
        ${vocabTable([['perspective', 'perspectiva', '📐'], ['vanishing point', 'punto de fuga', '🎯'], ['foreground', 'primer plano (delante, abajo)', '🌷'], ['middle ground', 'plano medio', '🌳'], ['background', 'fondo (detrás, lejos)', '⛰️'], ['flat', 'plano, sin profundidad', '📄'], ['closer', 'más cerca', '🔍'], ['further away', 'más lejos', '🔭'], ['sculpture', 'escultura', '🗿']])}
        <div class="tip">🎨 Lo que está <b>cerca</b> (foreground) se pinta <b>más grande</b>. Lo que está <b>lejos</b> (background) se pinta <b>más pequeño, más oscuro y con menos detalle</b>.</div>
        <h4>Conectores: and / but</h4>
        <p><b>and</b> une dos ideas parecidas: <say>This painting is bigger and more colourful.</say></p>
        <p><b>but</b> une dos ideas diferentes: <say>This painting is dark, but the others are light.</say></p>` }
    ],

    days: [
      /* ---------------- JORNADA 1 ---------------- */
      {
        name: 'Los adjetivos', emoji: '🎨', charla: ['adjetivos', 'reading'],
        desc: 'Las 20 palabras del tema para describir cuadros, partidos y personas.',
        games: [
          { teach: T.adjVocab, type: 'match', emoji: '🃏', title: 'Parejas de cromos', intro: 'Toca la palabra en inglés y luego su pareja.', pairs: VOCAB, perRound: 6, rounds: 2 },
          { teach: T.adjSentence, type: 'quiz', emoji: '🥅', title: 'Tanda de penaltis', intro: 'Elige el adjetivo que falta. ¿No entiendes la frase? Pulsa 🇪🇸.', pool: ADJ_CONTEXT, count: 8 },
          { teach: T.classify, type: 'classify', emoji: '🗂️', title: 'Cada uno a su posición', intro: '¿Colores, dinero, opinión buena o mala?',
            buckets: [{ id: 'col', label: 'Colores', emoji: '🎨' }, { id: 'mon', label: 'Dinero', emoji: '💶' }, { id: 'pos', label: 'Opinión buena', emoji: '👍' }, { id: 'neg', label: 'Opinión mala', emoji: '👎' }],
            items: CLASSIFY_ADJ, count: 10 },
          { teach: T.adjVocab, type: 'quiz', emoji: '🎧', title: 'Escucha y elige', intro: 'Escucha y elige qué significa.', pool: LISTEN_WORDS, count: 8 },
          { teach: T.adjVocab, type: 'scramble', emoji: '🔀', title: 'Letras locas', intro: 'Ordena las letras.', pool: SCRAMBLE, count: 6 },
          { teach: T.reading, type: 'reading', emoji: '📖', title: 'Reading: My favourite team', intro: 'Lee y contesta.',
            heading: 'My favourite team',
            text: [
              ["Hi! My name is Marc and I'm eleven.", 'I love football and my favourite team is FC Barcelona.', 'I often go to the stadium with my dad.', 'The tickets are expensive, but the matches are very exciting!'],
              ['My favourite player is very talented.', 'He is young, but he is very successful.', 'He is a bit shy in interviews, but he is really funny with his friends.'],
              ["My sister doesn't like football.", "She thinks it's boring.", 'She loves painting.', 'Her paintings are lovely and very creative.', 'She paints with light colours, not dark colours.'],
              ['Last Sunday the match was horrible.', 'It was raining and we lost!', 'But I love my team.', 'Everybody in my school likes it.', "It's very popular!"]
            ],
            es: [
              '¡Hola! Me llamo Marc y tengo once años. Me encanta el fútbol y mi equipo favorito es el FC Barcelona. A menudo voy al estadio con mi padre. Las entradas son caras, ¡pero los partidos son muy emocionantes!',
              'Mi jugador favorito tiene mucho talento. Es joven, pero tiene mucho éxito. Es un poco tímido en las entrevistas, pero es muy gracioso con sus amigos.',
              'A mi hermana no le gusta el fútbol. Piensa que es aburrido. Le encanta pintar. Sus cuadros son preciosos y muy creativos. Pinta con colores claros, no con colores oscuros.',
              'El domingo pasado el partido fue horrible. ¡Llovía y perdimos! Pero me encanta mi equipo. A todo el mundo en mi colegio le gusta. ¡Es muy popular!'
            ],
            questions: [
              { q: 'Who goes to the stadium with Marc?', qes: '¿Quién va al estadio con Marc?', options: ['his dad', 'his sister', 'his friends'], hint: [[0, 2]] },
              { q: 'Are the tickets cheap?', qes: '¿Las entradas son baratas?', options: ["No, they're expensive.", "Yes, they're cheap."], hint: [[0, 3]] },
              { q: 'What is Marc\'s favourite player like in interviews?', qes: '¿Cómo es el jugador favorito de Marc en las entrevistas?', options: ['shy', 'funny', 'boring'], hint: [[1, 2]] },
              { q: 'What does Marc\'s sister think of football?', qes: '¿Qué piensa la hermana de Marc del fútbol?', options: ["It's boring.", "It's exciting.", "It's lovely."], hint: [[2, 1]] },
              { q: 'What colours does his sister paint with?', qes: '¿Con qué colores pinta su hermana?', options: ['light colours', 'dark colours', 'black and grey'], hint: [[2, 4]] },
              { q: 'Why was last Sunday\'s match horrible?', qes: '¿Por qué fue horrible el partido del domingo pasado?', options: ['It was raining and they lost.', 'The tickets were expensive.', 'His sister was there.'], hint: [[3, 1]] }
            ] }
        ]
      },

      /* ---------------- JORNADA 2 ---------------- */
      {
        name: 'Comparativos y superlativos', emoji: '📈', charla: ['comparativos'],
        desc: 'Más grande que… El mejor de todos… ¡y los rebeldes good y bad!',
        games: [
          { teach: T.comp, type: 'type', emoji: '🏭', title: 'Fábrica de comparativos', intro: 'Escribe la palabra que falta.', pool: COMP_TYPE, count: 10 },
          { teach: T.compSentence, type: 'quiz', emoji: '🥅', title: 'Tanda de penaltis', intro: 'Elige la forma correcta.', pool: GRAMMAR_COMP, count: 10 },
          { teach: T.compSentence, type: 'order', emoji: '🎯', title: 'Pase al hueco', intro: 'Toca las palabras en orden.', pool: ORDER_COMP, count: 5 },
          { teach: T.reading, type: 'reading', emoji: '👕', title: 'Reading: Hannah y Danny eligen camiseta', intro: 'Lee y di si es True (verdad) o False (mentira).',
            heading: 'Which shirt is the best?',
            text: [
              ['Hannah: Which football shirts do you like, Danny?', "I don't like shirt number 1.", "It's the most expensive, but I think it's a bit boring.", "Shirt number 2 is better than number 1, and it's cheaper!"],
              ["Danny: Well, I don't like number 3.", "I think it's more boring than number 1.", "And I don't like dark colours."],
              ['Hannah: Yes, and number 4 is the weirdest shirt, but I love it!', "It's pink and green!"],
              ["Danny: Haha, it's really silly!", 'I like number 5.', "It's blue and red.", 'I think number 5 is the best!'],
              ['Hannah: No! I think number 5 is the worst!', "It's horrible!"]
            ],
            es: [
              'Hannah: ¿Qué camisetas de fútbol te gustan, Danny? No me gusta la camiseta número 1. Es la más cara, pero creo que es un poco aburrida. La número 2 es mejor que la número 1, ¡y es más barata!',
              'Danny: Bueno, a mí no me gusta la número 3. Creo que es más aburrida que la número 1. Y no me gustan los colores oscuros.',
              'Hannah: Sí, y la número 4 es la camiseta más rara, ¡pero me encanta! ¡Es rosa y verde!',
              'Danny: ¡Jaja, es muy ridícula! A mí me gusta la número 5. Es azul y roja. ¡Creo que la número 5 es la mejor!',
              'Hannah: ¡No! ¡Yo creo que la número 5 es la peor! ¡Es horrible!'
            ],
            keepOrder: true,
            questions: [
              tf('Hannah thinks shirt number 2 is better than number 1.', true, '«Shirt number 2 is better than number 1».', { hint: [[0, 3]] }),
              tf('Shirt number 1 is cheaper than shirt number 2.', false, 'La número 1 es la más cara (the most expensive). La 2 es más barata.', { hint: [[0, 2], [0, 3]] }),
              tf('Danny thinks number 3 is more boring than number 1.', true, '«I think it\'s more boring than number 1».', { hint: [[1, 1]] }),
              tf('Danny likes dark colours.', false, '«I don\'t like dark colours».', { hint: [[1, 2]] }),
              tf('Hannah thinks number 4 is the weirdest.', true, '«number 4 is the weirdest shirt».', { hint: [[2, 0]] }),
              tf('Danny thinks number 5 is the worst.', false, 'Danny piensa que es <b>the best</b>. ¡Es Hannah quien dice que es la peor!', { hint: [[3, 3]] }),
              tf('Hannah thinks number 5 is the best.', false, 'Hannah dice que es <b>the worst</b> (la peor).', { hint: [[4, 0]] })
            ] },
          { teach: T.dictation, type: 'type', emoji: '✍️', title: 'Dictado del míster', intro: 'Escucha y escribe.', pool: DICTATION, count: 6 }
        ]
      },

      /* ---------------- JORNADA 3 ---------------- */
      {
        name: 'as … as', emoji: '⚖️', charla: ['asas'],
        desc: 'Comparamos a tres jugadores de La Masia: ¿quién es tan alto como quién?',
        games: [
          { teach: T.table, type: 'quiz', emoji: '📊', title: 'El VAR: ¿verdad o mentira?', intro: 'Mira la tabla: ¿True o False?', context: TABLE, pool: TABLE_TF, count: 8 },
          { teach: T.asas, type: 'quiz', emoji: '🥅', title: 'Tanda de penaltis', intro: 'Elige la palabra correcta.', pool: GRAMMAR_ASAS, count: 8 },
          { teach: T.asas, type: 'order', emoji: '🎯', title: 'Pase al hueco', intro: 'Toca las palabras en orden.', pool: ORDER_ASAS, count: 5 },
          { teach: T.reading, type: 'reading', emoji: '🏟️', title: 'Reading: Football in my town!', intro: 'Lee y contesta.',
            heading: 'Football in my town!',
            text: [
              ['Last week my class visited two football tournaments in our town.', 'They were very different.'],
              ['The first tournament, Super Cup, is in a big stadium in the centre of town.', 'You can see many successful and talented players.', 'The tournament is very popular and the tickets are expensive.', 'The players are good, but some fans are a bit weird!'],
              ["The second tournament, Mini Cup, is for children and it's in a small sports centre.", "It isn't as popular as the tournament in the stadium, so the tickets are cheaper.", "Watching matches in the sports centre isn't as exciting as going to the stadium, but the children's goals are lovely!", 'I think the children are as good as the players in the big tournament!']
            ],
            es: [
              'La semana pasada mi clase visitó dos torneos de fútbol en nuestra ciudad. Eran muy diferentes.',
              'El primer torneo, la Super Cup, es en un estadio grande en el centro de la ciudad. Puedes ver a muchos jugadores con éxito y con talento. El torneo es muy popular y las entradas son caras. Los jugadores son buenos, ¡pero algunos aficionados son un poco raros!',
              'El segundo torneo, la Mini Cup, es para niños y es en un polideportivo pequeño. No es tan popular como el torneo del estadio, así que las entradas son más baratas. Ver partidos en el polideportivo no es tan emocionante como ir al estadio, ¡pero los goles de los niños son preciosos! ¡Creo que los niños son tan buenos como los jugadores del torneo grande!'
            ],
            questions: [
              { q: 'Where is Super Cup?', qes: '¿Dónde es la Super Cup?', options: ['in a big stadium', 'in a small sports centre', 'at school'], hint: [[1, 0]] },
              { q: 'Are the Super Cup tickets cheap?', qes: '¿Las entradas de la Super Cup son baratas?', options: ["No, they're expensive.", "Yes, they're cheap."], hint: [[1, 2]] },
              { q: 'Mini Cup ______ as popular as Super Cup.', qes: 'La Mini Cup ______ tan popular como la Super Cup.', options: ["isn't", 'is'], keep: true, hint: [[2, 1]] },
              { q: 'Is the sports centre as big as the stadium?', qes: '¿El polideportivo es tan grande como el estadio?', options: ["No, it isn't. It's small.", 'Yes, it is.'], hint: [[2, 0]] },
              { q: 'Is watching matches in the sports centre as exciting as going to the stadium?', qes: '¿Ver partidos en el polideportivo es tan emocionante como ir al estadio?', options: ["No, it isn't.", 'Yes, it is.'], hint: [[2, 2]] },
              { q: 'What does the writer think about the children?', qes: '¿Qué piensa quien escribe sobre los niños?', options: ['They are as good as the players in the big tournament.', "They aren't as good as the big players.", 'They are weird.'], hint: [[2, 3]] }
            ] },
          { teach: T.table, type: 'quiz', emoji: '🎧', title: 'Listening: el comentarista', intro: 'Escucha y mira la tabla: ¿True o False?', context: TABLE, pool: TABLE_LISTEN, count: 8, keepOrder: true }
        ]
      },

      /* ---------------- JORNADA 4 ---------------- */
      {
        name: 'En la taquilla', emoji: '🎟️', charla: ['tickets', 'th', 'polite'],
        desc: 'Comprar entradas, el sonido «th» y cómo dar tu opinión con educación.',
        games: [
          { teach: T.tickets, type: 'order', emoji: '💬', title: 'Ordena la conversación', intro: 'Ordena la conversación de principio a fin.', pool: TICKET_DIALOGUES, count: 2 },
          { teach: T.tickets, type: 'quiz', emoji: '🎟️', title: 'En la taquilla', intro: '¿Qué dirías tú?', pool: TICKETS_QUIZ, count: 8 },
          { teach: T.ticketsListen, type: 'quiz', emoji: '🎧', title: 'Listening: en la cola', intro: 'Escucha la conversación y contesta.', pool: TICKETS_LISTEN, count: 5 },
          { teach: T.th, type: 'classify', emoji: '👅', title: 'Soft th o hard th', intro: 'Escucha: ¿soft o hard?', autoSay: true,
            buckets: [{ id: 'soft', label: 'Soft th (como la Z)', emoji: '🌬️' }, { id: 'hard', label: 'Hard th (como una d suave)', emoji: '🐝' }],
            items: TH_ITEMS, count: 10 },
          { teach: T.polite, type: 'quiz', emoji: '🤝', title: 'Juego limpio', intro: '¿Qué es lo más educado?', pool: POLITE_QUIZ, count: 6 },
          { teach: T.reading, type: 'reading', emoji: '🖼️', title: 'Reading: The Art Competition', intro: 'Lee la historia y contesta.',
            heading: 'The Art Competition',
            text: [
              ['Year 5 are visiting an art exhibition.', 'All the paintings are finalists in an important competition.', 'Some of them are by successful and famous artists, and others are by new artists.'],
              ['The teacher is pointing at a piece of modern art.', 'It came second in the competition.', "Anita thinks it's fantastic.", "She says it's colourful and interesting.", "Rob agrees, but it isn't his favourite picture.", "James thinks it's horrible and weird."],
              ['Then the students look at the painting that won.', "Anita doesn't think it's as good as the one that came second, but she likes it.", "Rob thinks it's the best painting in the room.", "James says it's rubbish and that it's the worst painting in the room."],
              ['The teacher says it is important to have an opinion, but James is very rude.', 'She knows the artist very well, because he is her brother.', 'And he is standing right behind James!']
            ],
            es: [
              'Los de 5º están visitando una exposición de arte. Todos los cuadros son finalistas de un concurso importante. Algunos son de artistas famosos y con éxito, y otros son de artistas nuevos.',
              'La profesora señala una obra de arte moderno. Quedó segunda en el concurso. Anita piensa que es fantástica. Dice que es colorida e interesante. Rob está de acuerdo, pero no es su cuadro favorito. James piensa que es horrible y rara.',
              'Después los alumnos miran el cuadro que ganó. Anita no cree que sea tan bueno como el que quedó segundo, pero le gusta. Rob piensa que es el mejor cuadro de la sala. James dice que es basura y que es el peor cuadro de la sala.',
              'La profesora dice que es importante tener una opinión, pero James es muy maleducado. Ella conoce muy bien al artista, porque es su hermano. ¡Y está justo detrás de James!'
            ],
            questions: [
              { q: 'Where are the children?', qes: '¿Dónde están los niños?', options: ['at an art exhibition', 'at a football match', 'at the cinema'], hint: [[0, 0]] },
              { q: 'What does Anita think of the modern painting?', qes: '¿Qué piensa Anita del cuadro moderno?', options: ["It's fantastic.", "It's horrible.", "It's boring."], hint: [[1, 2]] },
              { q: 'Which painting does Rob like best?', qes: '¿Qué cuadro le gusta más a Rob?', options: ['the painting that won', 'the painting that came second', 'no paintings'], hint: [[2, 2]] },
              { q: 'Who is rude?', qes: '¿Quién es maleducado?', options: ['James', 'Rob', 'Anita'], hint: [[3, 0]] },
              { q: 'How does the teacher know the artist?', qes: '¿Por qué conoce la profesora al artista?', options: ["He's her brother.", "He's her friend.", "He's her teacher."], hint: [[3, 1]] },
              { q: 'What does "rubbish" mean here?', qes: '¿Qué significa aquí «rubbish»?', options: ['very bad', 'very good', 'very expensive'], hint: [[2, 3]], explain: '<b>rubbish</b> = basura → algo muy malo.' }
            ] }
        ]
      },

      /* ---------------- JORNADA 5: LA FINAL ---------------- */
      {
        name: 'Tipo examen', emoji: '🏆', final: true, charla: ['reading', 'comparativos', 'asas'],
        desc: 'Ejercicios como los del examen (A2 Flyers): listening, reading, huecos y spelling.',
        games: [
          { teach: T.examListen, type: 'quiz', emoji: '🎧', title: 'Listening: elige el dibujo', intro: 'Escucha y elige.', pool: FINAL_LISTEN, count: 5 },
          { teach: T.examConv, type: 'quiz', emoji: '💬', title: 'Reading: la conversación', intro: 'Elige la mejor respuesta de Zach.', pool: FINAL_CONVERSATION, count: 5, penalty: false },
          { teach: T.cloze, type: 'cloze', emoji: '🧩', title: 'Reading: completa el texto', intro: 'Elige la palabra de cada hueco.',
            texts: [
              { title: 'At the football museum', text: "Yesterday I went to a football museum. The most {0} shirt cost nearly one thousand euros, but it wasn't the best shirt. My favourite shirt was the {1} shirt in the museum! It was old, but it wasn't as weird {2} the others. The player who wore it wasn't the most {3} player in the team, but I think he was a very {4} player. I would love to be as good as he was!",
                gaps: [
                  { options: ['expensive', 'cheapest', 'cheap'], explain: '«the most» + adjetivo largo → the most expensive.' },
                  { options: ['cheapest', 'cheaper', 'cheap'], explain: 'Hay «the» delante → superlativo: the cheapest.' },
                  { options: ['as', 'than', 'like'], explain: 'as weird <b>as</b>.' },
                  { options: ['successful', 'best', 'good'], explain: 'the most + adjetivo largo → the most successful.' },
                  { options: ['talented', 'boring', 'cheap'], explain: 'Le gusta mucho ese jugador → talented.' }
                ] },
              { title: 'My sister and me', text: "My sister and I love painting. Her paintings are {0} than my paintings because she uses lots of colours. My paintings are interesting, but they aren't as {1} as hers. Last week we went to an art competition. My sister's painting was the {2}! It came first. My painting came last, so I was a bit {3}. But my sister said, 'Your painting is {4}!'",
                gaps: [
                  { options: ['more colourful', 'colourfuller', 'most colourful'], explain: 'Hay «than» → comparativo. colourful es larga → more colourful.' },
                  { options: ['colourful', 'more colourful', 'colourfuller'], explain: 'Entre los dos «as» va el adjetivo normal.' },
                  { options: ['best', 'better', 'good'], explain: 'Hay «the» y quedó primero → the best.' },
                  { options: ['sad', 'funny', 'popular'], explain: 'Quedó último → sad (triste).' },
                  { options: ['lovely', 'rubbish', 'horrible'], explain: 'Su hermana es educada → lovely.' }
                ] },
              { title: 'A great match', text: "Last Saturday I went to the stadium with my dad. It's {0} than my school's football pitch! The tickets were very {1}, sixty euros each, but it was the most {2} match of the year. Our team won 4-3! My favourite player isn't as tall {3} the other players, but he is the {4} player in the team.",
                gaps: [
                  { options: ['bigger', 'biggest', 'big'], explain: 'Hay «than» → comparativo: bigger.' },
                  { options: ['expensive', 'cheap', 'shy'], explain: '60 € cada una → expensive.' },
                  { options: ['exciting', 'excited', 'cheap'], explain: '4-3 → the most exciting match.' },
                  { options: ['as', 'than', 'that'], explain: 'as tall <b>as</b>.' },
                  { options: ['best', 'better', 'good'], explain: '«the» + superlativo → the best.' }
                ] }
            ] },
          { teach: T.perspective, type: 'reading', emoji: '🔭', title: 'Reading: Perspective in painting', intro: 'Un texto difícil: ¡usa las ayudas!',
            heading: 'Perspective in painting',
            text: [
              ['A long time ago, in medieval times, paintings were often colourful, but they usually looked flat.', "Artists didn't know how to create perspective."],
              ['Perspective is a technique that shows three dimensions on a flat surface.', 'With perspective, objects can look closer or further away.'],
              ['Filippo Brunelleschi was an architect, but he was also interested in painting.', 'He invented the vanishing point: the point where the perspective lines come together.'],
              ['Artists also divide a painting into three parts: the foreground, the middle ground and the background.', 'Objects in the foreground are bigger and closer to us.', 'Objects in the background are smaller and darker, and they have less detail.', 'The middle ground is the space between the foreground and the background.']
            ],
            es: [
              'Hace mucho tiempo, en la Edad Media, los cuadros solían ser coloridos, pero normalmente parecían planos. Los artistas no sabían crear perspectiva.',
              'La perspectiva es una técnica que muestra tres dimensiones en una superficie plana. Con la perspectiva, los objetos pueden parecer más cerca o más lejos.',
              'Filippo Brunelleschi era arquitecto, pero también le interesaba la pintura. Inventó el punto de fuga: el punto donde se juntan las líneas de la perspectiva.',
              'Los artistas también dividen un cuadro en tres partes: el primer plano, el plano medio y el fondo. Los objetos del primer plano son más grandes y están más cerca de nosotros. Los objetos del fondo son más pequeños y más oscuros, y tienen menos detalle. El plano medio es el espacio entre el primer plano y el fondo.'
            ],
            questions: [
              { q: 'What were paintings like in medieval times?', qes: '¿Cómo eran los cuadros en la Edad Media?', options: ['colourful, but flat', 'dark and modern', 'small and boring'], hint: [[0, 0]] },
              { q: "What was Brunelleschi's job?", qes: '¿Cuál era el trabajo de Brunelleschi?', options: ['architect', 'footballer', 'teacher'], hint: [[2, 0]] },
              { q: 'What idea did Brunelleschi invent?', qes: '¿Qué idea inventó Brunelleschi?', options: ['the vanishing point', 'the foreground', 'colourful paintings'], hint: [[2, 1]] },
              { q: 'Where do objects look biggest?', qes: '¿Dónde se ven más grandes los objetos?', options: ['in the foreground', 'in the background', 'in the middle ground'], hint: [[3, 1]] },
              { q: 'What are objects in the background like?', qes: '¿Cómo son los objetos del fondo?', options: ['smaller and darker', 'bigger and closer', 'lighter and bigger'], hint: [[3, 2]] },
              { q: '"Further away" means…', qes: '«Further away» significa…', options: ['más lejos', 'más cerca', 'más grande'], hint: [[1, 1]] }
            ] },
          { teach: T.spelling, type: 'type', emoji: '🔠', title: 'Spelling: el crucigrama', intro: 'Escribe el adjetivo.', pool: CLUES, count: 8 },
          { teach: T.cloze, type: 'quiz', emoji: '🥅', title: 'Penaltis finales', intro: '¡Último esfuerzo! Elige la forma correcta.', pool: [...GRAMMAR_COMP, ...GRAMMAR_ASAS], count: 8 }
        ]
      }
    ]
  });
})();
