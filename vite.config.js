import { execFile, execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Publicado em innoweb.agency/cfmoto/ enquanto não houver domínio próprio.
// Para um domínio próprio: BASE=/ npm run build
const BASE = process.env.BASE || '/cfmoto/';
const RAIZ = import.meta.dirname;
const GERADOR = resolve(RAIZ, 'scripts/gerar-paginas.js');

// As páginas HTML são geradas a partir de src/paginas e src/dados (ver README).
// O gerador devolve os caminhos relativos que escreveu ("modelos/450mt/index.html").
const gerar = () => JSON.parse(execFileSync(process.execPath, [GERADOR], { encoding: 'utf8' }));

const paginas = {
  name: 'cfmoto-paginas',
  config() {
    const entradas = Object.fromEntries(gerar().map((f) => [f.replace(/\/?index\.html$/, '') || 'inicio', resolve(RAIZ, f)]));
    return { build: { rollupOptions: { input: entradas } } };
  },
  configureServer(server) {
    const vigiar = /[\\/]src[\\/](paginas|dados|assets)[\\/]/;
    let fila = null;
    server.watcher.on('change', (f) => {
      if (!vigiar.test(f)) return;
      clearTimeout(fila);
      fila = setTimeout(() => execFile(process.execPath, [GERADOR], (erro, saida, stderr) => {
        if (erro) { server.config.logger.error(stderr || String(erro)); return; }
        server.ws.send({ type: 'full-reload' });
      }), 60);
    });
  },
};

// Prefixa com BASE os caminhos "/..." que o Vite não reescreve sozinho no HTML
// (links, data-src dos vídeos, meta og:image, srcset).
const prefixarHtml = {
  name: 'cfmoto-prefixar-html',
  transformIndexHtml: {
    order: 'post',
    handler: (html) => html
      .replace(
        /\b(href|src|poster|content|data-src|data-poster|action)="\/(?!\/)([^"]*)"/g,
        (tudo, attr, resto) => (('/' + resto).startsWith(BASE) ? tudo : `${attr}="${BASE}${resto}"`),
      )
      .replace(/\bsrcset="([^"]*)"/g, (tudo, lista) => `srcset="${lista.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}`)}"`),
  },
};

export default defineConfig({
  base: BASE,
  appType: 'mpa',
  plugins: [paginas, prefixarHtml],
  build: {
    outDir: `dist${BASE}`.replace(/\/$/, ''),
    emptyOutDir: true,
  },
  server: { port: 5181, host: true },
});
