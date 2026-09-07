import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restaura la posicion de scroll al navegar entre rutas.
 *
 * React Router conserva el desplazamiento al cambiar de pagina, lo que hace
 * que una ficha de proyecto se abra a media altura. Este componente no
 * renderiza nada: solo corrige ese comportamiento.
 *
 * Si la URL trae un ancla (#proyectos) se respeta y no se sube al tope.
 */
export function IrArriba() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
