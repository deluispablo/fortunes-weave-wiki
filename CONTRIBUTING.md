# Contributing

Thanks for helping. Every change goes through a pull request that is reviewed before it is published.

## The short path

1. Fork the repository and create a branch.
2. Edit the file you need (see the table below).
3. Open the wiki locally (`python3 -m http.server 8000`) and check that the page looks right, in both languages if your change has text.
4. Run `node scripts/check.mjs` (Node 20 or later). It must print «All good».
5. Open the pull request, saying what you changed and where it can be seen in the game.

For a small fix, GitHub's edit button on the file is enough: it creates the fork and the pull request for you, and the check runs on its own.

## Where things live

| You want to change | File |
|---|---|
| Characters, classes, skills, items, gifts, places, chapters, glossary | `data.js` (one section per topic: `chars`, `classes`, `skills`, `items`, `gifts`, `map`, `chapters`…) |
| Guides | `data.js`, section `guias` (and `temas` for the topic groups); English: `ext/guias_en.data.js` |
| English text of the wiki | `ext/i18n_en.data.js` |
| Routes and recruitment | `ext/rutas.data.js` |
| Battles and battle maps | `ext/batallas.data.js`, `ext/batallas_mapas.data.js` |
| Supports and endings | `ext/apoyos.data.js`, `ext/apoyos_ventana.data.js` |
| Shops | `ext/tiendas.data.js` |
| Builds and optimisation tips | `ext/minmax.data.js` |
| Each lord's route systems and the gods' blessings | `ext/sistemas.data.js` |
| Lore, tutorials | `ext/lore.data.js`, `ext/tutoriales.data.js` |
| How a page is displayed | `pages/<page>.js`; styles in `style.css` |
| Images | `img/` (WebP or PNG, as light as possible) |

Data files are JSON inside one line of JavaScript (`window.WIKI = {…};`). Mind commas and quotes: `scripts/check.mjs` tells you if something breaks.

### Guides

Each guide is an object with `id`, `titulo` (title), `resumen` (summary), `alias` (words the search finds it by), `tema` (topic), `secs` (sections as `[title, html]`), `preguntas` (questions), `relacionados` (related) and `enlaces` (links). Section bodies are plain HTML: `<p>`, `<ul>`, `<table>`, `<b>`, links `<a href="#/…">`.

## Translating (Spanish ⇄ English)

The wiki is written in Spanish and shown in English when the reader picks English (the ES/EN button in the header, or Settings). There are two kinds of text:

- **Game text** (names, descriptions, tips) uses the game's official English. Entities in `data.js` and `ext/*.data.js` carry an `en` or `<field>_en` value next to the Spanish one; loose game strings are in the `game` section of `ext/i18n_en.data.js`.
- **Wiki text** (labels, headings, notes, prose we wrote) is in the `ui` section of `ext/i18n_en.data.js`: the key is the exact Spanish text, the value is the English. Keep every `{slot}` of the key in the value.

**Guides** in English are in `ext/guias_en.data.js`, with the same `id` as the Spanish guide and the same fields translated. A guide with no English version is shown in Spanish under a short note. Keep the community mark (`gu-com`) where the Spanish has it.

In page code, wiki text goes through `t('Texto en español')` (with slots: `t('Hay {n} misiones', { n })`), and game names through `nm(entity)` or `tx(entity, 'desc')` from `js/core.js`. Never build a sentence by gluing translated pieces together.

**Style:** concise US English, the official names of the English version of the game, and «route» for the wiki's *ruta*. Run `node scripts/check.mjs` and look at the page in both languages before opening the pull request.

## Content rules

- **The game wins.** If an outside guide says something different from what the game shows, the game is right.
- **Mark what you haven't seen in the game.** A fact only the community claims is marked like this, at the end of the sentence:
  `<span class="gu-com" title="Community fact"></span>`
- **No citations or source links in the text.** Explain the fact; if needed, say where it comes from in the pull request.
- **Clear, short text**, using the official names of the game's English and Spanish versions (the glossary is on the Systems page).
- **The wiki covers the whole game:** all four routes (Cai, Dietrich, Theodora and Leda), all three parts and every chapter. Write for any player, not for one playthrough.
- **Say what each fact applies to.** If something only holds for one route, part or set of chapters, say so ("Leda's route, Part 1, from chapter 4"). Anything without a note is taken to apply everywhere.
- **No game script or dialogue.** The wiki documents the game; it does not reproduce its story scenes or conversations. Short summaries are fine.
- **Respect what is locked at each point.** Some regions, shops or recruits are unavailable on certain routes or parts; don't recommend something that can't be obtained at that moment.
- **Spoilers:** Parts 2 and 3 information goes in their own sections; don't reveal it on Part 1 pages.

## Review

The maintainer reviews every pull request, may ask for changes and merges it when ready. Once published, visitors' offline copy updates on its own.

By submitting a contribution you agree to publish it under the project's license, [CC BY-SA 4.0](LICENSE).
