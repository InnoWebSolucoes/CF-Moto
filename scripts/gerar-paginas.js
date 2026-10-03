// Gera os ficheiros HTML do site a partir de src/paginas (modelos de página) e src/dados.
// Corre sozinho no arranque do Vite (dev e build) e sempre que algo em src/paginas,
// src/dados ou src/assets muda. Os HTML gerados estão no .gitignore: não editar à mão.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { todasAsPaginas, PASTAS_GERADAS } from '../src/paginas/index.js';

const RAIZ = resolve(import.meta.dirname, '..');
const AVISO = '<!-- Gerado por scripts/gerar-paginas.js a partir de src/paginas. Não editar este ficheiro. -->\n';

for (const pasta of PASTAS_GERADAS) rmSync(resolve(RAIZ, pasta), { recursive: true, force: true });

const escritas = [];
for (const { caminho, html } of todasAsPaginas()) {
  const rel = (caminho ? `${caminho}/` : '') + 'index.html';
  const destino = resolve(RAIZ, rel);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html.replace(/^<!doctype html>\n?/i, (d) => d + AVISO));
  escritas.push(rel);
}

process.stdout.write(JSON.stringify(escritas));
