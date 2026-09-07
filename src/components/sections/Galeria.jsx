import { useCallback, useEffect, useState } from 'react';

import { Icono } from '../ui/index.js';
import { useBloqueoScroll } from '../../hooks/index.js';
import estilos from './Galeria.module.css';

/**
 * Galeria de imagenes con visor a pantalla completa.
 *
 * El visor es un dialogo modal: bloquea el scroll de fondo, se cierra con
 * Escape o clic fuera, y permite navegar con las flechas del teclado.
 *
 * @param {object} props
 * @param {string[]} props.imagenes
 * @param {string} props.nombreProyecto  usado en los textos alternativos
 */
export function Galeria({ imagenes, nombreProyecto }) {
  const [indiceAbierto, setIndiceAbierto] = useState(null);
  const abierto = indiceAbierto !== null;

  useBloqueoScroll(abierto);

  const cerrar = useCallback(() => setIndiceAbierto(null), []);

  const mover = useCallback(
    (delta) => {
      setIndiceAbierto((actual) => {
        if (actual === null) return null;
        // Recorrido circular: desde la ultima se vuelve a la primera.
        return (actual + delta + imagenes.length) % imagenes.length;
      });
    },
    [imagenes.length],
  );

  useEffect(() => {
    if (!abierto) return undefined;

    const alPresionar = (evento) => {
      if (evento.key === 'Escape') cerrar();
      if (evento.key === 'ArrowRight') mover(1);
      if (evento.key === 'ArrowLeft') mover(-1);
    };

    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [abierto, cerrar, mover]);

  if (!imagenes?.length) return null;

  return (
    <>
      <ul className={estilos.rejilla}>
        {imagenes.map((imagen, indice) => (
          <li key={imagen} className={indice === 0 ? estilos.celdaGrande : ''}>
            <button
              type="button"
              className={estilos.miniatura}
              onClick={() => setIndiceAbierto(indice)}
              aria-label={`Ampliar imagen ${indice + 1} de ${imagenes.length} de ${nombreProyecto}`}
            >
              <img
                src={imagen}
                alt={`${nombreProyecto}, imagen ${indice + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>

      {abierto && (
        <div
          className={estilos.visor}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${nombreProyecto}`}
          onClick={cerrar}
        >
          <button type="button" className={estilos.cerrar} onClick={cerrar} aria-label="Cerrar galería">
            <Icono nombre="cerrar" tamano={24} />
          </button>

          <button
            type="button"
            className={`${estilos.navegar} ${estilos.anterior}`}
            onClick={(e) => { e.stopPropagation(); mover(-1); }}
            aria-label="Imagen anterior"
          >
            <Icono nombre="flechaDerecha" tamano={22} />
          </button>

          {/* stopPropagation evita que el clic sobre la imagen cierre el visor. */}
          <img
            src={imagenes[indiceAbierto]}
            alt={`${nombreProyecto}, imagen ${indiceAbierto + 1}`}
            className={estilos.imagenVisor}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className={`${estilos.navegar} ${estilos.siguiente}`}
            onClick={(e) => { e.stopPropagation(); mover(1); }}
            aria-label="Imagen siguiente"
          >
            <Icono nombre="flechaDerecha" tamano={22} />
          </button>

          <p className={estilos.contador} aria-live="polite">
            {indiceAbierto + 1} / {imagenes.length}
          </p>
        </div>
      )}
    </>
  );
}
