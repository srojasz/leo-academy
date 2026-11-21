'use strict';
/* Diccionario para los readings: al tocar una palabra se ve su significado.
   Las unidades pueden añadir palabras con: Object.assign(GLOSSARY, {...}) */
const GLOSSARY = {
  // básicas
  'a': 'un, una', 'an': 'un, una', 'the': 'el, la, los, las', 'and': 'y', 'but': 'pero', 'or': 'o',
  'so': 'así que / tan', 'because': 'porque', 'than': 'que (al comparar)', 'as': 'tan… como / como',
  'of': 'de', 'in': 'en', 'on': 'en, sobre', 'at': 'en', 'to': 'a, para', 'for': 'para, por',
  'with': 'con', 'by': 'por, de', 'from': 'de, desde', 'about': 'sobre, de', 'between': 'entre',
  'behind': 'detrás de', 'into': 'en (dentro de)', 'not': 'no', 'no': 'no', 'yes': 'sí',
  'very': 'muy', 'really': 'muy, de verdad', 'too': 'demasiado / también', 'also': 'también',
  'a bit': 'un poco', 'bit': 'poco (a bit = un poco)', 'some': 'algunos', 'many': 'muchos', 'all': 'todos',
  'more': 'más', 'most': 'el más (the most)', 'less': 'menos', 'other': 'otro', 'others': 'los otros',
  'often': 'a menudo', 'usually': 'normalmente', 'always': 'siempre', 'never': 'nunca',
  'now': 'ahora', 'then': 'entonces, luego', 'last': 'último / pasado', 'first': 'primero',
  'second': 'segundo', 'new': 'nuevo', 'old': 'viejo, mayor', 'young': 'joven', 'well': 'bien / bueno…',
  'right': 'justo / derecha / correcto', 'maybe': 'quizás', 'in fact': 'de hecho', 'fact': 'hecho',
  'which': 'cuál / que', 'who': 'quién / que', 'what': 'qué', 'where': 'dónde', 'how': 'cómo',
  'why': 'por qué', 'when': 'cuándo', 'that': 'eso, ese / que', 'this': 'esto, este', 'these': 'estos',
  'those': 'esos', 'there': 'allí', 'here': 'aquí', 'it': 'ello, lo (cosa)', 'its': 'su (de una cosa)',
  'everybody': 'todo el mundo', 'everyone': 'todo el mundo', 'haha': '¡jaja!', 'hi': 'hola', 'hello': 'hola',
  'ok': 'vale', 'okay': 'vale', 'please': 'por favor', 'thanks': 'gracias', 'thank': 'gracias (thank you)',

  // personas
  'i': 'yo', "i'm": 'yo soy / estoy', 'my': 'mi', 'me': 'me, mí', 'you': 'tú, vosotros', 'your': 'tu',
  'he': 'él', "he's": 'él es / está', 'his': 'su (de él)', 'him': 'le, él', 'she': 'ella',
  "she's": 'ella es / está', 'her': 'su (de ella) / la', 'hers': 'el suyo (de ella)', 'we': 'nosotros',
  'our': 'nuestro', 'us': 'nos, nosotros', 'they': 'ellos', "they're": 'ellos son / están',
  'their': 'su (de ellos)', 'them': 'les, ellos', "it's": 'es / está (it is)',
  'dad': 'papá', 'mum': 'mamá', 'sister': 'hermana', 'brother': 'hermano', 'friend': 'amigo/a',
  'friends': 'amigos', 'teacher': 'profesor/a', 'students': 'alumnos', 'class': 'clase',
  'children': 'niños', 'child': 'niño', 'people': 'gente', 'name': 'nombre', 'fans': 'aficionados',
  'year': 'año / curso', 'eleven': 'once',

  // verbos
  'is': 'es / está', 'are': 'son / están', 'am': 'soy / estoy', 'was': 'era / fue / estaba',
  'were': 'eran / fueron', "isn't": 'no es / no está', "aren't": 'no son / no están', "wasn't": 'no era / no fue',
  'be': 'ser, estar', 'have': 'tener', 'has': 'tiene', 'do': 'hacer', 'does': 'hace', 'did': 'hizo (pasado)',
  "don't": 'no (verbo)', "doesn't": 'no (verbo, con he/she/it)', "didn't": 'no (pasado)', "can't": 'no puedo',
  'can': 'poder', 'like': 'gustar / como', 'likes': 'le gusta', 'love': 'encantar, amar', 'loves': 'le encanta',
  'hate': 'odiar', 'think': 'pensar, creer', 'thinks': 'piensa, cree', 'know': 'saber, conocer',
  'knows': 'sabe, conoce', 'go': 'ir', 'going': 'ir, yendo', 'went': 'fui, fue (pasado de go)',
  'see': 'ver', 'look': 'mirar / parecer', 'looked': 'parecían / miraron', 'looking': 'mirando',
  'watch': 'ver, mirar', 'watched': 'vimos, vio', 'watching': 'viendo', 'visit': 'visitar',
  'visited': 'visitó, visitamos', 'visiting': 'visitando', 'play': 'jugar / tocar', 'plays': 'juega / toca',
  'paint': 'pintar', 'paints': 'pinta', 'painting': 'cuadro, pintura / pintando', 'say': 'decir',
  'says': 'dice', 'make': 'hacer', 'makes': 'hace', 'try': 'intentar', 'tried': 'intentaste',
  'agree': 'estar de acuerdo', 'agrees': 'está de acuerdo', 'lost': 'perdimos, perdió', 'won': 'ganó',
  'win': 'ganar', 'came': 'vino, quedó (came second = quedó segundo)', 'come': 'venir', 'raining': 'lloviendo',
  'pointing': 'señalando', 'pointing out': 'señalando', 'standing': 'de pie', 'giving': 'dando',
  'give': 'dar', 'create': 'crear', 'invented': 'inventó', 'divide': 'dividir', 'shows': 'muestra',
  'show': 'mostrar', 'uses': 'usa', 'use': 'usar', 'using': 'usando', 'buy': 'comprar',
  'sells': 'vende', 'wore': 'llevó puesto', 'wear': 'llevar puesto',

  // fútbol y lugares
  'football': 'fútbol', 'team': 'equipo', 'player': 'jugador', 'players': 'jugadores', 'match': 'partido',
  'matches': 'partidos', 'goal': 'gol', 'goals': 'goles', 'stadium': 'estadio', 'tickets': 'entradas',
  'ticket': 'entrada', 'shirt': 'camiseta', 'shirts': 'camisetas', 'tournament': 'torneo',
  'tournaments': 'torneos', 'cup': 'copa', 'super': 'súper', 'mini': 'mini', 'interviews': 'entrevistas',
  'school': 'colegio', 'town': 'ciudad, pueblo', 'centre': 'centro', 'sports': 'deportes',
  'sports centre': 'polideportivo', 'museum': 'museo', 'room': 'sala, habitación', 'sunday': 'domingo',
  'week': 'semana', 'number': 'número',

  // arte
  'art': 'arte', 'artist': 'artista', 'artists': 'artistas', 'artistic': 'artístico', 'paintings': 'cuadros',
  'picture': 'dibujo, cuadro', 'pictures': 'dibujos, cuadros', 'exhibition': 'exposición',
  'competition': 'concurso', 'finalists': 'finalistas', 'piece': 'pieza, obra', 'colours': 'colores',
  'colour': 'color', 'colourful': 'colorido, de muchos colores', 'pink': 'rosa', 'green': 'verde',
  'blue': 'azul', 'red': 'rojo', 'black': 'negro', 'white': 'blanco', 'grey': 'gris', 'yellow': 'amarillo',
  'opinion': 'opinión', 'opinions': 'opiniones', 'perspective': 'perspectiva', 'technique': 'técnica',
  'effect': 'efecto', 'dimensions': 'dimensiones', 'three': 'tres', 'two': 'dos', 'one': 'uno',
  'surface': 'superficie', 'objects': 'objetos', 'closer': 'más cerca', 'further': 'más lejos',
  'away': 'lejos', 'further away': 'más lejos', 'architect': 'arquitecto', 'interested': 'interesado',
  'idea': 'idea', 'vanishing': 'que desaparece (vanishing point = punto de fuga)', 'point': 'punto',
  'lines': 'líneas', 'together': 'juntos (come together = se juntan)', 'parts': 'partes',
  'foreground': 'primer plano (la parte de delante, abajo)', 'middle': 'medio',
  'ground': 'suelo / plano', 'background': 'fondo (la parte de atrás)', 'space': 'espacio',
  'detail': 'detalle', 'medieval': 'medieval (de la Edad Media)', 'times': 'tiempos, épocas / veces',
  'long': 'largo (a long time ago = hace mucho tiempo)', 'time': 'tiempo, vez', 'ago': 'hace (tiempo)',
  'flat': 'plano (sin profundidad)', 'important': 'importante', 'famous': 'famoso',

  // adjetivos de la unidad
  'bad': 'malo', 'boring': 'aburrido', 'cheap': 'barato', 'dark': 'oscuro', 'expensive': 'caro',
  'good': 'bueno', 'horrible': 'horrible', 'light': 'claro, luminoso', 'modern': 'moderno',
  'silly': 'tonto, ridículo', 'weird': 'raro', 'creative': 'creativo', 'exciting': 'emocionante',
  'funny': 'gracioso', 'inventive': 'ingenioso', 'lovely': 'precioso, encantador', 'popular': 'popular',
  'shy': 'tímido', 'successful': 'exitoso, con éxito', 'talented': 'con talento', 'rude': 'maleducado',
  'polite': 'educado', 'rubbish': 'basura (muy malo)', 'fantastic': 'fantástico', 'interesting': 'interesante',
  'different': 'diferente', 'favourite': 'favorito', 'big': 'grande', 'small': 'pequeño', 'bigger': 'más grande',
  'smaller': 'más pequeño', 'darker': 'más oscuro', 'cheaper': 'más barato', 'better': 'mejor',
  'best': 'el mejor', 'worse': 'peor', 'worst': 'el peor', 'weirdest': 'el más raro',
  'colder': 'más frío', 'tall': 'alto', 'taller': 'más alto'
};

function gloss(word) {
  const w = String(word).toLowerCase().replace(/[’‘]/g, "'");
  if (GLOSSARY[w]) return GLOSSARY[w];
  const tries = [
    w.replace(/'s$/, ''), w.replace(/s'$/, ''), w.replace(/ies$/, 'y'), w.replace(/es$/, ''),
    w.replace(/s$/, ''), w.replace(/ed$/, ''), w.replace(/d$/, ''), w.replace(/ing$/, ''), w.replace(/ing$/, 'e')
  ];
  for (const t of tries) if (GLOSSARY[t]) return GLOSSARY[t];
  return null;
}
