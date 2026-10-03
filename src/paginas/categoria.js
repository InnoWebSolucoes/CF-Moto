// Página de gama (motociclos, ATV, UTV, SSV): herói em vídeo, filtro por família e grelha de modelos.
import { CATEGORIAS } from '../dados/site.js';
import { cartaoTestRide, continuaAExplorar, documento } from './layout.js';
import { ICONE, esc, img, modelosDe, resumo, urlModelo } from './util.js';

export const cartaoModelo = (m) => `
        <li class="cartao-modelo" data-familia="${esc(m.familia)}">
          <a href="${urlModelo(m)}">
            ${m.selo ? `<span class="selo">${esc(m.selo)}</span>` : ''}
            <span class="cartao-modelo__imagem">${img({ src: m.recorte, alt: m.nome, largura: 1000, altura: 750 })}</span>
            <span class="cartao-modelo__texto">
              <span class="cartao-modelo__nome">${esc(m.nome)}</span>
              <span class="cartao-modelo__slogan">${esc(m.slogan)}</span>
              <span class="cartao-modelo__meta">${esc(resumo(m))}</span>
            </span>
            <span class="cartao-modelo__seta" aria-hidden="true">${ICONE.setaDir}</span>
          </a>
        </li>`;

const pagina = (c) => {
  const modelos = modelosDe(c.id);
  const familias = c.familias?.filter((f) => modelos.some((m) => m.familia === f.id));
  return documento({
    pagina: 'categoria',
    atual: c.id,
    titulo: c.titulo,
    descricao: `${c.titulo} CFMOTO em Angola: ${modelos.map((m) => m.nome).slice(0, 8).join(', ')} e mais. ${c.intro}`,
    imagem: c.poster,
    corpo: `
    <section class="heroi heroi--centro heroi--primeiro" aria-labelledby="gama-titulo" data-heroi>
      <video class="heroi__video" muted playsinline loop autoplay preload="auto" poster="${c.poster}" data-video aria-hidden="true">
        <source src="${c.video}" type="video/mp4">
      </video>
      <div class="heroi__conteudo">
        <p class="rotulo">Gama ${esc(c.nome)} · ${modelos.length} modelos</p>
        <h1 id="gama-titulo" class="heroi__titulo">${esc(c.titulo)}</h1>
        <p class="heroi__texto">${esc(c.slogan)}</p>
      </div>
    </section>

    <section class="secao gama" aria-labelledby="gama-intro">
      <p id="gama-intro" class="texto-grande gama__intro" data-preencher>${esc(c.intro)}</p>
      ${familias ? `
      <div class="gama__filtro">
        <div class="alternador" role="tablist" aria-label="Filtrar por família" data-filtro>
          <button type="button" role="tab" aria-selected="true" data-filtro-familia="">Todos</button>
          ${familias.map((f) => `<button type="button" role="tab" aria-selected="false" data-filtro-familia="${f.id}">${esc(f.nome)}</button>`).join('\n          ')}
        </div>
        <p class="gama__familia-descricao" data-filtro-descricao aria-live="polite"></p>
      </div>` : ''}
      <ul class="grelha-modelos" data-grelha>${modelos.map(cartaoModelo).join('')}
      </ul>
      ${familias ? `<script type="application/json" data-familias>${JSON.stringify(Object.fromEntries(familias.map((f) => [f.id, f.descricao])))}</script>` : ''}
    </section>
${cartaoTestRide({
  titulo: `Qual ${c.id === 'motociclos' ? 'moto' : c.nome} é para ti?`,
  slugs: modelos.map((m) => m.slug),
})}
${continuaAExplorar()}`,
  });
};

export const paginasCategoria = () => CATEGORIAS.map((c) => ({ caminho: c.id, html: pagina(c) }));
