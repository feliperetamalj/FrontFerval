/**
 * Generacion de enlaces de contacto.
 *
 * El sitio no tiene backend: los formularios abren WhatsApp o el cliente de
 * correo con el mensaje ya redactado. Estas funciones centralizan ese armado
 * para que el texto sea consistente en toda la pagina.
 */

import { EMPRESA } from '../data/empresa.js';

/**
 * Construye un enlace de WhatsApp con mensaje precargado.
 * @param {string} numero  numero en formato internacional sin signos (56912345678)
 * @param {string} mensaje texto que vera el usuario en el chat
 * @returns {string} URL de wa.me
 */
export function enlaceWhatsApp(numero, mensaje) {
  const destino = (numero || EMPRESA.contacto.whatsapp).replace(/\D/g, '');
  return `https://wa.me/${destino}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Construye un enlace mailto con asunto y cuerpo.
 * @param {string} destinatario
 * @param {string} asunto
 * @param {string} cuerpo
 * @returns {string}
 */
export function enlaceCorreo(destinatario, asunto, cuerpo) {
  const para = destinatario || EMPRESA.contacto.email;
  const params = new URLSearchParams({ subject: asunto, body: cuerpo });
  // URLSearchParams codifica los espacios como '+'; mailto requiere %20.
  return `mailto:${para}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * Mensaje estandar de interes en un proyecto.
 * @param {{nombre:string, comuna:string}} proyecto
 * @returns {string}
 */
export const mensajeProyecto = (proyecto) =>
  `Hola, vi ${proyecto.nombre} en ${proyecto.comuna} en el sitio de Ferval y me gustaría recibir más información.`;

/** Mensaje generico cuando el usuario no viene desde un proyecto concreto. */
export const MENSAJE_GENERAL =
  'Hola, me gustaría recibir información sobre los proyectos de Ferval.';

/**
 * Arma el mensaje del formulario de contacto a partir de sus campos.
 * @param {{nombre:string, telefono:string, email:string, proyecto:string, mensaje:string}} datos
 * @returns {string}
 */
export function mensajeFormulario({ nombre, telefono, email, proyecto, mensaje }) {
  const lineas = [
    'Hola, escribo desde el sitio de Ferval.',
    '',
    `Nombre: ${nombre}`,
    telefono ? `Teléfono: ${telefono}` : null,
    email ? `Email: ${email}` : null,
    proyecto ? `Proyecto de interés: ${proyecto}` : null,
    '',
    mensaje,
  ];
  return lineas.filter((l) => l !== null).join('\n');
}
