/* Fortune's Weave · wiki2 · Clases y combate › Calculadora de combate (#/calculadora): one attack and its counter between a unit
   (character or manual numbers) and an enemy of the battles data (or manual numbers). Everything lives in the address, so a result
   can be shared. Formulas: Tablas de combate (mecanicas.js); research and confidence per formula in the damage report. */
'use strict';

/** pure combat formulas (tests: tests/calculadora.test.mjs) */
const CALC = (() => {
  const con = str => Math.floor(Math.max(0, str) / 5);
  /** attack speed: Vel minus the weight the Con does not carry; never below 0, never above Vel */
  const aspd = (spd, str, weight) => Math.max(0, spd - Math.max(0, weight - con(str)));
  const doubles = (a, b, noFollow = false) => !noFollow && a - b >= 4;
  /** attack: stat + might × effectiveness (effectiveness multiplies the might only) */
  const atk = (stat, might, eff = 1) => stat + might * eff;
  /** one hit: multipliers already summed (crit 3, sword follow-up 1.2, both 3.2), truncated; an axe hit deals at least 5 */
  const damage = (a, d, mult = 1, axe = false) => Math.max(axe ? 5 : 0, Math.trunc(Math.max(0, a - d) * mult + 1e-9));
  const hit = (wHit, dex, lck, magic) => wHit + (magic ? Math.floor((dex + lck) / 2) : dex);
  const crit = (wCrit, dex, lck) => wCrit + Math.floor((dex + lck) / 2);
  const shown = n => Math.max(0, Math.min(100, Math.round(n)));
  /** real chance of a shown hit: the same below 50, higher above (shortcut: curve from the web table, not from game data) */
  const trueHit = h => (h < 50 ? h : Math.round((h + (40 / 3) * (h / 100) * Math.sin(Math.PI * (h - 50) / 50)) * 10) / 10);

  const sk = w => w?.equip_skills || [];
  const isMagic = w => /^magia/.test(w?.type || '') || sk(w).includes('SID_魔法攻撃効果');
  /** the weapon skill's target → unit type (core.js unitTypes). The Cleansing Blade (清めの剣効果) is no effectiveness: it cancels Underworld Boon */
  const EFF_T = { 騎兵: 'jinete', 飛行: 'volador', 重装: 'acorazado', 獣: 'bestia', 冥魔: 'nomuerto' };
  /** effectiveness of weapon w against unit types: 2 (eficaz), 3 (muy eficaz) or 1; only the highest counts */
  const eff = (w, types) => Math.max(1, ...sk(w).map(s => s.match(/^SID_(.+?)(有効|特効)$/)).filter(m => m && types.includes(EFF_T[m[1]])).map(m => (m[2] === '特効' ? 3 : 2)));
  /** a dismounted class (JID_…下馬) has no entry of its own: its mounted class (base stats, growth), with the dismount flat modifiers
      (shortcut: the mounted class's growth, the data keeps no growth row for the dismounted class) */
  const cls = jid => CLASSES[jid] || CLASSES[String(jid || '').replace(/下馬$/, '')];
  const flat = jid => CLASSES[jid]?.flat_modifiers || cls(jid)?.dismounted?.flat_modifiers || {};
  /** weight of the shields and accessories in an item list (it adds to the weapon's weight) */
  const gearWeight = iids => iids.filter(x => /^(Escudos|Accesorios)/.test(ITEMS[x]?.section || '')).reduce((n, x) => n + (ITEMS[x].weapon?.weight || 0), 0);

  /** one direction: u attacks v. u/v = {st, w, ew (equipment weight), types, terr: {avo, def}, hitMod, critMod}; null when u has no weapon or v is out of range */
  function side(u, v, dist, effOver) {
    const w = u.w;
    if (!w || !w.range || dist < w.range[0] || dist > w.range[1]) return null;
    const mag = isMagic(w), toDef = !mag || sk(w).includes('SID_物理防御効果'), axe = sk(w).includes('SID_斧スキル'), sword = sk(w).includes('SID_剣スキル');
    const e = effOver || eff(w, v.types || []), a = atk(mag ? u.st.Mag : u.st.Str, w.might, e);
    const d = (toDef ? v.st.Def : v.st.Res) + (v.terr?.def || 0);
    const gauntletVs = vw => sk(vw).includes('SID_籠手スキル') && !sk(w).includes('SID_籠手スキル') ? 15 : 0;  // the defender's gauntlets
    const asU = aspd(u.st.Spd, u.st.Str, (w.weight || 0) + (u.ew || 0)), asV = aspd(v.st.Spd, v.st.Str, (v.w?.weight || 0) + (v.ew || 0));
    const avo = asV + (v.w?.avoid || 0) + gauntletVs(v.w) + (v.terr?.avo || 0);
    const h = shown(hit(w.hit, u.st.Dex, u.st.Lck, mag) + (u.hitMod || 0) - avo), c = shown(crit(w.crit, u.st.Dex, u.st.Lck) + (u.critMod || 0) - v.st.Lck - (v.w?.dodge || 0));
    const n = doubles(asU, asV, sk(w).includes('SID_追撃禁止効果')) ? 2 : 1;
    return { dmg: damage(a, d, 1, axe), crit: damage(a, d, 3, axe), dmg2: damage(a, d, sword ? 1.2 : 1, axe), crit2: damage(a, d, sword ? 3.2 : 3, axe),
      n, hit: h, real: trueHit(h), crt: c, eff: e, as: asU, con: con(u.st.Str), mag, toDef, pure: sk(w).some(x => /清めの剣効果/.test(x)) };
  }
  /** attack A → D and the counter; hpA/hpD after the exchange if every hit lands and none crits (A, D, then the follow-ups) */
  function fight(A, D, { dist = 1, eff: effOver = 0 } = {}) {
    const ad = side(A, D, dist, effOver), da = side(D, A, dist, 0);
    let hpA = A.st.HP, hpD = D.st.HP;
    const seq = [[ad, 1], [da, 1], [ad, 2], [da, 2]];
    for (const [s, k] of seq) {
      if (!s || hpA <= 0 || hpD <= 0 || s.n < k) continue;
      const v = k === 2 ? s.dmg2 : s.dmg;
      if (s === ad) hpD = Math.max(0, hpD - v); else hpA = Math.max(0, hpA - v);
    }
    return { ad, da, hpA, hpD };
  }

  const K = ['HP', 'Str', 'Mag', 'Dex', 'Spd', 'Lck', 'Def', 'Res'];
  /** estimated stats at level lv: base + growth × (lv − 1) ÷ 100 + class flat modifier (+ adj), rounded down */
  const est = (base, growth, jid, lv, adj = []) => Object.fromEntries(K.map((k, i) => [k, Math.max(0, Math.floor((base[k] || 0) + (growth[k] || 0) * (lv - 1) / 100 +
    (flat(jid)[k] || 0) + (adj[i] || 0)))]));
  const B = () => (window.WIKI_EXT || {}).batallas || { b: [] };
  /** enemy `i` of battle `bid` at army level `ej`, difficulty 'n' | 'h': {u, lv, cls, st, iid, ew, types, known} or null */
  function foe(bid, i, ej, d) {
    const b = B().b.find(x => x.id === bid), u = b?.e?.[i];
    if (!u) return null;
    const m = String(u.lv).match(/^ej\.([+-]\d+)?$/), lv = Math.max(1, Math.min(99, m ? ej + (+m[1] || 0) : +u.lv || 1));
    const C = cls(u.c), st0 = u.st ? Object.fromEntries(K.map((k, j) => [k, u.st[j]])) : C?.class_base_stats;
    const iid = (u.it || []).flat().find(x => ITEMS[x]?.weapon?.type) || '';
    return { u, b, lv, cls: u.c, known: !!st0, st: est(st0 || {}, C?.class_base_growth || {}, u.c, lv, d === 'h' ? u.sh : u.sn), iid, ew: gearWeight((u.it || []).flat()), types: unitTypes(u.c) };
  }
  /** a character's estimated stats in class jid at level lv (personal base; personal growth + class growth modifier) */
  function unit(pid, jid, lv) {
    const cb = teamCombat(pid), g = cb.growth || {}, gm = CLASSES[jid]?.growth_modifiers || {};
    return est(cb.base || {}, Object.fromEntries(K.map(k => [k, (g[k] || 0) + (gm[k] || 0)])), jid, lv);
  }
  return { con, aspd, doubles, atk, damage, hit, crit, shown, trueHit, eff, cls, isMagic, fight, foe, unit, est, K, B };
})();

(() => {
  const PATH = 'calculadora', K = CALC.K, OVR = p => K.map(k => p + k);
  const int = (v, lo, hi, dflt) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : dflt; };
  /** number params and their bounds: links are built from the clamped values (junk like dl=Infinity never travels on) */
  const NUM = { al: [1, 99], dl: [1, 99], ej: [1, 99], rg: [1, 10], ef: [0, 3], aq: [0, 99], dq: [0, 99], ...Object.fromEntries([...OVR('a'), ...OVR('d')].map(k => [k, [0, 999]])) };
  const clean = qs => Object.fromEntries(Object.entries(qs || {}).flatMap(([k, v]) => { if (!NUM[k]) return [[k, v]]; const n = int(v, ...NUM[k], null); return n == null ? [] : [[k, String(n)]]; }));
  const clsName = j => { const c = CALC.cls(j); return c ? nm(c) + (/下馬$/.test(j) ? ' ' + t('(a pie)') : '') : ''; };
  const unitName = u => (!JP_ANY.test(u.n) ? gt(u.n) : clsName(u.c) || gt(CALC.B().names?.[u.c] || '') || '?');
  /** repeated labels get «(2)», «(3)»… so every option reads differently */
  const dedupe = opts => { const tot = {}, n = {}; opts.forEach(([, l]) => { tot[l] = (tot[l] || 0) + 1; });
    return opts.map(([v, l]) => [v, tot[l] > 1 && (n[l] = (n[l] || 0) + 1) > 1 ? `${l} (${n[l]})` : l]); };
  const TERR = [['', 'Llano'], ['e20', 'Esq +20 (matorral, arboleda)'], ['e30', 'Esq +30 (bosque, maleza)'], ['e40', 'Esq +40 (espesura, punto Esq)'],
    ['d3', 'Agu y Rsl +3 (punto Agu o Rsl)'], ['p', 'Punto protector (Esq +30, Agu y Rsl +3)'], ['m10', 'Esq −10 (ciénaga)'], ['m20', 'Esq −20 (desierto, orilla, yermo)'], ['m30', 'Esq −30 (hielo)']];
  const terr = (v, types) => { if (types.includes('volador')) return { avo: 0, def: 0 };  // fliers ignore terrain
    const m = String(v || '').match(/^([edmp])(\d*)$/) || []; return { avo: m[1] === 'e' ? +m[2] : m[1] === 'm' ? -m[2] : m[1] === 'p' ? 30 : 0, def: m[1] === 'd' || m[1] === 'p' ? 3 : 0 }; };
  // controls: the wiki's filter pills (core.js fselHtml); every name says its side, so a screen reader (and the focus kept across renders) tells them apart
  const named = (label, side) => `aria-label="${esc(label + ' · ' + side)}"`;
  /** select whose options are addresses (shell.js navigates on change): picking drops the `drop` params */
  const navSel = (label, side, qs, key, opts, cur, drop) => {
    const base = Object.fromEntries(Object.entries(qs).filter(([k]) => !drop.includes(k))), go = v => qsHref(PATH, base, { [key]: v });
    const map = o => (o.o ? { g: o.g, o: o.o.map(map) } : [go(o[0]), o[1]]);
    return fselHtml(label, `data-nav ${named(label, side)}`, opts.map(map), go(cur));
  };
  const qsSel = (label, side, key, opts, cur) => fselHtml(label, `data-qs="${PATH}" name="${key}" ${named(label, side)}`, opts, cur);
  const numIn = (label, side, key, val, [lo, hi]) => `<label class="cc-n"><span>${esc(label)}</span><input type="number" inputmode="numeric" min="${lo}" max="${hi}" data-qs="${PATH}" name="${key}" value="${esc(val)}" ${named(label, side)}></label>`;
  const byTier = js => js.sort((a, b) => (+CLASSES[a].tier || 0) - (+CLASSES[b].tier || 0) || nm(CLASSES[a]).localeCompare(nm(CLASSES[b]), LANG));
  const allClasses = () => byTier(Object.keys(CLASSES).filter(j => CLASSES[j].class_base_stats));
  /** weapons a player can have for the class (planner: no «+N» copies, no tutorial or enemy-only gear), one per name; plus `cur` from a shared link */
  const weapons = (jid, cur) => { const seen = new Set(), ks = planWeapons(jid).filter(k => !seen.has(nm(ITEMS[k])) && seen.add(nm(ITEMS[k])));
    return [...(cur && ITEMS[cur]?.weapon?.type && !ks.includes(cur) ? [cur] : []), ...ks].map(k => [k, nm(ITEMS[k])]); };
  const statRow = (p, side, st) => `<div class="cc-st">${K.map(k => numIn(statName(k), side, p + k, st[k], NUM[p + k])).join('')}</div>`;
  const over = (qs, p, st) => Object.fromEntries(K.map(k => [k, int(qs[p + k], 0, 999, st[k])]));

  function result(title, s, who, vs) {
    if (!s) return card(title, `<p>${esc(t('{u} no puede atacar a esa distancia.', { u: who }))}</p>`);
    const cr = s.crit !== s.dmg ? ` <span class="mut">(${esc(t('crítico {n}', { n: s.n === 2 && s.crit2 !== s.crit ? `${s.crit}/${s.crit2}` : s.crit }))})</span>` : '';
    return card(title, kvRows([
      [t('Daño por golpe'), `${s.n === 2 && s.dmg2 !== s.dmg ? `${s.dmg}/${s.dmg2}` : s.dmg}${cr}`],
      [t('Golpes'), s.n === 2 ? t('2 (ataque doble)') : '1'],
      [t('Golpe'), pct(s.hit) + (s.real !== s.hit ? ` <span class="mut">(${esc(t('real {n}', { n: pct(s.real) }))})</span>` : '')],
      [t('Crítico'), pct(s.crt)],
      [t('Eficacia'), s.eff > 1 ? `×${s.eff}` : '—'],
      [t('Velocidad de ataque (VA)'), `${s.as} <span class="mut">(Con ${s.con})</span>`],
      [t('Se resta'), esc(s.toDef ? t('Def de {u}', { u: vs }) : t('Res de {u}', { u: vs }))]]) +
      (s.pure ? `<p class="mut">${t('La Espada purificadora no es eficaz contra muertos vivientes: anula el Favor infernal del rival, que aquí no se cuenta.')}</p>` : ''));
  }
  /** the answer in one line: kill (in how many hits, at what hit rate) or how much HP is left, whether a crit kills, how many hits it takes */
  function verdict(r, hp, nameA) {
    const s = r.ad;
    if (!s) return t('{u} no puede atacar a esa distancia.', { u: nameA });
    const hits = s.n === 2 ? [s.dmg, s.dmg2] : [s.dmg], crits = [s.crit, s.crit2], sum = hits[0] + (hits[1] || 0);
    if (!sum) return t('No le haces daño.');
    if (!r.hpD) return hits[0] >= hp ? t('Lo matas de un golpe (acierto {h})', { h: pct(s.hit) }) : t('Lo matas en {n} golpes (acierto {h})', { n: 2, h: pct(s.hit) });
    if (!r.hpA) return t('No lo matas: {u} cae antes en el contraataque.', { u: nameA });
    const left = t('No lo matas: le dejas a {n} PV', { n: r.hpD });
    if (s.crt > 0 && hits.some((h, i) => sum - h + crits[i] >= hp)) return `${left}; ${t('con crítico ({c}) sí.', { c: pct(s.crt) })}`;
    let g = 0, m = 0, rest = hp;
    while (rest > 0) { m++; for (const h of hits) if (rest > 0) { rest -= h; g++; } }
    return `${left}; ${t('harían falta {g} golpes ({m} combates).', { g, m })}`;
  }

  function render(id, qs0) {
    if (id) return notFound();
    const qs = clean(qs0);
    const D = CALC.B(), route = ctxRoute(), lord = LORDS[route] || 'PID_カイ', capLv = CAPS[ctxKey()]?.level?.[0] || 10;
    const cp = ctxChosen() ? CAPS[ctxKey()]?.part : 1, part = qs.p === '3' ? 3 : qs.p === '1' ? 1 : cp >= 2 ? 3 : 1, pt = String(part);
    const A_ = t('Atacante'), D_ = t('Defensor');
    // attacker
    const manA = qs.a === '-', pid = !manA && CHARS[qs.a]?.combat ? qs.a : lord;
    const jidA = CLASSES[qs.ac]?.class_base_stats ? qs.ac : manA ? 'JID_剣士' : (CHARS[pid]?.combat?.class || 'JID_無職');
    const lvA = int(qs.al, 1, 99, capLv);
    const stA = over(qs, 'a', manA ? CALC.est(CLASSES[jidA].class_base_stats, CLASSES[jidA].class_base_growth || {}, jidA, lvA) : CALC.unit(pid, jidA, lvA));
    const wsA = weapons(jidA, qs.w), wA = ITEMS[qs.w]?.weapon?.type ? qs.w : (wsA.find(([k]) => /^IID_鉄の/.test(k) && armaKey(ITEMS[k].weapon.type) === armaKey(CLASSES[jidA].weapons_usable?.[0])) || wsA[0] || [''])[0];  // an iron weapon of the class's first type
    const nameA = manA ? t('Tu unidad') : nm(CHARS[pid]);
    // defender: the battles of the save's route in Part 1 (with the Prologue), or of Parts 2–3; by part, in chapter order
    const RN = ROUTE_NAME[route], PART = [t('Prólogo'), t('Parte 1'), t('Parte 2'), t('Parte 3')];
    const offered = x => x.e?.length && (x.p == null || (part === 3 ? x.p >= 2 : x.p === 0 || (x.p === 1 && (!RN || (x.r || []).includes(RN)))));
    const chOf = x => (x.ch || []).find(c => c[0] === RN) || x.ch?.[0];
    const grp = x => (x.p == null ? t('Otras batallas') : x.p === 1 && !RN ? `${PART[1]} · ${x.r?.[0] || ''}` : PART[x.p]);
    const batLabel = x => (chOf(x) ? capShort({ part: x.p, n: chOf(x)[1] }) + ' · ' : '') + dataTx(x.t);
    const list = D.b.filter(offered).map((x, i) => ({ x, i, g: grp(x), n: chOf(x)?.[1] || 0 }))
      .sort((a, b) => (a.x.p ?? 9) - (b.x.p ?? 9) || a.g.localeCompare(b.g) || a.n - b.n || a.i - b.i);
    const ids = list.map(o => o.x.id);
    const here = () => {  // the save's chapter battle (or the next one with enemies), when the Part switch shows the save's part
      if (!ctxChosen() || (cp >= 2 ? 3 : 1) !== part) return null;
      const ch = routeChapters(route); for (const c of ch.slice(Math.max(0, chapIdx(route, ctxKey())))) for (const b of c.battles || []) if (ids.includes(b.id)) return b.id;
      return null;
    };
    const d = qs.d === 'h' ? 'h' : 'n', manD = qs.b === '-';
    const bat = !manD && (D.b.find(x => x.id === qs.b && x.e?.length) || D.b.find(x => x.id === (here() || ids[0]))) || null;
    const ei = bat ? int(qs.e, 0, bat.e.length - 1, 0) : 0, ej = int(qs.ej, 1, 99, bat?.lv?.[0] || 1);
    const f = bat ? CALC.foe(bat.id, ei, ej, d) : null;
    const jidD = f ? f.cls : CLASSES[qs.dc]?.class_base_stats ? qs.dc : 'JID_兵士';
    const lvD = f ? f.lv : int(qs.dl, 1, 99, capLv);
    const stD = over(qs, 'd', f ? f.st : CALC.est(CLASSES[jidD].class_base_stats, CLASSES[jidD].class_base_growth || {}, jidD, lvD));
    const wsD = f ? [...new Set([f.iid, ...(f.u.it || []).flat()])].filter(x => ITEMS[x]?.weapon?.type).map(x => [x, nm(ITEMS[x])]) : weapons(jidD, qs.dw);
    const wD = qs.dw === '-' ? '' : ITEMS[qs.dw]?.weapon?.type ? qs.dw : f ? f.iid : (wsD[0] || [''])[0];
    const nameD = f ? unitName(f.u) : t('Enemigo');
    const typesA = unitTypes(jidA), typesD = f ? f.types : unitTypes(jidD);
    const ewA = int(qs.aq, 0, 99, 0), ewD = int(qs.dq, 0, 99, f ? f.ew : 0);
    const dist = int(qs.rg, 1, 10, ITEMS[wA]?.weapon?.range?.[0] || 1), effO = int(qs.ef, 0, 3, 0);
    const A = { st: stA, w: ITEMS[wA]?.weapon, ew: ewA, types: typesA, terr: terr(qs.ta, typesA) };
    const E = { st: stD, w: ITEMS[wD]?.weapon, ew: ewD, types: typesD, terr: terr(qs.td, typesD), hitMod: f && d === 'n' ? -30 : 0, critMod: f && d === 'n' ? -50 : 0 };
    const r = CALC.fight(A, E, { dist, eff: effO });
    const dropA = [...OVR('a'), 'w', 'ac'], dropD = [...OVR('d'), 'e', 'dw', 'ej', 'dq'], typed = p => OVR(p).some(k => qs[k] != null && qs[k] !== '');
    const reset = p => (typed(p) ? ` <a href="${esc(qsHref(PATH, Object.fromEntries(Object.entries(qs).filter(([k]) => !OVR(p).includes(k))), {}))}">${t('Volver a la estimación')}</a>` : '');

    const chars = Object.entries(CHARS).filter(([, c]) => c.combat?.base).map(([k, c]) => [k, nm(c)]).sort((a, b) => a[1].localeCompare(b[1], LANG));
    const clsA = (manA ? allClasses() : planClasses(pid, route || 'cai', pt, jidA)).map(j => [j, nm(CLASSES[j])]);  // a character: the classes it can take on the route by that part (Planificador)
    const batGroups = Object.values(list.reduce((o, { x, g }) => { (o[g] ??= { g, o: [] }).o.push([x.id, batLabel(x)]); return o; }, {})).map(gr => ({ g: gr.g, o: dedupe(gr.o) }));
    const batOpts = [['-', t('Números a mano')], ...(bat && !ids.includes(bat.id) ? [[bat.id, batLabel(bat)]] : []), ...batGroups];  // a shared link to another route's battle keeps it
    const foes = bat ? dedupe(bat.e.map((u, i) => [String(i), `${unitName(u)} · ${clsName(u.c)} · ${ITEMS[(u.it || []).flat()[0]] ? nm(ITEMS[(u.it || []).flat()[0]]) : '—'} · ${t('Nv')} ${u.lv}`])) : [];
    const terrOpts = TERR.map(([v, l]) => [v, t(l)]);
    const qsBat = Object.fromEntries(Object.entries(qs).filter(([k]) => !(dropD.includes(k) || (k === 'b' && !manD))));  // the Part switch starts over in the other part's battles

    const atkCard = card(A_,
      `<div class="cc-f">${navSel(t('Unidad'), A_, qs, 'a', [['-', t('Números a mano')], ...chars], manA ? '-' : pid, dropA)}` +
      `${navSel(t('Clase'), A_, qs, 'ac', clsA, jidA, [...OVR('a'), 'w'])}${qsSel(t('Arma'), A_, 'w', wsA, wA)}${qsSel(t('Terreno'), A_, 'ta', terrOpts, qs.ta || '')}</div>` +
      `<div class="cc-row">${numIn(t('Nivel'), A_, 'al', lvA, NUM.al)}${numIn(t('Peso del equipo'), A_, 'aq', ewA, NUM.aq)}</div>` + statRow('a', A_, stA) +
      `<p class="mut">${t('Atributos estimados: base + crecimiento por nivel + modificador de clase. Escribe los de tu partida para afinar.')} ${t('Peso del equipo: el de escudo, bastón, máscara y anillo, que se suma al del arma.')}${reset('a')}</p>`, 'atacante');
    const defCard = card(D_,
      `<div class="cc-f">${chips(PATH, qsBat, 'p', [['1', 'Parte 1'], ['3', 'Partes 2 y 3']], pt, 'Parte')}${navSel(t('Batalla'), D_, qs, 'b', batOpts, bat ? bat.id : '-', dropD)}` +
      (bat ? `${navSel(t('Enemigo'), D_, qs, 'e', foes, String(ei), [...OVR('d'), 'dw', 'dq'])}${chips(PATH, qs, 'd', [['n', 'Normal'], ['h', 'Difícil']], d, 'Dificultad')}`
        : navSel(t('Clase'), D_, qs, 'dc', allClasses().map(j => [j, nm(CLASSES[j])]), jidD, [...OVR('d'), 'dw'])) +
      `${qsSel(t('Arma'), D_, 'dw', [['-', t('Sin arma')], ...wsD], wD || '-')}${qsSel(t('Terreno'), D_, 'td', terrOpts, qs.td || '')}</div>` +
      `<div class="cc-row">${bat ? numIn(t('Nivel del ejército'), D_, 'ej', ej, NUM.ej) : numIn(t('Nivel'), D_, 'dl', lvD, NUM.dl)}${numIn(t('Peso del equipo'), D_, 'dq', ewD, NUM.dq)}</div>` +
      (bat ? `<p class="mut">${esc(t('Nivel del enemigo: {n}.', { n: lvD }))}${f.known ? '' : ' ' + esc(t('Esta clase no tiene atributos en los datos: escríbelos a mano.'))}</p>` : '') +
      statRow('d', D_, stD) +
      `<p class="mut">${t('Los atributos de los enemigos son una estimación: los datos dan la clase, el nivel y los ajustes de dificultad, no las cifras finales.')}${reset('d')}</p>`, 'defensor');
    const opts = `<div class="filters">${chips(PATH, qs, 'rg', [['', t('Auto ({n})', { n: dist })], ...[1, 2, 3].map(n => [String(n), String(n)])], qs.rg || '', 'Distancia')}` +
      chips(PATH, qs, 'ef', [['', 'Eficacia automática'], ['1', 'Sin eficacia'], ['2', 'Eficaz (×2)'], ['3', 'Muy eficaz (×3)']], qs.ef || '', 'Eficacia') + '</div>';
    const out = result(t('Ataque de {u}', { u: nameA }), r.ad, nameA, nameD) + result(t('Contraataque'), r.da, nameD, nameA) +
      card(t('Si todo acierta'), kvRows([[nameA, esc(r.hpA ? t('queda con {n} PV', { n: r.hpA }) : t('cae'))], [nameD, esc(r.hpD ? t('queda con {n} PV', { n: r.hpD }) : t('cae'))]]) +
        `<p class="mut">${t('Sin críticos; orden: ataque, contraataque y después los ataques dobles.')}</p>`);
    const notes = `<details class="card"><summary>${t('Fórmulas y dudas')}</summary><ul>${[
      'Daño = Fue o Mag + Pot del arma (× eficacia) − Def o Res. Crítico ×3; el segundo golpe de espada ×1,2; el hacha quita al menos 5.',
      'Golpe = Golpe del arma + Hab (magia: + (Hab + Sue) ÷ 2) − Esq del rival (su VA + terreno). Crítico = Crí del arma + (Hab + Sue) ÷ 2 − Sue del rival.',
      'VA = Vel − (peso del arma y del equipo − Con) si pesan más que la Con (Fue ÷ 5). Ataque doble con 4 de VA de ventaja.',
      'El Golpe real por encima del 50 % es una aproximación: los datos del juego no la confirman.',
      'Dificultad Normal: los enemigos llevan Golpe −30 y Crí −50 ocultos. Los datos guardan también un refuerzo de Golpe +30 y unos límites de diferencia de nivel; no está claro cuándo se aplica cada uno.',
      'No se cuentan: el Crí oculto propio de cada enemigo (de −10 a −80), habilidades, apoyos, batallones, los atributos que dan escudos y accesorios ni el Favor infernal.'].map(s => `<li>${esc(t(s))}</li>`).join('')}</ul>` +
      `<p><a href="#/mecanicas">${t('Tablas de combate')}</a> · <a href="#/guia/tipos-de-unidad">${t('Tipos de unidad y eficacias')}</a></p></details>`;
    return `<h1>${t('Calculadora de combate')}</h1><p class="mut">${t('Daño, golpes, acierto y crítico en los dos sentidos. Todo queda en la dirección: cópiala para compartir el cálculo.')}</p>` +
      `<p class="cc-v" data-count>${esc(verdict(r, stD.HP, nameA))}</p>` +
      `<div class="cc">${atkCard}${defCard}</div>${opts}<div class="cc">${out}</div>${notes}`;
  }

  register({ id: PATH, title: 'Calculadora de combate',
    render, css: CSS(),
    search: () => [{ group: 'Mecánicas', label: 'Calculadora de combate', sub: 'Daño, golpe, crítico y ataque doble', href: '#/calculadora', aliases: ['calculadora', 'calculadora de daño', 'simulador de combate', 'damage calculator'] }] });  // i18n-ignore (search.js translates labels; aliases stay Spanish)

  function CSS() {
    return `.cc{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--s3)}@media(min-width:900px){.cc{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}  /* minmax: a long option name never widens the card */
.cc-f{margin:var(--s2) 0}.cc-f .fbar{flex-direction:column;align-items:stretch;overflow:visible}.cc-f .fsel{max-width:100%}  /* one control per row (shell.js filterBars wraps them in a .fbar) */
.cc-n{display:flex;flex-direction:column;gap:2px;margin:var(--s1) 0;min-width:0}.cc-n>span{font-size:var(--fs-small);color:var(--mut)}
.cc-n input{min-height:var(--tap);width:100%;min-width:0;font-size:16px}
.cc-row{display:grid;grid-template-columns:1fr 1fr;gap:var(--s2);align-items:end}
.cc-st{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s2)}.cc-st .cc-n input{text-align:center}
.cc-v{margin:0 0 var(--s3);padding:var(--s2) var(--s3);border:1px solid var(--sel-line);border-radius:var(--r2);background:var(--sel-bg);color:var(--tx);font-weight:600}
@media(min-width:900px){.cc-v{position:sticky;top:var(--top-h);z-index:4}}  /* the answer stays in view while the inputs scroll */`;
  }
})();
