import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const src = join(process.cwd(), 'static', 'ednl', 'Guia-Estudio-EDNL.md');
const dst = join(process.cwd(), 'docs', 'guia-completa.md');

const body = readFileSync(src, 'utf8');
const header = [
  '---',
  'title: Guía completa (modo profe)',
  '---',
  '',
  '> Esta versión está en Markdown para que sea buscable dentro del sitio.',
  '> La versión HTML estática original está en: /recursos',
  '',
].join('\n');

writeFileSync(dst, header + body, 'utf8');
console.log(`OK: wrote ${dst} from ${src}`);
