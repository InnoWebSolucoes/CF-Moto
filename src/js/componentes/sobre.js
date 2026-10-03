// A marca: números que contam ao entrar no ecrã e linha do tempo horizontal fixa.
import { $, $$, ScrollTrigger, gsap, reduzido } from '../lib/movimento.js';

const comPontos = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export function iniciarContadores() {
  $$('[data-contar]').forEach((el) => {
    const alvo = Number(el.dataset.contar);
    if (reduzido) return;
    const estado = { v: 0 };
    el.textContent = '0';
    gsap.to(estado, {
      v: alvo, duration: alvo > 5000 ? 2.2 : 1.6, ease: 'power3.out',
      onUpdate: () => { el.textContent = comPontos(estado.v); },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

// O trilho de marcos desliza na horizontal enquanto a secção fica fixa.
// Sem JavaScript (ou com movimento reduzido) é uma faixa com scroll horizontal normal.
export function iniciarLinhaTempo() {
  const sec = $('[data-linha-tempo]');
  if (!sec || reduzido) return;
  const janela = $('.linha-tempo__janela', sec);
  const trilho = $('[data-linha-trilho]', sec);
  const progresso = $('[data-linha-progresso]', sec);
  const distancia = () => Math.max(0, trilho.scrollWidth - janela.clientWidth);

  sec.classList.add('fixa');
  const medir = () => { sec.style.height = `${distancia() + innerHeight}px`; };
  medir();
  ScrollTrigger.addEventListener('refreshInit', medir);

  gsap.to(trilho, {
    x: () => -distancia(), ease: 'none',
    scrollTrigger: {
      trigger: sec, start: 'top top', end: () => `+=${distancia()}`, scrub: true, invalidateOnRefresh: true,
      onUpdate: (s) => progresso?.style.setProperty('--p', s.progress.toFixed(3)),
    },
  });
}
