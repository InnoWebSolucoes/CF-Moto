// Entrada única de todas as páginas. Cada módulo procura os seus elementos e sai se não existirem.
import { ScrollTrigger } from './lib/movimento.js';
import { iniciarCabecalho } from './componentes/cabecalho.js';
import { iniciarAncoras, iniciarPreenchimento, iniciarRevelacoes, iniciarVideos } from './componentes/efeitos.js';
import {
  iniciarDiapositivos, iniciarFaixas, iniciarFlipbooks, iniciarMosaico, iniciarPiramide, iniciarTech, iniciarVitrines,
} from './componentes/secoes.js';
import { iniciarCarrosseis, iniciarCores, iniciarDialogos, iniciarSubnav, iniciarYoutube } from './componentes/modelo.js';
import { iniciarFiltro } from './componentes/gama.js';
import { iniciarFormularios } from './componentes/formulario-zap.js';
import { iniciarMarcos } from './componentes/marcos.js';
import { iniciarContadores, iniciarLinhaTempo } from './componentes/sobre.js';

iniciarCabecalho();
iniciarAncoras();
iniciarPreenchimento();
iniciarVideos();

iniciarVitrines();
iniciarFaixas();
iniciarPiramide();
iniciarTech();
iniciarMosaico();
iniciarFlipbooks();
iniciarDiapositivos();

iniciarSubnav();
iniciarCores();
iniciarCarrosseis();
iniciarDialogos();
iniciarYoutube();

iniciarFiltro();
iniciarFormularios();
iniciarMarcos();
iniciarContadores();
iniciarLinhaTempo();

// As revelações vêm no fim, depois de os outros módulos mexerem no DOM
iniciarRevelacoes();

// Imagens e tipos de letra mudam alturas: recalcula os gatilhos quando tudo carregar
addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
