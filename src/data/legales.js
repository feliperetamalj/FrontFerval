import { EMPRESA } from './empresa.js';

/**
 * Textos legales del sitio.
 *
 * BORRADOR. Lo escribio el equipo de desarrollo, no un abogado, y debe
 * revisarse antes de publicar. Todo lo que aparece marcado como [COMPLETAR]
 * son datos que nadie ha confirmado: se dejan visibles a proposito para que
 * salten a la vista en la pagina y no se publiquen por descuido.
 *
 * Dos hechos del sitio condicionan estos textos y conviene tenerlos presentes
 * si se editan:
 *
 *   · El formulario de contacto no tiene servidor. No guarda nada: arma un
 *     mensaje y lo entrega a WhatsApp o al cliente de correo del visitante.
 *     Los datos personales viajan por ahi y no por una base de datos de
 *     Ferval, y la politica lo dice tal cual.
 *   · La analitica es sin cookies, asi que el sitio no pide consentimiento de
 *     cookies. Si algun dia se cambia a una herramienta que si las use (por
 *     ejemplo Google Analytics), hay que reescribir esa seccion y activar el
 *     banner de consentimiento.
 *
 * Marco de referencia: Ley 21.719 sobre proteccion de datos personales, que
 * entra en vigencia en diciembre de 2026, y Ley 19.496 del consumidor.
 */

/** Datos del responsable. Lo que falta esta marcado para que no pase colado. */
export const RESPONSABLE = {
  razonSocial: '[COMPLETAR: razón social completa]',
  rut: '[COMPLETAR: RUT de la empresa]',
  domicilio: `${EMPRESA.contacto.direccion}, ${EMPRESA.contacto.ciudad}`,
  email: EMPRESA.contacto.email,
  telefono: EMPRESA.contacto.telefono,
};

export const ACTUALIZACION = 'septiembre de 2026';

export const PRIVACIDAD = [
  {
    titulo: 'Quién responde por tus datos',
    parrafos: [
      `${RESPONSABLE.razonSocial}, RUT ${RESPONSABLE.rut}, con domicilio en ` +
        `${RESPONSABLE.domicilio}, es responsable del tratamiento de los datos ` +
        'personales que entregues en este sitio.',
      `Para cualquier asunto relacionado con tus datos puedes escribir a ${RESPONSABLE.email} ` +
        `o llamar al ${RESPONSABLE.telefono}.`,
    ],
  },
  {
    titulo: 'Qué datos pedimos y cómo llegan',
    parrafos: [
      'El formulario de contacto te pide tu nombre y una forma de contactarte, ' +
        'que puede ser un teléfono o un correo. También puedes contarnos qué ' +
        'proyecto te interesa y dejarnos un mensaje.',
      'Este sitio no tiene servidor propio ni base de datos: no guarda nada de ' +
        'lo que escribes. Al enviar el formulario, tu navegador arma un mensaje ' +
        'con esos datos y lo entrega a WhatsApp o a tu programa de correo, y ' +
        'desde ahí nos llega a nosotros. En la práctica nos escribes tú, con la ' +
        'diferencia de que el sitio te redacta el mensaje.',
    ],
  },
  {
    titulo: 'Para qué los usamos',
    parrafos: [
      'Para responder tu consulta, decirte si calificas al subsidio DS19, ' +
        'coordinar una visita y acompañarte durante la compra si decides avanzar.',
      'No vendemos ni cedemos tus datos a terceros con fines comerciales, y no ' +
        'los usamos para enviarte publicidad que no hayas pedido.',
    ],
  },
  {
    titulo: 'Con quién se comparten',
    parrafos: [
      'Por la forma en que funciona el formulario, tus datos pasan por el ' +
        'servicio que uses para enviarlos: WhatsApp (Meta Platforms) o tu ' +
        'proveedor de correo. Cada uno tiene sus propias políticas de privacidad, ' +
        'que no controlamos.',
      'El sitio está alojado en Vercel, que procesa los datos técnicos de la ' +
        'conexión necesarios para servir las páginas.',
      '[COMPLETAR: si se usa un CRM, planilla compartida u otro sistema para ' +
        'seguir los contactos de venta, hay que nombrarlo aquí.]',
    ],
  },
  {
    titulo: 'Cuánto los conservamos',
    parrafos: [
      '[COMPLETAR: plazo de conservación de los contactos comerciales. Como ' +
        'referencia, lo habitual es conservarlos mientras dure la gestión de ' +
        'venta y por el plazo que exija la ley tributaria en caso de compra.]',
    ],
  },
  {
    titulo: 'Qué puedes exigirnos',
    parrafos: [
      'La Ley 21.719 te reconoce el derecho a saber qué datos tuyos tenemos, a ' +
        'corregirlos si están equivocados, a pedir que los eliminemos, a ' +
        'oponerte a que los usemos y a que te los entreguemos en un formato que ' +
        'puedas llevarte.',
      `Para ejercer cualquiera de esos derechos escríbenos a ${RESPONSABLE.email}. ` +
        'Te responderemos dentro de los plazos que fija la ley.',
      'Si consideras que no te respondimos bien, puedes reclamar ante la Agencia ' +
        'de Protección de Datos Personales.',
    ],
  },
  {
    titulo: 'Cookies y medición',
    parrafos: [
      'Este sitio no usa cookies de publicidad ni de seguimiento, y no te ' +
        'perfila para mostrarte avisos.',
      'Sí medimos cuántas visitas recibe cada página con una herramienta de ' +
        'analítica sin cookies, que entrega cifras agregadas y no permite ' +
        'identificar a nadie en particular. Por eso el sitio no te muestra un ' +
        'banner de consentimiento: no hay nada que consentir.',
    ],
  },
  {
    titulo: 'Menores de edad',
    parrafos: [
      'Este sitio está dirigido a personas mayores de 18 años. No pedimos ni ' +
        'buscamos datos de menores de edad.',
    ],
  },
  {
    titulo: 'Cambios a esta política',
    parrafos: [
      'Si cambiamos la forma en que tratamos los datos, actualizaremos esta ' +
        `página y la fecha de revisión. La versión vigente es de ${ACTUALIZACION}.`,
    ],
  },
];

export const TERMINOS = [
  {
    titulo: 'Qué es este sitio',
    parrafos: [
      `Este sitio es la vitrina comercial de ${RESPONSABLE.razonSocial}. Su ` +
        'propósito es informar sobre los proyectos de vivienda que ' +
        'desarrollamos y facilitar el contacto con nuestro equipo de venta.',
      'La información que publicamos no constituye una oferta en los términos ' +
        'del Código Civil ni una promesa de venta. Toda operación se formaliza ' +
        'en los documentos que se firman entre las partes, y es eso lo que obliga.',
    ],
  },
  {
    titulo: 'Precios y disponibilidad',
    parrafos: [
      'Los precios se expresan en Unidades de Fomento (UF) y corresponden al ' +
        'valor de entrada de cada proyecto: el de la unidad más económica ' +
        'disponible al momento de publicarlos. El valor final depende del modelo, ' +
        'la ubicación dentro del conjunto y las condiciones vigentes.',
      'Los precios y la disponibilidad cambian sin aviso. Que un proyecto ' +
        'aparezca en el sitio no garantiza que queden unidades.',
    ],
  },
  {
    titulo: 'Imágenes, planos y superficies',
    parrafos: [
      'Las imágenes de los proyectos son representaciones referenciales. El ' +
        'entorno, la vegetación, el mobiliario y las terminaciones que aparecen ' +
        'en ellas no forman parte de lo que se entrega, salvo que el contrato lo ' +
        'diga expresamente.',
      'Los planos publicados también son referenciales. Las superficies y ' +
        'medidas definitivas son las que consten en los documentos oficiales del ' +
        'proyecto y en la escritura.',
    ],
  },
  {
    titulo: 'Subsidio DS19',
    parrafos: [
      'El Programa de Integración Social y Territorial es un beneficio estatal ' +
        'administrado por el Ministerio de Vivienda y Urbanismo. Nosotros te ' +
        'acompañamos en la postulación y te decimos si calificas, pero no ' +
        'otorgamos el subsidio ni podemos garantizar que te lo asignen.',
      'Los requisitos, montos y plazos los fija el Minvu y pueden cambiar.',
    ],
  },
  {
    titulo: 'Uso del sitio',
    parrafos: [
      'Puedes navegar, consultar y compartir el contenido del sitio libremente. ' +
        'No puedes reproducir las imágenes, los planos ni los textos con fines ' +
        'comerciales sin nuestra autorización escrita.',
      'Las marcas, logotipos y nombres de proyecto son de nuestra propiedad o la ' +
        'usamos con autorización de su titular.',
    ],
  },
  {
    titulo: 'Enlaces a terceros',
    parrafos: [
      'El sitio enlaza a WhatsApp, a Google Maps y a nuestras redes sociales. ' +
        'Esos servicios son de terceros y se rigen por sus propias condiciones, ' +
        'que no controlamos.',
    ],
  },
  {
    titulo: 'Legislación aplicable',
    parrafos: [
      'Estas condiciones se rigen por la ley chilena. Cualquier controversia se ' +
        'somete a los tribunales ordinarios de justicia de [COMPLETAR: comuna ' +
        'del domicilio legal, habitualmente Talca].',
      'Nada de lo aquí escrito limita los derechos que te reconoce la Ley 19.496 ' +
        'sobre protección de los derechos de los consumidores.',
    ],
  },
];
