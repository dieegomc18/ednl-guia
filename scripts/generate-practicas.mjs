import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

import {
  collapseWhitespace,
  frontmatterTitle,
  mdxEscapeText,
  slugify,
  writeFileEnsured,
} from './pdf-docs/common.mjs';

const projectRoot = process.cwd();
const pdfPath = join(projectRoot, 'static', 'ednl', 'PracticasEDNL.pdf');
const outDir = join(projectRoot, 'docs', 'practicas');
const genDir = join(outDir, 'generado');

async function outlineToFlat(pdf) {
  const outline = await pdf.getOutline();
  if (!outline) return [];

  async function resolvePageIndex(dest) {
    const d = typeof dest === 'string' ? await pdf.getDestination(dest) : dest;
    if (!d) return null;
    const [ref] = d;
    if (!ref) return null;
    return await pdf.getPageIndex(ref);
  }

  const out = [];
  async function walk(items, depth) {
    for (const it of items) {
      out.push({
        title: it.title || '',
        depth,
        pageIndex: await resolvePageIndex(it.dest),
      });
      if (it.items?.length) await walk(it.items, depth + 1);
    }
  }
  await walk(outline, 0);
  return out.filter(x => x.title && typeof x.pageIndex === 'number');
}

function pickSections(flat) {
  const kept = flat.filter(x => x.depth === 1);
  kept.sort((a, b) => a.pageIndex - b.pageIndex);

  const dedup = [];
  for (const s of kept) {
    const prev = dedup[dedup.length - 1];
    if (prev && prev.pageIndex === s.pageIndex) continue;
    dedup.push(s);
  }
  return dedup;
}

async function extractPagesText(pdf, startPageIndex, endPageIndex) {
  const parts = [];
  for (let i = startPageIndex; i <= endPageIndex; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    parts.push(content.items.map(it => it.str).join(' '));
  }
  return collapseWhitespace(parts.join('\n\n'));
}

async function main() {
  const data = new Uint8Array(readFileSync(pdfPath));
  const pdf = await pdfjsLib.getDocument({data}).promise;

  const flat = await outlineToFlat(pdf);
  const sections = pickSections(flat);
  if (sections.length === 0) throw new Error('No outline sections found for PracticasEDNL.pdf');

  const ranges = sections.map((s, idx) => {
    const next = sections[idx + 1];
    const end = next ? next.pageIndex - 1 : pdf.numPages - 1;
    return {...s, endPageIndex: Math.max(s.pageIndex, end)};
  });

  const links = [];
  for (const r of ranges) {
    const slug = slugify(r.title);
    const outPath = join(genDir, `${slug}.mdx`);
    const raw = await extractPagesText(pdf, r.pageIndex, r.endPageIndex);
    const body = mdxEscapeText(raw);

    const doc =
      frontmatterTitle(r.title) +
      "import useBaseUrl from '@docusaurus/useBaseUrl';\n\n" +
      `> Fuente: <a href={useBaseUrl('/ednl/PracticasEDNL.pdf')} data-noBrokenLinkCheck>PracticasEDNL.pdf</a>\n\n` +
      body +
      '\n';

    writeFileEnsured(outPath, doc);
    links.push({title: r.title, slug});
  }

  const index =
    frontmatterTitle('Prácticas (completas)') +
    "import useBaseUrl from '@docusaurus/useBaseUrl';\n\n" +
    `> Texto generado desde el PDF para que puedas buscar y navegar.\n` +
    `> PDF original: <a href={useBaseUrl('/ednl/PracticasEDNL.pdf')} data-noBrokenLinkCheck>PracticasEDNL.pdf</a>\n\n` +
    `## Índice\n\n` +
    links.map(l => `- [${l.title}](/practicas/generado/${l.slug})`).join('\n') +
    '\n';

  writeFileEnsured(join(outDir, 'index.mdx'), index);
  console.log(`OK: wrote prácticas docs into ${outDir}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
