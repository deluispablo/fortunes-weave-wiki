/* Fortune's Weave · wiki · Planificador de equipo (#/planificador?r=<ruta>&pt=1|3&e=<plan>): up to the deployable number of units for a
   route and part, each with a class it can take there, weapons of that class, equipment and a note. The plan is ?e= (base64url of
   [[pid, jid, [arma 1, arma 2, equipo], nota]]), so the page is a pure function of qs (+ ctx for «Usar mi equipo») and the address is
   the share link. Classes follow core.js classBan (the rule Comparar and Árbol de clases use). Removing, «Usar build» and «Usar mi equipo»
   are plain links; the selects and the note change ?e= through one change listener. Edits re-render in place (pushState + render(true)):
   the scroll stays, focus goes back to the control just used, Back undoes. Old #/planificador?p=<pids> links still go to Equipo. */
'use strict';
const PLAN_MAX = 30;  // more than any battle deploys (planSize); a cap for hand-edited links
/** plan → ?e= value ('' when empty, so the param goes away) */
const planEnc = units => (units.length ? b64url(JSON.stringify(units)) : '');
/** ?e= value (untrusted) → [[pid, jid, [iid, iid, iid], note]]; unknown ids become '', unknown units are dropped; never throws */
function planDec(s) {
  let a; try { a = JSON.parse(unb64url(s || '')); } catch (e) { return []; }
  if (!Array.isArray(a)) return [];
  const seen = new Set();
  const own = (o, k) => typeof k === 'string' && Object.hasOwn(o, k);  // «__proto__», «constructor»… are no ids
  return a.filter(u => Array.isArray(u) && own(CHARS, u[0]) && !seen.has(u[0]) && seen.add(u[0])).slice(0, PLAN_MAX)
    .map(([pid, jid, w, n]) => [pid, own(CLASSES, jid) ? jid : '', (Array.isArray(w) ? w : []).slice(0, 3).map(k => (own(ITEMS, k) ? k : '')),
      typeof n === 'string' ? n.slice(0, 200) : '']);
}
/** one edit: f 'add' (v = pid), 'c' (class: weapons it cannot use go), 'w0'–'w2' (slot), 'n' (note) on unit i */
function planSet(units, i, f, v) {
  const u = units.map(x => [x[0], x[1], [...x[2]], x[3]]);
  if (f === 'add') return Object.hasOwn(CHARS, v) && !u.some(x => x[0] === v) ? [...u, [v, '', [], '']] : u;
  const x = u[i]; if (!x) return u;
  if (f === 'c') {
    x[1] = Object.hasOwn(CLASSES, v) ? v : '';
    const ok = new Set(planWeapons(x[1]));  // '' (the start class) is checked by planFix, which knows the route
    if (x[1]) x[2] = x[2].map((k, j) => (j < 2 && !ok.has(k) ? '' : k));
  } else if (/^w[0-2]$/.test(f)) { while (x[2].length < 3) x[2].push(''); x[2][+f[1]] = Object.hasOwn(ITEMS, v) ? v : ''; }
  else if (f === 'n') x[3] = String(v).slice(0, 200);
  return u;
}
/** deploy tiles of the story battles of that route's Part 1, or of Parts 2–3 */
const planTiles = (route, pt) => Object.values(((window.WIKI_EXT || {}).batallas || {}).b || {}).filter(b => b.k === 'historia' && b.ps &&
  (pt === '1' ? b.p === 1 && (b.r || []).includes(ROUTE_NAME[route]) : b.p >= 2)).map(b => b.ps.length);
/** units a battle deploys at most. Parts 2–3: the normal maps' maximum (17); only the final battle takes more (planFinal, 25) */
function planSize(route, pt) {
  const n = planTiles(route, pt);
  if (!n.length) return 12;  // shortcut: 12 only when the battle data is missing (never in a real build)
  const top = Math.max(...n);
  return pt === '1' ? top : Math.max(0, ...n.filter(x => x < top)) || top;  // the largest Parts 2–3 map is the one finale
}
const planFinal = route => Math.max(0, ...planTiles(route, '3'));
/** classes `pid` can take on `route` by the end of the part: the class exists there (teamClassIdx) and classBan allows it in that
    part (Suprema and Divina only in Parts 2–3). Plus the class it joins in. Tier, then name. */
function planClasses(pid, route, pt, start) {
  const ch = routeChapters(route), top = pt === '1' ? 1 : 3;
  const ok = j => { const i = teamClassIdx(j, route); return i >= 0 && ch[i].part <= top && classBan(pid, j, pt) !== true; };
  return Object.keys(CLASSES).filter(j => j === start || ok(j)).sort((a, b) => (+CLASSES[a].tier || 0) - (+CLASSES[b].tier || 0) || nm(CLASSES[a]).localeCompare(nm(CLASSES[b]), LANG));
}
let PLAN_GET = null;
/** gear a player can have: found, bought or carried by a unit (obtain, held_by), or forged from such gear; no «+N» copies, no tutorial gear */
const planBase = k => {
  if (!PLAN_GET) {
    PLAN_GET = new Set(Object.keys(ITEMS).filter(x => (ITEMS[x].obtain || []).length || (ITEMS[x].held_by || []).length));
    for (const x of PLAN_GET) { const to = ITEMS[x].weapon?.forge?.to; if (ITEMS[to]) PLAN_GET.add(to); }  // a Set iterates what is added meanwhile
  }
  return PLAN_GET.has(k) && refBase(k) === k && !/チュートリアル/.test(k) && !!nm(ITEMS[k]);
};
/** weapons a class can use (its weapon types), weakest first */
const planWeapons = jid => { const ws = (CLASSES[jid]?.weapons_usable || []).map(armaKey);
  return Object.keys(ITEMS).filter(k => ITEMS[k].weapon?.type && ws.includes(armaKey(ITEMS[k].weapon.type)) && planBase(k))
    .sort((a, b) => ws.indexOf(armaKey(ITEMS[a].weapon.type)) - ws.indexOf(armaKey(ITEMS[b].weapon.type)) || (ITEMS[a].weapon.might || 0) - (ITEMS[b].weapon.might || 0) || nm(ITEMS[a]).localeCompare(nm(ITEMS[b]), LANG)); };
let PLAN_EQUIP = null;
/** shields and accessories (any class) */
const planEquip = () => (PLAN_EQUIP ??= Object.keys(ITEMS).filter(k => /^(Escudos|Accesorios)/.test(ITEMS[k].section || '') && planBase(k)))
  .slice().sort((a, b) => nm(ITEMS[a]).localeCompare(nm(ITEMS[b]), LANG));
/** the unit's builds for the route and part (Builds page data) whose last class is known */
const planBuilds = (pid, route, pt) => ((((window.WIKI_EXT || {}).builds || {}).units || {})[pid] || [])
  .filter(o => (!o.routes || o.routes.includes(route)) && (!o.parts || o.parts.some(n => (pt === '1' ? n === 1 : n >= 2))) && teamJid((o.path || []).at(-1)));
/** roles of a unit in class `jid`: what the class does, plus the roles of a build that ends in that class */
const planRoles = (pid, jid, route, pt) => [...new Set([...teamRolesOf(jid), ...planBuilds(pid, route, pt).filter(o => teamJid(o.path.at(-1)) === jid).flatMap(o => o.roles || [])])];
/** units as the selects show them: a class not on offer goes back to the start class (''), weapons the class cannot use and gear not
    in the list go (a hand-edited link, or one made for another route or part) */
function planFix(units, r, pt) {
  const key = buildsKey(r, +pt), eq = new Set(planEquip());
  return units.map(([pid, jid, w, n]) => {
    const start = teamStart(pid, r, key), j = jid && planClasses(pid, r, pt, start).includes(jid) ? jid : '', ws = new Set(planWeapons(j || start));
    return [pid, j, [0, 1, 2].map(i => ((i < 2 ? ws : eq).has(w[i]) ? w[i] : '')), n];
  });
}
/** route, part, team size and the plan of an address (the page and the change listener read the same) */
function planState(qs) {
  const late = ctxChosen() && CAPS[ctxGet().key]?.part >= 2;
  const r = ROUTE_IDS.includes(qs.r) ? qs.r : ctxRoute() || 'cai', pt = ['1', '3'].includes(qs.pt) ? qs.pt : late ? '3' : '1';
  const size = planSize(r, pt), all = planDec(qs.e);
  return { r, pt, size, all, units: planFix(all.slice(0, size), r, pt) };
}

(() => {
  const CSS = `.pl-u .pl-h{display:flex;align-items:center;gap:var(--s2);min-height:var(--tap)}.pl-u .pl-h b{flex:1;min-width:0}
.pl-u .bd-f{flex:none;width:32px;height:32px;border-radius:50%;object-fit:cover;object-position:50% 15%;background:var(--surface2)}
.pl-f{margin:var(--s2) 0}.pl-f .fbar{flex-direction:column;align-items:stretch;overflow:visible}.pl-f .fsel{max-width:100%}  /* one select per row on phones (shell.js filterBars wraps them in a scrolling .fbar) */.pl-u .filters{margin:0}.pl-warn{color:var(--red)}
.pl-acts{display:flex;flex-wrap:wrap;gap:0 var(--s2);margin:0 0 var(--s2) calc(-1 * var(--s2))}.pl-u .pl-b{margin-left:calc(-1 * var(--s2))}
@media (min-width:900px){.pl-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 var(--s3);align-items:start}}`;
  const TIERS = (W.classes || {}).meta?.tiers || {};
  const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
  /** a select styled like the filter pills (filterCtl); opts [[value, label, group]] (consecutive equal groups share an <optgroup>);
      the change listener below reads data-pl="<unit>:<field>" */
  const sel = (label, who, key, opts, cur) => { const s = opts.find(([v]) => v === cur) || opts[0];
    let g = '', html = '';
    for (const [v, lb, gr = ''] of opts) {
      if (gr !== g) { html += (g ? '</optgroup>' : '') + (gr ? `<optgroup label="${esc(gr)}">` : ''); g = gr; }
      html += `<option value="${esc(v)}"${v === s[0] ? ' selected' : ''}>${esc(lb)}</option>`;
    }
    return `<label class="fsel"><span class="fsel-k">${esc(t(label))}</span><span class="fsel-v">${esc(s[1])}</span><select data-pl="${key}" aria-label="${esc(t(label) + (who ? ' · ' + who : ''))}">` +
      html + (g ? '</optgroup>' : '') + '</select></label>'; };
  const demon = k => (isCursed(k) ? ' · ' + t('Tesoro maldito') : '');
  const armaName = type => t((ARMAS.find(([k]) => k === armaKey(type)) || [, type])[1]);
  const weapOpt = k => [k, `${nm(ITEMS[k])} · ${t('Pot {n}', { n: ITEMS[k].weapon.might || 0 })}${demon(k)}`, armaName(ITEMS[k].weapon.type)];
  const equipOpt = k => [k, nm(ITEMS[k]) + demon(k), t(/^Escudos/.test(ITEMS[k].section || '') ? 'Escudos' : 'Accesorios')];
  function page(qs = {}) {
    const { r, pt, size, all, units } = planState(qs), key = buildsKey(r, +pt);
    const go = us => esc(qsHref('planificador', qs, { r, pt, e: planEnc(us) }));
    const none = [['', '—']];
    const gear = [...none, ...planEquip().map(equipOpt).sort((a, b) => a[2].localeCompare(b[2], LANG))];  // Accesorios, Escudos (stable sort keeps A-Z)
    const rows = units.map(([pid, jid0, w, note], i) => {
      const start = teamStart(pid, r, key), jid = jid0 || start, who = nm(CHARS[pid]);
      const cls = planClasses(pid, r, pt, start).map(j => [j, nm(CLASSES[j]), nm(TIERS[+CLASSES[j].tier] || {}) || '']);
      const weap = planWeapons(jid).map(weapOpt);
      const b = planBuilds(pid, r, pt)[0], bj = b && teamJid(b.path.at(-1));
      const fromB = b && units.map((u, j) => (j === i ? [pid, bj, u[2], u[3] || tx(b, 'name')] : u));
      return `<section class="card pl-u"><div class="pl-h">${img(ico().face?.[pid], 'bd-f') || '<span class="bd-f"></span>'}<b>${L('personaje', pid)}</b>` +
        `<a class="txtbtn txtbtn-2" data-pl-go="${i}:q" href="${go(units.filter((u, j) => j !== i))}" aria-label="${esc(t('Quitar a {p}', { p: who }))}">${t('Quitar')}</a></div>` +
        `<div class="pl-f">${sel('Clase', who, `${i}:c`, cls, jid)}${sel('Arma 1', who, `${i}:w0`, [...none, ...weap], w[0])}${sel('Arma 2', who, `${i}:w1`, [...none, ...weap], w[1])}` +
        `${sel('Equipamiento', who, `${i}:w2`, gear, w[2])}</div>` +
        `<div class="filters"><input type="text" data-pl="${i}:n" value="${esc(note)}" maxlength="200" placeholder="${esc(t('Notas'))}" aria-label="${esc(t('Notas sobre {p}', { p: who }))}"></div>` +
        (b ? `<a class="txtbtn pl-b" data-pl-go="${i}:b" href="${go(fromB)}">${t('Usar build: {c}', { c: esc(nm(CLASSES[bj])) })}</a>` : '') + '</section>';
    });
    // summary: what is missing first, then how many units cover each weapon type and role (who, in a fold)
    const eff = units.map(([pid, jid]) => [pid, jid || teamStart(pid, r, key)]);
    const names = ps => list(ps.map(p => esc(nm(CHARS[p]))));
    const arms = ARMAS.map(([k, es]) => [t(es), eff.filter(([, j]) => (CLASSES[j]?.weapons_usable || []).map(armaKey).includes(k)).map(([p]) => p)]);
    const roles = Object.fromEntries(eff.map(([p, j]) => [p, planRoles(p, j, r, pt)]));
    const roleRows = [...new Set([...ROLES.map(x => x[0]), ...Object.values(roles).flat()])]
      .map(x => [cap1(roleName(x)), Object.keys(roles).filter(p => roles[p].includes(x))]).filter(x => x[1].length);
    const has = arms.filter(a => a[1].length);
    const count = xs => xs.map(([lb, ps]) => `${esc(lb)} ${ps.length}`).join(' · ');
    const off = pt === '1' ? units.filter(([p]) => !joinsP1(p, r)).map(([p]) => p) : [];
    const sum = units.length ? card(t('Resumen del equipo'),
      (eff.some(([p]) => roles[p].includes('sanador')) ? '' : `<p class="pl-warn">${t('Nadie cura: añade a alguien con Magia blanca.')}</p>`) +
      (off.length ? `<p class="pl-warn">${t('No están en la Parte 1 de esta ruta: {p}.', { p: names(off) })}</p>` : '') +
      kvRows([[t('Nadie con'), esc(list(arms.filter(a => !a[1].length).map(([lb]) => lb)))], [t('Armas del equipo'), count(has)], [t('Roles'), count(roleRows)]]) +
      `<details><summary>${t('Quién lleva qué')}</summary>${kvRows([...has, ...roleRows].map(([lb, ps]) => [lb, names(ps)]))}</details>`) : '';
    // «Usar mi equipo»: the team saved in Mi partida (teamNow), as many as fit
    const team = teamNow(r), mine = team ? [...team].filter(p => CHARS[p]).slice(0, size).map(p => [p, '', [], '']) : null;
    // Part 1: only who is on this route; Parts 2–3 are shared, so everyone
    const pool = Object.keys(CHARS).filter(p => Object.keys(CHARS[p].routes || {}).length && !units.some(u => u[0] === p) && (pt !== '1' || joinsP1(p, r))).sort(bySerial);
    const add = units.length < size ? `<div class="pl-f"><label class="fsel"><span class="fsel-k">${t('Añadir unidad')}</span><span class="fsel-v">${t('Elegir…')}</span>` +
      `<select data-pl="0:add" aria-label="${esc(t('Añadir unidad'))}"><option value="">${t('Elegir…')}</option>${pool.map(p => `<option value="${esc(p)}">${esc(nm(CHARS[p]))}</option>`).join('')}</select></label></div>` : '';
    const intro = pt === '1' ? t('Elige hasta {n} unidades, con su clase, sus armas y su equipamiento. El plan va en el enlace: cópialo para compartirlo.', { n: size })
      : t('Elige hasta {n} unidades (hasta {f} en la batalla final), con su clase, sus armas y su equipamiento. El plan va en el enlace: cópialo para compartirlo.', { n: size, f: planFinal(r) });
    return `<h1>${t('Planificador de equipo')}</h1><p class="mut">${intro}</p>` +
      `<div class="aw-ctx">${chips('planificador', qs, 'r', ROUTE_IDS.map(x => [x, ROUTE_NAME[x]]), r, 'Ruta')}${chips('planificador', qs, 'pt', [['1', 'Parte 1'], ['3', 'Partes 2 y 3']], pt, 'Parte')}</div>` +
      `<div class="pl-acts">${units.length ? `<button type="button" class="txtbtn" data-pl-copy>${t('Copiar enlace')}</button>` : ''}` +
      (mine ? `<a class="txtbtn" href="${go(mine)}">${t('Usar mi equipo')}</a>` : '') +
      (units.length ? `<a class="txtbtn txtbtn-2" href="${go([])}">${t('Vaciar')}</a>` : '') + '</div>' +
      (all.length > size ? `<p class="mut">${t('Solo caben {n} unidades: el resto del enlace no se muestra.', { n: size })}</p>` : '') +
      sum + `<div class="pl-grid">${rows.join('')}</div>` + add + (units.length ? '' : `<p class="mut">${t('Aún no hay unidades en el plan.')}</p>`);
  }
  register({ id: 'planificador', title: 'Planificador de equipo', render: (id, qs) => page(qs || {}), css: CSS,
    search: () => [{ group: 'Secciones', label: tl('Planificador de equipo'), sub: tl('Arma un equipo y compártelo con un enlace'), href: '#/planificador', aliases: ['planner', 'planificador', 'team planner'], pre: true }] });  // i18n-ignore

  if (typeof window.addEventListener !== 'function') return;  // tests: no browser events
  const copy = txt => (navigator.clipboard?.writeText(txt) ?? Promise.reject()).then(() => announce(t('Enlace copiado')), () => { prompt(t('Copia este texto:'), txt); });
  /** show address `h` in place: a new history entry (Back undoes the edit) without the hashchange render that scrolls to the top and
      focuses the h1. Focus goes to where Tab took it meanwhile (a note commits on blur), else back to control `key`, else Añadir */
  const stay = (h, key) => setTimeout(() => {
    const a = document.activeElement, k = (a?.closest?.('main') && (a.dataset?.pl || a.dataset?.plGo)) || key;
    if (h === location.hash) return;
    history.pushState(null, '', h);
    render(true);
    const el = document.querySelector(`main [data-pl="${k}"], main [data-pl-go="${k}"]`) || document.querySelector('main [data-pl="0:add"]');
    if (el) el.focus({ preventScroll: true }); else focusH1();
  });
  document.addEventListener('click', e => {
    if (e.target.closest?.('[data-pl-copy]')) { copy(location.href); return; }
    const a = e.target.closest?.('main a[data-pl-go]');
    if (a && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) { e.preventDefault(); stay(a.getAttribute('href'), a.dataset.plGo); }
  });
  document.addEventListener('change', e => {
    const el = e.target.closest?.('[data-pl]'); if (!el) return;
    const [i, f] = el.dataset.pl.split(':'), { qs } = parseHash(location.hash), { r, pt, size, all, units } = planState(qs);
    stay(qsHref('planificador', qs, { r, pt, e: planEnc(planSet([...units, ...all.slice(size)], +i, f, el.value)) }), el.dataset.pl);
  });
})();
