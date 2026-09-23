import { PROYECTOS, CIFRAS } from './proyectos.js';
import { EMPRESA } from './empresa.js';

/**
 * Metadatos de cada ruta: una sola fuente para el cliente y para el build.
 *
 * El sitio es una SPA, y los robots de WhatsApp, Facebook y X no ejecutan
 * JavaScript: leen el HTML tal como llega del servidor. Por eso el titulo y
 * la tarjeta social no pueden depender de React. Este modulo lo consumen
 * tres lados a la vez:
 *
 *   · `Meta` en el cliente, para la navegacion interna y el historial
 *   · `scripts/prerender.mjs`, que escribe un HTML real por ruta
 *   · `scripts/generar-sitemap.mjs`, que arma el sitemap con estas mismas rutas
 *
 * Al agregar una pagina basta sumarla a PAGINAS y aparece en los tres.
 */

export const SITIO = {
  dominio: 'https://fervali.cl',
  nombre: 'Inmobiliaria Ferval',
  locale: 'es_CL',
  imagenPorDefecto: '/og-image.jpg',
};

/** Google corta el titulo cerca de los 60 caracteres y la bajada cerca de 160. */
const LARGO_TITULO = 60;
const LARGO_DESCRIPCION = 160;

/** Bajo esto el resumen deja de aportar y conviene soltar la cola entera. */
const MINIMO_RESUMEN = 40;

/** Recorta en el ultimo espacio para no cortar una palabra por la mitad. */
function recortar(texto, maximo) {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (limpio.length <= maximo) return limpio;
  const corte = limpio.slice(0, maximo - 1);
  return `${corte.slice(0, corte.lastIndexOf(' '))}…`;
}

/** Paginas fijas. Las fichas de proyecto se derivan de PROYECTOS. */
const PAGINAS = {
  '/': {
    titulo: 'Ferval · Casas y departamentos en el Maule',
    descripcion:
      `Inmobiliaria Ferval: ${CIFRAS.proyectos} proyectos en ${CIFRAS.comunas} comunas, ` +
      'desde UF 1.550 con subsidio DS19. Más de una década construyendo en el Maule.',
    prioridad: '1.0',
  },
  '/gracias': {
    titulo: 'Mensaje enviado · Ferval',
    descripcion: 'Recibimos tu consulta. Una ejecutiva de Ferval te contactará a la brevedad.',
    // Es una pagina de paso: no aporta nada en un resultado de busqueda, y
    // ademas indexarla ensucia la medicion de conversiones.
    noindex: true,
  },
  '/privacidad': {
    titulo: 'Política de privacidad · Ferval',
    descripcion:
      'Cómo Inmobiliaria Ferval trata los datos personales que entregas en el sitio, ' +
      'conforme a la Ley 21.719 sobre protección de datos personales.',
    prioridad: '0.3',
  },
  '/terminos': {
    titulo: 'Términos y condiciones · Ferval',
    descripcion:
      'Condiciones de uso del sitio de Inmobiliaria Ferval y alcance de la ' +
      'información publicada sobre precios, planos y proyectos.',
    prioridad: '0.3',
  },
  '/404': {
    titulo: 'Página no encontrada · Ferval',
    descripcion: 'La página que buscas no existe o el proyecto ya se vendió.',
    noindex: true,
  },
};

/**
 * Bajada de una ficha de proyecto.
 *
 * Se arma con lo que decide una busqueda inmobiliaria: que es, donde queda y
 * desde cuanto. El titular se deja fuera a proposito, porque es una frase de
 * posicionamiento y no un dato.
 */
function descripcionProyecto(proyecto) {
  const cabeza = `${proyecto.nombre}, ${proyecto.comuna}.`;
  const precio = proyecto.desdeUF
    ? `Desde UF ${proyecto.desdeUF.toLocaleString('es-CL')}.`
    : 'Precio a consultar.';

  /*
    El precio y el subsidio son el dato que decide el clic, asi que van
    completos o no van: lo que cede espacio es el resumen. Recortar por el
    final dejaba bajadas terminadas en "Desde…" o "Con…", que es justo la
    parte que importaba.
  */
  const armarCon = (cola) => {
    const espacio = LARGO_DESCRIPCION - cabeza.length - cola.length - 2;
    return espacio < MINIMO_RESUMEN ? null : `${cabeza} ${recortar(proyecto.resumen, espacio)} ${cola}`;
  };

  return (
    (proyecto.subsidio && armarCon(`${precio} Con subsidio DS19.`)) ||
    armarCon(precio) ||
    recortar(`${cabeza} ${precio}`, LARGO_DESCRIPCION)
  );
}

/** Ruta publica de la ficha de un proyecto. */
export const rutaProyecto = (slug) => `/proyecto/${slug}`;

/**
 * Metadatos de una ruta. Devuelve los de 404 para cualquier ruta desconocida,
 * que es exactamente lo que el usuario va a ver en pantalla.
 *
 * @param {string} ruta  pathname, con barra inicial y sin barra final
 * @returns {{titulo: string, descripcion: string, canonical: string, imagen: string, tipo: string, noindex: boolean}}
 */
export function metadatosDe(ruta) {
  const normalizada = ruta !== '/' && ruta.endsWith('/') ? ruta.slice(0, -1) : ruta;

  const fija = PAGINAS[normalizada];
  if (fija) {
    return armar(normalizada, fija.titulo, fija.descripcion, SITIO.imagenPorDefecto, 'website', fija.noindex);
  }

  const slug = normalizada.startsWith('/proyecto/') ? normalizada.slice('/proyecto/'.length) : null;
  const proyecto = slug && PROYECTOS.find((p) => p.slug === slug);
  if (proyecto) {
    return armar(
      normalizada,
      recortar(`${proyecto.nombre} · ${proyecto.comuna} · Ferval`, LARGO_TITULO),
      descripcionProyecto(proyecto),
      `/og/${proyecto.slug}.jpg`,
      'article',
      false,
    );
  }

  return metadatosDe('/404');
}

function armar(ruta, titulo, descripcion, imagen, tipo, noindex = false) {
  return {
    titulo,
    descripcion: recortar(descripcion, LARGO_DESCRIPCION),
    canonical: `${SITIO.dominio}${ruta === '/' ? '/' : ruta}`,
    imagen: `${SITIO.dominio}${imagen}`,
    tipo,
    noindex: Boolean(noindex),
  };
}

/**
 * Rutas indexables del sitio, en el orden en que deberian recorrerse.
 * Alimenta el sitemap y el prerenderizado; el 404 y la pagina de gracias
 * quedan fuera por llevar `noindex`.
 */
export function rutasPublicas() {
  const fijas = Object.entries(PAGINAS)
    .filter(([, meta]) => !meta.noindex)
    .map(([ruta, meta]) => ({ ruta, prioridad: meta.prioridad ?? '0.5' }));

  const fichas = PROYECTOS.map((p) => ({ ruta: rutaProyecto(p.slug), prioridad: '0.8' }));

  return [...fijas.slice(0, 1), ...fichas, ...fijas.slice(1)];
}

/** Todas las rutas que el build debe escribir como HTML, incluidas las noindex. */
export function rutasAPrerenderizar() {
  return [...Object.keys(PAGINAS).filter((r) => r !== '/404'), ...PROYECTOS.map((p) => rutaProyecto(p.slug))];
}

export { EMPRESA };
