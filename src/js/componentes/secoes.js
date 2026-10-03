// Secções da página inicial (e reaproveitadas noutras páginas).
import { $, $$, ScrollTrigger, gsap, lenis, limitar, ponteiroFino, reduzido } from '../lib/movimento.js';

// Pílula "Explorar" que segue o cursor
function cursorSeguidor(area, cursor, alvos) {
  if (!cursor || !ponteiroFino) return;
  const xPara = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
  const yPara = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });
  area.addEventListener('pointermove', (e) => {
    const r = area.getBoundingClientRect();
    xPara(e.clientX - r.left - cursor.offsetWidth / 2);
    yPara(e.clientY - r.top - cursor.offsetHeight / 2);
  });
  alvos.forEach((a) => {
    a.addEventListener('pointerenter', () => cursor.classList.add('visivel'));
    a.addEventListener('pointerleave', () => cursor.classList.remove('visivel'));
  });
}

// ---------- Vitrine: troca de cor a cada 5 s; depois da última cor, passa ao modelo seguinte ----------
export function iniciarVitrines() {
  $$('[data-vitrine]').forEach((sec) => {
    const slides = $$('[data-vitrine-slide]', sec);
    const abas = $$('[data-vitrine-tab]', sec);
    let atual = 0;
    let cor = 0;
    let visivel = false;
    let relogio;

    const reiniciar = () => {
      clearInterval(relogio);
      if (visivel && !reduzido) relogio = setInterval(avancar, 5000);
    };
    const mostrar = (i) => {
      atual = (i + slides.length) % slides.length;
      cor = 0;
      slides.forEach((s, k) => {
        const ativo = k === atual;
        s.classList.toggle('ativo', ativo);
        s.setAttribute('aria-hidden', String(!ativo));
        $('[data-cursor-palco]', s).tabIndex = ativo ? 0 : -1;
        $$('.vitrine__img', s).forEach((im, j) => im.classList.toggle('ativa', j === 0));
      });
      abas.forEach((a, k) => a.setAttribute('aria-selected', String(k === atual)));
      reiniciar();
    };
    const avancar = () => {
      const imagens = $$('.vitrine__img', slides[atual]);
      if (cor < imagens.length - 1) {
        imagens[cor].classList.remove('ativa');
        imagens[++cor].classList.add('ativa');
      } else mostrar(atual + 1);
    };

    abas.forEach((a, k) => a.addEventListener('click', () => mostrar(k)));
    $('[data-vitrine-ant]', sec)?.addEventListener('click', () => mostrar(atual - 1));
    $('[data-vitrine-seg]', sec)?.addEventListener('click', () => mostrar(atual + 1));
    new IntersectionObserver(([e]) => { visivel = e.intersectionRatio >= 0.5; reiniciar(); }, { threshold: [0, 0.5] }).observe(sec);
    cursorSeguidor(sec, $('[data-cursor]', sec), $$('[data-cursor-palco]', sec));
  });
}

// ---------- Faixa de factos: desliza sozinha, pausa ao passar o rato ----------
export function iniciarFaixas() {
  if (reduzido) return;
  $$('[data-marquee]').forEach((trilho) => {
    const lista = trilho.firstElementChild;
    const originais = [...lista.children];
    for (let k = 0; k < 3; k++) {
      originais.forEach((li) => {
        const copia = li.cloneNode(true);
        copia.setAttribute('aria-hidden', 'true');
        lista.append(copia);
      });
    }
    let x = 0;
    let largura = 0;
    let pausado = false;
    let visivel = false;
    const medir = () => { largura = lista.children[originais.length].offsetLeft - lista.children[0].offsetLeft; };
    medir();
    addEventListener('resize', medir);
    trilho.addEventListener('pointerenter', () => { pausado = true; });
    trilho.addEventListener('pointerleave', () => { pausado = false; });
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; }).observe(trilho);
    gsap.ticker.add((_, dt) => {
      if (pausado || !visivel || !largura) return;
      x -= 0.5 * (dt / 16.67);
      if (-x >= largura) x += largura;
      lista.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    });
  });
}

// ---------- Pirâmide: degraus que se abrem até o vídeo ocupar o ecrã ----------
const DEGRAUS_INICIO = [[38, 30], [46, 50], [54, 70], [62, 90]]; // [topo %, largura %]
const DEGRAUS_FIM = [[0, 45], [0, 65], [0, 85], [0, 100]];

function formaPiramide(p) {
  const d = DEGRAUS_INICIO.map(([t, w], i) => [t + (DEGRAUS_FIM[i][0] - t) * p, w + (DEGRAUS_FIM[i][1] - w) * p]);
  const esq = d.map(([, w]) => (100 - w) / 2);
  const dir = d.map(([, w]) => (100 + w) / 2);
  const t = d.map(([y]) => y);
  const pontos = [
    [esq[3], 100], [esq[3], t[3]], [esq[2], t[3]], [esq[2], t[2]], [esq[1], t[2]], [esq[1], t[1]], [esq[0], t[1]], [esq[0], t[0]],
    [dir[0], t[0]], [dir[0], t[1]], [dir[1], t[1]], [dir[1], t[2]], [dir[2], t[2]], [dir[2], t[3]], [dir[3], t[3]], [dir[3], 100],
  ];
  return `polygon(${pontos.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(', ')})`;
}

export function iniciarPiramide() {
  const sec = $('[data-piramide]');
  if (!sec) return;
  const palco = $('[data-piramide-palco]', sec);
  const texto = $('.marca__texto', sec);
  if (reduzido) { palco.style.clipPath = formaPiramide(1); palco.style.setProperty('--escurecer', 1); return; }
  ScrollTrigger.create({
    trigger: sec, start: 'top bottom', end: () => `top ${-0.6 * innerHeight}`,
    onUpdate: (s) => { palco.style.clipPath = formaPiramide(s.progress); },
  });
  ScrollTrigger.create({
    trigger: texto, start: 'top bottom', end: 'top 45%',
    onUpdate: (s) => palco.style.setProperty('--escurecer', s.progress.toFixed(3)),
  });
}

// ---------- Tecnologia: lista fixa em que o scroll escolhe o item ativo ----------
export function iniciarTech() {
  const sec = $('[data-tech]');
  if (!sec) return;
  const lista = $('[data-tech-lista]', sec);
  const itens = $$('li', lista);
  const figuras = $$('.tech__figura', sec);
  let atual = -1;
  const ativar = (i) => {
    if (i === atual) return;
    atual = i;
    itens.forEach((li, k) => li.classList.toggle('ativo', k === i));
    figuras.forEach((f, k) => f.classList.toggle('ativa', k === i));
    const alvo = itens[i];
    const y = lista.clientHeight * 0.42 - alvo.offsetTop - alvo.offsetHeight / 2;
    gsap.to(itens, { y, duration: reduzido ? 0 : 0.5, ease: 'power3.out', overwrite: true });
  };
  ScrollTrigger.create({
    trigger: sec, start: 'top top', end: 'bottom bottom',
    onUpdate: (s) => ativar(Math.min(itens.length - 1, Math.floor(s.progress * itens.length))),
    onRefresh: () => { const i = atual; atual = -1; ativar(Math.max(0, i)); },
  });
  ativar(0);
}

// ---------- Mosaico: colunas em onda com o scroll ----------
export function iniciarMosaico() {
  if (reduzido) return;
  $$('[data-onda]').forEach((col) => {
    const onda = Number(col.dataset.onda);
    gsap.fromTo(col, { y: () => (onda * innerHeight) / 100 }, {
      y: () => (-onda * innerHeight) / 200, ease: 'none',
      scrollTrigger: { trigger: col.parentElement, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    });
  });
}

// ---------- Flipbook: troca de modelo a cada 0,6 s enquanto visível ----------
export function iniciarFlipbooks() {
  if (reduzido) return;
  $$('[data-flipbook]').forEach((fb) => {
    const imagens = $$('img', fb);
    if (imagens.length < 2) return;
    let i = 0;
    let relogio;
    const virar = () => {
      // salta imagens que ainda não carregaram
      for (let k = 1; k <= imagens.length; k++) {
        const j = (i + k) % imagens.length;
        if (imagens[j].complete && imagens[j].naturalWidth) {
          imagens[i].classList.remove('ativa');
          imagens[j].classList.add('ativa');
          i = j;
          return;
        }
      }
    };
    new IntersectionObserver(([e]) => {
      clearInterval(relogio);
      if (e.isIntersecting) {
        imagens.forEach((im) => { im.loading = 'eager'; });
        relogio = setInterval(virar, 600);
      }
    }).observe(fb);
  });
}

// ---------- Diapositivos fixos com barras de progresso ----------
export function iniciarDiapositivos() {
  const sec = $('[data-diapositivos]');
  if (!sec) return;
  const slides = $$('[data-diapositivo]', sec);
  const abas = $$('[data-diapositivo-aba]', sec);
  const barras = abas.map((a) => $('.diapositivos__barra', a));
  const n = slides.length;
  let atual = -1;
  const st = ScrollTrigger.create({
    trigger: sec, start: 'top top', end: 'bottom bottom',
    onUpdate: (s) => {
      const p = s.progress * n;
      const i = Math.min(n - 1, Math.floor(p));
      barras.forEach((b, k) => b.style.setProperty('--p', limitar(p - k).toFixed(3)));
      if (i === atual) return;
      atual = i;
      slides.forEach((d, k) => d.classList.toggle('ativo', k === i));
      abas.forEach((a, k) => a.parentElement.classList.toggle('ativa', k === i));
    },
  });
  abas.forEach((a, k) => a.addEventListener('click', () => {
    lenis.scrollTo(st.start + ((st.end - st.start) * (k + 0.05)) / n, { duration: reduzido ? 0 : 1 });
  }));
}
