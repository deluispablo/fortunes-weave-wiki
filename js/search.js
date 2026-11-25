/* Fortune's Weave · wiki2 search: index (ES/EN/JP), ranked + grouped results, recents. Depends on core.js. */
'use strict';
const SEARCH_GROUPS = ['Guía', 'Secciones', 'Personajes', 'Objetos', 'Clases', 'Lugares', 'Misiones', 'Batallas', 'Historia', 'Mecánicas', 'Glosario'];
let IDX = null;
LANG_RESET.push(() => { IDX = null; });  // labels in the reader's language; names in both languages match

/** [{group, label, sub, href, icon, k}] — k is the normalized text matched (label + aliases); guides also carry a (title and aliases) */
function searchIndex() {
  if (IDX) return IDX;
  IDX = [];
  const ic = (window.WIKI_EXT || {}).iconos || {};
  const add = (group, label, sub, h, aliases = [], icon = '') => {
    if (label) IDX.push({ group, label, sub: sub || '', href: h, icon: icon || '', k: norm([label, ...aliases].filter(Boolean).join(' ')) });
  };
  // topic guides: title, aliases and their frequent questions are searchable; search() puts them first
  // labels in the reader's language (guiaL, nm); the other language's names stay as aliases
  (W.guias || []).forEach(g0 => { const g = guiaL(g0), al = [...(g.alias || []), ...(g0 !== g ? [g0.titulo, ...(g0.alias || [])] : [])];
    add('Guía', g.titulo, g.resumen, '#/guia/' + g.id, [...al, ...(g.preguntas || [])]); IDX[IDX.length - 1].a = [g.titulo, ...al].map(norm); });
  Object.values(CHARS).forEach(c => add('Personajes', nm(c), gt(c.profile?.title), href('personaje', c.id), [c.es, c.en, c.jp, c.short], (ic.face || {})[c.id]));
  Object.entries(ITEMS).forEach(([k, i]) => refBase(k) === k && add('Objetos', i.es && nm(i), t(i.section), href('objeto', k), [i.es, i.en, i.jp], (ic.item || {})[k]));
  Object.entries(CLASSES).forEach(([k, c]) => add('Clases', nm(c), tx(c, 'tier'), href('clase', k), [c.es, c.en, c.jp], (ic.job || {})[k]));
  Object.entries(MOUNTS).forEach(([k, c]) => add('Clases', nm(c), t('Montura'), href('montura', k), [c.es, c.en, c.jp]));
  Object.entries(SKILLS).forEach(([k, s]) => add('Clases', s.es && nm(s), t('Habilidad'), href('habilidad', k), [s.es, s.en], (ic.skill || {})[k]));
  Object.entries(SPOTS).forEach(([k, s]) => add('Lugares', s.es && nm(s), tx(s, 'kind'), href('lugar', k), [s.es, s.en, s.jp]));
  // the subtitle names the routes: route versions of one quest share its name
  Object.values(QUEST).forEach(q => add('Misiones', q.es && nm(q), list([t(q.kind), questRoutesEs(q)]), href('mision', q.id), [q.es, q.en]));
  Object.values(PARA).forEach(p => add('Misiones', p.es && nm(p), `${t('Desvío de {l}', { l: p.lord })} · ${paraRoutes(p).map(r => ROUTE_NAME[r]).join(', ')}`, href('desvio', p.id), [p.es, p.en, p.lord]));
  Object.values(((window.WIKI_EXT || {}).batallas || {}).b || {}).forEach(b => add('Batallas', gt(b.t), [t(b.k), (b.r || []).join(', ')].filter(Boolean).join(' · '), href('batalla', b.id), [b.t, b.id]));
  // mechanics sections come from pages/sistemas.js (research sections dropped there)
  (W.gloss || []).forEach(([es, en]) => add('Glosario', isEn() ? en || es : es, '', '#/glosario?q=' + encodeURIComponent(es), [es, en]));
  // pages may contribute entries: register({search: () => [{group, label, sub, href, icon, aliases}]})
  NAV.forEach(g => g.pages.forEach(p => {
    if (!p.search) return;
    try { p.search().forEach(e => add(e.group, e.pre ? e.label : t(e.label), e.pre ? e.sub : t(e.sub), e.href,  // pre: label and sub already in the reader's language
      [e.label, ...(e.aliases || [])], e.icon)); } catch (err) { console.error(err); }
  }));
  // every menu page is a «Secciones» result (unless the page already offers one for its address), with the words people type
  NAV.forEach(g => g.pages.forEach(p => {
    const h = pageHref(p);
    if (!IDX.some(e => e.group === 'Secciones' && e.href === h)) add('Secciones', t(p.id === 'cap' ? 'Capítulo actual' : p.title), t(g.title), h, [p.title, ...(PAGE_WORDS[p.id] || [])]);
  }));
  return (IDX = distinct(IDX));
}
const PAGE_WORDS = { inicio: ['inicio', 'portada', 'home', 'biblioteca'], cap: ['capitulo'], mapa: ['map', 'mundo'], tiendas: ['tienda', 'trueque', 'vandahl', 'comprar', 'mercado'], regalos: ['regalo', 'gustos', 'favoritos'],
  perdibles: ['perdible', 'missable'], personajes: ['unidades', 'reclutas'], objetos: ['items', 'armas'], clases: ['clase', 'examen'], recoleccion: ['busqueda', 'cultivo', 'pesca'],
  mazmorras: ['mazmorra'], misiones: ['mision', 'desvio', 'encargo'], batallas: ['batalla', 'combate'], apoyos: ['apoyo', 'finales'], glosario: ['terminos'], guia: ['parte 1', 'min-max'],
  checklist: ['lista de completado', 'coleccionables', 'completar'] };  // i18n-ignore (search words)
/* place ids carry what tells same-named places apart (a city, its sewers, its netherworld copy) */
const SPOT_HINT = [['下水道', 'cloacas'], ['(冥)', 'inframundo'], ['神殿', 'templo'], ['総督府', 'palacio del gobernador']];
/** one result per thing: internal copies of an item or skill (enemy, tutorial) fold into the first; same-named places and battles get a telling subtitle */
function distinct(idx) {
  const key = e => e.group + '|' + norm(e.label) + '|' + e.sub, seen = new Set(), out = [];
  for (const e of idx) {
    if (['Objetos', 'Clases', 'Glosario'].includes(e.group) && seen.has(key(e))) continue;
    seen.add(key(e)); out.push(e);
  }
  const by = new Map();
  out.forEach(e => { const k = key(e); by.set(k, [...(by.get(k) || []), e]); });
  for (const same of by.values()) {
    if (same.length < 2) continue;
    same.forEach(e => {
      if (e.group !== 'Lugares') return;
      const id = decodeURIComponent(e.href.split('/').pop()), s = SPOTS[id];
      const h = SPOT_HINT.find(([jp]) => id.includes(jp))?.[1], hint = h ? t(h) : nm(W.map?.regions?.[s?.region]);
      if (hint) e.sub = `${e.sub} · ${hint}`;
    });
    const left = same.filter(e => same.filter(x => x.sub === e.sub).length > 1);
    left.forEach((e, i) => { e.sub = `${e.sub} · ${t('{i} de {n}', { i: i + 1, n: left.length })}`; });
  }
  return out;
}

const pub = ({ group, label, sub, href: h, icon }) => ({ group, label, sub, href: h, icon });

const recents = {  // hrefs not in the index are ignored, so junk never evicts real entries
  push(h) { if (!searchIndex().some(e => e.href === h)) return; store.set('recents', [h, ...recents.hrefs().filter(x => x !== h)].slice(0, 8)); },
  hrefs() { const v = store.get('recents', []); return Array.isArray(v) ? v : []; },
  /** recent hrefs as search results (unknown hrefs are dropped) */
  list() {
    const by = new Map(searchIndex().map(e => [e.href, e]));
    return recents.hrefs().map(h => by.get(h)).filter(Boolean).map(pub);
  },
};

/** edit distance with transpositions (optimal string alignment), capped: «maksim» → «maxim» is 2 */
function typoDist(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}
/** typo match: every word of the query is near a word of the entry (1 edit up to 4 letters, 2 from 5) */
const typoHit = (toks, k) => { const ws = k.split(/[^a-z0-9ñ]+/).filter(Boolean);
  return toks.every(t => ws.some(w => typoDist(t, w) <= (t.length <= 4 ? 1 : 2) || (w.length > t.length && t.length >= 4 && typoDist(t, w.slice(0, t.length)) <= 1))); };

const STOP = new Set(['como', 'que', 'cual', 'cuales', 'cuanto', 'cuantos', 'cuantas', 'donde', 'cuando', 'por', 'para', 'con', 'los', 'las', 'del', 'una', 'uno', 'hay', 'puedo', 'se', 'el', 'la', 'de', 'en', 'un', 'y', 'o', 'a', 'mi', 'me', 'es', 'lo', 'al']);
const words = k => k.split(/[^a-z0-9ñ]+/).filter(Boolean);
/** how well guide e answers query n (lower is better, null = no match): title or alias equal, then title prefix, then an alias
    starting with the query; from 2.5 on («weak»): a later word of a name, the query inside a question, then every content word of the query near a word of the
    title/aliases (+1 when the questions are needed; typos cost a little) */
function guideScore(e, n) {
  if (n.length < 3) return null;
  if (e.a.includes(n)) return 0;
  if (e.a[0].startsWith(n)) return 1;
  if (e.a.some(x => x.startsWith(n))) return 2;
  if (e.a.some(x => x.includes(' ' + n))) return 2.5;  // a later word of a name: «cai» in «Cultivo (ruta de Cai)»
  if (n.length >= 4 && e.k.includes(n)) return 2.6;
  const toks = words(n).filter(t => !STOP.has(t) && t.length >= 3);
  if (!toks.length) return null;
  const d = (t, w) => (w === t ? 0 : t.length >= 4 && w.startsWith(t) ? 0.1 : t.length >= 4 && typoDist(t, w) <= (t.length < 9 ? 1 : 2) ? typoDist(t, w) / 10 : 9);
  const cost = ws => toks.reduce((c, t) => c + Math.min(9, ...ws.map(w => d(t, w))), 0);
  const a = cost(words(e.a.join(' '))); if (a < 9) return 3 + a;
  const b = cost(words(e.k)); return b < 9 ? 4 + b : null;
}

/** best `max` matches, grouped in SEARCH_GROUPS order; empty query → recents; no exact match → typo-tolerant matches */
function search(q, max = 12) {
  const n = norm(String(q ?? '').trim());
  if (!n) return recents.list();
  // guides that answer the query come first (at most 3), then the entities as before. A guide found only through its questions or
  // words (score ≥ 2.5) is dropped when another guide matches by name, and goes after the entities when one is named like the query.
  let gs = searchIndex().filter(e => e.group === 'Guía').map(e => [guideScore(e, n), e]).filter(x => x[0] != null)
    .sort((a, b) => a[0] - b[0] || a[1].label.length - b[1].label.length);
  if (gs.some(x => x[0] < 2.5)) gs = gs.filter(x => x[0] < 2.5);
  const guides = gs.slice(0, 3).map(x => x[1]);
  const rank = e => { const l = norm(e.label); return l === n ? 0 : l.startsWith(n) ? 1 : e.k.startsWith(n) || e.k.includes(' ' + n) ? 2 : 3; };
  const pool = searchIndex().filter(e => e.group !== 'Guía');
  let hits = pool.filter(e => e.k.includes(n)).map(e => [rank(e), e]);
  if (!hits.length && n.length >= 3) { const toks = n.split(/\s+/); hits = pool.filter(e => typoHit(toks, e.k)).map(e => [4, e]); }
  hits.sort((a, b) => a[0] - b[0] || a[1].label.length - b[1].label.length);
  const top = hits.slice(0, Math.max(0, max - guides.length)).map(h => h[1]), named = hits.some(h => h[0] <= 1);
  // an entity named exactly like the query («cai») also beats guides found only by an alias prefix («cai parte 1»)
  const weak = gs.length && gs[0][0] >= (hits.some(h => h[0] === 0) ? 2 : 2.5);
  const ents = SEARCH_GROUPS.flatMap(g => top.filter(e => e.group === g));
  return (weak && named ? [...ents, ...guides] : [...guides, ...ents]).slice(0, max).map(pub);
}
