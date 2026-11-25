/* Fortune's Weave · Mi partida › Armas y equipo (#/armas): the weapons worth buying, getting and refining for the team builds,
   by weapon type (teamArms in equipo-plan.js). Nothing about selling: gold lives in the chapter and weekend pages. */
'use strict';

(() => {
  const CSS = `.ar-g{margin-bottom:var(--s3)}.ar-g h2{display:flex;align-items:center;gap:8px;font-size:var(--fs-sec);margin:0 0 var(--s2)}
.ar-i{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;padding:var(--s2) 0;border-top:1px solid var(--line)}.ar-i:first-of-type{border-top:0}
.ar-i>.ico{grid-row:span 3;width:32px;height:32px}.ar-n{font-weight:650}.ar-who{display:flex;gap:2px;flex-wrap:wrap}.ar-who img{width:22px;height:22px;border-radius:50%}
.ar-m{font-size:var(--fs-small);color:var(--mut)}.ar-ref{font-size:var(--fs-small)}`;
  const face = p => img(ico().face?.[p], 'ar-f') || '';
  const WHY = { comprar: 'Compra', conseguir: 'Conseguir', refinar: 'Refinar' };
  function row(i) {
    const w = ITEMS[i.iid].weapon, stats = t('Pot {m}, peso {w}', { m: w.might, w: w.weight });
    const where = i.where ? (i.spot ? L('lugar', i.spot, dataTx(i.where).replace(/\s*\(.*\)$/, '')) : esc(dataTx(i.where))) : '';
    const pay = i.pay?.length ? t('trueque por {l}', { l: list(i.pay.map(p => `${p.n > 1 ? p.n + '× ' : ''}${L('objeto', p.id, p.es)}`)) }) : i.price ? gold(i.price) : '';
    const ref = i.refine ? `<span class="ar-ref"><span class="cp-tag">${t('Refinar')}</span> → ${L('objeto', i.refine.to)} · ${list(Object.entries(i.refine.mats).map(([m, n]) => `${n}× ${L('objeto', m)}`))} · ${gold(i.refine.gold)}</span>` : '';
    return `<div class="ar-i">${itemIco(i.iid, 'ico')}<span><span class="ar-n">${L('objeto', i.iid)}</span>${(x => (x ? ` <span class="cp-tag">${x.tier}</span>` : ''))(armsTier(i.iid, CAPS[ctxGet().key]?.part || 1))} <span class="ar-who" title="${esc(list(i.who.map(p => nm(CHARS[p]))))}">${i.who.map(face).join('')}</span></span>` +
      `<span class="ar-m">${[i.why !== 'refinar' && t(WHY[i.why]), where, pay, stats, i.note && esc(t(i.note))].filter(Boolean).join(' · ')}</span>${ref}</div>`;
  }
  function page() {
    const head = `<h1>${t('Armas y equipo')}</h1>`;
    if (!ctxChosen()) return head + `<section class="card"><p><button class="txtbtn" type="button" data-sheet="ctx" aria-haspopup="dialog">${t('Elegir ruta y capítulo')}</button></p></section>`;
    const route = ctxGet().route, key = ctxGet().key, plan = teamPlan(route, key, ctxRecruits(route), ctxDrop(route), ctxWant(route));
    const groups = teamArms(plan);
    if (!groups.length) return head + `<p class="mut">${t('Nada que comprar ni refinar para las builds de tu equipo en este capítulo.')}</p>`;
    const name = ty => t(ARMAS.find(a => a[0] === ty)[1]);
    // per weapon type: the 4 most useful (refinable, shared, strongest) and the rest folded
    return head + groups.map(g => `<section class="card ar-g"><h2>${name(g.type)}</h2>${g.items.slice(0, 4).map(row).join('')}` +
      (g.items.length > 4 ? `<details class="eq-more"><summary>${t('Más ({n})', { n: g.items.length - 4 })}</summary>${g.items.slice(4).map(row).join('')}</details>` : '') + '</section>').join('');
  }
  register({ id: 'armas', title: 'Armas y equipo', routes: ['armas'], render: page, css: CSS });
})();
