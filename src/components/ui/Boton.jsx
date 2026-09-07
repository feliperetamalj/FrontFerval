import { Icono } from './Icono.jsx';
import estilos from './Boton.module.css';

/**
 * Boton del sistema.
 *
 * Renderiza `<button>`, `<a>` o cualquier componente que se le pase en `como`
 * (por ejemplo el `Link` de React Router), manteniendo la misma apariencia.
 *
 * Regla de contraste heredada de la marca: la variante `primario` usa el cyan
 * como fondo con texto grafito. El cyan sobre blanco no alcanza 4.5:1, por lo
 * que nunca se usa como color de texto sobre superficies claras.
 *
 * @param {object} props
 * @param {'primario'|'secundario'|'contorno'|'contornoClaro'|'fantasma'} [props.variante='primario']
 * @param {'sm'|'md'|'lg'} [props.tamano='md']
 * @param {keyof import('./Icono.jsx')|string} [props.icono] nombre del icono final
 * @param {boolean} [props.anchoCompleto=false]
 * @param {React.ElementType} [props.como='button']
 * @param {string} [props.className]
 */
export function Boton({
  variante = 'primario',
  tamano = 'md',
  icono,
  anchoCompleto = false,
  como: Como = 'button',
  className = '',
  children,
  ...resto
}) {
  const clases = [
    estilos.boton,
    estilos[variante],
    estilos[tamano],
    anchoCompleto ? estilos.anchoCompleto : '',
    className,
  ].filter(Boolean).join(' ');

  // Un <button> sin `type` explicito envia el formulario que lo contiene.
  const tipo = Como === 'button' ? { type: resto.type ?? 'button' } : {};

  return (
    <Como className={clases} {...tipo} {...resto}>
      <span className={estilos.etiqueta}>{children}</span>
      {icono && <Icono nombre={icono} tamano={18} className={estilos.icono} />}
    </Como>
  );
}
