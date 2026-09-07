import { useEffect, useRef, useState } from 'react';

/**
 * Revela un elemento cuando entra en el viewport.
 *
 * Usa IntersectionObserver (no escucha el evento scroll) para no bloquear el
 * hilo principal. Se desconecta apenas dispara: la animacion ocurre una sola
 * vez y el observador deja de consumir recursos.
 *
 * @param {object} [opciones]
 * @param {number} [opciones.umbral=0.15] fraccion visible que dispara el reveal
 * @param {string} [opciones.margen='0px 0px -10% 0px'] margen del root
 * @returns {[React.RefObject<HTMLElement>, boolean]} referencia y estado visible
 */
export function useScrollReveal({ umbral = 0.15, margen = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return undefined;

    // Sin soporte de IntersectionObserver el contenido se muestra de inmediato:
    // nunca debe quedar invisible por una carencia del navegador.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: umbral, rootMargin: margen },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [umbral, margen]);

  return [ref, visible];
}
