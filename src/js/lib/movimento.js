// GSAP, ScrollTrigger e Lenis partilhados por todos os módulos.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, CustomEase);
// Curva principal do modelo de referência
CustomEase.create('cfmoto', '0.49, 0.025, 0.685, 1');

export const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const ponteiroFino = matchMedia('(hover: hover) and (pointer: fine)').matches;
document.documentElement.classList.toggle('no-motion', reduzido);

export const lenis = new Lenis({ lerp: reduzido ? 1 : 0.1, smoothWheel: !reduzido, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// Bloqueia a rolagem da página (menus e diálogos abertos). Conta pedidos para não desbloquear cedo demais.
let bloqueios = 0;
export const bloquearRolagem = (v) => {
  bloqueios = Math.max(0, bloqueios + (v ? 1 : -1));
  if (bloqueios) lenis.stop(); else lenis.start();
};

export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];
export const limitar = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export { gsap, ScrollTrigger };
