'use strict';
/* Asignaturas de la web. Para añadir una nueva: registerSubject({...}) aquí
   y crear su carpeta subjects/<id>/ con las unidades. */

registerSubject({
  id: 'ingles',
  name: 'Inglés',
  emoji: '🇬🇧',
  lang: 'en-GB',                 // idioma de la voz y de los readings
  book: 'Amazing Journey 5 (Richmond)',
  color: '#004d98'
});

registerSubject({
  id: 'lengua',
  name: 'Lengua',
  emoji: '📚',
  lang: 'es-ES',
  color: '#a50044'
});

registerSubject({
  id: 'mates',
  name: 'Matemáticas',
  emoji: '🔢',
  lang: 'es-ES',
  color: '#edbb00'
});
