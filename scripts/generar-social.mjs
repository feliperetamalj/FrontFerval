/**
 * Genera los recursos de marca que no forman parte del bundle de React:
 *
 *   public/og-image.jpg        1200x630  · tarjeta para WhatsApp y redes
 *   public/apple-touch-icon.png 180x180  · icono en pantalla de inicio iOS
 *
 * Se ejecuta con `npm run social`. Solo hay que volver a correrlo si cambia
 * el logotipo o la fotografia de portada.
 */

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

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

console.log('og-image.jpg (1200x630) y apple-touch-icon.png (180x180) generados');
