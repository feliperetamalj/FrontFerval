import estilos from './Etiqueta.module.css';

/**
 * Insignia corta para estados y atributos (En venta, DS19, Entrega inmediata).
 *
 * El color nunca es el unico portador del significado: la etiqueta siempre
 * lleva texto legible, requisito de accesibilidad.
 *
 * @param {object} props
 * @param {'neutro'|'marca'|'exito'|'aviso'|'claro'} [props.tono='neutro']
 * @param {boolean} [props.punto=false] muestra un punto delante del texto
 * @param {string} [props.className]
 */
export function Etiqueta({ tono = 'neutro', punto = false, className = '', children }) {
  return (
    <span className={`${estilos.etiqueta} ${estilos[tono]} ${className}`}>
      {punto && <span className={estilos.punto} aria-hidden="true" />}
      {children}
    </span>
  );
}
