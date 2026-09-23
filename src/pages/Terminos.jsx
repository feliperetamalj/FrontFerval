import { PaginaLegal } from './PaginaLegal.jsx';
import { TERMINOS } from '../data/legales.js';

/** Terminos y condiciones. El contenido vive en `src/data/legales.js`. */
export function Terminos() {
  return (
    <PaginaLegal
      titulo="Términos y condiciones"
      bajada="El alcance de lo que publicamos en el sitio: precios, imágenes, planos y subsidio."
      secciones={TERMINOS}
    />
  );
}
