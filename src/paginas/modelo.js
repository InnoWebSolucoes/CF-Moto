// Página de modelo (uma por cada modelo em src/dados/modelos.json).
// Estrutura do modelo de referência: herói com o nome gigante, subnavegação escura fixa,
// parágrafo que se preenche, recorte com cores, números, carrossel de destaques,
// equipamento, galeria, vídeo, especificações, pedido de proposta e outros modelos.
import { CATEGORIAS, zap } from '../dados/site.js';
import { cartaoModelo } from './categoria.js';
import { continuaAExplorar, documento } from './layout.js';
import { ICONE, MODELOS, attr, esc, img } from './util.js';

// Primeiras frases da descrição, até ~limite caracteres
const resumir = (paras, limite = 230) => {
  const frases = (paras.join(' ').match(/[^.!?]+[.!?]+/g) || [paras.join(' ')]).map((f) => f.trim());
  let texto = '';
  for (const f of frases) {
    if (texto && (texto + ' ' + f).length > limite) break;
    texto = texto ? `${texto} ${f}` : f;
  }
  return texto;
};

// Artigo: "a" 800MT (a moto), "o" ZFORCE (o veículo)
const a = (m) => (m.categoria === 'motociclos' ? 'a' : 'o');
const da = (m) => (a(m) === 'a' ? 'da' : 'do');

const relacionados = (m) => {
  const mesmaFamilia = MODELOS.filter((o) => o.slug !== m.slug && o.categoria === m.categoria && o.familia === m.familia);
  const mesmaCategoria = MODELOS.filter((o) => o.slug !== m.slug && o.categoria === m.categoria && o.familia !== m.familia);
  return [...mesmaFamilia, ...mesmaCategoria].slice(0, 4);
};

const heroi = (m, cat) => `
    <section class="heroi heroi--modelo heroi--primeiro" aria-labelledby="modelo-nome" data-heroi>
      ${img({ src: m.ambiente || m.recorte, alt: '', classe: 'heroi__imagem', largura: 2000, altura: 1200, lazy: false })}
      <div class="heroi__conteudo">
        ${m.selo ? `<p class="selo selo--claro">${esc(m.selo)}</p>` : ''}
        <h1 id="modelo-nome" class="heroi__titulo heroi__titulo--gigante">${esc(m.nome)}</h1>
      </div>
      <p class="heroi__rodape"><a href="/${cat.id}/">${esc(cat.titulo)}</a>${m.categoria === 'motociclos' ? ` · ${esc(m.familia)}` : ''}</p>
    </section>`;

const subnav = (m) => `
    <nav class="subnav" aria-label="Secções: ${esc(m.nome)}" data-subnav>
      <a class="subnav__nome" href="#visao">${esc(m.nome)}</a>
      <ul>
        <li><a href="#visao">Visão geral</a></li>
        ${m.recursos.length ? '<li><a href="#destaques">Destaques</a></li>' : ''}
        ${m.galeria.length ? '<li><a href="#galeria">Galeria</a></li>' : ''}
        <li><a href="#especificacoes">Especificações</a></li>
      </ul>
      <a class="pilula pilula--pequena" href="/test-ride/?modelo=${m.slug}">Test ride</a>
    </nav>`;

const visao = (m) => {
  const cores = m.cores.length ? m.cores : [{ nome: '', hex: '#888', img: m.recorte }];
  return `
    <section class="secao visao" id="visao" aria-label="Visão geral">
      <p class="texto-grande visao__texto" data-preencher>${esc(m.slogan ? `${m.slogan.replace(/[.!]$/, '')}. ` : '')}${esc(resumir(m.descricao))}</p>
      <div class="visao__palco" data-cores>
        <div class="visao__imagens">
          ${cores.map((c, i) => img({ src: c.img, alt: `${m.nome}${c.nome ? `, cor ${c.nome.toLowerCase()}` : ''}`, classe: i ? '' : 'ativa', largura: 1000, altura: 750, extra: attr('data-cor-img', i) })).join('\n          ')}
        </div>
        ${cores.length > 1 ? `
        <div class="cores" role="radiogroup" aria-label="Cores disponíveis">
          ${cores.map((c, i) => `<button type="button" role="radio" aria-checked="${!i}" aria-label="${esc(c.nome)}" style="--cor:${c.hex}" data-cor="${i}"></button>`).join('\n          ')}
        </div>` : ''}
        <p class="visao__cor" data-cor-nome aria-live="polite">${esc(cores[0].nome)}</p>
      </div>
      ${m.numeros.length ? `
      <ul class="numeros" data-revelar-grupo>
        ${m.numeros.map((n) => `<li class="numero"><strong>${esc(n.valor)}<small>${esc(n.unidade)}</small></strong><span>${esc(n.rotulo)}</span></li>`).join('\n        ')}
      </ul>` : ''}
    </section>`;
};

const destaques = (m) => (m.recursos.length ? `
    <section class="secao destaques" id="destaques" aria-labelledby="destaques-titulo">
      <h2 id="destaques-titulo" class="sr">Destaques</h2>
      <div class="carrossel" data-carrossel>
        <ul class="carrossel__trilho" data-carrossel-trilho>
          ${m.recursos.map((r, i) => `
          <li class="destaque">
            ${r.img ? img({ src: r.img, alt: '', largura: 1600, altura: 900 }) : ''}
            <div class="destaque__texto">
              <p class="destaque__rotulo">${esc(m.nome)}</p>
              <h3 class="destaque__titulo">${esc(r.titulo)}</h3>
            </div>
            ${r.texto ? `<button type="button" class="destaque__mais" aria-label="Saber mais: ${esc(r.titulo)}" data-dialogo="destaque-${i}">${ICONE.mais}</button>
            <dialog class="dialogo" id="destaque-${i}" aria-labelledby="destaque-${i}-titulo">
              <h3 id="destaque-${i}-titulo">${esc(r.titulo)}</h3>
              <p>${esc(r.texto)}</p>
              <button type="button" class="dialogo__fechar" aria-label="Fechar" data-dialogo-fechar>${ICONE.fechar}</button>
            </dialog>` : ''}
          </li>`).join('')}
        </ul>
        <div class="setas carrossel__setas">
          <button type="button" class="seta" aria-label="Anterior" data-carrossel-ant>${ICONE.esq}</button>
          <button type="button" class="seta" aria-label="Seguinte" data-carrossel-seg>${ICONE.dir}</button>
        </div>
      </div>
    </section>` : '');

const equipamento = (m) => {
  const extra = m.descricao.slice(1, 3);
  return m.destaques.length ? `
    <section class="secao equipamento" aria-labelledby="equipamento-titulo">
      <div class="equipamento__texto" data-revelar-grupo>
        <h2 id="equipamento-titulo" class="titulo-1">Equipamento</h2>
        ${extra.map((p) => `<p class="lead">${esc(p)}</p>`).join('\n        ')}
        <a class="pilula pilula--escura" href="${zap(`Olá CFMOTO Angola! Gostaria de saber mais sobre ${a(m)} ${m.nome}.`)}" target="_blank" rel="noopener">${ICONE.whatsapp}<span>Tirar dúvidas</span></a>
      </div>
      <ul class="equipamento__lista" data-revelar-grupo>
        ${m.destaques.map((d) => `<li>${ICONE.escudo.replace('<svg', '<svg class="equipamento__icone"')}<span>${esc(d)}</span></li>`).join('\n        ')}
      </ul>
    </section>` : '';
};

const galeria = (m) => (m.galeria.length ? `
    <section class="secao galeria" id="galeria" aria-labelledby="galeria-titulo">
      <div class="galeria__cabeca" data-revelar-grupo>
        <h2 id="galeria-titulo" class="titulo-1">${esc(m.slogan || m.nome)}</h2>
      </div>
      <div class="bento">
        <div class="bento__coluna">${m.galeria.filter((_, i) => i % 2 === 0).map((g) => `<figure data-revelar>${img({ src: g, alt: `${m.nome} em ação`, largura: 1600, altura: 1067 })}</figure>`).join('')}</div>
        <div class="bento__coluna bento__coluna--desfasada">${m.galeria.filter((_, i) => i % 2 === 1).map((g) => `<figure data-revelar>${img({ src: g, alt: `${m.nome} em ação`, largura: 1600, altura: 1067 })}</figure>`).join('')}</div>
      </div>
    </section>` : '');

const video = (m) => (m.youtube ? `
    <section class="secao video" aria-label="Vídeo: ${esc(m.nome)}">
      <div class="video__moldura" data-youtube="${esc(m.youtube)}" data-youtube-titulo="${esc(m.nome)}">
        ${img({ src: m.galeria[0] || m.ambiente || m.recorte, alt: '', largura: 1600, altura: 900 })}
        <button type="button" class="video__play" aria-label="Ver vídeo: ${esc(m.nome)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5Z" fill="currentColor"/></svg><span>Ver vídeo</span></button>
      </div>
    </section>` : '');

const especificacoes = (m) => `
    <section class="secao specs" id="especificacoes" aria-labelledby="specs-titulo">
      <h2 id="specs-titulo" class="specs__titulo">Especificações</h2>
      <div class="specs__tabela">
        ${m.cores.length ? `
        <dl class="specs__linha">
          <dt>Cores</dt>
          <dd class="specs__cores">${m.cores.map((c) => `<span><i style="--cor:${c.hex}"></i>${esc(c.nome)}</span>`).join('')}</dd>
        </dl>` : ''}
        ${Object.entries(m.specs).map(([secao, linhas]) => `
        <h3 class="specs__secao">${esc(secao)}</h3>
        ${Object.entries(linhas).map(([k, v]) => `<dl class="specs__linha"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></dl>`).join('\n        ')}`).join('')}
        <p class="specs__nota">Especificações de referência do fabricante. Podem variar consoante o mercado e o ano do modelo; confirma os detalhes da unidade disponível em Angola no showroom.</p>
      </div>
    </section>`;

const proposta = (m) => `
    <section class="secao secao--cartao" aria-labelledby="proposta-titulo">
      <div class="proposta" data-revelar>
        <div class="proposta__texto">
          <p class="rotulo">Preço sob consulta</p>
          <h2 id="proposta-titulo" class="titulo-2">Gostaste ${da(m)} ${esc(m.nome)}?</h2>
          <p class="lead">Pede uma proposta com preço e disponibilidade em Angola, ou vem experimentá-${a(m) === 'a' ? 'la' : 'lo'} ao Talatona Shopping.</p>
          <div class="proposta__acoes">
            <a class="pilula" href="${zap(`Olá CFMOTO Angola! Gostaria de receber uma proposta para ${a(m)} ${m.nome}.`)}" target="_blank" rel="noopener">${ICONE.whatsapp}<span>Pedir proposta</span></a>
            <a class="pilula pilula--contorno" href="/test-ride/?modelo=${m.slug}">Agendar test ride</a>
          </div>
        </div>
        ${img({ src: m.recorte, alt: '', classe: 'proposta__imagem', largura: 1000, altura: 750 })}
      </div>
    </section>`;

const outros = (m) => {
  const lista = relacionados(m);
  return lista.length ? `
    <section class="secao outros" aria-labelledby="outros-titulo">
      <h2 id="outros-titulo" class="titulo-2">Também te pode interessar</h2>
      <ul class="grelha-modelos grelha-modelos--linha">${lista.map(cartaoModelo).join('')}
      </ul>
    </section>` : '';
};

const pagina = (m) => {
  const cat = CATEGORIAS.find((c) => c.id === m.categoria);
  return documento({
    pagina: 'modelo',
    atual: m.categoria,
    titulo: `${m.nome}${m.slogan ? ` · ${m.slogan}` : ''}`,
    descricao: `${m.nome} CFMOTO em Angola. ${resumir(m.descricao, 140)} Pede proposta ou agenda o teu test ride no Talatona Shopping.`,
    imagem: m.ambiente || m.recorte,
    corpo: [heroi(m, cat), subnav(m), visao(m), destaques(m), equipamento(m), galeria(m), video(m), especificacoes(m), proposta(m), outros(m), continuaAExplorar()].join('\n'),
  });
};

export const paginasModelo = () => MODELOS.map((m) => ({ caminho: `modelos/${m.slug}`, html: pagina(m) }));
