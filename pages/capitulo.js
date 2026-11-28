/* Fortune's Weave · wiki2 · chapter front page (#/ and #/cap/<ruta|comun>/<parte>/<n>), blocks in spec §6 order, empty ones hidden. */
'use strict';
(() => {
  const ymd = s => String(s).split('-').map(Number);
  const day = s => fechaDia(s);  // pages/perdibles.js, in the reader's language
  /** data text: the game's English when the game has it, else the wiki's (i18n/en/data-chapters.json) */
  const dt = s => { const g = gt(s); return g !== s ? g : t(s); };
  const days = (a, b) => { const [y1, m1, d1] = ymd(a), [y2, m2, d2] = ymd(b); return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 864e5) + 1; };
  const range = ([a, b]) => (a === b ? `${a}` : `${a}–${b}`);
  /** a data name → a link when it names an entity of one of `kinds` (core.js NAME: Spanish and English names), else plain text */
  const nk = (s, kinds) => { const h = NAME.get(norm(s)); return h && kinds.includes(h[0]) ? L(h[0], h[1]) : esc(s); };
  const names = (s, kinds) => String(s).split(', ').map(x => nk(x, kinds)).join(', ');
  /** a label that holds a place («Dagsion (armería)») → the same text, linked to that place */
  const spotA = (spot, text) => (SPOTS[spot] ? `<a href="${href('lugar', spot)}">${esc(text)}</a>` : esc(text));
  /** «600 G, 30 de Prestigio, 3× Poción.» → the item names linked */
  const rewards = s => String(s).replace(/\.$/, '').split(', ').map(x => { const m = /^(\d+× )?(.+)$/.exec(x); return esc(m[1] || '') + nk(m[2], ['objeto', 'montura']); }).join(', ') + (/\.$/.test(s) ? '.' : '');
  /** «Cumpleaños: Esmeralda» → the character linked */
  const event = s => { const m = /^(.+?: )(.+)$/.exec(s); return m ? esc(m[1]) + nk(m[2], ['personaje']) : esc(s); };
  /** «Derrota a Zarcone» → the character linked */
  const objective = s => { const m = /^(Derrota a |Defeat )(.+)$/.exec(s); return m ? esc(m[1]) + names(m[2], ['personaje']) : esc(s); };
  const KIND = { mision: ['Misión', 'mision'], desvio: ['Desvío', 'desvio'], recluta: ['Recluta', 'personaje'], perdible: ['Perdible', null] };


  /** a Part 1 chapter's timeline (W.chapters): Cai's hand-checked one, the other routes' from chapters_by_route */
  const line = c => (c.part !== 1 ? null : c.route === 'cai' ? W.chapters?.chapters?.[c.n] : W.chapters?.chapters_by_route?.[c.route]?.[c.n]) || null;
  /** free turns, plus the partial last one (in hours) when the timeline ends mid-turn */
  const turns = c => { const x = line(c);
    return x?.turns_free ? `${x.turns_free}${x.turns_free_partial_h ? ' ' + t('(+1 parcial de {h} h)', { h: num(Math.round(x.turns_free_partial_h * 10) / 10) }) : ''}` : ''; };
  const PORTAL = { アウロラ: 'Aurora', マーズ: 'Mars', カーラ: 'Kalla', 'ユ・ファス': 'Yu Phas' };
  const unlocks = c => [...c.unlocks.map(dt),
    ...(line(c)?.unlocks || []).map(u => /^神殿_転移_(.+)神殿$/.exec(u.jp)?.[1]).filter(g => PORTAL[g]).map(g => t('Portal al Templo de {g}', { g: PORTAL[g] }))];
  /** the route's Part 1 temple portal: the story opens it (Dagsion's annex ↔ the god's main temple) */
  const portalAt = route => { for (const c of routeChapters(route).filter(x => x.part === 1)) {
    const g = (line(c)?.unlocks || []).map(u => /^神殿_転移_(.+)神殿$/.exec(u.jp)?.[1]).find(x => PORTAL[x]);
    if (g) return { g: PORTAL[g], c }; } return null; };
  /** Moverse rápido (Part 1): the portal and the carriage, with the quests each Cai line needs (map data) */
  function travel(route, c) {
    if (c.part !== 1 || !route) return '';
    const p = portalAt(route), at = p && chapIdx(route, p.c.key) - chapIdx(route, c.key), out = [];
    if (p) out.push(at < 0 ? t('Portal al Templo de {g}: abierto. Del anexo del templo en Dagsion al templo principal, al instante.', { g: p.g })
      : t(at ? 'Portal al Templo de {g}: lo abre la historia en el cap. {n}; no hay que hacer nada.' : 'Portal al Templo de {g}: lo abre la historia en este capítulo; no hay que hacer nada.', { g: p.g, n: p.c.n }));
    out.push(t('Los demás portales se abren en la Parte 3, con la petición de cada dios.'));
    out.push(t('Carruaje: es la acción del turno, más la tarifa (100/200/300 G); llegar andando a la posta y montar en el mismo turno cuesta 1 turno en total. Solo sales de postas que ya visitaste: pasa por cada una al menos una vez.'));
    if (route === 'cai') {
      const CL = W.map?.carriage_lines || [], free = new Set(CL.filter(l => !l.closed_cai && !l.cai_subquest).flatMap(l => [l.from_es, l.to_es]));
      const by = new Map(); CL.filter(l => l.cai_subquest).forEach(l => by.set(l.cai_subquest.id, new Set([...(by.get(l.cai_subquest.id) || []), l.from_es, l.to_es].filter(x => !free.has(x)))));
      const closed = [...new Set(CL.filter(l => l.closed_cai).flatMap(l => [l.from_es, l.to_es]))].filter(x => !free.has(x) && ![...by.values()].some(v => v.has(x)));
      out.push(t('En la ruta de Cai el cochero pide antes {q} (desde el cap. 7).', { q: L('mision', 'SQID_カイ篇_使い慣れたもの') }));
      by.forEach((v, q) => out.push(t('{a}: hace falta además {q}.', { a: list([...v].map(x => nk(x, ['lugar']))), q: L('mision', q) })));
      if (closed.length) out.push(t('Sin carruaje en la Parte 1 de Cai: {a}.', { a: list(closed.map(x => nk(x, ['lugar']))) }));
    }
    out.push(`<a href="#/turnos">${t('Turnos y viajes')}</a>`);
    return `<details class="card" id="cp-viaje"><summary><h3>${t('Moverse rápido')}</h3></summary><ul class="cp-list">${out.map(x => `<li>${x}</li>`).join('')}</ul></details>`;
  }
  /** what the calendar holds this chapter (Part 1): events by day, plays on stage, Sundays */
  function calendar(c) {
    const x = line(c); if (!x) return '';
    const ev = (x.calendar || []).filter(d => (d.what || []).length).map(d => `<li><b>${esc(day(d.date))}</b> <small>${esc(t(d.weekday || ''))}</small><small>${list(d.what.map(w => event(dt(w))))}</small></li>`).join('');
    const plays = list((x.plays || []).map(p => `${esc(gt(p.es))} <small>(${esc(dt(p.genre))}, ${esc(day(p.start))} – ${esc(day(p.end))})</small>`));
    const sun = (x.sundays || []).length;
    return kvRows([[t('En cartel'), plays], [t('Domingos'), sun ? `${sun}: ${esc(list(x.sundays.map(day)))}` : '']]) + (ev ? `<ul class="cp-list">${ev}</ul>` : '');
  }

  function header(c, nav) {
    const who = c.route === 'comun' ? t(COMMON_LABEL) : ROUTE_NAME[c.route];
    const part = c.part === 0 ? t('Prólogo') : t('Parte {p}', { p: c.part });
    const btn = (k, lbl, sym) => (k ? `<a class="cp-nav ib" href="${capHash(k)}" aria-label="${esc(t(lbl, { c: nm(CAPS[k]) }))}">${navIcon(sym)}</a>`
      : `<span class="cp-nav ib off" aria-hidden="true">${navIcon(sym)}</span>`);
    const meta = kvRows([
      [t('Fechas'), c.start && `${day(c.start)} – ${fechaDiaAno(c.end)}`],
      [t('Tiempo libre'), c.free_start ? `${day(c.free_start)} – ${day(c.free_end)} (${plural(days(c.free_start, c.free_end), 'día', 'días')})` : t('Sin tiempo libre')],
      [t('Nivel recomendado'), c.level && range(c.level)],
      [t('Turnos libres'), turns(c)],
      [t('Guion'), list(guionLinks.chapter(c.key).map(([h, tl]) => `<a href="${h}">${esc(tl)}</a>`))],
    ]);
    return `<div class="cp-head">${btn(nav.prev, 'Capítulo anterior: {c}', 'prev')}<div class="cp-t"><p class="cp-eye">${esc(`${who} · ${part} · ${t('Cap. {n}', { n: c.n })}`)}</p>` +
      `<h1>${esc(nm(c))}</h1></div>${btn(nav.next, 'Capítulo siguiente: {c}', 'next')}</div><div class="card cp-meta">${meta}</div>`;
  }

  // a «Misiones …» missable row only repeats the chapter's mission rows (other wording): each mission is listed once
  const routeOf = c => (c.route === 'comun' ? ctxRoute() : c.route);  // a shared chapter is read for the chosen route, or for every route
  const closingRows = c => c.closing.filter(x => (x.kind !== 'mision' || questAvail(x.id, routeOf(c), c.key)) &&
    !(x.kind === 'perdible' && /^Misiones\b/.test(x.es) && c.closing.some(y => y.kind === 'mision')));
  const closing = c => closingRows(c).map(x => {
    const [lbl, kind] = KIND[x.kind] || [x.kind, null];
    return `<li><span class="cp-tag">${esc(t(lbl))}</span><b>${kind ? L(kind, x.id, x.es) : esc(dt(x.es))}</b>${x.deadline ? `<span class="cp-dl">${t('hasta el {d}', { d: day(x.deadline) })}</span>` : ''}` +
      `<small>${t('Si se pierde: {x}', { x: rewards(dt(x.if_missed)) })}</small></li>`;
  }).join('');

  const recruits = c => c.recruits.map(r => `<li class="cp-rec">${img(ico().face?.[r.pid], 'cp-face') || '<span class="cp-face"></span>'}` +
    `<div><b>${L('personaje', r.pid)}</b><small>${recruitCost(r.cost)}</small>${joinTxt(r.pid, c)}</div></li>`).join('');
  /** the class they join with if recruited in this chapter (core.js joinAt) */
  const joinTxt = (pid, c) => { const j = joinAt(pid, c.route, c.key);
    return j ? `<small class="mut">${t('Llega con Nv {a}–{b} aprox.: {k}', { a: j.lv[0], b: j.lv[1], k: j.classes.map(x => x[1] ? L('clase', x[1]) : esc(gt(x[2]))).join(` ${t('o')} `) })}</small>` : ''; };

  function enemies(id) {
    const b = ((window.WIKI_EXT || {}).batallas?.b || []).find(x => x.id === id);
    if (!b || !b.e?.length) return [null, null];
    const n = {};
    b.e.forEach(e => { if (CLASSES[e.c]?.es) n[e.c] = (n[e.c] || 0) + 1; });
    const top = Object.entries(n).sort((x, y) => y[1] - x[1]).slice(0, 4).map(([k, v]) => `${L('clase', k)} ×${v}`);
    return [`${b.e.length}${top.length ? ' · ' + top.join(', ') : ''}`, b.lv && range(b.lv)];
  }
  const battles = c => c.battles.map(b => {
    const [en, lv] = enemies(b.id);
    return `<div class="cp-bat"><b><a href="${href('batalla', b.id)}">${esc(dt(b.es))}</a></b>${b.place ? `<small>${nk(gt(b.place), ['lugar'])}</small>` : ''}` +
      kvRows([[t('Objetivo'), b.objective && objective(dt(b.objective))], [t('Jefe'), b.boss && names(dt(b.boss), ['personaje'])], [t('Enemigos'), en], [t('Nivel'), lv]]) + '</div>';
  }).join('');

  function news(c) {
    const jr = n => (c.join_routes[n] ? ` (${c.join_routes[n].map(r => ROUTE_NAME[r]).join(', ')})` : '');
    const r0 = routeOf(c);
    // a barter whose payment cannot be had on this route and part is dropped too
    const sellable = (where, i) => !r0 || !(ITEMS[i]?.obtain || []).some(o => o.type === 'barter' && o.where === where) || (ITEMS[i].obtain || []).some(o => o.type === 'barter' && o.where === where && barterOk(o, r0, c.key));
    const shop = Object.entries(c.news.shop).filter(([where]) => spotAccess(spotOfLabel(where), c.route, c.key).ok).map(([where, ids]) => [where, ids.filter(i => sellable(where, i))]).filter(([, ids]) => ids.length).map(([where, ids]) =>  // places closed on this route and part are left out
      `<div class="cp-shop"><span>${spotA(spotOfLabel(where), dt(where))}</span>${list(ids.map(i => itemIco(i, 'ico') + L('objeto', i)))}</div>`).join('');
    return kvRows([
      [t('Se unen'), list(c.joins.map(n => nl(n) + esc(jr(n))))],
      [t('Se van'), list(c.leaves.map(nl))],
      [t('Desbloqueos'), list(unlocks(c).map(esc))],
      [t('La historia te da'), storyItems(c)],
      [t('Misiones nuevas'), list(c.news.quests.filter(q => questAvail(q.id, r0, c.key) && !c.closing.some(x => x.kind === 'mision' && x.id === q.id))
        .map(q => L('mision', q.id, q.es)))],  // the ones that also close this chapter are already in «Antes de que termine»
    ]) + (shop ? `<h4>${t('En tiendas y trueques')}</h4>${shop}` : '');
  }

  const prepare = c => c.prepare.map(p => {
    const x = CAPS[p.key];
    return `<li><b><a href="${capHash(p.key)}">${esc(capShort(x))} · ${esc(nm(x))}</a></b>` +
      kvRows([[t('Nivel'), x.level && range(x.level)]]) +  // the recruit's name links, so these rows are built here (kvRows escapes its labels)
      x.recruits.map(r => { const v = recruitCost(r.cost); return v ? `<div class="kv"><span>${t('Reclutar a {n}', { n: L('personaje', r.pid) })}</span><b>${v}</b></div>` : ''; }).join('') +
      kvRows(x.closing.length ? [[t('Cierra en ese capítulo'), `${x.closing.length}`]] : []) + '</li>';
  }).join('');

  const renown = c => c.renown_next.filter(r => r.unlocks.length).slice(0, 3).map(r =>
    `<li><b>${t('Prestigio {n}', { n: r.rank })}</b> <small>${t('({n} acumulado)', { n: num(r.cumulative) })}</small><ul>${r.unlocks.map(u => `<li>${esc(dt(u))}</li>`).join('')}</ul></li>`).join('');

  // [[PID_…]] / [[IID_…]] / [[spot id]] in priority text → link with icon
  const refLink = id => (id.startsWith('PID_') ? img(ico().face?.[id], 'ico ico-personaje') + L('personaje', id)
    : id.startsWith('IID_') ? itemIco(id, 'ico') + L('objeto', id) : L('lugar', id));
  // a priority that only says «close these missions» (all of them already in «Antes de que termine», nothing else to do) is left out
  const restates = (c, s) => { const q = [...s.matchAll(/«([^»]+)»/g)].map(m => m[1]), ms = c.closing.filter(x => x.kind === 'mision').map(x => x.es);
    return /^Cerrar\b/.test(s) && q.length > 0 && q.every(n => ms.includes(n)) && !/\[\[/.test(s) && !/ y /.test(s.slice(s.lastIndexOf('»') + 1)); };
  const priorities = c => c.priorities.filter(x => !restates(c, typeof x === 'string' ? x : x.es)).map(x => `<li>${esc(dt(typeof x === 'string' ? x : x.es)).replace(/\[\[([^\]]+)\]\]/g, (_, id) => refLink(id))}</li>`).join('');

  /** the game's own step list for the chapter and the items the story hands over (rutas.json, from the chapter scripts) */
  const RC = key => (window.WIKI_EXT || {}).rutas?.chapters?.[key] || {};
  const objectives = c => (RC(c.key).objectives || []).map(x => `<li>${esc(dt(x))}</li>`).join('');
  const storyItems = c => list((RC(c.key).items_got || []).map(nl));
  const block = (title, inner, tag = 'div') => (inner ? card(t(title), `<${tag} class="cp-list">${inner}</${tag}>`) : '');
  /** reference blocks folded (one tap, same page): the chevron pattern comes from shell.js */
  const folded = (title, inner, tag = 'div') => (inner ? `<details class="card"><summary><h3>${esc(t(title))}</h3></summary><${tag} class="cp-list">${inner}</${tag}></details>` : '');

  /** reading a chapter never changes the game (the context): a chapter that is not the game's offers to become it */
  const mine = c => {
    if (ctxChosen() && ctxGet().key === c.key) return '';
    const cs = capShort(CAPS[ctxGet().key] || {}), at = ctxChosen() ? t('Tu partida va por el {c}.', { c: isEn() ? cs : cs.replace(/^C/, 'c') }) + ' ' : '';
    return `<p class="mut cp-mine">${esc(at)}<button type="button" class="txtbtn" data-key="${esc(c.key)}">${t('Usar como mi capítulo')}</button></p>`;
  };

  /** #/cap with nothing picked: no pretend Cai game, the same invitation as the home page */
  const invite = () => `<h1>${t('Capítulo actual')}</h1><section class="card"><p>${t('Elige ruta y capítulo para ver qué hacer esta semana, a quién reclutar y qué no perderte.')}</p>` +
    `<p><button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog">${t('Elegir ruta y capítulo')}</button></p>` +
    `<p class="mut">${t('Primer capítulo de cada ruta:')} ${ROUTE_IDS.map(x => `<a href="${capHash(`${x}-1-1`)}">${esc(ROUTE_NAME[x])}</a>`).join(' · ')}.</p></section>`;

  function page(id) {
    const [r, p, n] = String(id || '').split('/');
    if (!r && !ctxChosen()) return invite();
    if (r && !ROUTE_IDS.includes(r) && !(r === 'comun' && Number(p) !== 1)) return notFound();  // a hand-typed route never lands on Cai
    const route = ROUTE_IDS.includes(r) ? r : ctxRoute(), key = r ? chapterFromPath(route || 'cai', p, n) : ctxGet().key, c = CAPS[key];
    const wr = c.route === 'comun' ? ctxRoute() : c.route;  // the week needs a route: a shared chapter uses the chosen one
    const fn = f => (wr && typeof window[f] === 'function' ? window[f] : null);
    // each team block once per render: the plan is shared by «Tiempo libre» and «Compras, herrería y plazos»
    const plan = fn('teamCtxPlan')?.(wr, key), dag = fn('teamWeekendSummary')?.(wr, key) || '', free = fn('teamFreeBlock')?.(wr, key, plan) || '', tips = fn('teamTipsBlock')?.(wr, key) || '';
    return header(c, chapNav(key, route)) + mine(c) +
      block('Antes de que termine', closing(c), 'ul') +
      // what to do in Dagsion this chapter (was Equipo › Semana): 0 taps from the front page
      (dag ? `<section class="card" id="eq-dagsion"><h3>${t('En Dagsion')}</h3>${dag}</section>` : '') +
      (free ? `<details class="card" id="cp-libre"><summary><h3>${t('Tiempo libre')}</h3></summary>${free}</details>` : '') +
      block('Prioridades de min-max', priorities(c) || (c.part >= 2 ? `<li class="mut">${t('Sin prioridades escritas aún para este capítulo. Guía de las Partes 2 y 3: <a href="#/guia/guerra-y-salvacion">Guerra y salvación</a>.')}</li>` : ''), 'ol') +
      block('Reclutables ahora', recruits(c), 'ul') +
      folded('Objetivos del juego', objectives(c), 'ol') +
      block('Batallas', battles(c)) +
      folded('Novedades', news(c)) +
      folded('Calendario', calendar(c)) +
      folded('Preparar para lo siguiente', prepare(c), 'ul') +
      folded('Prestigio', renown(c), 'ul') +
      travel(wr, c) +
      (fn('teamWeekBlock') ? `<details class="card" id="eq-semana"><summary><h3>${t('Compras, herrería y plazos')}</h3></summary>${window.teamWeekBlock(wr, key, plan)}</details>` : '') +
      (tips ? `<details class="card" id="eq-consejos"><summary><h3>${t('Trueques y dinero fácil')}</h3></summary>${tips}</details>` : '');
  }

  register({ id: 'cap', title: 'Capítulo', routes: ['cap'], render: page });  // #/ is the home page (pages/inicio.js)
})();
