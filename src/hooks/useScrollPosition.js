import { useEffect, useState } from 'react';

/**
 * Informa si la pagina se desplazo mas alla de cierto umbral.
 * Lo usa el header para volverse opaco al separarse del hero.
 *
 * La lectura se hace dentro de requestAnimationFrame para evitar
 * "layout thrashing" en cada evento de scroll.
 *
 * @param {number} [umbral=24] pixeles desde el tope
 * @returns {boolean}
 */
export function useScrollPosition(umbral = 24) {
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => {
    let pendiente = false;

    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        setDesplazado(window.scrollY > umbral);
        pendiente = false;
      });
    };

    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, [umbral]);

  return desplazado;
}
