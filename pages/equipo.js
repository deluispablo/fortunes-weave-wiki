/* Fortune's Weave · Equipo (#/equipo?r=<ruta>; core.js sends the old #/planificador?p= here): the selector of recruits, roles, builds and
   equipment, recruitment, and the «Esta semana» block that Capítulo shows. The model lives in equipo-*.js, loaded before this file. */
'use strict';

(() => {
  const TL = { fav: '★ Favorito', love: '♥ Le encanta', like: 'Le gusta' };  // shown through t()
  // tokens and components of style.css only: cards between units, a softer rule between stages, a tinted block for the extras
  const CSS = `.fi-sec:has(> .eq-box){background:none;border:0;box-shadow:none;padding:0}.eq-box+.eq-box{margin-top:var(--s3)}\n@media (max-width:600px){.eq-gifts .eq-gi{display:flex;align-items:center;gap:6px;padding:2px 0}.eq-gifts .eq-gi>a{flex:1;min-width:0}.eq-gifts .eq-tw{display:none}.eq-gifts .eq-rec{gap:var(--s2)}}\n
.eq-roles{margin:0 0 var(--s2);font-size:var(--fs-small);color:var(--mut)}.eq-role b{color:var(--tx)}.eq-gapc,.eq-gapc b{color:var(--red)}.eq-gaps{list-style:none;padding:0;margin:0}.eq-gaps li{padding:4px 0;display:flex;flex-wrap:wrap;align-items:center;gap:6px}.eq-add{padding-left:6px}.eq-add small{color:var(--mut)}.eq-aimg{width:24px;height:24px;border-radius:50%}.rg-pick{margin-bottom:var(--s3)}.rg-pick .eq-face[aria-pressed=false]{opacity:.5}.rg-pick .eq-face[aria-pressed=true]{outline:2px solid var(--focus);outline-offset:1px}.rg-u h3{font-size:var(--fs-row);margin:0 0 var(--s1)}.rg-l{list-style:none;padding:0;margin:0;columns:2;column-gap:var(--s3)}.rg-l li{padding:3px 0;break-inside:avoid;font-size:var(--fs-small);line-height:1.2}.rg-l a{color:var(--tx)}.rg-l li.rg-fav a,.rg-l li.rg-love a{font-weight:650}.rg-t{color:var(--acc)}.rg-meal{margin:0 0 var(--s1);font-size:var(--fs-small)}.rg-no{margin-top:var(--s1);font-size:var(--fs-small)}.eq-rec{position:relative}.eq-got{align-self:center;white-space:nowrap}
.eq-pick{font:inherit;cursor:pointer;padding-right:28px}.eq-pick.on::after{background:url(img/ui/IconCheck.png) right 8px center/14px no-repeat,var(--cf)}.eq-st{font-weight:650;color:var(--tx)}.eq-pickb{margin:var(--s2) 0}.eq-pickb p{margin:var(--s1) 0}.eq-pickb details{margin-top:var(--s1)}
.eq-units{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--s2)}.eq-row{display:flex;align-items:center;gap:var(--s3)}.eq-rowt{flex:1;min-width:0}.eq-rowt .eq-line{font-size:var(--fs-small);overflow-wrap:anywhere}.eq-ed{flex:none;min-height:var(--tap)}.eq-unit.eq-open>.eq-row{margin-bottom:var(--s2)}.eq-strip{display:flex;flex-wrap:wrap;gap:4px;margin:var(--s2) 0 0}.eq-sface{width:32px;height:32px;border-radius:50%;object-fit:cover;object-position:50% 15%;background:var(--surface2);font-size:11px;display:inline-grid;place-items:center}.eq-unit{margin:0;padding:var(--s2) var(--s3)}
.eq-unit>header{display:flex;align-items:center;gap:var(--s3);margin:0 0 var(--s2)}.eq-unit>header h4{margin:0}.eq-unit>header .cp-tag{margin:0 var(--s1) 0 0}
.eq-steps{list-style:none;margin:0;padding:0}.eq-steps>li{padding:var(--s2) 0;border-top:1px dashed var(--line)}.eq-steps>li:first-child{border-top:0;padding-top:0}
.eq-steps small{display:block;color:var(--mut)}.eq-extra{margin:var(--s3) 0 0;padding:var(--s1) var(--s3);background:var(--surface2);border-radius:var(--r1)}
.eq-extra .kv:first-of-type{border-top:0}.eq-extra .kv{border-top-color:var(--line)}.eq-sel summary{cursor:pointer;min-height:var(--tap);display:flex;align-items:center;gap:var(--s2);flex-wrap:wrap}
.eq-gap{color:var(--tx);box-shadow:inset 3px 0 0 var(--focus);padding-left:var(--s3)}.li-card.eq-on,.card.eq-on{border-color:var(--sel-line)}
.eq-tag{font-size:var(--fs-small);color:var(--tx2)}.eq-more summary{cursor:pointer;color:var(--tx2);min-height:var(--tap);display:flex;align-items:center}\n.eq-recs,.eq-need,.eq-gl{list-style:none;margin:0;padding:0}.eq-rec{display:flex;gap:var(--s3);align-items:flex-start;padding:var(--s2) 0;border-top:1px solid var(--line)}.eq-rec:first-child{border-top:0}.eq-rec>div{min-width:0;flex:1}.eq-rec b{display:block;font:600 15px/1.3 var(--font-display);letter-spacing:.02em}.eq-line{display:block;color:var(--tx2)}.eq-rec small{display:block}.eq-need li{display:grid;grid-template-columns:auto auto 1fr;column-gap:var(--s2);align-items:baseline;padding:var(--s1) 0;border-top:1px solid var(--line)}.eq-need li:first-child{border-top:0}.eq-need li small{grid-column:1/-1}.eq-need li:only-child,.eq-need li:not(:has(b)){display:block}.eq-gi{display:block;padding:2px 0;font-size:var(--fs-small);line-height:1.4}.eq-gi .ico{vertical-align:middle}.eq-gear{margin:var(--s2) 0 0;padding-top:var(--s2);border-top:1px dashed var(--line)}.eq-gear>p{margin:0}.eq-gear .fold{border-top:0;margin:0}.eq-sel-t{font-size:17px;line-height:1.3}.eq-sel-t small{display:block;font:400 var(--fs-small)/1.4 var(--font);letter-spacing:0}.eq-acts{margin-left:calc(-1 * var(--s2))}.eq-bs{list-style:none;margin:var(--s2) 0;padding:0;display:grid;gap:var(--s2)}.eq-b{font:inherit;color:inherit;text-align:left;width:100%;min-height:var(--tap);padding:var(--s2) var(--s3);border:1px solid var(--line);border-radius:var(--r1);background:none;cursor:pointer}.eq-b[aria-pressed=true]{border-color:var(--sel-line);box-shadow:inset 3px 0 0 var(--focus)}.eq-b small{display:block}
.eq-slots{margin:var(--s2) 0}.eq-slots .fbar{flex-direction:column;align-items:stretch;overflow:visible}.eq-slots .fsel{max-width:100%}@media (min-width:600px){.eq-slots .fbar{display:grid;grid-template-columns:1fr 1fr}}.eq-size{margin:var(--s2) 0 0}
.eq-dlg{width:min(560px,calc(100vw - 2*var(--s3)));max-height:min(80vh,720px);padding:var(--s3);border:1px solid var(--line);border-radius:var(--r2,10px);background:var(--surface);color:var(--tx)}.eq-dlg::backdrop{background:rgb(0 0 0 / .55)}.eq-dlg-h{display:flex;align-items:center;justify-content:space-between;gap:var(--s2);margin:0 0 var(--s2)}.eq-dlg-h h2{margin:0;font-size:var(--fs-row)}.eq-dlg h3{font-size:var(--fs-small);color:var(--tx2);margin:var(--s3) 0 var(--s1)}.eq-dlg h3:first-of-type{margin-top:0}.eq-due{padding-left:var(--s3);box-shadow:inset 3px 0 0 var(--focus)}`;
  const face = (pid, cls = 'ico ico-personaje') => img(ico().face?.[pid], cls);
  const cls = jid => (CLASSES[jid] ? `${img(ico().job?.[jid], 'ico')}${L('clase', jid)}` : '');
  const capOf = key => (CAPS[key] ? chapLink(key) : '');
  const statLine = o => STAT_KEYS.filter(k => o?.[k]).map(k => `${statName(k)} +${o[k]}`).join(', ');
  const roleNames = rs => list(rs.map(r => t((ROLES.find(x => x[0] === r) || [r, ROLE_EXTRA[r] || r])[1])));

  /** one mount stage in one line: mount, rarity, what it adds at bond 5, best place, and when to start; details live in the mount's ficha */
  function mountRow(b, st, got, route, key) {
    const head = t('Montura {k}', { k: t(st.kind) });
    if (!got?.rid) return [head, `<span class="mut">${t('Sin montura en esta ruta y parte')}</span>`];
    const m = MOUNTS[got.rid], spot = teamMountSpots(got.rid, key)[0], p3 = CAPS[key]?.part === 3;
    const tag = m.default_class_mount ? (teamCatchOpen(route, key) ? t('de la clase') : t('de la clase; aquí no se capturan')) : m.unique_q ? (ownerOf(m) === b.pid ? t('propia') : t('de {p}', { p: esc(nm(CHARS[ownerOf(m)])) })) : teamMountRare(got.rid) ? t('rara') : t('común');
    const step = st.at >= 0 ? b.steps[st.at] : null;
    const dbl = teamMountMul(st.classes) > 1;
    const bits = [statLine(m.growth_by_bond?.['5']) && t(dbl ? '{g} con vínculo 5 (doble en Cuadriguero)' : '{g} con vínculo 5', { g: statLine(m.growth_by_bond['5']) }),
      !m.default_class_mount && !m.unique_q && spot && `${L('lugar', spot.spot, spot.es)} ${pct(spot.pct)}`,
      !m.default_class_mount && !m.unique_q && spot && (() => { const rv = spotAccess(spot.spot, 'cai', key).reveal; return rv.length ? t('antes hay que descubrirlo ({how})', { how: esc(rv.slice(0, 2).join(t(' o '))) }) : ''; })(),
      st.early && step && !m.default_class_mount && (capOf(step.key) ? t('capturarla y alimentarla antes del {c}', { c: capOf(step.key) }) : t('capturarla y alimentarla antes del examen de {c}', { c: esc(nm(CLASSES[step.jid])) })),
      p3 && !m.default_class_mount && !m.unique_q && t('en la Parte 3 se captura si Cai está en el ejército'),
      got.lost_to && t('{m} va a {p}', { m: L('montura', got.want), p: L('personaje', got.lost_to) })].filter(Boolean);
    return [head, `${L('montura', got.rid)} <span class="eq-tag">${tag}</span>${bits.length ? `<br><small class="mut">${bits.join(' · ')}</small>` : ''}`];
  }

  /** one unit's build: stages, then the extras (target, skills, weapon, mounts) grouped apart; mounts = plan.mounts[pid] */
  function buildHtml(b, mounts, route = ctxGet().route, key = ctxGet().key) {
    if (!b) return '';
    if (!b.target) return `<p class="mut">${t('Ninguna clase objetivo tiene una ruta de clases válida en esta ruta.')}</p>`;
    const steps = [`<li><span class="mut">${t('Empieza en')}</span> ${cls(b.start)}</li>`, ...b.steps.map(s => `<li><b>${cls(s.jid)}</b>${s.bridge ? ` <span class="eq-tag">${t('clase puente')}</span>` : ''} ` +
      `<span class="mut">${[s.level ? t('Nv {n}', { n: s.level }) : '', capOf(s.key) ? t('hacia el {c}', { c: capOf(s.key) }) : ''].filter(Boolean).join(' · ')}</span><small>${esc(s.why)}</small></li>`)].join('');
    const stages = teamMountStages(b);
    return `<ol class="eq-steps">${steps}</ol><div class="eq-extra">` + kvRows([
      [t('Clase objetivo'), `${cls(b.target)} <small class="mut">${esc(b.target_why)}</small>`],
      [t('Habilidades que llevar'), esc(list(b.skills.map(gt)))],
      [t('Arma principal'), list(b.weapons.map(w => `${esc(t(w.type))}: ${w.iid ? L('objeto', w.iid) : /^Magia/.test(w.type) ? t('hechizos propios') : t('sin arma en tienda en esta parte')}`))],
      ...stages.map(st => mountRow(b, st, mounts?.[st.kind], route, key)),
    ]) + '</div>';
  }
  window.teamBuildHtml = buildHtml;
  /** the community build picked for `b` given the rest of the team: its name, why it fits this roster, what to raise with manuals,
      then the other builds folded with when to choose them. `full` (character ficha) adds each build's explanation. */
  function pickHtml(b, plan, route = ctxGet().route, key = ctxGet().key, full = false) {
    const ch = plan?.choice?.[b?.pid]; if (!ch || !b.pick) return '';
    const opts = teamOptions(b.pid, route, key), me = opts.find(o => o.id === b.pick), sc = Object.fromEntries(ch.opts.map(o => [o.id, o]));
    const why = sc[b.pick]?.why || [], needs = b.pick_needs || [];
    const others = opts.filter(o => o.id !== b.pick);
    const alt = o => li(`<b>${esc(tx(o, 'name'))}</b> <span class="mut">${o.ok ? o.jids.map(j => esc(nm(CLASSES[j]))).join(' → ') : esc(o.issue)}</span>`,
      [o.ok && tx(o, 'fits') && t('Elígela: {f}', { f: tx(o, 'fits') }), full && o.ok && tx(o, 'why')].filter(Boolean).map(esc).join(' '));
    return `<div class="eq-pickb"><p><span class="cp-tag">${t('Build para tu equipo')}</span> <b>${esc(tx(me, 'name'))}</b></p>` +
      (why.length ? `<p class="mut">${esc(t('Por tu equipo: {w}.', { w: list(why) }))}</p>` : '') +
      (full && tx(me, 'why') ? `<p>${esc(tx(me, 'why'))}</p>` : '') +
      (teamFocus(b).length ? `<p class="eq-focus"><span class="cp-tag">${t('Sube')}</span> ${teamFocus(b).map(f => `<b>${esc(t(f.skill))} ${esc(f.rank)}</b>`).join(' · ')}</p>` : '') +
      (full && others.length ? `<details><summary>${t('Otras builds ({n})', { n: others.length })}</summary>${ul(others.map(alt))}</details>` : '') + '</div>';
  }
  window.teamPickHtml = pickHtml;
  /** Equipo: the builds to choose from (the recommended one first, then up to 3 others in the published order) as short cards; the one
      in use is pressed. `ro` (a shared plan): only the one in use */
  function buildChoices(b, plan, route, key, ro) {
    const opts = teamOptions(b.pid, route, key).filter(o => o.ok), rec = plan.choice?.[b.pid]?.rec;
    if (opts.length < 2 || ro) return '';
    const list = [...opts.filter(o => o.id === rec), ...opts.filter(o => o.id !== rec)].slice(0, 4);
    return `<ul class="eq-bs" aria-label="${esc(t('Builds de {p}', { p: nm(CHARS[b.pid]) }))}">${list.map(o => `<li><button type="button" class="eq-b" data-eq-b="${esc(b.pid)}|${esc(o.id)}" aria-pressed="${o.id === b.pick}">` +
      `<b>${esc(tx(o, 'name'))}</b>${o.id === rec ? ` <span class="cp-tag">${t('Recomendada')}</span>` : ''}<span class="eq-line">${o.jids.map(j => esc(nm(CLASSES[j]))).join(' → ')}</span>` +
      `<small class="mut">${esc([roleNames(o.roles || []), tx(o, 'fits')].filter(Boolean).join(' · '))}</small></button></li>`).join('')}</ul>`;
  }
  const TIERS = (W.classes || {}).meta?.tiers || {};
  const demon = k => (isCursed(k) ? ' · ' + t('Tesoro maldito') : '');
  const armaName = type => t((ARMAS.find(([k]) => k === armaKey(type)) || [, type])[1]);
  /** a select styled like the filter pills (filterCtl); opts [[value, label, group]] (consecutive equal groups share an <optgroup>) */
  const sel = (label, who, key, opts, cur, auto) => { const s = opts.find(([v]) => v === cur) || opts[0], k = t(label) + (auto ? ' · ' + t('auto') : '');
    let g = '', html = '';
    for (const [v, lb, gr = ''] of opts) {
      if (gr !== g) { html += (g ? '</optgroup>' : '') + (gr ? `<optgroup label="${esc(gr)}">` : ''); g = gr; }
      html += `<option value="${esc(v)}"${v === s[0] ? ' selected' : ''}>${esc(lb)}</option>`;
    }
    return `<label class="fsel"><span class="fsel-k">${esc(k)}</span><span class="fsel-v">${esc(s[1])}</span><select data-eq-s="${esc(key)}" aria-label="${esc(t(label) + ' · ' + who)}">` +
      html + (g ? '</optgroup>' : '') + '</select></label>'; };
  /** Equipo: the unit's class, two weapons and equipment (teamSlots), each a select marked «auto» until changed by hand, and «Restablecer»;
      `ro` (a shared plan): the same as text */
  function slotsHtml(b, s, pick, route, key) {
    const who = nm(CHARS[b.pid]), none = [['', '—']], here = chapIdx(route, key);
    const weap = s.ws.map(k => [k, `${nm(ITEMS[k])} · ${t('Pot {n}', { n: ITEMS[k].weapon.might || 0 })}${demon(k)}`, armaName(ITEMS[k].weapon.type)]);
    const gear = planEquip().map(k => [k, nm(ITEMS[k]) + demon(k), t(/^Escudos/.test(ITEMS[k].section || '') ? 'Escudos' : 'Accesorios')]).sort((a, z) => a[2].localeCompare(z[2], LANG));
    // a class not open yet at this chapter says from when
    const cls = s.cls.map(j => { const i = classFromIdx(j, route); return [j, nm(CLASSES[j]) + (i > here ? ' · ' + t('desde {c}', { c: capShort(routeChapters(route)[i]) }) : ''), nm(TIERS[+CLASSES[j].tier] || {}) || '']; });
    const w0none = [['', s.magic ? t('Hechizos propios') : '—']];
    return `<div class="eq-slots">${sel('Clase', who, `${b.pid}|c`, cls, s.c, s.auto.c)}${sel('Arma 1', who, `${b.pid}|w0`, [...w0none, ...weap], s.w0, s.auto.w0)}` +
      `${sel('Arma 2', who, `${b.pid}|w1`, [...none, ...weap], s.w1, s.auto.w1)}${sel('Equipamiento', who, `${b.pid}|g`, [...none, ...gear], s.g, s.auto.g)}</div>` +
      (pick && Object.keys(pick).length ? `<button type="button" class="txtbtn txtbtn-2" data-eq-reset="${esc(b.pid)}" aria-label="${esc(t('Volver a automático: build recomendada y equipamiento de {p}', { p: who }))}">${t('Volver a automático')}</button>` : '');
  }
  /** Equipo › Builds: one line per unit (class path and target); stages, skills, weapon and mounts live in the character ficha */
  const buildSummary = (b, plan, route, key, ro) => (!b?.target ? `<p class="mut">${t('Sin ruta de clases válida en esta ruta.')}</p>` :
    pickHtml(b, plan) + buildChoices(b, plan, route, key, ro) + `<p class="eq-path">${[b.start, ...b.steps.map(x => x.jid)].map(cls).join(' → ')}</p>` +
    `<p><a href="${href('personaje', b.pid)}?sec=partida">${t('Build completa, armas y monturas')}</a></p>`);

  /** character ficha: the mount of each stage for every build of the unit, with what it adds at bond 5 and the difference with the recommended one */
  function mountsByBuild(pid, route, key, plan) {
    const opts = teamBuildOptions(pid, route, key), mine = plan?.builds.find(x => x.pid === pid);
    if (mine?.target) opts.unshift({ label: t('En tu equipo'), path: [mine.start, ...mine.steps.map(s => s.jid)], team: true });
    const rows = opts.map(o => {
      const st = o.team ? teamMountStages(mine).map(x => { const g = plan.mounts[pid]?.[x.kind], mul = teamMountMul(x.classes);
        const g5 = Object.fromEntries(Object.entries(MOUNTS[g?.rid]?.growth_by_bond?.['5'] || {}).map(([k, v]) => [k, v * mul]));
        return { kind: x.kind, rid: g?.rid, g5, double: mul > 1, total: Object.values(g5).reduce((a, v) => a + v, 0) }; }) : teamMountsFor(pid, o.path, route, key);
      return { ...o, st, total: st.reduce((a, x) => a + x.total, 0) };
    });
    const base = rows.find(r => r.rec)?.total;
    if (!rows.some(r => r.st.length)) return '';
    return `<h4>${t('Montura por build')}</h4>${ul(rows.map(r => li(`${esc(r.label)}: ${r.path.map(j => esc(nm(CLASSES[j]))).join(' → ')}`,
      r.st.length ? `${r.st.map(x => `${esc(t(x.kind))}: ${x.rid ? L('montura', x.rid) : '—'}${statLine(x.g5) ? ` (${statLine(x.g5)})` : ''}`).join(' · ')} · ${t('total +{n}', { n: r.total })}` +
        (base != null && !r.rec ? ` (${r.total === base ? t('igual que la recomendada') : t('{d} frente a la recomendada', { d: `${r.total > base ? '+' : '−'}${Math.abs(r.total - base)}` })})` : '') : t('a pie'))))}` +
      `<p class="mut">${t('Crecimiento que añade cada montura con vínculo 5, solo mientras la clase la monta. En Cuadriguero el bono de la montura cuenta doble.')}</p>`;
  }
  window.teamMountsByBuild = mountsByBuild;

  const RULES = [  // Spanish keys: WEEK_RULE reads them; shown through t()
    'Equipo: el señor de la ruta, los que se unen por la historia y no se han desmarcado (hasta el final de la Parte 1; los del prólogo solo en el prólogo; los de las Partes 2 y 3 desde su capítulo) y los reclutas marcados como «quiero reclutarlo» o «ya lo tengo»: builds y papeles cuentan los dos grupos. Los señores de la llama no salen en la lista.',
    'Semana, regalos, comidas y reclutamiento solo cuentan los «quiero»: a los que ya tienes no hace falta subirles el apoyo para reclutarlos.',
    'Prioridad (etiqueta de cada build): el señor de la ruta, después la valoración publicada (S, A, B, C; sin valoración cuenta como B), después quien se une antes y por último el nombre.',
    'Clase de inicio: la última clase por defecto de la Parte 1. Arma principal: la primera, entre las de la clase objetivo, que permite una ruta válida, en este orden: línea de arma publicada de la unidad, arma inicial, arma que comparte con su clase de inicio, magia y el resto.',
    'Clase objetivo: la recomendada para la unidad; si no tiene una ruta válida en esta ruta, la alternativa; si tampoco, la clase avanzada recomendada; si ninguna es alcanzable, la clase magistral alcanzable con el arma principal que más crece en sus atributos principales.',
    'Ruta de clases: una clase por nivel de clase. Cada una debe existir en esta ruta y parte (las que piden desbloqueo solo donde se desbloquean), usar el arma principal y tener un examen alcanzable con lo que la unidad ya entrena (el arma principal y la equitación, el vuelo o la coraza que enseñan sus clases anteriores). Entre las válidas gana la que menos cambia de tipo de montura y conserva más tiempo la actual; después, la que reúne más habilidades maestras útiles, la que sigue el árbol del juego y la de más crecimiento en los atributos principales.',
    'El crecimiento de una clase solo cuenta mientras se está en ella: cada paso indica los tres atributos que más suben en esa clase.',
    'Examen en el nivel recomendado de la clase: por cada nivel por debajo, la probabilidad se multiplica por 50, 32, 18, 8 y 2 %. El capítulo es el primero, desde que la unidad está en el grupo y hay licencia y examen, cuyo nivel enemigo alcanza ese nivel.',
    'El examen sube los atributos que falten hasta los mínimos de la clase (en la ficha de cada clase).',
    'Clase puente: la primera habilidad maestra útil (Crescendo, Técnica entrenada, Siempre alerta, Contra mayor) de una clase disponible en la ruta que use el arma principal y cuyo examen se alcance con lo ya entrenado; si no hay ninguna, no hay puente. Dominar la clase la deja para siempre.',
    'El vínculo con la montura es de cada pareja unidad-montura y se conserva mientras la clase use el mismo tipo de montura. Si la etapa siguiente usa otro tipo, conviene capturar y alimentar la nueva antes: el vínculo sube aunque la clase actual no la monte.',
    'En Cuadriguero el bono de la montura cuenta doble (crecimientos y bonos fijos); la búsqueda de ruta lo tiene en cuenta y, desde el nivel 35, la Senda de la cuadriga suma crecimiento.',
    'Monturas: una por cada tipo de montura de la ruta de clases (el vínculo es de cada pareja y sirve en todas las clases de ese tipo). Gana la que más suma su crecimiento con vínculo 5 con los crecimientos de la unidad en la clase objetivo. Solo se proponen monturas que existen en la ruta y parte: capturarlas es cosa de Cai: en la Parte 1, desde el capítulo que abre el Cebo, y en la Parte 3 si Cai está en el ejército. Las raras (solo salen en el hueco raro de un campo) van a una sola unidad, por prioridad; las propias (Rocinán, Bucephalus) se pueden dar a otra unidad si su dueño está en el equipo, y van a quien más gana con ellas (a su dueño si empatan); las comunes y la de la clase se repiten.',
    'Arma: la de más poder del arma principal que se vende en una tienda abierta en esta parte, desde el capítulo elegido.',
    'Compras: armas eficaces contra los tipos de enemigo (2 o más) de la batalla del capítulo y la del siguiente, para quien del equipo usa ese tipo de arma (una por tipo de arma: la que pide menos Prestigio y está más cerca; los voladores no cuentan porque cualquier arco ya es eficaz); la licencia y los manuales del próximo examen de cada build; el arma principal; y accesorios con regla (Anillo de gigante para el Cuadriguero). El tipo de enemigo sale de su clase: acorazado si su examen pide Coraza, jinete si entrena Equitación, volador si entrena Vuelo. Solo lugares abiertos en esta ruta, parte y capítulo; en la Parte 1 de Cai, con el Prestigio que piden sus puestos fronterizos. Se agrupan por lugar.',
    'Trueques de Vandahl: si lo que piden se consigue con Búsqueda en un lugar accesible, se propone la cadena búsqueda y trueque.',
    'El nivel enemigo sigue la media de las 10 unidades de más nivel: conviene repartir la EXP entre todo el equipo.',
    'Regalos: el favorito de un «quiero» no se propone a otro (si dos comparten favorito, lo recibe el de más prioridad). Orden: favorito (el más caro da más apoyo), le encanta (el más barato primero) y le gusta (en el orden del juego, para encontrarlos en la lista de regalos). Solo se proponen regalos con alguna fuente abierta en esta ruta y parte.',
    'Regalos semanales: los «le gusta» y «le encanta» más baratos con fuente abierta, sin ningún favorito de otro «quiero».',
    'Comidas: el apoyo para reclutar es con el señor de la ruta. Se cuenta desde cero (la página no lee la partida): 400, 1400, 2400 y 3200 puntos para los apoyos 2 a 5, a 60 puntos por comida sin bonos. Van primero los que necesitan más comidas por cada semana que les queda hasta su plazo (el cierre del recluta o, si no tiene, el final de la Parte 1), de dos en dos. El plato es el de la carta de esa semana que más gusta a los dos.',
    'Servicio divino: el señor con una unidad ya reclutada (sirven dos del ejército) en el templo donde los dos tienen más aptitud; el día sagrado del dios garantiza el resultado alto, y todos los domingos son día sagrado de todos los templos. Una vez por semana; también suma tributo a la bendición del dios.',
    'Comidas: dos platos por semana (tres desde Prestigio 3), a mitad de precio el domingo. Cada invitado necesita un regalo previo.',
    'Plazos: arriba los reclutas que cierran en este capítulo; los demás, plegados. Las comidas se cuentan desde cero.',
    'Ronda de regalos: favoritos y «le encanta» a la vista; los «le gusta», plegados. El resto de perdibles de la ruta está en Perdibles.',
    'Teatro: ver la obra con quien le gusta da más motivación y sube el apoyo entre los espectadores. Percha: sube el apoyo con Eshmel, así que no adelanta reclutamientos.',
    'Refinado: el arma principal de cada build, las armas eficaces de Compras y el arma inicial de cada unidad, hasta el nivel que permiten los materiales de esta parte (sin Marcialito en la Parte 1; sin cajas al azar; en la Parte 1 de Cai, sin materiales de regiones cerradas), ordenadas por Pot ganada por usuario y coste. La página no lee la partida: parte de +0.',
    'Herrería: abre en la Parte 1 con su desbloqueo y vuelve en la Parte 3; en la Parte 2 no hay. Si el primer paso solo da Pot +1 y pide un material escaso (sin tienda y con búsqueda del 10 % o menos), conviene repararla y guardar el material.',
    'Equipamiento: para cada unidad que ya tienes, el arma más fuerte del tipo de su build si su clase de ese capítulo puede usarlo (si no, de un tipo que usen su clase y las de su build; nunca otro), sin arma si su build es de magia (los hechizos son propios de cada unidad), con lo que se consigue en ese punto: equipo inicial, recompensas de misiones de capítulos ya jugados, cofres de lugares accesibles y tiendas abiertas. Las piezas únicas (cofre, recompensa) van a una sola unidad, por prioridad. Opciones: hasta tres armas que se venden ahora en un lugar accesible, con su precio. El peso resta velocidad de ataque cuando supera la Constitución (estimada como Fue ÷ 5): se indica la cifra. Entre armas del mismo tipo gana la de más daño por ronda contra un enemigo típico del capítulo (media de su nivel de clase al nivel recomendado), el doble si se le dobla con seguridad, menos un punto por cada punto de velocidad de ataque perdido: un arma pesada que pierde el ataque doble queda detrás de una ligera salvo que pegue más del doble.',
    'Equipamiento: rango de arma máximo por capítulo (la página no conoce la competencia de cada unidad): hierro antes del capítulo 6 de la Parte 1, armas especiales hasta el final de la Parte 1 y plata desde la Parte 2. Peso: si un arma resta 2 o más de velocidad de ataque (peso − Con, con Con = Fue ÷ 5 estimada al nivel del capítulo), cuenta con 3 de Pot menos al compararla con las ligeras, para no perder el ataque doble por poco.',
    'Reclutar pronto: fuera del grupo una unidad sube sola al 80 % de su crecimiento personal y sin crecimientos de clase.',
  ];

  /** rules shown under «Esta semana» (Capítulo); the rest under Equipo */
  const WEEK_RULE = /^(Semana|Compras|Trueques|Regalos|Comidas|Servicio|Plazos|Ronda|Teatro|Refinado|Herrería)\b/;
  /** one recruit: face, name and one line with what it asks (support · Prestigio · payment), plus the deadline when it has one */
  function recruitStep(s, route) {
    const late = CAPS[s.start_by_key] && Object.values(CAPS).flatMap(c => (c.route === route ? c.closing : []).filter(x => x.kind === 'recluta' && x.id === s.pid).map(x => [c.key, x]))[0];
    const asks = [t('Apoyo {n} con {l}', { n: s.support, l: esc(ROUTE_NAME[route]) }), t('Prestigio {n}', { n: s.renown }), s.gold ? gold(s.gold) : '', ...s.items.map(i => `${i.n}× ${L('objeto', i.id, i.es)}`)].filter(Boolean).join(' · ');
    const plazo = late ? `<small class="mut">${t('Plazo: {d} ({c}).', { d: late[1].deadline ? t('hasta el {d}', { d: fechaDia(late[1].deadline) }) : t('hasta el final del capítulo'), c: chapLink(late[0]) })} ${esc(dataTx(late[1].if_missed || ''))}</small>` : '';
    const j = joinAt(s.pid, route, joinKeyFor(s.pid, route, ctxGet().key));  // the class of the level they join at (core.js)
    const llega = j ? `<small class="mut">${t('Llega con Nv {a}–{b} aprox.: {k}', { a: j.lv[0], b: j.lv[1], k: j.classes.map(c => c[1] ? L('clase', c[1]) : esc(gt(c[2]))).join(` ${t('o')} `) })}</small>` : '';
    return `<li class="eq-rec">${face(s.pid, 'cp-face') || '<span class="cp-face"></span>'}<div><b>${L('personaje', s.pid)}</b><span class="eq-line">${asks}</span>${llega}${plazo}</div></li>`;
  }
  /** «★ Favorito»: the symbol and the word apart, so a narrow screen can keep only the symbol */
  const tierTag = k => { if (k === 'like') return '';  // being on the list already says it is liked
    const m = t(TL[k]).match(/^([★♥])\s*(.*)$/);
    return `<span class="eq-tag">${m ? `<span aria-hidden="true">${m[1]}</span><span class="eq-tw"> ${esc(m[2])}</span>` : esc(t(TL[k]))}</span>`; };
  /** the gift round: one compact row per «quiero» (serial order), the next gift inline and the rest folded */
  function giftRound(round) {
    if (!round.length) return '';
    // one short line per gift (name, level, price); where to get it is the item's ficha and the line's tooltip
    const it = x => `<span class="eq-gi" title="${esc(list(x.src.slice(0, 3)).replace(/<[^>]*>/g, ''))}"><i class="tier tier-${x.t}" aria-hidden="true"></i>${itemIco(x.iid, 'ico')}${L('objeto', x.iid)} ${tierTag(x.t)}${x.price ? ` <span class="mut">${gold(x.price)}</span>` : ''}</span>`;
    const row = r => `<li class="eq-rec">${face(r.pid, 'cp-face') || '<span class="cp-face"></span>'}<div><b>${L('personaje', r.pid)}</b>` +
      (r.none ? `<span class="eq-line mut">${t('Sin datos de regalos.')}</span>` : !r.items.length ? `<span class="eq-line mut">${t('Ningún regalo apreciado con fuente abierta en esta parte.')}</span>` :
        (() => { const route = ctxGet().route, key = ctxGet().key;
          const top = [r.items.find(x => teamOffers(x.iid, route, key).length) || r.items[0]];  // the next gift: the best one on sale now (as the weekend)
          const like = r.items.filter(x => x.t === 'like' && x !== top[0]), ord = Object.keys(W.items); like.sort((a, b) => ord.indexOf(a.iid) - ord.indexOf(b.iid));  // likes in the game's item order, to find them in the in-game gift list
          const rest = [...r.items.filter(x => x.t !== 'like' && x !== top[0]), ...like];
          return top.map(it).join('') + (rest.length ? `<details class="eq-more"><summary>${t('Más regalos ({n})', { n: rest.length })}</summary>${rest.map(it).join('')}</details>` : ''); })()) + '</div></li>';
    return `<ul class="eq-recs">${round.map(row).join('')}</ul>`;
  }
  function recruitment(route, picked) {
    const { steps, totals } = planRecruits(route, picked);
    if (!steps.length) return '';
    const need = [totals.gold ? `<li>${gold(totals.gold)}</li>` : '', ...Object.entries(totals.items).map(([iid, n]) =>
      `<li>${itemIco(iid, 'ico')}<b>${n}×</b> ${L('objeto', iid)}<small class="mut">${(() => { const src = itemSources(iid, route, ctxGet().key); return src.length ? list(src.slice(0, 2)) + (src.length > 2 ? ' ' + t('y {n} más en su ficha', { n: src.length - 2 }) : '') : t('Sin fuente fija en esta ruta'); })()}</small></li>`)].filter(Boolean);
    return `<ul class="eq-recs">${[...steps].sort((a, b) => bySerial(a.pid, b.pid)).map(s => recruitStep(s, route)).join('')}</ul>` +
      (need.length ? `<h4>${t('Oro y objetos necesarios')}</h4><ul class="eq-need">${need.join('')}</ul>` : '');
  }

  const day = d => (d ? fechaDia(d) : '');
  const who = ps => list(ps.map(p => L('personaje', p)));

  /** birthdays of the «quiero» in this chapter: that day the gift counts more */
  const birthdays = w => { const bds = (w?.birthdays || []).map(b => t('{p} el {d}', { p: L('personaje', b.pid), d: day(b.date) }));
    return bds.length ? `<p class="mut">${t('Cumpleaños: {l}; ese día el regalo cuenta más.', { l: list(bds) })}</p>` : ''; };
  /** «Semana»: a short checklist for the «quiero» recruits at the context chapter, in the order it is done:
      buy, meals, gifts (the gift round), Servicio divino, deadlines due this chapter; explanations live in «Cómo se calcula» */
  function weekHtml(w, round, shop, forge) {
    const lordN = L('personaje', w.lord), compras = shopHtml(shop, w.route) + forgeHtml(forge);
    if (!w.need.length) return compras + `<p class="mut">${t('Ningún «quiero» en esta ruta.')}</p>`;
    const live = w.need.filter(n => !n.late && n.pts > 0);
    // deadlines: the ones due this chapter, the rest folded
    const dl = n => n.deadline ? (n.deadline.part ? t('antes del final de la Parte 1') : t('antes del {d} ({c})', { d: day(n.deadline.date), c: chapLink(n.deadline.key) })) : '';
    const plazoRow = n => li(`${L('personaje', n.pid)} · ${t('apoyo {a}, Prestigio {r}', { a: n.support, r: n.renown })}`,
      n.late ? t('El plazo ya pasó.') : [n.open ? t('ya se puede reclutar') : t('desde el {c}', { c: chapLink(n.from) }), dl(n)].filter(Boolean).join(' · '));
    const byDate = [...w.need].sort((a, b) => chapOrder(a.deadline?.key) - chapOrder(b.deadline?.key) || b.urgency - a.urgency);
    const due = byDate.filter(n => n.late || n.deadline?.key === w.key), later = byDate.filter(n => !due.includes(n));
    const plazos = `<h4>${t('Plazos')}</h4>` + (due.length ? ul(due.map(plazoRow)) : `<p class="mut">${t('Ningún recluta cierra en este capítulo.')}</p>`) +
      (later.length ? `<details class="eq-more"><summary>${t('Los que cierran más adelante ({n})', { n: later.length })}</summary>${ul(later.map(plazoRow))}</details>` : '');
    const other = [
      w.play.length && li(t('Teatro (Prestigio 7)'), w.play.map(pl => `«${esc(gt(pl.es))}»${pl.fans.length ? t(': les gusta a {p}', { p: who(pl.fans) }) : ''}`).join(' · ')),
      w.renown >= 8 && li(t('Termas (Prestigio 8)'), t('{l} con un «quiero»; el domingo da más apoyo.', { l: lordN })),
      w.renown && li(t('Prestigio'), t('el más alto que piden tus «quiero»: {n}.', { n: w.renown })),
    ].filter(Boolean);
    const detours = w.detours?.length ? `<p>${t('Desvíos de este capítulo que quizá perdiste en la vuelta anterior: {l}.', { l: list(w.detours.map(d => `<a href="${href('batalla', d.id)}">${esc(gt(d.es))}</a>`)) })}</p>` : '';
    // Percha: who to take and the answers, in their ficha
    const raven = live.filter(n => CHARS[n.pid]?.p?.pale_raven?.sets?.length).map(n => `<a href="${href('personaje', n.pid)}?sec=partida">${esc(nm(CHARS[n.pid]))}</a>`);
    const percha = w.perch ? `<h4>${t('Percha')}</h4><p>${t('Sube el apoyo con Eshmel, no con {l}.', { l: lordN })}${raven.length ? ' ' + t('Respuestas: {l}.', { l: list(raven) }) : ''}</p>` : '';
    const dueLine = due.length ? `<p class="eq-due">${t('Cierran en este capítulo: {l}. Detalle en Plazos.', { l: list(due.map(n => L('personaje', n.pid))) })}</p>` : '';
    return dueLine + compras + percha + plazos + detours + (other.length ? `<details class="eq-more"><summary>${t('Otras actividades ({n})', { n: other.length })}</summary>${ul(other)}</details>` : '');
  }


  /** «En este capítulo»: shop novelties, barters that pay off (with where the material comes from), free loot that sells, deadlines */
  window.teamTipsBlock = (route, key) => {
    const x = teamTips(route, key), c = CAPS[key] || {};
    const at = o => (o.spot ? L('lugar', o.spot) : esc(dataTx(o.where))) + (o.renown ? ` <small class="mut">(${t('Prestigio {n}', { n: o.renown })})</small>` : '');
    const it = iid => `${itemIco(iid, 'ico')}${L('objeto', iid)}`;
    const fold = (rows, k, label) => ul(rows.slice(0, k)) + (rows.length > k ? `<details class="eq-more"><summary>${t(label, { n: rows.length - k })}</summary>${ul(rows.slice(k))}</details>` : '');
    const mat = m => `${m.n > 1 ? m.n + '× ' : ''}${L('objeto', m.id)} <span class="mut">(${m.src.shop ? `${at(m.src.shop)}, ${gold(m.src.shop.price)}` : t('Búsqueda en {p} ({n})', { p: L('lugar', m.src.search.spot), n: pct(m.src.search.pct) })})</span>`;
    const barters = x.barters.map(b => li(`${it(b.iid)} · ${at(b.offer)}`, `${t('por {l}', { l: b.mats.map(mat).join(' + ') })} · ${t('se vende por {g}', { g: gold(b.value) })}`));
    const loot = x.loot.map(l => li(it(l.iid), `${t('Búsqueda en {p} ({n})', { p: L('lugar', l.spot), n: pct(l.pct) })} · ${t('se vende por {g}', { g: gold(l.sell) })}`));
    return (barters.length ? `<h4>${t('Trueques de Vandahl que salen a cuenta')}</h4>` + fold(barters, 3, 'Más trueques ({n})') : '') +
      (loot.length ? `<h4>${t('Dinero fácil')}</h4>` + fold(loot, 3, 'Más botín ({n})') : '') +
      '';
  };

  const matTxt = m => list(Object.entries(m).map(([iid, n]) => `${n}× ${L('objeto', iid)}`));
  const plusN = iid => (String(ITEMS[iid]?.es || '').match(/\+\d+$/) || [''])[0];
  const srcTxt = (mat, s) => `${esc(nm(ITEMS[mat]))}: ${s.spot ? t('Búsqueda en {p} ({n})', { p: L('lugar', s.spot), n: pct(s.pct) }) : s.text || t('sin fuente fija ahora')}`;
  /** «Herrería»: one line per weapon (three open, the rest folded), Part 3 chains folded */
  function forgeHtml(f) {
    if (!f) return '';
    const h = `<h4 id="eq-herreria">${gt('Herrería')}</h4>`;
    if (!f.rows.length && !f.later.length) return h + `<p class="mut">${f.closed ? t('La Herrería abre en el {c}.', { c: chapLink(f.closed) }) : f.closed === null && CAPS[ctxGet().key]?.part === 1 ? t('Nada que refinar con los materiales de esta parte.') : t('Sin herrería en esta parte.')}</p>`;
    const row = r => r.repair
      ? li(t('{i}: repárala', { i: L('objeto', r.iid) }), `${t('{m} y {g}; refinarla a +1 solo da Pot +1. Guarda el material para otra arma.', { m: matTxt(Object.fromEntries(r.repair.mats.map(m => [m.iid, m.n]))), g: gold(r.repair.gold) })} ${Object.entries(r.src).map(([m, s]) => srcTxt(m, s)).join(' · ')}.`)
      : li(`${L('objeto', r.iid)} → ${plusN(r.to)} (${t('Pot +{n}', { n: r.pot })}${r.effect ? `; ${esc(r.effect.replace(/\.$/, ''))}` : ''})`,
        `${t('{m} y {g}; para {p}.', { m: matTxt(r.mats), g: gold(r.gold), p: list(r.users.map(p => L('personaje', p))) })} ${Object.entries(r.src).map(([m, s]) => srcTxt(m, s)).join(' · ')}.`);
    const later = f.later.map(r => li(`${L('objeto', r.iid)} → ${plusN(r.to)} (${t('Pot +{n}', { n: r.pot })}${r.effect ? `; ${esc(r.effect.replace(/\.$/, ''))}` : ''})`, t('{m} y {g}; para {p}.', { m: matTxt(r.mats), g: gold(r.gold), p: list(r.users.map(p => L('personaje', p))) })));
    return h + (f.rows.length ? ul(f.rows.slice(0, 3).map(row)) : '') +
      (f.rows.length > 3 ? `<details class="eq-more"><summary>${t('Más armas ({n})', { n: f.rows.length - 3 })}</summary>${ul(f.rows.slice(3).map(row))}</details>` : '') +
      (later.length ? `<details class="eq-more"><summary>${t('Para la Parte 3 ({n})', { n: later.length })}</summary>${ul(later)}</details>` : '') +
      `<p class="mut">${t('Refina en vez de reparar: el primer paso cuesta lo mismo y también la deja al máximo. Hazlo antes de que llegue a 0 usos.')}</p>`;
  }
  const SRC_KIND = { inicial: () => t('equipo inicial'), mision: s => t('misión {q}', { q: L('mision', s.quest) }), cofre: s => t('cofre en {p}', { p: L('lugar', s.spot) }),
    tienda: s => `${s.spot ? L('lugar', s.spot) : esc(dataTx(s.where))}, ${gold(s.price)}`, ambulante: s => `${s.spot ? t('mercader ambulante de {p}', { p: L('lugar', s.spot) }) : esc(dataTx(s.where))}, ${gold(s.price)}`, mano: () => t('elegida a mano'),
    barter: s => t('trueque en {p}', { p: s.spot ? L('lugar', s.spot) : esc(dataTx(s.where)) }) };
  /** one unit's equipment: a compact line (weapon now, where from, refining link) and the options folded */
  function gearHtml(g, forge) {
    if (!g) return '';
    const fr = g.now && forge?.rows.find(r => r.iid === g.now.iid && !r.repair);
    const now = g.now ? `${itemIco(g.now.iid, 'ico')}${L('objeto', g.now.iid)} <span class="mut">· ${SRC_KIND[g.now.kind](g.now)}${g.now.loss ? ' · ' + t('pesa: −{n} de velocidad de ataque (peso {w} − Con ≈{c})', { n: g.now.loss, w: ITEMS[g.now.iid].weapon.weight, c: g.con }) : ''}</span>` +
      (fr ? ` · <a href="#/cap?ir=eq-herreria">${t('refínala a {n}', { n: plusN(fr.to) })}</a>` : '') : g.spells ? esc(t(g.spells === 'magia-blanca' ? 'Magia blanca' : 'Magia negra')) : `<span class="mut">${t('Sin arma de su build que pueda llevar ahora con su clase.')}</span>`;
    const opts = g.options.map(o => li(`${itemIco(o.iid, 'ico')}${L('objeto', o.iid)} · ${L('lugar', o.spot, o.where.replace(/\s*\(.*\)$/, ''))}, ${gold(o.price)}`,
      [t('Pot {m}, peso {w}', { m: ITEMS[o.iid].weapon.might, w: ITEMS[o.iid].weapon.weight }), o.effective && t('arma eficaz')].filter(Boolean).join(' · ')));
    const acc = g.acc ? li(`${L('objeto', g.acc.iid)} · ${g.acc.spot ? L('lugar', g.acc.spot, g.acc.where.replace(/\s*\(.*\)$/, '')) : esc(dataTx(g.acc.where))}${g.acc.price ? `, ${gold(g.acc.price)}` : ''}`, esc(t(g.acc.why))) : '';
    const hi = g.higher ? `<p class="mut">${t('Si llega a {a} {r}: {o} ({w})', { a: t(ARMAS.find(a => a[0] === g.higher.type)?.[1] || '').toLowerCase(), r: g.higher.rank, o: L('objeto', g.higher.iid),
      w: g.higher.spot ? L('lugar', g.higher.spot, dataTx(g.higher.where).replace(/\s*\(.*\)$/, '')) : esc(dataTx(g.higher.where || '')) })}</p>` : '';
    return `<div class="eq-gear"><p><b>${t('Arma')}</b> ${now}</p>${hi}` +
      (opts.length || acc ? `<details class="eq-more"><summary>${t('Opciones ({n})', { n: opts.length + (acc ? 1 : 0) })}</summary>${ul([...opts, acc].filter(Boolean))}</details>` : '') + '</div>';
  }

  /** «Compras y búsquedas»: the 3–5 first places (what and why), the rest folded; search → barter chains; the chapter routine */
  function shopHtml(sh, route) {
    if (!sh) return '';
    const place = g => (g.spot ? L('lugar', g.spot) : esc(dataTx(g.where))) + (g.renown ? ` <small class="mut">(${t('Prestigio {n}', { n: g.renown })})</small>` : '');
    const how = x => x.offer.type === 'barter' ? t('trueque por {l}', { l: list(x.offer.pay.map(p => `${p.n > 1 ? p.n + '× ' : ''}${L('objeto', p.id, p.es)}`)) }) : x.offer.price ? gold(x.offer.price) : '';
    const row = g => li(place(g), g.items.map(x => `${L('objeto', x.iid)}${how(x) ? ` (${how(x)})` : ''}: ${esc(x.why)}`).join('<br>'));
    const top = sh.buy.slice(0, 4), rest = sh.buy.slice(4);
    const chains = sh.chains.slice(0, 4).map(c => li(t('Búsqueda en {p} ({n})', { p: L('lugar', c.search.spot), n: pct(c.search.pct) + (c.search.cond.length ? ', ' + esc(conds(c.search.cond)) : '') }),
      `${t('{a} → cámbialo por {b} en {p}', { a: L('objeto', c.pay.id, c.pay.es), b: L('objeto', c.get), p: c.offer.spot ? L('lugar', c.offer.spot) : esc(dataTx(c.offer.where)) })}: ${esc(c.why)}.`));
    const routine = sh.routine.map(r => t('{i} en {p}', { i: L('objeto', r.iid), p: list(r.offers.slice(0, 4).map(o => o.spot ? L('lugar', o.spot) : esc(dataTx(o.where)))) }));
    const lures = sh.lures.slice(0, 3).map(m => t('{m} para {p} en {s} ({n})', { m: L('montura', m.rid), p: L('personaje', m.pid), s: L('lugar', m.spot.spot, m.spot.es), n: pct(m.spot.pct) }));
    const once = (sh.once || []).map(x => li(L('objeto', x.iid), esc(x.why)));
    return `<h4>${t('Compras y búsquedas')}</h4>` + (once.length ? `<p><b>${t('Solo este capítulo')}</b> · ${L('lugar', DAGSION, t('tienda de Anna'))}</p>${ul(once)}` : '') + (top.length ? ul(top.map(row)) : `<p class="mut">${t('Nada urgente que comprar para este capítulo.')}</p>`) +
      (rest.length ? `<details class="eq-more"><summary>${t('Más sitios ({n})', { n: rest.length })}</summary>${ul(rest.map(row))}</details>` : '') +
      (chains.length ? `<details class="eq-more"><summary>${t('Búsqueda y trueque con Vandahl ({n})', { n: chains.length })}</summary>${ul(chains)}</details>` : '') +
      ((routine.length || lures.length) ? `<p class="mut">${t('Cada capítulo: {l}. Los manuales se conservan para la Parte 3.', { l: [...routine, ...(lures.length ? [t('cebo para {l}', { l: list(lures) })] : [])].join('; ') })}</p>` : '');
  }

  /** Equipo › Regalos: per team member, what they like in the order of the game's gift menu (to read both lists side by side), stars for
      the tier, and what they dislike folded; those still to recruit first */
  const MARK = { fav: '★', love: '♥' };
  /** the dishes to invite them to: the favourite ones, else the best score (up to 2) */
  const meal = p => { const ms = (GIFT_BY_PID[p]?.meals || []).filter(m => !m.hate), fav = ms.filter(m => m.fav), top = Math.max(0, ...ms.map(m => m.score || 0));
    const pick = (fav.length ? fav : ms.filter(m => m.score === top)).slice(0, 2);
    return pick.length ? `<p class="rg-meal"><b>${t('Comida')}</b> ${esc(list(pick.map(m => dataTx(m.es))))}</p>` : ''; };  // plain likes carry no mark: being on the list says it
  /** Equipo › Regalos: the member's face picks the list (as when you talk to them in the game); one list at a time, in the
      game menu order, two columns (every gift shares one icon in the game, so none here); a teammate's favourite never shows as someone else's plain like */
  function giftsTab(route, members) {
    const want = ctxWant(route), ms = members.filter(p => GIFT_BY_PID[p] && p !== LORDS[route]);
    const order = [...ms.filter(p => want.includes(p)), ...ms.filter(p => !want.includes(p))];
    if (!order.length) return '';
    const sel = order.includes(teamUi.rg) ? teamUi.rg : order[0];
    const pick = `<div class="eq-faces rg-pick" role="group" aria-label="${t('Regalos')}">${order.map(p => `<button type="button" class="eq-face on st-${want.includes(p) ? 'quiero' : 'tengo'}" data-rg="${esc(p)}" aria-pressed="${p === sel}">` +
      `${face(p, 'eq-fimg')}<span>${esc(nm(CHARS[p]))}</span></button>`).join('')}</div>`;
    return pick + order.map(p => { const g = giftList(p, members);
      return `<section class="card rg-u" id="rg-${esc(p)}"${p === sel ? '' : ' hidden'}><h3>${L('personaje', p)}${want.includes(p) ? ` <small class="mut">${t('por reclutar')}</small>` : ''}</h3>` +
        meal(p) +
        `<ul class="rg-l">${g.good.map(x => `<li${MARK[x.t] ? ` class="rg-${x.t}"` : ''}>${L('objeto', x.iid)}${MARK[x.t] ? ` <span class="rg-t" aria-label="${esc(t(TL[x.t]))}">${MARK[x.t]}</span>` : ''}</li>`).join('')}</ul>` +
        (g.bad.length ? `<details class="rg-no"><summary>${t('No le gustan ({n})', { n: g.bad.length })}</summary><p>${list(g.bad.map(i => L('objeto', i)))}</p></details>` : '') + '</section>'; }).join('');
  }

  /** #/equipo?e=: a shared team, read-only (the stored game is not touched until «Usar como mi equipo» is confirmed) */
  /** one unit as a compact row: face, name, build, then class · weapon 1 · weapon 2 · equipment in a line; `open`: the editor below
      (tags, build choices, path, the four selects, where the weapon comes from). `ro` (a shared plan): the row only */
  function unitRow(b, plan, route, key, { open = false, ro = false, picks = {}, extra = '', tags = '' } = {}) {
    const s = plan.slots[b.pid], name = k => (k ? nm(ITEMS[k]) + demon(k) : '');
    const o = b.pick && teamOptions(b.pid, route, key).find(x => x.id === b.pick);
    const line = s ? [esc(nm(CLASSES[s.c])) + (s.next ? ` <small class="mut">(${t('siguiente')})</small>` : ''),
      s.magic && !s.w0 ? esc(t('Hechizos propios') + (s.spells.length ? ': ' + list(s.spellIds.map((id, i) => (SKILLS[id] ? nm(SKILLS[id]) : gt(s.spells[i]))).slice(-3)) : '')) : esc(name(s.w0)), esc(name(s.w1)), esc(name(s.g))].filter(Boolean).join(' · ') : '';
    const who = nm(CHARS[b.pid]);
    return `<section class="card eq-unit${open ? ' eq-open' : ''}" id="eq-${esc(b.pid)}"><div class="eq-row">${face(b.pid, 'cp-face') || '<span class="cp-face"></span>'}<div class="eq-rowt">` +
      `<b>${L('personaje', b.pid)}</b>${o ? ` <span class="eq-tag">${esc(tx(o, 'name'))}</span>` : ''}<span class="eq-line">${line}</span></div>` +
      (ro ? '' : `<button type="button" class="txtbtn txtbtn-2 eq-ed" data-eq-open="${esc(b.pid)}" aria-expanded="${open}" aria-controls="eq-u-${esc(b.pid)}" aria-label="${esc(t('Editar a {p}', { p: who }))}">${t(open ? 'Cerrar' : 'Editar')}</button>`) + '</div>' +
      (open ? `<div id="eq-u-${esc(b.pid)}">${tags}${buildSummary(b, plan, route, key)}${s?.next ? `<p class="mut">${t('Siguiente clase de su build: {c} (examen hacia el {k}).', { c: cls(s.c), k: chapLink(s.next.key) || '—' })}</p>` : ''}` +
        (s ? slotsHtml(b, s, picks[b.pid], route, key) : '') + extra + '</div>' : '') + '</section>';
  }
  /** #/equipo?e=: a shared team, read-only (the stored game is not touched until «Usar como mi equipo» is confirmed) */
  function sharedPage(qs) {
    const { r, pt, key, units, picks, recruits, drop } = teamLinkRead(qs);
    const top = `<h1>${t('Equipo')}</h1><section class="card"><h2>${t('Equipo de un enlace')} <small class="mut">${esc(ROUTE_NAME[r])} · ${esc(capShort(CAPS[key]))}</small></h2>` +
      `<p class="mut">${t('Solo lectura: tu partida no cambia hasta que lo uses como tu equipo.')}</p><div class="eq-acts">` +
      (units.length ? `<button type="button" class="txtbtn" data-eq-use>${t('Usar como mi equipo')}</button>` : '') + `<a class="txtbtn txtbtn-2" href="#/equipo">${t('Ver mi equipo')}</a></div></section>`;
    if (!units.length) return top + `<p class="mut">${t('El enlace no trae ningún equipo de esta ruta.')}</p>`;
    const plan = teamPlan(r, key, recruits, drop, [], picks);
    const gaps = plan.roles.gaps.map(g => t(ROLE_WARN[g])), n = plan.builds.length, m = planSize(r, pt);
    return top + `<p class="mut eq-size">${t(n > m ? '{n} en el equipo; en cada batalla caben {m}' : '{n} de {m} en el equipo', { n, m })}</p>` + (gaps.length ? `<p class="eq-gapc">${esc(list(gaps))}</p>` : '') +
      `<div class="eq-units">${[...plan.builds].sort((a, b) => bySerial(a.pid, b.pid)).map(b => unitRow(b, plan, r, key, { ro: true })).join('')}</div>`;
  }
  const ROLE_WARN = { sanador: 'Nadie cura', arquero: 'Nadie con arco', mago: 'Nadie con magia', volador: 'Nadie vuela', tanque: 'Nadie aguanta golpes' };  // i18n-ignore (shown through t())

  function page(qs) {
    if (qs.e) return sharedPage(qs);
    // nothing picked: no pretend Cai game, an invitation (as the home page and Capítulo)
    if (!ROUTE_IDS.includes(qs.r) && !ctxChosen()) return `<h1>${t('Equipo')}</h1><section class="card"><p>${t('Elige ruta y capítulo para planificar reclutas, builds, monturas y equipamiento.')}</p>` +
      `<p><button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog">${t('Elegir ruta y capítulo')}</button></p>` +
      `<p class="mut">${t('O empieza por una ruta: {l}.', { l: ROUTE_IDS.map(x => `<a href="#/equipo?r=${x}">${esc(ROUTE_NAME[x])}</a>`).join(' · ') })}</p></section>`;
    // Equipo is the player's game, not a listing: its ?r= (the invitation, old planner links) picks the game like the header selector
    if (ROUTE_IDS.includes(qs.r) && (!ctxChosen() || qs.r !== ctxGet().route)) { const c0 = CAPS[ctxGet().key]; ctxSet(qs.r, c0.route === 'comun' ? c0.key : chapterFromPath(qs.r, 1, c0.n)); }
    const route = ctxGet().route, key = ctxGet().key;
    // old recruit planner links (#/planificador?r=&p=pid,pid): their picks join the selection as «quiero»; none of this route: said
    let oldP = '';
    if (qs.p) { const ps = String(qs.p).split(','), add = ps.filter(p => Object.hasOwn(CHARS, p) && CHARS[p].routes?.[route]?.recruit_key && !ctxTeamRaw().includes(p));
      if (add.length) ctxSetRecruits([...ctxTeamRaw(), ...add]); else if (!ps.some(p => ctxTeamRaw().includes(p))) oldP = `<p class="mut">${t('El enlace antiguo no traía unidades de esta ruta.')}</p>`; }
    // ?r= and ?p= are applied once: out of the address, so a later header route or a tap that takes a unit out is not undone
    if ((qs.r || qs.p) && typeof history !== 'undefined' && history.replaceState) { const { r: _r, p: _p, ...rest } = qs; history.replaceState(history.state, '', qsHref('equipo', rest, {})); }
    const c = ctxGet(), all = teamChips(route, key), picked = ctxRecruits(route), want = ctxWant(route), drop = ctxDrop(route);
    const st = p => teamState(p, route, key, c), marked = all.filter(p => st(p) !== 'no'), lord = LORDS[route], STW = { quiero: 'quiero', tengo: 'tengo', llega: 'llega' };
    const at = capPos(route, key), from = p => { const x = CHARS[p].routes[route]; return x.join_key || x.recruit_key; }, later = marked.filter(p => capPos(route, from(p)) > at);
    const plan = teamPlan(route, key, picked, drop, want), { roles } = plan, pt = planPt(key), picks = ctxPicks(route), size = 1 + marked.length, cap = planSize(route, pt);
    // «Elegir equipo»: one dialog with every face (a tap cycles no → quiero → tengo, a story unit in or out; the lord is always in), the
    // suggestions on top: «Completar equipo» (teamFill) or, from a gap's «Arreglar», who covers that role
    const cell = (p, why = '') => { const s = st(p), soon = capPos(route, from(p)) > at, label = why || (s === 'no' ? (soon ? esc(capShort(CAPS[from(p)])) : '') : t(STW[s]) + (soon ? ' · ' + esc(capShort(CAPS[from(p)])) : ''));
      return `<button type="button" class="eq-face st-${s}${s !== 'no' ? ' on' : ''}" data-eq="${esc(p)}" aria-pressed="${s !== 'no'}" aria-label="${esc(nm(CHARS[p]))}: ${esc(t(STW[s] || 'no está en el equipo'))}">${face(p, 'eq-fimg')}<span>${esc(nm(CHARS[p]))}</span>` +
        `${label ? `<small>${esc(label)}</small>` : ''}</button>`; };
    const fill = teamFill(route, key, c), gapsAll = teamGaps(route, key, plan.prio.map(x => x.pid), plan.builds);
    const fixG = teamUi.fix && gapsAll.find(g => g.role === teamUi.fix), sug = fixG ? fixG.picks.map(x => ({ pid: x.pid, why: t('cubre {r}', { r: roleName(fixG.role) }) })) : fill;
    const order = [...all].sort((a, b) => !!CHARS[b].routes[route].join_key - !!CHARS[a].routes[route].join_key || capPos(route, from(a)) - capPos(route, from(b)) || bySerial(a, b));
    const dlg = `<dialog class="eq-dlg" id="eq-pick" aria-labelledby="eq-pick-t"><div class="eq-dlg-h"><h2 id="eq-pick-t">${t('Elegir equipo')} <small class="mut">${t(size > cap ? '{n} en el equipo; en cada batalla caben {m}' : '{n} de {m} en el equipo', { n: size, m: cap })}</small></h2>` +
      `<button type="button" class="txtbtn txtbtn-2" data-eq-close aria-label="${esc(t('Cerrar'))}">✕</button></div>` +
      (sug.length ? `<h3>${t('Sugeridos')}</h3><div class="eq-faces">${sug.map(x => cell(x.pid, x.why)).join('')}</div><h3>${t('Todos')}</h3>` : '') +
      `<div class="eq-faces" role="group" aria-label="${t('Equipo')}"><span class="eq-face on lord">${face(lord, 'eq-fimg')}<span>${esc(nm(CHARS[lord]))}</span></span>${order.map(p => cell(p)).join('')}</div>` +
      `<p class="mut">${t('Un toque: quiero reclutarlo; otro: ya lo tengo; otro: fuera.')}</p></dialog>`;
    // who is in, at a glance (the faces only; the dialog changes it)
    const strip = `<div class="eq-strip" aria-label="${esc(t('En el equipo: {l}', { l: list([lord, ...marked].map(p => nm(CHARS[p]))) }))}">${[lord, ...marked].map(p => face(p, 'eq-sface') || `<span class="eq-sface">${esc(nm(CHARS[p]).slice(0, 2))}</span>`).join('')}</div>`;
    // «Hazlo todo»: completes the team and fixes the recommended build where none is chosen; hand picks stay
    const unfixed = plan.builds.filter(b => plan.choice[b?.pid] && !picks[b.pid]?.b);
    const todo = fill.length || unfixed.length ? `<button type="button" class="txtbtn" data-eq-fill="${esc(fill.map(x => x.pid).join(','))}" aria-describedby="eq-todo-d">${t('Hazlo todo')}</button>` : '';
    const todoD = todo ? `<p class="mut" id="eq-todo-d">${fill.length ? t('Completa el equipo con {l} y fija la build recomendada de quien no tiene una elegida; lo que cambiaste a mano se queda.', { l: esc(list(fill.map(x => nm(CHARS[x.pid])))) })
      : t('Fija la build recomendada de quien no tiene una elegida; lo que cambiaste a mano se queda.')}</p>` : '';
    const sizeTxt = t(size > cap ? '{n} en el equipo; en cada batalla caben {m}' : '{n} de {m} en el equipo', { n: size, m: cap }) + (later.length ? ' ' + t(later.length === 1 ? '({n} se une más adelante)' : '({n} se unen más adelante)', { n: later.length }) : '') +
      (pt === '3' ? ' ' + t('(hasta {f} en la batalla final)', { f: planFinal(route) }) : '');
    const head = `<h1>${t('Equipo')}</h1>${oldP}<section class="card eq-sel"><h2 class="eq-sel-t">${t('Tu equipo')} <small class="mut">${esc(ROUTE_NAME[route])} · ${esc(capShort(CAPS[key]))}</small></h2>` +
      `${strip}<p class="mut eq-size">${sizeTxt}</p><div class="eq-acts"><button type="button" class="txtbtn" data-eq-pick aria-haspopup="dialog">${t('Elegir equipo')}</button>${todo}` +
      `<a class="txtbtn" data-eq-copy href="${esc(qsHref('equipo', {}, { r: route, pt, k: key, e: planEnc(teamLink(route, key, c)) }))}">${t('Copiar enlace')}</a></div>${todoD}${dlg}</section>`;
    // roles in one line; each gap: a warning, «Arreglar» (the dialog with who covers it) and the build switches that open no other gap
    const roleChips = `<p class="eq-roles" tabindex="-1">${ROLES.map(([r, rn]) => { const n = roles.cover[r].length, gap = !n && ROLE_NEEDED.includes(r);
      return `<span class="eq-role${gap ? ' eq-gapc' : ''}" title="${esc(list([...roles.cover[r]].sort(bySerial).map(p => nm(CHARS[p]))))}">${t(rn)} <b>${n}</b>${gap ? ' ⚠' : ''}</span>`; }).join('<span aria-hidden="true"> · </span>')}</p>`;
    const opens = (p, o) => ROLE_NEEDED.some(r => !roles.gaps.includes(r) && !plan.builds.some(b => (b.pid === p ? o.roles || [] : b.roles).includes(r)));
    const gapTxt = gapsAll.map(g => { const f = roles.fix[g.role] || [];
      const sw = f.length ? t('o {l}', { l: list([...f].sort((a, b) => bySerial(a[0], b[0])).map(([p, j]) => t('{p} como {c}', { p: L('personaje', p), c: cls(j) }))) }) : '';
      const bf = plan.builds.flatMap(b => { const o = teamOptions(b.pid, route, key).find(x => x.ok && x.id !== b.pick && (x.roles || []).includes(g.role) && !opens(b.pid, x)); return o ? [[b.pid, o]] : []; }).slice(0, 2)
        .map(([p, o]) => `<button type="button" class="eq-add" data-eq-b="${esc(p)}|${esc(o.id)}" data-eq-gap>${esc(t('{p} con la build {b}', { p: nm(CHARS[p]), b: tx(o, 'name') }))}</button>`);
      const fix = g.picks.length ? `<button type="button" class="eq-add" data-eq-fix="${esc(g.role)}" aria-haspopup="dialog" aria-label="${esc(t('Arreglar: {w}', { w: t(ROLE_WARN[g.role]) }))}">${t('Arreglar')}</button>` : '';
      return `<li><b>${t(ROLE_WARN[g.role])}</b> ${fix}${bf.join('')}${!fix && !bf.length ? `<span class="mut">${t('nadie en esta ruta')}</span>` : ''}${sw ? ` <small class="mut">${sw}</small>` : ''}</li>`; });
    const clashes = plan.prio.map(x => x.pid).sort(bySerial).flatMap(p => Object.values(plan.mounts[p] || {}).filter(m => m.lost_to).map(m => [p, m]))
      .map(([p, m]) => li(t('{m} para {p}', { m: L('montura', m.want), p: L('personaje', m.lost_to) }), t('{p} lleva {m}.', { p: L('personaje', p), m: L('montura', m.rid) })));
    const equipo = roleChips + (gapTxt.length ? `<h4 id="eq-gaps-h" tabindex="-1">${t('Para cubrir huecos')}</h4><ul class="eq-gaps">${gapTxt.join('')}</ul>` : '') +
      (clashes.length ? `<h4>${t('Monturas en conflicto')}</h4>${ul(clashes)}` : '');
    const rank = Object.fromEntries(plan.prio.map(x => [x.pid, x.n])), gearOf = Object.fromEntries(plan.gear.map(g => [g.pid, g]));
    const stTag = p => { if (p === LORDS[route]) return ''; const s = st(p);
      return `<span class="cp-tag">${s === 'tengo' ? t('ya lo tienes') : s === 'llega' ? t('se une en {c}', { c: esc(capShort(CAPS[CHARS[p].routes[route].join_key])) }) : t('quieres reclutarlo')}</span>`; };
    const tags = b => `<p>${rank[b.pid] ? `<span class="cp-tag">${t('prioridad {n}', { n: rank[b.pid] })}</span>` : ''}${b.roles.length ? `<span class="cp-tag">${esc(roleNames(b.roles))}</span>` : ''}${stTag(b.pid)}</p>`;
    const builds = `<div class="eq-units" id="eq-equipamiento">${[...plan.builds].sort((a, b) => bySerial(a.pid, b.pid)).map(b => unitRow(b, plan, route, key,
      { open: teamUi.open === b.pid, picks, tags: tags(b), extra: gearHtml(gearOf[b.pid], plan.forge) })).join('')}</div>`;
    const rules = RULES.filter(r => !WEEK_RULE.test(r));
    // three tabs: builds and equipment, gifts, recruitment; the rules folded at the foot (?sec=reglas opens it)
    return ficha(head, [
      ['equipo', 'Builds y equipamiento', equipo + builds],
      ['regalos', 'Regalos', giftsTab(route, plan.prio.map(x => x.pid))],
      ['reclutamiento', 'Reclutamiento', `<section class="card eq-box">${recruitment(route, want) || `<p class="mut">${t('Nadie pendiente de reclutar.')}</p>`}` + `</section>` +
        (want.length ? `<section class="card eq-box eq-gifts"><h3>${t('Regalos para subir el apoyo')}</h3>${birthdays(plan.week)}` +
          (giftRound(plan.round) || `<p class="mut">${t('Ningún «quiero» con regalos que preparar.')}</p>`) + '</section>' : '')],
    ]) + `<details class="card eq-reglas" id="eq-reglas"${qs.sec === 'reglas' ? ' open' : ''}><summary>${t('Cómo se calcula ({n})', { n: rules.length })}</summary>${ul(rules.map(r => `<li>${esc(t(r))}</li>`))}</details>`;
  }

  /** Capítulo › «Esta semana»: the week checklist for the context team at `key` (the «quiero» recruits), with its rules folded */
  const weekBody = plan => { const rules = RULES.filter(r => WEEK_RULE.test(r));
    return weekHtml(plan.week, plan.round, plan.shop, plan.forge) + `<details class="eq-more"><summary>${t('Cómo se calcula ({n})', { n: rules.length })}</summary>${ul(rules.map(r => `<li>${esc(t(r))}</li>`))}</details>`; };
  /** the plan of the context team (Mi partida) on `route` at `key`: Capítulo computes it once and hands it to its blocks */
  window.teamCtxPlan = (route, key) => teamPlan(route, key, ctxRecruits(route), ctxDrop(route), ctxWant(route));
  window.teamWeekBlock = (route, key, plan = window.teamCtxPlan(route, key)) => weekBody(plan);
  /** Capítulo › En Dagsion: who eats with the lord and who goes to the Servicio divino this weekend (gifts live in Equipo › Regalos) */
  window.teamWeekendSummary = (route, key) => {
    const army = ctxTeam(route).filter(p => p !== LORDS[route] && teamState(p, route, key) === 'tengo');  // the Servicio divino pairs the lord with a recruited unit
    const w = teamWeekend(route, key, ctxWant(route), 0, army), lordN = L('personaje', w.lord);
    if (!w.weekends.length) return `<p class="mut">${t('Este capítulo no tiene días libres en fin de semana.')}</p>`;
    const meal = w.meals.find(m => m.guests.length), svc = (w.service || []).find(s => s.with);
    const lines = [
      meal && t('Comidas: {a} con {b}.', { a: lordN, b: who(meal.guests) }),
      svc && t('Servicio divino: {a} con {b} en el {c}.', { a: lordN, b: L('personaje', svc.with), c: L('lugar', svc.god) }),
    ].filter(Boolean);
    return lines.length ? ul(lines.map(x => `<li>${x}</li>`)) : '';
  };

  /** Capítulo › Tiempo libre: 3–5 errands for the turns left once the chapter's important things are done */
  const FREE_VERB = { buscar: 'Busca en {s}', mazmorra: 'Entra en {s}', entrenar: 'Entrena en {s}', oro: 'Busca en {s}', cebo: 'Pon un cebo en {s}', cultivo: 'Planta en {s}' };
  window.teamFreeBlock = (route, key, plan = window.teamCtxPlan(route, key)) => {
    const S = teamFreeSections(route, key, plan);
    if (!Object.values(S).some(l => l.length)) return '';
    // more than 6 turns of searching: the expected count of the total («≈0,3 de 10»)
    const obj = g => (g.some ? t('≈{n} de {m} {a}', { n: num(g.n), m: g.of, a: L('objeto', g.iid) }) : `${g.n > 1 ? `${g.n}× ` : ''}${L('objeto', g.iid)}`);
    const cost = x => t(x.turns === 1 ? '{n} turno' : '{n} turnos', { n: x.turns }) + (x.travel > 0 ? ' ' + t(x.travel === 1 ? '(a ~{n} turno de Dagsion)' : '(a ~{n} turnos de Dagsion)', { n: x.travel }) : '');
    const recruit = p => t('para reclutar a {p} (desde el {c})', { p: L('personaje', p), c: esc((cs => (isEn() ? cs : cs.replace(/^C/, 'c')))(capShort(CAPS[CHARS[p].routes[route].recruit_key] || {}))) });
    // a barter: what to collect (or buy) and where, then where to trade it and for what
    const barter = x => {
      const mats = list(x.gain.filter(g => g.iid).map(g => g.src ? t('{a} en {s}', { a: obj(g), s: L('lugar', g.src) }) : t('{a} (cómpralo, {g})', { a: obj(g), g: gold(g.buy) })));
      const sold = x.gain.find(g => g.gold && !g.iid), many = x.gain.filter(g => g.iid).reduce((a, g) => a + (g.n || 1), 0) > 1, v = { s: L('lugar', x.at), w: L('objeto', x.trade) };
      const end = x.kind === 'oro' ? t(many ? 'cámbialos en {s} por {w} y véndelo ({g})' : 'cámbialo en {s} por {w} y véndelo ({g})', { ...v, g: gold(sold?.gold || 0) })
        : x.only ? t(many ? 'cámbialos en {s} por {w} (solo por trueque)' : 'cámbialo en {s} por {w} (solo por trueque)', v)
        : t(many ? 'cámbialos en {s} por {w} (ahorras {g})' : 'cámbialo en {s} por {w} (ahorras {g})', { ...v, g: gold(x.save || 0) });
      const foe = x.foe ? ' ' + t('— eficaz contra {f} en {b}', { f: esc(t(FOE_ES[x.foe] || x.foe)), b: L('batalla', x.battle, x.battleEs) }) : '';
      return `<li>${t('Junta {m}', { m: mats })} · ${cost(x)}: ${end}${foe}</li>`;
    };
    const line = x => {
      if (x.trade) return barter(x);
      if (x.kind === 'comprar') { const g = x.gain[0]; return `<li>${t('Compra en {s}', { s: L('lugar', x.spot) })}: ${obj(g)} (${gold(g.buy)}) ${recruit(g.recruit)}</li>`; }
      const items = x.gain.filter(g => g.iid), chests = items.filter(g => g.chest), rest = items.filter(g => !g.chest), sk = x.gain.filter(g => g.skill);
      const bits = [
        chests.length && t('cofre (si sigue cerrado): {a}', { a: list(chests.map(obj)) }),
        rest.length && list(rest.map(g => obj(g) + (g.trade ? ' ' + t('para trocar por {a}', { a: L('objeto', g.trade) }) : g.recruit ? ' ' + recruit(g.recruit) : g.gift ? ' ' + t('regalo favorito de {a}', { a: L('personaje', g.gift) }) : g.why === 'forja' ? ' ' + t('para la forja') : '') +
          (g.gold ? ` (${t('vale {g}', { g: gold(g.gold) })})` : ''))),
        x.gain.filter(g => g.mount).map(g => t('{m} para {p}', { m: L('montura', g.mount), p: L('personaje', g.pid) }))[0],
        sk.length && t('competencias: {a}', { a: esc(list(sk.map(g => `${t(g.skill)} ${g.rank}`))) }) + (x.for?.length ? ` (${list(x.for.map(p => L('personaje', p)))})` : ''),
        sk.length && t('sal a los 15 turnos de cada batalla rápida y vuelve a entrar; no acabes con el grupo.'),
      ].filter(Boolean);
      const foe = x.foe ? ' ' + t('— eficaz contra {f} en {b}', { f: esc(t(FOE_ES[x.foe] || x.foe)), b: L('batalla', x.battle, x.battleEs) }) : '';
      return `<li>${t(FREE_VERB[x.kind], { s: L('lugar', x.spot) })} · ${cost(x)}: ${bits.join('; ')}${foe}</li>`;
    };
    const SEC = [['now', 'Ahora para tu equipo'], ['ahead', 'Adelanta'], ['weapons', 'Trueques por armas'], ['gold', 'Si necesitas dinero'], ['mats', 'Si necesitas materiales de forja']];
    return `<p class="mut">${t('Cuando ya hayas hecho lo importante del capítulo:')}</p>` +
      SEC.filter(([k]) => S[k].length).map(([k, h]) => `<h4>${t(h)}</h4><ul class="cp-list">${S[k].map(line).join('')}</ul>`).join('');
  };

  /** re-render in place keeping the page scroll and the focus on the pressed control (selector `again` finds it) */
  function keepPlace(again, change, say = true) {
    const y = window.scrollY;
    const h = location.hash.replace(/([?&])ir=[^&]*&?/, '$1').replace(/[?&]$/, '');  // a deep-link ?ir= would scroll on every render
    if (h !== location.hash) history.replaceState(null, '', h);
    // folds stay as they were (shell.js turns <details> into .fold): open ones are found again by their title (its counts may change)
    const key = b => (b.dataset.t || '').replace(/\d+/g, '#');
    const open = new Set([...document.querySelectorAll('main .fold-b[aria-expanded="true"]')].map(key));
    change();
    render(true);
    if (open.size && typeof foldToggle === 'function') document.querySelectorAll('main .fold-b[aria-expanded="false"]').forEach(b => { if (open.has(key(b))) foldToggle(b, true); });
    document.querySelector(again)?.focus({ preventScroll: true });
    window.scrollTo(0, y);
    if (say && typeof announce === 'function') announce(t('Equipo y equipamiento recalculados'));
  }

  /** the «Elegir equipo» dialog open again after a re-render, focus on `sel` inside it (the dialog keeps open while the team changes) */
  const reopen = sel => { const d = document.getElementById('eq-pick'); if (!d) return; d.showModal(); (d.querySelector(sel) || d.querySelector('[data-eq]'))?.focus(); };
  // every control changes ctx (teamApply, teamPickSet, teamDoAll) and re-renders in place (the page does not move)
  document.addEventListener('click', e => {
    const dlg = document.getElementById('eq-pick'), route = ctxGet().route, key = ctxGet().key;
    const fx = e.target.closest?.('main [data-eq-pick],main [data-eq-fix]');
    if (fx) { const role = fx.dataset.eqFix || null;
      if (role !== (teamUi.fix || null)) keepPlace(fx.dataset.eqFix ? `[data-eq-fix="${window.CSS.escape(role)}"]` : 'main [data-eq-pick]', () => { teamUi.fix = role; }, false);
      reopen('h3 + .eq-faces [data-eq]'); return; }
    if (dlg?.open) {  // a tap on the backdrop (outside the dialog box, not on its padding) or ✕ closes it
      const r = dlg.getBoundingClientRect(), out = e.target === dlg && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
      if (out || e.target.closest?.('[data-eq-close]')) { dlg.close(); teamUi.fix = null; document.querySelector('main [data-eq-pick]')?.focus(); return; }
      const f = e.target.closest?.('[data-eq]');
      if (f) { const sel = `[data-eq="${window.CSS.escape(f.dataset.eq)}"]`; dlg.close(); keepPlace('main [data-eq-pick]', () => teamApply({ eq: f.dataset.eq })); reopen(sel); }
      return;
    }
    const cp = e.target.closest?.('main [data-eq-copy]');
    if (cp) { e.preventDefault(); const url = location.href.split('#')[0] + cp.getAttribute('href');
      (navigator.clipboard?.writeText(url) ?? Promise.reject()).then(() => announce(t('Enlace copiado')), () => { prompt(t('Copia este texto:'), url); }); return; }
    if (e.target.closest?.('main [data-eq-use]')) {
      const qs = parseHash(location.hash).qs;
      if (!confirm([t('¿Reemplazar tu equipo por este? Tu selección actual de esta ruta se pierde.'), teamUseNote(qs)].filter(Boolean).join(' '))) return;
      teamUseLink(qs); location.hash = '#/equipo'; return; }
    const op = e.target.closest?.('main [data-eq-open]');
    if (op) { const pid = op.dataset.eqOpen; keepPlace(`[data-eq-open="${window.CSS.escape(pid)}"]`, () => { teamUi.open = teamUi.open === pid ? null : pid; }, false); return; }
    const bp = e.target.closest?.('main [data-eq-b],main [data-eq-reset]');
    if (bp) { const [pid, id] = (bp.dataset.eqB || bp.dataset.eqReset).split('|');
      // from a gap: the gaps heading (the button goes away once the gap is covered); from a unit: the same control
      const again = bp.dataset.eqGap != null ? 'main #eq-gaps-h, main .eq-roles' : bp.dataset.eqB ? `#eq-${window.CSS.escape(pid)} [data-eq-b="${window.CSS.escape(bp.dataset.eqB)}"]` : `#eq-${window.CSS.escape(pid)} [data-eq-s]`;
      keepPlace(again, () => teamPickSet(route, pid, bp.dataset.eqB ? 'b' : 'reset', id)); return; }
    if (e.target.closest?.('main [data-eq-fill]')) { keepPlace('main [data-eq-fill], main [data-eq-pick]', () => teamDoAll(route, key)); return; }
    const r = e.target.closest?.('[data-rg]');
    if (r) { teamUi.rg = r.dataset.rg; document.querySelectorAll('[data-rg]').forEach(x => x.setAttribute('aria-pressed', x === r));
      document.querySelectorAll('.rg-u').forEach(x => { x.hidden = x.id !== 'rg-' + r.dataset.rg; }); }
  });
  // a slot select: the hand pick is stored (ctx.plan) and the page recomputes in place
  document.addEventListener('change', e => {
    const el = e.target.closest?.('main [data-eq-s]'); if (!el) return;
    const [pid, f] = el.dataset.eqS.split('|');
    keepPlace(`[data-eq-s="${window.CSS.escape(el.dataset.eqS)}"]`, () => teamPickSet(ctxGet().route, pid, f, el.value));
  });
  // leaving the page ends the edit: coming back with a selection shows it folded
  if (typeof window.addEventListener === 'function') window.addEventListener('hashchange', () => { if (!/^#\/equipo\b/.test(location.hash)) { teamLeave(); teamUi.open = null; teamUi.fix = null; } });

  // #/planificador?p= (the old recruit planner) is rewritten to #/equipo by core.js (OLD_ADDR) before it gets here
  const renderEquipo = (id, qs) => {
    return page(qs || {});
  };
  register({ id: 'equipo', title: 'Equipo', render: renderEquipo, css: CSS,
    search: () => [
      // search.js translates label and sub with t()
      { group: 'Secciones', label: 'Equipo', sub: 'Builds, equipamiento, reclutamiento', href: '#/equipo', aliases: ['team', 'reclutas', 'planificador', 'planner', 'team planner'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Regalos del equipo', sub: 'Equipo · regalos y comidas por personaje', href: '#/equipo?sec=regalos', aliases: ['ronda', 'ronda de regalos', 'regalos de la semana', 'regalar', 'comidas', 'posada'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Trueques y dinero fácil', sub: 'Capítulo · trueques de Vandahl y botín que se vende', href: '#/cap?ir=eq-consejos', aliases: ['consejos', 'trueques', 'vandahl', 'dinero', 'novedades'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Herrería', sub: 'Capítulo · qué refinar', href: '#/cap?ir=eq-herreria', aliases: ['refinar', 'refinado', 'forja', 'reparar', 'compras'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Builds del equipo', sub: 'Equipo', href: '#/equipo?ir=eq-equipamiento', aliases: ['build', 'clases del equipo', 'monturas', 'equipamiento', 'armas del equipo'] },  // i18n-ignore (aliases)
      { group: 'Secciones', label: 'Reclutamiento', sub: 'Equipo · condiciones, oro y objetos', href: '#/equipo?sec=reclutamiento', aliases: ['reclutar', 'requisitos'] },  // i18n-ignore (aliases)
    ] });
})();
