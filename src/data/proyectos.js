/**
 * Portafolio de proyectos de Ferval.
 *
 * Todos los datos (superficies, precios UF, tipologias, amenidades y
 * ejecutivas de venta) provienen de las fichas publicadas en fervali.cl,
 * revisadas por ultima vez en noviembre de 2026. Los mapas usan las
 * coordenadas que publica cada ficha.
 *
 * `subsidio` es el programa del Minvu que acepta el proyecto: 'DS19', 'DS01'
 * o null si se compra sin subsidio.
 *
 * Para actualizar el sitio basta editar este archivo: ningun componente
 * contiene texto de proyecto codificado.
 */

/**
 * Vite resuelve en build todas las imagenes de la carpeta de assets y las
 * versiona con hash. `eager` evita el "pop-in" de un import dinamico.
 */
const ARCHIVOS = import.meta.glob('../assets/proyectos/**/*.webp', {
  eager: true,
  import: 'default',
});

/**
 * Devuelve la URL final de una imagen a partir de su ruta relativa.
 * @param {string} slug  carpeta del proyecto
 * @param {string} nombre  nombre del archivo sin extension
 * @returns {string|undefined}
 */
const img = (slug, nombre) => ARCHIVOS[`../assets/proyectos/${slug}/${nombre}.webp`];

/**
 * `srcset` del hero de un proyecto.
 *
 * Las tarjetas del portafolio pintan el hero en una celda de entre 320 y
 * 850 px; pedir siempre el archivo de 1920 hacia que las mas pesadas se
 * quedaran en gris hasta terminar de descargar. Con el `srcset` el navegador
 * elige el escalon que corresponde al hueco y a la densidad de la pantalla.
 *
 * Las variantes las genera `npm run imagenes`; el ultimo escalon es el propio
 * `hero.webp`, que ademas sigue siendo la portada de la ficha de proyecto.
 */
const ANCHOS_HERO = [480, 960, 1440];

const heroSrcSet = (slug) =>
  [...ANCHOS_HERO.map((ancho) => [img(slug, `hero-${ancho}`), ancho]), [img(slug, 'hero'), 1920]]
    .filter(([url]) => url)
    .map(([url, ancho]) => `${url} ${ancho}w`)
    .join(', ');

/**
 * Planos de un modelo, en el orden en que se recorren.
 *
 * Los departamentos tienen una sola planta (`plano-<base>.webp`); las casas
 * traen una por piso (`plano-<base>-n1.webp`, `-n2`). `niveles` en 0 significa
 * planta unica. Si un archivo no existe, el modelo simplemente se queda sin
 * ese plano en vez de romper la ficha.
 *
 * Los originales son los que publica fervali.cl en cada ficha de proyecto.
 */
const planos = (slug, base, niveles = 0) => {
  const uno = (nombre, etiqueta) => {
    const src = img(slug, nombre);
    return src ? { src, etiqueta } : null;
  };
  const lista = niveles
    ? Array.from({ length: niveles }, (_, i) => uno(`plano-${base}-n${i + 1}`, `Planta nivel ${i + 1}`))
    : [uno(`plano-${base}`, 'Planta')];
  return lista.filter(Boolean);
};

/**
 * `srcset` de una foto de galeria.
 *
 * El carrusel ocupa el ancho del contenedor: unos 1.200 px en escritorio y
 * 335 en un celular. Servir siempre el archivo de 1.280 hacia que el movil
 * bajara casi el doble de lo que iba a pintar.
 */
const galeriaSrcSet = (slug, n) =>
  [[img(slug, `g${n}-640`), 640], [img(slug, `g${n}-960`), 960], [img(slug, `g${n}`), 1280]]
    .filter(([url]) => url)
    .map(([url, ancho]) => `${url} ${ancho}w`)
    .join(', ');

/** Construye el arreglo de galeria g1..gN de un proyecto. */
const galeria = (slug, cantidad) =>
  Array.from({ length: cantidad }, (_, i) => ({
    src: img(slug, `g${i + 1}`),
    srcSet: galeriaSrcSet(slug, i + 1),
  })).filter((foto) => foto.src);

/** Imagenes de secciones generales (no pertenecen a un proyecto). */
export const IMAGENES_GENERALES = {
  heroPrincipal: img('_general', 'hero-principal'),
  nosotros: img('_general', 'nosotros'),
  subsidio: img('_general', 'subsidio'),
  maule: img('_general', 'maule'),
};

/**
 * Estados posibles de un proyecto, con la etiqueta que ve el usuario y el
 * tono visual que le corresponde. Centralizarlos evita strings sueltos.
 */
export const ESTADOS = {
  'entrega-inmediata': { etiqueta: 'Entrega inmediata', tono: 'exito' },
  'en-venta': { etiqueta: 'En venta', tono: 'marca' },
  preventa: { etiqueta: 'Preventa', tono: 'marca' },
  'ultimas-unidades': { etiqueta: 'Últimas unidades', tono: 'aviso' },
  'en-construccion': { etiqueta: 'En construcción', tono: 'aviso' },
  // Se mantiene en el portafolio como trayectoria, pero sin precio ni cotizacion.
  vendido: { etiqueta: 'Vendido', tono: 'neutro' },
};

/** Si el proyecto todavia tiene unidades a la venta. */
export const disponible = (proyecto) => proyecto.estado !== 'vendido';

export const TIPOS = {
  casa: { etiqueta: 'Casas', singular: 'Casa' },
  departamento: { etiqueta: 'Departamentos', singular: 'Departamento' },
};

export const PROYECTOS = [
  // ---------------------------------------------------------------------
  {
    slug: 'reserva-las-rastras',
    nombre: 'Reserva Las Rastras',
    tipo: 'casa',
    comuna: 'Talca',
    region: 'Región del Maule',
    estado: 'en-venta',
    subsidio: null,
    // Tiene sitio propio: las tarjetas llevan ahi y /proyecto/reserva-las-rastras
    // redirige (vercel.json). Dominio provisional de Vercel; al cambiarlo,
    // actualizar tambien la redireccion.
    sitioWeb: 'https://front-reserva-las-rastras-ferval.vercel.app',
    titular: 'El barrio residencial más exclusivo de la región del Maule',
    resumen:
      'Seis modelos de casa en sitios urbanizados, más sitios desde 500 m² para construir a medida.',
    descripcion:
      'Reserva Las Rastras tiene seis modelos de casa en sitios ya urbanizados, y también vende sitios desde 500 m² para quien prefiera construir a su medida. El cableado eléctrico va subterráneo, hay control de acceso y los microbarrios se conectan por avenidas anchas.',
    desdeUF: null, // precio a consultar: no publicado en la ficha original
    superficie: { min: 150, max: 308 },
    sitioDesde: 500,
    dormitorios: { min: 3, max: 5 },
    banos: { min: 4, max: 5 },
    unidades: null,
    amenidades: [
      'Gran conectividad',
      'Red eléctrica subterránea',
      'Portal y control de acceso',
      'Microbarrios y amplias avenidas',
      'Paisajismo integrado',
      'Cancha de pádel y plazas kids',
    ],
    modelos: [
      {
        nombre: 'Mediterránea 308',
        tipologia: 'Mediterránea de 2 pisos',
        m2: 308, uf: null, dormitorios: 5, banos: 5,
        detalle:
          'Hormigón armado, sistema térmico EIFS, ventanas y termopanel PVC, calefacción central, muebles de cocina y clóset, altura piso a cielo 3 m.',
        extras: ['Sala de estar', 'Sistema térmico EIFS'],
        planos: planos('reserva-las-rastras', '308', 2),
      },
      {
        nombre: 'Colonial 192',
        tipologia: 'Colonial de 2 pisos',
        m2: 192, uf: null, dormitorios: 5, banos: 5,
        detalle:
          'Albañilería reforzada, ventanas termopanel PVC, calefacción central, muebles de cocina y clóset, altura piso a cielo 2,60 m.',
        extras: ['Sala de estar', 'Sistema térmico EIFS'],
        planos: planos('reserva-las-rastras', '192', 2),
      },
      {
        nombre: 'Mediterránea 182',
        tipologia: 'Mediterránea de 2 pisos',
        m2: 182, uf: null, dormitorios: 4, banos: 4,
        detalle:
          'Albañilería reforzada, ventanas termopanel PVC, calefacción central, muebles de cocina y clóset, altura piso a cielo 2,60 m.',
        extras: ['Sala de estar', 'Sistema térmico EIFS'],
        planos: planos('reserva-las-rastras', '182', 2),
      },
      {
        nombre: 'Mediterránea 179',
        tipologia: 'Mediterránea de 2 pisos',
        m2: 179, uf: null, dormitorios: 4, banos: 5,
        detalle:
          'Albañilería reforzada, ventanas termopanel PVC, calefacción central, muebles de cocina y clóset, altura piso a cielo 2,43 m.',
        extras: ['Sala de estar', 'Sistema térmico EIFS'],
        planos: planos('reserva-las-rastras', '179', 2),
      },
      {
        nombre: 'Mediterránea 159',
        tipologia: 'Mediterránea de 1 piso',
        m2: 159, uf: null, dormitorios: 3, banos: 4,
        detalle:
          'Albañilería reforzada, ventanas termopanel PVC, calefacción central, muebles de cocina y clóset, altura piso a cielo 2,50 m.',
        extras: ['Sala de estar', 'Sistema térmico EIFS'],
        planos: planos('reserva-las-rastras', '159', 1),
      },
      {
        nombre: 'Colonial 150',
        tipologia: 'Colonial de 1 piso',
        m2: 150, uf: null, dormitorios: 3, banos: 4,
        detalle:
          'Albañilería reforzada, ventanas termopanel PVC, calefacción central, muebles de cocina y clóset, altura piso a cielo 2,60 m.',
        extras: ['Sala de estar', 'Sistema térmico EIFS'],
        planos: planos('reserva-las-rastras', '150', 1),
      },
    ],
    ejecutivas: [],
    mapa: 'https://www.google.com/maps/place/Reserva+Las+Rastras/@-35.4185281,-71.5902614,919m',
    imagenes: {
      hero: img('reserva-las-rastras', 'hero'),
      heroSrcSet: heroSrcSet('reserva-las-rastras'),
      logo: img('reserva-las-rastras', 'logo'),
      galeria: galeria('reserva-las-rastras', 9),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'plaza-norte',
    nombre: 'Plaza Norte',
    tipo: 'casa',
    comuna: 'Teno',
    region: 'Región del Maule',
    estado: 'preventa',
    subsidio: 'DS19',
    titular: 'Tu casa a pasos de la Plaza de Armas de Teno',
    resumen: '136 casas de dos pisos y 3 dormitorios a pasos de la Plaza de Armas de Teno.',
    descripcion:
      '136 casas de dos pisos y 3 dormitorios a pasos de la Plaza de Armas de Teno, en tres modelos de 65 a 84 m². Cada casa tiene antejardín, el barrio suma plazas con juegos infantiles y calles amplias, y la Ruta 5 Sur queda a un paso. Es parte del Programa de Integración Social y Territorial (DS19) del Minvu.',
    desdeUF: 1800,
    superficie: { min: 65, max: 84 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 1, max: 2 },
    unidades: 136,
    amenidades: [
      'A pasos de la Plaza de Armas de Teno',
      'Plazas con juegos infantiles',
      'Calles amplias y áreas verdes',
      'Antejardín en cada casa',
      'Acceso directo a Ruta 5 Sur',
      'Subsidio automático DS19',
    ],
    modelos: [
      { nombre: 'Zaragoza', tipologia: 'Vivienda de 2 pisos', m2: 84, uf: 2500, dormitorios: 3, banos: 2, detalle: '46 casas. Primer piso de cerámica y segundo piso alfombrado, con sala de estar, calefont y reja.', extras: ['Sala de estar', 'Ventanas termopanel'], planos: planos('plaza-norte', 'zaragoza') },
      { nombre: 'Valencia', tipologia: 'Vivienda de 2 pisos', m2: 77, uf: 2150, dormitorios: 3, banos: 1, detalle: '59 casas. Primer piso de cerámica y segundo piso alfombrado, con calefont y reja.', extras: ['Ventanas termopanel'], planos: planos('plaza-norte', 'valencia') },
      { nombre: 'Sevilla', tipologia: 'Vivienda de 2 pisos', m2: 65, uf: 1800, dormitorios: 3, banos: 1, detalle: '31 casas. Primer piso de cerámica y segundo piso alfombrado, con calefont y reja.', extras: ['Ventanas termopanel'], planos: planos('plaza-norte', 'sevilla') },
    ],
    ejecutivas: [
      { nombre: 'Karen Castro', whatsapp: '56958016279', telefono: '+56 9 5801 6279', email: 'kcastro@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-34.865236,-71.161846',
    imagenes: {
      hero: img('plaza-norte', 'hero'),
      heroSrcSet: heroSrcSet('plaza-norte'),
      logo: img('plaza-norte', 'logo'),
      galeria: galeria('plaza-norte', 6),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'gabriela-mistral',
    nombre: 'Gabriela Mistral',
    tipo: 'departamento',
    comuna: 'Linares',
    region: 'Región del Maule',
    estado: 'en-venta',
    subsidio: 'DS19',
    titular: 'Todo gran comienzo merece un gran lugar en Linares',
    resumen:
      'Departamentos de 3 dormitorios con estacionamiento, en tres tramos de subsidio y con áreas verdes y juegos infantiles.',
    descripcion:
      'Departamentos de 3 dormitorios en Linares, con 1 o 2 baños según el modelo y tres tramos de subsidio. Vienen con clósets terminados, cocina amoblada, living-comedor integrado y estacionamiento. El condominio tiene áreas verdes, juegos infantiles, espacios recreativos y gestión eficiente de residuos.',
    desdeUF: 1670,
    superficie: { min: 60.79, max: 65.32 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 1, max: 2 },
    unidades: null,
    amenidades: [
      'Excelente conectividad',
      'Áreas comunes y recreación',
      'Áreas verdes y paisajismo',
      'Estacionamiento residentes y visitas',
    ],
    modelos: [
      {
        nombre: 'Básico',
        tipologia: 'Departamento de 1 baño',
        m2: 60.79, uf: 1670, dormitorios: 3, banos: 1,
        detalle:
          'Tres dormitorios y un baño. Clósets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('gabriela-mistral', '60-79'),
      },
      {
        nombre: 'Básico emergente',
        tipologia: 'Departamento de 1 baño',
        m2: 65.32, uf: 1720, dormitorios: 3, banos: 1,
        detalle:
          'Tres dormitorios y un baño. Clósets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('gabriela-mistral', '65-32'),
      },
      {
        nombre: 'Plus clase media',
        tipologia: 'Departamento de 2 baños',
        m2: 65.32, uf: 2600, dormitorios: 3, banos: 2,
        detalle:
          'Dormitorio principal con baño en suite y un segundo baño. Clósets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('gabriela-mistral', '65-32-2b'),
      },
    ],
    ejecutivas: [
      { nombre: 'Yanara Freire', whatsapp: '56975893949', telefono: '+56 9 7589 3949', email: 'yfreire@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.829406,-71.590979',
    imagenes: {
      hero: img('gabriela-mistral', 'hero'),
      heroSrcSet: heroSrcSet('gabriela-mistral'),
      logo: img('gabriela-mistral', 'logo'),
      galeria: galeria('gabriela-mistral', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'parque-poniente-v',
    nombre: 'Parque Poniente V',
    tipo: 'departamento',
    comuna: 'San Fernando',
    region: "Región de O'Higgins",
    estado: 'entrega-inmediata',
    subsidio: 'DS19',
    titular: 'Un parque para vivir mejor, en San Fernando',
    resumen:
      'Departamentos de 3 dormitorios y 2 baños con estacionamiento incluido, en un conjunto cerrado con locales comerciales.',
    descripcion:
      'Departamentos de 3 dormitorios y 2 baños en San Fernando, con estacionamiento incluido. El conjunto es cerrado y tiene quincho, juegos infantiles, estaciones de ejercicio y locales comerciales adentro, así que buena parte del día a día se resuelve sin salir.',
    desdeUF: 2520,
    superficie: { min: 62.15, max: 66.86 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 2, max: 2 },
    unidades: null,
    amenidades: [
      'Excelente conectividad',
      'Diseño y paisajismo',
      'Quincho y juegos infantiles',
      'Entorno cerrado',
      'Estaciones de ejercicios',
      'Locales comerciales',
    ],
    modelos: [
      { nombre: 'Depto T3A', tipologia: 'Departamento', m2: 62.15, uf: 2520, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('parque-poniente-v', 't3a') },
      { nombre: 'Depto T3B', tipologia: 'Departamento', m2: 62.83, uf: 2520, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('parque-poniente-v', 't3b') },
      { nombre: 'Depto T3C', tipologia: 'Departamento', m2: 62.80, uf: 2520, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('parque-poniente-v', 't3c') },
      { nombre: 'Depto T4A', tipologia: 'Departamento', m2: 66.86, uf: 2520, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('parque-poniente-v', 't4a') },
      { nombre: 'Depto T4B', tipologia: 'Departamento', m2: 66.84, uf: 2520, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('parque-poniente-v', 't4b') },
    ],
    ejecutivas: [
      { nombre: 'Carolina Cide', whatsapp: '56981917888', telefono: '+56 9 8191 7888', email: 'ccide@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-34.582499,-71.006642',
    imagenes: {
      hero: img('parque-poniente-v', 'hero'),
      heroSrcSet: heroSrcSet('parque-poniente-v'),
      logo: img('parque-poniente-v', 'logo'),
      galeria: galeria('parque-poniente-v', 8),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'altos-de-yungay',
    nombre: 'Altos de Yungay 5',
    tipo: 'departamento',
    comuna: 'Quillota',
    region: 'Región de Valparaíso',
    estado: 'en-venta',
    subsidio: 'DS19',
    titular: 'En Quillota, a pasos del Camino Internacional',
    resumen:
      'Departamentos DS19 a pasos del Camino Internacional, con conexión directa a Viña del Mar, Valparaíso y Santiago.',
    descripcion:
      'El condominio está en Los Ciruelos 401, en pleno barrio consolidado de Quillota y a pasos del Camino Internacional. Desde ahí la Ruta 5 Norte te deja en Viña del Mar, Valparaíso o Santiago. Son departamentos con subsidio DS19, el Programa de Integración Social y Territorial del Minvu.',
    desdeUF: 2590,
    superficie: { min: 62.15, max: 66.21 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 2, max: 2 },
    unidades: null,
    amenidades: [
      'Gran conectividad',
      'Áreas verdes y paisajismo',
      'Quincho y juegos infantiles',
      'Acceso controlado',
      'Estaciones de ejercicios',
      'Locales comerciales',
    ],
    modelos: [
      { nombre: 'Depto T3A', tipologia: 'Departamento', m2: 62.15, uf: 2590, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('altos-de-yungay', 't3a') },
      { nombre: 'Depto T3B', tipologia: 'Departamento', m2: 62.18, uf: 2590, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('altos-de-yungay', 't3b') },
      { nombre: 'Depto T3C', tipologia: 'Departamento', m2: 62.15, uf: 2590, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('altos-de-yungay', 't3c') },
      { nombre: 'Depto T4A', tipologia: 'Departamento', m2: 66.21, uf: 2800, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('altos-de-yungay', 't4a') },
      { nombre: 'Depto T4B', tipologia: 'Departamento', m2: 66.19, uf: 2800, dormitorios: 3, banos: 2, detalle: 'Living-comedor integrado y sala de estar.', extras: ['Estacionamiento incluido', 'Ventanas termopanel'], planos: planos('altos-de-yungay', 't4b') },
    ],
    ejecutivas: [
      { nombre: 'Valeria Cristi', whatsapp: '56962846361', telefono: '+56 9 6284 6361', email: 'vcristi@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-32.88621,-71.236741',
    imagenes: {
      hero: img('altos-de-yungay', 'hero'),
      heroSrcSet: heroSrcSet('altos-de-yungay'),
      logo: img('altos-de-yungay', 'logo'),
      galeria: galeria('altos-de-yungay', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'parque-oriente',
    nombre: 'Parque Oriente',
    tipo: 'casa',
    comuna: 'Talca',
    region: 'Región del Maule',
    estado: 'entrega-inmediata',
    subsidio: 'DS01',
    titular: 'Entrega inmediata y conexión directa con Ruta 5 Sur',
    resumen: '66 casas de 84 m² en terrenos amplios, con 3 dormitorios y 2 baños.',
    descripcion:
      '66 casas de 84 m² en terrenos amplios, con 3 dormitorios y 2 baños. Abajo van un dormitorio, baño y piso de cerámica; arriba, la sala de estar y dos dormitorios alfombrados.',
    desdeUF: 2000,
    superficie: { min: 84, max: 84 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 2, max: 2 },
    unidades: 66,
    amenidades: [
      'Gran conectividad',
      'Amplias avenidas',
      'Acceso directo por Ruta 5 Sur',
      'Arquitectura eficiente',
      'Paisajismo integrado',
      'Calificación energética',
    ],
    modelos: [
      {
        nombre: 'Zaragoza', tipologia: 'Vivienda de 2 pisos',
        m2: 84, uf: 2000, dormitorios: 3, banos: 2,
        detalle:
          'Primer piso con dormitorio alfombrado, calefont, reja y piso de cerámica. Segundo piso alfombrado, con sala de estar, baño y dos amplios dormitorios.',
        extras: ['Sala de estar', 'Ventanas termopanel'],
        planos: planos('parque-oriente', 'zaragoza', 2),
      },
    ],
    ejecutivas: [
      { nombre: 'Andrea Casas del Valle', whatsapp: '56977357708', telefono: '+56 9 7735 7708', email: 'ventas2vallesdetalca@fervali.cl' },
      { nombre: 'Andrea Valenzuela', whatsapp: '56984021098', telefono: '+56 9 8402 1098', email: 'avalenzuela@fervali.cl' },
      { nombre: 'Diana Mancilla', whatsapp: '56998707881', telefono: '+56 9 9870 7881', email: 'dmancilla@fervali.cl' },
      { nombre: 'Sandra Díaz', whatsapp: '56962340212', telefono: '+56 9 6234 0212', email: 'sdiaz@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.451663,-71.638973',
    imagenes: {
      hero: img('parque-oriente', 'hero'),
      heroSrcSet: heroSrcSet('parque-oriente'),
      logo: img('parque-oriente', 'logo'),
      galeria: galeria('parque-oriente', 5),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'valles-de-linares',
    nombre: 'Valles de Linares',
    tipo: 'casa',
    comuna: 'Linares',
    region: 'Región del Maule',
    estado: 'entrega-inmediata',
    subsidio: 'DS01',
    titular: 'Casas de 84 m² con el centro de Linares a mano',
    resumen: '64 casas de 84 m² con 3 dormitorios y 2 baños, cerca del centro de Linares.',
    descripcion:
      '64 casas de 84 m² con 3 dormitorios y 2 baños, a poca distancia del centro de Linares y de los servicios que ya usas. Abajo hay un dormitorio, baño y piso de cerámica; arriba, sala de estar y dos dormitorios alfombrados.',
    desdeUF: 2000,
    superficie: { min: 84, max: 84 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 2, max: 2 },
    unidades: 64,
    amenidades: [
      'Gran conectividad',
      'Amplias avenidas',
      'Paisajismo integrado',
      'Calificación energética',
    ],
    modelos: [
      {
        nombre: 'Zaragoza', tipologia: 'Vivienda de 2 pisos',
        m2: 84, uf: 2000, dormitorios: 3, banos: 2,
        detalle:
          'Primer piso con dormitorio alfombrado, calefont, reja y piso de cerámica. Segundo piso alfombrado, con sala de estar, baño y dos amplios dormitorios.',
        extras: ['Sala de estar', 'Ventanas termopanel'],
        planos: planos('valles-de-linares', 'zaragoza', 2),
      },
    ],
    ejecutivas: [
      { nombre: 'Helen Mas', whatsapp: '56931253207', telefono: '+56 9 3125 3207', email: 'hmas@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.8606051,-71.5762693',
    imagenes: {
      hero: img('valles-de-linares', 'hero'),
      heroSrcSet: heroSrcSet('valles-de-linares'),
      logo: img('valles-de-linares', 'logo'),
      galeria: galeria('valles-de-linares', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'marta-colvin',
    nombre: 'Marta Colvin',
    tipo: 'departamento',
    comuna: 'Talca',
    region: 'Región del Maule',
    estado: 'en-venta',
    subsidio: 'DS19',
    titular: 'Más conectividad, más desarrollo, más futuro',
    resumen:
      'Departamentos de 65 m² con quincho, piscina y juegos infantiles, donde hoy crece Talca.',
    descripcion:
      'Departamentos de 65 m² con 3 dormitorios y 2 baños, donde hoy crece Talca: cerca de las universidades, del Casino y del Mall Plaza Maule. El condominio tiene quincho, piscina y juegos infantiles, y el proyecto es parte del programa DS19 del Minvu.',
    desdeUF: 2400,
    superficie: { min: 65, max: 65 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 2, max: 2 },
    unidades: 140,
    amenidades: [
      'Gran conectividad',
      'Amplias avenidas',
      'Paisajismo integrado',
      'Quincho, piscina y juegos infantiles',
      'Cerca de universidades, Casino y Mall Plaza Maule',
      'Calificación energética',
    ],
    modelos: [
      {
        nombre: 'Departamento 65 m²', tipologia: 'Departamento',
        m2: 65, uf: 2400, dormitorios: 3, banos: 2,
        detalle:
          'Dormitorio principal con baño en suite y segundo baño de visitas. Clósets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido'],
        planos: planos('marta-colvin', '65'),
      },
    ],
    ejecutivas: [
      { nombre: 'Karla Cañizalez', whatsapp: '56934467876', telefono: '+56 9 3446 7876', email: 'ventasrebecamatte@fervali.cl' },
      { nombre: 'Valentina Gutiérrez', whatsapp: '56942499601', telefono: '+56 9 4249 9601', email: 'vgutierrez@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.446019,-71.621435',
    imagenes: {
      hero: img('marta-colvin', 'hero'),
      heroSrcSet: heroSrcSet('marta-colvin'),
      logo: img('marta-colvin', 'logo'),
      galeria: galeria('marta-colvin', 6),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'lily-garafulic',
    nombre: 'Lily Garafulic',
    tipo: 'departamento',
    comuna: 'Talca',
    region: 'Región del Maule',
    estado: 'ultimas-unidades',
    subsidio: 'DS19',
    titular: 'Tu nuevo hogar en Talca, más cerca de lo que imaginas',
    resumen:
      'Cuatro torres en torno a un parque central, en un entorno cerrado del sector oriente de Talca.',
    descripcion:
      'Cuatro torres en torno a un parque central, con plazas de juego, quinchos y senderos, en un entorno cerrado y tranquilo del sector oriente de Talca, en Calle 8 Sur 4085. Los departamentos se entregan 100% terminados, con ventanas de PVC termopanel, piso vinílico SPC, muebles de cocina y clósets. Tiene subsidio automático DS19 de hasta UF 825 si cumples los requisitos.',
    desdeUF: 1950,
    superficie: { min: 60.79, max: 65.32 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 1, max: 2 },
    unidades: 140,
    amenidades: [
      'Excelente conectividad',
      'Entorno cerrado',
      'Áreas comunes con quinchos',
      'Paisajismo y plazas de juego',
      'Estacionamiento incluido',
      'Departamentos 100% terminados',
      'Piso vinílico SPC',
      'Muebles de cocina y clósets',
    ],
    modelos: [
      {
        nombre: 'Departamento 60,79 m²', tipologia: 'Departamento de 1 baño',
        m2: 60.79, uf: 1950, dormitorios: 3, banos: 1,
        detalle:
          'Distribución eficiente para parejas o familias que comienzan. Tres dormitorios, uno adaptable como oficina, y living-comedor integrado con buena luz natural.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('lily-garafulic', '60-79'),
      },
      {
        nombre: 'Departamento 65,32 m²', tipologia: 'Departamento de 1 baño',
        m2: 65.32, uf: null, dormitorios: 3, banos: 1,
        detalle:
          'Espacios amplios y luminosos para familias, cocina con espacio para desayunador y acceso directo a las áreas verdes del conjunto.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('lily-garafulic', '65-32'),
      },
      {
        nombre: 'Departamento 65,32 m² · 2 baños', tipologia: 'Departamento de 2 baños',
        m2: 65.32, uf: null, dormitorios: 3, banos: 2,
        detalle:
          'Dormitorio principal con baño en suite, segundo baño para visitas, clósets en dormitorios y muebles de cocina.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('lily-garafulic', '65-32-2b'),
      },
    ],
    ejecutivas: [
      { nombre: 'Karla Cañizalez', whatsapp: '56934467876', telefono: '+56 9 3446 7876', email: 'ventasrebecamatte@fervali.cl' },
      { nombre: 'Valentina Gutiérrez', whatsapp: '56942499601', telefono: '+56 9 4249 9601', email: 'vgutierrez@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.446234,-71.620215',
    imagenes: {
      hero: img('lily-garafulic', 'hero'),
      heroSrcSet: heroSrcSet('lily-garafulic'),
      logo: img('lily-garafulic', 'logo'),
      galeria: galeria('lily-garafulic', 9),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'margot-duhalde',
    nombre: 'Margot Duhalde',
    tipo: 'casa',
    comuna: 'San Javier',
    region: 'Región del Maule',
    estado: 'entrega-inmediata',
    subsidio: 'DS19',
    titular: 'Vive a pasos del centro de San Javier y de la Ruta 5 Sur',
    resumen:
      '490 viviendas en dos etapas, en los terrenos de la histórica Viña Balduzzi, con acceso por Avenida Balmaceda.',
    descripcion:
      'Margot Duhalde está en el centro de San Javier, en los terrenos de la antigua Viña Balduzzi, con entrada por Avenida Balmaceda. Son 490 casas repartidas en dos etapas: la primera, de 285 casas, tiene entrega inmediata, y la segunda, de 205, está en preventa.',
    desdeUF: 1550,
    superficie: { min: 65, max: 84 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 1, max: 2 },
    unidades: 490,
    etapas: [
      { nombre: 'Etapa I · entrega inmediata', viviendas: 285 },
      { nombre: 'Etapa II · preventa', viviendas: 205 },
    ],
    amenidades: [
      'Gran conectividad',
      'Amplias avenidas',
      'Paisajismo integrado',
      'Calificación energética',
    ],
    modelos: [
      { nombre: 'Zaragoza', tipologia: 'Vivienda de 2 pisos', m2: 84, uf: 2400, dormitorios: 3, banos: 2, detalle: 'Primer piso con dormitorio alfombrado, calefont, reja y piso de cerámica. Segundo piso alfombrado, con sala de estar y dos amplios dormitorios.', extras: ['Sala de estar', 'Ventanas termopanel'], planos: planos('margot-duhalde', 'zaragoza', 2) },
      { nombre: 'Valencia', tipologia: 'Vivienda de 2 pisos', m2: 77, uf: 2100, dormitorios: 3, banos: 1, detalle: 'Primer nivel con dormitorio, calefont, reja y piso de cerámica. Segundo nivel con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel'], planos: planos('margot-duhalde', 'valencia', 2) },
      { nombre: 'Barcelona', tipologia: 'Vivienda de 2 pisos', m2: 71, uf: 1600, dormitorios: 3, banos: 1, detalle: 'Primer piso de cerámica, dormitorio principal, calefont y reja. Segundo piso con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel', 'Agotado en etapa I'], planos: planos('margot-duhalde', 'barcelona', 2) },
      { nombre: 'Sevilla', tipologia: 'Vivienda de 2 pisos', m2: 65, uf: 1550, dormitorios: 3, banos: 1, detalle: 'Primer nivel con piso de cerámica, dormitorio, calefont y reja perimetral. Segundo nivel con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel', 'Agotado en etapa I'], planos: planos('margot-duhalde', 'sevilla', 2) },
    ],
    ejecutivas: [
      { nombre: 'Francisca Valdés', etapa: 'Etapa I', whatsapp: '56978437423', telefono: '+56 9 7843 7423', email: 'fvaldes@fervali.cl' },
      { nombre: 'Ignacia Méndez', etapa: 'Etapa II', whatsapp: '56942811966', telefono: '+56 9 4281 1966', email: 'imendez@fervali.cl' },
      { nombre: 'Nattaly Ordenes', whatsapp: '56998707881', telefono: '+56 9 9870 7881', email: 'nordenes@fervali.cl' },
    ],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.597671,-71.712243',
    imagenes: {
      hero: img('margot-duhalde', 'hero'),
      heroSrcSet: heroSrcSet('margot-duhalde'),
      logo: img('margot-duhalde', 'logo'),
      galeria: galeria('margot-duhalde', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'rebeca-matte',
    nombre: 'Rebeca Matte',
    tipo: 'departamento',
    comuna: 'Talca',
    region: 'Región del Maule',
    estado: 'vendido',
    subsidio: 'DS19',
    titular: 'Al lado de las universidades y del Mall Plaza Maule',
    resumen:
      'Departamentos de 65 m² con quincho, piscina y juegos infantiles, cerca de universidades y Mall Plaza Maule.',
    descripcion:
      'Departamentos de 65 m² con 3 dormitorios y 2 baños, en el sector oriente de Talca. Quedan cerca de las universidades y del Mall Plaza Maule. El condominio tiene quincho, piscina y juegos infantiles.',
    desdeUF: 2400,
    superficie: { min: 65, max: 65 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 2, max: 2 },
    unidades: null,
    amenidades: [
      'Gran conectividad',
      'Amplias avenidas',
      'Paisajismo integrado',
      'Quincho, piscina y juegos infantiles',
      'Cercano a universidades, Casino y Mall Plaza Maule',
      'Calificación energética',
    ],
    modelos: [
      {
        nombre: 'Departamento 65 m²', tipologia: 'Departamento',
        m2: 65, uf: 2400, dormitorios: 3, banos: 2,
        detalle:
          'Dormitorio principal con baño en suite y segundo baño de visitas. Closets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('rebeca-matte', '65'),
      },
    ],
    ejecutivas: [],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.445228,-71.620723',
    imagenes: {
      hero: img('rebeca-matte', 'hero'),
      heroSrcSet: heroSrcSet('rebeca-matte'),
      logo: img('rebeca-matte', 'logo'),
      galeria: galeria('rebeca-matte', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'eloisa-diaz',
    nombre: 'Eloísa Díaz',
    tipo: 'casa',
    comuna: 'Linares',
    region: 'Región del Maule',
    estado: 'vendido',
    subsidio: 'DS19',
    titular: 'Casas con subsidio DS19, cerca del centro de Linares',
    resumen:
      '195 casas en cuatro modelos, de 65 a 84 m², todas con subsidio DS19.',
    descripcion:
      '195 casas con subsidio DS19 en Linares, en cuatro modelos de 65 a 84 m², todas de dos pisos y 3 dormitorios, con buen acceso al centro. El proyecto ya está 100% vendido.',
    desdeUF: 2100,
    superficie: { min: 65, max: 84 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 1, max: 2 },
    unidades: 195,
    amenidades: [
      'Gran conectividad',
      'Amplias avenidas',
      'Paisajismo integrado',
      'Calificación energética',
    ],
    modelos: [
      { nombre: 'Zaragoza', tipologia: 'Vivienda de 2 pisos', m2: 84, uf: 2400, dormitorios: 3, banos: 2, detalle: 'Primer piso con dormitorio alfombrado, calefont, reja y piso de cerámica. Segundo piso alfombrado, con sala de estar y dos amplios dormitorios.', extras: ['Sala de estar', 'Ventanas termopanel'], planos: planos('eloisa-diaz', 'zaragoza', 2) },
      { nombre: 'Valencia', tipologia: 'Vivienda de 2 pisos', m2: 77, uf: 2100, dormitorios: 3, banos: 1, detalle: 'Primer nivel con dormitorio, calefont, reja y piso de cerámica. Segundo nivel con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel'], planos: planos('eloisa-diaz', 'valencia', 2) },
      { nombre: 'Barcelona', tipologia: 'Vivienda de 2 pisos', m2: 71, uf: 1600, dormitorios: 3, banos: 1, detalle: 'Primer piso de cerámica, dormitorio, calefont y reja. Segundo piso con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel'], planos: planos('eloisa-diaz', 'barcelona', 2) },
      { nombre: 'Sevilla', tipologia: 'Vivienda de 2 pisos', m2: 65, uf: 1550, dormitorios: 3, banos: 1, detalle: 'Primer nivel con piso de cerámica, dormitorio, calefont y reja perimetral. Segundo nivel con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel'], planos: planos('eloisa-diaz', 'sevilla', 2) },
    ],
    ejecutivas: [],
    mapa: 'https://www.google.com/maps/search/?api=1&query=-35.8298805,-71.5892931',
    imagenes: {
      hero: img('eloisa-diaz', 'hero'),
      heroSrcSet: heroSrcSet('eloisa-diaz'),
      logo: img('eloisa-diaz', 'logo'),
      galeria: galeria('eloisa-diaz', 4),
    },
  },
];

/**
 * Proyectos que todavia no salen a la venta.
 *
 * Salen del control interno de proyectos PIS (Programa de Integracion Social)
 * de la empresa. De esa planilla aqui solo se publica lo que le sirve a quien
 * busca vivienda: nombre, comuna y numero de viviendas. Queda deliberadamente
 * fuera todo lo operativo —codigo interno, profesional a cargo, porcentajes de
 * avance, estado de ventas y tramitacion del PIS—, que es informacion de
 * gestion y no de venta.
 *
 * `estado`:
 *   · 'en-construccion' .... la obra ya esta levantada o en curso
 *   · 'proximamente' ....... aprobado, aun sin construccion
 *
 * Al abrir la venta de uno de estos, se mueve al arreglo PROYECTOS con su
 * ficha completa y se borra de aqui.
 */
export const PROXIMOS = [
  { nombre: 'Viña Alameda', comuna: 'Villa Alegre', region: 'Región del Maule', viviendas: 296, estado: 'proximamente' },
  { nombre: 'Condominio Nueva Era I', comuna: 'Quillota', region: 'Región de Valparaíso', viviendas: 100, estado: 'proximamente' },
  { nombre: 'Condominio Nueva Era II', comuna: 'Quillota', region: 'Región de Valparaíso', viviendas: 60, estado: 'proximamente' },
  { nombre: 'Loteo Altos de Esmeralda', comuna: 'Talca', region: 'Región del Maule', viviendas: 206, estado: 'proximamente' },
];

/** Etiqueta y tono visual de cada estado de `PROXIMOS`. */
export const ESTADOS_PROXIMOS = {
  'en-construccion': { etiqueta: 'En construcción', tono: 'aviso' },
  proximamente: { etiqueta: 'Próximamente', tono: 'marca' },
};

/* ==========================================================================
   Selectores derivados
   Se calculan una vez al importar el modulo, no en cada render.
   ========================================================================== */

/** Busca un proyecto por su slug de URL. */
export const proyectoPorSlug = (slug) => PROYECTOS.find((p) => p.slug === slug);

/** Lo que se puede comprar hoy: alimenta el portafolio y sus filtros. */
export const DISPONIBLES = PROYECTOS.filter(disponible);

/** Proyectos 100% vendidos: van en su propia seccion, como trayectoria. */
export const PASADOS = PROYECTOS.filter((p) => !disponible(p));

/** Comunas presentes en el portafolio, ordenadas alfabeticamente. */
export const COMUNAS = [...new Set(DISPONIBLES.map((p) => p.comuna))].sort((a, b) =>
  a.localeCompare(b, 'es'),
);

/** Precio de entrada mas bajo de lo que sigue a la venta (para el hero). */
export const UF_MINIMA = Math.min(
  ...DISPONIBLES.map((p) => p.desdeUF).filter((uf) => typeof uf === 'number'),
);

/** Cifras que se muestran en la barra de trayectoria. */
export const CIFRAS = {
  // Trayectoria: cuenta tambien los vendidos.
  proyectos: PROYECTOS.length,
  disponibles: DISPONIBLES.length,
  comunas: COMUNAS.length,
  viviendas: PROYECTOS.reduce((total, p) => total + (p.unidades ?? 0), 0),
  ufMinima: UF_MINIMA,
};
