import { useEffect } from 'react';

/**
 * Bloquea el scroll del documento mientras hay una capa modal abierta
 * (menu movil, galeria a pantalla completa).
 *
 * Compensa el ancho de la barra de scroll para que el contenido no salte
 * lateralmente al bloquearse.
 *
 * @param {boolean} activo
 */
export function useBloqueoScroll(activo) {
  useEffect(() => {
    if (!activo) return undefined;

    const { body } = document;
    const overflowPrevio = body.style.overflow;
    const paddingPrevio = body.style.paddingRight;
    const anchoBarra = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (anchoBarra > 0) body.style.paddingRight = `${anchoBarra}px`;

    return () => {
      body.style.overflow = overflowPrevio;
      body.style.paddingRight = paddingPrevio;
    };
  }, [activo]);
}
