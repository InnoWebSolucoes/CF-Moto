// Lista de todas as páginas do site. Cada uma devolve { caminho, html }.
import { paginaInicio } from './inicio.js';
import { paginasCategoria } from './categoria.js';
import { paginasModelo } from './modelo.js';
import { paginasFormulario } from './formularios.js';
import { paginaSobre } from './sobre.js';

// Pastas na raiz do projeto que o gerador apaga e volta a escrever (estão no .gitignore)
export const PASTAS_GERADAS = ['index.html', 'motociclos', 'atv', 'utv', 'ssv', 'modelos', 'test-ride', 'contactos', 'sobre'];

export const todasAsPaginas = () => [
  paginaInicio(),
  ...paginasCategoria(),
  ...paginasModelo(),
  ...paginasFormulario(),
  paginaSobre(),
];
