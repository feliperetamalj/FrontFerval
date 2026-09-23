/**
 * Escribe un HTML real por ruta, con sus propios metadatos.
 *
 * El sitio sigue siendo una SPA: React toma el control apenas carga. Lo que
 * cambia es el primer HTML que recibe cada URL. Importa por dos motivos:
 *
 *   · Los robots de WhatsApp, Facebook y X no ejecutan JavaScript. Sin esto,
 *     compartir la ficha de cualquier proyecto mostraba la tarjeta de la
 *     portada, con su titulo y su foto. Como todos los CTA del sitio llevan a
 *     WhatsApp, era justo el canal que peor se veia.
 *   · Google renderiza JavaScript, pero lo hace en una segunda pasada y con
 *     retraso. Con el titulo y la bajada en el HTML inicial, indexa a la
 *     primera.
 *
 * Vercel sirve el archivo estatico antes de aplicar las reescrituras, asi que
 * `/proyecto/rebeca-matte/index.html` gana sobre el comodin de la SPA sin
 * tocar nada mas en vercel.json.
 *
 * Se ejecuta solo, despues de `vite build`.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');

/**
 * `metadatos.js` depende de `proyectos.js`, que resuelve sus imagenes con
 * `import.meta.glob`. Eso solo existe dentro de Vite, no en Node pelado, asi
 * que se carga el modulo a traves del propio Vite en lugar de duplicar los
 * datos en un archivo aparte que despues se desincroniza.
 */
async function cargarMetadatos() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' });
  try {
    return await vite.ssrLoadModule('/src/data/metadatos.js');
  } finally {
    await vite.close();
  }
}

/** Reemplaza el valor de una etiqueta ya presente en la plantilla. */
function fijar(html, patron, valor) {
  const escapado = valor.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  if (!patron.test(html)) throw new Error(`La plantilla no trae la etiqueta ${patron}`);
  return html.replace(patron, (coincidencia) => coincidencia.replace(/content="[^"]*"|href="[^"]*"/, (attr) =>
    `${attr.startsWith('content') ? 'content' : 'href'}="${escapado}"`));
}

function aplicar(plantilla, meta) {
  let html = plantilla;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.titulo.replace(/</g, '&lt;')}</title>`);
  html = fijar(html, /<meta\s+name="description"[\s\S]*?\/>/, meta.descripcion);
  html = fijar(html, /<link rel="canonical"[^>]*\/>/, meta.canonical);
  html = fijar(html, /<meta property="og:title"[^>]*\/>/, meta.titulo);
  html = fijar(html, /<meta\s+property="og:description"[\s\S]*?\/>/, meta.descripcion);
  html = fijar(html, /<meta property="og:url"[^>]*\/>/, meta.canonical);
  html = fijar(html, /<meta property="og:image"[^>]*\/>/, meta.imagen);
  html = fijar(html, /<meta property="og:type"[^>]*\/>/, meta.tipo);

  if (meta.noindex) {
    html = html.replace('</head>', '  <meta name="robots" content="noindex, follow" />\n  </head>');
  }
  return html;
}

const { metadatosDe, rutasAPrerenderizar } = await cargarMetadatos();
const plantilla = await readFile(join(DIST, 'index.html'), 'utf8');

let escritos = 0;
for (const ruta of rutasAPrerenderizar()) {
  const html = aplicar(plantilla, metadatosDe(ruta));
  const destino = ruta === '/' ? join(DIST, 'index.html') : join(DIST, ruta.slice(1), 'index.html');
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, html, 'utf8');
  escritos += 1;
}

/* 404.html: Vercel lo sirve tal cual cuando ninguna ruta calza. */
await writeFile(join(DIST, '404.html'), aplicar(plantilla, metadatosDe('/404')), 'utf8');

console.log(`${escritos} rutas prerenderizadas + 404.html`);
