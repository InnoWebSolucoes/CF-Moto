// Página de modelo: subnavegação escura, cores, carrossel de destaques, diálogos e vídeo.
import { $, $$, ScrollTrigger, bloquearRolagem } from '../lib/movimento.js';
import { controleTopo } from './cabecalho.js';

export function iniciarSubnav() {
  const subnav = $('[data-subnav]');
  const heroi = $('[data-heroi]');
  if (!subnav || !heroi) return;
  ScrollTrigger.create({
    trigger: heroi, start: 'bottom 56px',
    onEnter: () => { subnav.classList.add('visivel'); controleTopo.ocultar(true); },
    onLeaveBack: () => { subnav.classList.remove('visivel'); controleTopo.ocultar(false); },
  });
  const links = $$('ul a', subnav);
  links.forEach((a) => {
    const secao = $(a.getAttribute('href'));
    if (!secao) return;
    ScrollTrigger.create({
      trigger: secao, start: 'top 50%', end: 'bottom 50%',
      onToggle: (s) => {
        if (!s.isActive) return;
        links.forEach((l) => { l.classList.toggle('atual', l === a); if (l === a) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
      },
    });
  });
}

export function iniciarCores() {
  $$('[data-cores]').forEach((palco) => {
    const botoes = $$('[data-cor]', palco);
    const imagens = $$('[data-cor-img]', palco);
    const nome = $('[data-cor-nome]', palco);
    const escolher = (i, focar = false) => {
      botoes.forEach((b, k) => { b.setAttribute('aria-checked', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      imagens.forEach((im, k) => im.classList.toggle('ativa', k === i));
      if (nome) nome.textContent = botoes[i].getAttribute('aria-label');
      if (focar) botoes[i].focus();
    };
    botoes.forEach((b, i) => {
      b.addEventListener('click', () => escolher(i));
      b.addEventListener('keydown', (e) => {
        const passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!passo) return;
        e.preventDefault();
        escolher((i + passo + botoes.length) % botoes.length, true);
      });
    });
    if (botoes.length) escolher(0);
  });
}

export function iniciarCarrosseis() {
  $$('[data-carrossel]').forEach((c) => {
    const trilho = $('[data-carrossel-trilho]', c);
    const ant = $('[data-carrossel-ant]', c);
    const seg = $('[data-carrossel-seg]', c);
    const passo = () => (trilho.firstElementChild?.offsetWidth || 400) + 20;
    const atualizar = () => {
      ant.disabled = trilho.scrollLeft <= 2;
      seg.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 2;
    };
    ant.addEventListener('click', () => trilho.scrollBy({ left: -passo(), behavior: 'smooth' }));
    seg.addEventListener('click', () => trilho.scrollBy({ left: passo(), behavior: 'smooth' }));
    trilho.addEventListener('scroll', atualizar, { passive: true });
    addEventListener('resize', atualizar);
    atualizar();
  });
}

export function iniciarDialogos() {
  $$('[data-dialogo]').forEach((botao) => {
    const dialogo = document.getElementById(botao.dataset.dialogo);
    if (!dialogo) return;
    botao.addEventListener('click', () => { dialogo.showModal(); bloquearRolagem(true); });
    dialogo.addEventListener('close', () => bloquearRolagem(false));
    $('[data-dialogo-fechar]', dialogo)?.addEventListener('click', () => dialogo.close());
    // Clique fora da caixa fecha
    dialogo.addEventListener('click', (e) => {
      const r = dialogo.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialogo.close();
    });
  });
}

// Vídeo do YouTube só carrega quando se carrega em "Ver vídeo"
export function iniciarYoutube() {
  $$('[data-youtube]').forEach((moldura) => {
    $('button', moldura)?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(moldura.dataset.youtube)}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = `Vídeo: ${moldura.dataset.youtubeTitulo}`;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      moldura.replaceChildren(iframe);
      iframe.focus();
    });
  });
}
