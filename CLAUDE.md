# Leo Academy: sistema de trabajo

Web para que un niño de **5º de primaria** (10-11 años, castellanohablante, muy fan del fútbol y del **FC Barcelona**) repase las asignaturas del cole jugando. Funciona en **tablet** (uso principal) y en ordenador; el móvil no hace falta.

Hoy hay **Inglés** (libro Richmond *Amazing Journey 5*, Madrid Edition: Student's Book + Activity Book). Llegarán **Lengua, Matemáticas** y otras.

## Cómo trabajamos (no hay que repetirlo cada vez)

Cuando llegan **capturas del libro de una unidad** (de cualquier asignatura), hago SIEMPRE esto sin esperar más instrucciones:

1. **Leer todas las capturas**, tanto las del libro como las de ejercicios: vocabulario, gramática, textos, diálogos y también **el formato de los ejercicios**, porque son los que caen en el examen. Si hay ejercicios hechos por el niño, **mirar sus errores** y reforzar justo eso en la explicación ("errores típicos") y en los juegos.
2. **Crear `subjects/<asignatura>/unit<N>.js`** con:
   - **Charla del míster** (`charla`): explicación **en castellano**, para un niño de 10-11 años, por secciones cortas, con ejemplos de fútbol/Barça, trucos para recordar y una tabla de errores típicos. En inglés, cada ejemplo va dentro de `<say>` para que se pueda escuchar.
   - **5 jornadas** (`days`), una por día, de **~20 minutos** cada una y con **5-6 juegos**. La 5ª es **"La Final"** (`final: true`): ejercicios con el mismo formato que el examen.
   - **Cada juego lleva `teach`**: mini-explicación visual que sale SOLA antes de jugar (el niño no va a pulsar "ver el tema"). Son 2-5 filas cortas: regla + ejemplos que se pueden escuchar (p. ej. «1 sílaba → +er: cheap → cheaper → the cheapest»). El `intro` es una sola frase de qué hay que hacer.
   - **Poco texto en pantalla**: al niño le cansa leer instrucciones largas. Mejor emojis, ejemplos y botones grandes.
   - **Bancos de preguntas más grandes que lo que se pregunta** (`pool` > `count`), para que repetir una jornada no sea igual. El "entrenamiento libre" mezcla juegos de toda la unidad automáticamente.
   - **Reading en cada jornada**, porque al niño le cuesta: textos cortos, con traducción por párrafo (`es`), pista de la frase donde está la respuesta (`hint: [[párrafo, frase]]`) y preguntas en el orden del texto con su traducción (`qes`).
   - **Listening** (en inglés): con `say` o `dialogue`, se puede escuchar dos veces y en lento. Ojo con trampas tipo examen (fifteen/fifty, like/don't like).
   - **Ambientación de fútbol** en las frases (Camp Nou, jugadores, entradas, camisetas…), siempre sin perder el contenido del libro. Nada de inventar datos reales de jugadores: para tablas y números se usan alevines de ficción (Marc, Pau, Hugo…). Los textos del libro se **adaptan o parafrasean**, no se copian enteros.
3. **Añadir la unidad** a `index.html` con una línea `<script src="subjects/<asignatura>/unit<N>.js"></script>`. Si la asignatura es nueva, se registra en `subjects/subjects.js` (con su `lang`: `en-GB` para inglés y `es-ES` para el resto).
4. **Probar**: `tools/test.sh`. Comprueba la sintaxis y un robot juega todas las jornadas de todas las unidades. Tiene que acabar en `✅ Todo OK`. Si cambia el aspecto, revisar capturas a tamaño tablet (1024×768 y 820×1180) con Chrome headless.
5. **Publicar** (cuando ya esté el repositorio): commit + push con la cuenta de GitHub **personal `srojasz`** (nunca la de trabajo). Antes: `gh auth switch --user srojasz`.
6. Al terminar, contar en pocas líneas qué hay en la unidad y qué errores del niño se han reforzado.

## Estructura

```
index.html                 carga todo (una línea por unidad)
css/style.css              estilos (azulgrana, botones grandes para tablet)
js/core.js                 utilidades, voz (Web Speech API), progreso (localStorage), niveles, cromos
js/glossary.js             diccionario inglés→español para tocar palabras en los readings
js/games.js                motores de juego (ver abajo)
js/app.js                  pantallas y navegación (#/, #/s/<asig>, #/u/<asig>-<unidad>, …/day/<n|free>)
subjects/subjects.js       asignaturas (id, nombre, emoji, lang, color)
subjects/<asig>/unitN.js   contenido de cada unidad
tools/test.sh              pruebas automáticas
```

Sin backend. El progreso (goles, estrellas, cromos) se guarda en el `localStorage` del dispositivo.

## Tipos de juego disponibles (`type`)

| type | Para qué | Datos |
|---|---|---|
| (todos) | Campo común `teach` con la mini-explicación previa | `teach: [{t: 'regla (html)', ex?: ['ejemplo en inglés'], html?, es?}]` |
| `quiz` | Penaltis: pregunta con opciones; también listening (`say`/`dialogue`) y verdadero/falso | `pool: [{q, qes?, options, answer? (por defecto options[0]), explain?, say?, dialogue?, context?, keep?}]`, `count`, `context?` (p. ej. una tabla) |
| `match` | Parejas | `pairs: [[en, es, emoji]]`, `perRound`, `rounds` |
| `scramble` | Letras desordenadas | `pool: [{word, hint, emoji}]`, `count` |
| `order` | Ordenar palabras de una frase o frases de un diálogo | `pool: [{sentence, es?}]` o `[{lines:[…], title?}]`, `count` |
| `type` | Escribir la respuesta / dictado / crucigrama | `pool: [{prompt, answer: 'x' \| ['x','y'], say?, explain?}]`, `count` |
| `classify` | Clasificar en grupos | `buckets: [{id,label,emoji}]`, `items: [{text, b, explain?}]`, `count`, `autoSay?` |
| `reading` | Texto con ayudas + preguntas | `heading`, `text: [[frases]]`, `es: [párrafos]`, `questions: [{q, qes, options, hint}]`, `glossary?: false` |
| `cloze` | Texto con huecos | `texts: [{title, text: '… {0} …', gaps: [{options, explain}]}]` (se elige uno al azar) |

Si una asignatura necesita un juego nuevo (p. ej. cálculo mental en Mates), se añade como motor en `js/games.js` siguiendo la misma firma `(root, def, ctx)`, se llama a `ctx.score(acierto)` en cada respuesta y a `ctx.finish()` al acabar.

## Reglas de contenido

- Explicaciones y enunciados de los juegos en **castellano**; el contenido de inglés, en inglés.
- Feedback siempre amable; cuando falla, explicar por qué (`explain`).
- Sin escudo oficial ni fotos reales. Los nombres de jugadores y los colores azulgrana sí se pueden usar.
- La web se llama **Leo Academy** (nombre elegido por el usuario). Repositorio público `srojasz/leo-academy`, publicado con GitHub Pages.
