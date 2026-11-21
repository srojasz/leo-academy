'use strict';
/* ============================================================
   Núcleo: utilidades, voz (listening), progreso y cromos
   ============================================================ */

/* Asignaturas → unidades. Cada unidad declara a qué asignatura pertenece (unit.subject). */
window.SUBJECTS = [];
window.UNITS = [];
function registerSubject(subject) { window.SUBJECTS.push(subject); }
function registerUnit(unit) { window.UNITS.push(unit); }
function subjectOf(unit) { return window.SUBJECTS.find(s => s.id === unit.subject) || {}; }

/* ---------- Utilidades DOM ---------- */
function h(tag, props, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'style') el.style.cssText = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function sample(arr, n) { return shuffle(arr).slice(0, n == null ? arr.length : n); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function stripTags(s) { return String(s).replace(/<[^>]+>/g, ''); }
/* Normaliza respuestas escritas: minúsculas, sin puntuación, apóstrofos rectos */
function norm(s) {
  return String(s).toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.!?¿¡,;:"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ---------- Voz (Web Speech API) ---------- */
const NOVELTY_VOICES = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Ralph|Kathy|Grandma|Grandpa|Eddy|Flo|Reed|Rocko|Sandy|Shelley/i;
const PREFERRED_VOICES = [
  'Google UK English Female', 'Google UK English Male', 'Daniel', 'Serena', 'Kate', 'Arthur', 'Martha', 'Oliver', 'Stephanie', 'Samantha', 'Karen', 'Moira', 'Tessa',
  'Mónica', 'Monica', 'Jorge', 'Marisol', 'Google español'
];

const Speech = {
  supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  slow: false,
  lang: 'en-GB',   // idioma de la asignatura actual (en-GB para inglés, es-ES para lengua, mates…)
  voices: [],
  token: 0,
  _keep: null,

  setLang(lang) {
    this.lang = lang || 'en-GB';
    this._load && this._load();
  },

  init() {
    if (!this.supported) return;
    const load = () => {
      const base = this.lang.slice(0, 2).toLowerCase();
      const region = this.lang.slice(3).toUpperCase();
      const list = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith(base) && !NOVELTY_VOICES.test(v.name));
      const score = v => {
        let s = 0;
        const i = PREFERRED_VOICES.findIndex(n => v.name.includes(n));
        if (i >= 0) s += 100 - i;
        if (region && v.lang.toUpperCase().endsWith(region)) s += 50;
        if (/enhanced|premium|mejorad/i.test(v.name)) s += 20;
        return s;
      };
      this.voices = list.sort((a, b) => score(b) - score(a));
    };
    this._load = load;
    load();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', load);
    else speechSynthesis.onvoiceschanged = load;
    // iPad/iPhone: la voz solo se "desbloquea" dentro de un toque del usuario
    const unlock = () => {
      try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) { /* nada */ }
    };
    document.addEventListener('pointerdown', unlock, { once: true });
  },

  stop() {
    this.token++;
    if (this.supported) speechSynthesis.cancel();
  },

  /* parts: [{text, voice, pitch}] ; onPart(i) se llama al empezar cada parte (-1 al acabar) */
  sequence(parts, onPart) {
    if (!this.supported) {
      toast('Este navegador no puede leer en voz alta 😕');
      return Promise.resolve(false);
    }
    const busy = speechSynthesis.speaking || speechSynthesis.pending;
    this.stop();
    const my = this.token;
    return new Promise(resolve => {
      let k = 0;
      const next = () => {
        if (my !== this.token) { onPart && onPart(-1); return resolve(false); }
        if (k >= parts.length) { onPart && onPart(-1); return resolve(true); }
        const idx = k++;
        const p = parts[idx];
        const u = new SpeechSynthesisUtterance(p.text);
        const v = this.voices.length ? this.voices[(p.voice || 0) % this.voices.length] : null;
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = this.lang;
        u.rate = this.slow ? 0.62 : (this.lang.startsWith('en') ? 0.88 : 1);
        u.pitch = p.pitch || 1;
        this._keep = u; // evita que Safari lo borre antes de terminar
        let finished = false;
        const fin = () => { if (finished) return; finished = true; setTimeout(next, p.pause ?? 350); };
        u.onend = fin;
        u.onerror = fin;
        onPart && onPart(idx);
        speechSynthesis.speak(u);
      };
      if (busy) setTimeout(next, 120); else next();
    });
  },

  speak(text) { return this.sequence([{ text }]); },

  /* lines: [['Hannah', 'Hello!'], ['Danny', 'Hi!']] → una voz distinta por persona */
  dialogue(lines, onPart) {
    const map = {};
    let n = 0;
    return this.sequence(lines.map(([who, text]) => {
      if (!(who in map)) map[who] = n++;
      const i = map[who];
      return { text, voice: i, pitch: i % 2 ? 0.85 : 1.1 };
    }), onPart);
  }
};

/* ---------- Progreso (se guarda en el propio dispositivo) ---------- */
const Store = {
  key: 'leo-academy-v1',
  data: null,
  load() {
    try { this.data = JSON.parse(localStorage.getItem(this.key)); } catch (e) { this.data = null; }
    if (!this.data || typeof this.data !== 'object') this.data = {};
    this.data.goals = this.data.goals || 0;
    this.data.days = this.data.days || {};
    this.data.cards = this.data.cards || [];
    return this.data;
  },
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) { /* modo privado: no pasa nada */ }
  },
  day(id) { return this.data.days[id] || null; }
};

/* ---------- Niveles ---------- */
const LEVELS = [
  { min: 0, name: 'Benjamín', emoji: '🐣' },
  { min: 40, name: 'Alevín', emoji: '⚽' },
  { min: 100, name: 'Infantil', emoji: '👟' },
  { min: 180, name: 'La Masia', emoji: '🏠' },
  { min: 300, name: 'Barça Atlètic', emoji: '🔵' },
  { min: 450, name: 'Primer equipo', emoji: '🔴' },
  { min: 650, name: 'Capitán', emoji: '©️' },
  { min: 900, name: 'Leyenda', emoji: '🐐' }
];
function levelFor(goals) {
  let idx = 0;
  LEVELS.forEach((l, i) => { if (goals >= l.min) idx = i; });
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;
  const pct = next ? (goals - cur.min) / (next.min - cur.min) : 1;
  return { ...cur, idx, next, pct };
}

/* ---------- Cromos ---------- */
const CARDS = [
  { id: 'lamine', name: 'Lamine Yamal', pos: 'Extremo', emoji: '⚡' },
  { id: 'pedri', name: 'Pedri', pos: 'Centrocampista', emoji: '🎩' },
  { id: 'gavi', name: 'Gavi', pos: 'Centrocampista', emoji: '🔥' },
  { id: 'raphinha', name: 'Raphinha', pos: 'Extremo', emoji: '🚀' },
  { id: 'cubarsi', name: 'Pau Cubarsí', pos: 'Defensa', emoji: '🧱' },
  { id: 'fermin', name: 'Fermín López', pos: 'Centrocampista', emoji: '💥' },
  { id: 'olmo', name: 'Dani Olmo', pos: 'Mediapunta', emoji: '🎯' },
  { id: 'dejong', name: 'Frenkie de Jong', pos: 'Centrocampista', emoji: '🧭' },
  { id: 'araujo', name: 'Ronald Araujo', pos: 'Defensa', emoji: '🛡️' },
  { id: 'kounde', name: 'Jules Koundé', pos: 'Defensa', emoji: '💨' },
  { id: 'balde', name: 'Alejandro Balde', pos: 'Lateral', emoji: '🏃' },
  { id: 'casado', name: 'Marc Casadó', pos: 'Centrocampista', emoji: '⚙️' },
  { id: 'joangarcia', name: 'Joan García', pos: 'Portero', emoji: '🧤' },
  { id: 'terstegen', name: 'Ter Stegen', pos: 'Portero', emoji: '🧤' },
  { id: 'lewandowski', name: 'Lewandowski', pos: 'Delantero', emoji: '🏹' },
  { id: 'ferran', name: 'Ferran Torres', pos: 'Delantero', emoji: '🦈' },
  { id: 'messi', name: 'Leo Messi', pos: 'Leyenda', emoji: '🐐', legend: true },
  { id: 'xavi', name: 'Xavi', pos: 'Leyenda', emoji: '🧠', legend: true },
  { id: 'iniesta', name: 'Iniesta', pos: 'Leyenda', emoji: '✨', legend: true },
  { id: 'puyol', name: 'Puyol', pos: 'Leyenda', emoji: '🦁', legend: true },
  { id: 'busquets', name: 'Busquets', pos: 'Leyenda', emoji: '🐙', legend: true },
  { id: 'ronaldinho', name: 'Ronaldinho', pos: 'Leyenda', emoji: '😁', legend: true },
  { id: 'cruyff', name: 'Johan Cruyff', pos: 'Leyenda', emoji: '🌷', legend: true },
  { id: 'valdes', name: 'Víctor Valdés', pos: 'Leyenda', emoji: '🧤', legend: true },
  { id: 'etoo', name: "Samuel Eto'o", pos: 'Leyenda', emoji: '🐆', legend: true }
];
function awardCard() {
  const have = new Set(Store.data.cards);
  const left = CARDS.filter(c => !have.has(c.id));
  if (!left.length) return null;
  const normal = left.filter(c => !c.legend);
  // Las leyendas son más difíciles de conseguir
  const pool = normal.length && Math.random() < 0.75 ? normal : left;
  const card = pick(pool);
  Store.data.cards.push(card.id);
  Store.save();
  return card;
}
function cardEl(c, locked) {
  if (locked) return h('div', { class: 'cromo locked' }, h('div', { class: 'cromo-emoji' }, '❓'), h('div', { class: 'cromo-name' }, '???'));
  return h('div', { class: 'cromo' + (c.legend ? ' legend' : '') },
    h('div', { class: 'cromo-top' }, c.legend ? '★ LEYENDA ★' : 'BLAUGRANA'),
    h('div', { class: 'cromo-emoji' }, c.emoji),
    h('div', { class: 'cromo-name' }, c.name),
    h('div', { class: 'cromo-pos' }, c.pos));
}

/* ---------- Avisos ---------- */
function toast(msg) {
  const t = h('div', { class: 'toast' }, msg);
  document.body.append(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2500);
}
