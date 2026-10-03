// Efeitos usados em todas as páginas: revelações ao entrar no ecrã, texto que se preenche
// letra a letra, vídeos que só tocam quando visíveis e saltos suaves para âncoras.
import { $, $$, gsap, lenis, reduzido } from '../lib/movimento.js';

export function iniciarRevelacoes() {
  if (reduzido) return;
  $$('[data-revelar]').forEach((el) => {
    const grande = el.dataset.revelar === 'grande';
    gsap.fromTo(el, { autoAlpha: 0, y: grande ? 128 : 14 }, {
      autoAlpha: 1, y: 0, duration: grande ? 1.15 : 0.9, ease: 'cfmoto',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
  $$('[data-revelar-grupo]').forEach((grupo) => {
    gsap.fromTo(grupo.children, { autoAlpha: 0, y: 14 }, {
      autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.2, ease: 'cfmoto',
      scrollTrigger: { trigger: grupo, start: grupo.dataset.inicio || 'top 88%', once: true },
    });
  });
}

// Divide o texto em letras (agrupadas por palavra) e acende-as com o scroll.
// Os leitores de ecrã leem a cópia escondida, não as letras soltas.
export function iniciarPreenchimento() {
  $$('[data-preencher]').forEach((el) => {
    const texto = el.textContent.trim().replace(/\s+/g, ' ');
    const leitor = Object.assign(document.createElement('span'), { className: 'sr', textContent: texto });
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    texto.split(' ').forEach((palavra, i) => {
      if (i) visual.append(' ');
      const p = Object.assign(document.createElement('span'), { className: 'palavra' });
      for (const letra of palavra) p.append(Object.assign(document.createElement('span'), { className: 'letra', textContent: letra }));
      visual.append(p);
    });
    el.replaceChildren(leitor, visual);
    if (reduzido) return;
    gsap.to($$('.letra', visual), {
      opacity: 1, duration: 0.3, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: true },
    });
  });
}

// Vídeos: tocam quando visíveis, param e voltam ao início quando saem
export function iniciarVideos() {
  const videos = $$('video[data-video]');
  if (reduzido) {
    videos.forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });
    return;
  }
  const io = new IntersectionObserver((entradas) => entradas.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) v.play().catch(() => {});
    else { v.pause(); if (!v.hasAttribute('autoplay')) v.currentTime = 0; }
  }), { threshold: 0.1 });
  videos.forEach((v) => io.observe(v));
}

export function iniciarAncoras() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const alvo = $(a.getAttribute('href'));
    if (!alvo) return;
    e.preventDefault();
    lenis.scrollTo(alvo, { offset: alvo.id === 'conteudo' ? 0 : -56, duration: reduzido ? 0 : 1.2 });
    if (alvo.id === 'conteudo') {
      alvo.setAttribute('tabindex', '-1');
      alvo.focus({ preventScroll: true });
    }
  });
}
