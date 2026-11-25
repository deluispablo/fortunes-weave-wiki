/* Fortune's Weave · Árbol de clases (#/arbol-clases?p=<pid>): the game's class tree (CLASSES tree_prev / tree_next_all) as nested lists,
   Plebeyo → Inicial → Intermedia → Avanzada → Suprema → Divina; each node links to its class ficha (which has the full requirements).
   ?p= marks the classes a unit can be (core.js classBan, the rule Comparar and the planner use too). */
'use strict';
(() => {
  const META = (W.classes || {}).meta || {};
  const pick = v => (typeof v === 'string' && Object.hasOwn(CHARS, v) ? v : '');
  const kids = k => (CLASSES[k].tree_next_all || []).filter(x => CLASSES[x]);
  const lic = (id, es) => (id && ITEMS[id] ? `<span class="at-lic">${itemIco(id, 'ico')}${L('objeto', id, es)}</span>` : es ? `<span class="at-lic">${esc(dataTx(es))}</span>` : '');
  const renown = r => (r == null ? '' : typeof r === 'number' ? t('Prestigio {n}', { n: r }) : esc(dataTx(r)));

  function node(k, p, seen, flat) {
    if (seen.has(k)) return '';
    seen.add(k);
    const c = CLASSES[k], ban = p ? classBan(p, k) : null;
    const st = p ? (ban === true ? ' off' : ban ? '' : ' on') : '';
    // the licence is a chip after the list, so a wrapped line never ends in a comma
    const sub = [list([ban === true ? `<em>${t('vetada')}</em>` : typeof ban === 'string' ? `<em>${t('vetada {w}', { w: esc(dataTx(ban)) })}</em>` : '',
      (c.weapons_usable || []).map(w => t(w)).join(', '), (c.unlock_sources || []).length ? t('desbloqueo especial') : '']), lic(c.licence, c.licence_es)].filter(Boolean).join(' ');
    const ch = flat ? '' : kids(k).map(x => node(x, p, seen)).join('');
    return `<li><div class="at-n${st}" data-c="${esc(k)}"><a href="${href('clase', k)}">${img(ico().job?.[k], 'at-ico')}<b>${esc(nm(c))}</b></a>` +
      `${sub ? `<small>${sub}</small>` : ''}</div>${ch ? `<ul>${ch}</ul>` : ''}</li>`;
  }

  function page(qs) {
    const p = pick(qs.p), seen = new Set(), ks = Object.keys(CLASSES);
    const roots = ks.filter(k => !CLASSES[CLASSES[k].tree_prev]);
    // the base class (Plebeyo) on top, then one scrollable card per beginner branch
    const tree = roots.map(r => `<ul class="at-root">${node(r, p, seen, true)}</ul>` +
      kids(r).map(x => `<div class="card at-br"><ul class="at-tree">${node(x, p, seen)}</ul></div>`).join('')).join('');
    const rest = ks.filter(k => !seen.has(k));  // never empty with today's data: a class off the tree still shows
    const tiers = Object.entries(META.tiers || {}).map(([, x]) => li(esc(nm(x)), list([lic(x.licence, ITEMS[x.licence]?.es || x.licence), renown(x.renown),
      x.rec_level ? t('nivel recomendado {n}', { n: x.rec_level }) : ''])));
    const n = p ? ks.filter(k => classBan(p, k) === null).length : 0;  // the same count as Comparar: classes with no limit at all
    const sel = filterCtl('arbol-clases', { p }, 'p', [['', t('Todos los personajes')], ...Object.keys(CHARS).sort(bySerial).map(x => [x, nm(CHARS[x])])], p, 'Personaje', x => x);
    return `<h1>${t('Árbol de clases')}</h1>` +
      `<p>${t('Así ordena el juego las clases. Para cambiar de clase cuentan la licencia, el prestigio y el examen de rangos de arma; no está confirmado que haga falta haber sido la clase anterior.')}</p>` +
      `<div class="at-ctl">${sel}</div>` +
      (p ? `<p>${t('{c} puede ser {n} de {m} clases.', { c: L('personaje', p), n, m: ks.length })} <a href="${esc(qsHref('comparar', {}, { a: p }))}">${t('Comparar')}</a></p>` : '') +
      tree + (rest.length ? `<div class="card at-br"><ul class="at-tree">${rest.map(k => node(k, p, seen)).join('')}</ul></div>` : '') +
      `<details><summary>${t('Rangos y licencias')}</summary>${ul(tiers)}</details>`;
  }

  const CSS = `.at-ctl { margin-bottom: var(--s3); }
.at-br { overflow-x: auto; }
.at-tree, .at-tree ul, .at-root { list-style: none; margin: 0; padding: 0; }
.at-tree ul { margin-left: var(--s3); padding-left: var(--s3); border-left: 2px solid var(--line); }
.at-n { display: flex; flex-direction: column; min-width: 12rem; padding: var(--s1) 0; }
.at-n a { display: inline-flex; align-items: center; gap: var(--s2); min-height: var(--tap); }
.at-n small { color: var(--mut); padding-left: calc(32px + var(--s2)); }
.at-ico { width: 32px; height: 32px; }
.at-n em { font-style: normal; font-weight: 600; color: var(--tx2); }
.at-lic { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; padding: 0 var(--s2); border: 1px solid var(--line); border-radius: 999px; }
.at-lic a { color: inherit; }
.at-n.on b { color: var(--green); }
.at-n.off b { color: var(--mut); text-decoration: line-through; }
@media (max-width: 600px) { .at-tree ul { margin-left: var(--s1); padding-left: var(--s2); } .at-n { min-width: 10rem; } }`;

  register({ id: 'arbol-clases', title: 'Árbol de clases', render: (id, qs) => page(qs || {}), css: CSS });
})();
