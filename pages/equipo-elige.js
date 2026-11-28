/* Fortune's Weave · team planner, what the old Planificador brought to Equipo: team size from the deploy tiles (planSize), the classes,
   weapons and equipment a unit can be given, the share link (?e=, planEnc/planDec), «Completar equipo» (teamFill), the build and gear
   picks of each unit with their auto values (teamSlots) and what a shared link holds (teamLink). equipo.js draws them. */
'use strict';
const PLAN_MAX = 30;  // more than any battle deploys (planSize); a cap for hand-edited links
/** plan → ?e= value ('' when empty, so the param goes away) */
const planEnc = units => (units.length ? b64url(JSON.stringify(units)) : '');
/** ?e= value (untrusted) → [[pid, jid, [iid, iid, iid], build id]]; unknown ids become '', unknown units are dropped; never throws.
    The 4th slot was a free note in the old planner links: a note that is no build id is ignored where it is read (teamLink) */
function planDec(s) {
  let a; try { a = JSON.parse(unb64url(s || '')); } catch (e) { return []; }
  if (!Array.isArray(a)) return [];
  const seen = new Set();
  const own = (o, k) => typeof k === 'string' && Object.hasOwn(o, k);  // «__proto__», «constructor»… are no ids
  return a.filter(u => Array.isArray(u) && own(CHARS, u[0]) && !seen.has(u[0]) && seen.add(u[0])).slice(0, PLAN_MAX)
    .map(([pid, jid, w, n]) => [pid, own(CLASSES, jid) ? jid : '', (Array.isArray(w) ? w : []).slice(0, 3).map(k => (own(ITEMS, k) ? k : '')),
      typeof n === 'string' ? n.slice(0, 200) : '']);
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
const planPt = partBlk;  // core.js: '1' (prologue and Part 1) or '3' (Parts 2–3)
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

/* ---------------- «Completar equipo» ---------------- */
const FILL_ROLES = ['sanador', 'arquero', 'mago', 'volador', 'tanque'];  // what a missing role costs most first: nobody heals, then range, magic…
/** units out of the team (`c`: ctxGet() or a stored ctx) on `route` at `key`: the route's chips, and in Part 1 only who joins there */
const teamOut = (route, key, c = ctxGet()) => teamChips(route, key).filter(p => teamState(p, route, key, c) === 'no' && (planPt(key) !== '1' || joinsP1(p, route)));
/** «Completar equipo»: [{pid, why}] for the free places up to planSize: per missing role (FILL_ROLES order) the best-rated unit that covers
    it, then the best-rated ones (the route's build tier in Part 1, the Parts 2–3 one after; no rating last, then who joins first) */
function teamFill(route, key, c = ctxGet()) {
  const pt = planPt(key), pool = teamOut(route, key, c), inTeam = teamChips(route, key).filter(p => teamState(p, route, key, c) !== 'no');
  const n = planSize(route, pt) - 1 - inTeam.length;
  if (n <= 0 || !pool.length) return [];
  const memo = {}, roles = p => (memo[p] ??= teamUnitRoles(p, route, key));
  const have = new Set([LORDS[route], ...inTeam].flatMap(roles));
  const tiers = (((window.WIKI_EXT || {}).builds || {}).tiers || {})[pt === '1' ? route : 'final'] || {}, where = pt === '1' ? ROUTE_NAME[route] : t('Partes 2 y 3');
  const prio = teamPriority(route, pool, key).map(x => x.pid), order = [...prio].sort((a, b) => buildRank(tiers[a]) - buildRank(tiers[b]) || prio.indexOf(a) - prio.indexOf(b));
  const out = [], why = (p, r) => [tiers[p] ? t('{t} en {r}', { t: tiers[p], r: where }) : t('sin valoración'), r && t('cubre {r}', { r: roleName(r) })].filter(Boolean).join(' · ');
  const take = (p, r) => { out.push({ pid: p, why: why(p, r) }); roles(p).forEach(x => have.add(x)); };
  for (const r of FILL_ROLES) if (out.length < n && !have.has(r)) { const p = order.find(x => !out.some(o => o.pid === x) && roles(x).includes(r)); if (p) take(p, r); }
  for (const p of order) if (out.length < n && !out.some(o => o.pid === p)) take(p);
  return out;
}

/* ---------------- a unit's build and gear: auto unless picked by hand ---------------- */
const PICK_F = ['b', 'c', 'w0', 'w1', 'g', ...MOUNT_KINDS.map(k => 'm' + k)];
/** one hand pick in Equipo for block `pt` (default: the game's): f 'b' (build id), 'c' (class: hand-picked weapons it cannot use go),
    'w0', 'w1', 'g' (an item id, '' = none), 'm<Kind>' (the mount for that mount type, '' = automatic); 'reset' clears the unit (back to auto). Unknown units, fields and ids are ignored */
function teamPickSet(route, pid, f, v, pt = partBlk(ctxGet().key)) {
  if (!Object.hasOwn(CHARS, pid) || (f !== 'reset' && !PICK_F.includes(f)) || (f !== 'reset' && f !== 'b' && !CTX_PICK[f](String(v)))) return;
  const all = ctxPicks(route, undefined, pt), u = { ...all[pid] };
  if (f === 'reset') delete all[pid];
  else {
    u[f] = String(v);
    if (f === 'c') { const ok = new Set(planWeapons(u.c)); ['w0', 'w1'].forEach(w => { if (u[w] && !ok.has(u[w])) delete u[w]; }); }
    all[pid] = u;
  }
  ctxSetPicks(route, all, pt);
}
/** «Hazlo todo»: completes the team (teamFill) and fixes the recommended build of every unit with no build chosen; hand picks stay */
function teamDoAll(route, key) {
  teamApply({ add: teamFill(route, key).map(x => x.pid) });
  const pt = partBlk(key), all = ctxPicks(route, undefined, pt), p = teamPlan(route, key, ctxRecruits(route), ctxDrop(route), ctxWant(route), all);
  p.builds.forEach(b => { const ch = p.choice[b?.pid]; if (ch && !all[b.pid]?.b) all[b.pid] = { ...all[b.pid], b: ch.rec }; });
  ctxSetPicks(route, all, pt);
}
const SLOT_POOL = {}, SLOT_CAT = {};
const slotPool = (route, key) => (SLOT_POOL[route + '|' + key] ??= teamGearPool(route, key));
const slotCat = (route, pt) => (SLOT_CAT[route + '|' + pt] ??= gearCatalog(route, +pt));
/** the class build `b` is in, or heads for, at `key`: the class it has reached when that class uses the build's weapon, else the next
    class of its path that does (next: that step, with the chapter of its exam) */
function teamSlotClass(b, route, key) {
  const now = teamClassAt(b, route, key), main = armaKey(b.weapon || '');
  const uses = j => !main || (CLASSES[j]?.weapons_usable || []).map(armaKey).includes(main);
  if (uses(now)) return { c: now, next: null };
  const i = chapIdx(route, key), st = (b.steps || []).find(s => !(s.key && chapIdx(route, s.key) <= i) && uses(s.jid)) || (b.steps || []).find(s => uses(s.jid));
  return st ? { c: st.jid, next: st } : { c: now, next: null };
}
const RANK_N = { E: 1, D: 3, C: 5, B: 7, A: 9, S: 10 };  // the game's proficiency scale (teamRankCap)
/** a unit's own spells of magic `type` (magia-negra / magia-blanca) it can know by `key` (the chapter's rank cap): [[sid, name]] */
const teamSpells = (pid, type, key) => { const tn = (ARMAS.find(a => a[0] === type) || [])[1], cap = teamRankCap(key);
  return ((((window.WIKI_EXT || {}).detalle || {}).learn || {})[pid] || []).filter(([pr, rk]) => pr === tn && RANK_N[rk] <= cap).map(x => [x[2], x[3]]); };
/** class, weapon 1, weapon 2 and equipment of build `b` (teamBuild) at `key`, with `gear` (its teamGear row) and the hand `pick`.
    Auto, from the build: the class of its path it is in or heads for (teamSlotClass); weapon 1 of the build's weapon type, the one teamGear
    hands out (else the strongest on hand within the chapter's rank cap, rated first on a tie); weapon 2 a backup
    of a type the class uses: a ranged one when weapon 1 is melee, else the cheapest of the build's type; a caster build (magic) carries
    its own spells and no physical weapon. Equipment: the accessory teamGear's rules give, else the best rated in Mejor equipamiento on
    hand (an equipment staff for healers and casters, a shield for tanks, an accessory for the rest; never a cursed treasure).
    A pick the class or the lists do not offer is ignored. → {c, next, w0, w1, g, magic, spells, spellIds, auto: {c, w0, w1, g}, cls, ws} */
function teamSlots(b, gear, route, key, pick = {}) {
  const pt = planPt(key), sc = teamSlotClass(b, route, key), cls = planClasses(b.pid, route, pt, sc.c);
  const c = pick.c && cls.includes(pick.c) ? pick.c : sc.c, ws = planWeapons(c), eq = new Set(planEquip());
  const pool = slotPool(route, key), cap = teamRankCap(key), p1 = CAPS[key]?.part === 1, main = armaKey(b.weapon || ''), ty = k => armaKey(ITEMS[k].weapon.type);
  const price = k => ITEMS[k].price || Math.min(...(pool[k] || []).map(x => x.price || 0)), wpn = k => ITEMS[k].weapon;  // the list price: a barter or a chest is no «cheap» weapon
  const onHand = ws.filter(k => pool[k] && (wpn(k).rank?.[RANK_OF[ty(k)]] || 1) <= cap && !(p1 && isSilver(k)))
    .sort((x, y) => (ty(y) === main) - (ty(x) === main) || teamTierN(x, key) - teamTierN(y, key) || (wpn(y).might || 0) - (wpn(x).might || 0) || price(x) - price(y));
  const magic = /^magia-/.test(main) ? main : null, has = (f, ok) => Object.hasOwn(pick, f) && (pick[f] === '' || ok(pick[f]));
  const a0 = magic ? '' : (c === sc.c && gear?.now && ws.includes(gear.now.iid) ? gear.now.iid : onHand.find(k => ty(k) === main) || onHand[0] || '');
  const w0 = has('w0', k => ws.includes(k)) ? pick.w0 : a0;
  const rest = onHand.filter(k => k !== w0), byPrice = xs => [...xs].sort((x, y) => price(x) - price(y) || (wpn(y).might || 0) - (wpn(x).might || 0));
  const melee = !w0 || (wpn(w0).range?.[1] || 1) < 2;
  const a1 = magic ? '' : (melee && byPrice(rest.filter(k => (wpn(k).range?.[1] || 1) >= 2))[0]) || byPrice(rest.filter(k => ty(k) === (w0 ? ty(w0) : main)))[0] || byPrice(rest)[0] || '';
  const w1 = has('w1', k => ws.includes(k)) ? pick.w1 : a1;
  const roles = b.roles || [], kind = magic || roles.includes('sanador') || roles.includes('mago') ? 'baston' : roles.includes('tanque') ? 'escudo' : 'acc';
  const here = chapIdx(route, key), cat = slotCat(route, pt), find = ty2 => (cat[ty2] || []).find(x => x.idx >= 0 && x.idx <= here && eq.has(x.iid) && !isCursed(x.iid))?.iid;
  const ag = gear?.acc?.iid && eq.has(gear.acc.iid) ? gear.acc.iid : find(kind) || find('acc') || '';
  const g = has('g', k => eq.has(k)) ? pick.g : ag;
  const sp = magic ? teamSpells(b.pid, magic, key) : [];
  return { c, next: c === sc.c ? sc.next : null, w0, w1, g, magic, spells: sp.map(x => x[1]), spellIds: sp.map(x => x[0]),
    auto: { c: !(pick.c && c === pick.c), w0: !has('w0', k => ws.includes(k)), w1: !has('w1', k => ws.includes(k)), g: !has('g', k => eq.has(k)) }, cls, ws };
}
/** the gear row (teamGear) follows the unit's weapon 1 when it differs (a hand pick, a weapon the build names, a caster) */
function teamGearSync(g, s, route, key) {
  g.spells = s.magic || null;
  if ((g.now?.iid || '') === s.w0) return;
  const src = (slotPool(route, key)[s.w0] || [])[0];
  g.now = s.w0 ? { iid: s.w0, ...(src || { kind: 'mano', where: '', once: false }), heavy: false, loss: Math.max(0, (ITEMS[s.w0].weapon.weight || 0) - (g.con || 0)) } : null;
  if (!s.w0) g.options = [];
}

/* ---------------- the share link (#/equipo?r=&pt=&k=&e=) ---------------- */
/** the team on `route` at `key` (the lord, story joiners not taken out, the recruits in the team) with its hand picks, as planEnc units
    [[pid, class, [weapon 1, weapon 2, equipment], build id]] ('' = auto: a «none on purpose» travels as auto) */
const teamLink = (route, key, c = ctxGet(), picks = ctxPicks(route, undefined, partBlk(key))) => [LORDS[route], ...teamChips(route, key).filter(p => teamState(p, route, key, c) !== 'no')]
  .sort(bySerial).map(p => { const k = picks[p] || {}; return [p, k.c || '', [k.w0 || '', k.w1 || '', k.g || ''], k.b || '']; });
/** what a shared link holds, read like the page reads it: route (?r=, else the game's), part (?pt=, else the game's), the chapter (the
    sender's ?k= when it is on that route and part, else the game's or the part's first: buildsKey; moved on to the last story join of the
    link, so every unit of it counts), every unit on that route (Part 1: who joins there) with the lord — never cut: the battle size is
    advice —, the recruits among them, the story joiners left out (drop: only those the link's part can carry), the hand picks (a build
    id only when it is one of that unit's builds: an old planner note is not) and carry(pid): the units such a link speaks for */
function teamLinkRead(qs) {
  const r = ROUTE_IDS.includes(qs.r) ? qs.r : ctxRoute() || 'cai', pt = ['1', '3'].includes(qs.pt) ? qs.pt : ctxChosen() ? planPt(ctxGet().key) : '1';
  const carry = p => p === LORDS[r] || (pt === '1' ? joinsP1(p, r) : !!CHARS[p]?.routes?.[r]);
  const units = planDec(qs.e).filter(u => carry(u[0])), pids = units.map(u => u[0]);
  const k0 = typeof qs.k === 'string' && Object.hasOwn(CAPS, qs.k) && partBlk(qs.k) === pt && chapIdx(r, qs.k) >= 0 ? qs.k : buildsKey(r, +pt);
  const at = Math.max(chapIdx(r, k0), ...pids.map(p => chapIdx(r, CHARS[p].routes?.[r]?.join_key)).filter(i => i >= 0)), key = routeChapters(r)[at]?.key || k0;
  const picks = Object.fromEntries(units.map(([p, c, w, b]) => [p, Object.fromEntries([['b', teamOptions(p, r, key).some(o => o.ok && o.id === b) ? b : ''], ['c', c], ['w0', w[0]], ['w1', w[1]], ['g', w[2]]].filter(([, v]) => v))])
    .filter(([, x]) => Object.keys(x).length));
  const recruits = pids.filter(p => CHARS[p].routes?.[r]?.recruit_key && !CHARS[p].routes[r].join_key);
  const drop = teamCandidates(r).auto.filter(p => p !== LORDS[r] && carry(p) && !pids.includes(p));
  return { r, pt, key, units, picks, recruits, drop, carry };
}
/** the game's chapter after «Usar como mi equipo»: kept on the same route; another route keeps the part and chapter number (Parts 2–3
    and the prologue are shared chapters); a link of another part goes to the link's chapter */
function teamUseKey(x) {
  const cur = ctxGet(), c = CAPS[cur.key];
  if (ctxChosen() && cur.route === x.r) return cur.key;
  if (!ctxChosen() || partBlk(cur.key) !== x.pt) return x.key;
  return c.route === 'comun' ? cur.key : chapterFromPath(x.r, c.part, c.n);
}
/** what the confirm adds when the link is of another route: where the game goes */
const teamUseNote = qs => { const x = teamLinkRead(qs);
  return ctxChosen() && ctxGet().route === x.r ? '' : t('Tu partida pasará a la ruta de {r} ({c}).', { r: ROUTE_NAME[x.r], c: capShort(CAPS[teamUseKey(x)]) }); };
/** «Usar como mi equipo»: the game takes the link's route (teamUseKey), team and hand picks for that route and part. The team, «tengo»
    and drop lists are shared by every route: a unit listed on another route too is never taken out (adding is safe), «tengo» is never
    cleared, and only units the link's part can carry are decided by it (a Part 1 link says nothing of Parts 2–3) */
function teamUseLink(qs) {
  const x = teamLinkRead(qs), pids = x.units.map(u => u[0]), cur = ctxGet();
  if (!ctxChosen() || cur.route !== x.r) ctxSet(x.r, teamUseKey(x));
  const only = (p, k) => ROUTE_IDS.filter(r => CHARS[p]?.routes?.[r]?.[k]).length === 1;
  const raw = ctxTeamRaw(), mine = (p, k) => !!CHARS[p]?.routes?.[x.r]?.[k] && only(p, k) && x.carry(p);
  const team = [...raw.filter(p => !(mine(p, 'recruit_key') && !CHARS[p].routes[x.r].join_key && !pids.includes(p))), ...x.recruits.filter(p => !raw.includes(p))];
  const drop = [...ctxGet().drop.filter(p => !mine(p, 'join_key')), ...x.drop.filter(p => only(p, 'join_key'))];
  ctxSave({ team, drop });
  ctxSetPicks(x.r, x.picks, x.pt);
}
