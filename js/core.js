/* Fortune's Weave · wiki2 core: data, helpers, context, router, page registry. Vanilla JS, no deps. */
'use strict';
const W = window.WIKI;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* ---------------- storage (prefix fe2.) ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('fe2.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('fe2.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
};

/* ---------------- language (fe2.lang 'es'|'en'; default from the browser) ----------------
   Wiki-authored text: t('Hay {n} misiones', {n}) — the Spanish text is the key; English comes from window.I18N_EN.ui
   (ext/i18n_en.data.js, loaded only in English).
   Game text is never translated by hand: nm(entity) / tx(entity, 'desc') pick the game's English (`en`, `desc_en` fields,
   else the game's own Spanish→English table I18N_EN.game); gt(spanish game text) for loose strings. */
const LANGS = ['es', 'en'];
const langDefault = () => (/^es\b/i.test((typeof navigator !== 'undefined' && navigator.language) || 'es') ? 'es' : 'en');
let LANG = (v => (LANGS.includes(v) ? v : langDefault()))(store.get('lang', null));
const isEn = () => LANG === 'en';
const EN_DICT = () => window.I18N_EN || {};
const fill = (s, v) => (v ? String(s).replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m)) : s);
/** wiki-authored text in the reader's language; {name} slots filled from v (after translating, so the English keeps them) */
function t(s, v) {
  if (LANG !== 'en' || s == null || s === '') return fill(s, v);
  const r = EN_DICT().ui?.[s];  // never the game table: one Spanish word can be two English ones (Equipo: Team, Equipment)
  if (r == null) window.I18N_MISS?.add(s);  // translation checks collect untranslated keys here
  return fill(r ?? s, v);
}
/** a Spanish game text → the game's English text (same text when the game table has no entry) */
const gt = s => { if (LANG !== 'en' || !s) return s; const g = EN_DICT().game || {}; return g[s] ?? g[String(s).replace(/\s+/g, ' ').trim()] ?? s; };
/** data prose that may be wiki text or game text: the wiki dictionary first (t), else the game table (gt) */
/** a label that is a dictionary key, or text already in the reader's language (counts, names): used by chips() and statTable() */
const tl = s => (LANG === 'en' && EN_DICT().ui?.[s] == null ? s : t(s));
const dataTx = s => (s && LANG === 'en' && EN_DICT().ui?.[s] == null ? gt(s) : t(s));
/** an entity's name in the reader's language: x.en / x.es (a string is read as Spanish game text) */
const nm = x => (x == null ? '' : typeof x === 'string' ? gt(x) : LANG === 'en' ? (x.en || gt(x.es) || '') : (x.es ?? x.en ?? ''));
/** a paired field: tx(skill, 'desc') → desc_en | desc_es; tx(tip, 'text') → text_en | text (game text, through gt) */
const tx = (x, f) => (!x ? '' : LANG === 'en' ? (x[f + '_en'] || gt(x[f + '_es'] ?? x[f]) || '') : (x[f + '_es'] ?? x[f] ?? ''));
/** dates: es «23 nov 2026», en «Nov 23, 2026» (m 1–12) */
const MONTHS = { es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };
const dateTx = (y, m, d) => (LANG === 'en' ? `${MONTHS.en[m - 1]} ${d}${y ? ', ' + y : ''}` : `${d} ${MONTHS.es[m - 1]}${y ? ' ' + y : ''}`);
/** things built once from names (link index, search index) register a reset here; setLang() runs them */
const LANG_RESET = [];
/** switch language: stored, <html lang>, caches reset, English files loaded once (then render() again); no reload */
function setLang(l) {
  if (!LANGS.includes(l)) return;
  LANG = l; store.set('lang', l);
  if (typeof document !== 'undefined' && document.documentElement) document.documentElement.lang = l;
  LANG_RESET.forEach(f => f());
  if (l === 'en' && !window.I18N_EN && typeof document?.head?.appendChild === 'function') {
    let left = (window.WIKI_EN || []).length;
    (window.WIKI_EN || []).forEach(src => { const s = document.createElement('script'); s.src = src;
      s.onload = s.onerror = () => { if (--left === 0) { LANG_RESET.forEach(f => f()); render(true); } }; document.head.appendChild(s); });
    if (left) return;
  }
  if (typeof render === 'function') render(true);
}

/* ---------------- names and links ---------------- */
const CHARS = W.chars || {}, ITEMS = W.items || {}, CLASSES = (W.classes || {}).classes || {}, MOUNTS = (W.classes || {}).mounts || {},
  SPOTS = (W.map || {}).spots || {}, SKILLS = W.skills || {};
const QUEST = Object.fromEntries(((W.chapters || {}).quests || []).map(q => [q.id, q]));
const PARA = Object.fromEntries(((W.chapters || {}).paralogues || []).map(p => [p.id, p]));
const NAME = new Map();
const addName = (n, v) => { if (n) { const k = norm(n); if (!NAME.has(k)) NAME.set(k, v); } };
// both languages' names: nl() links a name in either
for (const f of ['es', 'en']) {
  Object.values(CHARS).forEach(c => addName(c[f], ['personaje', c.id]));
  Object.entries(SPOTS).forEach(([k, s]) => addName(s[f], ['lugar', k]));
  Object.entries(CLASSES).forEach(([k, c]) => addName(c[f], ['clase', k]));
  Object.entries(MOUNTS).forEach(([k, c]) => addName(c[f], ['montura', k]));
  Object.values(QUEST).forEach(q => addName(q[f], ['mision', q.id]));
  Object.values(PARA).forEach(p => addName(p[f], ['desvio', p.id]));
  Object.entries(ITEMS).forEach(([k, i]) => addName(i[f], ['objeto', k]));
}
const href = (kind, id) => `#/${kind}/${encodeURIComponent(id)}`;
const ENT = { personaje: id => CHARS[id], objeto: id => ITEMS[id], clase: id => CLASSES[id], montura: id => MOUNTS[id],
  lugar: id => SPOTS[id], mision: id => QUEST[id], desvio: id => PARA[id], habilidad: id => SKILLS[id] };
const LBL = Object.fromEntries(Object.entries(ENT).map(([k, f]) => [k, id => { const x = f(id); return x?.es ? nm(x) : undefined; }]));
function L(kind, id, label) {
  const known = LBL[kind] && LBL[kind](id), x = ENT[kind]?.(id);
  // a label that is the entity's Spanish name (most callers pass x.es) shows in the reader's language; other labels as Spanish game text
  const lb = label == null ? known : x && label === x.es ? known : gt(label);
  // mounts carry their type icon wherever they are linked (items and faces are added by each caller)
  return known ? `${kind === 'montura' ? img(ico().mount?.[id], 'ico') : ''}<a href="${href(kind, id)}">${esc(lb)}</a>` : esc(lb ?? id);
}
/** link a Spanish display name when it matches a known entity ("Dante (第三部)" → Dante) */
function nl(name) {
  if (name == null) return '';
  const s = String(name), hit = NAME.get(norm(s)) || NAME.get(norm(s.replace(/\s*\(.*\)\s*$/, '')));
  const qty = !hit && s.match(/^(.+?) ×(\d+)$/);  // «Yelmo dorado ×1»: the name links, the count stays
  if (qty && NAME.get(norm(qty[1]))) return `${nl(qty[1])} ×${qty[2]}`;
  const x = hit && ENT[hit[0]]?.(hit[1]), lb = x?.es || x?.en ? nm(x) : dataTx(s);  // the entity's name in the reader's language
  return hit ? `<a href="${href(hit[0], hit[1])}">${esc(lb)}</a>` : esc(lb);
}

/* entity names left as plain text in authored prose (guides, page copy, tables) → a link the first time each appears on a page.
   Skills, items, classes, mounts, quests, Desvíos and battalions; a name two different pages share, a generic word or one under 6
   letters stays plain, and so does text inside a link, heading, button, summary, table header, label, option or code */
// i18n-ignore-next: Spanish entity names the auto-linker leaves alone (not shown)
const AUTO_STOP = new Set(['Batallón', 'Búsqueda', 'Guanteletes', 'Espadas', 'Control', 'Barrera', 'Refuerzos', 'Soldado', 'Caballo', 'Ignición',
  'Constitución', 'Comprensión', 'Silencio', 'Derribar', 'Bloqueo', 'Antorcha', 'Transportar', 'Elizabeth', 'Sin clase', 'Rescatar', 'Recuperar',
  'Restaurar', 'Regenerar', 'Fortalecer', 'Antídoto', 'Talismán', 'Brebaje', 'Martillo', 'Tridente', 'Catapulta', 'Balista', 'Confusión', 'Inmovilidad',
  'Parálisis', 'Entumecimiento', 'Plegaria', 'Guardaespaldas', 'Crescendo', 'Puntería', 'Arquero', 'Guerrero', 'Cazador', 'Tirador',
  'Hachas', 'Lanzas', 'Arcos', 'Tanque', 'Asedio', 'Asalto', 'Precisión', 'Lluvia', 'Miasma', 'Bailar', 'Ornius', 'Pegaso']);
let AUTO = null;
LANG_RESET.push(() => { AUTO = null; });
/** names in the reader's language (nm), so English prose links English names */
function autoIndex() {
  const by = new Map(), add = (n, h, es = n) => { if (!n || n.length < 6 || AUTO_STOP.has(es) || NAME.has(norm(n)) && !['clase', 'montura', 'objeto', 'mision', 'desvio'].includes(NAME.get(norm(n))[0])) return;
    const x = by.get(n);
    if (x === undefined) by.set(n, h);
    else if (x && x.split('/')[1] !== h.split('/')[1]) by.set(n, null);  // two kinds of page: ambiguous
    else if (x && h.length < x.length) by.set(n, h); };  // same kind: the plain id over scene copies (SID_SC00_05_…)
  Object.entries(CLASSES).forEach(([k, c]) => add(c.es && nm(c), href('clase', k), c.es));
  Object.entries(MOUNTS).forEach(([k, c]) => add(c.es && nm(c), href('montura', k), c.es));
  Object.values(QUEST).forEach(q => add(q.es && nm(q), href('mision', q.id), q.es));
  Object.values(PARA).forEach(q => add(q.es && nm(q), href('desvio', q.id), q.es));
  ((window.WIKI_EXT || {}).guerra?.battalions || []).forEach(b => add(b.es && nm(b), href('batallon', b.id), b.es));
  Object.entries(SKILLS).forEach(([k, c]) => add(c.es && nm(c), href('habilidad', k), c.es));
  Object.entries(ITEMS).forEach(([k, c]) => add(c.es && nm(c), href('objeto', k), c.es));
  const names = [...by].filter(([, h]) => h).map(([n]) => n).sort((a, b) => b.length - a.length);
  const rx = names.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${names.map(n => esc(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\p{N}+])`, 'gu') : null;
  return { by, rx };
}
/** html → the same html with the first plain mention of each known name linked; `self` (the page's own address) is never linked */
function autoLink(html, self = '') {
  AUTO ??= autoIndex();
  if (!AUTO.rx) return html;
  const seen = new Set([...String(html).matchAll(/href="([^"]*)"/g)].map(m => m[1]).concat(self));  // already linked on the page: leave it
  let skip = 0;
  return String(html).replace(/(<[^>]*>)|([^<]+)/g, (m, tag, text) => {
    if (tag) {
      const t = /^<(\/?)(a|h[1-6]|button|summary|th|option|code|script|style|textarea|select|label|abbr|caption|svg)\b/i.exec(tag);
      if (t && !/\/>$/.test(tag)) skip = Math.max(0, skip + (t[1] ? -1 : 1));
      return tag;
    }
    if (skip) return text;
    return text.replace(AUTO.rx, n => { const h = AUTO.by.get(n.replace(/&amp;/g, '&')); if (!h || seen.has(h)) return n; seen.add(h); return `<a href="${h}">${n}</a>`; });
  });
}

/* ---------------- small UI blocks (arguments are HTML, caller escapes) ---------------- */
const card = (title, html, id) => `<section class="card"${id ? ` id="${id}"` : ''}><h3>${esc(title)}</h3>${html}</section>`;
/** authored text, all plain: a string (paragraph), {kv: [[k, v]]} or {head: [...], rows: [[...]]} */
const docHtml = (...bs) => bs.map(b => (typeof b === 'string' ? `<p>${esc(b)}</p>` : b.kv ? kvRows(b.kv.map(([k, v]) => [k, esc(v)]))
  : `<div class="tw"><table><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr>${b.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`)).join('');
const kvRows = rows => rows.filter(r => r && r[1] != null && r[1] !== '').map(([k, v]) => `<div class="kv"><span>${esc(k)}</span><b>${v}</b></div>`).join('');
const ico = () => (window.WIKI_EXT || {}).iconos || {};
const img = (src, cls) => (src ? `<img class="${cls}" src="${esc(src)}" alt="" loading="lazy">` : '');
const list = xs => xs.filter(Boolean).join(', ');
const num = n => { const [i, d] = String(n).split('.'), en = LANG === 'en'; return i.replace(/\B(?=(\d{3})+$)/g, en ? ',' : '.') + (d ? (en ? '.' : ',') + d : ''); };  // 8.000, 1.234,5 (es-ES toLocaleString skips 4-digit grouping); English 8,000, 1,234.5
const gold = n => `${num(n)} G`;
const pct = n => (LANG === 'en' ? `${n}%` : `${String(n).replace('.', ',')} %`);
const ul = items => (items.length ? `<ul class="fi-list">${items.join('')}</ul>` : '');
const li = (main, sub, cls) => `<li${cls ? ` class="${cls}"` : ''}><b>${main}</b>${sub ? `<small>${sub}</small>` : ''}</li>`;
/* research notes carry their sources inline; factOnly() keeps the fact and drops the attribution ('' when nothing factual is left) */
const SRC_NAMES = String.raw`KeenGamer|allthings\.how|Anna'?s Notebook|annasnotebook|Serenes(?: Forest)?|Game8|GameWith|IGN|fortunesweave(?:\.co\.uk|\.online)?|Fextralife|RPG Site|Pocket Tactics|techbloat|Faerghast|Jay Dunna|CujoeTV|LinkKing7|LagSpike776|Varsona|Mobalytics|YouTube`;
const SRC_PAREN = new RegExp(String.raw`\b(web|datos|medid[oa]|disputad\w*|sin comprobar|fuentes?|inferido|lectura|fragmento|GLID|https?)\b|\.bin\b|Anna\b|${SRC_NAMES}`, 'i');
function factOnly(s) {
  let t = String(s ?? '');
  for (let i = 0; i < 2; i++) t = t.replace(/\s*\([^()]*\)/g, m => (SRC_PAREN.test(m) ? '' : m));  // nested parentheses: two passes
  t = t.replace(/\[conflicto[^\]]*\]/gi, '').replace(/\b(?:web:\s*)?https?:\/\/\S+/g, '').replace(/\bweb:\s*\S+/g, '')
    .replace(new RegExp(String.raw`\b(?:${SRC_NAMES})\b\s*[:·]?\s*`, 'g'), '')
    .replace(/,?\s*\bsegún [^,.;)]*/gi, '').replace(/\s+en (?:los )?datos\b/gi, '').replace(/\b(?:medid[oa]s?|disputad[oa]s?|sin comprobar)\b/gi, '')
    .replace(/,?\s*\b(?:LSN|SQID|SSID|PID|IID|JID|SID|GLID)_[^\s,;)]*/g, '')
    .replace(/[^;.]*\.bin\b[^;.]*[;.]?\s*/g, '')
    .replace(/\(\s*\)/g, '').replace(/\s+([,;.:)])/g, '$1').replace(/([,;:])(?=\s*[,;.]|\s*$)/g, '').replace(/\s{2,}/g, ' ')
    .trim().replace(/^[,;:·.\s]+/, '');
  t = t.replace(/(?<!\b(?:Jin|alt|cap|caps|Nv|aprox|p\. ej))(\.\s+)([a-záéíóúñ])/g, (m, p, c) => p + c.toUpperCase());
  return /[a-záéíóúñ]{3}/i.test(t) ? t.charAt(0).toUpperCase() + t.slice(1) : '';
}
const sentence = s => (s ? s.replace(/\.?$/, '.') : '');
/** the one «not found» page: unknown addresses (shell.js) and unknown ids inside a page */
const notFound = () => `<h1>${t('Página no encontrada')}</h1><p class="mut">${t('Esta dirección no existe en la wiki.')}</p><p><a href="#/">${t('Ir a la portada')}</a> · <button type="button" class="txtbtn" data-pal>${t('Buscar')}</button></p>`;
/** «1 personaje», «1.294 objetos»: the count with the noun in singular or plural (the Spanish nouns are t() keys) */
const plural = (n, one, many = one + 's') => `${num(n)} ${t(n === 1 ? one : many)}`;
/** a listing's result count; shell.js announces it (#live) when a filter re-renders the same page */
const resultCount = (n, one, many, tail = '') => `<p class="mut" data-count>${plural(n, one, many)}${tail}</p>`;
/** full recruit requirement: items (with icon), gold, support, Prestigio */
const recruitCost = c => list([
  ...c.items.map(i => `${img(ico().item?.[i.id], 'ico')}${i.n > 1 ? i.n + '× ' : ''}${L('objeto', i.id, i.es)}`),
  c.gold ? gold(c.gold) : '', t('Apoyo {n}', { n: c.support }), t('Prestigio {n}', { n: c.renown })]);
/** a stat's short name as the game shows it: Spanish PV/Fue…, English HP/Str… (the keys) */
const statName = k => (LANG === 'en' ? k : STAT_ES[k]);
const STAT_ES = { HP: 'PV', Str: 'Fue', Mag: 'Mag', Dex: 'Hab', Spd: 'Vel', Lck: 'Sue', Def: 'Def', Res: 'Res', Cha: 'Car', Mov: 'Mov' };
/** what each stat is (the stat table headers' tooltip): full name, then one sentence from the combat formulas (pages/mecanicas.js) */
const STAT_DESC = { HP: 'Puntos de vida. Si llegan a 0, la unidad cae.', Str: 'Fuerza. Suma al daño de las armas físicas y da la Con (Fue ÷ 5), que aligera el peso del arma.',
  Mag: 'Magia. Suma al daño de los hechizos.', Dex: 'Habilidad. Sube el golpe y, con la Suerte, el crítico.',
  Spd: 'Velocidad. Es la esquiva y decide el ataque doble (4 o más de ventaja).', Lck: 'Suerte. Evita los críticos y, con la Habilidad, sube el crítico y el golpe mágico.',
  Def: 'Defensa. Resta al daño físico.', Res: 'Resistencia. Resta al daño mágico.', Cha: 'Carisma. Sube la precisión de las tácticas de batallón.',
  Mov: 'Movimiento. Casillas que recorre en un turno.' };
let statN = 0;
/** a stat header: the short name as <abbr> (focusable) described by a tooltip that only sighted users need to see (CSS shows it on hover and focus) */
const statAbbr = k => { const id = `st-${++statN}-${k}`;
  return `<abbr class="st-ab" tabindex="0" aria-describedby="${id}">${statName(k)}</abbr><span class="st-tip" role="tooltip" id="${id}" aria-hidden="true">${esc(t(STAT_DESC[k]))}</span>`; };
/** the game's white mask icons (img/ui/), tinted by CSS: stats in stat tables, page tabs on ficha tabs; decorative, the label is always written */
const STAT_ICON = { HP: 'HP', Str: 'Strength', Mag: 'Magic', Dex: 'Technique', Spd: 'Speed', Lck: 'Luck', Def: 'Defense', Res: 'MagicDefense', Cha: 'Charm' };
const TAB_ICON = { equipo: 'Unit', builds: 'Sword', build: 'Sword', apoyos: 'Reliance', regalos: 'Present', objetos: 'Equipment' };
const gi = f => `<img class="gi" src="img/ui/${f}.png" alt="" width="18" height="18">`;
/** stat rows (objects keyed HP/Str/…) as a horizontally scrollable table; rows that are null are skipped */
/** stat rows (labels: Spanish dictionary keys, or text already in the reader's language) */
function statTable(objs, labels) {
  const keys = Object.keys(STAT_ES).filter(k => objs.some(o => o && o[k] != null));
  if (!keys.length) return '';
  return `<div class="tw"><table><tr><th><span class="sr-only">${t('Valor')}</span></th>${keys.map(k => `<th>${STAT_ICON[k] ? gi('IconBasicStatus_' + STAT_ICON[k]) : ''}${statAbbr(k)}</th>`).join('')}</tr>${objs.map((o, i) => (o ?
    `<tr><th>${esc(tl(labels[i]))}</th>${keys.map(k => `<td>${o[k] ?? ''}</td>`).join('')}</tr>` : '')).join('')}</table></div>`;
}
/** the last tab opened on each page (ficha kinds share one: every character ficha opens on the same tab) */
const tabRemember = (page, id) => store.set('tabs', { ...(store.get('tabs', {}) || {}), [page]: id });
/** ficha: header, then ARIA tabs (one section visible; buttons, never hash links) over sections [[id, title, html]]; empty sections are dropped.
    Open tab: ?sec=<id>, else ?ir=fi-<id> (old deep links), else the last one opened on this page, else the first. shell.js switches them. */
/** sections [id, title, html]: titles are dictionary keys or text already in the reader's language (a title with a count) */
function ficha(head, sections) {
  const s = sections.filter(x => x && x[2]);
  if (s.length < 2) return head + s.map(([id, ti, h]) => `<section class="card fi-sec" id="fi-${id}"><h3>${esc(tl(ti))}</h3>${h}</section>`).join('');
  const { sec, qs } = parseHash(location.hash), ids = s.map(x => x[0]);
  const al = x => (ids.includes(x) ? x : TAB_ALIAS[x]);  // tabs merged into another keep their old addresses and stored choice
  const on = [qs.sec, String(qs.ir || '').replace(/^fi-/, ''), (store.get('tabs', {}) || {})[ROUTES[sec] ?? sec]].map(al).find(x => ids.includes(x)) || ids[0];
  return head + `<div class="tabs fi-tabs" role="tablist" aria-label="${t('Apartados')}">${s.map(([id, ti]) =>
    `<button type="button" role="tab" id="tab-${id}" aria-controls="fi-${id}" aria-selected="${id === on}" tabindex="${id === on ? 0 : -1}">${TAB_ICON[id] ? gi('IconPageTab_' + TAB_ICON[id]) : ''}${esc(tl(ti))}</button>`).join('')}</div>` +
    s.map(([id, ti, h]) => `<section class="card fi-sec" id="fi-${id}" role="tabpanel" aria-labelledby="tab-${id}"${id === on ? '' : ' hidden'}><h3 class="sr-only">${esc(tl(ti))}</h3>${h}</section>`).join('');
}
/** ficha header: image, breadcrumb link, title, subtitle, key facts */
const fichaHead = (pic, crumb, title, sub, facts = '') => `<div class="fi-head">${pic}<div class="fi-t"><p class="fi-eye">${crumb}</p><h1>${esc(title)}</h1>` +
  `${sub ? `<p class="fi-sub">${esc(sub)}</p>` : ''}</div></div>${facts ? `<div class="card fi-facts">${facts}</div>` : ''}`;

/* ---------------- on-demand texts ---------------- */
const EXT_TX = {};
/** the file behind an on-demand module: in English its <name>_en twin (same shape, the game's English text) when the build made one */
const extName = name => (LANG === 'en' && (W.meta?.textos_en || []).includes(name) ? name + '_en' : name);
/** an on-demand ext module (ext/<name>.data.js): its data, or null while it loads (the page re-renders when it arrives; 3 tries) */
function extText(name) {
  if (W.sinTextos) return null;  // a build without the script and dialogue texts
  const X = window.WIKI_EXT || (window.WIKI_EXT = {});
  name = extName(name);
  if (X[name]) return X[name];
  const st = EXT_TX[name] || (EXT_TX[name] = {});
  if (st.loading || st.err || typeof document.head?.appendChild !== 'function') return null;
  st.loading = true;
  const s = document.createElement('script');
  s.src = `ext/${name}.data.js`;  // the service worker caches it under this address
  s.onload = () => render(true);
  s.onerror = () => { s.remove(); st.loading = false; st.tries = (st.tries || 0) + 1; if (st.tries >= 3) st.err = true; setTimeout(() => render(true), 400 * st.tries); };
  document.head.appendChild(s);
  return null;
}
const extWait = name => `<p class="mut">${t(W.sinTextos ? 'Los diálogos y textos de la historia no se incluyen en esta wiki.' : EXT_TX[extName(name)]?.err ? 'No se pudo cargar el texto.' : 'Cargando textos…')}</p>`;
/** the usual fan-site notice (portada and Ajustes) */
const LEGAL = () => t('Wiki hecha por fans, sin relación con Nintendo. Fire Emblem y Fire Emblem: Fortune\'s Weave son marcas de Nintendo; los nombres, imágenes y textos del juego pertenecen a sus propietarios.');

/* ---------------- topic guides in the reader's language ---------------- */
/** a topic guide (W.guias) as the reader sees it: in English its English version (W.guias_en, same id, same topic) or, while there
    is none, the Spanish one marked `_es` (pages say «not translated yet») */
const guiaL = g => { if (!g || LANG !== 'en') return g; const e = (W.guias_en || []).find(x => x.id === g.id); return e ? { ...e, tema: g.tema } : { ...g, _es: true }; };
/** the 7 topics [[slug, name]] in the reader's language */
const temasL = () => (LANG === 'en' && W.temas_en) || W.temas || [];

/* ---------------- chapters and context ---------------- */
const CAPS = W.capitulos || {};
const ROUTE_IDS = ['cai', 'dietrich', 'theodora', 'leda'];
const DEFAULT_KEY = 'cai-1-1';
const ROUTE_NAME = { cai: 'Cai', dietrich: 'Dietrich', theodora: 'Theodora', leda: 'Leda' };
/** route lords plus the other lords, by the short ids the script and archive files use */
const LORD_ALL = { ...ROUTE_NAME, bertrand: 'Bertrand', anatolia: 'Anatolia', talimun: 'Talimun', orchel: 'Orchel' };
const capHash = key => { const c = CAPS[key]; return `#/cap/${c.route}/${c.part}/${c.n}`; };
const capShort = c => (c.part === 0 ? t('Prólogo {n}', { n: c.n }) : t('Cap. {p}-{n}', { p: c.part, n: c.n }));
/** key of chapter n of part `part` for `route`, clamped to the nearest valid one; unknown route → cai */
function chapterFromPath(route, part, n) {
  const r = ROUTE_IDS.includes(route) ? route : 'cai';
  const pn = Math.round(Number(part)), p = Number.isNaN(pn) ? 1 : Math.min(3, Math.max(0, pn));
  const prefix = p === 1 ? r : 'comun';
  let max = 0;
  while (CAPS[`${prefix}-${p}-${max + 1}`]) max++;
  if (!max) return DEFAULT_KEY;
  return `${prefix}-${p}-${Math.min(max, Math.max(1, Math.round(Number(n)) || 1))}`;
}
/** prev/next keys of a chapter; the two route splits (comun-0-3 → route, route → comun-2-1) use the context route */
function chapNav(key, route) {
  const c = CAPS[key]; if (!c) return { prev: null, next: null };
  const r = ROUTE_IDS.includes(route) ? route : null;  // no route: the split has no neighbour (never a silent Cai)
  return { prev: c.prev || (r && key === 'comun-2-1' ? `${r}-1-12` : null), next: c.next || (r && key === 'comun-0-3' ? `${r}-1-1` : null) };
}
/** {route, key, recruits, have, drop, fold}: recruits are the pids marked «quiero reclutarlo» in the team page, have the ones marked
    «ya lo tengo» (never also in recruits), drop the story joiners unticked there (any route; pages filter them by route).
    Older contexts had only `recruits`: they read as «quiero» with an empty `have`. */
const ctxPids = a => (Array.isArray(a) ? [...new Set(a.filter(p => CHARS[p]))] : []);
const ctxGet = () => {
  const v = store.get('ctx', null), have = ctxPids(v?.have), recruits = ctxPids(v?.recruits).filter(p => !have.includes(p)), drop = ctxPids(v?.drop), fold = typeof v?.fold === 'boolean' ? v.fold : null;
  const rerun = v?.rerun === true;  // «nueva vuelta» (older contexts: first run)
  return v && ROUTE_IDS.includes(v.route) && CAPS[v.key] ? { route: v.route, key: v.key, recruits, have, drop, fold, rerun } : { route: 'cai', key: DEFAULT_KEY, recruits, have, drop, fold, rerun };
};
/** has the player picked a route and chapter (the header says «Elegir ruta» until then; pages still use the default above) */
const ctxChosen = () => { const v = store.get('ctx', null); return !!(v && ROUTE_IDS.includes(v.route) && CAPS[v.key]); };
/** the chosen route and chapter, '' while nothing is picked: pages that show route facts use these, never ctxGet()'s Cai default */
const ctxRoute = () => (ctxChosen() ? ctxGet().route : '');
const ctxKey = () => (ctxChosen() ? ctxGet().key : '');
const ctxSet = (route, key) => store.set('ctx', { ...ctxGet(), route, key });
const ctxSetRecruits = (pids, drop = ctxGet().drop, have = ctxGet().have) => {
  const h = [...new Set(have)];
  store.set('ctx', { ...ctxGet(), recruits: [...new Set(pids)].filter(p => !h.includes(p)), have: h, drop: [...new Set(drop)] });
};
/** team page selector folded (true), unfolded (false) or never touched (null) */
const ctxSetFold = fold => store.set('ctx', { ...ctxGet(), fold });
/** first run (false) or «nueva vuelta» (true) */
const ctxSetRerun = rerun => store.set('ctx', { ...ctxGet(), rerun: !!rerun });
/** story joiners unticked for `route` */
const ctxDrop = (route = ctxGet().route) => ctxGet().drop.filter(p => CHARS[p]?.routes?.[route]?.join_key);
const ctxRec = p => (route) => p.filter(x => CHARS[x]?.routes?.[route]?.recruit_key);
/** recruits of the target team on `route`, «quiero» and «tengo» (those not recruitable there are kept in storage but ignored) */
const ctxRecruits = (route = ctxGet().route) => { const c = ctxGet(); return ctxRec([...c.recruits, ...c.have])(route); };
/** only the «quiero reclutarlo» recruits on `route`: gifts, meals and the week plan are for them */
const ctxWant = (route = ctxGet().route) => ctxRec(ctxGet().recruits)(route);
/** only the «ya lo tengo» recruits on `route` */
const ctxHave = (route = ctxGet().route) => ctxRec(ctxGet().have)(route);
/* ---------------- reachability: the single rule every page uses ---------------- */
/** can the party reach map place `spot` on `route` at chapter `key`? Only Cai's Part 1 has closed places (cai_p1_access: path search
    plus the regions and bau zones the sources close); every other route and part reaches everything. → {ok, renown, gates, reveal}
    `reveal`: how the place is discovered on a first run (reach a place, get a map, talk to a local); a «nueva vuelta» starts with the
    map revealed, so it is empty then. Closed places stay closed on a rerun: border forts and Prestigio do not change. */
function spotAccess(spot, route = ctxGet().route, key = ctxGet().key, rerun = ctxGet().rerun) {
  const s = SPOTS[spot], reveal = rerun || !s ? [] : (s.revealed_by || []).map(r => r.how === 'llegar a' ? r.spot_es && t('llegar a {p}', { p: gt(r.spot_es) }) : r.how === 'obtener el mapa' ? r.item?.es && t('conseguir el {i}', { i: gt(r.item.es) }) : r.how === 'hablar con un lugareño' ? r.where_es && t('hablar con un lugareño de {p}', { p: gt(r.where_es) }) : '').filter(Boolean);  // i18n-ignore (r.how: data values)  // unnamed waypoints (中スポット…) are left out
  const a = s?.cai_p1_access;
  if (!spot || route !== 'cai' || CAPS[key]?.part !== 1 || !a) return { ok: true, renown: 0, gates: [], reveal };
  return { ok: !!a.reachable, renown: Math.max(0, ...(a.via_checkpoints || []).map(v => v.renown_rank || 0)), gates: (a.via_checkpoints || []).map(v => v.es), reveal };
}
/** the map place of a shop id, or of a Vandahl merchant (by the place that lists it) */
const shopSpot = id => { id = String(id || ''); if (SPOTS[id]) return id;
  return Object.keys(SPOTS).filter(k => id.startsWith(k + '_')).sort((a, b) => b.length - a.length)[0] || Object.keys(SPOTS).find(k => (SPOTS[k].vandahl || []).includes(id)) || null; };
/** a wandering merchant's home town (map place id): the merchant counts as a source when that town is reachable. The town is not in
    the merchant data and its name is only part of the place id (マオン城郭, オレンスの町), so the 13 are listed. Sta. Merida has no town
    on the map: its place is チェレ島, the island where it appears. */
const MERCHANT_HOME = { ブレストン商人: '王都ブレストン', メッシリーナ商人: 'メッシリーナ大農園', オレンス商人: 'オレンスの町', マオン商人: 'マオン城郭',
  カッシート商人: '領都カッシート', ダ・ミナ商人: '黒煙の谷ダ・ミナ', リベイラ商人: 'リベイラ村', モンス商人: '城塞都市モンス', パンドラ商人: 'パンドラの港町',
  メガエラ商人: '王都メガエラ', ジーマ商人: 'ジーマの港', グラン・アラゴン商人: '王都グラン・アラゴン', セント・メリーダ商人: 'チェレ島' };
/** the map place an obtain row depends on: shop or barter place, a wandering merchant's home town, a search or lure spot */
const sourceSpot = o => (o.type === 'ambulante' ? (SPOTS[MERCHANT_HOME[o.shop_id]] ? MERCHANT_HOME[o.shop_id] : null)
  : o.type === 'tienda' || o.type === 'barter' ? shopSpot(o.shop_id) : o.spot && SPOTS[o.spot] ? o.spot : null);
/** the map place a shop label names («mercader ambulante de Mons», «Grand Aragon (armería)»): the reachable-looking place whose name is the longest one inside it */
const SPOT_NAMES = Object.values(SPOTS).filter(s => s.es && s.region).sort((x, y) => y.es.length - x.es.length);
const spotOfLabel = t => SPOT_NAMES.find(s => String(t || '').includes(s.es))?.id || null;
/** a Part 1 chapter of `route` to judge Part 1 listings with: the context chapter when it is on that route in Part 1, else the first one */
const partOneKey = route => (ctxGet().route === route && CAPS[ctxGet().key]?.part === 1 ? ctxGet().key : `${route}-1-1`);
const ctxChapter = () => CAPS[ctxGet().key];
const CTX = { ctxGet, ctxSet, ctxChapter };
const routesFirst = r => [r, ...ROUTE_IDS.filter(x => x !== r)];
const chapLink = key => (CAPS[key] ? `<a href="${capHash(key)}">${esc(capShort(CAPS[key]))}</a>` : '');
/** quest id → {route: first chapter key whose news lists it}; common chapters count for every route */
const QUEST_FIRST = {};
Object.values(CAPS).sort((a, b) => a.part - b.part || a.n - b.n).forEach(c => (c.news?.quests || []).forEach(q => {
  const f = QUEST_FIRST[q.id] || (QUEST_FIRST[q.id] = {});
  (c.route === 'comun' ? ROUTE_IDS : [c.route]).forEach(r => { f[r] ??= c.key; });
}));

/** does quest `q` exist on `route`? (`routes`: the lords' routes, or 'comun' = Part 3, every route); '' = every route */
const questOnRoute = (q, route) => !route || !q.routes || q.routes.includes(route) || q.routes.includes('comun');
/** «Todas las rutas», «Cai y Leda», «Parte 3 (todas las rutas)» */
const questRoutesEs = q => (!q.routes ? '' : q.routes.includes('comun') ? t('Parte 3 (todas las rutas)') : ROUTE_IDS.every(r => q.routes.includes(r)) ? t('Todas las rutas')
  : q.routes.map(r => ROUTE_NAME[r]).join(', ').replace(/, ([^,]+)$/, ` ${t('y')} $1`));
/** the quest's window in game terms: «Parte 1, caps. 5–12», «del prólogo al cap. 12 de la Parte 1», «Parte 3, caps. 2–6» */
const questWhenEs = q => (q.part === 0 ? t('del prólogo al cap. {n} de la Parte 1', { n: q.ch_to }) : q.ch_from ? t('Parte {p}', { p: q.part ?? 1 }) + ', ' + (q.ch_from === q.ch_to ? t('cap. {n}', { n: q.ch_from }) : t('caps. {a}–{b}', { a: q.ch_from, b: q.ch_to })) : '');
/** a chapter of `route` inside the quest's window, to judge it with when no chapter lists it */
const questKey = (q, route) => (q.part === 3 ? `comun-3-${q.ch_from || 2}` : `${route}-1-${Math.max(1, q.ch_from || 1)}`);
/** is quest `qid` available on `route`? Not on routes it does not exist on; quests for a later run (nth_route ≥ 2) only on a
    «nueva vuelta»; never when one of its places is closed on that route and part (judged at the quest's first chapter on the route). '' = any route */
function questAvail(qid, route = ctxGet().route, key, rerun = ctxGet().rerun) {
  const q = QUEST[qid]; if (!q) return true;
  if (!questOnRoute(q, route) || ((q.nth_route || 1) >= 2 && !rerun)) return false;
  if (!route) return true;
  key ??= QUEST_FIRST[qid]?.[route] || (CAPS[questKey(q, route)] ? questKey(q, route) : partOneKey(route));
  return (q.where || []).every(w => spotAccess(SPOT_NAMES.find(s => s.es === w)?.id || spotOfLabel(w), route, key).ok);
}
/** routes a Desvío happens on, in route order (`routes`: the acceptance window of each) */
const paraRoutes = p => ROUTE_IDS.filter(r => p.routes?.[r]);

/* ---------------- item sources and access: one rule for Equipo, Capítulo, the item ficha and q.mjs ---------------- */
const LORDS = { cai: 'PID_カイ', dietrich: 'PID_ディートリヒ', theodora: 'PID_セオドラ', leda: 'PID_レダ' };
/** the game's roster order */
const bySerial = (a, b) => (CHARS[a].serial ?? 1e4) - (CHARS[b].serial ?? 1e4) || a.localeCompare(b);
const chapOrder = key => (CAPS[key] ? CAPS[key].part * 100 + CAPS[key].n : 1e4);
/** chapters of `route` in play order: prologue, its Part 1, Parts 2 and 3 */
const routeChapters = route => chapterGroups(ROUTE_IDS.includes(route) ? route : 'cai').flatMap(g => g[1]);
const chapIdx = (route, key) => routeChapters(route).findIndex(c => c.key === key);
/* class at join: a recruit not yet recruited levels up on their own along their class-by-level path (combat.autolevel_classes), so
   they join with the class of their level then; each route's chapter has a level range (CAPS[key].level), the join level is about that.
   Story joins and lords keep their data class. */
const lvPath = pid => Object.entries(CHARS[pid]?.p?.combat?.autolevel_classes || {})
  .map(([lv, es]) => [+lv, Object.keys(CLASSES).find(k => CLASSES[k].es === es) || null, es]).sort((a, b) => a[0] - b[0]);
const scoutedOn = (pid, route) => { const x = CHARS[pid]?.routes?.[route]; return !!(x?.recruit_key && !x.join_key); };
/** {lv: [min, max], classes: [[level, jid, es]…]} when `pid` is recruited on `route` in chapter `key` (default: the first it can be); null for story joins */
function joinAt(pid, route, key) {
  const x = CHARS[pid]?.routes?.[route], cap = CAPS[key || x?.recruit_key], path = lvPath(pid);
  if (!scoutedOn(pid, route) || !cap?.level || !path.length) return null;
  const at = lv => path.filter(([l]) => l <= lv).pop(), [a, b] = cap.level;
  return { lv: [a, b], cap, classes: [at(a), at(b)].filter((c, i, arr) => c && arr.findIndex(y => y?.[2] === c[2]) === i) };
}
/** chapter a recruit joins in on `route` when the player is at `key`: the first one possible, or now when they are still to recruit */
const joinKeyFor = (pid, route, key) => {
  const r = CHARS[pid]?.routes?.[route]?.recruit_key;
  return r && key && !ctxGet().have.includes(pid) && chapIdx(route, key) > chapIdx(route, r) ? key : r;
};
/** true when a game condition list can hold in chapter `c` of `route` (route, part and chapter-number conditions; flags count as reachable) */
const condOk = (cs, route, c) => routeOk(cs, route) && (cs || []).every(x => {
  let m;
  if ((m = /^(\d)部$/.exec(x))) return c.part === +m[1];
  if ((m = /^(\d)部以降$/.exec(x))) return c.part >= +m[1];
  if ((m = /^(\d+)章以降$/.exec(x))) return c.n >= +m[1];
  if ((m = /^(\d+)章以前$/.exec(x))) return c.n <= +m[1];
  if ((m = /^(\d+)章$/.exec(x))) return c.n === +m[1];
  return true;
});
/** a source is open when its conditions hold in some chapter of the current part, from the current chapter on */
function srcOpen(cs, route, key) {
  const ch = routeChapters(route), i = Math.max(0, chapIdx(route, key)), part = ch[i]?.part;
  return ch.slice(i).some(c => c.part === part && condOk(cs, route, c));
}
const ROUTE_NUM = Object.fromEntries(Object.entries(W.meta.route_codes).map(([n, es]) => [es.toLowerCase(), +n]));  // quest windows name routes by number
/** quest reward window {route, excluded_routes, start:[part,n], end:[part,n]} still reachable from `key` */
function rewardOpen(w, route, key) {
  if (!w) return true;
  const c = CAPS[key]; if (!c) return true;
  if ((w.route && w.route !== ROUTE_NUM[route]) || (w.excluded_routes || []).includes(ROUTE_NUM[route])) return false;
  const at = c.part * 100 + c.n, end = w.end ? w.end[0] * 100 + w.end[1] : 1e4;
  return at <= end && (!w.start || c.part >= w.start[0]);
}
const ROUTE_CODE = { cai: 'KAI', dietrich: 'DIT', theodora: 'SEO', leda: 'LED' };  // route codes of Part 1 dungeon conditions
/** an obtain row tied to one part (W.items `part`: Part 3 dungeon tables, gate and miasma rewards, story-map loot, one-part quests…) counts only in that part */
const partOk = (o, key) => !o.part || CAPS[key]?.part === o.part;
/* Dagsion facilities that open during the story: a shelf there sells nothing before its facility's chapter (chapter data «unlocks») */
// i18n-ignore-next (data values)
const FAC_OF = [[/^Sociedad Mercantil Vandahl/, 'Sociedad Mercantil Vandahl'], [/^Dagsion \(taberna\)/, 'Venta de regalos de la taberna'],
  [/^Dagsion \(mercado\)/, 'Mercado'], [/^Dagsion \(puesto de bebidas\)/, 'Puesto de bebidas']];
/** chapter index (on `route`) where the facility selling source `o` opens; 0 when it needs none; -1 when it never opens there */
const facIdx = (o, route) => { const f = FAC_OF.find(([re]) => re.test(o.where || ''))?.[1];
  return f ? routeChapters(route).findIndex(c => (c.unlocks || []).includes(f)) : 0; };
/** the facility of `o` is open at `key` (now) or, with `later`, from some chapter of the same part on */
const facOk = (o, route, key, later = false) => { const i = facIdx(o, route), k = chapIdx(route, key), ch = routeChapters(route);
  if (i < 0) return false;
  return i <= k || (later && ch[i]?.part === ch[k]?.part); };
/** can the party get item `iid` on `route` from chapter `key` on (to pay a barter)? Any source counts: a shop or merchant at a reachable
    place, a search, crop or dungeon at a reachable place, in the row's own part (partOk), a box that can itself be had, automatic activities, an open quest reward, enemy loot.
    A barter counts one level deep. */
function payOk(iid, route, key, depth = 1, noBox = false) {
  return (ITEMS[iid]?.obtain || []).some(o => {
    if (!partOk(o, key) || (noBox && o.type === 'sorteo')) return false;  // refining materials: a random box is not a plan
    if (o.type === 'tienda' || o.type === 'ambulante') return facOk(o, route, key, true) && (o.rows || [{ conds: o.conds || [] }]).some(w => srcOpen(w.conds, route, key)) && spotAccess(sourceSpot(o), route, key).ok;
    if (o.type === 'barter') return depth > 0 && facOk(o, route, key, true) && (o.rows || [{ conds: [] }]).some(w => srcOpen(w.conds, route, key)) && spotAccess(sourceSpot(o), route, key).ok && (o.pay || []).every(x => payOk(x.id, route, key, depth - 1));
    if (o.type === 'búsqueda') return routeOk(o.condition || [], route) && spotAccess(o.spot, route, key).ok;
    if (o.type?.startsWith('cultivo') || o.type === 'mazmorra' || o.type === 'expedición a mazmorra') {
      const codes = (o.conds || []).filter(Array.isArray).map(c => c[0]);
      // Part 1 dungeons carry a route code (KAI 1-2…); dungeons without one (Dng_200/300) and troop expeditions are left out of Part 1
      if (CAPS[key]?.part === 1 && !o.type.startsWith('cultivo') && !codes.length) return false;
      return (!codes.length || codes.includes(ROUTE_CODE[route])) && spotAccess(spotOfLabel(o.where), route, key).ok;
    }
    if (o.type === 'sorteo') { const box = /^abrir (.+)$/.exec(o.what || '')?.[1], bid = box && Object.keys(ITEMS).find(k => ITEMS[k].es === box);
      return !bid || (depth > 0 && payOk(bid, route, key, depth - 1)); }
    if (o.type === 'recompensa') return rewardOpen(o.when, route, key) && (!o.quest || questAvail(o.quest, route));
    return true;  // enemy loot, lured-animal manure…
  });
}
/** a barter whose payment cannot be had on this route and part is not a real offer */
const barterOk = (o, route, key) => o.type !== 'barter' || (o.pay || []).every(x => payOk(x.id, route, key));
const plPlace = s => (JP_ANY.test(s || '') ? t('otra ubicación') : esc(dataTx(s)));  // place names without a Spanish reading
/** where an item comes from on `route` (up to 5 sources, shop prices with the shelf's discount); with `key`, only sources still open in
    that part from that chapter on (srcOpen, partOk) */
function itemSources(iid, route, key) {
  const ok = cs => (key ? srcOpen(cs, route, key) : routeOk(cs, route));
  const out = [];
  for (const o of ITEMS[iid]?.obtain || []) {
    const open = o.rows ? o.rows.some(w => ok(w.conds)) : !key || ok(o.conds || o.condition || []);
    if (!open || (key && (!partOk(o, key) || (o.type === 'recompensa' && !rewardOpen(o.when, route, key))))) continue;
    if (key) {  // places the party cannot reach on this route/part (Cai Part 1's closed regions) are not a source, nor a barter nobody can pay
      if (!spotAccess(sourceSpot(o), route, key).ok || !barterOk(o, route, key) || !facOk(o, route, key, true)) continue;
    }
    // each shelf has its own discount: the price paid is the base price minus it (as the item ficha shows it)
    const row = o.rows?.find(w => ok(w.conds)) || o.rows?.[0] || {}, base = row.price ?? o.price ?? ITEMS[iid].price;
    const price = row.discount ? Math.round(base * (100 - row.discount) / 100) : base;
    if (o.type === 'tienda' || o.type === 'ambulante') out.push(`${plPlace(o.where)}${price ? ` · ${gold(price)}` : ''}`);
    else if (o.type === 'barter') out.push(t('Trueque en {w}', { w: plPlace(o.where) }) + (o.pay?.length ? ` ${t('por')} ${list(o.pay.map(p => `${p.n > 1 ? p.n + '× ' : ''}${L('objeto', p.id, p.es)}`))}` : ''));
    else if (o.type === 'búsqueda') out.push(`${t('Búsqueda en {w}', { w: o.spot && SPOTS[o.spot] ? L('lugar', o.spot) : plPlace(o.where) })} (${pct(o.pct)}${o.condition?.length ? ', ' + esc(conds(o.condition)) : ''})`);
    else if (o.type?.startsWith('cultivo')) out.push(`${t('Cultivo en {w}', { w: plPlace(o.where) })} (${pct(o.pct)})`);
    else if (o.type === 'recompensa' && o.quest) out.push(t('Recompensa de la misión {q}', { q: L('mision', o.quest) }));
    else if (o.type === 'sorteo' && !JP_ANY.test(o.what)) out.push(`${t('Al {w}', { w: esc(dataTx(o.what)) })} (${pct(o.pct)})`);
    if (out.length > 1 && out.indexOf(out[out.length - 1]) < out.length - 1) out.pop();  // «otra ubicación» repeated
    if (out.length === 5) break;
  }
  return out;
}

/* ---------------- game conditions and route filters ---------------- */
// i18n-ignore-next: shop kinds, shown through t() by the pages that use them
const SHOP_ES = { 武器屋: 'Armería', 道具屋: 'Bazar', 市場: 'Mercado', 鍛冶屋: 'Herrería', 資格屋: 'Licencias', 手形屋: 'Licencias', 酒場: 'Taberna', 飲み物係: 'Puesto de bebidas', アンナの店: 'Tienda de Anna' };
/** Japanese characters (kana, kanji, full-width forms): the one test for «is there Japanese left in this text» */
const JP_CH = String.raw`぀-ヿ一-鿿！-～`, JP_ANY = new RegExp(`[${JP_CH}]`);
/** drops parenthetical notes written in Japanese ("… (限定参戦)") from Spanish text */
const noJp = t => String(t ?? '').replace(new RegExp(String.raw`\s*\([^()]*[${JP_CH}][^()]*\)`, 'g'), '');
const LORD_JP = { カイ: 'Cai', ディートリヒ: 'Dietrich', セオドラ: 'Theodora', レダ: 'Leda', タリムーン: 'Talimun', オルヘル: 'Orchel', アナトリア: 'Anatolia' };
const ROUTE_OF_LORD = { カイ: 'cai', ディートリヒ: 'dietrich', セオドラ: 'theodora', レダ: 'leda' };
/** game condition ("4章以降", "!カイ篇", "1部") → Spanish */
const cond = c => String(c).replace(/^(\d+)章以降$/, (m, n) => t('desde el cap. {n}', { n })).replace(/^(\d+)章以前$/, (m, n) => t('hasta el cap. {n}', { n }))
  .replace(/^(\d)部$/, (m, n) => t('Parte {p}', { p: n }))
  .replace(/^(\d)部以降$/, (m, n) => t('desde la Parte {p}', { p: n })).replace(/^(!?)(.+)篇$/, (m, not, l) => (LORD_JP[l] ? t(not ? 'salvo ruta de {r}' : 'ruta de {r}', { r: LORD_JP[l] }) : m))
  .replace(/^(\d+)章$/, (m, n) => t('cap. {n}', { n }))
  .replace(/^(!?)進行_段階_(武器屋|道具屋)_販売増加_(\d+|最大)$/, (m, not, sh, n) => t({ '!武器屋': 'antes de la ampliación {n} de la armería', 武器屋: 'tras la ampliación {n} de la armería',
    '!道具屋': 'antes de la ampliación {n} del bazar', 道具屋: 'tras la ampliación {n} del bazar' }[not + sh], { n: n === '最大' ? t('máxima') : Number(n) }))
  .replace(/^サブクエ_(.+)_(受注中|クリア済)$/, (m, n, st) => (QUEST['SQID_' + n] ? t(st === '受注中' ? 'con la misión «{q}» en curso' : 'tras completar la misión «{q}»', { q: nm(QUEST['SQID_' + n]) })
    : t(st === '受注中' ? 'con la misión previa en curso' : 'tras completar la misión previa')))
  .replace(/^共有_兵種解放_(.+)$/, (m, j) => (CLASSES['JID_' + j] ? t('con la clase {c} desbloqueada', { c: nm(CLASSES['JID_' + j]) }) : t('con una clase desbloqueada')));
/** readable conditions; internal flags without a Spanish reading show as «condición especial» */
const conds = a => [...new Set((a || []).map(cond).map(x => (JP_ANY.test(x) ? t('condición especial') : x)))].join(' · ');
/** false when a condition list (`カイ篇`, `!カイ篇`) rules out `route` */
const routeOk = (cs, route) => (cs || []).every(c => {
  const m = String(c).match(/^(!?)(.+)篇$/);
  return !m || !ROUTE_OF_LORD[m[2]] || (ROUTE_OF_LORD[m[2]] === route) !== (m[1] === '!');
});

/* ---------------- listing filters (state in the URL) ---------------- */
/** route filter of a listing: ?r=<route> is a view only (the header selector alone sets the game), ?r=todas → '', no ?r → context route ('' in a shared chapter) */
function listRoute(qs) {
  const r = (qs || {}).r;
  if (r === 'todas') return '';
  if (!ROUTE_IDS.includes(r)) return !ctxChosen() || CAPS[ctxGet().key]?.route === 'comun' ? '' : ctxGet().route;  // no game picked: the whole library
  return r;
}
const qsHref = (path, qs, patch) => { const s = new URLSearchParams(Object.entries({ ...qs, ...patch }).filter(([, v]) => v)).toString(); return `#/${path}${s ? '?' + s : ''}`; };
/** a row of link chips setting URL param `key`; opts [[value, label]], '' clears the param */
const chips = (path, qs, key, opts, cur, label) => `<div class="chips" role="group" aria-label="${esc(t(label))}">${opts.map(([v, lb]) =>
  `<a class="chip${v === cur ? ' on' : ''}" href="${esc(qsHref(path, qs, { [key]: v }))}"${v === cur ? ' aria-current="true"' : ''}>${esc(tl(lb))}</a>`).join('')}</div>`;
const routeChips = (path, qs, r) => chips(path, qs, 'r', [['todas', 'Todas las rutas'], ...ROUTE_IDS.map(x => [x, ROUTE_NAME[x]])], r || 'todas', 'Ruta');  // chips() translates keys; route names pass as they are
const ARMAS = [['espada', 'Espada'], ['lanza', 'Lanza'], ['hacha', 'Hacha'], ['arco', 'Arco'], ['punos', 'Guanteletes'], ['magia-negra', 'Magia negra'], ['magia-blanca', 'Magia blanca']];
/** weapon name (class or item "Guanteletes", "magia blanca (bastón)") → ?arma= value */
const armaKey = s => norm(String(s || '').replace(/\s*\(.*\)$/, '')).replace('guanteletes', 'punos').replace(/ /g, '-');
const armaChips = (path, qs, cur) => chips(path, qs, 'arma', [['', 'Todas las armas'], ...ARMAS], cur, 'Arma');

/* ---------------- router ---------------- */
/** '#/sec/id?a=b' → {sec, id, qs}; never throws. id is everything after sec (decoded when possible) */
function parseHash(hash) {
  const [path, q = ''] = String(hash || '').replace(/^#\/?/, '').split('?');
  const i = path.indexOf('/'), sec = i < 0 ? path : path.slice(0, i), raw = i < 0 ? '' : path.slice(i + 1);
  let id = raw; try { id = decodeURIComponent(raw); } catch (e) { /* keep raw */ }
  return { sec, id, qs: Object.fromEntries(new URLSearchParams(q)) };
}

/* ---------------- old addresses and stored state: the only place that knows them ---------------- */
/** old addresses → their page now. Keys: '<section>' (the query is kept: #/planificador?p= feeds the team page), '<section>/<id>'
    (the positional mechanics pages #/mecanicas/hN, now sections of the page each topic belongs to) or '<section>?ir=<id>' or '<section>?t=<tab>' (a tab that became its own page) */
const MECH_OLD = { h1: 'mecanicas?ir=experiencia', h2: 'mecanicas?ir=formula-de-exp', h3: 'mecanicas?ir=niveles-y-crecimiento',
  h4: 'apoyos?ir=como-funcionan', h5: 'apoyos?ir=como-funcionan', h6: 'apoyos?ir=como-funcionan', h7: 'apoyos?ir=puntos-por-actividad', h8: 'apoyos?ir=bonos-de-combate',
  h9: 'prestigio', h10: 'prestigio?ir=rangos', h11: 'prestigio?ir=multiplicadores', h12: 'prestigio?ir=fuentes',
  h13: 'instalaciones', h14: 'instalaciones?ir=plaza-de-armas', h15: 'instalaciones?ir=comidas', h16: 'instalaciones?ir=termas', h17: 'dioses?ir=servicio-divino',
  h18: 'instalaciones?ir=teatro', h19: 'instalaciones?ir=torneo', h20: 'instalaciones?ir=adivinacion', h21: 'instalaciones?ir=percha', h22: 'instalaciones?ir=formacion',
  h23: 'instalaciones?ir=actividades-automaticas', h24: 'monturas?ir=establo', h25: 'instalaciones?ir=horario', h26: 'turnos', h27: 'recoleccion',
  h28: 'mecanicas?ir=nivel-de-los-enemigos', h29: 'ayudas?ir=esquirlas', h30: 'sendas?ir=fin-de-la-parte-1', h31: 'sendas?ir=reiniciar-capitulo' };
const OLD_ADDR = { minmax: '#/guia', unidades: '#/personajes', sistemas: '#/instalaciones', mundo: '#/mapa', planificador: '#/equipo',
  'clases?ir=monturas': '#/monturas', 'sendas?t=senores': '#/senores',
  ...Object.fromEntries(Object.entries(MECH_OLD).flatMap(([h, to]) => [[`mecanicas/${h}`, '#/' + to], [`mecanicas/${h}-t`, '#/' + to]])) };
/** an old address → the current one, null when current. Also ?ir=<id> on the bare #/ (the chapter used to live there) → #/cap?ir=<id> */
const legacyHash = hash => {
  const { sec, id, qs } = parseHash(hash), byT = OLD_ADDR[`${sec}?t=${qs.t}`], byIr = byT || OLD_ADDR[`${sec}?ir=${qs.ir}`];
  const to = (id && OLD_ADDR[`${sec}/${id}`]) || byIr || (!sec && qs.ir ? '#/cap' : OLD_ADDR[sec]);
  if (!to) return null;
  const rest = { ...qs }; if (byT) delete rest.t; else if (byIr) delete rest.ir;
  const q = new URLSearchParams(rest).toString();
  return to + (q ? (to.includes('?') ? '&' : '?') + q : '');
};
/** old tab ids (?sec=, stored tabs) → the tab that holds them now (Equipo: Builds and Cómo se calcula; ficha: Resumen in En tu partida, Finales in Apoyos) */
const TAB_ALIAS = { builds: 'equipo', reglas: 'equipo', semana: 'equipo', resumen: 'partida', finales: 'apoyos' };
/* the old wiki's `perdibles` (stored as `few.perdibles`; bare key from earlier builds) becomes fe2.perdibles; its `date` and `filters` are ignored */
try {
  const old = localStorage.getItem('few.perdibles') ?? localStorage.getItem('perdibles');
  if (old != null && localStorage.getItem('fe2.perdibles') == null) localStorage.setItem('fe2.perdibles', old);
} catch (e) { /* no storage */ }

/* ---------------- page registry ---------------- */
const P = {};  // id → render(arg) returning an HTML string
/* menu (09-ia): Guías first (Empieza aquí; the topic guides come from W.guias, never registered), then Consulta in six groups by topic,
   Mi partida apart at the end. Every registered page is listed here: this list alone places it (a page's `group` is ignored).
   Ids not registered are skipped. Every menu item is a page, and every address highlights exactly one item (fichas their listing,
   topic guides in the Guías panel). Ajustes (nav: false) is behind the header gear */
const MENU = [['guias', 'Guías', ['guia', 'builds', 'reclutas', 'trucos', 'perdibles', 'guias']],
  ['consulta', 'Personajes', ['personajes', 'apoyos', 'regalos']],
  ['combate', 'Clases y combate', ['clases', 'habilidades', 'monturas', 'batallones', 'mecanicas']],
  ['economia', 'Objetos y economía', ['objetos', 'tiendas', 'recoleccion']],
  ['mundo', 'Mundo y misiones', ['mapa', 'lugares', 'mazmorras', 'misiones', 'batallas']],
  ['sistemas', 'Sistemas', ['instalaciones', 'dioses', 'prestigio', 'turnos', 'sendas', 'senores', 'partes23', 'dificultad']],
  ['historia', 'Historia y textos', ['archivo', 'guion', 'tutoriales', 'glosario']],
  ['partida', 'Mi partida', ['inicio', 'semana', 'cap', 'equipo', 'ajustes']]];
const NAV = MENU.map(([id, title]) => ({ id, title, pages: [] }));
const ROUTES = {};  // hash section → page id
/* Japanese never reaches the screen: names left in text nodes become their official Spanish name, the rest is dropped */
const JP_ES = (() => {
  const m = new Map(), add = (k, es) => { if (k && es && !new RegExp(`[${JP_CH}]`).test(es) && !m.has(k)) m.set(k, es); };
  Object.entries(SPOTS).forEach(([k, s]) => add(k, s.es));
  [CHARS, ITEMS, CLASSES, MOUNTS].forEach(t => Object.values(t).forEach(x => add(x.jp, x.es)));
  Object.entries((W.map || {}).roaming_merchants || {}).forEach(([k, x]) => {
    add(k, x.es);
    if (/商人$/.test(k) && /^Mercantes de /.test(x.es || '')) add(k.replace(/商人$/, ''), x.es.replace(/^Mercantes de /, ''));  // town name
  });
  Object.entries((W.map || {}).dungeons || {}).forEach(([k, x]) => { add(k, x.es); add(x.dungeon_id, x.es); });
  return m;
})();
const JP_RUN = new RegExp(String.raw`[A-Za-z]+_[\w${JP_CH}・ー]*[${JP_CH}][\w${JP_CH}・ー]*|[${JP_CH}][${JP_CH}・ー0-9_]*(?:(?<=[0-9])b\b)?`, 'g');
/** one Japanese run → Spanish name ('' when unknown); «X支部» is a branch of the shop in X, trailing digits/floor tags are map variants */
function jpRun(k) {
  if (JP_ES.has(k)) return JP_ES.get(k);
  const base = k.replace(/[0-9０-９]+b?$/, '');  // map variants: «Cueva2b»
  if (JP_ES.has(base)) return JP_ES.get(base);
  const br = k.match(/^(.+)支部$/);
  return br && JP_ES.has(br[1]) ? t('Sucursal de {p}', { p: gt(JP_ES.get(br[1])) }) : '';
}
const jpEs = t => String(t).replace(/\bDng_\w+\s*\(([^()]+)\)/g, '$1').replace(/\bDng_\d+(?:_V\d+)?\b/g, k => JP_ES.get(k.replace(/_V\d+$/, '')) || k)
  .replace(JP_RUN, jpRun).replace(/\(\s*[,;·]?\s*\)/g, '').replace(/\s+([,;.:)])/g, '$1').replace(/\(\s+/g, '(').replace(/ {2,}/g, ' ');
/** applies jpEs to the text nodes of a page (attributes keep their ids) */
const jpHtml = h => (typeof h === 'string' ? h.replace(/>([^<]+)</g, (m, t) => (JP_ANY.test(t) ? `>${jpEs(t)}<` : m)) : h);
/** page title for <title>: the text of the page's h1 */
const unesc = t => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const docTitle = h => { const m = String(h).match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/), t = m ? unesc(m[1].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim() : '';
  return t ? `${t} · Fortune's Weave` : "Fortune's Weave"; };
/** outline and tables for assistive tech, applied to every page: a heading never skips a level (aria-level keeps the look of the
    tag), every table gets a hidden caption (the heading above it) and scope on its header cells (first row: col; later rows: row) */
function a11yHtml(h) {
  if (typeof h !== 'string') return h;
  const open = [];  // [tag level, outline level] of the headings still open
  let last = '';
  return h.replace(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>|<table\b([^>]*)>([\s\S]*?)<\/table>/g, (m, n, at, inner, tat, body) => {
    if (n) {
      while (open.length && open[open.length - 1][0] >= +n) open.pop();
      const lv = open.length ? open[open.length - 1][1] + 1 : +n;
      open.push([+n, lv]); last = unesc(inner.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
      return lv === +n ? m : `<h${n}${at} aria-level="${lv}">${inner}</h${n}>`;
    }
    let row = -1;
    const cells = body.replace(/<tr\b|<th(?![^>]*scope=)(?=[ >])/g, t => (t === '<tr' ? (row++, t) : `<th scope="${row <= 0 ? 'col' : 'row'}"`));
    return `<table${tat}>${/^\s*<caption/.test(body) ? '' : `<caption class="sr-only">${esc(last || t('Tabla'))}</caption>`}${cells}</table>`;
  });
}
const CSS_DONE = new Set();
/** def: {id, title, render(id, qs, sec), routes?, css?, search?, nav?, count?} — the menu group comes from MENU; count(): how many
    entries the listing shows with «Todas las rutas» (the home page's library rows) */
function register(def) {
  const g = NAV.find(x => MENU.find(m => m[0] === x.id)[2].includes(def.id));
  if (!g) throw new Error('register: add ' + def.id + ' to MENU');
  P[def.id] = (...a) => a11yHtml(jpHtml(def.render(...a)));
  if (def.css && !CSS_DONE.has(def.css) && document.head) {  // page styles go in once, however many pages share them
    CSS_DONE.add(def.css);
    const st = document.createElement('style'); st.textContent = def.css; document.head.appendChild(st);
  }
  g.pages.push(def);
  const ids = MENU.find(m => m[0] === g.id)[2];
  g.pages.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));  // menu order: the MENU list
  (def.routes || [def.id]).forEach(s => { ROUTES[s] = def.id; });
}
