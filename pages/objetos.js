/* Fortune's Weave · items: listing (#/objetos?r=&arma=&s=) and ficha (#/objeto/<iid>): a summary (what it does, weapon numbers, main sources),
   then tabs for every source, its uses and notes. Sources are judged with core.js (srcOpen, rewardOpen, barterOk, partOk, ROUTE_CODE). */
'use strict';
(() => {
  /** «Dónde se consigue» groups, in this order: [title, obtain types] */
  const GROUPS = [['Tiendas', ['tienda', 'ambulante']], ['Trueques', ['barter']], ['Recompensas', ['recompensa']],
    ['Recolección y cultivo', ['búsqueda', 'cultivo (planta rara)', 'atraer animal (estiércol)']], ['Mazmorras', ['mazmorra', 'expedición a mazmorra', 'cofre']],
    ['Cajas', ['sorteo']], ['Equipo de personajes', ['equipo']], ['Botín de enemigos', ['botín enemigo']]];
  const META = (W.classes || {}).meta || {};
  /** data text in the reader's language: the wiki's prose dictionary, else the game's own table */
  const dx = s => (s && isEn() && EN_DICT().ui?.[s] != null ? t(s) : gt(s));
  /** a research note without its sources (factOnly), in the reader's language */
  const fo = s => { const f = factOnly(s); return !f || !isEn() ? f : EN_DICT().ui?.[f] != null ? t(f) : factOnly(dx(s)); };
  /** nlx() in the reader's language: an entity's own name (nm), else the text through dx (nlx() shows the game table, which lacks most names) */
  const nlx = n => { if (n == null) return ''; const s = String(n), ex = NAME.get(norm(s)), h = ex || NAME.get(norm(s.replace(/\s*\(.*\)\s*$/, '')));
    return ex && LBL[ex[0]] ? L(ex[0], ex[1]) : h ? `<a href="${href(h[0], h[1])}">${esc(dx(s))}</a>` : esc(dx(s)); };
  // i18n-ignore-next: battle labels in the data
  const partLbl = x => (x === 'Prólogo' || x === 'Parte 0' ? t('Prólogo') : /^Parte \d$/.test(x) ? t('Parte {p}', { p: x.slice(6) }) : x);
  const DT = () => (window.WIKI_EXT || {}).detalle || {};
  const BT = () => Object.fromEntries((((window.WIKI_EXT || {}).batallas || {}).b || []).map(b => [b.id, b]));
  const batLink = b => `<a href="${href('batalla', b.id)}">${esc(gt(b.t))}</a>`;
  const batWhen = b => list(b.ch.map(c => `${partLbl(c[0])}, ${t('cap. {n}', { n: c[1] })}`)) || (b.k === 'encuentro' ? t('encuentro en el mapa del mundo') : '');
  /** internal skills that gate who can use an item (game data): label + the recruits that carry them */
  const RULE_ES = { SID_血印持ち: 'portador del sello de sangre', SID_ゲスト: 'unidades invitadas', SID_騎乗禁止: 'unidades que no pueden montar' };
  const ruleText = s => {
    const who = (s.who || Object.values(CHARS).filter(c => (c.p?.combat?.forced_skills || []).some(f => f.id === s.id)).map(c => c.id)).filter(p => CHARS[p]).map(p => L('personaje', p));
    return (SKILLS[s.id]?.es ? L('habilidad', s.id) : esc(s.es ? gt(s.es) : t(RULE_ES[s.id] || 'condición especial'))) + (who.length ? ` (${list(who)})` : '');
  };
  const TASTES = ['dulce', 'picante', 'amargo', 'exótico'];
  /** ingredient block (game data): kind, flavour, quality, Banquete healing, the mounts that favour it and the inn dishes of that kind and flavour */
  function foodRows(it) {
    const f = it.food;
    if (!f) return '';
    const mounts = Object.entries(MOUNTS).filter(([, m]) => m.food?.type === f.type && m.food?.taste === f.taste).map(([r]) => L('montura', r));
    const fav = d => Object.values(CHARS).filter(c => (c.relations?.dish_fav || []).some(x => x.es === d.es)).map(c => L('personaje', c.id));
    const dishes = ((W.mech || {}).facilities?.meals?.dishes || []).filter(d => d.material === f.type && d.taste === f.taste)
      .map(d => `<a href="#/instalaciones?ir=comidas">${esc(nm(d))}</a>${fav(d).length ? ` <small>(${t('favorito de {who}', { who: list(fav(d)) })})</small>` : ''}`);
    return kvRows([
      [t('Ingrediente'), t('{type} · sabor {taste} · {stars} <small>(calidad {n} de 3)</small>', { type: esc(dx(f.type)), taste: esc(dx(f.taste)), stars: '★'.repeat(f.grade || 0), n: f.grade })],
      [t('Banquete'), f.hp_pct != null ? `<a href="#/turnos?ir=banquete">${t('cura un {n} % de PV', { n: f.hp_pct })}</a>` : ''],
      [t('Tipo y sabor favoritos de'), mounts.length ? `${list(mounts)} <small>(<a href="#/monturas?ir=establo">${t('Establo')}</a>)</small>` : ''],
      [t('Platos de la Posada del mismo tipo y sabor'), list(dishes)],
    ]);
  }
  /** refining chain of a weapon (weapon.forge), folded: each «+N» with its numbers, what it adds and its cost; only on the base weapon */
  function refining(it, k) {
    const isStep = Object.values(ITEMS).some(x => x.weapon?.forge?.to === k);
    if (isStep || !it.weapon?.forge) return '';
    const rows = [];
    for (let cur = it, n = 0; cur?.weapon?.forge && ITEMS[cur.weapon.forge.to] && n < 12; n++) {
      const f = cur.weapon.forge, nx = ITEMS[f.to], w = nx.weapon || {};
      const adds = [...Object.entries(w.stat_bonus || {}).map(([s, v]) => `${statName(s) || esc(s)} ${v > 0 ? '+' : ''}${v}`),
        ...(w.equip_skills || []).filter(x => !(it.weapon.equip_skills || []).includes(x) && SKILLS[x]).map(x => L('habilidad', x))];
      rows.push(`<tr><td>${L('objeto', f.to, '+' + (n + 1))}</td><td>${w.might} · ${w.hit} · ${w.crit}</td><td>${list(adds)}</td>` +
        `<td>${list(f.mats.map(m => `${m.n}× ${L('objeto', m.iid)}`))}</td><td>${f.part3 || f.mats.some(m => m.iid === ARMS_SOUL) ? t('Parte {p}', { p: 3 }) + (n === armsCap(k).cap ? ' · ' + t('tope P1: +{n}', { n }) : '') : ''}</td></tr>`);
      cur = nx;
    }
    return rows.length ? `<details><summary>${t('Refinado ({n} niveles)', { n: rows.length })}</summary><div class="tw"><table><tr><th>${t('Nivel')}</th><th>${t('Pot · Gol · Crít')}</th><th>${t('Efecto')}</th><th>${t('Material')}</th><th>${t('Solo en')}</th></tr>${rows.join('')}</table></div></details>` : '';
  }
  /** battles whose enemies carry the weapon (or a refined copy), grouped by route; with a route chosen, only that one */
  function carriers(k) {
    const base = k.replace(/＋[0-9０-９]+$/, ''), r = ctxRoute(), rn = r ? ROUTE_NAME[r] : '', by = {};
    for (const b of Object.values((window.WIKI_EXT || {}).batallas?.b || {})) {
      const who = [...new Set(b.e.filter(e => (e.it || []).some(x => String(x[0]).replace(/＋[0-9０-９]+$/, '') === base)).map(e => e.n))];
      if (!who.length) continue;
      const g = (b.r || []).filter(x => !rn || x === rn || !ROUTE_IDS.some(id => ROUTE_NAME[id] === x)).join(', ');
      if (rn && !(b.r || []).some(x => x === rn || !ROUTE_IDS.some(id => ROUTE_NAME[id] === x))) continue;
      (by[g || '—'] ??= []).push(li(`<a href="${href('batalla', b.id)}">${esc(gt(b.t))}</a>`, esc(list(who.map(n => gt(n))))));
    }
    const head = g => g.split(', ').map(x => (/^Parte (\d)$/.test(x) ? t('Parte {p}', { p: x.slice(-1) }) : x === 'Prólogo' ? t('Prólogo') : esc(x))).join(', ');  // i18n-ignore (data values)
    return Object.entries(by).map(([g, rows]) => `<h4>${head(g)}</h4>${ul(rows)}`).join('');
  }
  /** fixed dungeon chests holding the item, as obtain rows; a two-item chest holds the Part 1 item first, the Part 3 one second */
  const chests = k => Object.entries(DT().chests || {}).flatMap(([sp, rows]) => rows.filter(r => r.includes(k))
    .map(r => ({ type: 'cofre', spot: sp, part: r.length < 2 ? 0 : r[0] === k ? 1 : 3 })));
  const STEP = 100;  // cards shown per «Mostrar más»
  const clean = s => String(s ?? '').replace(/\{[0-9a-f:]*\}/gi, '');  // game text markup tags
  const sold = (it, r) => (it.chapters || []).some(k => k.startsWith(r + '-') || k.startsWith('comun-'));
  const inRoute = (it, r) => sold(it, r) || (it.used_by?.recruits || []).some(x => x.route === r);

  function listing(qs) {
    const r = listRoute(qs), arma = qs.arma || '', sec = qs.s || '', sa = TASTES.includes(qs.sa) ? qs.sa : '', q = ['1', '2', '3'].includes(qs.q) ? +qs.q : 0;
    const all = Object.entries(ITEMS);  // items without an official Spanish name (enemy-only, cutscene props) are left out below
    const sections = [...new Set(all.map(([, i]) => i.section).filter(Boolean))];
    const rows = all.filter(([, i]) => i.es && (!r || inRoute(i, r)) && (!arma || (i.weapon && armaKey(i.weapon.type) === arma)) && (!sec || i.section === sec) &&
      (!sa || i.food?.taste === sa) && (!q || i.food?.grade === q));
    const food = /^Ingredientes/.test(sec) || sa || q;  // flavour and quality chips only where they mean something
    return `<h1>${t('Objetos')}</h1>${guiaLink('armas', 'refinado')}${routeChips('objetos', qs, r)}${armaChips('objetos', qs, arma)}` +
      chips('objetos', qs, 's', [['', 'Todas las secciones'], ...sections.map(x => [x, x])], sec, 'Sección') +  // chips() translates the labels
      (food ? chips('objetos', qs, 'sa', [['', 'Todos los sabores'], ...TASTES.map(x => [x, x[0].toUpperCase() + x.slice(1)])], sa, 'Sabor') +
        chips('objetos', qs, 'q', [['', 'Toda calidad'], ['1', '★'], ['2', '★★'], ['3', '★★★']], q ? String(q) : '', 'Calidad') : '') +
      resultCount(rows.length, 'objeto', 'objetos', r ? ' ' + t('en tiendas o reclutamientos de la ruta de {r}', { r: ROUTE_NAME[r] }) : '') +
      (rows.length ? `<div class="li-grid">${rows.map(([k, i], n) => `<a class="li-card" href="${href('objeto', k)}"${n >= STEP ? ' hidden' : ''}>${img(ico().item?.[k], 'li-pic') || '<span class="li-pic"></span>'}` +
        `<span><b>${esc(nm(i) || i.jp)}</b><small>${esc(list([dx(i.section), i.food && `${dx(i.food.taste)} ${'★'.repeat(i.food.grade || 0)}`, i.price ? gold(i.price) : '']))}</small></span></a>`).join('')}</div>`
        : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`) +
      (rows.length > STEP ? `<button type="button" class="fi-btn li-more" data-more="${STEP}">${t('Mostrar más')}</button>` : '');
  }

  /** weapon numbers (the item ficha's summary) */
  function weaponRows(it, k) {
    const w = it.weapon;
    return w ? kvRows([
      [t('Tipo'), w.type && `<a href="#/guia/armas">${esc(dx(w.type))}</a>`],
      [t('Poder · Golpe · Crítico'), `${w.might} · ${w.hit} · ${w.crit}`],
      [t('Esquiva · Evitar crítico'), w.avoid || w.dodge ? `${w.avoid || 0} · ${w.dodge || 0}` : ''],
      [t('Peso · Alcance · Usos'), `${w.weight} · ${[...new Set(w.range || [])].join('–')} · ${w.uses ?? '∞'}`],
      [t('Rango'), list(Object.entries(w.rank || {}).map(([s, v]) => `${esc(dx(META.skill_index?.[s] || s))} ${esc(META.rank_letters?.[v] || v)}`))],
      [t('Bonos'), list(Object.entries(w.stat_bonus || {}).map(([s, v]) => `${statName(s) || esc(s)} ${v > 0 ? '+' : ''}${v}`))],
      [t('Habilidades'), list((w.equip_skills || []).filter(s => SKILLS[s]).map(s => L('habilidad', s)))],
    ]) : '';
  }
  /** who may (or may not) use the item */
  function useRules(it) {
    return kvRows([[t('Solo pueden usarlo'), list((it.required_skills || []).map(ruleText))], [t('No pueden usarlo'), list((it.forbidden_skills || []).map(ruleText))]]);
  }

  /* ---------------- where to get it: one line per source, grouped, judged by the context route like Equipo (itemSources) ---------------- */
  const LORD_CODE = Object.fromEntries(Object.entries(ROUTE_CODE).map(([r, c]) => [c, r]));  // KAI → cai (Part 1 dungeon conditions)
  const unnamed = w => !w || /^Dng_/.test(w);  // dungeon maps without a Spanish name (not on the map)
  // sample lottery groups (サンプル) are test data; a search table with no place on the map («Andrómeda Silente») cannot be reached: not a source
  const isTest = x => /サンプル/.test(x.group || '') || (x.type === 'búsqueda' && x.spot && !SPOTS[x.spot]);
  /** a shop row's window in words; with a chosen route the route conditions go (they are applied, not described) */
  const ORD = c => (/篇$/.test(c) ? 0 : /部/.test(c) ? 1 : 2);  // route, part, then chapter: «salvo ruta de Cai, Parte 1, caps. 4–5»
  const span = (r, route) => conds((r.conds || []).filter(c => !(route && /篇$/.test(c))).sort((a, b) => ORD(a) - ORD(b)))
    .replace(/desde el cap\. (\d+) · hasta el cap\. (\d+)/, 'caps. $1–$2').replace(/ · /g, ', ');
  /** rows of a shop or barter that the route allows (all rows without a chosen route) */
  const routeRows = (x, route) => (x.rows || []).filter(r => !route || routeOk(r.conds, route));
  /** '' when the source is open on `route` from chapter `key` on (the rule of itemSources/payOk), else why not */
  function closed(x, route, key) {
    const c = CAPS[key] || {}, rn = ROUTE_NAME[route];
    if (x.type === 'botín enemigo') {
      const b = BT()[/\(([^()\s]+)\)$/.exec(x.where || '')?.[1]];
      if (b?.r.length && !b.r.some(n => n === rn || ['Prólogo', 'Parte 2', 'Parte 3'].includes(n))) return t('no está en la ruta de {r}', { r: rn });  // i18n-ignore
    }
    if (x.rows?.length) {
      const rr = routeRows(x, route);
      if (!rr.length) return t('no está en la ruta de {r}', { r: rn });
      if (!rr.some(r => srcOpen(r.conds, route, key))) return t('no en tu capítulo: {when}', { when: list(rr.map(r => span(r, route)).filter(Boolean)) || t('otra parte') });
    }
    if (!partOk(x, key)) return t('no en tu capítulo: {when}', { when: t('Parte {p}', { p: x.part }) });
    if (!caiSrcOk(x, route, key)) return t('no está en la ruta de {r}', { r: rn });
    if (['mazmorra', 'expedición a mazmorra', 'cultivo (planta rara)'].includes(x.type)) {
      const codes = (x.conds || []).filter(Array.isArray).map(z => z[0]);
      if (c.part === 1 && !x.type.startsWith('cultivo') && !codes.length) return t('solo después de la Parte 1');
      if (c.part === 1 && codes.length && !codes.includes(ROUTE_CODE[route])) return t('no está en la ruta de {r}', { r: rn });
    }
    if (x.type === 'búsqueda' && !routeOk(x.condition || [], route)) return t('no está en la ruta de {r}', { r: rn });
    if (x.type === 'recompensa' && (!rewardOpen(x.when, route, key) || (x.quest && !questAvail(x.quest, route)))) return t('la misión no está abierta en tu ruta');
    const sp = x.type === 'cofre' ? x.spot : x.type === 'mazmorra' || x.type === 'cultivo (planta rara)' ? spotOfLabel(x.where) : sourceSpot(x);
    if (!spotAccess(sp, route, key).ok) return t('sin acceso en la Parte {p} de {r}', { p: c.part, r: rn });
    if (!barterOk(x, route, key)) return t('el pago no se consigue en tu ruta');
    return '';
  }
  /** [place html, detail html] of one source */
  function source(x, it, route) {
    const sp = x.type === 'cofre' ? x.spot : sourceSpot(x) || (x.spot && SPOTS[x.spot] ? x.spot : null);
    const txt = String(x.where || '').replace(/\s*\(SC\d+_\d+\)/, ''), mer = /^mercader ambulante de (.+)$/i.exec(txt);
    let where = sp && x.type !== 'ambulante' ? L('lugar', sp, x.type === 'cofre' ? null : x.where ? dx(x.where) : null) : x.quest && QUEST[x.quest] ? L('mision', x.quest)
      : mer ? esc(t('Mercader de {x}', { x: gt(mer[1]) })) : nlx(txt);
    const det = [];
    if (x.type === 'tienda' || x.type === 'ambulante' || x.type === 'barter') {
      const rr = routeRows(x, route).length ? routeRows(x, route) : x.rows || [], r0 = rr.find(r => r.stock);
      // each shelf has its own discount: the price paid is the base price minus it (Anna's Notebook, economy)
      const cost = r => { const p = r.price ?? x.price ?? it.price, d = r.discount; return x.pay ? '' : d ? `${gold(Math.round(p * (100 - d) / 100))} (−${pct(d)})` : p ? gold(p) : ''; };
      const one = new Set(rr.map(cost)).size <= 1, spans = [...new Set(rr.map(r => span(r, route)).filter(Boolean))];
      if (x.pay) det.push(t('a cambio de {items}', { items: list(x.pay.map(p => `${p.n}× ${L('objeto', p.id, p.es)}`)) }));
      if (one) det.push(rr.length ? cost(rr[0]) : x.pay ? '' : gold(x.price ?? it.price), spans.join(' / '));
      else det.push(rr.map(r => (span(r, route) ? `${span(r, route)}: ${cost(r)}` : cost(r))).join(' / '));
      if (r0) det.push(t('{n} en existencias', { n: r0.stock }) + (r0.restock_per_chapter ? ', ' + t('+{n} por capítulo', { n: r0.restock_per_chapter }) : ''));
      if (x.type === 'ambulante') { const at = (W.map?.roaming_merchants?.[x.shop_id]?.spawn_spots || []).filter(s => SPOTS[s]).map(s => L('lugar', s)); if (at.length) det.push(t('recorre {places}', { places: list(at) })); }
    } else if (x.type === 'cofre') {
      where = t('Cofre en {where}', { where }); if (x.part) det.push(t('Parte {p}', { p: x.part }));
    } else if (x.type === 'sorteo') {
      const box = /^abrir (.+)$/.exec(x.what || '')?.[1];
      where = box ? nlx(box) : x.what ? esc(dx(x.what)) : t('Caja'); det.push(t('al abrirla, {pct}', { pct: pct(x.pct) }));
    } else if (x.type === 'mazmorra' || x.type === 'expedición a mazmorra') {
      if (unnamed(x.where)) where = t('Mazmorra sin nombre en el mapa');
      else if (x.type === 'expedición a mazmorra') where = t('Expedición a {where}', { where });
      det.push(pct(x.pct));
      const at = (x.conds || []).filter(z => Array.isArray(z) && LORD_CODE[z[0]] && (!route || LORD_CODE[z[0]] === route)).map(z => `${route ? '' : ROUTE_NAME[LORD_CODE[z[0]]] + ' '}${t('desde el cap. {n}', { n: z[2] })}`);
      if (at.length) det.push(list(at));
    } else if (x.type === 'equipo') {
      where = CHARS[x.pid] ? L('personaje', x.pid) : nlx(x.es);
      det.push(t(x.kind === 'personal' ? 'objeto personal' : 'equipo inicial'), /^PID_SC00_/.test(x.pid) ? t('en el prólogo') : '');
    } else if (x.type === 'botín enemigo') {
      // the map id names the battle; the «cap. N» of the raw text is the map number, not the chapter
      const b = BT()[/\(([^()\s]+)\)$/.exec(x.where || '')?.[1]], m = /^(.+?) cap\. (\d+)$/.exec(txt);
      where = b ? batLink(b) : x.where === 'encuentros del mapa del mundo' ? `<a href="#/batallas?k=encuentro">${t('Encuentros en el mapa del mundo')}</a>`
        : esc(m ? `${partLbl(m[1])} ${t('cap. {n}', { n: m[2] })}` : dx(txt));
      det.push(b && batWhen(b), x.unit && !JP_ANY.test(x.unit) ? t('lo suelta {who}', { who: nlx(x.unit) }) : '', x.pct != null && x.pct < 100 ? pct(x.pct) : '', x.part === 3 ? t('Parte {p}', { p: 3 }) : '');
    } else {
      if (x.pct != null) det.push(pct(x.pct));
      if (x.rare) det.push(t('raro')); if (x.first_time_only) det.push(t('solo la primera vez'));
      if (x.condition?.length) det.push(esc(conds(x.condition)));
      if (x.type === 'recompensa' && !x.quest && x.what) where = esc(dx(x.what));
    }
    if (x.unit && x.type !== 'botín enemigo') det.push(t('lo lleva {who}', { who: esc(dx(x.unit)) }));
    if ((x.animals || []).length) det.push(list(x.animals.map(esc)));
    if (x.note && fo(x.note)) det.push(esc(fo(x.note)));
    if (!route && !caiSrcOk(x, '', 'cai-1-1')) det.push(t('solo Cai'));  // no route picked: farms and the Lure are Cai's in Part 1
    // a name left in Japanese is dropped on screen (jpHtml): fall back to the row's text, then to a plain label
    const named = h => h && !JP_ANY.test(h.replace(/<[^>]+>/g, '')) && h.replace(/<[^>]+>/g, '').trim();
    return [named(where) ? where : named(esc(dx(x.what))) ? esc(dx(x.what)) : t('Lugar sin datos'), det.filter(Boolean).join(' · ')];
  }
  /** drops listed on battle units (pd, pd3, random loot groups) whose battle the item's own drop rows do not name, as obtain rows */
  function battleDrops(it, k) {
    const D = (window.WIKI_EXT || {}).batallas || {}, named = (it.obtain || []).map(x => x.where || '').join(' ');
    return (D.b || []).filter(b => !named.includes(`(${b.id})`)).flatMap(b => b.e.flatMap(u => [
      ...(u.pd || []).includes(k) ? [{ unit: u.n }] : [], ...(u.pd3 || []).includes(k) ? [{ unit: u.n, part: 3 }] : [],
      ...(D.loot?.[u.rl] || []).filter(([i]) => i === k).map(([, p]) => ({ unit: u.n, pct: p }))].map(x => ({ type: 'botín enemigo', where: `(${b.id})`, ...x }))));
  }
  /** all sources as [group title, [[off, html]]]; without a chosen route nothing is judged (the library view) */
  function sources(it, k) {
    const chosen = ctxChosen(), { route, key } = ctxGet();
    const all = [...(it.obtain || []).filter(x => !isTest(x)), ...chests(k), ...(it.held_by || []).map(h => ({ type: 'equipo', ...h })), ...battleDrops(it, k)];
    return GROUPS.map(([ti, types]) => {
      const seen = new Set();
      const rows = all.filter(x => types.includes(x.type)).map(x => {
        const why = chosen ? closed(x, route, key) : '', [w, d] = source(x, it, chosen ? route : '');
        return { off: why ? 1 : 0, w, d, html: `<li${why ? ' class="off"' : ''}><b>${w}</b>${d ? `<small>${d}</small>` : ''}${why ? `<small class="why">${esc(why)}</small>` : ''}</li>` };
      }).filter(r => !seen.has(r.html) && seen.add(r.html)).sort((a, b) => a.off - b.off);
      return [ti, rows];
    }).filter(g => g[1].length);
  }
  const obtain = groups => groups.map(([ti, rows]) => `<h4>${esc(t(ti))}</h4><ul class="fi-list">${rows.map(r => r.html).join('')}</ul>`).join('');
  const plain = h => h.replace(/<[^>]+>/g, '');  // a place inside the summary line: text, the links are in the tab
  /** the summary line: the first sources still open from the context chapter (same rule as Equipo's itemSources), or each group's first places */
  function mainSources(groups) {
    if (ctxChosen()) {
      const open = groups.flatMap(([, rows]) => rows.filter(r => !r.off));
      return [t('Dónde conseguirlo en tu partida'), open.length ? esc(list(open.slice(0, 3).map(r => plain(r.w) + (r.d ? ` · ${plain(r.d.split(' · ')[0]).replace(/ \(−[\d.,]+ ?%\)/, '')}` : '')))) +
        (open.length > 3 ? ' ' + t('y {n} más', { n: open.length - 3 }) : '') : t('Ninguna fuente abierta desde tu capítulo')];
    }
    return [t('Dónde conseguirlo'), groups.map(([ti, rows]) => esc(`${t(ti)}: ${list(rows.slice(0, 2).map(r => plain(r.w)))}${rows.length > 2 ? ' ' + t('y {n} más', { n: rows.length - 2 }) : ''}`)).join('<br>')];
  }
  const recruitsHere = (it, k, route) => list((it.used_by?.recruits || []).filter(x => x.route === route).map(x => {
    const n = CHARS[x.pid]?.routes?.[route]?.cost?.items?.find(i => i.id === k)?.n;
    return L('personaje', x.pid) + (n > 1 ? ` (${n})` : '');
  }));

  function uses(it, route) {
    const u = it.used_by || {}, g = it.gifts_p1 || {};
    const byPid = {};
    (u.recruits || []).forEach(x => (byPid[x.pid] = byPid[x.pid] || []).push(x.route));
    const rec = Object.entries(byPid).sort((a, b) => b[1].includes(route) - a[1].includes(route))
      .map(([pid, rs]) => `${L('personaje', pid)} <small>(${routesFirst(route).filter(r => rs.includes(r)).map(r => ROUTE_NAME[r]).join(', ')})</small>`);
    const forge = (u.forge || []).map(f => `<li>${esc(dx(f.what).replace(/^(forjar|Forge) /, ''))} <small>×${f.n}</small></li>`);
    const other = (it.needed_for || []).filter(n => !/reclutamiento|trueque|\(web\)/.test(n.type || '')).map(n => `${esc(dx(n.what))}${n.n ? ` ×${n.n}` : ''}`);
    return kvRows([
      [t('Reclutamiento'), list(rec)],
      [t('Trueque'), list((u.barters || []).map(b => `${t('{n}× por {item}', { n: b.n, item: L('objeto', b.item) })}${b.where ? ` <small>(${esc(dx(b.where))})</small>` : ''}`))],
      [t('Otros usos'), list(other)],
      [t('No vender'), list([...new Set((it.dont_sell || []).map(x => String(x).replace(/\s*\(web\)$/, '')))].map(x => esc(dx(x))))],
      [t('Regalo favorito de'), list((u.gift_fav || []).map(p => L('personaje', p)))],
      [t('Gusta a'), list((u.gift_like || []).map(p => L('personaje', p)))],
      [t('No gusta a'), list((g.dislikes || []).map(x => nlx(x)))],
    ]) + (forge.length ? `<details><summary>${t('Forja ({n})', { n: forge.length })}</summary><ul class="fi-list">${forge.join('')}</ul></details>` : '');
  }

  /** Esquirla del eco (ruta de Dietrich): the stones the Respondedora's enemies drop, the Part 2 gift, and what it pays for → [where, uses] */
  function shard(k) {
    const D = (window.WIKI_EXT || {}).sistemas?.dietrich || {}, S = D.shard;
    if (!S || S.id !== k || !S.stones) return ['', ''];
    const p3 = S.stones.filter(x => x.part3), sys = `<a href="#/senores?ir=dietrich">${t('Sistemas de Dietrich')}</a>`;
    return [kvRows([
      [t('Enemigos de la Respondedora'), `${list(S.stones.filter(x => !x.part3).map(x => {
        const y3 = p3.find(y => y.es === x.es);
        return `${L('objeto', x.id, x.es)} = ${x.n}${y3 ? ` <small>(${L('objeto', y3.id, t('{n} en la Parte 3', { n: y3.n }))})</small>` : ''}`;
      }))} · ${sys}`],
      [t('Al empezar la Parte 2'), S.p2_gift ? t('{n} en la ruta de Dietrich', { n: S.p2_gift }) : ''],
    ]), kvRows([
      [t('Potenciar técnicas'), `${list((S.enhance || []).map(([n, c]) => `${t('{n} por mejora', { n })} <small>(${plural(c, 'técnica', 'técnicas')})</small>`))} · ${sys}`],
      [t('Transmitir secreto'), list((D.teach || []).map(x => `${SKILLS[x.sid] ? L('habilidad', x.sid, x.es) : esc(gt(x.es))} ${x.cost}`))],
    ]) + `<p class="mut">${t('Ruta de Dietrich; en la Parte 3, con Dietrich en el ejército.')}</p>`];
  }

  /** cursed treasures (W.ignicion malditos): their curse value, which moves a lord's ignition gauge */
  const cursed = k => { const m = (window.WIKI_EXT || {}).ignicion?.malditos.find(x => x.iid === k);
    return m ? `${t('Maldición {n}', { n: m.contaminacion })} · <a href="#/guia/objetos-malditos">${t('qué hace')}</a>` : ''; };
  function objeto(k) {
    const it = ITEMS[k];
    if (!it) return notFound();
    const route = ctxRoute(), groups = sources(it, k), [shardGot, shardPay] = shard(k);
    // the summary carries what most visits want (what it does, weapon numbers, where to get it): no click; tabs only for the rest
    const head = fichaHead(img(ico().item?.[k], 'fi-pic'), `<a href="#/objetos">${t('Objetos')}</a>`, nm(it) || it.jp, dx(it.section),
      (tx(it, 'effect') ? `<p>${esc(clean(tx(it, 'effect')).replace(/\s+/g, ' '))}</p>` : '') + weaponRows(it, k) + useRules(it) + foodRows(it) + kvRows([
        [t('Tier'), (x => (x ? `<span class="cp-tag">${x.tier}</span> <a href="#/mejores-armas">${t('Mejores armas')}</a>` : ''))(it.weapon && armsTier(k, ctxChosen() ? CAPS[ctxGet().key]?.part || 1 : 1))],
        [t('Uso'), it.use_es && esc(dx(it.use_es))],
        [t('Precio · venta'), it.price || it.sell ? `${it.price ? gold(it.price) : '—'} · ${it.sell ? gold(it.sell) : '—'}` : ''],
        groups.length ? mainSources(groups) : null,
        [t('Lo piden para reclutar'), ctxChosen() ? recruitsHere(it, k, route) : ''],
        [t('Categorías de regalo'), list((it.gift_categories || []).map(x => esc(dx(x.es))))],
        [t('Tesoro maldito'), cursed(k)],
      ]) + refining(it, k));
    return ficha(head, [
      ['conseguir', 'Dónde se consigue', shardGot + obtain(groups)],
      ['usos', 'Para qué sirve', shardPay + uses(it, route)],
      ['enemigos', 'Enemigos que la llevan', it.weapon ? carriers(k) : ''],
      ['notas', 'Notas', ul((it.web_notes || []).filter(n => factOnly(n.es)).map(n => li(esc(fo(n.es)), n.where && esc(dx(n.where)))))],
    ]);
  }

  register({ id: 'objetos', title: 'Objetos', routes: ['objetos', 'objeto'], render: (id, qs) => (id ? objeto(id) : listing(qs || {})) });
})();
