import { PaginaLegal } from './PaginaLegal.jsx';
import { PRIVACIDAD } from '../data/legales.js';

/** Politica de privacidad. El contenido vive en `src/data/legales.js`. */
export function Privacidad() {
  return (
    <PaginaLegal
      titulo="Política de privacidad"
      bajada="Qué datos te pedimos, por dónde viajan y qué puedes exigirnos sobre ellos."
      secciones={PRIVACIDAD}
    />
  );
}
