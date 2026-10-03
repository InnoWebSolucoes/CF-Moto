// Páginas com formulário: Test Ride e Contactos.
// Não há servidor: o formulário compõe uma mensagem e abre o WhatsApp do showroom
// (src/js/paginas/formulario-zap.js). Sem JavaScript, o botão abre o WhatsApp sem texto.
import { CATEGORIAS, CONTACTO, REDES, zap } from '../dados/site.js';
import { continuaAExplorar, documento } from './layout.js';
import { ICONE, esc, img, modelosDe } from './util.js';

const opcoesModelo = (rotuloVazio) => `
            <option value="">${esc(rotuloVazio)}</option>
            ${CATEGORIAS.map((c) => `<optgroup label="${esc(c.titulo)}">${modelosDe(c.id).map((m) => `<option value="${m.slug}" data-img="${m.recorte}">${esc(m.nome)}</option>`).join('')}</optgroup>`).join('\n            ')}`;

const campo = ({ id, rotulo, tipo = 'text', obrigatorio = false, extra = '', ajuda = '' }) => `
          <div class="campo">
            <label for="${id}">${esc(rotulo)}${obrigatorio ? '' : ' <span>(opcional)</span>'}</label>
            <input id="${id}" name="${id}" type="${tipo}"${obrigatorio ? ' required' : ''}${extra}>
            ${ajuda ? `<p class="campo__ajuda">${esc(ajuda)}</p>` : ''}
          </div>`;

const cartaoShowroom = () => `
        <aside class="showroom" aria-labelledby="showroom-titulo">
          ${img({ src: '/img/angola/showroom-talatona.webp', alt: 'Showroom CFMOTO no Talatona Shopping, com SSV ZFORCE e ATV em exposição', classe: 'showroom__foto', largura: 1280, altura: 960 })}
          <div class="showroom__texto">
            <h2 id="showroom-titulo" class="titulo-3">Showroom CFMOTO Angola</h2>
            <ul class="showroom__lista">
              <li>${ICONE.pin}<span>${CONTACTO.morada.map(esc).join('<br>')}</span></li>
              <li>${ICONE.relogio}<span>${CONTACTO.horario.map((h) => `${esc(h.dias)}<br>${esc(h.horas)}`).join('<br>')}</span></li>
              <li>${ICONE.telefone}<span><a href="${CONTACTO.telefoneLink}">${esc(CONTACTO.telefone)}</a><br>Chamadas e WhatsApp</span></li>
            </ul>
            <a class="link-seta" href="${CONTACTO.mapa}" target="_blank" rel="noopener">Abrir no Google Maps ${ICONE.seta}</a>
          </div>
        </aside>`;

// ---------- Test Ride ----------
const testRide = () => documento({
  pagina: 'test-ride',
  atual: '/test-ride/',
  topo: 'claro',
  titulo: 'Agendar test ride',
  descricao: 'Agenda um test ride CFMOTO no Talatona Shopping, em Luanda. Escolhe o modelo, indica o dia e confirmamos contigo pelo WhatsApp.',
  corpo: `
    <section class="secao formulario-pagina" aria-labelledby="tr-titulo">
      <div class="formulario-pagina__intro" data-revelar-grupo>
        <p class="rotulo">Test ride</p>
        <h1 id="tr-titulo" class="titulo-1">Experimenta antes de decidir.</h1>
        <p class="lead">Escolhe o modelo e o dia que te dá jeito. A nossa equipa confirma contigo a disponibilidade pelo WhatsApp.</p>
        <ol class="passos">
          <li><strong>01</strong><span>Escolhe o modelo</span></li>
          <li><strong>02</strong><span>Indica o dia e o período</span></li>
          <li><strong>03</strong><span>Confirmamos pelo WhatsApp</span></li>
        </ol>
        <figure class="formulario-pagina__modelo" data-pre-visualizacao hidden>
          <img src="" alt="" width="1000" height="750">
          <figcaption></figcaption>
        </figure>
      </div>
      <form class="formulario" action="${zap()}" method="get" target="_blank" data-formulario-zap="test-ride" novalidate>
        <div class="campo">
          <label for="modelo">Modelo</label>
          <div class="campo__select">
            <select id="modelo" name="modelo" required data-select-modelo>${opcoesModelo('Escolhe um modelo')}
            </select>
            ${ICONE.baixo}
          </div>
        </div>
        <div class="campo-duplo">
          ${campo({ id: 'nome', rotulo: 'Nome', obrigatorio: true, extra: ' autocomplete="name"' })}
          ${campo({ id: 'telemovel', rotulo: 'Telemóvel / WhatsApp', tipo: 'tel', obrigatorio: true, extra: ' autocomplete="tel" inputmode="tel" placeholder="9XX XXX XXX"' })}
        </div>
        <div class="campo-duplo">
          ${campo({ id: 'data', rotulo: 'Dia preferido', tipo: 'date', obrigatorio: true, extra: ' data-data-minima' })}
          <fieldset class="campo campo--opcoes">
            <legend>Período</legend>
            <div class="opcoes">
              ${['Manhã', 'Tarde', 'Noite'].map((p, i) => `<label><input type="radio" name="periodo" value="${p}"${i ? '' : ' checked'}><span>${p}</span></label>`).join('')}
            </div>
          </fieldset>
        </div>
        <fieldset class="campo campo--opcoes">
          <legend>Carta de condução</legend>
          <div class="opcoes">
            ${['Sim', 'Ainda não', 'Não se aplica'].map((p, i) => `<label><input type="radio" name="carta" value="${p}"${i ? '' : ' checked'}><span>${p}</span></label>`).join('')}
          </div>
        </fieldset>
        <div class="campo">
          <label for="mensagem">Mensagem <span>(opcional)</span></label>
          <textarea id="mensagem" name="mensagem" rows="3" placeholder="Experiência de condução, dúvidas, outro modelo que queiras comparar…"></textarea>
        </div>
        <p class="formulario__erro" data-formulario-erro role="alert" hidden></p>
        <button class="pilula pilula--escura formulario__enviar" type="submit">${ICONE.whatsapp}<span>Enviar pedido pelo WhatsApp</span></button>
        <p class="formulario__nota">Ao enviar, abrimos o WhatsApp com o teu pedido já escrito. Só precisas de carregar em enviar.</p>
      </form>
    </section>

    <section class="secao secao--estreita" aria-label="Onde fazer o test ride">
${cartaoShowroom()}
    </section>
${continuaAExplorar()}`,
});

// ---------- Contactos ----------
const ASSUNTOS = ['Informação sobre um modelo', 'Pedido de proposta', 'Test ride', 'Acessórios e vestuário', 'Peças e assistência', 'Outro assunto'];

const contactos = () => documento({
  pagina: 'contactos',
  atual: '/contactos/',
  titulo: 'Contactos',
  descricao: `Contactos da CFMOTO Angola: showroom no Talatona Shopping, Piso 0, Luanda. WhatsApp ${CONTACTO.telefone}. Aberto todos os dias.`,
  imagem: '/img/angola/showroom-talatona.webp',
  corpo: `
    <section class="heroi heroi--centro heroi--curto heroi--primeiro" aria-labelledby="contactos-titulo" data-heroi>
      ${img({ src: '/img/angola/showroom-talatona.webp', alt: '', classe: 'heroi__imagem', largura: 1280, altura: 960, lazy: false })}
      <div class="heroi__conteudo">
        <p class="rotulo">Contactos</p>
        <h1 id="contactos-titulo" class="heroi__titulo">Fala connosco.</h1>
        <p class="heroi__texto">No showroom, por telefone ou pelo WhatsApp. Estamos aqui todos os dias.</p>
      </div>
    </section>

    <section class="secao contactos" aria-label="Formas de contacto">
      <ul class="contactos__cartoes" data-revelar-grupo>
        <li class="contacto-cartao">
          ${ICONE.whatsapp}
          <h2>WhatsApp</h2>
          <p>A forma mais rápida de falar connosco.</p>
          <a class="link-seta" href="${zap()}" target="_blank" rel="noopener">${esc(CONTACTO.telefone)} ${ICONE.seta}</a>
        </li>
        <li class="contacto-cartao">
          ${ICONE.telefone}
          <h2>Telefone</h2>
          <p>Liga-nos durante o horário do showroom.</p>
          <a class="link-seta" href="${CONTACTO.telefoneLink}">${esc(CONTACTO.telefone)} ${ICONE.seta}</a>
        </li>
        <li class="contacto-cartao">
          ${ICONE.pin}
          <h2>Showroom</h2>
          <p>${esc(CONTACTO.morada[0])}, ${esc(CONTACTO.morada[2])}.</p>
          <a class="link-seta" href="${CONTACTO.mapa}" target="_blank" rel="noopener">Como chegar ${ICONE.seta}</a>
        </li>
        <li class="contacto-cartao">
          ${ICONE.instagram}
          <h2>Redes sociais</h2>
          <p>Novidades, chegadas e eventos.</p>
          <span class="contacto-cartao__redes">${REDES.map((r) => `<a class="link-seta" href="${r.url}" target="_blank" rel="noopener">${esc(r.nome)} ${ICONE.seta}</a>`).join('')}</span>
        </li>
      </ul>
    </section>

    <section class="secao mapa-secao" id="showroom" aria-labelledby="showroom-mapa-titulo">
      <div class="mapa">
        <iframe title="Mapa: Talatona Shopping, Luanda" src="${CONTACTO.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="mapa__cartao">
          <h2 id="showroom-mapa-titulo" class="titulo-3">${esc(CONTACTO.loja)}</h2>
          <p>${esc(CONTACTO.piso)} · ${CONTACTO.horario.map((h) => `${esc(h.dias)}, ${esc(h.horas)}`).join(' · ')}</p>
          <a class="pilula pilula--escura pilula--pequena" href="${CONTACTO.mapa}" target="_blank" rel="noopener">Abrir no Google Maps</a>
        </div>
      </div>
      <ul class="mapa__fotos">
        ${['showroom-zforce-preto', 'loja-entrada', 'showroom-zforce-laranja-34'].map((f) => `<li>${img({ src: `/img/angola/${f}.webp`, alt: '', largura: 1080, altura: 720 })}</li>`).join('')}
      </ul>
    </section>

    <section class="secao formulario-pagina" aria-labelledby="mensagem-titulo">
      <div class="formulario-pagina__intro" data-revelar-grupo>
        <h2 id="mensagem-titulo" class="titulo-1">Envia-nos uma mensagem.</h2>
        <p class="lead">Diz-nos o que procuras. Respondemos pelo WhatsApp com informação sobre modelos, preços, disponibilidade, acessórios ou assistência.</p>
      </div>
      <form class="formulario" action="${zap()}" method="get" target="_blank" data-formulario-zap="contacto" novalidate>
        <div class="campo-duplo">
          ${campo({ id: 'nome', rotulo: 'Nome', obrigatorio: true, extra: ' autocomplete="name"' })}
          ${campo({ id: 'telemovel', rotulo: 'Telemóvel / WhatsApp', tipo: 'tel', obrigatorio: true, extra: ' autocomplete="tel" inputmode="tel" placeholder="9XX XXX XXX"' })}
        </div>
        <div class="campo-duplo">
          <div class="campo">
            <label for="assunto">Assunto</label>
            <div class="campo__select">
              <select id="assunto" name="assunto" required>
                ${ASSUNTOS.map((a) => `<option>${esc(a)}</option>`).join('')}
              </select>
              ${ICONE.baixo}
            </div>
          </div>
          <div class="campo">
            <label for="modelo">Modelo <span>(opcional)</span></label>
            <div class="campo__select">
              <select id="modelo" name="modelo">${opcoesModelo('Nenhum em particular')}
              </select>
              ${ICONE.baixo}
            </div>
          </div>
        </div>
        <div class="campo">
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
        </div>
        <p class="formulario__erro" data-formulario-erro role="alert" hidden></p>
        <button class="pilula pilula--escura formulario__enviar" type="submit">${ICONE.whatsapp}<span>Enviar pelo WhatsApp</span></button>
      </form>
    </section>
${continuaAExplorar()}`,
});

export const paginasFormulario = () => [
  { caminho: 'test-ride', html: testRide() },
  { caminho: 'contactos', html: contactos() },
];
