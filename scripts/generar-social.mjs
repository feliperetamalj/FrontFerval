/**
 * Genera los recursos de marca que no forman parte del bundle de React:
 *
 *   public/og-image.jpg          1200x630  · tarjeta para WhatsApp y redes
 *   public/og/<slug>.jpg         1200x630  · una tarjeta por proyecto
 *   public/apple-touch-icon.png   180x180  · icono en pantalla de inicio iOS
 *   public/favicon.ico            16/32/48 · el que piden los navegadores por defecto
 *   public/icon-192.png, icon-512.png      · Android y la pantalla de inicio
 *   public/site.webmanifest                · nombre y colores al instalar el sitio
 *
 * Se ejecuta con `npm run social`. Hay que volver a correrlo si cambia el
 * logotipo, la fotografia de portada o los datos de un proyecto.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createServer } from 'vite';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const ANCHO = 1200;
const ALTO = 630;

/* --- Paleta de marca (misma que src/styles/tokens.css) ------------------- */
const CYAN = '#00B5EC';
const GRAFITO = '#2C292F';

/* ------------------------------------------------------------------------ */
/* 1 · Tarjeta Open Graph                                                    */
/* ------------------------------------------------------------------------ */

const fondo = await sharp(join(RAIZ, 'src/assets/proyectos/_general/hero-principal.webp'))
  .resize(ANCHO, ALTO, { fit: 'cover', position: 'attention' })
  .toBuffer();

/**
 * Velo degradado. Se oscurece hacia la izquierda, que es donde va el texto,
 * y deja respirar la fotografia por el costado derecho.
 */
const velo = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="lateral" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#131215" stop-opacity="0.94"/>
      <stop offset="55%" stop-color="#131215" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#131215" stop-opacity="0.34"/>
    </linearGradient>
  </defs>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#lateral)"/>
</svg>`);

/**
 * Capa de texto. El tipo se resuelve con la grotesca del sistema: el
 * renderizador SVG de sharp no carga @font-face embebido, y la identidad la
 * aporta el logotipo real que se compone encima.
 */
const PILA = 'Helvetica Neue, Helvetica, Arial, sans-serif';

/** Un `&` o un `<` sueltos rompen el SVG que interpreta sharp. */
const escapar = (texto) =>
  String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const texto = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <!-- Etiqueta superior -->
  <path d="M248 196 h26 v16 h-10 v10 h-16 z" fill="${CYAN}"/>
  <text x="292" y="216" font-family="${PILA}" font-size="19" font-weight="600"
        letter-spacing="3.4" fill="${CYAN}">TALCA · REGIÓN DEL MAULE</text>

  <!-- Titular -->
  <text x="248" y="304" font-family="${PILA}" font-size="62" font-weight="700"
        letter-spacing="-1.6" fill="#FFFFFF">Casas y departamentos</text>
  <text x="248" y="374" font-family="${PILA}" font-size="62" font-weight="700"
        letter-spacing="-1.6" fill="#FFFFFF">en el Maule.</text>

  <!-- Bajada -->
  <text x="248" y="432" font-family="${PILA}" font-size="26" font-weight="400"
        fill="#D6D4DA">Más de una década construyendo hogares.</text>

  <!-- Datos duros -->
  <rect x="248" y="470" width="270" height="52" rx="26" fill="${CYAN}"/>
  <text x="278" y="503" font-family="${PILA}" font-size="24" font-weight="700"
        fill="${GRAFITO}">Desde UF 1.550</text>
  <text x="546" y="503" font-family="${PILA}" font-size="24" font-weight="500"
        fill="#FFFFFF">Subsidio DS19</text>

  <!-- Filete inferior de marca -->
  <rect x="0" y="${ALTO - 10}" width="${ANCHO}" height="10" fill="${CYAN}"/>
</svg>`);

/* El logotipo original de Ferval, sin redibujar. Vive dentro de src/assets
   para que el script funcione en un clon limpio del repositorio. */
const logo = await sharp(join(RAIZ, 'src/assets/brand/logo-ferval.png'))
  .resize(132, 132)
  .toBuffer();

await sharp(fondo)
  .composite([
    { input: velo, top: 0, left: 0 },
    { input: texto, top: 0, left: 0 },
    { input: logo, top: 92, left: 84 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(RAIZ, 'public/og-image.jpg'));

/* ------------------------------------------------------------------------ */
/* 2 · Icono para iOS                                                        */
/* ------------------------------------------------------------------------ */

/* A 180 px el nombre dentro del logotipo si se lee, asi que el icono usa el
   arte oficial completo y no el isotipo reducido del favicon. El `extract`
   descarta el margen transparente de 12 px del archivo original. */
await sharp(join(RAIZ, 'src/assets/brand/logo-ferval.png'))
  .extract({ left: 12, top: 12, width: 476, height: 476 })
  .resize(180, 180)
  .png()
  .toFile(join(RAIZ, 'public/apple-touch-icon.png'));

/* ------------------------------------------------------------------------ */
/* 3 · Una tarjeta por proyecto                                              */
/* ------------------------------------------------------------------------ */

/*
  Sin esto, compartir cualquier ficha por WhatsApp mostraba la misma foto y el
  mismo titulo que la portada: nueve enlaces distintos con una sola tarjeta.
  Como todos los CTA del sitio llevan a WhatsApp, era el canal donde peor se
  veia. Cada proyecto pasa a tener la suya, con su foto, su comuna y su precio.

  Los datos se leen del propio `proyectos.js` a traves de Vite, porque ese
  modulo resuelve sus imagenes con `import.meta.glob` y no corre en Node pelado.
*/
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' });
const { PROYECTOS } = await vite.ssrLoadModule('/src/data/proyectos.js');
await vite.close();

await mkdir(join(RAIZ, 'public/og'), { recursive: true });

/** Corta en el ultimo espacio: cortar por caracter dejaba "juegos infantile". */
function resumir(texto, maximo) {
  if (texto.length <= maximo) return texto;
  const corte = texto.slice(0, maximo);
  return `${corte.slice(0, corte.lastIndexOf(' '))}…`;
}

/** Parte el titulo en lineas para que un nombre largo no se salga del lienzo. */
function enLineas(texto, maximo) {
  const lineas = [];
  let actual = '';
  for (const palabra of texto.split(' ')) {
    if ((`${actual} ${palabra}`).trim().length > maximo && actual) {
      lineas.push(actual);
      actual = palabra;
    } else {
      actual = (`${actual} ${palabra}`).trim();
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

for (const proyecto of PROYECTOS) {
  const foto = await sharp(join(RAIZ, `src/assets/proyectos/${proyecto.slug}/hero.webp`))
    .resize(ANCHO, ALTO, { fit: 'cover', position: 'attention' })
    .toBuffer();

  const lineas = enLineas(proyecto.nombre, 18);
  const baseY = 300 - (lineas.length - 1) * 34;
  const precio = proyecto.desdeUF
    ? `DESDE UF ${proyecto.desdeUF.toLocaleString('es-CL')}`
    : 'PRECIO A CONSULTAR';

  const capa = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <text x="248" y="216" font-family="${PILA}" font-size="19" font-weight="600"
        letter-spacing="3.4" fill="${CYAN}">${escapar(proyecto.comuna.toUpperCase())} · ${escapar(proyecto.region.toUpperCase())}</text>

  ${lineas.map((linea, i) => `<text x="248" y="${baseY + i * 68}" font-family="${PILA}" font-size="58"
        font-weight="700" letter-spacing="-1.4" fill="#FFFFFF">${escapar(linea)}</text>`).join('')}

  <text x="248" y="${baseY + lineas.length * 68 + 30}" font-family="${PILA}" font-size="25" font-weight="400"
        fill="#D6D4DA">${escapar(resumir(proyecto.resumen, 62))}</text>

  <rect x="248" y="${ALTO - 132}" width="${precio.length * 14 + 60}" height="52" rx="26" fill="${CYAN}"/>
  <text x="278" y="${ALTO - 98}" font-family="${PILA}" font-size="24" font-weight="700"
        fill="${GRAFITO}">${escapar(precio)}</text>

  <rect x="0" y="${ALTO - 10}" width="${ANCHO}" height="10" fill="${CYAN}"/>
</svg>`);

  await sharp(foto)
    .composite([
      { input: velo, top: 0, left: 0 },
      { input: capa, top: 0, left: 0 },
      { input: logo, top: 92, left: 84 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(RAIZ, `public/og/${proyecto.slug}.jpg`));
}

/* ------------------------------------------------------------------------ */
/* 4 · Favicons                                                              */
/* ------------------------------------------------------------------------ */

/*
  Dos artes distintos a proposito. Bajo 48 px el nombre dentro del logotipo se
  convierte en una mancha gris, asi que ahi va el isotipo solo (marco, cuadro y
  muesca). De 180 px para arriba el nombre si se lee y corresponde el arte
  oficial completo.
*/
const isotipo = await readFile(join(RAIZ, 'public/favicon.svg'));
const oficial = join(RAIZ, 'src/assets/brand/logo-ferval.png');

const pequeno = (lado) => sharp(isotipo, { density: 400 }).resize(lado, lado).png().toBuffer();
const grande = (lado) =>
  sharp(oficial).extract({ left: 12, top: 12, width: 476, height: 476 }).resize(lado, lado).png().toBuffer();

/**
 * Empaqueta varios PNG en un .ico.
 *
 * sharp no exporta ese formato y no valia la pena sumar una dependencia: el
 * contenedor es una cabecera de 6 bytes, una entrada de 16 por imagen y los
 * PNG pegados al final. Sigue haciendo falta porque los navegadores piden
 * /favicon.ico por su cuenta aunque el HTML declare un SVG.
 */
function empaquetarIco(imagenes) {
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0);                 // reservado
  cabecera.writeUInt16LE(1, 2);                 // 1 = icono
  cabecera.writeUInt16LE(imagenes.length, 4);

  let desplazamiento = 6 + imagenes.length * 16;
  const entradas = imagenes.map(({ lado, datos }) => {
    const entrada = Buffer.alloc(16);
    entrada.writeUInt8(lado >= 256 ? 0 : lado, 0);   // 0 significa 256
    entrada.writeUInt8(lado >= 256 ? 0 : lado, 1);
    entrada.writeUInt16LE(1, 4);                     // planos
    entrada.writeUInt16LE(32, 6);                    // bits por pixel
    entrada.writeUInt32LE(datos.length, 8);
    entrada.writeUInt32LE(desplazamiento, 12);
    desplazamiento += datos.length;
    return entrada;
  });

  return Buffer.concat([cabecera, ...entradas, ...imagenes.map((i) => i.datos)]);
}

const LADOS_ICO = [16, 32, 48];
await writeFile(
  join(RAIZ, 'public/favicon.ico'),
  empaquetarIco(await Promise.all(LADOS_ICO.map(async (lado) => ({ lado, datos: await pequeno(lado) })))),
);

await writeFile(join(RAIZ, 'public/icon-192.png'), await grande(192));
await writeFile(join(RAIZ, 'public/icon-512.png'), await grande(512));

await writeFile(
  join(RAIZ, 'public/site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'Inmobiliaria Ferval',
      short_name: 'Ferval',
      description: 'Casas y departamentos en la Región del Maule, con subsidio DS19.',
      start_url: '/',
      display: 'standalone',
      background_color: '#FAFAFB',
      theme_color: GRAFITO,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  )}\n`,
);

console.log(
  `og-image.jpg, ${PROYECTOS.length} tarjetas en public/og/, favicon.ico (${LADOS_ICO.join('/')}), ` +
    'icon-192, icon-512, site.webmanifest y apple-touch-icon.png generados',
);
