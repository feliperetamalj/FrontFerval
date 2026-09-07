import estilos from './Logo.module.css';

/**
 * Identidad visual de Ferval.
 *
 * El isotipo se redibujo como SVG a partir de las medidas exactas del logo
 * original (archivo de 500x500 px), descontando el margen transparente de
 * 12 px. Sobre un lienzo de 476 unidades:
 *
 *   · marco cyan de 25 unidades de grosor
 *   · cuadro grafito interior de 426x426, con origen en (25, 25)
 *   · muesca cyan de 57x115 con origen en (342, 361), que baja hasta el borde
 *
 * La muesca es el rasgo distintivo de la marca y se reutiliza como recurso
 * grafico en tarjetas y separadores a lo largo del sitio.
 */
export function Isotipo({ tamano = 40, className = '', titulo }) {
  return (
    <svg
      className={className}
      width={tamano}
      height={tamano}
      viewBox="0 0 476 476"
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : 'true'}
    >
      {/* Marco cyan: cuadro completo del que se recorta el interior. */}
      <rect width="476" height="476" fill="var(--cyan-500, #00B5EC)" />
      {/* Cuadro grafito. */}
      <rect x="25" y="25" width="426" height="426" fill="var(--graf-800, #2C292F)" />
      {/* Muesca: deja ver el cyan del marco atravesando el borde inferior. */}
      <rect x="342" y="361" width="57" height="115" fill="var(--cyan-500, #00B5EC)" />
    </svg>
  );
}

/**
 * Lockup horizontal: isotipo + nombre.
 *
 * El nombre va como texto real (no trazado) para que sea seleccionable,
 * legible por lectores de pantalla y nitido en cualquier resolucion.
 *
 * @param {object} props
 * @param {'claro'|'oscuro'} [props.tono='oscuro'] color del texto
 * @param {boolean} [props.conDescriptor=true] muestra "Inmobiliaria y Constructora"
 * @param {number} [props.tamano=38] lado del isotipo en px
 */
export function Logo({ tono = 'oscuro', conDescriptor = true, tamano = 38, className = '' }) {
  return (
    <span className={`${estilos.logo} ${estilos[tono]} ${className}`}>
      <Isotipo tamano={tamano} className={estilos.marca} />
      <span className={estilos.texto}>
        <span className={estilos.nombre}>Ferval</span>
        {conDescriptor && (
          <span className={estilos.descriptor}>Inmobiliaria y Constructora</span>
        )}
      </span>
    </span>
  );
}
