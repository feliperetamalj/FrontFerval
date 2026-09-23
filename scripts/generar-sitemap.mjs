/**
 * Arma el sitemap a partir de las rutas reales del sitio.
 *
 * Antes era un archivo escrito a mano en `public/`, y ya se habia desfasado:
 * listaba proyectos con una fecha de septiembre que no correspondia y no
 * incluia las paginas legales. Al derivarlo de `metadatos.js` no hay forma de
 * que se separe del sitio: si un proyecto entra o sale de `PROYECTOS`, el
 * sitemap lo refleja en el siguiente build.
 *
 * `lastmod` sale del ultimo commit del repositorio, que es cuando el contenido
 * cambio de verdad. Usar la fecha del build haria que cada despliegue declarara
 * todo el sitio como modificado, que es justo lo que ese campo intenta evitar.
 *
 * Se ejecuta solo, despues de `vite build`.
 */

import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

function ultimaModificacion() {
  try {
    return execSync('git log -1 --format=%cs', { cwd: RAIZ, encoding: 'utf8' }).trim();
  } catch {
    // Un clon sin historial de git (o un build en un tarball) no es motivo
    // para romper el despliegue: se cae a la fecha del build.
    return new Date().toISOString().slice(0, 10);
  }
}

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' });
const { SITIO, rutasPublicas } = await vite.ssrLoadModule('/src/data/metadatos.js');
await vite.close();

const fecha = ultimaModificacion();

const urls = rutasPublicas()
  .map(({ ruta, prioridad }) => {
    const loc = `${SITIO.dominio}${ruta === '/' ? '/' : ruta}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${fecha}</lastmod>`,
      `    <priority>${prioridad}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(join(RAIZ, 'dist/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml con ${rutasPublicas().length} rutas (lastmod ${fecha})`);
