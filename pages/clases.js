/* Fortune's Weave · classes: listing (#/clases?r=&arma=) and fichas #/clase/<jid>; each ficha opens on a summary with its key numbers
   (no click). Mounts are pages/monturas.js; skill fichas pages/habilidades.js. */
'use strict';
(() => {
  const META = (W.classes || {}).meta || {};
  const MM = () => (window.WIKI_EXT || {}).minmax || {};
  const DT = () => (window.WIKI_EXT || {}).detalle || {};
  const latin = s => /[A-Za-zÀ-ÿ]/.test(String(s || ''));  // drops untranslated internal names
  /** data text in the reader's language: the wiki's prose dictionary, else the game's own table */
  const dx = s => (s && isEn() && EN_DICT().ui?.[s] != null ? t(s) : gt(s));
  /** a research note without its sources (factOnly), in the reader's language */
  /** nl() in the reader's language: an entity's own name (nm), else the text through dx (nl() shows the game table, which lacks most names) */
  const nlx = n => { if (n == null) return ''; const s = String(n), ex = NAME.get(norm(s)), h = ex || NAME.get(norm(s.replace(/\s*\(.*\)\s*$/, '')));
    return ex && LBL[ex[0]] ? L(ex[0], ex[1]) : h ? `<a href="${href(h[0], h[1])}">${esc(dx(s))}</a>` : esc(dx(s)); };
  const fo = s => { const f = factOnly(s); return !f || !isEn() ? f : EN_DICT().ui?.[f] != null ? t(f) : factOnly(dx(s)); };
  const skillLinks = a => list((a || []).filter(s => latin(s.es)).map(s => L('habilidad', s.id, s.es)));
  const routeOfName = n => ROUTE_IDS.find(r => ROUTE_NAME[r] === n);
  const PART_TXT = (p, a, b) => list([p === 0 ? t('desde el prólogo') : p ? t('Parte {p}', { p }) : '', a ? (b && b !== a ? t('caps. {a}–{b}', { a, b }) : t('cap. {n}', { n: a })) : '']);
  /** every way to unlock a special class: [{route ('' = every route), part, html}] — quests (all routes), lessons and the other rows of unlock_sources */
  function unlocks(k, c) {
    const out = [];
    Object.values(QUEST).filter(q => (q.class_unlock || []).some(x => x.id === k)).forEach(q => (q.routes || ['comun']).forEach(r => out.push({
      route: r === 'comun' ? '' : r, part: q.part,
      html: `${t('Misión')} ${L('mision', q.id)} <small>(${list([PART_TXT(q.part, q.ch_from, q.ch_to), q.renown_req ? t('Prestigio {n}', { n: q.renown_req }) : ''])})</small>` })));
    (c.unlock_sources || []).filter(x => x.how && !/^Misión/.test(x.how)).forEach(x => out.push({
      route: routeOfName(x.route) || '', part: x.part ?? (/parte 3/i.test(x.route || '') ? 3 : null),
      html: x.link ? `<a href="${x.link}">${esc(sentence(dx(x.how)))}</a>` : /^Formación/.test(x.how) ? `<a href="#/instalaciones?ir=formacion">${esc(dx(x.how))}</a>` : esc(dx(x.how).replace(/^[^:]*\.bin:\s*/, '')) }));
    // Part 3 classes tied to a character (hidden_routes [name, '3部']) with no unlock row in the data
    if (!out.some(x => x.part === 3)) (c.route_part_conditions?.hidden_routes || []).filter(([n, p]) => p === '3部' && Object.values(CHARS).some(ch => ch.es === n))
      .forEach(([n]) => out.push({ route: '', part: 3, html: t('Ligada a {who}; cómo se abre, sin confirmar', { who: nlx(n) }) }));
    return out;
  }
  /** routes where a special class can be unlocked in Part 1, or null when it does not depend on the route */
  const classRoutes = (k, c) => {
    const u = unlocks(k, c);
    return u.length && u.every(x => x.part != null && x.part <= 1 && x.route) ? [...new Set(u.map(x => x.route))] : null;
  };
  const classIn = (k, c, r) => { const rs = classRoutes(k, c); return !r || !rs || rs.includes(r); };
  const renown = r => (r == null ? '' : typeof r === 'number' ? t('Prestigio {n}', { n: r }) : esc(dx(r)));
  const weapons = c => (c.weapons_usable || []).map(w => t(w));
  const MOUNT_KINDS = [...new Set(Object.values(CLASSES).map(c => c.mount_kind).filter(Boolean))];

  function listing(qs) {
    const r = listRoute(qs), arma = qs.arma || '', m = qs.m === 'pie' || MOUNT_KINDS.includes(qs.m) ? qs.m : '', u = qs.u === '1' ? '1' : '';
    const rows = Object.entries(CLASSES).filter(([k, c]) => classIn(k, c, r) && (!arma || (c.weapons_usable || []).map(armaKey).includes(arma)) &&
      (!m || (m === 'pie' ? !c.mount_kind : c.mount_kind === m)) && (!u || unlocks(k, c).length));
    const tiers = [...new Set(rows.map(([, c]) => c.tier))].sort((a, b) => a - b);
    const cards = tr => rows.filter(([, c]) => c.tier === tr).map(([k, c]) => `<a class="li-card" href="${href('clase', k)}">${img(ico().job?.[k], 'li-pic') || '<span class="li-pic"></span>'}` +
      `<span><b>${esc(nm(c))}</b><small>${esc(list([weapons(c).join(', '), dx(c.exam_requirements_es)]))}</small></span></a>`).join('');
    return `<h1>${t('Clases')}</h1>${guiaLink('clases', 'habilidades')}${routeChips('clases', qs, r)}${armaChips('clases', qs, arma)}` +
      chips('clases', qs, 'm', [['', 'A pie y montadas'], ['pie', 'A pie'], ...MOUNT_KINDS.map(x => [x, x])], m, 'Montura') +
      chips('clases', qs, 'u', [['', 'Todas'], ['1', 'Con desbloqueo especial']], u, 'Desbloqueo') +
      `<p class="mut">${plural(rows.length, 'clase', 'clases')}</p>` +
      (rows.length ? tiers.map(tr => `<h2>${esc(META.tiers?.[tr] ? nm(META.tiers[tr]) : t('Rango {n}', { n: tr }))}</h2><div class="li-grid">${cards(tr)}</div>`).join('') : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`);
  }

  /** how to get the class: availability on the context route (every route without a chosen one), unlock, licence and its Prestigio */
  function here(k, c, route) {
    const rs = classRoutes(k, c), tier = META.tiers?.[c.tier] || {};
    const all = unlocks(k, c), mine = all.filter(x => !route || !x.route || x.route === route);
    // a route with no way of its own still shows the other routes' ways, named
    const how = (mine.length ? mine : all).map(x => (x.route && (!route || !mine.length) ? t('Ruta de {r}', { r: ROUTE_NAME[x.route] }) + ': ' : '') + x.html);
    const rn = rs && rs.map(r => ROUTE_NAME[r]).join(` ${t('o')} `);
    return kvRows([
      [t('Disponible'), rs ? (!route ? t('En la Parte 1, solo en la ruta de {r}', { r: rn }) : rs.includes(route) ? t('Sí') : t('No en la Parte 1; solo en la ruta de {r}', { r: rn })) : (c.part3_only ? t('Solo en la Parte 3') : '')],
      [t('Cómo se desbloquea'), how.join('<br>')],
      [t('Licencia'), c.licence && ITEMS[c.licence] ? L('objeto', c.licence, c.licence_es) : ''],
      [t('Prestigio para la licencia'), renown(tier.renown)],
    ]);
  }

  function users(k, c) {
    const mm = MM();
    const best = (mm.chars || []).filter(x => x.best?.[0] === k || x.alt?.[0] === k)
      .map(x => `${L('personaje', x.pid, x.es)} <small>(${t(x.best?.[0] === k ? 'recomendada' : 'alternativa')})</small>`);
    const lines = (mm.lines || []).filter(l => (l.path || []).some(p => p[0] === k) || l.divine?.[0] === k)
      .map(l => li(esc(dx(l.line)), list((l.units || []).map(u => L('personaje', u[0], u[1])))));
    const defaults = Object.values(CHARS).filter(ch => (ch.p?.combat?.default_classes_p1 || []).includes(c.es) || ch.p?.combat?.class === k).map(ch => L('personaje', ch.id));
    return kvRows([[t('Mejor clase para'), list(best)], [t('La llevan de serie'), list(defaults)]]) + (lines.length ? `<h4>${t('Líneas de clase')}</h4>${ul(lines)}` : '');
  }

  function clase(k) {
    const c = CLASSES[k];
    if (!c) return notFound();
    const route = ctxChosen() ? ctxGet().route : '';
    const tiers = DT().class_tiers?.[k] || [];  // level-gated growth (Senda de la cuadriga…)
    // summary: weapons, movement, how to get it and the stat table (base, modifiers, growth), no click; tabs for the rest
    const head = fichaHead(img(ico().job?.[k], 'fi-pic'), `<a href="#/clases">${t('Clases')}</a>`, nm(c), META.tiers?.[c.tier] ? nm(META.tiers[c.tier]) : c.tier_es,
      (tx(c, 'desc') ? `<p>${esc(tx(c, 'desc'))}</p>` : '') + kvRows([
        [t('Armas'), list(weapons(c).map(w => `<a href="#/guia/armas">${esc(w)}</a>`))], [t('Movimiento'), c.mov != null ? String(c.mov) : ''],
        [t('Montura'), c.mount_kind && (MOUNTS[c.mount_default] ? L('montura', c.mount_default, c.mount_kind) : esc(gt(c.mount_kind))) + ` · <a href="#/monturas">${t('Monturas')}</a>`],
        [t('Monturas salvajes que puede llevar'), list((MOUNTS[c.mount_default]?.wild_same_kind || []).filter(r => MOUNTS[r]).map(r => L('montura', r)))],
        [t('A pie (desmontada)'), c.dismounted ? list([`${statName('Mov')} ${c.dismounted.mov}`, ...Object.entries(c.dismounted.flat_modifiers || {}).filter(([, v]) => v).map(([s, v]) => `${statName(s) || esc(s)} ${v > 0 ? '+' : ''}${v}`)]) : ''],
        [t('Bono de montura'), c.mount_bonus_factor > 1 ? t('×{n} (dobla lo que suma la montura)', { n: c.mount_bonus_factor }) : ''],
      ]) + here(k, c, route) +
      // statTable() translates its labels: the level-gated rows are fixed keys per tier («nv 35–44», «nv 45+»)
      statTable([c.class_base_stats, c.flat_modifiers, c.certification_floors, c.growth_modifiers, ...tiers.map(x => x.growth)],
        ['Base', 'Modificador', 'Mínimo al aprobar', 'Crecimiento %', ...tiers.map(x => `Crecimiento % (nv ${x.lv[0]}${x.lv[1] ? '–' + x.lv[1] : '+'})`)]) +
      (fo(c.caps_note) ? `<p class="mut">${esc(sentence(fo(c.caps_note)))}</p>` : '') +
      (DT().class_notes?.[k] || []).map(n => `<p class="mut">${esc(t(n.es))}</p>`).join(''));
    const charge = (c.onslaught || []).length ? `<div class="tw"><table><tr><th>${t('Carga')}</th><th>${t('Atq.')}</th><th>${t('Prec.')}</th><th>${t('Usos')}</th><th>${t('Alcance')}</th></tr>${c.onslaught.map(o =>
      `<tr><td>${SKILLS[o.id] ? L('habilidad', o.id, o.es) : esc(gt(o.es))}</td><td>+${o.atk}</td><td>${o.hit}</td><td>${o.uses}</td><td>${o.reach}</td></tr>`).join('')}</table></div>` : '';
    const mastery = (c.mastery_skill || []).filter(s => latin(s.es)).map(s => li(L('habilidad', s.id, s.es), s.desc_es && esc((isEn() && SKILLS[s.id]?.desc_en ? SKILLS[s.id].desc_en : dx(s.desc_es)).replace(/\s+/g, ' '))));
    return ficha(head, [
      ['req', 'Requisitos', kvRows([
        [t('Examen'), c.exam_requirements_es && esc(dx(c.exam_requirements_es))],
        [t('Nivel recomendado'), c.recommended_level ? String(c.recommended_level) : ''],
        [t('Penalización por rango que falta'), c.exam_penalty_per_missing_rank ? t('−{n} % de probabilidad', { n: c.exam_penalty_per_missing_rank }) : ''],
        [t('EXP de clase para dominarla'), c.class_exp_to_master ? String(c.class_exp_to_master) : ''],
        [t('Licencias y exámenes'), esc(sentence(fo(c.licence_note)))],
        [t('Clase previa'), c.tree_prev && CLASSES[c.tree_prev] ? L('clase', c.tree_prev) : ''],
        [t('Siguientes'), list((c.tree_next_all || []).filter(x => CLASSES[x]).map(x => L('clase', x)))],
        [t('No disponible para'), list((c.forbidden_persons || []).map(x => nlx(x)))],
      ])],
      ['habilidades', 'Habilidades', charge + kvRows([[t('Habilidades'), skillLinks(c.skills)], [t('Técnicas'), skillLinks(c.arts)], [t('De apoyo'), skillLinks(c.ally_skills)]]) +
        (mastery.length ? `<h4>${t('Habilidad maestra')}</h4>${ul(mastery)}${fo(c.mastery_note) ? `<p class="mut">${esc(sentence(fo(c.mastery_note)))}</p>` : ''}` : '')],
      ['usuarios', 'Quién la usa', users(k, c)],
    ]);
  }

  register({ id: 'clases', title: 'Clases', routes: ['clases', 'clase'], render: (id, qs) => (!id ? listing(qs || {}) : clase(id)) });
})();
