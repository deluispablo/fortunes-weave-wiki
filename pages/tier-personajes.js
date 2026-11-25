/* Fortune's Weave · wiki2 · Tier list de personajes (#/tier-personajes?r=<route>|final): the build tiers (WIKI_EXT.builds.tiers) of a
   route's Part 1 units, or of Parts 2–3 («final»), grouped S → A → B, each with its portrait, ficha, build card and «En tu equipo». */
'use strict';
/** [{tier, pids}] in rank order (buildRank); route 'final' = Parts 2–3 */
function tierChars(route) {
  const tiers = (((window.WIKI_EXT || {}).builds || {}).tiers || {})[route] || {}, by = {};
  for (const [pid, tr] of Object.entries(tiers)) if (CHARS[pid]) (by[tr] ??= []).push(pid);
  return Object.keys(by).sort((a, b) => buildRank(a) - buildRank(b) || a.localeCompare(b))
    .map(tier => ({ tier, pids: by[tier].sort((a, b) => nm(CHARS[a]).localeCompare(nm(CHARS[b]), 'es')) }));
}

(() => {
  const CSS = `.tc-g h2{font-size:var(--fs-row);margin:0 0 var(--s2)}.tc-u{display:flex;align-items:center;gap:var(--s2);min-height:var(--tap);border-top:1px solid var(--line)}
.tc-u .bd-f{flex:none;width:32px;height:32px;border-radius:50%;object-fit:cover;object-position:50% 15%;background:var(--surface2)}.tc-n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tc-u .mm-tag{flex:none;display:inline-block;padding:0 var(--s2);border-radius:var(--r1);background:var(--surface2);color:var(--tx2);font-size:var(--fs-small)}.tc-b{flex:none;font-size:var(--fs-small)}`;
  const COM = () => `<span class="gu-com" title="${esc(t('Dato de la comunidad'))}"></span>`;
  function page(qs = {}) {
    const B = (window.WIKI_EXT || {}).builds || {}, c = ctxGet(), late = ctxChosen() && CAPS[c.key]?.part >= 2;
    const r = qs.r === 'final' || ROUTE_IDS.includes(qs.r) ? qs.r : late ? 'final' : ctxRoute() || 'final';
    const end = r === 'final', team = end ? null : teamNow(r);
    const card = new Set(buildsCatalog(end ? '' : r, end ? 3 : 1).map(u => u.pid));  // the units Builds draws a card for
    const row = pid => `<div class="tc-u">${img(ico().face?.[pid], 'bd-f') || '<span class="bd-f"></span>'}<span class="tc-n">${L('personaje', pid)}</span>` +
      (team?.has(pid) ? `<span class="mm-tag">${t('En tu equipo')}</span>` : '') +
      (card.has(pid) ? `<a class="tc-b" href="${esc(`#/builds?r=${end ? 'todas' : r}&p=${end ? 3 : 1}&ir=bd-u-${pid}`)}">${t('Ver build')}</a>` : '') + '</div>';
    const groups = tierChars(r);
    const body = groups.length ? groups.map(g => `<section class="card tc-g"><h2>${esc(g.tier)}</h2>${g.pids.map(row).join('')}</section>`).join('')
      : `<p class="mut">${t('Ningún personaje con estos filtros.')}</p>`;
    const ctl = `<div class="aw-ctx">${chips('tier-personajes', qs, 'r', [...ROUTE_IDS.map(x => [x, ROUTE_NAME[x]]), ['final', 'Partes 2 y 3']], r, 'Ruta')}</div>`;
    return `<h1>${t('Tier list de personajes')}</h1><p class="mut">${end ? t('Quién rinde más en las Partes 2 y 3.') : t('Quién rinde más en la Parte 1 de la ruta de {r}.', { r: esc(ROUTE_NAME[r]) })} ${COM()}</p>` +
      ctl + body + `<p class="mut">${t('El tier es de la comunidad; las clases y cuándo se abren, en <a href="#/builds">Builds</a>.')}</p>`;
  }
  register({ id: 'tier-personajes', group: 'minmax', title: 'Tier list de personajes', order: 15, render: (id, qs) => page(qs || {}), css: CSS,
    search: () => [{ group: 'Mecánicas', label: tl('Tier list de personajes'), sub: tl('Quién rinde más por ruta y en las Partes 2 y 3'), href: '#/tier-personajes', aliases: ['tier list personajes', 'mejores personajes', 'tier list unidades'], pre: true }] });  // i18n-ignore
})();
