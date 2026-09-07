/**
 * Datos institucionales de Inmobiliaria y Constructora Ferval.
 *
 * Fuente: fervali.cl (pie de pagina, pagina de contacto y fichas de proyecto).
 * Centralizado aqui para que el contenido se edite sin tocar componentes.
 */

export const EMPRESA = {
  nombre: 'Ferval',
  nombreLegal: 'Inmobiliaria y Constructora Ferval',
  descriptor: 'Inmobiliaria y Constructora',
  ciudad: 'Talca',
  region: 'Región del Maule',

  /** Promesa central. Es el mensaje que hereda el hero y el pie de pagina. */
  promesa: 'Más de una década construyendo hogares en el Maule.',

  contacto: {
    direccion: 'Avda. 30 Oriente, Edificio Las Rastras III, Piso 1, Local E',
    ciudad: 'Talca, Región del Maule',
    telefono: '+56 71 2 234830',
    telefonoLink: '+56712234830',
    email: 'contacto@fervali.cl',
    /** Numero comercial general. Cada proyecto puede sobrescribirlo. */
    whatsapp: '56712234830',
  },

  redes: {
    instagram: 'https://www.instagram.com/fervalinmobiliaria/',
    facebook: 'https://www.facebook.com/InmobiliariaFerval',
  },

  /**
   * Cifras del portafolio. Se calculan en runtime desde `proyectos.js`
   * cuando corresponde; aqui solo van las que no son derivables.
   */
  trayectoria: {
    anios: 10,
    anioInicio: 2014,
  },
};

/**
 * Pilares diferenciadores. Alimentan la seccion "Por qué Ferval".
 * `nota` es el dato verificable que sostiene cada afirmacion: sin dato,
 * el pilar se cae y no deberia publicarse.
 */
export const PILARES = [
  {
    id: 'integracion',
    titulo: 'Inmobiliaria y constructora',
    texto:
      'Compramos el terreno, diseñamos, construimos y vendemos. Al no depender de terceros, controlamos el plazo, el costo y la terminación de cada vivienda.',
    nota: 'Un solo responsable de principio a fin',
  },
  {
    id: 'subsidio',
    titulo: 'Expertos en subsidio DS19',
    texto:
      'Acompañamos la postulación al Programa de Integración Social y Territorial del Minvu. Te decimos si calificas antes de que firmes nada.',
    nota: 'Programa DS19 · Minvu',
  },
  {
    id: 'territorio',
    titulo: 'Arraigados en el Maule',
    texto:
      'Conocemos Talca, Linares y San Javier porque construimos aquí. Sabemos qué barrio crece, dónde llega el colegio y por dónde pasa la micro.',
    nota: 'Oficina propia en Talca',
  },
  {
    id: 'rango',
    titulo: 'Del primer hogar al definitivo',
    texto:
      'Departamentos desde UF 1.550 con subsidio y casas de hasta 308 m² en sitios urbanizados. El mismo estándar constructivo en ambos extremos.',
    nota: 'UF 1.550 a 12.000',
  },
];

/**
 * Etapas del proceso de compra. Responden la objecion "no sé cómo se hace".
 */
export const PROCESO = [
  {
    paso: '01',
    titulo: 'Conversemos',
    texto:
      'Nos cuentas qué necesitas y cuánto puedes destinar. Te decimos con franqueza qué proyectos te calzan y cuáles no.',
  },
  {
    paso: '02',
    titulo: 'Revisamos tu subsidio',
    texto:
      'Verificamos si calificas al DS19 y qué ahorro previo necesitas. Si no calificas, te mostramos las alternativas sin subsidio.',
  },
  {
    paso: '03',
    titulo: 'Visitas la vivienda',
    texto:
      'Recorres el proyecto con una ejecutiva, ves el modelo real y resuelves dudas en terreno antes de comprometerte.',
  },
  {
    paso: '04',
    titulo: 'Firmamos y entregamos',
    texto:
      'Coordinamos crédito, escrituración y entrega. Después de la entrega sigues con nosotros a través de Post Venta.',
  },
];

/** Enlaces del menu principal. Un unico origen para header y footer. */
export const NAVEGACION = [
  { etiqueta: 'Proyectos', href: '/#proyectos' },
  { etiqueta: 'Subsidio DS19', href: '/#subsidio' },
  { etiqueta: 'Nosotros', href: '/#nosotros' },
  { etiqueta: 'Contacto', href: '/#contacto' },
];
