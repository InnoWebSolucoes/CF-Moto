// A marca: diapositivos da história com cursor circular que indica o sentido (anterior/seguinte).
import { $, $$, gsap, ponteiroFino } from '../lib/movimento.js';

export function iniciarMarcos() {
  const sec = $('[data-marcos]');
  if (!sec) return;
  const marcos = $$('[data-marco]', sec);
  const contador = $('[data-marcos-atual]', sec);
  const cursor = $('[data-marcos-cursor]', sec);
  let atual = 0;

  const ir = (i) => {
    atual = (i + marcos.length) % marcos.length;
    marcos.forEach((m, k) => { m.classList.toggle('ativo', k === atual); m.setAttribute('aria-hidden', String(k !== atual)); });
    contador.textContent = String(atual + 1).padStart(2, '0');
  };
  $('[data-marcos-ant]', sec).addEventListener('click', (e) => { e.stopPropagation(); ir(atual - 1); });
  $('[data-marcos-seg]', sec).addEventListener('click', (e) => { e.stopPropagation(); ir(atual + 1); });

  if (!ponteiroFino) return;
  // Clique em qualquer ponto: metade esquerda recua, metade direita avança
  const naEsquerda = (e) => e.clientX < sec.getBoundingClientRect().left + sec.offsetWidth / 2;
  sec.addEventListener('click', (e) => ir(atual + (naEsquerda(e) ? -1 : 1)));
  const xPara = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yPara = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  sec.addEventListener('pointermove', (e) => {
    const r = sec.getBoundingClientRect();
    xPara(e.clientX - r.left - 28);
    yPara(e.clientY - r.top - 28);
    cursor.classList.toggle('esquerda', naEsquerda(e));
  });
  sec.addEventListener('pointerenter', () => cursor.classList.add('visivel'));
  sec.addEventListener('pointerleave', () => cursor.classList.remove('visivel'));
}
