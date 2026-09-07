import { TRAZADO_NOMBRE } from './nombreTrazado.js';
import estilos from './Logo.module.css';

/*
 * Geometria del logotipo oficial.
 *
 * Medida sobre el archivo original de 500x500 px, descontando su margen
 * transparente de 12 px. Sobre un lienzo de 476 unidades:
 *
 *   · marco cyan de 26 unidades de grosor
 *   · cuadro grafito interior de 424x424, con origen en (26, 26)
 *   · muesca cyan de 57x115 con origen en (342, 361), que baja hasta el borde
 *
 * La muesca es el rasgo distintivo de la marca y se reutiliza como recurso
 * grafico en tarjetas y separadores a lo largo del sitio.
 */
const LIENZO = 476;

/**
 * Marca sin texto: marco, cuadro y muesca.
 *
 * Es la version reducida del logotipo, para cuando el nombre no alcanzaria a
 * leerse (favicon, viñetas). En cualquier tamaño donde el texto sea legible
 * corresponde usar `Logo`, que es el logotipo oficial completo.
 */
export function Isotipo({ tamano = 40, className = '', titulo }) {
  return (
    <svg
      className={className}
      width={tamano}
      height={tamano}
      viewBox={`0 0 ${LIENZO} ${LIENZO}`}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : 'true'}
    >
      <rect width={LIENZO} height={LIENZO} fill="var(--cyan-500, #00B5EC)" />
      <rect x="26" y="26" width="424" height="424" fill="var(--graf-800, #2C292F)" />
      <rect x="342" y="361" width="57" height="115" fill="var(--cyan-500, #00B5EC)" />
    </svg>
  );
}

/**
 * Logotipo oficial de Ferval: la marca con "INMOBILIARIA FERVAL" dentro.
 *
 * El nombre va como trazado vectorial tomado del arte original en vez de
 * texto compuesto, para que las letras sean las de la marca y no las de la
 * tipografia del sitio. Como el nombre es dibujo y no texto, el nombre
 * accesible lo aporta `titulo`; si el logotipo ya va dentro de un enlace
 * etiquetado, se omite y el SVG queda oculto para lectores de pantalla.
 *
 * @param {object} props
 * @param {number} [props.tamano=52] lado del cuadrado en px
 * @param {string} [props.titulo] nombre accesible; sin el, el SVG es decorativo
 */
export function Logo({ tamano = 52, titulo, className = '' }) {
  return (
    <svg
      className={`${estilos.logo} ${className}`}
      width={tamano}
      height={tamano}
      viewBox={`0 0 ${LIENZO} ${LIENZO}`}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : 'true'}
    >
      {/* Marco cyan: cuadro completo del que se recorta el interior. */}
      <rect width={LIENZO} height={LIENZO} fill="var(--cyan-500, #00B5EC)" />
      {/* Cuadro grafito. */}
      <rect x="26" y="26" width="424" height="424" fill="var(--graf-800, #2C292F)" />
      {/* Muesca: deja ver el cyan del marco atravesando el borde inferior. */}
      <rect x="342" y="361" width="57" height="115" fill="var(--cyan-500, #00B5EC)" />
      {/* Nombre. `evenodd` vacia las contraformas de la O, la B, la R y la A. */}
      <path d={TRAZADO_NOMBRE} fill="var(--white, #FFFFFF)" fillRule="evenodd" />
    </svg>
  );
}
