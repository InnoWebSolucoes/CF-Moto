// Formulários de test ride e contacto: validam, escrevem a mensagem e abrem o WhatsApp do showroom.
// Não há servidor; o pedido chega à equipa como uma conversa de WhatsApp normal.
import { url } from '../lib/base.js';
import { $, $$ } from '../lib/movimento.js';

const valor = (form, nome) => (form.elements[nome]?.value || '').trim();
const textoOpcao = (select) => (select?.value ? select.selectedOptions[0].textContent.trim() : '');

const hojeISO = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const dataPorExtenso = (iso) => (iso
  ? new Date(`${iso}T12:00`).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })
  : '');

const MENSAGENS = {
  'test-ride': (f) => [
    'Olá CFMOTO Angola! Gostaria de agendar um test ride.',
    '',
    `Modelo: ${textoOpcao(f.elements.modelo)}`,
    `Nome: ${valor(f, 'nome')}`,
    `Telemóvel: ${valor(f, 'telemovel')}`,
    `Dia preferido: ${dataPorExtenso(valor(f, 'data'))}`,
    `Período: ${valor(f, 'periodo')}`,
    `Carta de condução: ${valor(f, 'carta')}`,
    ...(valor(f, 'mensagem') ? ['', valor(f, 'mensagem')] : []),
  ],
  contacto: (f) => [
    'Olá CFMOTO Angola!',
    '',
    `Assunto: ${valor(f, 'assunto')}`,
    ...(textoOpcao(f.elements.modelo) ? [`Modelo: ${textoOpcao(f.elements.modelo)}`] : []),
    `Nome: ${valor(f, 'nome')}`,
    `Telemóvel: ${valor(f, 'telemovel')}`,
    '',
    valor(f, 'mensagem'),
  ],
};

const ROTULOS = { modelo: 'o modelo', nome: 'o nome', telemovel: 'o telemóvel', data: 'o dia', assunto: 'o assunto', mensagem: 'a mensagem' };

export function iniciarFormularios() {
  $$('[data-formulario-zap]').forEach((form) => {
    const tipo = form.dataset.formularioZap;
    const erro = $('[data-formulario-erro]', form);
    const numero = new URL(form.action).pathname.replace(/\D/g, '');
    const selectModelo = form.elements.modelo;

    // ?modelo=450mt vindo das páginas de modelo
    const pedido = new URLSearchParams(location.search).get('modelo');
    if (selectModelo && pedido && [...selectModelo.options].some((o) => o.value === pedido)) selectModelo.value = pedido;

    // Pré-visualização do modelo escolhido (test ride)
    const previa = $('[data-pre-visualizacao]');
    const mostrarPrevia = () => {
      if (!previa || !selectModelo) return;
      const opcao = selectModelo.selectedOptions[0];
      previa.hidden = !opcao?.value;
      if (!opcao?.value) return;
      const imagem = $('img', previa);
      imagem.src = url(opcao.dataset.img);
      imagem.alt = opcao.textContent;
      $('figcaption', previa).textContent = opcao.textContent;
    };
    selectModelo?.addEventListener('change', mostrarPrevia);
    mostrarPrevia();

    const data = $('[data-data-minima]', form);
    if (data) data.min = hojeISO();

    form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true' && e.target.value.trim()) e.target.removeAttribute('aria-invalid'); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalidos = $$('[required]', form).filter((c) => !c.value.trim());
      const telefone = form.elements.telemovel;
      if (telefone?.value.trim() && telefone.value.replace(/\D/g, '').length < 9) invalidos.push(telefone);
      $$('[aria-invalid]', form).forEach((c) => c.removeAttribute('aria-invalid'));
      if (invalidos.length) {
        invalidos.forEach((c) => c.setAttribute('aria-invalid', 'true'));
        const nomes = [...new Set(invalidos.map((c) => ROTULOS[c.name] || c.name))];
        erro.textContent = `Falta preencher ${nomes.join(', ').replace(/, ([^,]*)$/, ' e $1')}.`;
        if (invalidos.includes(telefone) && telefone.value.trim()) erro.textContent = 'Verifica o número de telemóvel (pelo menos 9 dígitos).';
        erro.hidden = false;
        invalidos[0].focus();
        return;
      }
      erro.hidden = true;
      const texto = MENSAGENS[tipo](form).join('\n');
      const link = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
      const janela = window.open(link, '_blank');
      if (janela) janela.opener = null;
      else location.href = link;
    });
  });
}
