# CFMOTO Angola: website

The first website for CFMOTO Angola, the official CFMOTO distributor in Angola (showroom at Talatona Shopping, Piso 0, Luanda), built by Innoweb. Everything the visitor sees is in European/Angolan Portuguese (`pt-AO`).

- **Layout and motion** follow the structure of [us.cowboy.com](https://us.cowboy.com/): full-bleed video heroes, a model showcase with a segmented toggle, pinned scroll sections, a mega menu with product cutouts, and a dark product sub-nav. The code is our own (GSAP + ScrollTrigger + Lenis); no Cowboy code, copy or images are used.
- **Content** (menu tabs, range, specs, images) comes from the official CFMOTO Portugal site [cf-moto.pt](https://cf-moto.pt/).
- **Client details and photos** come from [@cfmoto.angola](https://www.instagram.com/cfmoto.angola/) and the Talatona Shopping store directory.

## Run it

```bash
npm install
npm run dev        # http://localhost:5181/cfmoto/
npm run build      # static build in dist/cfmoto/
npm run preview    # serves the build
```

| Page | URL | |
|---|---|---|
| Home | `/cfmoto/` | Video hero, model showcases, brand, tech list, community, test ride, slides |
| Range | `/cfmoto/motociclos/`, `/atv/`, `/utv/`, `/ssv/` | Video hero, family filter (`#naked`, `#adventure`…), model grid |
| Model | `/cfmoto/modelos/<slug>/` | 47 pages, one per model |
| Test ride | `/cfmoto/test-ride/?modelo=<slug>` | Form that opens WhatsApp with the request written out |
| Contacts | `/cfmoto/contactos/` | Showroom, map, contact form (also via WhatsApp) |
| Brand | `/cfmoto/sobre/` | CFMOTO history and CFMOTO Angola |

## How it is built

- Vite (multi-page), vanilla JS modules, GSAP (ScrollTrigger, CustomEase) and Lenis. No framework.
- **Pages are generated.** `scripts/gerar-paginas.js` turns the templates in `src/paginas/` plus the data in `src/dados/` into real HTML files at the project root (`index.html`, `motociclos/`, `modelos/<slug>/`…). Vite builds those. The generator runs automatically when Vite starts and again whenever something in `src/paginas`, `src/dados` or `src/assets` changes. The generated HTML is git-ignored: **edit the templates, never the generated files.**
- `src/js/main.js` is the single entry point. Each module in `src/js/componentes/` looks for its `data-*` hooks and does nothing if they are absent.
- Styles: `src/css/tokens.css` (colours, type scale, spacing, easing) → `base.css` → `cabecalho.css` → `secoes.css` → `paginas.css`.
- Fonts: Inter Tight (display) and Inter (text), from Google Fonts.

### Base path

The site is built for `innoweb.agency/cfmoto/` (`base: '/cfmoto/'`). In JavaScript, build paths with `url()` from `src/js/lib/base.js`, never a bare `"/img/..."`. Root-absolute paths in the generated HTML are prefixed at build time by the `cfmoto-prefixar-html` plugin in `vite.config.js`.

For its own domain: `BASE=/ npm run build` (output goes to `dist/`), and drop the redirect in `vercel.json`.

### Data

- `src/dados/modelos.json`: 47 models (CFORCE 520S left out because cf-moto.pt no longer lists it). Name, range, family, tagline, description, headline numbers, highlights, feature cards, full spec table by section, colours with images, gallery and YouTube id.
- `src/dados/site.js`: contact details, social links, ranges/families and brand facts.
- `public/img/modelos/<slug>/`: WebP cutouts (`recorte`, `cor-*`), lifestyle (`ambiente`), feature (`recurso-*`) and gallery (`galeria-*`) images.
- `public/img/angola/`: client photos from Instagram and the mall directory.
- `public/media/video/`: hero videos (H.264, no audio, faststart) with poster frames.

No prices are shown. Portuguese prices don't apply in Angola, so every model has "Preço sob consulta" and a "Pedir proposta" WhatsApp button.

### Forms

There is no backend. The test ride and contact forms validate, compose a message and open `wa.me/244928682029` with it, which is how the client already works ("+ Informações (Zap)" in their Instagram bio). To switch to email or a CRM later, replace the `submit` handler in `src/js/componentes/formulario-zap.js`.

### Brand facts (A marca)

The brand page (`src/paginas/sobre.js`) and the brand facts on the home page use sourced figures only. The main sources are:
- CFMOTO's 2025 annual report (cninfo.com.cn, filed 16 April 2026), for staff, R&D, patents, outlets, sales and export share.
- cfmoto.com (company overview, timeline and news).
- FIM and MotoGP, for the 2024 Moto3 title.
- Yamaha Motor, for the 2023 joint venture.

Founder: Lai Guogui, not "Lai Guoqiang" as some press writes. When updating numbers, keep the year they refer to.

## To confirm with the client

- Opening hours (10h–22h every day comes from the mall's store directory, not the client).
- An email address and the legal company name (neither is public).
- Which models are actually sold/stocked in Angola. The range currently mirrors CFMOTO Portugal.
- That they offer test rides, and on which models. The site promotes them everywhere, as cf-moto.pt does.
- Their exact status (official distributor or importer, and company name) before launch. The site says "Representante oficial", which matches their Instagram bio ("Oficial da CFMOTO em Angola") and CFMOTO's global distributor list.
- Permission to use the reposted CFMOTO marketing photos from their Instagram, and any newer photos of the team, deliveries and events.
- Domain. None exists yet. CFMOTO's global distributor list links Angola to the mall's website.
