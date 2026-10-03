// Dados do concessionário e da navegação.
// Fontes: Instagram @cfmoto.angola, diretório de lojas do Talatona Shopping, cf-moto.pt (outubro 2026).
// Por confirmar com o cliente: horário (vem do diretório do centro comercial), e-mail e nome da empresa.

export const CONTACTO = {
  marca: 'CFMOTO Angola',
  telefone: '+244 928 682 029',
  telefoneLink: 'tel:+244928682029',
  whatsapp: '244928682029',
  loja: 'Talatona Shopping',
  piso: 'Piso 0',
  morada: ['Talatona Shopping, Piso 0', 'Av. Talatona, Talatona', 'Luanda, Angola'],
  horario: [{ dias: 'Todos os dias', horas: 'das 10h às 22h' }],
  coordenadas: { lat: -8.9112, lng: 13.2022 },
  mapa: 'https://www.google.com/maps/search/?api=1&query=Talatona+Shopping+Luanda',
  mapaEmbed: 'https://www.google.com/maps?q=Talatona%20Shopping%2C%20Luanda&z=15&output=embed',
};

export const REDES = [
  { nome: 'Instagram', url: 'https://www.instagram.com/cfmoto.angola/', utilizador: '@cfmoto.angola' },
  { nome: 'Facebook', url: 'https://www.facebook.com/p/Cfmoto-Angola-100083036425382/', utilizador: 'Cfmoto Angola' },
  { nome: 'TikTok', url: 'https://www.tiktok.com/@cfmotoangola', utilizador: '@cfmotoangola' },
];

// Link de WhatsApp com mensagem pré-preenchida
export const zap = (mensagem = 'Olá CFMOTO Angola! Gostaria de mais informações.') =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensagem)}`;

// Gamas, pela ordem do menu do cf-moto.pt
export const CATEGORIAS = [
  {
    id: 'motociclos',
    nome: 'Motociclos',
    menu: 'Motociclos',
    titulo: 'Motociclos',
    slogan: 'Define o teu caminho.',
    intro: 'Da cidade às picadas, há uma CFMOTO para cada estrada. Aventura, naked, clássicas, turismo e desportivas, com tecnologia de série e o motor certo para ti.',
    video: '/media/video/home-hero-motociclos.mp4',
    poster: '/media/video/home-hero-motociclos.jpg',
    banner: '/media/banners/banner-motociclos-800mt.webp',
    familias: [
      { id: 'Adventure', nome: 'Adventure', descricao: 'Feitas para longas viagens e para o que vem depois do alcatrão.' },
      { id: 'Naked', nome: 'Naked', descricao: 'Ágeis, diretas e com carácter para o dia a dia na cidade.' },
      { id: 'Classic', nome: 'Classic', descricao: 'Estilo intemporal com mecânica moderna.' },
      { id: 'Tourer', nome: 'Tourer', descricao: 'Conforto e proteção para fazer quilómetros.' },
      { id: 'Sport', nome: 'Sport', descricao: 'Para os amantes da velocidade e das curvas.' },
    ],
  },
  {
    id: 'atv',
    nome: 'ATV',
    menu: 'ATV',
    titulo: 'ATV CFORCE',
    slogan: 'Lazer ou trabalho.',
    intro: 'Moto-4 robustas para a fazenda, a obra ou o fim de semana. Tração integral, guincho e capacidade de carga para qualquer terreno.',
    video: '/media/video/gama-atv.mp4',
    poster: '/media/video/gama-atv.jpg',
    banner: '/media/banners/banner-atv-cforce-1000-overland.webp',
  },
  {
    id: 'utv',
    nome: 'UTV',
    menu: 'UTV',
    titulo: 'UTV UFORCE',
    slogan: 'Feitos para trabalhar.',
    intro: 'Utilitários lado a lado com caixa de carga, reboque e lugar para a equipa. Prontos para a fazenda, a mina ou a manutenção de grandes espaços.',
    video: '/media/video/gama-utv.mp4',
    poster: '/media/video/gama-utv.jpg',
    banner: '/media/banners/banner-utv-u10-pro.webp',
  },
  {
    id: 'ssv',
    nome: 'SSV',
    menu: 'SSV',
    titulo: 'SSV ZFORCE',
    slogan: 'Desbrava o desconhecido.',
    intro: 'Desportivos lado a lado, de dois ou quatro lugares, com suspensão de longo curso e motor bicilíndrico. Para a areia, a lama e as picadas.',
    video: '/media/video/gama-ssv.mp4',
    poster: '/media/video/gama-ssv.jpg',
    banner: '/media/banners/banner-ssv-z10-4.webp',
  },
];

export const NAV = [
  ...CATEGORIAS.map((c) => ({ rotulo: c.menu, url: `/${c.id}/`, categoria: c.id })),
  { rotulo: 'Test Ride', url: '/test-ride/' },
  { rotulo: 'A marca', url: '/sobre/' },
  { rotulo: 'Contactos', url: '/contactos/' },
];

// Factos da marca. Fontes: relatório anual da CFMOTO de 2025 (cninfo.com.cn, 16/04/2026)
// e cfmoto.com (company overview). Números com o ano a que se referem.
export const MARCA = {
  fundacao: 1989,
  fundador: 'Lai Guogui',
  sede: 'Hangzhou, China',
  paises: 100, // "100+ países e regiões", final de 2025
  pontosVenda: '9.000+', // pontos de venda, final de 2025
  colaboradores: 8738, // final de 2025
  investigacao: 1748, // profissionais de I&D, final de 2025
  patentes: 2119, // patentes válidas, final de 2025
  slogan: 'Experience More Together',
};
