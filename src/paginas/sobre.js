// A marca: história, números, engenharia, design, competição, parcerias, gamas e Angola.
// Estrutura da página "Adaptive Power" do modelo de referência, alargada com uma linha do tempo
// horizontal fixa e capítulos com imagem fixa.
// Fontes dos factos: relatório anual da CFMOTO de 2025, cfmoto.com (company overview, notícias),
// FIM e MotoGP (Moto3 2024), Yamaha Motor (joint venture 2023). Ver README.
import { CATEGORIAS, CONTACTO, MARCA } from '../dados/site.js';
import { cartaoTestRide, continuaAExplorar, documento } from './layout.js';
import { ICONE, esc, img, modelosDe } from './util.js';

const NUMEROS = [
  { valor: MARCA.paises, sufixo: '+', texto: 'Países e regiões onde a CFMOTO está presente.' },
  { valor: 9000, sufixo: '+', texto: 'Pontos de venda CFMOTO em todo o mundo.' },
  { valor: MARCA.colaboradores, texto: 'Colaboradores na China, na Tailândia, no México e na Europa.' },
  { valor: MARCA.investigacao, texto: 'Profissionais de investigação e desenvolvimento, um em cada cinco colaboradores.' },
  { valor: MARCA.patentes, texto: 'Patentes válidas registadas pela marca.' },
  { valor: 74, sufixo: '%', texto: 'Das exportações de ATV da China em 2025. A CFMOTO é a número 1 todos os anos desde 2014.' },
];

const LINHA = [
  { ano: '1989', titulo: 'Uma pequena oficina.', texto: 'Em Wenzhou, no leste da China, Lai Guogui, então com 24 anos, começa a fabricar peças para motociclos numa oficina com menos de 20 m².', img: '/img/modelos/250nk/recurso-1.webp' },
  { ano: '1997', titulo: 'O primeiro motor arrefecido a líquido.', texto: 'Depois de produzir motores de 125 cc para outras marcas, a CFMOTO desenvolve o seu primeiro motor arrefecido a líquido.', img: '/img/modelos/675sr-r/recurso-1.webp' },
  { ano: '2005', titulo: 'Estreia na EICMA.', texto: 'No salão de Milão, a marca apresenta o seu primeiro ATV, o CF500. Começa aqui a história dos todo-o-terreno CFMOTO.', img: '/img/modelos/cforce-1000-overland/ambiente.webp' },
  { ano: '2007', titulo: 'Primeira filial fora da China.', texto: 'Abre nos Estados Unidos, no Minnesota, a primeira subsidiária internacional da marca.', img: '/img/modelos/cforce-1000-touring/ambiente.webp' },
  { ano: '2013', titulo: 'Parceria com a KTM.', texto: 'A CFMOTO passa a distribuir a KTM na China e começa a montar motos da marca austríaca.', img: '/img/modelos/800mt-explore/ambiente.webp' },
  { ano: '2014', titulo: 'Design com a Kiska.', texto: 'Começa o trabalho com o estúdio austríaco Kiska, que escolhe o azul-água como cor da marca.', img: '/img/modelos/675nk/recurso-2.webp' },
  { ano: '2016', titulo: 'Modena40, em Itália.', texto: 'Abre o centro europeu de design e I&D da CFMOTO, em Itália.', img: '/img/modelos/450sr/ambiente.webp' },
  { ano: '2017', titulo: 'Na Bolsa de Xangai.', texto: 'A Zhejiang CFMOTO Power entra em bolsa e cria com a KTM a joint venture CFMOTO-KTMR2R.', img: '/media/banners/home-brand-video-thumb.webp' },
  { ano: '2023', titulo: 'México e Yamaha.', texto: 'Nova fábrica no México, para 100.000 unidades por ano, e uma joint venture com a Yamaha para o mercado chinês.', img: '/img/modelos/u10-xl-pro/ambiente.webp' },
  { ano: '2024', titulo: 'Campeã do mundo.', texto: 'David Alonso vence o Mundial de Moto3 com a CFMOTO Aspar Team. Nesse ano, a 800NK ganha o primeiro prémio Red Dot da marca.', img: '/img/modelos/675sr-r/ambiente.webp' },
  { ano: '2024', titulo: 'Um milhão de todo-o-terreno.', texto: 'No ano em que faz 35 anos, a CFMOTO produz o seu milionésimo veículo todo-o-terreno.', img: '/img/modelos/zforce-950-sport/galeria-2.webp' },
  { ano: '2025', titulo: 'Um V4 e um centro na Áustria.', texto: 'A marca cria a CFMOTO Europe, na Áustria, para o desenvolvimento de motociclos, e apresenta na EICMA a V4 SR-RR, de 997 cc.', img: '/img/modelos/800nk/ambiente.webp' },
  { ano: '2026', titulo: '315,82 km/h.', texto: 'A V4 SR-RR estabelece o recorde chinês de velocidade máxima. E assina uma parceria com a Brembo.', img: '/img/modelos/675sr-r/recurso-2.webp' },
  { ano: 'Hoje', titulo: 'E em Angola.', texto: `Motociclos, ATV, UTV e SSV CFMOTO no ${CONTACTO.loja}, ${CONTACTO.piso}, em Luanda.`, img: '/img/angola/showroom-talatona.webp' },
];

const CAPITULOS = [
  {
    id: 'engenharia', rotulo: 'Engenharia', titulo: 'Engenharia própria, ambição global.',
    texto: [
      `Mais de 1.700 pessoas trabalham em investigação e desenvolvimento, em centros na China, nos Estados Unidos, em Itália e, desde 2025, na Áustria. Só em 2025, a CFMOTO investiu mais de 6% das receitas em I&D.`,
      'O resultado está nos motores: bicilíndricos, três cilindros e, desde 2025, um V4 de 997 cc que já bateu o recorde chinês de velocidade.',
    ],
    pontos: [
      [ICONE.motor, 'Motores CFMOTO', 'Do bicilíndrico de 449 cc ao três cilindros de 675 cc e ao V4 de 997 cc.'],
      [ICONE.escudo, 'Testados ao extremo', 'Ensaios de resistência dos motores e testes em frio e calor extremos antes de cada modelo chegar à estrada.'],
      [ICONE.loja, 'Fábricas em três países', 'Produção na China, na Tailândia e no México, com fábricas distinguidas na China como modelos de fabrico inteligente e ecológico.'],
    ],
    img: '/img/modelos/675sr-r/recurso-1.webp', legenda: 'Motor de três cilindros, 675 cc',
  },
  {
    id: 'design', rotulo: 'Design', titulo: 'Desenhada na Europa.', escuro: true, invertido: true,
    texto: [
      'Desde 2014 que a CFMOTO desenha com a Kiska, o estúdio austríaco que também criou a identidade da marca e o seu lema. Em 2016 abriu em Itália o Modena40, o seu próprio centro europeu de design e I&D.',
      'A filosofia "Cut the Edge", estreada na 800NK, valeu à marca o seu primeiro prémio Red Dot, em 2024.',
    ],
    pontos: [
      [ICONE.lapis, 'Kiska, Áustria', 'Design de motociclos e identidade da marca desde 2014.'],
      [ICONE.chip, 'Modena40, Itália', 'Centro europeu de design e desenvolvimento desde 2016.'],
      [ICONE.escudo, 'Red Dot 2024', 'A 800NK é a primeira CFMOTO premiada pelo Red Dot Design Award.'],
    ],
    img: '/img/modelos/800nk/ambiente.webp', legenda: '800NK, Red Dot 2024',
  },
  {
    id: 'competicao', rotulo: 'Competição', titulo: 'Campeã do mundo.',
    texto: [
      'Em 2022, a CFMOTO tornou-se o primeiro construtor chinês no Mundial de Moto3. Dois anos depois, com a CFMOTO Aspar Team, David Alonso foi campeão do mundo e venceu 14 corridas, batendo o recorde de vitórias numa época na categoria mais leve, que era de Valentino Rossi desde 1997.',
      'Fora do asfalto, a marca compete em rally-raid com quads.',
    ],
    pontos: [
      [ICONE.escudo, 'Tripla coroa em 2024', 'Títulos de pilotos, construtores e equipas no Mundial de Moto3.'],
      [ICONE.calendario, 'Aspar Team até 2031', 'Parceria em Moto3 e Moto2 prolongada até 2031.'],
      [ICONE.terreno, 'Rally-raid', 'Quinto lugar em quads no Dakar 2024 e Taça do Mundo FIM de Rally-Raid em quads em 2025.'],
    ],
    img: '/img/modelos/675sr-r/ambiente.webp', legenda: 'Da pista para a estrada',
  },
  {
    id: 'parcerias', rotulo: 'Parcerias', titulo: 'Em boa companhia.', invertido: true,
    texto: [
      'A CFMOTO cresce ao lado de nomes de referência. Trabalha com a KTM desde 2013 e partilha com ela, desde 2017, uma joint venture na China. O motor de 799 cc das 800MT e 800NK nasceu desta parceria.',
      'Nos componentes, escolhe fornecedores com provas dadas.',
    ],
    pontos: [
      [ICONE.motor, 'KTM', 'Joint venture CFMOTO-KTMR2R desde 2017, com fábrica própria desde 2020.'],
      [ICONE.loja, 'Yamaha', 'Joint venture desde 2023 para motociclos no mercado chinês.'],
      [ICONE.chip, 'Bosch, KYB, J.Juan, Brembo', 'Eletrónica, suspensões e travões de referência em grande parte da gama.'],
    ],
    img: '/img/modelos/800mt-explore/ambiente.webp', legenda: '800MT Explore, motor de 799 cc',
  },
];

// Missão, visão e valores (cfmoto.com) e duas frases da família fundadora
const LEMA = [
  { rotulo: 'Missão', titulo: 'Tornar o mundo um lugar mais convidativo, acessível e divertido para explorar.', texto: 'É isto que quer dizer Experience More Together: toda a gente numa viagem de descoberta, com veículos para cada nível de experiência.' },
  { rotulo: 'Visão', titulo: 'Ser uma marca global de referência em veículos de lazer motorizados.', texto: 'Dos motociclos de 125 cc aos SSV de quatro lugares, para a estrada, o trabalho e o fora de estrada.' },
  { rotulo: 'Valores', titulo: 'Determinação, progresso e mais diversão.', texto: 'Os valores da marca, nas palavras da própria CFMOTO.' },
  { rotulo: 'Lai Guogui, fundador', titulo: '“A vida é como navegar contra a corrente: ou continuas a avançar, ou ficas para trás.”', texto: 'Fundou a CFMOTO em 1989, aos 24 anos.' },
  { rotulo: 'Lai Minjie, presidente', titulo: '“Seja qual for o lugar ou o produto, a CFMOTO tem um só coração.”', texto: 'Filho do fundador, preside hoje à CFMOTO.' },
];

const IMAGEM_GAMA = {
  motociclos: '/img/modelos/1000mt-x/ambiente.webp',
  atv: '/img/modelos/cforce-1000-overland/ambiente.webp',
  utv: '/img/modelos/uforce-800-xl/ambiente.webp',
  ssv: '/img/modelos/zforce-950-sport-4/ambiente.webp',
};

const capitulo = (c) => `
    <section class="capitulo${c.escuro ? ' capitulo--escuro' : ''}${c.invertido ? ' capitulo--invertido' : ''}" id="${c.id}" aria-labelledby="${c.id}-titulo">
      <figure class="capitulo__media">
        ${img({ src: c.img, alt: '', largura: 2000, altura: 1200 })}
        <figcaption class="legenda">${esc(c.legenda)}</figcaption>
      </figure>
      <div class="capitulo__texto" data-revelar-grupo>
        <p class="rotulo">${esc(c.rotulo)}</p>
        <h2 id="${c.id}-titulo" class="titulo-1">${esc(c.titulo)}</h2>
        ${c.texto.map((t) => `<p class="lead">${esc(t)}</p>`).join('\n        ')}
        <ul class="capitulo__pontos">
          ${c.pontos.map(([icone, titulo, texto]) => `<li><span class="marca__icone">${icone}</span><span><strong>${esc(titulo)}</strong>${esc(texto)}</span></li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;

export const paginaSobre = () => ({
  caminho: 'sobre',
  html: documento({
    pagina: 'sobre',
    atual: '/sobre/',
    titulo: 'A marca',
    descricao: 'CFMOTO: fundada em 1989 por Lai Guogui, hoje em mais de 100 países. História, engenharia, design, competição e a CFMOTO em Angola, no Talatona Shopping.',
    imagem: '/media/banners/home-brand-video-thumb.webp',
    corpo: `
    <section class="heroi heroi--centro heroi--primeiro" aria-labelledby="sobre-titulo" data-heroi>
      <video class="heroi__video" muted playsinline loop autoplay preload="auto" poster="/media/video/inner-pages-header.jpg" data-video aria-hidden="true">
        <source src="/media/video/inner-pages-header.mp4" type="video/mp4">
      </video>
      <div class="heroi__conteudo">
        <p class="rotulo">A marca</p>
        <h1 id="sobre-titulo" class="heroi__titulo">${esc(MARCA.slogan)}.</h1>
        <p class="heroi__texto">Desde 1989, motociclos e veículos todo-o-terreno para quem quer explorar mais.</p>
      </div>
    </section>

    <section class="secao sobre-intro" aria-label="Introdução">
      <p class="texto-grande" data-preencher>Tudo começou em 1989, numa oficina com menos de 20 m² no leste da China. Lai Guogui tinha 24 anos e fabricava peças para motociclos. Hoje, a CFMOTO tem sede em Hangzhou, fábricas em três países e está presente em mais de 100.</p>
      <figure class="foto-inserida" data-revelar>
        ${img({ src: '/media/banners/home-brand-video-thumb.webp', alt: 'Sede da CFMOTO em Hangzhou, China', largura: 1280, altura: 720 })}
      </figure>
    </section>

    <section class="secao marca-numeros" aria-labelledby="numeros-titulo">
      <div class="marca-numeros__cabeca" data-revelar-grupo>
        <p class="rotulo">Em números</p>
        <h2 id="numeros-titulo" class="titulo-1">Uma marca global.</h2>
        <p class="lead">Cotada na Bolsa de Xangai desde 2017, a Zhejiang CFMOTO Power vendeu em 2025 quase 300.000 motociclos e cerca de 197.000 veículos todo-o-terreno. Cerca de 70% das vendas são feitas fora da China.</p>
      </div>
      <ul class="marca-numeros__grelha" data-revelar-grupo>
        ${NUMEROS.map((n) => `<li class="marca-numero"><strong><span data-contar="${n.valor}">${String(n.valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>${n.sufixo ? `<small>${esc(n.sufixo)}</small>` : ''}</strong><span>${esc(n.texto)}</span></li>`).join('\n        ')}
      </ul>
      <p class="marca-numero__fonte">Fonte: relatório anual da CFMOTO de 2025. Valores no final de 2025.</p>
    </section>

    <section class="linha-tempo" aria-labelledby="linha-titulo" data-linha-tempo>
      <div class="linha-tempo__fixo">
        <div class="linha-tempo__cabeca">
          <p class="rotulo">História</p>
          <h2 id="linha-titulo" class="titulo-1">De uma oficina a mais de 100 países.</h2>
        </div>
        <div class="linha-tempo__janela">
          <ol class="linha-tempo__trilho" data-linha-trilho>
            ${LINHA.map((m) => `
            <li class="marco-t">
              <figure>${img({ src: m.img, alt: '', largura: 1600, altura: 1000 })}</figure>
              <p class="marco-t__ano">${esc(m.ano)}</p>
              <h3>${esc(m.titulo)}</h3>
              <p>${esc(m.texto)}</p>
            </li>`).join('')}
          </ol>
        </div>
        <div class="linha-tempo__progresso" aria-hidden="true"><span data-linha-progresso></span></div>
      </div>
    </section>
${CAPITULOS.map(capitulo).join('\n')}

    <section class="marcos" aria-labelledby="lema-titulo" data-marcos>
      <h2 id="lema-titulo" class="rotulo marcos__rotulo">${esc(MARCA.slogan)}</h2>
      <div class="marcos__trilho">
        ${LEMA.map((m, i) => `
        <article class="marco${i ? '' : ' ativo'}" data-marco aria-hidden="${!!i}">
          <p class="marco__ano marco__ano--texto">${esc(m.rotulo)}</p>
          <h3 class="titulo-1">${esc(m.titulo)}</h3>
          <p class="lead">${esc(m.texto)}</p>
        </article>`).join('')}
      </div>
      <div class="marcos__controlo">
        <p class="marcos__contador" aria-live="polite"><span data-marcos-atual>01</span> / ${String(LEMA.length).padStart(2, '0')}</p>
        <div class="setas">
          <button type="button" class="seta seta--escura" aria-label="Anterior" data-marcos-ant>${ICONE.esq}</button>
          <button type="button" class="seta seta--escura" aria-label="Seguinte" data-marcos-seg>${ICONE.dir}</button>
        </div>
      </div>
      <span class="cursor-circulo" data-marcos-cursor aria-hidden="true">${ICONE.dir}</span>
    </section>

    <section class="secao gamas-marca" aria-labelledby="gamas-titulo">
      <div class="gamas-marca__cabeca" data-revelar-grupo>
        <h2 id="gamas-titulo" class="titulo-1">Quatro gamas, uma marca.</h2>
        <p class="lead">Motociclos para a cidade, a estrada e a aventura. ATV, UTV e SSV para o trabalho, a fazenda e o fora de estrada.</p>
      </div>
      <ul class="gamas-marca__lista" data-revelar-grupo>
        ${CATEGORIAS.map((c) => `
        <li class="gama-cartao">
          <a href="/${c.id}/">
            ${img({ src: IMAGEM_GAMA[c.id], alt: '', largura: 2000, altura: 1200 })}
            <span class="gama-cartao__seta" aria-hidden="true">${ICONE.seta}</span>
            <p class="rotulo">${modelosDe(c.id).length} modelos</p>
            <h3>${esc(c.titulo)}</h3>
            <p>${esc(c.intro.split('. ')[0])}.</p>
          </a>
        </li>`).join('')}
      </ul>
    </section>

    <section class="faixa-escura" aria-labelledby="angola-titulo">
      <div class="faixa-escura__conteudo" data-revelar-grupo>
        <p class="rotulo">CFMOTO Angola</p>
        <h2 id="angola-titulo" class="titulo-1">A CFMOTO oficial em Angola.</h2>
        <p class="lead">Em África, a CFMOTO está presente em mercados como a África do Sul, a Namíbia, Marrocos e o Egito. Em Angola, o ponto de encontro é o nosso showroom no ${esc(CONTACTO.loja)}, ${esc(CONTACTO.piso)}, em Luanda.</p>
        <p class="lead">Aqui podes ver de perto motociclos, ATV, UTV e SSV, tirar dúvidas com a equipa, pedir uma proposta e marcar o teu test ride. ${esc(CONTACTO.horario[0].dias)}, ${esc(CONTACTO.horario[0].horas)}.</p>
        <div class="faixa-escura__acoes">
          <a class="pilula" href="/contactos/">Visitar o showroom</a>
          <a class="link-claro" href="/test-ride/">Agendar test ride ${ICONE.seta}</a>
        </div>
      </div>
      <ul class="faixa-escura__fotos" data-revelar-grupo>
        ${['showroom-zforce-laranja', 'showroom-bobber', 'loja-entrada'].map((f) => `<li>${img({ src: `/img/angola/${f}.webp`, alt: '', largura: 1080, altura: 1440 })}</li>`).join('')}
      </ul>
    </section>
${cartaoTestRide()}
${continuaAExplorar()}`,
  }),
});
