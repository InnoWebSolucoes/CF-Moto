// Página de gama: filtro por família (Adventure, Naked…), também por #hash no endereço.
import { $, $$, ScrollTrigger, gsap, reduzido } from '../lib/movimento.js';

export function iniciarFiltro() {
  const filtro = $('[data-filtro]');
  if (!filtro) return;
  const abas = $$('[data-filtro-familia]', filtro);
  const cartoes = $$('[data-grelha] > li');
  const descricoes = JSON.parse($('[data-familias]')?.textContent || '{}');
  const descricao = $('[data-filtro-descricao]');

  const aplicar = (familia, animar = true) => {
    abas.forEach((a) => a.setAttribute('aria-selected', String(a.dataset.filtroFamilia === familia)));
    cartoes.forEach((c) => { c.hidden = !!familia && c.dataset.familia !== familia; });
    descricao.textContent = familia ? descricoes[familia] || '' : '';
    history.replaceState(null, '', familia ? `#${familia.toLowerCase()}` : location.pathname + location.search);
    if (animar && !reduzido) {
      gsap.fromTo(cartoes.filter((c) => !c.hidden), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'cfmoto' });
    }
    ScrollTrigger.refresh();
  };

  abas.forEach((a) => a.addEventListener('click', () => aplicar(a.dataset.filtroFamilia)));
  const doEndereco = abas.find((a) => a.dataset.filtroFamilia && `#${a.dataset.filtroFamilia.toLowerCase()}` === location.hash.toLowerCase());
  if (doEndereco) aplicar(doEndereco.dataset.filtroFamilia, false);
}
