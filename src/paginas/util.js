// Utilitários partilhados pelos modelos de página (correm em Node, no gerador).
import { readFileSync } from 'node:fs';

const ler = (rel) => readFileSync(new URL(rel, import.meta.url), 'utf8');

export const MODELOS = JSON.parse(ler('../dados/modelos.json'));
export const LOGO = ler('../assets/logo.svg').trim();
export const EMBLEMA = ler('../assets/emblema.svg').trim();

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const modelo = (slug) => MODELOS.find((m) => m.slug === slug);
export const modelosDe = (categoria, familia) => MODELOS
  .filter((m) => m.categoria === categoria && (!familia || m.familia === familia))
  .sort((a, b) => a.ordem - b.ordem);

export const urlModelo = (m) => `/modelos/${m.slug}/`;

// "799 cc · 95 cv"
export const resumo = (m) => m.numeros.slice(0, 2).map((n) => `${n.valor} ${n.unidade}`).join(' · ');

// Atributo HTML só quando há valor
export const attr = (nome, valor) => (valor == null || valor === false ? '' : ` ${nome}="${esc(valor)}"`);

// Imagem com dimensões para evitar saltos no layout
export const img = ({ src, alt = '', classe, largura, altura, lazy = true, extra = '' }) =>
  `<img src="${src}" alt="${esc(alt)}"${attr('class', classe)}${attr('width', largura)}${attr('height', altura)}${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}${extra}>`;

const traco = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${d}</svg>`;
const cheio = (d) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${d}</svg>`;

export const ICONE = {
  seta: traco('<path d="M7 17 17 7M8 7h9v9"/>'),
  setaDir: traco('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  esq: traco('<path d="m15 18-6-6 6-6"/>'),
  dir: traco('<path d="m9 18 6-6-6-6"/>'),
  baixo: traco('<path d="m6 9 6 6 6-6"/>'),
  mais: traco('<path d="M12 5v14M5 12h14"/>'),
  fechar: traco('<path d="M6 6l12 12M18 6 6 18"/>'),
  menu: traco('<path d="M4 9h16M4 15h16"/>'),
  pin: traco('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  relogio: traco('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  telefone: traco('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
  escudo: traco('<path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z"/><path d="m9 12 2 2 4-4"/>'),
  calendario: traco('<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  loja: traco('<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5V20h16V9.5M4 9.5h16"/><path d="M9.5 20v-5h5v5"/>'),
  motor: traco('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 5.6l2.1 2.1M17.7 16.3l2.1 2.1M2.5 12h3M18.5 12h3M4.2 18.4l2.1-2.1M17.7 7.7l2.1-2.1"/>'),
  chip: traco('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>'),
  lapis: traco('<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>'),
  terreno: traco('<path d="m3 19 6-9 4 5 3-4 5 8Z"/><circle cx="17" cy="6" r="2"/>'),
  whatsapp: cheio('<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41Z"/>'),
  instagram: traco('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
  facebook: cheio('<path d="M13.5 21v-7.6h2.6l.4-3H13.5V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21Z"/>'),
  tiktok: cheio('<path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.4-1.6Z"/>'),
};

// Bandeira de Angola (vermelho/preto com a meia roda dentada e a catana, simplificada)
export const BANDEIRA_AO = '<svg class="bandeira" viewBox="0 0 30 20" aria-hidden="true" focusable="false"><rect width="30" height="10" fill="#cc092f"/><rect y="10" width="30" height="10" fill="#000"/><path d="M15.6 6.2a4.6 4.6 0 1 1-4.9 7" fill="none" stroke="#ffcb00" stroke-width="1.3"/><path d="m11.8 12.6 4.6-3.3" stroke="#ffcb00" stroke-width="1.2"/><path d="m13 7.6.5 1 1.1.1-.8.7.3 1.1-1-.6-1 .6.3-1.1-.8-.7 1.1-.1Z" fill="#ffcb00"/></svg>';
