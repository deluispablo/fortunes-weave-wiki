/* Fortune's Weave · team planner, the plan: who can be in the team, priority, one unit's build
   (class path, bridge, weapon), roles, the recruitment timeline, recruit states, selector edits and teamPlan.
   Deterministic and explained choice by choice: equipo.js, capitulo.js and personajes.js read it. Chapters, source conditions and
   item sources (routeChapters, srcOpen, payOk, itemSources…) live in core.js. */
'use strict';

/* ---------------- chapters ---------------- */
/** first chapter index ≥ `from` matching `pred`, or -1 */
const teamFirst = (route, from, pred) => { const ch = routeChapters(route); for (let i = Math.max(0, from); i < ch.length; i++) if (pred(ch[i])) return i; return -1; };

/* ---------------- who can be in the team ---------------- */
/** {auto: pids that join by story, recruit: pids recruitable on `route`}, each in chapter order */
function teamCandidates(route) {
  const at = c => chapIdx(route, c.routes[route].join_key || c.routes[route].recruit_key);
  const by = f => Object.values(CHARS).filter(c => c.routes?.[route] && f(c.routes[route])).sort((a, b) => at(a) - at(b) || a.es.localeCompare(b.es, 'es')).map(c => c.id);
  return { auto: by(x => x.join_key), recruit: by(x => x.recruit_key && !x.join_key) };
}
/** lords of the flame (route lords and the other lords): never chips; the route's own lord always counts */
const TEAM_LORDS = new Set(Object.values(CHARS).filter(c => Object.values(LORD_JP).includes(c.es)).map(c => c.id));
/** chips of the planner: everyone who joins or can be recruited on `route` except the lords, in the game's roster order (serial) */
function teamChips(route, key) {
  const { auto, recruit } = teamCandidates(route);
  // with a chapter key: only units of that part or earlier; prologue-only units (part 0) only in the prologue
  const cur = key ? +String(key).split('-')[1] : null;
  const ok = p => { if (cur == null) return true; const r = CHARS[p].routes[route], n = +String(r.join_key || r.recruit_key || '').split('-')[1];
    return Number.isNaN(n) || (n <= cur && (n > 0 || cur === 0)); };
  return [...auto, ...recruit].filter(p => !TEAM_LORDS.has(p) && ok(p)).sort(bySerial);
}
/** team on `route` at chapter `key`: story joiners up to the end of Part 1 (later ones once `key` reaches them) except the unticked
    ones (`drop`; never the route's lord) + the picked recruits */
function teamMembers(route, key, recruits, drop = []) {
  const { auto, recruit } = teamCandidates(route), ch = routeChapters(route);
  const lastP1 = ch.map(c => c.part).lastIndexOf(1), upTo = Math.max(lastP1, chapIdx(route, key));
  const inPart0 = CAPS[key]?.part === 0;  // prologue joiners only count in the prologue
  return [...auto.filter(p => { const k = CHARS[p].routes[route].join_key; return (p === LORDS[route] || !drop.includes(p)) && chapIdx(route, k) <= upTo && (CAPS[k]?.part !== 0 || inPart0); }),
    ...recruit.filter(p => (recruits || []).includes(p))];
}

/* ---------------- priority ---------------- */
const TEAM_TIER = (() => {  // first published tier table: name → S/A/B/C («el resto» = B)
  const t = ((window.WIKI_EXT || {}).minmax?.tiers || []).find(x => x.rows?.length), out = {};
  (t?.rows || []).forEach(([tier, names]) => String(names).split(/,\s*/).forEach(n => { out[n.trim()] = tier; }));
  return out;
})();
/** part of a chapter key («leda-1-6» → 1, «comun-3-2» → 3); 1 without a key */
const teamPartOf = key => (key ? +String(key).split('-')[1] : 1);
/** priority order: the route's lord, then tier (S > A > B > C), then who joins first, then name; each with its reason */
function teamPriority(route, pids, key) {
  const tb = (window.WIKI_EXT || {}).builds?.tiers || {}, rt = (teamPartOf(key) >= 2 ? tb.final : tb[route]) || {};  // Part 1: the route's own community consensus; Parts 2-3: the end-game one
  const tierOf = p => (p === LORDS[route] ? 'Señor' : (rt[p] || '')[0] || TEAM_TIER[CHARS[p].es] || 'B');
  const rank = { Señor: 0, S: 1, A: 2, B: 3, C: 4 };
  const at = p => chapIdx(route, CHARS[p].routes?.[route]?.join_key || CHARS[p].routes?.[route]?.recruit_key);
  return [...pids].sort((a, b) => rank[tierOf(a)] - rank[tierOf(b)] || at(a) - at(b) || CHARS[a].es.localeCompare(CHARS[b].es, 'es'))
    .map((pid, i) => ({ pid, n: i + 1, why: tierOf(pid) === 'Señor' ? t('señor de la ruta') : t('valoración {t}', { t: tierOf(pid) }) }));  // i18n-ignore ('Señor': the rank key)
}

/* ---------------- one unit's build ---------------- */
const BRIDGES = ['Crescendo', 'Técnica entrenada', 'Siempre alerta', 'Contra mayor'];  // bridge masteries worth collecting  // i18n-ignore (Spanish game names: lookup keys)
const STAT_KEYS = Object.keys(STAT_ES).filter(s => s !== 'Mov');  // Mov has no growth
const teamCombat = pid => CHARS[pid]?.p?.combat || CHARS[pid]?.combat || {};
const teamJid = es => Object.keys(CLASSES).find(k => CLASSES[k].es === es);
/** false when the class bans this unit (forbidden list or women-only) */
const teamCan = (pid, jid) => {
  const k = CLASSES[jid], c = CHARS[pid];
  return !!k && !(k.forbidden_persons || []).includes(c.es) && !(String(k.gender_q || '').startsWith('solo mujeres') && c.gender === 'm');
};
/** growth while in the class: personal (class base when 0) + class modifier */
const teamGrowth = (pid, jid) => {
  const g = teamCombat(pid).growth || {}, k = CLASSES[jid] || {};
  return Object.fromEntries(STAT_KEYS.map(s => [s, (g[s] || k.class_base_growth?.[s] || 0) + (k.growth_modifiers?.[s] || 0)]));
};
const teamTop = (g, n = 3) => STAT_KEYS.filter(s => s !== 'Lck' && s !== 'Cha').sort((a, b) => g[b] - g[a] || STAT_KEYS.indexOf(a) - STAT_KEYS.indexOf(b)).slice(0, n);
/** target class options in order: published best class → its alternative → the unit's recommended advanced class */
function teamTargets(pid) {
  const mm = ((window.WIKI_EXT || {}).minmax?.chars || []).find(x => x.pid === pid), rec = teamCombat(pid).recommended;
  return [[mm?.best?.[0], t('clase recomendada')], [mm?.alt?.[0], t('alternativa a la recomendada')], [rec?.jid, t('clase avanzada recomendada')]]
    .filter(([j], i, a) => j && CLASSES[j] && a.findIndex(x => x[0] === j) === i);
}
/** starting class: a recruit's class at the level they join with (core.js joinAt, upper end of the chapter's range); otherwise
    the last of the game's default Part 1 classes (or the data class when it is higher) */
function teamStart(pid, route, key) {
  const j = route ? joinAt(pid, route, joinKeyFor(pid, route, key)) : null, jj = j?.classes.at(-1)?.[1];
  if (jj && CLASSES[jj]) return jj;
  const cb = teamCombat(pid), defs = (cb.default_classes_p1 || []).map(teamJid).filter(Boolean), d = defs[defs.length - 1];
  return d && (CLASSES[d].tier || 0) >= (CLASSES[cb.class]?.tier || 0) ? d : cb.class;
}
const WEAPON_NAMES = ARMAS.map(([, es]) => es);
const SUPPORT_SKILLS = ['Equitación', 'Vuelo', 'Coraza'];
const WEAPON_BY_ES = Object.fromEntries(Object.values(ITEMS).filter(i => i.weapon?.type).map(i => [i.es, WEAPON_NAMES.find(w => armaKey(w) === armaKey(i.weapon.type))]));
/** candidate main weapons among the target's, in order: published weapon lines → starting weapons → shared with the starting class → magic → the rest */
function teamMainWeapons(pid, target, route, key) {
  const tw = CLASSES[target]?.weapons_usable || [], st = CLASSES[teamStart(pid, route, key)];
  const lines = ((window.WIKI_EXT || {}).minmax?.lines || []).filter(l => WEAPON_NAMES.includes(l.line) && (l.units || []).some(u => u[0] === pid)).map(l => l.line);
  const items = (teamCombat(pid).start_items || []).map(x => WEAPON_BY_ES[x]);
  const shared = st?.tier ? tw.filter(w => (st.weapons_usable || []).includes(w)) : [];
  return [...new Set([...lines, ...items, ...shared, ...tw.filter(w => w.startsWith('Magia')), ...tw])].filter(w => w && tw.includes(w));
}
const teamMainWeapon = (pid, target, route, key) => teamMainWeapons(pid, target, route, key)[0] || null;
/** first chapter index where the class can be taken on `route`: classes behind an unlock flag only in the routes/parts that unlock them
    (a lord's name → that route; another unit's name → Part 3 on any route); the flag is shared, so later parts keep it. -1 = never */
function teamClassIdx(jid, route) {
  const k = CLASSES[jid]; if (!k) return -1;
  const rp = k.route_part_conditions || {}, need = rp.need_flags || [];
  let from = need.includes('3部以降') || k.part3_only ? 3 : 0;
  if (need.some(f => /^共有_兵種解放_/.test(f))) {
    const lords = Object.values(ROUTE_NAME);
    const parts = (rp.hidden_routes || []).filter(([who]) => who === ROUTE_NAME[route] || !lords.includes(who)).map(([, p]) => parseInt(p, 10)).filter(n => n >= 1);
    if (!parts.length) return -1;
    from = Math.max(from, Math.min(...parts));
  }
  return teamFirst(route, 0, c => c.part >= Math.max(from, 1));
}
/** first chapter index where `jid` can be taken on `route`: the class exists there, exams are open and its licence is on sale; -1 = never */
function classFromIdx(jid, route) {
  const c = teamClassIdx(jid, route); if (c < 0) return -1;
  return Math.max(c, teamFirst(route, 0, ch => (ch.unlocks || []).includes('Examen de aptitud')), teamLicenceIdx(route, CLASSES[jid].licence));  // i18n-ignore (data value)
}
/** exam reachable with the trained skills: every fixed requirement trained, and one of the «o» group */
const teamExamOk = (jid, trained) => {
  const req = CLASSES[jid]?.exam_requirements || [], fixed = req.filter(r => !r.choice_group), any = req.filter(r => r.choice_group);
  return fixed.every(r => trained.has(r.es)) && (!any.length || any.some(r => trained.has(r.es)));
};
const supportOf = jid => SUPPORT_SKILLS.filter(sk => (CLASSES[jid]?.skills_trainable_q?.[sk] || 0) > 0);
const MAST_LIST = Object.fromEntries(((window.WIKI_EXT || {}).minmax?.masteries || []).map(m => [m.skill, m.rec ? 2 : 1]));
const MAST_REC = new Set(Object.keys(MAST_LIST).filter(k => MAST_LIST[k] === 2));
const masteryOf = jid => CLASSES[jid]?.mastery_skill?.[0]?.es || '';
/** a class the unit can take on `route` with its main weapon `w` and trained skills */
const teamUsable = (pid, jid, route, w, trained) => teamCan(pid, jid) && teamClassIdx(jid, route) >= 0 &&
  (CLASSES[jid].weapons_usable || []).includes(w) && teamExamOk(jid, trained);
/** the Cuadriguero class: its mount bonus (growth and flat) counts twice */
const CUADRI = Object.keys(CLASSES).find(k => CLASSES[k].es === 'Cuadriguero');
/** best bond-5 growth per stat among catchable horses: what a Cuadriguero stage adds twice (used by the class path search) */
const CUADRI_HORSE = Object.fromEntries(STAT_KEYS.map(k => [k, Math.max(0, ...Object.values(MOUNTS).filter(m => m.kind === 'Caballo' && !m.unique_q).map(m => m.growth_by_bond?.['5']?.[k] || 0))]));
/** best class path from the start class to `target` (one class per tier, each usable when reached). Order, from strongest:
    fewest mount-type changes, current mount kept longest, listed masteries, the game's class tree, growth in the target's top stats */
function teamPath(pid, target, route, weapon, key) {
  if (!weapon) {  // the first candidate weapon with a valid path is the build's main weapon
    for (const w of teamMainWeapons(pid, target, route, key)) { const p = teamPath(pid, target, route, w, key); if (p) return p; }
    return null;
  }
  const start = teamStart(pid, route, key), w = weapon, t0 = CLASSES[start]?.tier || 0, tT = CLASSES[target].tier;
  if (tT <= t0) return null;
  const top = teamTop(teamGrowth(pid, target));
  const byTier = t => Object.keys(CLASSES).filter(j => CLASSES[j].tier === t).sort();
  const base = new Set([w, ...supportOf(start)]);
  let best = null;
  const score = path => {
    const kinds = [start, ...path].map(j => CLASSES[j].mount_kind || null);
    let changes = 0, kept = path.length;
    for (let i = 1; i < kinds.length; i++) if (kinds[i] !== kinds[i - 1]) { changes++; kept = Math.min(kept, i - 1); }
    const mast = path.reduce((a, j) => a + (MAST_LIST[masteryOf(j)] || 0), 0);
    const tree = path.reduce((a, j, i) => a + (CLASSES[j].tree_prev === (i ? path[i - 1] : start) ? 1 : 0), 0);
    const grow = path.reduce((a, j) => a + top.reduce((x, st) => x + teamGrowth(pid, j)[st] + (j === CUADRI ? 2 * CUADRI_HORSE[st] : 0), 0), 0);
    return [-changes, kept, mast, tree, grow];
  };
  const better = (a, b) => { for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] > b[i]; return false; };
  const walk = (t, path, trained) => {
    if (t === tT) {
      if (!teamUsable(pid, target, route, w, trained)) return;
      const full = [...path, target], sc = score(full);
      if (!best || better(sc, best.sc)) best = { path: full, sc };
      return;
    }
    for (const j of byTier(t)) if (teamUsable(pid, j, route, w, trained)) walk(t + 1, [...path, j], new Set([...trained, ...supportOf(j)]));
  };
  walk(t0 + 1, [], base);
  return best ? { path: best.path, weapon: w } : null;
}
/** first chapter from which a licence can be bought on `route` (index, -1 when unknown) */
const teamLicenceIdx = (route, lic) => {
  const shops = (W.classes?.licences || {})[lic]?.shops;
  return shops ? teamFirst(route, 0, c => shops.some(s => condOk(s.conditions, route, c) && spotAccess(shopSpot(s.shop_jp), route, c.key).ok)) : -1;
};
/** best shop weapon of a type open from `key` on (highest might, then cheaper) */
function teamWeapon(type, route, key) {
  const k = armaKey(type);
  return Object.entries(ITEMS).filter(([, i]) => i.weapon && armaKey(i.weapon.type) === k &&
    (i.obtain || []).some(o => (o.type === 'tienda' || o.type === 'ambulante') && (o.rows || []).some(w => srcOpen(w.conds, route, key)) && spotAccess(sourceSpot(o), route, key).ok))
    .sort((a, b) => (b[1].weapon.might || 0) - (a[1].weapon.might || 0) || (a[1].price || 0) - (b[1].price || 0) || a[0].localeCompare(b[0]))[0]?.[0] || null;
}

/* ---------------- community builds: several per unit, the pick depends on the rest of the team ---------------- */
/** a community path as one class per tier above the start, each usable with `w` and what the earlier ones train; null otherwise.
    Riding, Flying and Armor also rise with manuals and the drill ground, so they never block: {chain, needs} lists the ones to raise that way. */
function teamChain(pid, jids, route, w, key) {
  const start = teamStart(pid, route, key), t0 = CLASSES[start]?.tier || 0, chain = jids.filter(j => CLASSES[j].tier > t0);
  let trained = new Set([w, ...supportOf(start)]);
  const needs = new Set();
  for (let i = 0; i < chain.length; i++) {
    (CLASSES[chain[i]].exam_requirements || []).filter(r => SUPPORT_SKILLS.includes(r.es) && !trained.has(r.es)).forEach(r => needs.add(r.es));
    if (CLASSES[chain[i]].tier !== t0 + 1 + i || !teamUsable(pid, chain[i], route, w, new Set([...trained, ...SUPPORT_SKILLS]))) return null;
    trained = new Set([...trained, ...supportOf(chain[i])]);
  }
  return chain.length || jids.includes(start) ? { chain, needs: [...needs] } : null;  // joining already in the build's class: nothing left to climb
}
/** the unit's community builds (WIKI_EXT.builds.units[pid]) for `route`, in the published order; each {…, jids, target, ok, issue}.
    A build is ok when every class exists, the unit may take its target on this route and the target uses the build's weapon. */
function teamOptions(pid, route, key) {
  const part = teamPartOf(key);  // Part 1 builds in Part 1, end-game builds (any route) from Part 2 on
  return (((window.WIKI_EXT || {}).builds?.units || {})[pid] || []).filter(o => (!o.routes || o.routes.includes(route)) && (!o.parts || o.parts.includes(part))).map(o => {
    const jids = (o.path || []).map(es => teamJid(es) || null), bad = (o.path || []).filter((es, i) => !jids[i]);
    const target = bad.length ? null : jids.at(-1);
    const issue = bad.length ? t('clase desconocida: {c}', { c: bad.join(', ') }) :
      !target || !teamCan(pid, target) ? t('no puede ser {c}', { c: nm(CLASSES[target] || {}) }) :
      teamClassIdx(target, route) < 0 && target !== teamStart(pid, route, key) ? t('{c} no existe en esta ruta', { c: nm(CLASSES[target]) }) :  // joining in it counts
      !(CLASSES[target].weapons_usable || []).includes(o.weapon) ? t('{c} no usa {w}', { c: nm(CLASSES[target]), w: t(o.weapon || '?').toLowerCase() }) :
      !teamChain(pid, jids, route, o.weapon, key) && !teamPath(pid, target, route, o.weapon, key) ? t('ningún camino de clases llega a {c} con {w}', { c: nm(CLASSES[target]), w: t(o.weapon).toLowerCase() }) : '';
    const needs = (!issue && teamChain(pid, jids, route, o.weapon, key)?.needs) || [];
    return { ...o, jids, target, needs, roles: [...new Set([...(o.roles || []), ...(target ? teamRolesOf(target).filter(r => ['tanque', 'volador', 'montado'].includes(r)) : [])])], ok: !issue, issue };  // what the build is for, plus what its class makes objectively true
  });
}
/** roles nobody may double up on (one is enough) */
const TEAM_ONE = new Set(['bailarin']);
/** {pid: {pick, opts: [{id, score, why}]}} for the members with a valid community build. Each unit, by priority, takes the build that
    best fits what the others' current picks leave: the published order (first = main), +3 for a needed role nobody else covers,
    +2 or +3 for each «when» rule met, −4 for a one-per-team role someone else already has. Three passes, so later picks can move earlier ones. */
function teamChoose(route, key, members) {
  const prio = teamPriority(route, members, key).map(x => x.pid), opts = {}, pick = {};
  prio.forEach(p => { const o = teamOptions(p, route, key).filter(x => x.ok); if (o.length) { opts[p] = o; pick[p] = o[0]; } });
  const rolesOf = p => opts[p] ? pick[p].roles : (teamBuild(p, route, key)?.roles || []);
  const base = Object.fromEntries(members.filter(p => !opts[p]).map(p => [p, rolesOf(p)]));  // units with no community build: computed roles
  const others = me => [...Object.entries(base).map(([, r]) => r), ...Object.keys(opts).filter(p => p !== me).map(p => pick[p].roles)].flat();
  const score = (me, o, i) => {
    const rest = others(me), why = [];
    let s = -i * 0.5;
    o.roles.filter(r => ROLE_NEEDED.includes(r) && !rest.includes(r)).forEach(r => { s += 3; why.push(t('cubre el hueco de {r}', { r: roleName(r) })); });
    o.roles.filter(r => TEAM_ONE.has(r) && rest.includes(r)).forEach(r => { s -= 4; why.push(t('ya hay {r} en el equipo', { r: roleName(r) })); });
    (o.when || []).forEach(w => {
      if (w.has && members.includes(w.has)) { s += 2; why.push(t('con {p} en el equipo', { p: nm(CHARS[w.has]) })); }
      if (w.lacks && !members.includes(w.lacks)) { s += 2; why.push(t('sin {p} en el equipo', { p: nm(CHARS[w.lacks]) })); }
      if (w.lacks_role && !rest.includes(w.lacks_role)) { s += 3; if (!o.roles.includes(w.lacks_role) || !ROLE_NEEDED.includes(w.lacks_role)) why.push(t('nadie más hace de {r}', { r: roleName(w.lacks_role) })); }  // a needed role already says «cubre el hueco»
    });
    return { id: o.id, score: s, why };
  };
  for (let pass = 0; pass < 3; pass++) prio.filter(p => opts[p]).forEach(p => {
    const sc = opts[p].map((o, i) => score(p, o, i));
    pick[p] = opts[p][sc.reduce((b, x, i) => (x.score > sc[b].score ? i : b), 0)];
  });
  return Object.fromEntries(Object.keys(opts).map(p => [p, { pick: pick[p].id, opts: opts[p].map((o, i) => score(p, o, i)) }]));
}
const ROLE_EXTRA = { bailarin: 'Bailarín', golpe: 'Golpe físico', esquiva: 'Esquiva' };
const roleName = r => t((ROLES.find(x => x[0] === r) || [r, ROLE_EXTRA[r] || r])[1]).toLowerCase();

/** full build of `pid` on `route` from chapter `key` (see the page notes for every rule applied); `pick` = one of teamOptions():
    its class path when valid as written, else the best path to its target with its weapon */
function teamBuild(pid, route, key, pick) {
  const c = CHARS[pid], cb = teamCombat(pid), r = c?.routes?.[route];
  if (!c) return null;
  let target = null, found = null;
  const opts = teamTargets(pid);
  if (pick?.ok) {
    const chain = teamChain(pid, pick.jids, route, pick.weapon, key);
    found = chain ? { path: chain.chain, weapon: pick.weapon } : teamPath(pid, pick.target, route, pick.weapon, key);
    if (found) target = { jid: pick.target, why: t('de la build «{n}»', { n: tx(pick, 'name') }) };
  }
  const picked = !!found;
  if (!found) for (const [jid, why] of opts) { found = teamPath(pid, jid, route, null, key); if (found) { target = { jid, why }; break; } }
  if (!found && opts.length) {  // no listed target is reachable here: best tier-4 class reachable with the main weapon, by growth in the unit's top stats
    const w0 = teamMainWeapon(pid, opts[0][0], route, key), mine = teamTop(teamCombat(pid).growth || {});
    const sum = j => mine.reduce((a, st) => a + teamGrowth(pid, j)[st], 0);
    for (const j of Object.keys(CLASSES).filter(j => CLASSES[j].tier === 4 && (CLASSES[j].weapons_usable || []).includes(w0)).sort((a, b) => sum(b) - sum(a) || a.localeCompare(b))) {
      found = teamPath(pid, j, route, w0, key);
      if (found) { target = { jid: j, why: t('mejor clase alcanzable con {w} en esta ruta', { w: t(w0).toLowerCase() }) }; break; }
    }
  }
  const chain = found ? found.path : [], w = found?.weapon || null;
  const joinIdx = Math.max(0, chapIdx(route, r?.join_key || joinKeyFor(pid, route, key)));
  const start = teamStart(pid, route, key);
  const examIdx = teamFirst(route, 0, ch => (ch.unlocks || []).includes('Examen de aptitud'));  // i18n-ignore (data value)
  // bridge: first listed mastery not on the path, from a class the unit can take with the build's weapon and trained skills, below the target
  const trained = new Set([w, ...supportOf(start), ...chain.flatMap(supportOf)]);
  const bridge = target && BRIDGES.map(sk => [sk, Object.keys(CLASSES).find(j => masteryOf(j) === sk)])
    .find(([, j]) => j && !chain.includes(j) && j !== start && CLASSES[j].tier < CLASSES[target.jid].tier && CLASSES[j].tier > 1 && teamUsable(pid, j, route, w, trained));
  const path = [...chain];
  if (bridge) { const at = path.findIndex(j => CLASSES[j].tier > CLASSES[bridge[1]].tier); path.splice(at < 0 ? path.length : at, 0, bridge[1]); }
  let prevKind = CLASSES[start]?.mount_kind || null, from = joinIdx;
  const ch = routeChapters(route);
  const steps = path.map(jid => {
    const k = CLASSES[jid], g = teamGrowth(pid, jid), lv = k.recommended_level || null;
    const floor = Math.max(from, examIdx, teamLicenceIdx(route, k.licence), teamClassIdx(jid, route));  // = classFromIdx where the class exists; a start class missing on the route still waits for exams
    const at = lv ? teamFirst(route, floor, x => x.level && x.level[1] >= lv) : -1;
    if (at >= 0) from = at;
    const floors = STAT_KEYS.filter(s => (k.certification_floors?.[s] || 0) > (cb.base?.[s] || 0)).map(s => [s, k.certification_floors[s]]);
    const kind = k.mount_kind || null, keep = kind && prevKind === kind, lost = kind && prevKind && prevKind !== kind;
    if (kind) prevKind = kind;
    const top = teamTop(g);
    const kn = kind && t(kind);
    const why = [t('Crecimientos en la clase: {g}', { g: top.map(s => `${statName(s)} ${g[s]}`).join(', ') }),
      masteryOf(jid) && t('habilidad maestra {s}', { s: gt(masteryOf(jid)) }),
      kind && (keep ? t('sigue en {k}: conserva el vínculo', { k: kn }) : lost ? t('pasa a {k}: el vínculo empieza de cero', { k: kn }) : t('monta {k}', { k: kn }))].filter(Boolean).join(' · ');
    return { jid, level: lv, key: at >= 0 ? ch[at].key : '', licence: k.licence_es || '', growth: g, top, floors, mastery: masteryOf(jid),
      mastery_rec: MAST_REC.has(masteryOf(jid)), bridge: !!bridge && jid === bridge[1], kind, why };
  });
  const fin = CLASSES[target?.jid] || {};
  const masteries = [...new Set(steps.map(s => s.mastery).filter(Boolean))].sort((a, b) => MAST_REC.has(b) - MAST_REC.has(a));
  return {
    pid, start, target: target?.jid || '', target_why: target?.why || '', steps, bridge: bridge ? { jid: bridge[1], skill: bridge[0] } : null,
    skills: masteries,  // personal skills are always on; only masteries need a slot
    kind: fin.mount_kind || null, weapon: w, weapons: w ? [{ type: w, iid: teamWeapon(w, route, key) }] : [], roles: picked ? pick.roles : teamRolesOf(target?.jid),
    late: !!(r?.recruit_key && !r?.join_key), final_growth: target ? teamGrowth(pid, target.jid) : null,
    ...(picked ? { pick: pick.id, pick_needs: pick.needs || [] } : {}),
  };
}

/* ---------------- roles ---------------- */
const ROLES = [['tanque', 'Tanque'], ['sanador', 'Sanador'], ['volador', 'Volador'], ['mago', 'Mago'], ['arquero', 'Arquero'], ['montado', 'Montado']];
const ROLE_NEEDED = ['tanque', 'sanador', 'volador', 'mago', 'arquero'];
/** roles a class covers: white magic heals, black magic casts, bow shoots, Pegaso/Bau fly, Def modifier ≥ 5 tanks */
function teamRolesOf(jid) {
  const k = CLASSES[jid]; if (!k) return [];
  const w = k.weapons_usable || [];
  return [(k.flat_modifiers?.Def || 0) >= 5 && 'tanque', w.includes('Magia blanca') && 'sanador', ['Pegaso', 'Bau'].includes(k.mount_kind) && 'volador',
    w.includes('Magia negra') && 'mago', w.includes('Arco') && 'arquero', k.mounted && 'montado'].filter(Boolean);
}
/** {cover: {role: [pid]}, gaps: [role], fix: {role: [[pid, jid]]}} — fix lists members whose alternative class would fill a gap */
function teamRoles(builds, route) {
  const cover = Object.fromEntries(ROLES.map(([r]) => [r, builds.filter(b => b.roles.includes(r)).map(b => b.pid)]));
  const gaps = ROLE_NEEDED.filter(r => !cover[r].length);
  const alts = builds.map(b => [b.pid, ((window.WIKI_EXT || {}).minmax?.chars || []).find(x => x.pid === b.pid)?.alt?.[0], b.target]).filter(([p, j, t]) => j && j !== t && teamCan(p, j) && (!route || teamClassIdx(j, route) >= 0)).map(([p, j]) => [p, j]);
  const fix = Object.fromEntries(gaps.map(r => [r, alts.filter(([, j]) => teamRolesOf(j).includes(r))]));
  return { cover, gaps, fix };
}

/** what to train for the exams of a build (teamBuild result): per skill the highest rank any exam on its steps asks, with the class that
    asks it. In a choice group («Espada C o Lanza C») only one side counts: the build weapon when it is one, else the first. [{skill, rank, rank_n, for}] */
function teamFocus(b) {
  const best = {};
  for (const st of b?.steps || []) {
    const req = CLASSES[st.jid]?.exam_requirements || [], grp = req.filter(r => r.choice_group);
    const pick = grp.find(r => r.es === b.weapon) || grp[0];
    for (const r of req.filter(x => !x.choice_group || x === pick))
      if (!best[r.es] || r.rank_n > best[r.es].rank_n) best[r.es] = { skill: r.es, rank: r.rank, rank_n: r.rank_n, for: st.jid };
  }
  return Object.values(best).sort((a, b) => b.rank_n - a.rank_n);
}
/** «Armas y equipo»: the weapons worth having for the team builds, by weapon type (ARMAS order), from the plan's gear (what each unit
    can carry now and the alternatives), its shopping list and its forge rows. [{type, items: [{iid, why, where, spot, price, pay, who, note, refine}]}];
    why: «comprar» (shop or barter), «conseguir» (chest, quest, starting gear) or «refinar» (only the forge step is new) */
function teamArms(plan) {
  const by = new Map(), add = (iid, o) => { const w = ITEMS[iid]?.weapon; if (!w) return;
    const cur = by.get(iid) || { iid, type: w.type, who: [], why: o.why, where: o.where || '', spot: o.spot || null, price: o.price || 0, pay: o.pay || [], note: o.note || '', refine: null };
    cur.who = [...new Set([...cur.who, ...(o.who || [])])]; if (!cur.note && o.note) cur.note = o.note; if (!cur.where && o.where) Object.assign(cur, { where: o.where, spot: o.spot, price: o.price || 0, why: o.why });
    by.set(iid, cur); return cur; };
  const how = k => (k === 'tienda' || k === 'ambulante' || k === 'barter' ? 'comprar' : 'conseguir');
  for (const g of plan.gear || []) {
    if (g.now) add(g.now.iid, { why: how(g.now.kind), where: g.now.where, spot: g.now.spot, price: g.now.price, pay: g.now.pay, who: [g.pid] });
    (g.options || []).forEach(o => add(o.iid, { why: 'comprar', where: o.where, spot: o.spot, price: o.price, who: [g.pid], note: o.effective ? 'arma eficaz' : '' }));
  }
  for (const sp of plan.shop?.buy || []) for (const x of sp.items) add(x.iid, { why: 'comprar', where: x.offer.where, spot: x.offer.spot, price: x.offer.price, pay: x.offer.pay, who: [], note: x.why });
  for (const r of plan.forge?.rows || []) if (!r.repair) { const c = add(r.iid, { why: 'refinar', who: r.users || [] }); if (c) c.refine = { to: r.to, n: r.n, gold: r.gold, mats: r.mats }; }
  const order = ARMAS.map(a => a[0]);
  return order.map(type => ({ type, items: [...by.values()].filter(i => i.type === type && i.who.length).sort((a, b) => (b.refine ? 1 : 0) - (a.refine ? 1 : 0) || b.who.length - a.who.length || (ITEMS[b.iid].weapon.might - ITEMS[a.iid].weapon.might)) }))
    .filter(g => g.items.length);
}
/** roles a unit gives on `route` at `key`: its valid builds' roles, or the computed build's when it has none */
function teamUnitRoles(pid, route, key) {
  const o = teamOptions(pid, route, key).filter(x => x.ok);
  return [...new Set(o.length ? o.flatMap(x => x.roles || []) : teamBuild(pid, route, key)?.roles || [])];
}
/** basic roles with nobody in `members` (pids, lord included) and up to 3 recruits of the route who could fill each, best first
    (route or part rating, then the chapter they can join): [{role, count, picks: [{pid, ch}]}]. `builds`: the plan's, so the roles agree */
function teamGaps(route, key, members, builds = teamPlan(route, key, members.filter(p => CHARS[p]?.routes?.[route]?.recruit_key)).builds) {
  const roleOf = p => builds.find(b => b.pid === p)?.roles || [];
  const count = Object.fromEntries(ROLE_NEEDED.map(r => [r, members.filter(p => roleOf(p).includes(r)).length]));
  const pool = teamChips(route, key).filter(p => CHARS[p].routes[route].recruit_key && !members.includes(p));
  const order = teamPriority(route, pool, key).map(x => x.pid);
  return ROLE_NEEDED.filter(r => !count[r]).map(r => ({ role: r, count: 0,
    picks: order.filter(p => teamUnitRoles(p, route, key).includes(r)).slice(0, 3).map(p => ({ pid: p, ch: CHARS[p].routes[route].recruit_key })) }));
}

/* ---------------- recruitment timeline (was the recruit planner) ---------------- */
/** plan for `route`: one step per pid recruitable there (automatic joins and unknown pids are skipped), sorted by chapter */
function planRecruits(route, pids) {
  const steps = [...new Set(pids || [])].map(pid => [pid, CHARS[pid]?.routes?.[route]]).filter(([, x]) => x?.recruit_key && x.cost)
    .map(([pid, x]) => ({ start_by_key: x.recruit_key, pid, action: t('Reclutar a {p}', { p: nm(CHARS[pid]) }), items: x.cost.items.map(i => ({ ...i })),
      gold: x.cost.gold || 0, support: x.cost.support, renown: x.cost.renown }))
    .sort((a, b) => chapOrder(a.start_by_key) - chapOrder(b.start_by_key) || CHARS[a.pid].es.localeCompare(CHARS[b.pid].es, 'es'));
  const totals = { gold: 0, items: {} };
  steps.forEach(s => { totals.gold += s.gold; s.items.forEach(i => { totals.items[i.id] = (totals.items[i.id] || 0) + i.n; }); });
  return { steps, totals };
}

/** members of the team picked for `route` as a Set, or null when no recruit is picked (pages then behave as before) */
const teamNow = (route = ctxGet().route) => { const rec = ctxRecruits(route); return ROUTE_IDS.includes(route) && rec.length ? new Set(teamMembers(route, ctxGet().key, rec, ctxDrop(route))) : null; };

/* ---------------- recruit states ---------------- */
/** «no», «quiero» (in the team, still to recruit), «tengo» (in the team, recruited) or «llega» for a unit
    of `route` at chapter `key`. Story joiners: «tengo» from their chapter, «llega» before it, «no» when taken out.
    `c` is ctxGet() or any stored ctx ({team | recruits, have, drop}). */
function teamState(pid, route, key, c = ctxGet()) {
  const x = CHARS[pid]?.routes?.[route]; if (!x) return 'no';
  if (x.join_key) return (c.drop || []).includes(pid) ? 'no' : chapIdx(route, x.join_key) <= chapIdx(route, key) ? 'tengo' : 'llega';
  if (!ctxTeamRaw(c).includes(pid)) return 'no';
  return (c.team ? ctxGotRaw(c) : c.have || []).includes(pid) ? 'tengo' : 'quiero';
}
/** the one count of the selection: the chips of `route` at `key` by state (the lord is no chip). Equipo and Ajustes read it. */
function teamCounts(route, key, c = ctxGet()) {
  const out = { tengo: [], quiero: [], llega: [], no: [] };
  teamChips(route, key).forEach(p => out[teamState(p, route, key, c)].push(p));
  return out;
}
/** «9 en el equipo» (the lord counts) */
const teamCountTxt = n => t('{n} en el equipo', { n: 1 + n.tengo.length + n.quiero.length + n.llega.length });

/* ---------------- selector edits: the list never folds mid-edit ---------------- */
/** editing: the selector was touched since the page was entered (session only). Folded = a saved selection, not editing, and
    not stored as unfolded (ctx.fold === false). «Plegar» folds; entering the page again with a selection shows it folded. */
const teamUi = { editing: false, all: false };  // all: «Ver todos» opened in this visit
const teamLeave = () => { teamUi.editing = false; teamUi.all = false; };
/** one selector action: {eq: pid} cycles a chip, {all: '1'|'0'} marks every recruit «quiero» / clears them, {fold: bool}, {rerun: bool} */
function teamApply(a) {
  if (a.fold != null) { teamUi.editing = !a.fold; if (a.fold) ctxSetFold(true); return; }
  teamUi.editing = true;
  if (a.eq) ctxToggle(a.eq);
}

/* ---------------- whole plan ---------------- */
/** everything the page shows, for `route` at chapter `key` with the picked `recruits` («quiero» + «tengo»); gifts only for `want` */
function teamPlan(route, key, recruits, drop = [], want = recruits) {
  const members = teamMembers(route, key, recruits, drop), prio = teamPriority(route, members, key);
  const choice = teamChoose(route, key, members);
  const pickOf = p => choice[p] && teamOptions(p, route, key).find(o => o.id === choice[p].pick);
  const builds = prio.map(x => teamBuild(x.pid, route, key, pickOf(x.pid)));
  const team = new Set(members);
  const mounts = teamAssignMounts(builds.flatMap(b => teamMountStages(b).map(st => { const ranked = teamMountWants(b.pid, st.kind, b.final_growth, route, key, team);
    return { pid: b.pid, kind: st.kind, ranked, score: Object.fromEntries(ranked.map(r => [r, teamMountSc(MOUNTS[r], b.final_growth) * teamMountMul(st.classes)])) }; })));
  const wantP = prio.map(x => x.pid).filter(p => want.includes(p) && GIFT_BY_PID[p]);
  const gifts = teamGifts(wantP, route, key);
  const shop = teamShopping(route, key, builds, mounts);
  // «tengo»: picked recruits not in «quiero», story joiners from their chapter, the lord
  const have = members.filter(p => !want.includes(p) && (p === LORDS[route] || !CHARS[p].routes[route].join_key || chapIdx(route, CHARS[p].routes[route].join_key) <= chapIdx(route, key)));
  const gear = teamGear(route, key, have, builds);
  return { route, key, prio, choice, builds, mounts, roles: teamRoles(builds, route), gifts, round: teamGiftRound(want.filter(p => members.includes(p) && CHARS[p]?.routes?.[route]?.recruit_key), route, key, members), week: teamWeek(route, key, want.filter(p => members.includes(p))), shop,
    gear, forge: teamForge(route, key, builds, shop, gear) };
}
