import { useEffect, useState } from 'react';

/**
 * Suscribe un componente a una media query de CSS.
 *
 * @param {string} consulta p. ej. '(max-width: 860px)'
 * @returns {boolean} true si la consulta se cumple
 */
export function useMediaQuery(consulta) {
  // En el primer render del servidor `window` no existe; se asume false.
  const [coincide, setCoincide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(consulta).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(consulta);
    const alCambiar = (evento) => setCoincide(evento.matches);

    // Sincroniza por si la consulta cambio entre el render y el efecto.
    setCoincide(mql.matches);
    mql.addEventListener('change', alCambiar);
    return () => mql.removeEventListener('change', alCambiar);
  }, [consulta]);

  return coincide;
}

/** Atajo: true cuando el usuario pidio reducir el movimiento. */
export const usePrefiereMenosMovimiento = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');
