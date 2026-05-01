import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

export function ensureDir(path) {
  mkdirSync(path, {recursive: true});
}

export function writeFileEnsured(path, content) {
  ensureDir(dirname(path));
  writeFileSync(path, content, 'utf8');
}

export function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

export function mdxEscapeText(s) {
  // Avoid MDX JSX parsing from raw PDF text like "<T>" or "<cmath>" or "<=":
  // convert angle brackets to HTML entities.
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('{', '\\{')
    .replaceAll('}', '\\}');
}

export function collapseWhitespace(s) {
  return String(s)
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function frontmatterTitle(title) {
  return ['---', `title: ${JSON.stringify(title)}`, '---', ''].join('\n');
}
