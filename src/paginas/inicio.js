// Página inicial. A sequência de secções segue o modelo de referência (us.cowboy.com):
// herói em vídeo, vitrine de modelo, segundo herói, vitrine, faixa de factos, título que se
// preenche + pirâmide de vídeos, lista de tecnologia fixa, mosaico da comunidade, cartão
// test ride, quatro diapositivos fixos e atalhos finais.
import { CONTACTO, MARCA, REDES } from '../dados/site.js';
import { cartaoTestRide, continuaAExplorar, documento } from './layout.js';
import { ICONE, esc, img, modelo, urlModelo } from './util.js';

const heroi = ({ id, video, poster, titulo, texto, cta, extra = '', usp = '', primeiro = false }) => `
    <section class="heroi${primeiro ? ' heroi--primeiro' : ''}" id="${id}" aria-labelledby="${id}-titulo" data-heroi>
      <video class="heroi__video" muted playsinline loop preload="${primeiro ? 'auto' : 'none'}" poster="${poster}" data-video${primeiro ? ' autoplay' : ''} aria-hidden="true">
        <source src="${video}" type="video/mp4">
      </video>
      <div class="heroi__conteudo"${primeiro ? '' : ' data-revelar-grupo data-inicio="top 50%"'}>
        <h${primeiro ? 1 : 2} id="${id}-titulo" class="heroi__titulo">${titulo}</h${primeiro ? 1 : 2}>
        <p class="heroi__texto">${texto}</p>
        <div class="heroi__acoes">${cta}${extra}</div>
      </div>
      ${usp}
    </section>`;

const usp = `
      <ul class="usp">
        <li>${ICONE.escudo}<span><strong>Representante oficial</strong>CFMOTO em Angola</span></li>
        <li>${ICONE.loja}<span><strong>Showroom no Talatona Shopping</strong>${esc(CONTACTO.piso)}, ${esc(CONTACTO.horario[0].dias.toLowerCase())}</span></li>
        <li>${ICONE.calendario}<span><strong>Test ride</strong>Experimenta antes de decidir</span></li>
      </ul>`;

// Vitrine: nome, características, alternador e recortes que trocam de cor
const vitrine = ({ id, rotulo, slugs, fundo = 'claro' }) => {
  const ms = slugs.map(modelo);
  return `
    <section class="vitrine vitrine--${fundo}" id="${id}" aria-label="${esc(rotulo)}" data-vitrine>
      ${ms.map((m, i) => `
      <article class="vitrine__slide${i ? '' : ' ativo'}" data-vitrine-slide aria-hidden="${!!i}">
        <div class="vitrine__info">
          <h2 class="vitrine__nome">${esc(m.nome)}</h2>
          <ul class="chips">
            ${m.destaques.filter((d) => d.length < 42).slice(0, 6).map((d) => `<li>+ ${esc(d)}</li>`).join('\n            ')}
          </ul>
        </div>
        <a class="vitrine__palco" href="${urlModelo(m)}" aria-label="Explorar ${esc(m.nome)}" data-cursor-palco tabindex="${i ? -1 : 0}">
          ${(m.cores.length ? m.cores : [{ img: m.recorte, nome: '' }]).map((c, j) => img({ src: c.img, alt: j ? '' : `${m.nome}${c.nome ? `, cor ${c.nome.toLowerCase()}` : ''}`, classe: `vitrine__img${j ? '' : ' ativa'}`, largura: 1000, altura: 750, lazy: true })).join('\n          ')}
        </a>
      </article>`).join('')}
      <div class="alternador vitrine__alternador" role="tablist" aria-label="Escolher modelo">
        ${ms.map((m, i) => `<button type="button" role="tab" aria-selected="${!i}" data-vitrine-tab="${i}">${esc(m.nome)}</button>`).join('')}
      </div>
      <div class="setas vitrine__setas">
        <button type="button" class="seta" aria-label="Modelo anterior" data-vitrine-ant>${ICONE.esq}</button>
        <button type="button" class="seta" aria-label="Modelo seguinte" data-vitrine-seg>${ICONE.dir}</button>
      </div>
      <span class="cursor-pilula" data-cursor aria-hidden="true">Explorar</span>
    </section>`;
};

// Faixa de factos da marca (equivalente às citações de imprensa)
const FACTOS = [
  ['1989', 'Fundada por Lai Guogui, então com 24 anos, numa pequena oficina de peças para motociclos.'],
  [`${MARCA.paises}+ países`, 'Presença em mais de 100 países e regiões em todo o mundo.'],
  [MARCA.pontosVenda, 'Pontos de venda CFMOTO em todo o mundo.'],
  ['N.º 1', 'Maior exportadora de ATV da China, todos os anos desde 2014.'],
  ['Moto3 2024', 'Campeã do mundo com David Alonso e a CFMOTO Aspar Team.'],
  ['Kiska', 'O estúdio austríaco que desenha com a CFMOTO desde 2014.'],
  ['Red Dot', 'Prémio de design ganho pela 800NK em 2024.'],
  ['1.000.000', 'Em 2024 saiu da fábrica o milionésimo veículo todo-o-terreno CFMOTO.'],
  ['2.119', 'Patentes válidas no final de 2025.'],
];

const faixa = `
    <section class="faixa" aria-label="A CFMOTO em números">
      <div class="faixa__trilho" data-marquee>
        <ul class="faixa__lista">
          ${FACTOS.map(([t, d]) => `<li class="faixa__cartao"><strong>${esc(t)}</strong><span>${esc(d)}</span></li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;

// Título que se preenche letra a letra + pirâmide de vídeos + texto sobre o vídeo
const marca = `
    <section class="marca" aria-labelledby="marca-titulo">
      <h2 class="titulo-1 marca__titulo" data-preencher>Há mais de 35 anos a construir máquinas para todos os terrenos.</h2>
      <div class="piramide" data-piramide>
        <div class="piramide__palco" data-piramide-palco>
          <video muted playsinline loop preload="none" poster="/media/video/inner-pages-header.jpg" data-video aria-hidden="true"><source src="/media/video/inner-pages-header.mp4" type="video/mp4"></video>
        </div>
        <div class="piramide__espaco" aria-hidden="true"></div>
        <div class="marca__texto" data-revelar-grupo>
          <p class="rotulo">Experience More Together</p>
          <h3 id="marca-titulo" class="titulo-1">Engenharia própria, componentes de referência.</h3>
          <ul class="marca__pontos">
            <li><span class="marca__icone">${ICONE.motor}</span><span><strong>Motores próprios</strong>Do bicilíndrico de 449 cc ao três cilindros de 675 cc e ao novo V4.</span></li>
            <li><span class="marca__icone">${ICONE.chip}</span><span><strong>Tecnologia de série</strong>Ecrã TFT, ABS Bosch, modos de condução ou direção assistida, conforme o modelo.</span></li>
            <li><span class="marca__icone">${ICONE.lapis}</span><span><strong>Design europeu</strong>Linhas desenhadas com a Kiska, na Áustria, e no Modena40, o centro de design da marca em Itália.</span></li>
          </ul>
          <p class="lead">Suspensões KYB, travões J.Juan e Brembo, eletrónica Bosch: cada CFMOTO junta engenharia própria a parceiros de topo, para andares mais e preocupares-te menos.</p>
          <a class="pilula" href="/sobre/">Conhecer a marca</a>
        </div>
      </div>
    </section>`;

// Lista de tecnologia fixa (secção escura com dois cartões)
const TECNOLOGIA = [
  ['Ecrã TFT a cores', '800nk', 2, '800NK · TFT de 8 polegadas'],
  ['Radar traseiro', '800mt-es', 2, '800MT ES'],
  ['Suspensão inteligente', '800mt-es', 1, '800MT ES'],
  ['Controlo de estabilidade', '800mt-es', 3, 'Bosch MSC'],
  ['Sistema keyless', '800nk', 3, '800NK'],
  ['Motor de três cilindros', '675nk', 1, '675NK · 90 cv'],
  ['Travões Brembo', '450sr', 2, '450SR'],
  ['Embraiagem deslizante', '250nk', 1, 'CF-SC'],
  ['Painel multimédia', 'u10-pro', 2, 'U10 PRO · ecrã de 8 polegadas'],
  ['Guincho e reboque', 'uforce-600', 2, 'UFORCE 600 · guincho, bola de reboque e EPS'],
  ['Tração 4x4 com bloqueio', 'uforce-600', 3, 'UFORCE 600'],
  ['Transmissão CVT', 'c5-touring', 3, 'CFORCE C5 Touring'],
  ['Bancos impermeáveis', 'zforce-950-sport', 2, 'ZFORCE 950 Sport'],
  ['Caixa basculante', 'uforce-600', 1, 'UFORCE 600 · caixa de carga'],
];

const tecnologia = `
    <section class="tech" aria-labelledby="tech-titulo" data-tech style="--itens:${TECNOLOGIA.length}">
      <div class="tech__fixo">
        <div class="tech__cartao tech__cartao--lista">
          <h2 id="tech-titulo" class="tech__titulo">Tecnologia que se sente.</h2>
          <ol class="tech__lista" data-tech-lista>
            ${TECNOLOGIA.map(([t], i) => `<li${i ? '' : ' class="ativo"'}>${esc(t)}</li>`).join('\n            ')}
          </ol>
          <p class="tech__rodape">Da cidade ao campo.</p>
        </div>
        <div class="tech__cartao tech__cartao--imagem">
          ${TECNOLOGIA.map(([t, slug, n, legenda], i) => {
            const m = modelo(slug);
            return `<figure class="tech__figura${i ? '' : ' ativa'}">${img({ src: m.recursos[n - 1].img, alt: `${t}, ${m.nome}`, largura: 1600, altura: 900 })}<figcaption class="legenda">${esc(legenda)}</figcaption></figure>`;
          }).join('\n          ')}
        </div>
      </div>
    </section>`;

// Mosaico da comunidade com fotografias do Instagram do cliente
const FOTOS = [
  'showroom-zforce-vermelho', 'zforce-por-do-sol', 'showroom-talatona', 'cliente-dual', 'zforce-poeira', 'showroom-bobber', 'capacete',
  'showroom-zforce-laranja', 'zforce-piloto', 'loja-entrada', 'showroom-zforce-preto', 'atv-rio', 'zforce-pneu', 'showroom-equipa',
  'zforce-bancos', 'showroom-zforce-4', 'zforce-traseira', 'showroom-zforce-laranja-34', 'zforce-laranja-detalhe', 'showroom-zforce-preto-frente',
  '/img/modelos/450mt/galeria-1.webp',
];
// Nome simples = fotografia do cliente em /img/angola/; caminho completo = outra imagem do site
const fotoMosaico = (f) => (f.startsWith('/') ? f : `/img/angola/${f}.webp`);

const comunidade = () => {
  const instagram = REDES.find((r) => r.nome === 'Instagram');
  const colunas = Array.from({ length: 7 }, (_, c) => FOTOS.filter((_, i) => i % 7 === c));
  return `
    <section class="comunidade" aria-labelledby="comunidade-titulo">
      <div class="comunidade__cabeca" data-revelar-grupo>
        <h2 id="comunidade-titulo" class="titulo-1">Nunca andas sozinho.</h2>
        <p class="lead">Do showroom no Talatona Shopping para as estradas e picadas de Angola. Junta-te à comunidade CFMOTO Angola.</p>
      </div>
      <div class="mosaico" data-mosaico>
        ${colunas.map((fotos, c) => `<div class="mosaico__coluna" data-onda="${[0, 8, 16, 24, 16, 8, 0][c]}">
          ${fotos.map((f) => `<figure>${img({ src: fotoMosaico(f), alt: '', largura: 600, altura: 900 })}</figure>`).join('')}
        </div>`).join('\n        ')}
      </div>
      <div class="comunidade__cta" data-revelar>
        <a class="pilula pilula--escura" href="${instagram.url}" target="_blank" rel="noopener">${ICONE.instagram}<span>Seguir ${esc(instagram.utilizador)}</span></a>
      </div>
    </section>`;
};

// Quatro diapositivos fixos com barras de progresso
const GARANTIAS = [
  { rotulo: 'Origem', titulo: 'Desde 1989.', texto: 'Nascida numa pequena oficina de peças, a CFMOTO está hoje em mais de 100 países e é, desde 2014, a maior exportadora de ATV da China.', imagem: '/media/banners/home-brand-video-thumb.webp' },
  { rotulo: 'Qualidade', titulo: 'Construídas para durar.', texto: 'Motores próprios, quadros testados nos terrenos mais duros e componentes Bosch, KYB, J.Juan e Brembo.', imagem: '/media/banners/banner-motociclos-800mt.webp' },
  { rotulo: 'Showroom', titulo: 'Vem ver ao vivo.', texto: `Estamos no ${CONTACTO.loja}, ${CONTACTO.piso}, ${CONTACTO.horario[0].dias.toLowerCase()} das 10h às 22h. Vê os modelos de perto e fala com a nossa equipa.`, imagem: '/img/angola/showroom-talatona.webp' },
  { rotulo: 'Todos os terrenos', titulo: 'Lazer ou trabalho.', texto: 'Motociclos, ATV, UTV e SSV: uma gama completa para a cidade, a fazenda, a obra e o fora de estrada.', imagem: '/media/banners/banner-atv-cforce-1000-overland.webp' },
];

const garantias = `
    <section class="diapositivos" aria-label="Porquê CFMOTO" data-diapositivos style="--n:${GARANTIAS.length}">
      <div class="diapositivos__fixo">
        ${GARANTIAS.map((g, i) => `
        <div class="diapositivo${i ? '' : ' ativo'}" data-diapositivo>
          ${img({ src: g.imagem, alt: '', classe: 'diapositivo__fundo', largura: 2200, altura: 1400 })}
          <div class="diapositivo__texto">
            <h2 class="titulo-1">${esc(g.titulo)}</h2>
            <p>${esc(g.texto)}</p>
          </div>
        </div>`).join('')}
        <ol class="diapositivos__abas">
          ${GARANTIAS.map((g, i) => `<li><button type="button" data-diapositivo-aba="${i}"><span class="diapositivos__barra"><span></span></span>${String(i + 1).padStart(2, '0')}. ${esc(g.rotulo)}</button></li>`).join('\n          ')}
        </ol>
      </div>
    </section>`;

export const paginaInicio = () => ({
  caminho: '',
  html: documento({
    pagina: 'inicio',
    descricao: 'Representante oficial CFMOTO em Angola. Motociclos, ATV, UTV e SSV no Talatona Shopping, Luanda. Agenda o teu test ride ou fala connosco no WhatsApp.',
    imagem: '/media/video/home-hero-motociclos.jpg',
    corpo: [
      heroi({
        id: 'inicio', primeiro: true,
        video: '/media/video/home-hero-motociclos.mp4', poster: '/media/video/home-hero-motociclos.jpg',
        titulo: 'Define o teu<br>caminho.',
        texto: 'A CFMOTO oficial em Angola. Motociclos, ATV, UTV e SSV no Talatona Shopping.',
        cta: '<a class="pilula" href="/motociclos/">Descobrir motociclos</a>',
        usp,
      }),
      vitrine({ id: 'aventura', rotulo: 'Motociclos de aventura em destaque', slugs: ['800mt-x', '450mt', '1000mt-x'] }),
      heroi({
        id: 'quatro-rodas',
        video: '/media/video/home-hero-4rodas.mp4', poster: '/media/video/home-hero-4rodas.jpg',
        titulo: 'Lazer ou<br>trabalho.',
        texto: 'ATV, UTV e SSV para a fazenda, a obra e as picadas.',
        cta: '<a class="pilula" href="/ssv/">Descobrir SSV</a>',
        extra: '<a class="link-claro" href="/atv/">ATV</a><a class="link-claro" href="/utv/">UTV</a>',
      }),
      vitrine({ id: 'zforce', rotulo: 'SSV ZFORCE em destaque', slugs: ['zforce-950-sport', 'zforce-950-sport-4'] }),
      faixa,
      marca,
      tecnologia,
      comunidade(),
      cartaoTestRide(),
      garantias,
      continuaAExplorar(),
    ].join('\n'),
  }),
});
