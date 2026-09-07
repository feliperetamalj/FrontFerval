import estilos from './Contenedor.module.css';

/**
 * Caja centrada con el ancho maximo y los margenes laterales del sistema.
 * Es el unico lugar donde se define el ancho de lectura del sitio.
 *
 * @param {object} props
 * @param {'normal'|'angosto'|'ancho'} [props.medida='normal']
 * @param {React.ElementType} [props.como='div'] etiqueta HTML a renderizar
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Contenedor({ medida = 'normal', como: Como = 'div', className = '', children, ...resto }) {
  return (
    <Como className={`${estilos.contenedor} ${estilos[medida]} ${className}`} {...resto}>
      {children}
    </Como>
  );
}
