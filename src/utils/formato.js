/**
 * Utilidades de formato para el mercado chileno.
 * Todas devuelven cadenas listas para renderizar.
 */

/** Formateador de numeros con separador de miles chileno (punto). */
const numeroCL = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });

/**
 * Formatea un valor en Unidades de Fomento.
 * @param {number|null|undefined} uf
 * @param {string} [fallback='Consultar'] texto cuando no hay precio publicado
 * @returns {string} p. ej. "UF 1.550"
 */
export function formatearUF(uf, fallback = 'Consultar') {
  if (typeof uf !== 'number' || Number.isNaN(uf)) return fallback;
  return `UF ${numeroCL.format(uf)}`;
}

/**
 * Formatea metros cuadrados respetando decimales solo cuando existen.
 * @param {number} m2
 * @returns {string} p. ej. "62,15 m²" o "84 m²"
 */
export function formatearM2(m2) {
  if (typeof m2 !== 'number' || Number.isNaN(m2)) return '—';
  const texto = Number.isInteger(m2)
    ? numeroCL.format(m2)
    : m2.toFixed(2).replace('.', ',').replace(/,00$/, '');
  return `${texto} m²`;
}

/**
 * Convierte un rango {min, max} en texto, colapsandolo si ambos coinciden.
 * @param {{min:number,max:number}} rango
 * @param {(n:number)=>string} [formateador] como formatear cada extremo
 * @returns {string} p. ej. "65 a 84 m²" o "84 m²"
 */
export function formatearRango(rango, formateador = (n) => String(n)) {
  if (!rango) return '—';
  const { min, max } = rango;
  return min === max ? formateador(max) : `${formateador(min)} a ${formateador(max)}`;
}

/** Rango de superficie: "65 a 84 m²". Evita repetir la unidad dos veces. */
export function formatearRangoM2(rango) {
  if (!rango) return '—';
  const { min, max } = rango;
  if (min === max) return formatearM2(max);
  return `${formatearM2(min).replace(' m²', '')} a ${formatearM2(max)}`;
}

/**
 * Rango de dormitorios o banos.
 * Dos valores consecutivos son una eleccion ("1 o 2"); un tramo mas amplio es
 * un recorrido ("3 a 5"). Decir "3 o 5" implicaria que no existe el 4.
 */
export function formatearRangoSimple(rango) {
  if (!rango) return '—';
  const { min, max } = rango;
  if (min === max) return String(max);
  return max - min === 1 ? `${min} o ${max}` : `${min} a ${max}`;
}

/**
 * Rango de superficie redondeado a enteros, para espacios estrechos como las
 * tarjetas del portafolio. "60,79 a 65,32 m²" se vuelve ilegible en una fila
 * de tres columnas; "61 a 65 m²" comunica lo mismo.
 */
export function formatearRangoM2Compacto(rango) {
  if (!rango) return '—';
  const min = Math.round(rango.min);
  const max = Math.round(rango.max);
  return min === max ? `${numeroCL.format(max)} m²` : `${numeroCL.format(min)}–${numeroCL.format(max)} m²`;
}

/** Numero con separador de miles: 490 -> "490", 1550 -> "1.550". */
export const formatearNumero = (n) => numeroCL.format(n ?? 0);
