/* Fortune's Weave · characters: listing (#/personajes?r=&arma=) and ficha (#/personaje/<pid>): a summary with the route line and the stat table,
   then tabs (your run, build, supports). Uses teamNow, teamPlan, teamBuildHtml, teamMountsByBuild (equipo-*.js) and frasesBlock (guion.js). */
'use strict';
/** class and mount limits of a character (W.extras limites) as kv rows, or null when the game sets none; Builds uses it too */
function charLimits(pid) {
  const x = (window.WIKI_EXT || {}).extras?.limites?.[pid];
  if (!x) return null;
  return [[t('No puede ser'), list(x.clases.map(([j, es, when]) => (CLASSES[j] ? L('clase', j, es) : esc(gt(es))) + (when ? ` <small>(${esc(dataTx(when))})</small>` : '')))],
    [t('No puede montar'), x.sin_montura ? (x.sin_montura === 'siempre' ? t('Nunca va montado') : t('Sin montura {m}', { m: esc(dataTx(x.sin_montura)) })) : '']];
}
(() => {
  const dx = dataTx;
  const AP = () => (window.WIKI_EXT || {}).apoyos || {};
  const MM = () => (window.WIKI_EXT || {}).minmax || {};
  const DT = () => (window.WIKI_EXT || {}).detalle || {};
  // i18n-ignore-next: the game's Spanish abbreviations, shown through gt()
  const BONUS = { 物攻: 'At fís', 魔攻: 'At mág', 物防: 'Agu', 魔防: 'Rsl', 命中: 'Gol', 回避: 'Esq', 必殺: 'Crí', 必避: 'Evit', 攻速: 'VA' };
  const face = (pid, cls) => img(ico().face?.[pid], cls) || `<span class="${cls}"></span>`;
  /** play run '1/1–10/6/1449' → sortable month*100+day of its start */
  const playStart = x => { const m = String(x.part1 || '').match(/^(\d+)\/(\d+)/); return m ? +m[2] * 100 + +m[1] : 9999; };

  /** route entry {join_key|recruit_key, cost} → "Se une en Cap. 1-4" (link or plain text) */
  /* class at join: an unrecruited character levels up on their own along the game's class-by-level path, so they join with the
     class of their level then; the game sets a level range for each route's chapter (CAPS[key].level), the join level is about that */
  const clsL = es => { const k = Object.keys(CLASSES).find(id => CLASSES[id].es === es); return k ? L('clase', k) : esc(gt(es)); };
  const pathTxt = c => lvPath(c.id).map(([lv, , es]) => `${t('Nv {n}', { n: lv })} ${clsL(es)}`).join(' → ');
  const scouted = c => ROUTE_IDS.some(r => scoutedOn(c.id, r));
  /** «Si se recluta en Cap. 1-4: Nv 3–5 aprox., Plebeyo o Soldado» (core.js joinAt) */
  const joinClass = (c, route, key) => {
    const j = joinAt(c.id, route, key);
    return j ? t('Si se recluta en {c}: Nv {a}–{b} aprox., {k}', { c: esc(capShort(j.cap)), a: j.lv[0], b: j.lv[1], k: j.classes.map(x => clsL(x[2])).join(` ${t('o')} `) }) : '';
  };
  const routeTxt = (x, plain) => {
    const k = x.join_key || x.recruit_key, ch = CAPS[k] ? (plain ? esc(capShort(CAPS[k])) : chapLink(k)) : '';
    return ch ? t(x.join_key ? 'Se une en {c}' : 'Reclutable desde {c}', { c: ch }) : '';
  };
  /** recruit petitions of a character, every route's version (`routes` tells them apart) */
  const recruitQuests = c => Object.values(QUEST).filter(q => q.kind === 'Petición (reclutamiento)' && (q.giver === c.es || q.id.startsWith(`SQID_${c.jp}交渉`)));
  const weapons = c => (CLASSES[c.p?.combat?.class]?.weapons_usable || []).map(armaKey);
  const ORDER = W.meta?.order || [];
  const rank = c => { const i = ORDER.indexOf(c.id); return i < 0 ? 999 + (c.serial ?? 0) : i; };
  const COM = () => `<span class="gu-com" title="${esc(t('Dato de la comunidad'))}"></span>`;
  const LORD_PID = { cai: 'PID_カイ', dietrich: 'PID_ディートリヒ', theodora: 'PID_セオドラ', leda: 'PID_レダ' };
  const isLord = c => Object.values(LORD_PID).includes(c.id);
  const hasRoutes = c => Object.keys(c.routes || {}).length > 0;
  /** Parts 2–3 joiners: how they join (W.rutas join23) */
  const join23 = c => ((window.WIKI_EXT || {}).rutas?.join23 || []).find(j => j.pid === c.id);
  /** units that never join (Anna, Aurora): the battles they fight in as allies */
  const guestBattles = c => ((window.WIKI_EXT || {}).batallas?.b || []).filter(b => (b.a || []).some(u => u.n === c.es));
  function guestNote(c) {
    const bs = guestBattles(c);
    return bs.length ? t(c.gender === 'f' ? 'No se une al ejército: lucha como aliada en {b}.' : 'No se une al ejército: lucha como aliado en {b}.', { b: list(bs.map(b => `<a href="${href('batalla', b.id)}">${esc(gt(b.t))}</a>` +
      ` <small>(${list([b.k === 'desvío' ? t('desvío') : '', t(b.r.length > 1 ? 'rutas de {r}' : 'ruta de {r}', { r: esc(b.r.join(', ')) }), t('Parte {p}', { p: b.p })])})</small>`)) })
      : t('No se une al ejército en ninguna ruta ni parte, y no aparece como unidad en ninguna batalla.');
  }
  /** a route the character does not play: the lord's Part 3 return (TUTO_絆参戦), or plainly absent */
  function absent(c, route) {
    if (!isLord(c)) return t('No se une en esta ruta');
    const d = Object.values(PARA).find(x => x.lord === c.es && (!route || x.routes?.[route]));
    return t(route ? 'No juega la Parte 1 de esta ruta.' : 'No juega la Parte 1 de las otras rutas.') + ' ' +
      (d ? t('En la Parte 3 se une si completaste la Parte 2 de su ruta; si solo hiciste su desvío ({d}), presta una {a}.', { d: L('desvio', d.id), a: `<a href="${href('tutorial', 'TUTO_絆参戦')}">${t('ayuda limitada')}</a>` })
        : t('En la Parte 3 se une si completaste la Parte 2 de su ruta.'));
  }
  /** game data of the route's recruit row: the Desvío or tournament result after which the game hints at the recruit */
  const HINT_ROUTE = { Cai: 'cai', Dietrich: 'dietrich', Theodora: 'theodora', Leda: 'leda' };
  function recruitHint(c, route) {
    const row = (c.recruit?.rows || []).find(x => HINT_ROUTE[x.route_es] === route);
    const parts = (row?.hint || []).map(f => {
      let m = f.match(/^(.+)外伝_クリア$/);
      if (m) { const d = PARA[`SSID_${m[1]}外伝`], w = d?.routes?.[route]; return w ? t('terminar el desvío {d} (se acepta del {a} al {b})', { d: L('desvio', d.id), a: fechaMD(w.accept_from), b: fechaMD(w.accept_to) }) : ''; }
      m = f.match(/大剣闘祭で敗退した_(.+)$/);
      const who = m && Object.values(CHARS).find(x => x.jp === m[1]);
      return who ? t('que {c} quede fuera del Gran Torneo', { c: L('personaje', who.id) }) : '';
    }).filter(Boolean);
    return parts.length ? t('El juego insinúa su reclutamiento tras {x}.', { x: parts.join(` ${t('o')} `) }) : '';
  }
  const need = (c, r) => [c.routes?.[r]?.cost && recruitCost(c.routes[r].cost), recruitHint(c, r)].filter(Boolean).join('. ');

  function listing(qs) {
    const r = listRoute(qs), arma = qs.arma || '', team = r ? teamNow(r) : null, onlyTeam = team && qs.eq === '1';
    // with a route: lord, then by the chapter they join or can be recruited (story joiners first on a tie), as in the Equipo grid
    const lordFirst = c => (r && LORDS[r] === c.id ? 0 : 1), story = c => (r && c.routes?.[r]?.join_key ? 0 : 1);
    const chap = c => { const x = r && c.routes?.[r]; return x ? capPos(r, x.join_key || x.recruit_key) : 0; };
    const rows = Object.values(CHARS).sort((a, b) => lordFirst(a) - lordFirst(b) || chap(a) - chap(b) || story(a) - story(b) || rank(a) - rank(b))
      .filter(c => (!r || c.routes?.[r]) && (!arma || weapons(c).includes(arma)) && (!onlyTeam || team.has(c.id)));
    // the faces grid of Mi partida › Equipo (same tile and colours: green «quiero», gold «tengo»); a tap opens the ficha
    const key = ctxGet().key, mine = r && r === ctxGet().route;
    const state = c => (mine && team?.has(c.id) ? teamState(c.id, r, key) : '');
    const label = c => { const s = state(c); if (s === 'quiero' || s === 'tengo') return t(s);
      if (r) { const x = c.routes[r]; return esc(capShort(CAPS[x.join_key || x.recruit_key]) || ''); }
      return hasRoutes(c) ? '' : guestBattles(c).length ? t('Aliado temporal') : t('No jugable'); };
    // the route line and its recruit requirement stay as the tile's tooltip; the ficha has them in full
    const cost = x => x?.recruit_key && !x.join_key && x.cost ? x.cost : null;
    const tip = c => (r ? routeTxt(c.routes[r], true) + (cost(c.routes[r]) ? ` · ${t('Apoyo {a} · Prestigio {p}', { a: cost(c.routes[r]).support, p: cost(c.routes[r]).renown })}` : '') : reqs(c)).replace(/<[^>]*>/g, '');
    const reqs = c => { const l = ROUTE_IDS.filter(x => cost(c.routes?.[x])).map(x => `${ROUTE_NAME[x]} ${cost(c.routes[x]).support}/${cost(c.routes[x]).renown}`);
      return l.length ? t('Apoyo/Prestigio: {l}', { l: l.join(' · ') }) : ''; };
    const tile = c => { const s = state(c), l = label(c), tp = tip(c);
      return `<a class="eq-face on${s === 'quiero' || s === 'tengo' ? ` st-${s}` : ''}" href="${href('personaje', c.id)}"${tp ? ` title="${esc(tp)}"` : ''}>${face(c.id, 'eq-fimg')}<span>${esc(nm(c))}</span>${l ? `<small>${l}</small>` : ''}</a>`; };
    return `<h1>${t('Personajes')}</h1>${routeChips('personajes', qs, r)}${armaChips('personajes', qs, arma)}` +
      (team ? chips('personajes', qs, 'eq', [['', 'Todos'], ['1', 'Solo mi equipo']], onlyTeam ? '1' : '', 'Equipo') : '') +
      resultCount(rows.length, 'personaje', 'personajes') +
      (rows.length ? `<div class="eq-faces">${rows.map(tile).join('')}</div>`
        : `<p class="mut">${t('Sin resultados con estos filtros.')}</p>`);
  }

  /** the context route's join or recruit line and requirement; without a chosen route, one line per route it joins */
  const here = (c, route) => {
    const j = join23(c), how = j && esc(dx(j.how));
    if (!hasRoutes(c)) return kvRows([[t('En el juego'), guestNote(c)]]);
    if (!route) return kvRows([...ROUTE_IDS.filter(r => c.routes?.[r]).map(r => [t('Ruta de {r}', { r: ROUTE_NAME[r] }), routeTxt(c.routes[r]) +
      [need(c, r), joinClass(c, r)].filter(Boolean).map(v => `<br><small>${v}</small>`).join('')]),
      [t('Cómo se une'), how], [t('Otras rutas'), isLord(c) ? absent(c, '') : '']]);
    const x = c.routes?.[route];
    return kvRows([[t('Ruta de {r}', { r: ROUTE_NAME[route] }), x ? routeTxt(x) : absent(c, route)], [t('Requisito'), x && need(c, route)], [t('Cómo se une'), x && how]]);
  };

  const bioList = b => (b || []).map(x => (Array.isArray(x) ? `<li><span class="fi-d">${x[0] > 0 ? esc(x[0]) : ''}</span>${esc(dx(x[1]))}</li>` : `<li>${esc(dx(x))}</li>`)).join('');
  /** later profile rows (a new title and biography by part or story event), identical ones merged, the base one left out */
  function variants(id) {
    const key = v => JSON.stringify([v.title, v.bio, v.hobbies, v.likes, v.dislikes]), base = key(id), by = new Map();
    (id.variants || []).filter(v => v.title && key(v) !== base).forEach(v => { const k = key(v); by.set(k, by.has(k) ? { ...by.get(k), when: [...by.get(k).when, v.when_es] } : { ...v, when: [v.when_es] }); });
    return [...by.values()].map(v => `<details><summary>${esc(dx(v.title || ''))} <small class="mut">(${esc([...new Set(v.when)].map(dx).join(' · '))})</small></summary>` +
      kvRows([[t('Aficiones'), v.hobbies && esc(dx(v.hobbies))], [t('Le gusta'), v.likes && esc(dx(v.likes))], [t('No le gusta'), v.dislikes && esc(dx(v.dislikes))]]) +
      (v.bio?.length ? `<ul class="fi-dates">${bioList(v.bio)}</ul>` : '') + '</details>').join('');
  }
  function summary(c, p) {
    const id = p.identity || {}, bio = bioList(id.bio), vs = variants(id), af = id.affiliation;
    return (id.description ? `<p>${esc(dx(id.description))}</p>` : '') + kvRows([
      [t('Alias'), id.alias && esc(dx(id.alias))], [t('Afiliación'), af?.clan_es && img(ico().force?.[af.bid], 'ico') + `<a href="#/guia/facciones">${esc(dx(af.clan_es))}</a>` +
        (Object.values(ROUTE_NAME).includes(af.route) ? ` <small>(${t('ruta de {r}', { r: esc(af.route) })})</small>` : af.route === 'Parte 2/3' ? ` <small>(${t('Partes 2 y 3')})</small>` : '')],
      [t('Altura'), id.height_cm && `${id.height_cm} cm`], [t('Aficiones'), id.hobbies && esc(dx(id.hobbies))],
      [t('Le gusta'), id.likes && esc(dx(id.likes))], [t('No le gusta'), id.dislikes && esc(dx(id.dislikes))],
    ]) + (bio ? `<h4>${t('Biografía')}</h4><ul class="fi-dates">${bio}</ul>` : '') + (vs ? `<h4>${t('Otras etapas del perfil')}</h4>${vs}` : '');
  }
  /** base stats and growths (with the growth skill when it has one): in the ficha summary */
  function stats(c, p) {
    const cb = p.combat || {}, gs = DT().growth_skill?.[c.id];
    const withSkill = gs && cb.growth ? Object.fromEntries(Object.keys(cb.growth).map(k => [k, (cb.growth[k] || 0) + (gs.growth[k] || 0)])) : null;
    // statTable translates its row labels: «Con <skill>» has its own key per growth skill (i18n/en/personajes.json)
    return (cb.base || cb.growth ? statTable([cb.base, cb.growth, withSkill], ['Base', 'Crecimiento %', `Con ${gs?.es}`]) : '') +  // i18n-ignore
      (cb.growth_total ? `<p class="mut">${t('Suma de crecimientos: {n}', { n: cb.growth_total })}</p>` : '');
  }

  /** theater and temple service; gifts and meals live in the Regalos page (game data), linked from here */
  function gifts(c, p) {
    const th = p.theater || {};
    const plays = pref => list((th.plays || []).filter(x => x.pref === pref).sort((a, b) => playStart(a) - playStart(b)).map(x => esc(dx(x.es)) + (x.part1 ? ` <small>(${esc(x.part1)})</small>` : '')));
    // lords (W.gifts_ui `lords`, adult profile) take gifts only in Parts 2–3, so a Part 1 context leaves them out
    const lord = (!ctxChosen() || CAPS[ctxGet().key]?.part !== 1) && Object.values(W.gifts?.lords || {}).some(g => g.pid === c.id);
    const inGifts = lord || Object.values(W.gifts?.chars || {}).some(g => g.pid === c.id), want = ctxWant().includes(c.id);
    // gifts have one team list (Equipo › Regalos) and one reference page (Regalos): link, never copy
    const dishes = list((p.meals?.best_dishes || []).map(d => `<a href="#/instalaciones?ir=comidas">${esc(dx(d.es))}</a>`));
    return (inGifts ? `<p>${lord ? t('Solo se le puede regalar en las Partes 2 y 3.') + ' ' : ''}${want ? t('Qué regalarle: {a}.', { a: `<a href="#/equipo?sec=regalos">${t('Equipo › Regalos')}</a>` }) + ' ' : ''}` +
      `${t('Todos sus gustos y comidas: {a}.', { a: `<a href="#/regalos?q=${encodeURIComponent(c.es)}&amp;eq=todos">${t('Regalos de {c}', { c: esc(nm(c)) })}</a>` })}</p>` : '') + kvRows([
      [t('Comidas que más le gustan'), dishes],
      [t('Obras que le gustan'), plays('le gusta')], [t('Obras que no le gustan'), plays('no le gusta')],
      [t('Servicio divino'), list(Object.entries(p.temple_service?.values || {}).filter(([, v]) => v >= 2).map(([k]) => esc(dx(k))))],
    ]);
  }

  function recruitment(c, p, route) {
    const rows = routesFirst(route).filter(r => r !== route).map(r => {  // the current route is in «En esta ruta»
      const x = c.routes?.[r];
      return `<li${r === route ? ' class="on"' : ''}><b>${ROUTE_NAME[r]}</b><small>${x ? routeTxt(x) : absent(c, r)}</small>` +
        `${x && need(c, r) ? `<small>${need(c, r)}</small>` : ''}</li>`;
    });
    // the recruit petitions of this route (each route has its own version: place and quest differ)
    const quests = recruitQuests(c).filter(q => questOnRoute(q, route)).map(q => li(L('mision', q.id), [esc(dx(q.goal || '')), list((q.deliver || []).map(nl)), list((q.where || []).map(nl))].filter(Boolean).join(' · ')));
    // auto-levelling while not recruited: only units that are recruited (lords, story joiners and Eshmel never wait); explained once in the guide
    const late = Object.values(c.routes || {}).some(x => x.recruit_key) && factOnly(dx(p.combat?.join_level));
    return c.routes && Object.keys(c.routes).length ? `<details><summary>${t('Otras rutas')}</summary>${ul(rows)}</details>` + (quests.length ? `<h4>${t('Misión de reclutamiento (ruta de {r})', { r: esc(ROUTE_NAME[route]) })}</h4>${ul(quests)}` : '') +
      (late ? `<p class="mut">${esc(sentence(late))} <a href="#/guia/experiencia-y-niveles">${t('Experiencia y niveles')}</a>.</p>` : '') : '';
  }

  function build(c, p, mounts) {
    const mm = MM(), cb = p.combat || {};
    const fixed = list((cb.forced_skills || []).filter(s => s.es && !/^Halo/.test(s.es)).map(s => L('habilidad', s.id, s.es)));
    const best = (mm.chars || []).find(x => x.pid === c.id);
    const cls = x => (x ? `${img(ico().job?.[x[0]], 'ico')}${L('clase', x[0], x[1])}` : '');
    const lines = (mm.lines || []).filter(l => (l.units || []).some(u => u[0] === c.id))
      .map(l => li(esc(dx(l.line)), (l.path || []).map(x => L('clase', x[0], x[1])).join(' → ') + (l.divine ? ` · ${t('divina: {c}', { c: L('clase', l.divine[0], l.divine[1]) })}` : '')));
    const arch = (mm.archetypes || []).filter(a => (a.units || []).some(u => u[0] === c.id)).map(a => li(esc(dx(a.name)), esc(dx(a.how))));
    const skills = (cb.personal_skills || []).map(s => li(`${t('Nv {n}', { n: s.level })} · ${L('habilidad', s.id, s.es)}`, esc(dx(s.desc))));
    const rec = cb.recommended;
    // halos: one per name; the character's own variant when it has a ficha (Orchel's Halo dual at 25 %), else the base halo (SID_魂魄の天冠[カイ] → SID_魂魄の天冠)
    const halos = new Map();
    [...(cb.forced_skills || []).filter(s => /天冠/.test(s.id)), ...Object.entries(DT().halos || {}).filter(([, h]) => h.who.includes(c.id)).map(([id, h]) => ({ id, es: h.es, base: true }))]
      .forEach(s => {
        const id = SKILLS[s.id] ? s.id : s.id.split('[')[0], es = String(s.es || SKILLS[id]?.es || '').replace(/\[.*$/, '');
        if (es && (!halos.has(es) || (!s.base && id.length < halos.get(es).length))) halos.set(es, id);
      });
    const learn = {};  // proficiency → «D Desgarro · C Derribar…» (the game's list for this character)
    (DT().learn?.[c.id] || []).forEach(([prof, rk, sid, es]) => (learn[prof] ||= []).push(`${rk} ${L('habilidad', sid, es)}`));
    const defs = (cb.default_classes_p1 || []).filter((x, i, a) => x !== a[i - 1]);
    const p1 = Object.values(c.routes || {}).some(x => CAPS[x.join_key || x.recruit_key]?.part === 1);
    const alt = [...(cb.community_paths || []).filter(x => factOnly(x.path)).map(x => li(esc(factOnly(dx(x.role))) || esc(nm(c)), esc(factOnly(dx(x.path))))),
      ...(mm.alt_paths || []).filter(a => a[0] === c.es && factOnly(a[1])).map(a => `<li>${esc(factOnly(dx(a[1])))}</li>`)];
    return kvRows([
      [t('Halo'), list([...halos].map(([es, id]) => L('habilidad', id, es)))],
      [t('Habilidades fijas'), fixed],
      [t('Objetos iniciales'), list((cb.start_items || []).map(n => { const id = Object.keys(ITEMS).find(k => ITEMS[k].es === n); return id ? itemIco(id, 'ico') + L('objeto', id) : esc(gt(n)); }))],
      [t('Clase recomendada'), best && cls(best.best)], [t('Alternativa'), best?.alt && cls(best.alt)],
      [t('Crecimientos con la clase'), best?.eff && esc(dx(best.eff))],
      [t('Aviso'), best?.warn && esc(dx(best.warn))],
      [t('Clase avanzada recomendada'), !best && rec?.jid && CLASSES[rec.jid] ? cls([rec.jid, rec.class_es]) : ''],
      [t('Valoración'), p.why?.text && esc(dx(p.why.text)) + (p.why.community ? COM() : '')],
      [t(p1 ? 'Clases por defecto (Parte 1)' : 'Clases por defecto'), defs.map(nl).join(' → ')],
      ...(charLimits(c.id) || [[t('Clases vetadas'), list((p.class_bans || []).map(nl))]]),
    ]) + communityBuilds(c.id) + ignition(c.id) + (rec?.growth_in_class && rec.jid && CLASSES[rec.jid] ? `<h4>${t('Crecimientos en {c}', { c: esc(nm(CLASSES[rec.jid])) })}</h4>${statTable([rec.growth_in_class], ['Crecimiento %'])}` : '') +
      (lines.length ? `<h4>${t('Líneas de clase')}</h4>${ul(lines)}` : '') + (alt.length ? `<h4>${t('Rutas alternativas')} ${COM()}</h4>${ul(alt)}` : '') + (arch.length ? `<h4>${t('Arquetipos')}</h4>${ul(arch)}` : '') +
      (skills.length ? `<h4>${t('Habilidades personales')}</h4>${ul(skills)}` : '') +
      (Object.keys(learn).length ? `<details><summary>${t('Aprendizaje por competencia')}</summary>${kvRows(Object.entries(learn).map(([k, v]) => [dx(k), v.join(' · ')]))}</details>` : '') + (mounts || '');
  }

  /** every community build of the unit (WIKI_EXT.builds), by route (Part 1) and end game (Parts 2-3); Mi partida picks one by roster */
  function communityBuilds(pid) {
    const r = ctxRoute(), all = (((window.WIKI_EXT || {}).builds?.units || {})[pid] || []).filter(o => !r || !o.routes || o.routes.includes(r));  // a chosen route: its own Part 1 builds only
    if (!all.length) return '';
    const where = o => (o.routes ? t('Parte 1 con {r}', { r: esc(o.routes.map(r => ROUTE_NAME[r]).join(', ')) }) : t('Partes 2 y 3'));
    const groups = [...new Set(all.map(where))];
    return `<h4>${t('Builds propuestas')} ${COM()}</h4>` +
      groups.map(g => `<details><summary>${g} (${all.filter(o => where(o) === g).length})</summary>${ul(all.filter(o => where(o) === g).map(o =>
        li(`<b>${esc(tx(o, 'name'))}</b> <span class="mut">${o.path.map(es => { const j = teamJid(es); return j ? L('clase', j) : esc(es); }).join(' → ')} · ${esc(t(o.weapon))}</span>`,
          [tx(o, 'why'), tx(o, 'fits') && t('Elígela: {f}', { f: tx(o, 'fits') })].filter(Boolean).map(esc).join(' '))))}</details>`).join('');
  }

  /** Burst lords: ignition type and technique chains (W.ignicion) */
  function ignition(pid) {
    const I = (window.WIKI_EXT || {}).ignicion, s = I?.senores.find(x => x.pid === pid);
    if (!s) return '';
    const rows = s.tecnicas.flatMap(tc => tc.cadena.map((x, i) => { const prev = tc.cadena[i - 1];
      return `<tr><td>${i ? '' : t('Nv {n}', { n: tc.nivel })}</td><td>${L('habilidad', x.sid, x.es)}</td><td>${x.hp_consumo ?? ''}</td><td>${x.usos ?? '—'}</td>` +
        `<td>${prev?.rafaga === x.sid ? t('En ráfaga') : i ? t('Grado {n}', { n: i + 1 }) + (prev?.umbral ? ` ${t('(medidor {u})', { u: prev.umbral })}` : '') : ''}</td></tr>`; })).join('');
    return `<details><summary>${t('Ignición: {x}', { x: esc(dx(s.tipo_es)) })}</summary><p>${esc(dx(I.tipos[s.tipo]?.ayuda || ''))}</p>` +
      `<div class="tw"><table><tr><th>${t('Nivel')}</th><th>${t('Técnica')}</th><th>${t('Ignic.')}</th><th>${t('Usos')}</th><th>${t('Versión')}</th></tr>${rows}</table></div>` +
      `<p class="mut">${t('Ráfaga, medidor y tesoros malditos:')} <a href="#/mecanicas?ir=ignicion">${t('Tablas de combate')}</a> · <a href="#/guia/ignicion">${t('Guía: Ignición')}</a>.</p></details>`;
  }
  /** pairs of `pid` with a conversation that closes at the end of Part `n` (apoyos_ventana) */
  const lostPairs = (pid, n) => ((window.WIKI_EXT || {}).apoyos_ventana?.pares || []).filter(x => (x.a === pid || x.b === pid) && Object.values(x.rangos).some(r => r[1] === n));
  function supportWindow(c) {
    const rows = [1, 2].map(n => [n, lostPairs(c.id, n).length]).filter(x => x[1]);
    return rows.length ? `<p class="mut">${rows.map(([n, k]) => `<a href="${esc(qsHref('apoyos', {}, { v: 'p' + n, t: c.es }))}">${t(k === 1 ? '{k} pareja tiene conversaciones que se pierden al acabar la Parte {n}' : '{k} parejas tienen conversaciones que se pierden al acabar la Parte {n}', { k, n })}</a>`).join(' · ')}.</p>` : '';
  }

  function supports(c, p) {
    const pairs = AP().pairs || [];
    const bonus = pid => { const x = pairs.find(q => (q.a === c.id && q.b === pid) || (q.b === c.id && q.a === pid)); return list(Object.entries(x?.bonus || {}).map(([k, v]) => `${BONUS[k] ? gt(BONUS[k]) : k} +${v}`)); };
    const rows = (p.supports?.pairs || []).slice().sort((a, b) => (a.es || '').localeCompare(b.es || '')).map(x => {
      const lost = Object.entries(x.ranks_reliance || {}).filter(([, v]) => v.missable_p1).map(([r]) => r);
      return `<li class="fi-rec">${face(x.partner, 'fi-mini')}<div><b>${L('personaje', x.partner, x.es)}</b>` +
        `<small>${list([(x.ranks_se || []).join(' · '), bonus(x.partner) && t('Bono: {b}', { b: bonus(x.partner) }), lost.length && t('{r} solo en la Parte 1', { r: lost.join(', ') })])}</small></div></li>`;
    });
    return rows.length ? ul(rows) : `<p class="mut">${t('No tiene conversaciones de apoyo.')}</p>`;
  }
  /** Percha answers (weekly use): in «En tu partida» */
  function perch(p) {
    const raven = (p.pale_raven?.sets || []).map(s => (s.greeting ? `<p><i>«${esc(dx(s.greeting))}»</i></p>` : '') +
      ul((s.prompts || []).map(q => li(esc(isEn() && q.answer_en ? q.answer_en : dx(q.answer_es)), esc(dx(q.es)))))).join('');
    const note = factOnly(dx(p.pale_raven?.note));
    return raven ? `<details><summary>${t('Percha: respuestas')}</summary>${note ? `<p>${esc(note)}</p>` : ''}${raven}</details>` : '';
  }

  function endings(c) {
    const rows = (AP().endings || []).filter(e => !e.empty && (e.pid === c.id || e.a === c.id || e.b === c.id)).map(e => {
      const other = e.kind === 'pareja' ? (e.a === c.id ? e.b : e.a) : null;
      return li(other ? t('Con {c}', { c: L('personaje', other) }) : t('En solitario'), esc(dx(e.cond || '')));
    });
    return ul(rows);
  }

  /** the character's quests (their route's own quests for a lord, the ones they give for the rest, recruit petitions) and Desvíos:
      the chosen route's only, or (nothing picked) all of them with the routes they exist on */
  function related(c, p) {
    const route = ctxRoute(), seen = new Set();
    const qs = [...(p.quests || []).map(q => QUEST[q.id]).filter(Boolean), ...Object.values(QUEST).filter(q => q.giver === c.es), ...recruitQuests(c)]
      .filter(q => !seen.has(q.id) && seen.add(q.id) && questOnRoute(q, route));
    const paras = Object.values(PARA).filter(x => x.lord === c.es || (p.desvios || []).some(d => d.id === x.id)).filter(x => !route || x.routes?.[route]);
    const win = (x, r) => { const w = x.routes[r]; return `${fechaMD(w.accept_from)} – ${fechaMD(w.accept_to)}`; };
    return ul([
      ...qs.map(q => li(t('Misión: {q}', { q: L('mision', q.id) }), list([route ? '' : esc(questRoutesEs(q)), q.reward_es && esc(dx(q.reward_es))]))),
      ...paras.map(x => li(t('Desvío: {d}', { d: L('desvio', x.id) }), list([route ? win(x, route) : paraRoutes(x).map(r => `${esc(ROUTE_NAME[r])} ${win(x, r)}`).join(' · '), ...(x.items || []).map(nl)]))),
      ...(!route || route === 'cai' ? (p.lessons || []).map(l => li(t('Formación (ruta de Cai): {l}', { l: esc(dx(l.es)) }), list([l.reward && nl(l.reward), l.renown && t('Prestigio {n}', { n: l.renown })]))) : []),
    ]);
  }

  /** «25/1» (day/month, the game's profile) → the reader's date style */
  const bday = s => { const m = String(s || '').match(/^(\d{1,2})\/(\d{1,2})$/); return m ? dateTx(0, +m[2], +m[1]) : s; };
  function personaje(id) {
    const c = CHARS[id];
    if (!c) return notFound();
    const p = c.p || {}, route = ctxRoute(), cb = p.combat || {}, idn = p.identity || {};
    // summary, no click: class, route line (every route when none is chosen) and the stat table; tabs for the rest
    const head = fichaHead(face(c.id, 'fi-pic fi-face'), `<a href="#/personajes">${t('Personajes')}</a>`, nm(c), dx(idn.title), kvRows([
      ...(scouted(c) && lvPath(c.id).length ? [
        [t('Clase al unirse'), (route && joinClass(c, route) ? joinClass(c, route) + (joinKeyFor(c.id, route, ctxKey()) !== c.routes[route].recruit_key ? `<br>${joinClass(c, route, ctxKey())}` : '') + `<br><small>${t('Si se recluta más tarde, llega con más nivel y quizá otra clase.')}</small>` : '') ||
          t('Depende de su nivel al reclutarle: mientras no se recluta, sube de nivel por su cuenta y cambia de clase.')],
        [t('Clases por nivel'), pathTxt(c)]] : [[t('Clase inicial'), cb.class && L('clase', cb.class, cb.class_es)]]),
      [t('Cumpleaños'), idn.birthday && esc(isEn() ? bday(idn.birthday) : idn.birthday) + (idn.birth_year ? ` (${idn.birth_year})` : '') + (idn.birthday_when ? ` <small>· ${esc(dx(idn.birthday_when))}</small>` : '')],
      isEn() ? [t('Nombre en español'), c.es && c.es !== c.en ? esc(c.es) : ''] : [t('Nombre en inglés'), c.en && c.en !== c.es ? esc(c.en) : ''],
      [t('Comparar'), `<a href="${esc(qsHref('comparar', {}, { a: c.id }))}">${t('Comparar con otro personaje')}</a>`],
    ]) + stats(c, p) + here(c, route));
    const team = teamNow(route), plan = team?.has(c.id) ? teamPlan(route, ctxGet().key, ctxRecruits(route), ctxDrop(route)) : null;
    const mine = plan && plan.builds.find(b => b.pid === c.id);
    // three tabs: what matters in your run first (route, requirement, team build, gifts, Percha; the profile folded), the reference build, supports (endings folded: spoilers)
    const rel = related(c, p), res = summary(c, p) + (rel ? `<h4>${t('Misiones y desvíos')}${route ? ` (${t('ruta de {r}', { r: esc(ROUTE_NAME[route]) })})` : ''}</h4>${rel}` : ''), fin = endings(c);
    const partida = (route ? recruitment(c, p, route) : '') +
      (mine ? `<h4>${t('Build en tu equipo')}</h4>${teamPickHtml(mine, plan, route, ctxGet().key, true)}${teamBuildHtml(mine, plan.mounts[c.id], route, ctxGet().key, true)}` : '') +
      gifts(c, p) + perch(p) + (window.frasesBlock ? frasesBlock(c.id) : '') + (res ? `<details><summary>${t('Resumen y misiones')}</summary>${res}</details>` : '');
    return ficha(head, [
      ['partida', 'En tu partida', partida],
      ['build', 'Build', build(c, p, teamMountsByBuild(c.id, route, ctxGet().key, plan) +
        (route ? '' : `<p class="mut">${t('Sin ruta elegida se cuentan todas las monturas; las capturadas solo las consigue Cai (en la Parte 1, y en la Parte 3 con Cai en el ejército).')}</p>`))],
      ['apoyos', 'Apoyos', supportWindow(c) + supports(c, p) + (fin ? `<details id="fi-finales"><summary>${t('Finales')} <span class="ap-sp">spoiler</span></summary>${fin}</details>` : '')],
    ]);
  }

  register({ id: 'personajes', title: 'Personajes', routes: ['personajes', 'personaje'], render: (id, qs) => (id ? personaje(id) : listing(qs || {})) });
})();
