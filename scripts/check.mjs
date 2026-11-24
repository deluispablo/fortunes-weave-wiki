// Checks a change before it is merged: every data file and script parses, the data keeps its shape and nothing points at a missing file.
// usage: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const ctx = { window: {} };
ctx.window.window = ctx.window;
vm.createContext(ctx);

const files = ['data.js', ...fs.readdirSync(path.join(ROOT, 'ext')).filter(f => f.endsWith('.data.js')).map(f => `ext/${f}`)];
for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { vm.runInContext(src.replace(/WIKI_EXT\[/g, 'window.WIKI_EXT['), ctx, { filename: f }); }
  catch (e) { errors.push(`${f}: cannot be parsed (${e.message}). Check commas, quotes and braces near your change.`); }
  if (f.startsWith('ext/') && /WIKI_EXT\[/.test(src)) {
    const name = path.basename(f, '.data.js');
    if (!ctx.window.WIKI_EXT || !(name in ctx.window.WIKI_EXT)) errors.push(`${f}: must define WIKI_EXT["${name}"].`);
  }
}
const W = ctx.window.WIKI || {};
for (const k of ['chars', 'items', 'classes', 'skills', 'map', 'guias']) if (!W[k]) errors.push(`data.js: section «${k}» is missing.`);
const ids = new Set();
for (const [i, g] of (W.guias || []).entries()) {
  const id = (g && g.id) || `#${i + 1}`;
  for (const k of ['id', 'titulo', 'resumen']) if (!g || !g[k]) errors.push(`guide ${id}: «${k}» is missing.`);
  if (ids.has(id)) errors.push(`guide ${id}: duplicate id.`);
  ids.add(id);
}

for (const d of ['js', 'pages']) for (const f of fs.readdirSync(path.join(ROOT, d)).filter(f => f.endsWith('.js'))) {
  try { new vm.Script(fs.readFileSync(path.join(ROOT, d, f), 'utf8'), { filename: `${d}/${f}` }); }
  catch (e) { errors.push(`${d}/${f}: syntax error (${e.message}).`); }
}

// every image path written in the data must exist
const seen = new Set();
const scan = o => {
  if (Array.isArray(o)) o.forEach(scan);
  else if (o && typeof o === 'object') Object.values(o).forEach(scan);
  else if (typeof o === 'string') for (const m of o.matchAll(/\bimg\/[\w./-]+\.(?:png|webp|jpg|svg)\b/g)) seen.add(m[0]);
};
scan(W); scan(ctx.window.WIKI_EXT);
for (const p of seen) if (!fs.existsSync(path.join(ROOT, p))) errors.push(`missing image: ${p}`);

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`All good: ${files.length} data files, ${(W.guias || []).length} guides, ${seen.size} images.`);
