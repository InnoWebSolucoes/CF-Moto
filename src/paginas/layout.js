// Estrutura comum a todas as páginas: <head>, cabeçalho com mega menu, menu móvel e rodapé.
import { CATEGORIAS, CONTACTO, NAV, REDES, zap } from '../dados/site.js';
import { BANDEIRA_AO, EMBLEMA, ICONE, LOGO, esc, img, modelosDe, resumo, urlModelo } from './util.js';

const SITE = 'CFMOTO Angola';

// ---------- Mega menu ----------
const colunaModelo = (m) => `
        <li class="mega__item">
          <a href="${urlModelo(m)}">
            ${img({ src: m.recorte, alt: '', largura: 1000, altura: 750 })}
            <span class="mega__nome">${esc(m.nome)}</span>
            <span class="mega__meta">${esc(resumo(m))}</span>
          </a>
        </li>`;

const painelMega = (c) => {
  const familias = c.familias?.filter((f) => modelosDe(c.id, f.id).length);
  const modelos = modelosDe(c.id);
  const lista = familias
    ? familias.map((f, i) => `
      <ul class="mega__lista" data-mega-grupo="${f.id}"${i ? ' hidden' : ''}>${modelosDe(c.id, f.id).map(colunaModelo).join('')}
      </ul>`).join('')
    : `
      <ul class="mega__lista${modelos.length <= 5 ? ' mega__lista--centro' : ''}">${modelos.map(colunaModelo).join('')}
      </ul>`;
  return `
    <div class="mega" id="mega-${c.id}" data-mega-painel="${c.id}" inert>
      ${familias ? `<div class="alternador mega__familias" role="tablist" aria-label="Famílias de ${esc(c.nome)}">
        ${familias.map((f, i) => `<button type="button" role="tab" aria-selected="${!i}" data-mega-familia="${f.id}">${esc(f.nome)}</button>`).join('')}
      </div>` : ''}
      <div class="mega__trilho">${lista}
      </div>
      <div class="mega__rodape">
        <a href="/${c.id}/">Ver ${c.id === 'motociclos' ? 'todos os motociclos' : `toda a gama ${esc(c.nome)}`} ${ICONE.seta}</a>
        <a href="/test-ride/">Agendar test ride ${ICONE.seta}</a>
      </div>
    </div>`;
};

const cabecalho = (atual, topo) => `
  <header class="topo${topo === 'transparente' ? ' transparente' : ''}" data-topo>
    <div class="topo__barra">
      <a class="topo__logo" href="/" aria-label="${SITE}, página inicial">${LOGO}</a>
      <nav class="topo__nav" aria-label="Principal">
        <ul data-nav>
          ${NAV.map((n) => `<li>${n.categoria
            ? `<button type="button" class="topo__link${atual === n.categoria ? ' atual' : ''}" aria-expanded="false" aria-controls="mega-${n.categoria}" data-mega="${n.categoria}">${esc(n.rotulo)}</button>`
            : `<a class="topo__link${atual === n.url ? ' atual' : ''}" href="${n.url}"${atual === n.url ? ' aria-current="page"' : ''}>${esc(n.rotulo)}</a>`}</li>`).join('\n          ')}
        </ul>
      </nav>
      <div class="topo__acoes">
        <a class="topo__icone" href="${zap()}" target="_blank" rel="noopener" aria-label="Falar connosco no WhatsApp">${ICONE.whatsapp}</a>
        <a class="pilula topo__cta" href="/test-ride/">Agendar test ride</a>
        <button type="button" class="topo__icone topo__hamburguer" aria-expanded="false" aria-controls="menu-movel" aria-label="Abrir menu" data-menu-abrir>${ICONE.menu}</button>
      </div>
    </div>
    ${CATEGORIAS.map(painelMega).join('')}
  </header>
  <div class="veu" data-veu aria-hidden="true"></div>`;

const menuMovel = () => `
  <div class="menu-movel" id="menu-movel" data-menu-movel inert role="dialog" aria-modal="true" aria-label="Menu">
    <div class="menu-movel__topo">
      <a class="topo__logo" href="/" aria-label="${SITE}, página inicial">${LOGO}</a>
      <button type="button" class="topo__icone" aria-label="Fechar menu" data-menu-fechar>${ICONE.fechar}</button>
    </div>
    <div class="menu-movel__corpo" data-lenis-prevent>
      <p class="menu-movel__grupo">Gama</p>
      <ul class="menu-movel__lista">
        ${CATEGORIAS.map((c) => `<li><a href="/${c.id}/">${esc(c.nome)}<span>${modelosDe(c.id).length}</span></a></li>`).join('')}
      </ul>
      <p class="menu-movel__grupo">CFMOTO Angola</p>
      <ul class="menu-movel__lista">
        ${NAV.filter((n) => !n.categoria).map((n) => `<li><a href="${n.url}">${esc(n.rotulo)}</a></li>`).join('')}
      </ul>
    </div>
    <div class="menu-movel__base">
      <a class="pilula pilula--escura" href="${zap()}" target="_blank" rel="noopener">${ICONE.whatsapp}<span>Falar no WhatsApp</span></a>
      <p class="pais">${BANDEIRA_AO}<strong>Angola</strong> / Português</p>
    </div>
  </div>`;

// ---------- Rodapé ----------
const rodape = () => `
  <footer class="rodape">
    <div class="rodape__grelha">
      <div class="rodape__coluna">
        <p class="rodape__titulo">Gama</p>
        <ul>${CATEGORIAS.map((c) => `<li><a href="/${c.id}/">${esc(c.nome)}</a></li>`).join('')}</ul>
      </div>
      <div class="rodape__coluna">
        <p class="rodape__titulo">CFMOTO Angola</p>
        <ul>
          <li><a href="/sobre/">A marca</a></li>
          <li><a href="/test-ride/">Test ride</a></li>
          <li><a href="/contactos/">Contactos</a></li>
          <li><a href="https://www.cfmoto.com/global/" target="_blank" rel="noopener">CFMOTO Global</a></li>
        </ul>
      </div>
      <div class="rodape__coluna">
        <p class="rodape__titulo">Showroom</p>
        <address>
          ${CONTACTO.morada.map(esc).join('<br>')}<br>
          ${CONTACTO.horario.map((h) => `${esc(h.dias)}, ${esc(h.horas)}`).join('<br>')}
        </address>
        <a class="rodape__mapa" href="${CONTACTO.mapa}" target="_blank" rel="noopener">Abrir no mapa ${ICONE.seta}</a>
      </div>
      <div class="rodape__contacto">
        <p class="rodape__titulo">Fala connosco</p>
        <a class="rodape__telefone" href="${zap()}" target="_blank" rel="noopener">
          <span>${esc(CONTACTO.telefone)}</span>
          <span class="rodape__zap">WhatsApp ${ICONE.setaDir}</span>
        </a>
        <p class="rodape__nota">Respondemos a dúvidas sobre modelos, disponibilidade, acessórios e test rides.</p>
        <ul class="rodape__redes">
          ${REDES.map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener" aria-label="${esc(r.nome)} ${esc(r.utilizador)}">${ICONE[r.nome.toLowerCase()]}</a></li>`).join('')}
        </ul>
      </div>
    </div>
    <a class="rodape__marca" href="/" aria-label="${SITE}, página inicial">${LOGO}<span>Angola</span></a>
    <div class="rodape__base">
      <p class="pais">${BANDEIRA_AO}<strong>Angola</strong> / Português</p>
      <p>Representante oficial CFMOTO em Angola</p>
      <p>Imagens e especificações de referência; podem variar consoante o mercado.</p>
      <p>© ${new Date().getFullYear()} ${SITE}</p>
      <p class="rodape__credito">Made by <a href="https://innoweb.agency" target="_blank" rel="noopener">Innoweb agency</a></p>
    </div>
  </footer>`;

// ---------- Documento ----------
export const documento = ({ titulo, descricao, pagina, atual, topo = 'transparente', imagem = '/media/banners/banner-1000mt-x-gpx.webp', corpo }) => `<!doctype html>
<html lang="pt-AO">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(titulo ? `${titulo} | ${SITE}` : `${SITE} | Motociclos, ATV, UTV e SSV em Luanda`)}</title>
  <meta name="description" content="${esc(descricao)}">
  <meta name="theme-color" content="#1d1d1d">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE}">
  <meta property="og:locale" content="pt_AO">
  <meta property="og:title" content="${esc(titulo || SITE)}">
  <meta property="og:description" content="${esc(descricao)}">
  <meta property="og:image" content="${imagem}">
  <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml">
  <script>document.documentElement.classList.add('js')</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Inter:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="/src/css/site.css">
</head>
<body data-pagina="${pagina}" data-topo-inicial="${topo}">
  <a class="saltar" href="#conteudo">Saltar para o conteúdo</a>
${cabecalho(atual, topo)}
${menuMovel()}
  <main id="conteudo">
${corpo}
  </main>
${rodape()}
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;

// ---------- Blocos reutilizados em várias páginas ----------

// Cartão "Qual CFMOTO é para ti?" com a imagem que troca de modelo (flipbook)
export const cartaoTestRide = ({ titulo = 'Qual CFMOTO é para ti?', texto = 'Vem ao showroom no Talatona Shopping e experimenta antes de decidir. Ajudamos-te a escolher o modelo certo.', slugs } = {}) => {
  const lista = (slugs || ['800mt-x', '450nk', 'zforce-950-sport', '700cl-x-heritage', 'cforce-1000-touring', '675sr-r', 'uforce-600', '450mt', '800nk', 'c5-touring', '450cl-c', 'u10-pro'])
    .map((s) => modelosDe('motociclos').concat(modelosDe('atv'), modelosDe('utv'), modelosDe('ssv')).find((m) => m.slug === s))
    .filter(Boolean);
  return `
    <section class="secao secao--cartao" aria-labelledby="cartao-test-ride">
      <div class="cartao-tr" data-revelar>
        <div class="cartao-tr__imagem" data-flipbook aria-hidden="true">
          ${lista.map((m, i) => img({ src: m.recorte, alt: '', largura: 1000, altura: 750, classe: i ? '' : 'ativa' })).join('\n          ')}
        </div>
        <div class="cartao-tr__texto">
          <h2 id="cartao-test-ride" class="titulo-2">${esc(titulo)}</h2>
          <p class="lead">${esc(texto)}</p>
          <a class="pilula pilula--escura" href="/test-ride/">Agendar test ride</a>
          <a class="link-cinza" href="${zap('Olá CFMOTO Angola! Gostaria de ajuda para escolher um modelo.')}" target="_blank" rel="noopener">Prefiro falar no WhatsApp</a>
        </div>
      </div>
    </section>`;
};

// Mosaico "Continua a explorar": quatro atalhos sobre uma fotografia
export const continuaAExplorar = () => `
    <section class="explorar" aria-labelledby="explorar-titulo">
      ${img({ src: '/media/banners/banner-concessionarios-800mt.webp', alt: '', classe: 'explorar__fundo', largura: 2200, altura: 1467 })}
      <div class="explorar__conteudo">
        <h2 id="explorar-titulo" class="titulo-2" data-revelar>Continua a explorar</h2>
        <ul class="explorar__lista" data-revelar-grupo>
          ${CATEGORIAS.map((c) => `<li><a href="/${c.id}/"><span><strong>${esc(c.titulo)}</strong><small>${modelosDe(c.id).length} modelos</small></span>${ICONE.dir}</a></li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;

export { EMBLEMA };
