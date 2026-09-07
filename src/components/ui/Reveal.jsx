import { useScrollReveal } from '../../hooks/index.js';
import estilos from './Reveal.module.css';

/**
 * Envuelve contenido para que aparezca al entrar en pantalla.
 *
 * El desplazamiento es de solo 18px y la opacidad parte en 0: suficiente para
 * dar continuidad espacial sin marear. Con `prefers-reduced-motion` las
 * duraciones del sistema caen a 1ms, por lo que el contenido aparece de
 * inmediato sin necesidad de una rama aparte.
 *
 * @param {object} props
 * @param {number} [props.retraso=0] milisegundos de espera (efecto cascada)
 * @param {React.ElementType} [props.como='div']
 * @param {string} [props.className]
 */
export function Reveal({ retraso = 0, como: Como = 'div', className = '', children, ...resto }) {
  const [ref, visible] = useScrollReveal();

  return (
    <Como
      ref={ref}
      className={`${estilos.reveal} ${visible ? estilos.visible : ''} ${className}`}
      style={{ transitionDelay: `${retraso}ms` }}
      {...resto}
    >
      {children}
    </Como>
  );
}
