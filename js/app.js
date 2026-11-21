'use strict';
/* ============================================================
   Pantallas y navegación
   #/                      inicio (asignaturas)
   #/s/<asignatura>        unidades de una asignatura
   #/u/<asig>-<unidad>     una unidad (charla + jornadas)
   #/u/<key>/charla        charla técnica (explicación)
   #/u/<key>/day/<n|free>  jugar una jornada
   #/album                 álbum de cromos
   ============================================================ */
const app = document.getElementById('app');
const RIVAL = 'GRAMMAR UTD';

Store.load();
Speech.init();

const unitKey = u => `${u.subject}-${u.id}`;
const findUnit = key => UNITS.find(u => unitKey(u) === key);
const unitsOf = sid => UNITS.filter(u => u.subject === sid).sort((a, b) => a.number - b.number);
const dayId = (u, n) => `${unitKey(u)}-d${n}`;

function stars(n, max = 3) {
  return h('span', { class: 'stars' }, Array.from({ length: max }, (_, k) => h('span', { class: k < n ? 'on' : '' }, '★')));
}

function unitStats(u) {
  let done = 0, st = 0;
  u.days.forEach((_, k) => { const d = Store.day(dayId(u, k + 1)); if (d) { done++; st += d.stars; } });
  return { done, stars: st, total: u.days.length };
}

/* ---------- Barra superior ---------- */
function topBar(opts = {}) {
  const lv = levelFor(Store.data.goals);
  return h('header', { class: 'topbar' },
    opts.back ? h('a', { class: 'back', href: opts.back }, '‹') : h('div', { class: 'logo' }, '⚽'),
    h('div', { class: 'topbar-title' }, opts.title || 'Leo Academy'),
    h('a', { class: 'pill', href: '#/album', title: 'Mis cromos' }, `🃏 ${Store.data.cards.length}`),
    h('div', { class: 'pill gold', title: 'Goles totales' }, `⚽ ${Store.data.goals}`),
    h('div', { class: 'pill', title: 'Nivel' }, `${lv.emoji}`));
}

function page(opts, ...content) {
  app.innerHTML = '';
  app.append(topBar(opts), h('main', { class: 'page' }, ...content));
  window.scrollTo(0, 0);
}

/* ---------- Inicio ---------- */
function Home() {
  const lv = levelFor(Store.data.goals);
  const levelCard = h('div', { class: 'card level-card' },
    h('div', { class: 'level-emoji' }, lv.emoji),
    h('div', { class: 'level-info' },
      h('div', { class: 'muted' }, 'Tu nivel'),
      h('div', { class: 'level-name' }, lv.name),
      h('div', { class: 'bar' }, h('span', { style: `width:${Math.round(lv.pct * 100)}%` })),
      h('div', { class: 'muted small' }, lv.next ? `${Store.data.goals} goles · ${lv.next.min - Store.data.goals} para llegar a ${lv.next.emoji} ${lv.next.name}` : '¡Has llegado a lo más alto! 🐐')),
    h('a', { class: 'btn', href: '#/album' }, `🃏 Mis cromos (${Store.data.cards.length}/${CARDS.length})`));

  const grid = h('div', { class: 'subject-grid' });
  SUBJECTS.forEach(s => {
    const us = unitsOf(s.id);
    const soon = !us.length;
    const done = us.reduce((a, u) => a + unitStats(u).done, 0);
    const total = us.reduce((a, u) => a + u.days.length, 0);
    grid.append(h(soon ? 'div' : 'a', { class: 'subject-card' + (soon ? ' soon' : ''), href: soon ? null : `#/s/${s.id}`, style: `--c:${s.color || '#004d98'}` },
      h('div', { class: 'subject-emoji' }, s.emoji),
      h('div', { class: 'subject-name' }, s.name),
      h('div', { class: 'muted small' }, soon ? 'Próximamente 🔒' : `${us.length} ${us.length === 1 ? 'unidad' : 'unidades'} · ${done}/${total} jornadas`)));
  });

  page({},
    h('div', { class: 'hero' },
      h('h1', {}, '⚽ Leo Academy'),
      h('p', {}, 'Entrena como un crack')),
    levelCard,
    h('h2', { class: 'section-title' }, 'Asignaturas'),
    grid);
}

/* ---------- Asignatura ---------- */
function Subject(sid) {
  const s = SUBJECTS.find(x => x.id === sid);
  if (!s) return Home();
  const list = h('div', { class: 'unit-list' });
  unitsOf(sid).forEach(u => {
    const st = unitStats(u);
    list.append(h('a', { class: 'card unit-card', href: `#/u/${unitKey(u)}` },
      h('div', { class: 'unit-num' }, u.number),
      h('div', { class: 'unit-info' },
        h('div', { class: 'unit-title' }, `${u.emoji || ''} ${u.title}`),
        u.titleEs ? h('div', { class: 'muted' }, u.titleEs) : null,
        u.summary ? h('div', { class: 'small' }, u.summary) : null,
        h('div', { class: 'small' }, `Jornadas: ${st.done}/${st.total} `, stars(Math.round(st.stars / Math.max(1, st.total)))))));
  });
  page({ back: '#/', title: `${s.emoji} ${s.name}` },
    s.book ? h('p', { class: 'muted center' }, `📘 ${s.book}`) : null,
    list);
}

/* ---------- Unidad ---------- */
function Unit(u) {
  const s = subjectOf(u);
  Speech.setLang(s.lang);
  const grid = h('div', { class: 'day-grid' });
  u.days.forEach((d, k) => {
    const rec = Store.day(dayId(u, k + 1));
    grid.append(h('a', { class: 'day-tile' + (d.final ? ' final' : '') + (rec ? ' played' : ''), href: `#/u/${unitKey(u)}/day/${k + 1}` },
      h('div', { class: 'day-kicker' }, d.final ? '🏆 FINAL' : `JORNADA ${k + 1}`),
      h('div', { class: 'tile-emoji' }, d.emoji || '⚽'),
      h('div', { class: 'day-name' }, d.name),
      rec ? stars(rec.stars) : h('span', { class: 'play' }, '▶')));
  });
  grid.append(h('a', { class: 'day-tile free', href: `#/u/${unitKey(u)}/day/free` },
    h('div', { class: 'day-kicker' }, 'ENTRENO LIBRE'),
    h('div', { class: 'tile-emoji' }, '⚡'),
    h('div', { class: 'day-name' }, 'Partido sorpresa'),
    h('span', { class: 'play' }, '▶')));

  page({ back: `#/s/${u.subject}`, title: `${s.emoji} Unit ${u.number}` },
    h('div', { class: 'hero small-hero' },
      h('h1', {}, `${u.emoji || ''} ${u.title}`),
      u.charla && u.charla.length ? h('a', { class: 'btn ghost', href: `#/u/${unitKey(u)}/charla` }, '📋 Ver todo el tema') : null),
    grid);
}

/* ---------- Charla técnica ---------- */
function charlaContent(u, ids) {
  const wrap = h('div', { class: 'charla' });
  const sections = ids ? u.charla.filter(c => ids.includes(c.id)) : u.charla;
  if (!ids && sections.length > 2) {
    wrap.append(h('div', { class: 'card toc' }, h('b', {}, 'Índice: '),
      sections.map(c => h('button', { class: 'chip', type: 'button', onclick: () => document.getElementById('ch-' + c.id).scrollIntoView({ behavior: 'smooth' }) }, `${c.emoji} ${c.title}`))));
  }
  sections.forEach(c => {
    const card = h('section', { class: 'card charla-card', id: 'ch-' + c.id },
      h('h2', {}, `${c.emoji || '📋'} ${c.title}`),
      h('div', { class: 'charla-body', html: c.html }));
    card.querySelectorAll('say').forEach(el => {
      const text = el.textContent;
      const b = h('button', { class: 'say', type: 'button' }, h('span', { class: 'say-ico' }, '🔊'), text);
      b.onclick = () => Speech.speak(text);
      el.replaceWith(b);
    });
    wrap.append(card);
  });
  return wrap;
}
function Charla(u) {
  Speech.setLang(subjectOf(u).lang);
  page({ back: `#/u/${unitKey(u)}`, title: '📋 La charla del míster' },
    h('div', { class: 'row center' }, slowToggle()),
    charlaContent(u),
    h('a', { class: 'btn primary big block', href: `#/u/${unitKey(u)}` }, '¡Entendido! A jugar ⚽'));
}
function openCharlaModal(u, ids) {
  const close = () => { Speech.stop(); overlay.remove(); };
  const overlay = h('div', { class: 'modal' },
    h('div', { class: 'modal-box' },
      h('div', { class: 'modal-head' }, h('b', {}, '📋 La charla del míster'), h('button', { class: 'btn', type: 'button', onclick: close }, '✖ Cerrar')),
      h('div', { class: 'modal-body' }, charlaContent(u, ids))));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.body.append(overlay);
}

/* ---------- Mini-explicación antes de cada juego ----------
   teach: [{ t: 'etiqueta (html)', ex?: ['ejemplo en inglés', …], html?: 'extra', es?: 'traducción' }] */
function teachBlock(rows) {
  return h('div', { class: 'teach' },
    h('div', { class: 'teach-title' }, '🧠 Lo que vas a practicar'),
    rows.map(r => h('div', { class: 'teach-row' },
      h('div', { class: 'teach-label', html: r.t }),
      h('div', { class: 'teach-ex' },
        (r.ex || []).map(x => h('button', { class: 'say', type: 'button', onclick: () => Speech.speak(x.replace(/→/g, ',')) }, h('span', { class: 'say-ico' }, '🔊'), x)),
        r.html ? h('span', { class: 'teach-html', html: r.html }) : null,
        r.es ? h('span', { class: 'muted small teach-es' }, r.es) : null))));
}

/* ---------- Jugar una jornada ---------- */
function makeFreeDay(u) {
  const seen = new Set();
  const games = shuffle(u.days.flatMap(d => d.games))
    .filter(g => { const k = g.type + g.title; if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, 5);
  return { name: 'Partido sorpresa', emoji: '⚡', free: true, desc: 'Juegos al azar de toda la unidad.', games };
}

function Day(u, n) {
  const s = subjectOf(u);
  Speech.setLang(s.lang);
  const isFree = n === 'free';
  const day = isFree ? makeFreeDay(u) : u.days[+n - 1];
  if (!day) return Unit(u);
  const state = { home: 0, away: 0, gi: 0 };

  const homeEl = h('span', { class: 'score-n' }, '0');
  const awayEl = h('span', { class: 'score-n' }, '0');
  const gameLabel = h('div', { class: 'game-label' }, '');
  const board = h('div', { class: 'scoreboard' },
    h('span', { class: 'team home' }, 'BARÇA'), homeEl, h('span', { class: 'sep' }, '-'), awayEl, h('span', { class: 'team away' }, RIVAL));
  const area = h('div', { class: 'game-area' });

  const quit = () => {
    if (state.home + state.away === 0 || confirm('¿Seguro que quieres salir? Se perderá este partido.')) {
      Speech.stop();
      location.hash = `#/u/${unitKey(u)}`;
    }
  };
  app.innerHTML = '';
  app.append(
    h('header', { class: 'topbar play-bar' },
      h('button', { class: 'back', type: 'button', onclick: quit }, '✖'),
      board,
      day.charla || !isFree ? h('button', { class: 'pill', type: 'button', onclick: () => openCharlaModal(u, isFree ? null : day.charla) }, '📋') : null),
    gameLabel,
    h('main', { class: 'page' }, area));

  const bump = el => { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); };
  const ctx = {
    score(ok) {
      if (ok) { state.home++; homeEl.textContent = state.home; bump(homeEl); }
      else { state.away++; awayEl.textContent = state.away; bump(awayEl); }
    },
    finish() { state.gi++; if (state.gi < day.games.length) gameIntro(); else endDay(); }
  };

  function dayIntro() {
    gameLabel.textContent = '';
    area.innerHTML = '';
    area.append(h('div', { class: 'card center intro-card' },
      h('div', { class: 'day-kicker' }, isFree ? 'ENTRENO LIBRE' : day.final ? '🏆 LA FINAL' : `JORNADA ${n}`),
      h('div', { class: 'big-emoji' }, day.emoji || '⚽'),
      h('h2', {}, day.name),
      h('div', { class: 'lineup-row' }, day.games.map(g => h('span', { class: 'lineup-ball', title: g.title }, g.emoji))),
      h('p', { class: 'muted' }, `${day.games.length} juegos · ¡cada acierto es un gol!`),
      h('button', { class: 'btn primary big', type: 'button', onclick: gameIntro }, '¡Empieza el partido! ⚽')));
  }

  function gameIntro() {
    const g = day.games[state.gi];
    gameLabel.textContent = `Juego ${state.gi + 1} de ${day.games.length}`;
    area.innerHTML = '';
    area.append(h('div', { class: 'card center intro-card' },
      h('div', { class: 'game-head' }, h('span', { class: 'game-emoji' }, g.emoji), h('h2', {}, g.title)),
      g.teach ? teachBlock(g.teach) : null,
      g.intro ? h('p', { class: 'how' }, '🎮 ', g.intro) : null,
      h('button', { class: 'btn primary big', type: 'button', onclick: start }, '¡Vamos! ▶')));
    window.scrollTo(0, 0);
    function start() {
      area.innerHTML = '';
      window.scrollTo(0, 0);
      const engine = GAMES[g.type];
      if (!engine) { area.append(h('p', {}, `Juego desconocido: ${g.type}`)); return; }
      engine(area, g, ctx);
    }
  }

  function endDay() {
    Speech.stop();
    gameLabel.textContent = '';
    const total = state.home + state.away;
    const pct = total ? state.home / total : 0;
    const st = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
    Store.data.goals += state.home;
    let card = null;
    if (isFree) {
      if (st === 3) card = awardCard();
    } else {
      const id = dayId(u, n);
      const prev = Store.day(id);
      const rec = prev || { stars: 0, best: 0, played: 0 };
      if (!prev) card = awardCard();                       // primer partido de la jornada → cromo
      else if (st === 3 && rec.stars < 3) card = awardCard(); // primeras 3 estrellas → otro cromo
      rec.played++;
      rec.stars = Math.max(rec.stars, st);
      rec.best = Math.max(rec.best, Math.round(pct * 100));
      Store.data.days[id] = rec;
    }
    Store.save();

    const result = state.home > state.away ? ['🏆', '¡VICTORIA!', '¡Has ganado al ' + RIVAL + '!']
      : state.home === state.away ? ['🤝', '¡EMPATE!', 'Muy cerca… ¡la próxima la ganas!']
        : ['💪', '¡A ENTRENAR!', 'Hoy ha costado. Repasa la charla y juega la revancha.'];
    area.innerHTML = '';
    const box = h('div', { class: 'card center end-card' },
      h('div', { class: 'big-emoji' }, '📣'),
      h('div', { class: 'day-kicker' }, '¡FINAL DEL PARTIDO!'),
      h('div', { class: 'final-score' }, h('span', {}, 'BARÇA'), h('b', {}, `${state.home} - ${state.away}`), h('span', {}, RIVAL)),
      h('h2', {}, `${result[0]} ${result[1]}`),
      h('p', {}, result[2]),
      stars(st),
      h('p', { class: 'muted' }, `Aciertos: ${Math.round(pct * 100)}% · +${state.home} goles para tu nivel`));
    if (card) {
      box.append(h('div', { class: 'new-card' }, h('div', { class: 'day-kicker' }, '🎁 ¡CROMO NUEVO!'), cardEl(card)));
    } else if (!isFree && st < 3) {
      box.append(h('p', { class: 'small' }, '⭐ Consigue 3 estrellas (90% de aciertos) para ganar otro cromo.'));
    }
    box.append(h('div', { class: 'row' },
      h('a', { class: 'btn', href: `#/u/${unitKey(u)}` }, '🏠 Volver a la unidad'),
      h('button', { class: 'btn primary', type: 'button', onclick: () => { route(); } }, '🔁 Jugar otra vez')));
    area.append(box);
    window.scrollTo(0, 0);
  }

  dayIntro();
}

/* ---------- Álbum ---------- */
function Album() {
  const have = new Set(Store.data.cards);
  page({ back: '#/', title: '🃏 Álbum de cromos' },
    h('p', { class: 'center' }, `Tienes ${have.size} de ${CARDS.length} cromos. Ganas uno al jugar cada jornada por primera vez y otro al conseguir 3 estrellas.`),
    h('div', { class: 'album' }, CARDS.map(c => cardEl(c, !have.has(c.id)))));
}

/* ---------- Router ---------- */
function route() {
  Speech.stop();
  document.querySelectorAll('.modal').forEach(m => m.remove());
  const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
  if (!parts.length) return Home();
  if (parts[0] === 'album') return Album();
  if (parts[0] === 's') return Subject(parts[1]);
  if (parts[0] === 'u') {
    const u = findUnit(parts[1]);
    if (!u) return Home();
    if (parts[2] === 'charla') return Charla(u);
    if (parts[2] === 'day') return Day(u, parts[3]);
    return Unit(u);
  }
  return Home();
}
window.addEventListener('hashchange', route);
route();
