import { useCallback, useEffect, useState } from 'react';

import { Icono } from '../ui/index.js';
import { useBloqueoScroll } from '../../hooks/index.js';
import estilos from './VisorPlano.module.css';

/**
 * Visor del plano de un modelo.
 *
 * Sigue las mismas reglas que el visor de la galeria: bloquea el scroll de
 * fondo, se cierra con Escape o con un clic fuera del plano, y se puede
 * recorrer con las flechas del teclado.
 *
 * Las casas traen una planta por piso, asi que cuando hay mas de un plano
 * aparece un selector de nivel. Con uno solo el selector se omite: no tiene
 * sentido ofrecer una eleccion de una sola opcion.
 *
 * @param {object} props
 * @param {{nombre: string, tipologia?: string, planos: {src: string, etiqueta: string}[]}} props.modelo
 * @param {string} props.nombreProyecto
 * @param {() => void} props.onCerrar
 */
export function VisorPlano({ modelo, nombreProyecto, onCerrar }) {
  const [indice, setIndice] = useState(0);
  const planos = modelo.planos ?? [];
  const varios = planos.length > 1;

  useBloqueoScroll(true);

  const mover = useCallback(
    (delta) => setIndice((actual) => (actual + delta + planos.length) % planos.length),
    [planos.length],
  );

  useEffect(() => {
    const alPresionar = (evento) => {
      if (evento.key === 'Escape') onCerrar();
      if (varios && evento.key === 'ArrowRight') mover(1);
      if (varios && evento.key === 'ArrowLeft') mover(-1);
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [onCerrar, mover, varios]);

  if (!planos.length) return null;

  const actual = planos[indice];

  return (
    <div
      className={estilos.visor}
      role="dialog"
      aria-modal="true"
      aria-label={`Plano de ${modelo.nombre}, ${nombreProyecto}`}
      onClick={onCerrar}
    >
      {/* El panel detiene la propagacion: solo cierra el clic en el fondo. */}
      <div className={estilos.panel} onClick={(evento) => evento.stopPropagation()}>
        <header className={estilos.encabezado}>
          <div>
            <h2 className={estilos.titulo}>{modelo.nombre}</h2>
            <p className={estilos.subtitulo}>
              {nombreProyecto}
              {modelo.tipologia ? ` · ${modelo.tipologia}` : ''}
            </p>
          </div>
          <button type="button" className={estilos.cerrar} onClick={onCerrar} aria-label="Cerrar plano">
            <Icono nombre="cerrar" tamano={22} />
          </button>
        </header>

        {varios && (
          <div className={estilos.niveles} role="tablist" aria-label="Nivel del plano">
            {planos.map((plano, i) => (
              <button
                key={plano.src}
                type="button"
                role="tab"
                aria-selected={i === indice}
                className={`${estilos.nivel} ${i === indice ? estilos.nivelActivo : ''}`}
                onClick={() => setIndice(i)}
              >
                {plano.etiqueta}
              </button>
            ))}
          </div>
        )}

        <div className={estilos.lienzo}>
          <img
            src={actual.src}
            alt={`${actual.etiqueta} de ${modelo.nombre}, ${nombreProyecto}`}
            className={estilos.plano}
          />
        </div>

        <p className={estilos.nota}>
          Plano referencial. Las medidas y terminaciones pueden variar respecto
          de la unidad final.
        </p>
      </div>
    </div>
  );
}
