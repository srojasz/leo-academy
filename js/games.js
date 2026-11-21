'use strict';
/* ============================================================
   Motores de juego. Cada juego recibe:
     root → el contenedor donde pintarse
     def  → la definición del juego (en el fichero de la unidad)
     ctx  → { score(acierto: boolean), finish() }
   ============================================================ */
const GAMES = {};

const OK_MSGS = ['¡GOOOOL! ⚽', '¡Golazo! 🔥', '¡Qué crack! ⭐', '¡Por la escuadra! 🎯', '¡Visca el Barça! 💙❤️', '¡Gol de chilena! 🤸'];
const KO_MSGS = ['¡Uy! Paradón del portero 🧤', '¡Al palo! 😬', '¡Fuera de juego! 🚩', '¡Rozando el larguero! 😮'];

/* ---------- Piezas comunes ---------- */
function progress(i, n) {
  return h('div', { class: 'progress' },
    Array.from({ length: n }, (_, k) => h('span', { class: 'dot' + (k < i ? ' done' : k === i ? ' now' : '') })),
    h('span', { class: 'progress-n' }, `${i + 1}/${n}`));
}

function feedback(ok, html, onNext, extra, nextLabel) {
  const btn = h('button', { class: 'btn primary big', type: 'button', onclick: onNext }, nextLabel || 'Siguiente ➜');
  const box = h('div', { class: 'feedback ' + (ok ? 'ok' : 'ko') },
    h('div', { class: 'fb-title' }, pick(ok ? OK_MSGS : KO_MSGS)),
    html ? h('div', { class: 'fb-text', html }) : null,
    extra || null,
    btn);
  setTimeout(() => {
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    btn.focus({ preventScroll: true });
  }, 60);
  return box;
}

function sayBtn(text, label) {
  return h('button', {
    class: 'say-btn', type: 'button', title: 'Escuchar',
    onclick: e => { e.stopPropagation(); Speech.speak(text); }
  }, label || '🔊');
}

function esToggle(es, label) {
  const t = h('div', { class: 'es-text hidden' }, es);
  const b = h('button', { class: 'es-btn', type: 'button' }, label || '🇪🇸 ¿Qué significa?');
  b.onclick = () => { t.classList.toggle('hidden'); b.classList.toggle('on'); };
  return h('div', { class: 'es-wrap' }, b, t);
}

function slowToggle() {
  const b = h('button', { class: 'chip-toggle' + (Speech.slow ? ' on' : ''), type: 'button' }, '🐢 Lento');
  b.onclick = () => { Speech.slow = !Speech.slow; b.classList.toggle('on', Speech.slow); };
  return b;
}

function listenBox(it) {
  let plays = 0;
  const count = h('span', { class: 'plays' }, 'Pulsa para escuchar');
  const btn = h('button', { class: 'btn listen', type: 'button' }, '▶️ Escuchar');
  const play = () => {
    plays++;
    count.textContent = plays === 1 ? '1ª vez' : plays === 2 ? '2ª vez (como en el examen)' : `${plays}ª vez`;
    btn.classList.add('playing');
    const p = it.dialogue ? Speech.dialogue(it.dialogue) : Speech.speak(it.say);
    p.then(() => btn.classList.remove('playing'));
  };
  btn.onclick = play;
  return { el: h('div', { class: 'listen-box' }, btn, slowToggle(), count), play };
}

function transcript(it) {
  if (!it.dialogue && !it.say) return null;
  const lines = it.dialogue ? it.dialogue.map(([w, t]) => `<b>${esc(w)}:</b> ${esc(t)}`) : [esc(it.say)];
  const box = h('div', { class: 'transcript hidden', html: lines.join('<br>') });
  const b = h('button', { class: 'es-btn', type: 'button' }, '📝 Ver lo que decía');
  b.onclick = () => { box.classList.toggle('hidden'); b.classList.toggle('on'); };
  return h('div', { class: 'transcript-wrap' }, b, box);
}

function penaltyEl() {
  return h('div', { class: 'penalty' },
    h('div', { class: 'goal' }, h('div', { class: 'net' }), h('div', { class: 'keeper' }, '🧤')),
    h('div', { class: 'ball' }, '⚽'));
}
function shoot(pen, ok) {
  if (!pen) return;
  const side = Math.random() < 0.5 ? 'left' : 'right';
  pen.classList.add(ok ? 'goal-' + side : 'save-' + side);
}

/* ============================================================
   QUIZ — "Tanda de penaltis": pregunta con opciones.
   item: { q, qes?, options[], answer? (por defecto options[0]),
           say? | dialogue?, context?, explain?, keep? }
   ============================================================ */
GAMES.quiz = (root, def, ctx) => {
  const items = def.count ? sample(def.pool, def.count) : (def.inOrder ? def.pool : shuffle(def.pool));
  let i = 0;

  const render = () => {
    const it = items[i];
    let answered = false;
    root.innerHTML = '';
    const answer = it.answer ?? it.options[0];
    const opts = (def.keepOrder || it.keep) ? it.options : shuffle(it.options);
    const pen = def.penalty === false ? null : penaltyEl();
    const card = h('div', { class: 'card q-card' });
    if (def.context) card.append(h('div', { class: 'context', html: def.context }));
    if (it.context) card.append(h('div', { class: 'context', html: it.context }));
    let lb = null;
    if (it.say || it.dialogue) { lb = listenBox(it); card.append(lb.el); }
    if (it.q) card.append(h('div', { class: 'question', html: it.q }));
    if (it.qes) card.append(esToggle(it.qes));

    const short = opts.every(o => stripTags(o).length <= 18);
    const grid = h('div', { class: 'options' + (short ? ' grid' : '') });
    const btns = opts.map(o => {
      const b = h('button', { class: 'opt', type: 'button', html: String(o) });
      b._val = o;
      b.onclick = () => choose(o, b);
      grid.append(b);
      return b;
    });
    const fb = h('div', { class: 'fb-slot' });
    root.append(progress(i, items.length));
    if (pen) root.append(pen);
    root.append(card, grid, fb);
    if (lb && def.autoplay !== false) lb.play();

    function choose(o, b) {
      if (answered) return;
      answered = true;
      const ok = o === answer;
      btns.forEach(x => {
        x.disabled = true;
        if (x._val === answer) x.classList.add('right');
      });
      if (!ok) b.classList.add('wrong');
      shoot(pen, ok);
      ctx.score(ok);
      let msg = ok ? '' : `La respuesta correcta es: <b>${answer}</b>`;
      if (it.explain) msg += (msg ? '<br>' : '') + '💡 ' + it.explain;
      fb.append(feedback(ok, msg, next, transcript(it)));
    }
  };
  const next = () => {
    Speech.stop();
    i++;
    if (i < items.length) render(); else ctx.finish();
  };
  render();
};

/* ============================================================
   MATCH — "Parejas de cromos"
   def.pairs: [[inglés, español, emoji?]], perRound, rounds
   ============================================================ */
GAMES.match = (root, def, ctx) => {
  const per = def.perRound || 6;
  const rounds = def.rounds || 1;
  const all = sample(def.pairs, per * rounds);
  let r = 0;

  const round = () => {
    root.innerHTML = '';
    const pairs = all.slice(r * per, (r + 1) * per);
    let sel = null;
    let done = 0;
    const failed = new Set();
    const hint = h('div', { class: 'hint-line' }, '👉 Toca una palabra en inglés y luego su pareja en español.');
    const L = h('div', { class: 'match-col' });
    const R = h('div', { class: 'match-col' });
    const lBtns = shuffle(pairs).map(p => {
      const b = h('button', { class: 'tile en', type: 'button' }, p[0]);
      b.onclick = () => {
        if (b.classList.contains('done')) return;
        Speech.speak(p[0]);
        lBtns.forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        sel = { p, b };
      };
      L.append(b);
      return b;
    });
    shuffle(pairs).forEach(p => {
      const b = h('button', { class: 'tile es', type: 'button', html: `${p[2] ? `<span class="emo">${p[2]}</span>` : ''}<span>${esc(p[1])}</span>` });
      b.onclick = () => {
        if (b.classList.contains('done')) return;
        if (!sel) { hint.textContent = '👈 ¡Primero toca una palabra en inglés!'; hint.classList.add('warn'); return; }
        if (sel.p === p) {
          sel.b.classList.remove('sel');
          sel.b.classList.add('done');
          b.classList.add('done');
          if (!failed.has(p)) ctx.score(true);
          sel = null;
          done++;
          if (done === pairs.length) setTimeout(endRound, 600);
        } else {
          b.classList.add('shake');
          setTimeout(() => b.classList.remove('shake'), 500);
          if (!failed.has(sel.p)) { failed.add(sel.p); ctx.score(false); }
        }
      };
      R.append(b);
    });
    root.append(h('div', { class: 'progress-text' }, `Ronda ${r + 1} de ${rounds}`), hint, h('div', { class: 'match' }, L, R));
  };
  const endRound = () => {
    r++;
    if (r < rounds) { round(); return; }
    root.innerHTML = '';
    root.append(h('div', { class: 'card center' },
      h('div', { class: 'big-emoji' }, '🙌'),
      h('h3', {}, '¡Todas las parejas hechas!'),
      h('button', { class: 'btn primary big', type: 'button', onclick: () => ctx.finish() }, 'Siguiente ➜')));
  };
  round();
};

/* ============================================================
   SCRAMBLE — "Letras locas": ordenar letras.
   item: { word, hint (español), emoji? }
   ============================================================ */
GAMES.scramble = (root, def, ctx) => {
  const items = sample(def.pool, def.count);
  let i = 0;
  const render = () => {
    const it = items[i];
    const word = it.word;
    let tries = 0;
    root.innerHTML = '';
    let mixed;
    do { mixed = shuffle(word.split('')); } while (mixed.join('') === word && word.length > 1);
    const picked = [];
    const slots = h('div', { class: 'slots' });
    const letters = h('div', { class: 'letters' });
    const msg = h('div', { class: 'msg' });
    const fb = h('div', { class: 'fb-slot' });
    const tiles = mixed.map((ch, k) => {
      const b = h('button', { class: 'letter', type: 'button' }, ch);
      b.onclick = () => { if (b.disabled) return; b.disabled = true; picked.push(k); draw(); };
      letters.append(b);
      return b;
    });
    const check = h('button', { class: 'btn primary', type: 'button', disabled: true }, '✔ Comprobar');
    const clear = h('button', { class: 'btn', type: 'button' }, '↺ Borrar');
    let locked = false;
    function draw() {
      slots.innerHTML = '';
      for (let s = 0; s < word.length; s++) {
        const k = picked[s];
        const sl = h('button', { class: 'slot' + (k != null ? ' filled' : ''), type: 'button' }, k != null ? mixed[k] : '');
        if (k != null) sl.onclick = () => { if (locked) return; picked.splice(s, 1); tiles[k].disabled = false; draw(); };
        slots.append(sl);
      }
      check.disabled = locked || picked.length !== word.length;
    }
    clear.onclick = () => { if (locked) return; picked.length = 0; tiles.forEach(t => { t.disabled = false; }); msg.textContent = ''; draw(); };
    check.onclick = () => {
      const guess = picked.map(k => mixed[k]).join('');
      if (guess === word) { ctx.score(true); Speech.speak(word); finish(true); return; }
      tries++;
      if (tries < 2) {
        msg.textContent = 'Casi… ¡inténtalo otra vez! Te queda 1 intento.';
        slots.classList.add('shake');
        setTimeout(() => slots.classList.remove('shake'), 500);
      } else { ctx.score(false); finish(false); }
    };
    function finish(ok) {
      locked = true;
      tiles.forEach(t => { t.disabled = true; });
      clear.disabled = true;
      msg.textContent = '';
      draw();
      fb.append(feedback(ok, ok ? `<b>${word}</b> = ${esc(it.hint)}` : `Era <b>${word}</b> (${esc(it.hint)})`, next));
    }
    draw();
    root.append(progress(i, items.length),
      h('div', { class: 'card center' },
        h('div', { class: 'big-emoji' }, it.emoji || '🔤'),
        h('div', { class: 'clue' }, it.hint),
        sayBtn(word, '🔊 Pista: escúchala')),
      slots, letters, h('div', { class: 'row' }, clear, check), msg, fb);
  };
  const next = () => { i++; if (i < items.length) render(); else ctx.finish(); };
  render();
};

/* ============================================================
   ORDER — "Pase al hueco": ordenar palabras o frases de un diálogo.
   item: { sentence: 'I think ...' , es? }  ó  { lines: [...], es? }
   ============================================================ */
GAMES.order = (root, def, ctx) => {
  const items = sample(def.pool, def.count);
  let i = 0;
  const render = () => {
    const it = items[i];
    const tokens = it.lines ? it.lines : it.sentence.split(' ');
    const isLines = !!it.lines;
    let mixed;
    do { mixed = shuffle(tokens); } while (mixed.join('|') === tokens.join('|') && tokens.length > 1);
    const chosen = [];
    let tries = 0;
    let locked = false;
    root.innerHTML = '';
    const ans = h('div', { class: 'answer-zone' + (isLines ? ' lines' : '') });
    const pool = h('div', { class: 'chip-pool' + (isLines ? ' lines' : '') });
    const msg = h('div', { class: 'msg' });
    const fb = h('div', { class: 'fb-slot' });
    const check = h('button', { class: 'btn primary', type: 'button', disabled: true }, '✔ Comprobar');
    const clear = h('button', { class: 'btn', type: 'button' }, '↺ Empezar otra vez');
    const chips = mixed.map((t, k) => {
      const b = h('button', { class: 'chip', type: 'button' }, t);
      b.onclick = () => { if (locked || b.disabled) return; b.disabled = true; chosen.push(k); draw(); };
      pool.append(b);
      return b;
    });
    function draw() {
      ans.innerHTML = '';
      if (!chosen.length) ans.append(h('span', { class: 'placeholder' }, isLines ? 'Toca las frases en orden 👇' : 'Toca las palabras en orden 👇'));
      chosen.forEach((k, s) => {
        const b = h('button', { class: 'chip in', type: 'button' }, (isLines ? `${s + 1}. ` : '') + mixed[k]);
        b.onclick = () => { if (locked) return; chosen.splice(s, 1); chips[k].disabled = false; draw(); };
        ans.append(b);
      });
      check.disabled = locked || chosen.length !== tokens.length;
    }
    clear.onclick = () => { if (locked) return; chosen.length = 0; chips.forEach(c => { c.disabled = false; }); msg.textContent = ''; draw(); };
    check.onclick = () => {
      const guess = chosen.map(k => mixed[k]);
      if (guess.join('|') === tokens.join('|')) { ctx.score(true); finish(true); return; }
      tries++;
      if (tries < 2) {
        msg.textContent = 'Casi… revisa el orden. ¡Te queda 1 intento!';
        ans.classList.add('shake');
        setTimeout(() => ans.classList.remove('shake'), 500);
      } else { ctx.score(false); finish(false); }
    };
    function finish(ok) {
      locked = true;
      draw();
      clear.disabled = true;
      msg.textContent = '';
      const correct = isLines ? tokens.map((t, k) => `${k + 1}. ${esc(t)}`).join('<br>') : esc(tokens.join(' '));
      const listen = isLines
        ? h('button', { class: 'say-btn', type: 'button', onclick: () => Speech.dialogue(tokens.map((t, k) => [k % 2 ? 'B' : 'A', t])) }, '🔊 Escuchar')
        : sayBtn(tokens.join(' '), '🔊 Escuchar');
      fb.append(feedback(ok, (ok ? '' : 'El orden correcto es:<br>') + `<b>${correct}</b>` + (it.es ? `<br><span class="muted">🇪🇸 ${esc(it.es)}</span>` : ''), next, listen));
      if (ok && !isLines) Speech.speak(tokens.join(' '));
    }
    draw();
    root.append(progress(i, items.length));
    if (it.title) root.append(h('div', { class: 'card' }, h('div', { class: 'question', html: it.title })));
    if (it.es && !isLines) root.append(esToggle(it.es, '🇪🇸 Pista: ¿qué tengo que decir?'));
    root.append(ans, pool, h('div', { class: 'row' }, clear, check), msg, fb);
  };
  const next = () => { Speech.stop(); i++; if (i < items.length) render(); else ctx.finish(); };
  render();
};

/* ============================================================
   TYPE — "Escribe": escribir una respuesta (o dictado con say).
   item: { prompt (html), answer: 'x' | ['x','y'], say?, explain? }
   ============================================================ */
GAMES.type = (root, def, ctx) => {
  const items = sample(def.pool, def.count);
  let i = 0;
  const render = () => {
    const it = items[i];
    const answers = [].concat(it.answer);
    let tries = 0;
    let locked = false;
    root.innerHTML = '';
    const card = h('div', { class: 'card q-card' });
    let lb = null;
    if (it.say) { lb = listenBox(it); card.append(lb.el); }
    if (it.prompt) card.append(h('div', { class: 'question', html: it.prompt }));
    const input = h('input', {
      class: 'type-input', type: 'text', autocomplete: 'off', autocapitalize: 'none',
      autocorrect: 'off', spellcheck: 'false', placeholder: def.placeholder || 'Escribe aquí…'
    });
    const check = h('button', { class: 'btn primary', type: 'button' }, '✔ Comprobar');
    const msg = h('div', { class: 'msg' });
    const fb = h('div', { class: 'fb-slot' });
    const doCheck = () => {
      if (locked || !input.value.trim()) return;
      const ok = answers.some(a => norm(a) === norm(input.value));
      if (ok) { ctx.score(true); finish(true); return; }
      tries++;
      if (tries < 2) {
        msg.textContent = 'Casi… revisa las letras. ¡Te queda 1 intento!';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
      } else { ctx.score(false); finish(false); }
    };
    function finish(ok) {
      locked = true;
      input.disabled = true;
      check.disabled = true;
      input.classList.add(ok ? 'right' : 'wrong');
      msg.textContent = '';
      let html = ok ? `<b>${esc(answers[0])}</b> ✔` : `Se escribe: <b>${esc(answers[0])}</b>`;
      if (it.explain) html += '<br>💡 ' + it.explain;
      fb.append(feedback(ok, html, next, sayBtn(answers[0], '🔊 Escuchar')));
    }
    check.onclick = doCheck;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') doCheck(); });
    root.append(progress(i, items.length), card, h('div', { class: 'type-row' }, input, check), msg, fb);
    if (lb && def.autoplay !== false) lb.play();
    setTimeout(() => input.focus({ preventScroll: true }), 100);
  };
  const next = () => { Speech.stop(); i++; if (i < items.length) render(); else ctx.finish(); };
  render();
};

/* ============================================================
   CLASSIFY — "Cada uno a su posición": clasificar en grupos.
   def.buckets: [{id, label, emoji}], def.items: [{text, b, explain?}]
   ============================================================ */
GAMES.classify = (root, def, ctx) => {
  const items = sample(def.items, def.count);
  let i = 0;
  const render = () => {
    const it = items[i];
    let answered = false;
    root.innerHTML = '';
    const fb = h('div', { class: 'fb-slot' });
    const card = h('div', { class: 'card center classify-card' },
      h('div', { class: 'classify-word' }, it.text),
      sayBtn(it.say || it.text, '🔊 Escuchar'));
    const grid = h('div', { class: 'buckets' });
    const btns = def.buckets.map(bk => {
      const b = h('button', { class: 'bucket', type: 'button' }, h('span', { class: 'emo' }, bk.emoji), h('span', {}, bk.label));
      b.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = bk.id === it.b;
        btns.forEach((x, k) => { x.disabled = true; if (def.buckets[k].id === it.b) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        ctx.score(ok);
        if (ok && !it.explain) {
          fb.append(h('div', { class: 'quick-ok' }, pick(OK_MSGS)));
          setTimeout(next, 900);
        } else {
          const right = def.buckets.find(x => x.id === it.b);
          let html = ok ? '' : `<b>${esc(it.text)}</b> va en: <b>${right.emoji} ${esc(right.label)}</b>`;
          if (it.explain) html += (html ? '<br>' : '') + '💡 ' + it.explain;
          fb.append(feedback(ok, html, next));
        }
      };
      grid.append(b);
      return b;
    });
    root.append(progress(i, items.length), card, grid, fb);
    if (def.autoSay) Speech.speak(it.say || it.text);
  };
  const next = () => { i++; if (i < items.length) render(); else ctx.finish(); };
  render();
};

/* ============================================================
   READING — texto con ayudas + preguntas.
   def.text: [[frase, frase], [frase…]]  (párrafos de frases)
   def.es:   [traducción del párrafo 1, …]
   def.questions: [{ q, qes?, options, answer?, hint: [[p, s]], explain?, keep? }]
   ============================================================ */
GAMES.reading = (root, def, ctx) => {
  root.innerHTML = '';
  const questions = def.questions;
  const sentences = []; // {el, text, id}
  // El diccionario solo tiene sentido en lecturas en inglés
  const useGloss = def.glossary !== false && Speech.lang.startsWith('en');
  const glossBar = h('div', { class: 'gloss-bar' + (useGloss ? '' : ' hidden') }, '👆 Toca cualquier palabra para ver qué significa');
  const textBox = h('div', { class: 'reading-text' });
  if (def.heading) textBox.append(h('h3', { class: 'reading-title' }, def.heading));

  def.text.forEach((para, pi) => {
    const p = h('p', { class: 'para' });
    para.forEach((s, si) => {
      const span = h('span', { class: 'sent', 'data-id': `${pi}-${si}` });
      s.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { span.append(tok); return; }
        const m = tok.match(/^([^A-Za-z0-9€']*)(.*?)([^A-Za-z0-9€']*)$/);
        const [, pre, core, post] = m || ['', '', tok, ''];
        if (pre) span.append(pre);
        if (core) {
          const w = h('span', { class: 'w' }, core);
          w.onclick = () => {
            textBox.querySelectorAll('.w.tapped').forEach(x => x.classList.remove('tapped'));
            w.classList.add('tapped');
            Speech.speak(core);
            if (!useGloss) return;
            const g = gloss(core);
            const isName = !g && /^[A-Z]/.test(core);
            glossBar.innerHTML = '';
            glossBar.append(h('b', {}, core), ' → ', g || (isName ? 'nombre propio' : '(no está en el diccionario)'), ' ', sayBtn(core));
          };
          span.append(w);
        }
        if (post) span.append(post);
      });
      p.append(span, ' ');
      sentences.push({ el: span, text: s, id: `${pi}-${si}` });
    });
    textBox.append(p);
    if (def.es && def.es[pi]) textBox.append(h('p', { class: 'para-es hidden' }, '🇪🇸 ' + def.es[pi]));
  });

  // Barra de herramientas
  const readBtn = h('button', { class: 'tool', type: 'button' }, '🔊 Leer en voz alta');
  let reading = false;
  readBtn.onclick = () => {
    if (reading) { Speech.stop(); return; }
    reading = true;
    readBtn.textContent = '⏹️ Parar';
    Speech.sequence(sentences.map(s => ({ text: s.text.replace(/^[A-Z][a-z]+: /, ''), pause: 250 })), k => {
      sentences.forEach(s => s.el.classList.remove('now'));
      if (k >= 0) { sentences[k].el.classList.add('now'); }
    }).then(() => { reading = false; readBtn.textContent = '🔊 Leer en voz alta'; sentences.forEach(s => s.el.classList.remove('now')); });
  };
  const esBtn = h('button', { class: 'tool', type: 'button' }, '🇪🇸 Traducción');
  esBtn.onclick = () => {
    const on = esBtn.classList.toggle('on');
    textBox.querySelectorAll('.para-es').forEach(x => x.classList.toggle('hidden', !on));
  };
  const tools = h('div', { class: 'tools' }, readBtn, slowToggle(), def.es ? esBtn : null);
  const textCard = h('div', { class: 'card reading-card' }, tools, textBox, glossBar);
  const qArea = h('div', { class: 'reading-q' });
  root.append(h('div', { class: 'reading-layout' }, textCard, qArea));

  const clearMarks = () => sentences.forEach(s => s.el.classList.remove('hint', 'evidence'));
  const mark = (ids, cls) => {
    let first = null;
    (ids || []).forEach(([p, s]) => {
      const found = sentences.find(x => x.id === `${p}-${s}`);
      if (found) { found.el.classList.add(cls); first = first || found.el; }
    });
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  let i = 0;
  const renderQ = () => {
    const it = questions[i];
    let answered = false;
    clearMarks();
    qArea.innerHTML = '';
    const answer = it.answer ?? it.options[0];
    const opts = (def.keepOrder || it.keep) ? it.options : shuffle(it.options);
    const fb = h('div', { class: 'fb-slot' });
    const hintBtn = h('button', { class: 'es-btn', type: 'button' }, '💡 Pista: ¿dónde está la respuesta?');
    hintBtn.onclick = () => { mark(it.hint, 'hint'); hintBtn.classList.add('on'); };
    const grid = h('div', { class: 'options' });
    const btns = opts.map(o => {
      const b = h('button', { class: 'opt', type: 'button', html: o });
      b._val = o;
      b.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = o === answer;
        btns.forEach(x => { x.disabled = true; if (x._val === answer) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        ctx.score(ok);
        clearMarks();
        mark(it.hint, 'evidence');
        let msg = ok ? '' : `La respuesta correcta es: <b>${answer}</b>`;
        msg += (msg ? '<br>' : '') + '👀 La respuesta está en la frase marcada en verde.';
        if (it.explain) msg += '<br>💡 ' + it.explain;
        fb.append(feedback(ok, msg, nextQ));
      };
      grid.append(b);
      return b;
    });
    qArea.append(
      progress(i, questions.length),
      h('div', { class: 'card q-card' },
        h('div', { class: 'question', html: it.q }),
        it.qes ? esToggle(it.qes) : null,
        it.hint ? hintBtn : null),
      grid, fb);
  };
  const nextQ = () => {
    Speech.stop();
    i++;
    if (i < questions.length) { renderQ(); qArea.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else { clearMarks(); ctx.finish(); }
  };
  renderQ();
};

/* ============================================================
   CLOZE — texto con huecos (como el Checkpoint del libro).
   def.texts: [{ title?, text: 'bla {0} bla {1}', gaps: [{options, answer?, explain?}] }]
   ============================================================ */
GAMES.cloze = (root, def, ctx) => {
  const T = pick(def.texts);
  root.innerHTML = '';
  const parts = T.text.split(/\{(\d+)\}/);
  const textEl = h('div', { class: 'cloze-text' });
  const gapEls = [];
  parts.forEach((p, k) => {
    if (k % 2 === 0) textEl.append(p);
    else {
      const g = h('span', { class: 'gap' }, `(${+p + 1}) ______`);
      gapEls[+p] = g;
      textEl.append(g);
    }
  });
  const qArea = h('div', {});
  root.append(h('div', { class: 'card' }, T.title ? h('h3', { class: 'reading-title' }, T.title) : null, textEl), qArea);
  let i = 0;
  const render = () => {
    const gap = T.gaps[i];
    const answer = gap.answer ?? gap.options[0];
    let answered = false;
    gapEls.forEach(g => g.classList.remove('current'));
    gapEls[i].classList.add('current');
    qArea.innerHTML = '';
    const fb = h('div', { class: 'fb-slot' });
    const grid = h('div', { class: 'options grid' });
    const btns = shuffle(gap.options).map(o => {
      const b = h('button', { class: 'opt', type: 'button' }, o);
      b._val = o;
      b.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = o === answer;
        btns.forEach(x => { x.disabled = true; if (x._val === answer) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        ctx.score(ok);
        gapEls[i].textContent = answer;
        gapEls[i].classList.remove('current');
        gapEls[i].classList.add(ok ? 'filled-ok' : 'filled-ko');
        let msg = ok ? '' : `La palabra correcta es: <b>${esc(answer)}</b>`;
        if (gap.explain) msg += (msg ? '<br>' : '') + '💡 ' + gap.explain;
        fb.append(feedback(ok, msg, next));
      };
      grid.append(b);
      return b;
    });
    qArea.append(progress(i, T.gaps.length), h('div', { class: 'question small' }, `Elige la palabra para el hueco (${i + 1}):`), grid, fb);
    gapEls[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const next = () => {
    i++;
    if (i < T.gaps.length) { render(); return; }
    qArea.innerHTML = '';
    const full = parts.map((p, k) => (k % 2 ? (T.gaps[+p].answer ?? T.gaps[+p].options[0]) : p)).join('');
    qArea.append(h('div', { class: 'card center' },
      h('h3', {}, '¡Texto completo! 🎉'),
      h('div', { class: 'row' },
        sayBtn(full, '🔊 Escuchar el texto entero'),
        h('button', { class: 'btn primary big', type: 'button', onclick: () => { Speech.stop(); ctx.finish(); } }, 'Siguiente ➜'))));
  };
  render();
};
