import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const root = process.cwd();
const buildDir = join(root, 'build');

// With `trailingSlash: false`, many routes output to `.html` files.
const mustExist = [
  join(buildDir, 'index.html'),
  join(buildDir, 'recursos.html'),
  join(buildDir, 'guia-completa.html'),
  join(buildDir, 'teoria.html'),
  join(buildDir, 'practicas.html'),
  join(buildDir, 'labs', 'heap.html'),
  join(buildDir, 'labs', 'dijkstra.html'),
  join(buildDir, 'ednl', 'TeoriaEDNL.pdf'),
  join(buildDir, 'ednl', 'PracticasEDNL.pdf'),
  join(buildDir, 'ednl', 'EjerciciosTipoExamen.pdf'),
  join(buildDir, 'ednl', 'Guia-Estudio-EDNL.html'),
];

for (const p of mustExist) {
  assert(existsSync(p), `Missing build artifact: ${p}`);
}

// baseUrl sanity check: HTML should contain the baseUrl prefix.
const home = readFileSync(join(buildDir, 'index.html'), 'utf8');
assert(home.includes('/ednl-guia/'), 'Expected index.html to contain "/ednl-guia/" (baseUrl sanity check)');

console.log('OK: smoke-build checks passed');
