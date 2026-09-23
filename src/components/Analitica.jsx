import { Analytics } from '@vercel/analytics/react';

/**
 * Medicion de visitas.
 *
 * Usa Vercel Analytics, que no deja cookies ni identificadores persistentes:
 * entrega cifras agregadas de paginas vistas y no permite reconstruir el
 * recorrido de una persona. Por eso el sitio no muestra banner de
 * consentimiento, y la politica de privacidad lo explica en esos terminos.
 *
 * Solo mide en produccion. En desarrollo el paquete no envia nada, pero
 * tampoco tiene sentido montarlo: las visitas del equipo ensuciarian las
 * cifras del primer mes, que es justo cuando se quiere ver si el sitio
 * convierte.
 *
 * Si algun dia se cambia a una herramienta con cookies, como Google
 * Analytics, hay tres cosas que mover juntas: montar `BannerCookies`, cargar
 * el script solo despues del consentimiento, y reescribir la seccion de
 * cookies de `src/data/legales.js`.
 */
export function Analitica() {
  if (!import.meta.env.PROD) return null;
  return <Analytics />;
}
