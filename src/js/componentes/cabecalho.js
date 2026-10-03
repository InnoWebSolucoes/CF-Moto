// Cabeçalho: transparente no topo, esconde ao descer, volta (sólido) ao subir ou parado.
// Mega menu por clique com véu desfocado; menu móvel em ecrã inteiro.
import { $, $$, bloquearRolagem, lenis } from '../lib/movimento.js';

const topo = $('[data-topo]');
const transparenteNoTopo = document.body.dataset.topoInicial === 'transparente';
const estado = { y: 0, escondido: false, forcado: false, mega: null, menu: false };
let parado;

const pintar = () => {
  const noTopo = estado.y < 10;
  topo.classList.toggle('transparente', transparenteNoTopo && noTopo && !estado.mega);
  topo.classList.toggle('escondido', !estado.mega && !estado.menu && (estado.forcado || estado.escondido));
};

// Usado pela subnavegação das páginas de modelo
export const controleTopo = {
  ocultar(v) { estado.forcado = v; pintar(); },
};

export function iniciarCabecalho() {
  if (!topo) return;

  lenis.on('scroll', ({ scroll, direction }) => {
    estado.y = scroll;
    if (direction === 1 && scroll > 120) estado.escondido = true;
    else if (direction === -1 || scroll < 10) estado.escondido = false;
    clearTimeout(parado);
    // Parado 10 s a meio da página: o cabeçalho volta
    parado = setTimeout(() => { estado.escondido = false; pintar(); }, 10000);
    pintar();
  });
  estado.y = window.scrollY;
  pintar();

  iniciarMega();
  iniciarMenuMovel();
}

function iniciarMega() {
  const botoes = $$('[data-mega]');
  const paineis = $$('[data-mega-painel]');
  const veu = $('[data-veu]');
  if (!botoes.length) return;

  const abrir = (id) => {
    const anterior = estado.mega;
    if (id === anterior) id = null;
    botoes.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.mega === id)));
    paineis.forEach((p) => {
      const aberto = p.dataset.megaPainel === id;
      p.classList.toggle('aberto', aberto);
      p.inert = !aberto;
    });
    veu.classList.toggle('ativo', !!id);
    if (!!id !== !!anterior) bloquearRolagem(!!id);
    estado.mega = id;
    pintar();
  };

  botoes.forEach((b) => b.addEventListener('click', () => abrir(b.dataset.mega)));
  veu.addEventListener('click', () => abrir(null));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !estado.mega) return;
    const botao = botoes.find((b) => b.dataset.mega === estado.mega);
    abrir(null);
    botao?.focus();
  });

  // Famílias dentro do painel de motociclos
  paineis.forEach((p) => {
    const abas = $$('[data-mega-familia]', p);
    abas.forEach((aba) => aba.addEventListener('click', () => {
      abas.forEach((a) => a.setAttribute('aria-selected', String(a === aba)));
      $$('[data-mega-grupo]', p).forEach((g) => { g.hidden = g.dataset.megaGrupo !== aba.dataset.megaFamilia; });
      $('.mega__trilho', p).scrollLeft = 0;
    }));
  });
}

function iniciarMenuMovel() {
  const menu = $('[data-menu-movel]');
  const abrirBotao = $('[data-menu-abrir]');
  const fecharBotao = $('[data-menu-fechar]');
  if (!menu || !abrirBotao) return;

  const definir = (v) => {
    if (v === estado.menu) return;
    estado.menu = v;
    menu.classList.toggle('aberto', v);
    menu.inert = !v;
    abrirBotao.setAttribute('aria-expanded', String(v));
    bloquearRolagem(v);
    (v ? fecharBotao : abrirBotao).focus();
    pintar();
  };

  abrirBotao.addEventListener('click', () => definir(true));
  fecharBotao.addEventListener('click', () => definir(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') definir(false); });
  matchMedia('(min-width: 1100px)').addEventListener('change', (e) => { if (e.matches) definir(false); });
}
