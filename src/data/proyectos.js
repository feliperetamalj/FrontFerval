/**
 * Portafolio de proyectos de Ferval.
 *
 * Todos los datos (superficies, precios UF, tipologias, amenidades y
 * ejecutivas de venta) provienen de las fichas publicadas en fervali.cl.
 * Las comunas fueron verificadas contra las coordenadas de los mapas
 * embebidos en cada ficha, salvo donde se indica lo contrario.
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

/** Construye el arreglo de galeria g1..gN de un proyecto. */
const galeria = (slug, cantidad) =>
  Array.from({ length: cantidad }, (_, i) => img(slug, `g${i + 1}`)).filter(Boolean);

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
  'en-construccion': { etiqueta: 'En construcción', tono: 'aviso' },
};

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
    subsidio: false,
    destacado: true,
    titular: 'El barrio residencial más exclusivo de la región del Maule',
    resumen:
      'Seis tipos de vivienda en sitios completamente urbanizados, en el sector de mayor plusvalía de Talca.',
    descripcion:
      'Emplazado en el sector con la más alta plusvalía de Talca, Reserva Las Rastras ofrece seis tipos de viviendas en sitios completamente urbanizados, además de sitios desde los 500 m² para quienes prefieren construir a medida. Red eléctrica subterránea, control de acceso y microbarrios conectados por amplias avenidas.',
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
    slug: 'gabriela-mistral',
    nombre: 'Gabriela Mistral',
    tipo: 'departamento',
    comuna: 'Linares',
    region: 'Región del Maule',
    estado: 'en-venta',
    subsidio: true,
    destacado: false,
    titular: 'Todo gran comienzo merece un gran lugar en Linares',
    resumen:
      'Departamentos de 3 dormitorios con estacionamiento incluido, en un entorno con áreas verdes y juegos infantiles.',
    descripcion:
      'Gabriela Mistral abre un nuevo capítulo para vivir en Linares, con departamentos pensados para familias que buscan comodidad, conectividad y una mejor calidad de vida. Reúne espacios funcionales de 3 dormitorios, terminaciones prácticas y áreas comunes diseñadas para disfrutar el día a día, en un entorno residencial con áreas verdes, juegos infantiles, espacios recreativos y gestión eficiente de residuos.',
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
        nombre: 'Departamento 60,79 m²',
        tipologia: 'Tramo Básico',
        m2: 60.79, uf: 1670, dormitorios: 3, banos: 1,
        detalle:
          'Dormitorio principal con baño en suite y un segundo baño de visitas. Closets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('gabriela-mistral', '60-79'),
      },
      {
        nombre: 'Departamento 65,32 m²',
        tipologia: 'Tramo Básico emergente',
        m2: 65.32, uf: 1720, dormitorios: 3, banos: 1,
        detalle:
          'Dormitorio principal con baño en suite y un segundo baño de visitas. Closets terminados, cocina amoblada y living-comedor integrado. Estacionamiento incluido.',
        extras: ['Estacionamiento incluido', 'Ventanas termopanel'],
        planos: planos('gabriela-mistral', '65-32'),
      },
    ],
    ejecutivas: [
      { nombre: 'Yanara Freire', whatsapp: '56975893949', telefono: '+56 9 7589 3949', email: 'yfreire@fervali.cl' },
    ],
    // La ficha original enlaza un mapa de Talca por error; se omite hasta confirmar.
    mapa: null,
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
    subsidio: true,
    destacado: false,
    titular: 'Un parque para vivir mejor, en San Fernando',
    resumen:
      'Departamentos de 3 dormitorios y 2 baños con estacionamiento incluido, en un conjunto cerrado con locales comerciales.',
    descripcion:
      'Parque Poniente V reúne lo que una familia necesita para construir una vida más cómoda, conectada y segura en San Fernando. Sus departamentos forman parte de un conjunto residencial diseñado para aprovechar mejor el espacio, fomentar la vida en comunidad y entregar áreas comunes que suman valor real al día a día.',
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
      { nombre: 'Karen Castro', whatsapp: '56987425033', telefono: '+56 9 8742 5033', email: 'kcastro@fervali.cl' },
    ],
    mapa: 'https://maps.app.goo.gl/EufJ4MQmER9hitMr8',
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
    subsidio: true,
    destacado: false,
    titular: 'Donde la conectividad y la calidad de vida se encuentran',
    resumen:
      'Departamentos DS19 a pasos del Camino Internacional, con conexión directa a Viña del Mar, Valparaíso y Santiago.',
    descripcion:
      'A pasos del Camino Internacional, en pleno barrio consolidado de Quillota, Condominio Altos de Yungay 5 ofrece una ubicación privilegiada que conecta con Viña del Mar, Valparaíso y Santiago a través de la Ruta 5 Norte. El proyecto se enmarca en el Programa de Integración Social y Territorial (DS-19) del Ministerio de Vivienda y Urbanismo.',
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
      { nombre: 'Karen Castro', whatsapp: '56987425033', telefono: '+56 9 8742 5033', email: 'kcastro@fervali.cl' },
    ],
    mapa: null,
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
    subsidio: false,
    destacado: false,
    titular: 'Entrega inmediata y conexión directa con Ruta 5 Sur',
    resumen: '66 viviendas de 84 m² con amplios terrenos, 3 dormitorios y 2 baños.',
    descripcion:
      'Parque Oriente ofrece 66 viviendas de 84 m², con amplios terrenos y un diseño que combina comodidad, funcionalidad y estilo moderno. Cada casa cuenta con 3 dormitorios, 2 baños y espacios luminosos pensados para el bienestar familiar.',
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
    ejecutivas: [],
    mapa: 'https://www.google.com/maps/place/-35.451663,-71.638973',
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
    estado: 'en-venta',
    subsidio: false,
    destacado: false,
    titular: 'Excelente conexión con el centro y los principales servicios',
    resumen: '64 viviendas de 84 m² con 3 dormitorios, 2 baños y amplios espacios interiores.',
    descripcion:
      'Valles de Linares ofrece 64 viviendas diseñadas para combinar comodidad, funcionalidad y estilo moderno. Cada casa cuenta con 3 dormitorios, 2 baños y amplios espacios interiores, ideales para el bienestar y la vida familiar, con excelente conectividad al centro y los principales servicios de Linares.',
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
    ejecutivas: [],
    mapa: 'https://www.google.com/maps/place/Villa+Valles+de+Linares/@-35.8606007,-71.5788442,914m',
    imagenes: {
      hero: img('valles-de-linares', 'hero'),
      heroSrcSet: heroSrcSet('valles-de-linares'),
      logo: img('valles-de-linares', 'logo'),
      galeria: galeria('valles-de-linares', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'rebeca-matte',
    nombre: 'Rebeca Matte',
    tipo: 'departamento',
    comuna: 'Talca',
    region: 'Región del Maule',
    estado: 'en-venta',
    subsidio: false,
    destacado: false,
    titular: 'Tu nuevo hogar en una zona de alto crecimiento en Talca',
    resumen:
      'Departamentos de 65 m² con quincho, piscina y juegos infantiles, cerca de universidades y Mall Plaza Maule.',
    descripcion:
      'En el corazón del sector oriente de Talca nace Condominio Rebeca Matte, un proyecto exclusivo diseñado para elevar tu calidad de vida. Con departamentos de 65 m² plus, cada espacio combina comodidad, modernidad y funcionalidad.',
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
    mapa: 'https://www.google.com/maps/place/-35.4452261,-71.622771',
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
    estado: 'en-venta',
    subsidio: true,
    destacado: false,
    titular: 'Tu nuevo hogar en una ubicación privilegiada de Linares',
    resumen:
      '195 viviendas con subsidio DS19, en cinco modelos de 65 a 84 m² con excelente acceso al centro.',
    descripcion:
      'Eloísa Díaz ofrece 195 viviendas con subsidio DS19, en modelos de 65 a 84 m² diseñados para combinar comodidad, funcionalidad y estilo contemporáneo. Su primera etapa ya está disponible, con casas de 3 dormitorios y espacios luminosos pensados para el bienestar familiar, en una ubicación privilegiada con excelente acceso al centro de Linares.',
    desdeUF: 1550,
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
    mapa: null,
    imagenes: {
      hero: img('eloisa-diaz', 'hero'),
      heroSrcSet: heroSrcSet('eloisa-diaz'),
      logo: img('eloisa-diaz', 'logo'),
      galeria: galeria('eloisa-diaz', 4),
    },
  },

  // ---------------------------------------------------------------------
  {
    slug: 'margot-duhalde',
    nombre: 'Margot Duhalde',
    tipo: 'casa',
    comuna: 'San Javier',
    region: 'Región del Maule',
    estado: 'en-venta',
    subsidio: true,
    destacado: false,
    titular: 'Vive a pasos del centro de San Javier y de la Ruta 5 Sur',
    resumen:
      '490 viviendas en dos etapas, en los terrenos de la histórica Viña Balduzzi, con acceso por Avenida Balmaceda.',
    descripcion:
      'Margot Duhalde se ubica en el sector céntrico de San Javier, en los terrenos de la histórica Viña Balduzzi, con acceso privilegiado por Avenida Balmaceda. El proyecto contempla 490 viviendas desarrolladas en dos etapas —285 en la primera y 205 en la segunda—, entregando soluciones modernas y de calidad para cientos de familias de la región del Maule.',
    desdeUF: 1550,
    superficie: { min: 65, max: 84 },
    dormitorios: { min: 3, max: 3 },
    banos: { min: 1, max: 2 },
    unidades: 490,
    etapas: [
      { nombre: 'Primera etapa', viviendas: 285 },
      { nombre: 'Segunda etapa', viviendas: 205 },
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
      { nombre: 'Barcelona', tipologia: 'Vivienda de 2 pisos', m2: 71, uf: 1600, dormitorios: 3, banos: 1, detalle: 'Primer piso de cerámica, dormitorio principal, calefont y reja. Segundo piso con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel'], planos: planos('margot-duhalde', 'barcelona', 2) },
      { nombre: 'Sevilla', tipologia: 'Vivienda de 2 pisos', m2: 65, uf: 1550, dormitorios: 3, banos: 1, detalle: 'Primer nivel con piso de cerámica, dormitorio, calefont y reja perimetral. Segundo nivel con dos amplios dormitorios alfombrados.', extras: ['Ventanas termopanel'], planos: planos('margot-duhalde', 'sevilla', 2) },
    ],
    ejecutivas: [],
    mapa: 'https://www.google.com/maps/place/-35.597671,-71.712243',
    imagenes: {
      hero: img('margot-duhalde', 'hero'),
      heroSrcSet: heroSrcSet('margot-duhalde'),
      logo: img('margot-duhalde', 'logo'),
      galeria: galeria('margot-duhalde', 4),
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
  { nombre: 'Marta Colvin', comuna: 'Talca', region: 'Región del Maule', viviendas: 140, estado: 'en-construccion' },
  { nombre: 'Margot Duhalde II', comuna: 'San Javier', region: 'Región del Maule', viviendas: 205, estado: 'en-construccion' },
  { nombre: 'Lily Garafulic', comuna: 'Talca', region: 'Región del Maule', viviendas: 140, estado: 'en-construccion' },
  { nombre: 'Plaza Norte', comuna: 'Teno', region: 'Región del Maule', viviendas: 196, estado: 'proximamente' },
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

/** Proyecto destacado de la portada. */
export const PROYECTO_DESTACADO = PROYECTOS.find((p) => p.destacado) ?? PROYECTOS[0];

/** Comunas presentes en el portafolio, ordenadas alfabeticamente. */
export const COMUNAS = [...new Set(PROYECTOS.map((p) => p.comuna))].sort((a, b) =>
  a.localeCompare(b, 'es'),
);

/** Precio de entrada mas bajo de todo el portafolio (para el hero). */
export const UF_MINIMA = Math.min(
  ...PROYECTOS.map((p) => p.desdeUF).filter((uf) => typeof uf === 'number'),
);

/** Cifras que se muestran en la barra de trayectoria. */
export const CIFRAS = {
  proyectos: PROYECTOS.length,
  comunas: COMUNAS.length,
  viviendas: PROYECTOS.reduce((total, p) => total + (p.unidades ?? 0), 0),
  ufMinima: UF_MINIMA,
};
