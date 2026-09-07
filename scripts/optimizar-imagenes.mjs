/**
 * Pipeline de optimizacion de imagenes.
 *
 * Convierte los JPG/PNG originales descargados del sitio antiguo a WebP,
 * redimensionando segun el rol de cada imagen. Se ejecuta una sola vez
 * (o cuando se agreguen fotos nuevas) con:
 *
 *     npm run imagenes
 *
 * Lee de   src/assets/proyectos/<slug>/*.{jpg,png}
 * Escribe  src/assets/proyectos/<slug>/*.webp  y borra el original.
 *
 * Despues genera las variantes reducidas de cada `hero.webp`, que son las que
 * consumen las tarjetas del portafolio. Es idempotente: se puede volver a
 * correr sobre un arbol ya convertido.
 */

import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'proyectos');

/** Ancho maximo y calidad segun el rol que cumple la imagen. */
const PERFILES = {
  hero: { ancho: 1920, calidad: 74 },
  galeria: { ancho: 1280, calidad: 72 },
  logo: { ancho: 360, calidad: 88 },
};

/** Deduce el perfil a partir del nombre del archivo. */
function perfilDe(nombre) {
  if (nombre.startsWith('hero') || nombre.startsWith('nosotros') ||
      nombre.startsWith('subsidio') || nombre.startsWith('maule')) return PERFILES.hero;
  if (nombre.startsWith('logo')) return PERFILES.logo;
  return PERFILES.galeria;
}

/** Recorre recursivamente un directorio devolviendo rutas de archivo. */
async function* recorrer(dir) {
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) yield* recorrer(ruta);
    else yield ruta;
  }
}

let entradaTotal = 0;
let salidaTotal = 0;
let convertidas = 0;

for await (const ruta of recorrer(RAIZ)) {
  const ext = extname(ruta).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const nombre = basename(ruta, ext);
  const { ancho, calidad } = perfilDe(nombre);
  const destino = join(dirname(ruta), `${nombre}.webp`);

  const { size: bytesEntrada } = await stat(ruta);

  // Los logos de proyecto son PNG con transparencia: hay que preservarla.
  await sharp(ruta)
    .resize({ width: ancho, withoutEnlargement: true })
    .webp({ quality: calidad, effort: 6, alphaQuality: 90 })
    .toFile(destino);

  const { size: bytesSalida } = await stat(destino);
  await unlink(ruta);

  entradaTotal += bytesEntrada;
  salidaTotal += bytesSalida;
  convertidas += 1;
}

/* ------------------------------------------------------------------------ */
/* Segunda pasada · variantes de `hero` para las tarjetas                    */
/* ------------------------------------------------------------------------ */

/**
 * Las tarjetas del portafolio muestran el hero en una celda de entre 320 y
 * 850 px, pero `hero.webp` mide 1920: la portada bajaba 2,3 MB y las tarjetas
 * mas pesadas se quedaban en gris hasta terminar la descarga. Estas variantes
 * alimentan el `srcset`, de modo que el navegador pida solo lo que va a pintar.
 *
 * 1920 no se genera aqui: es el propio `hero.webp`, que sigue siendo el ultimo
 * escalon del `srcset` y la portada de la ficha de proyecto.
 */
const ANCHOS_TARJETA = [480, 960, 1440];

let variantes = 0;
let bytesVariantes = 0;

for await (const ruta of recorrer(RAIZ)) {
  if (basename(ruta) !== 'hero.webp') continue;

  const meta = await sharp(ruta).metadata();

  for (const ancho of ANCHOS_TARJETA) {
    // Sin ampliar: si el original ya es mas chico, esa variante no existe y el
    // `srcset` simplemente la omite.
    if (meta.width <= ancho) continue;

    const destino = join(dirname(ruta), `hero-${ancho}.webp`);
    await sharp(ruta)
      .resize({ width: ancho })
      .webp({ quality: PERFILES.hero.calidad, effort: 6 })
      .toFile(destino);

    bytesVariantes += (await stat(destino)).size;
    variantes += 1;
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
const ahorro = entradaTotal ? Math.round((1 - salidaTotal / entradaTotal) * 100) : 0;

if (convertidas) {
  console.log(
    `${convertidas} imagenes · ${mb(entradaTotal)} MB -> ${mb(salidaTotal)} MB (-${ahorro}%)`,
  );
}
console.log(`${variantes} variantes de tarjeta · ${mb(bytesVariantes)} MB`);
