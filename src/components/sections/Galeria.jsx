import { useCallback, useEffect, useRef, useState } from 'react';

import { Icono } from '../ui/index.js';
import { useBloqueoScroll, usePrefiereMenosMovimiento } from '../../hooks/index.js';
import estilos from './Galeria.module.css';

/** Milisegundos que permanece cada imagen antes de pasar sola a la siguiente. */
const INTERVALO = 5000;

/** Desplazamiento horizontal minimo, en px, para que un arrastre cuente como gesto. */
const UMBRAL_GESTO = 45;

/**
 * Carrusel de imagenes del proyecto, con visor a pantalla completa.
 *
 * Avanza solo cada 5 segundos mientras nadie lo toca. Se detiene con el cursor
 * encima, con el foco dentro, mientras se arrastra, con el visor abierto y
 * cuando la pestaña deja de estar visible; al soltarlo retoma. Cualquier
 * navegacion manual reinicia la cuenta, de modo que una imagen elegida a mano
 * no se cambia sola a los pocos milisegundos.
 *
 * Con `prefers-reduced-motion` no hay avance automatico ni transicion: el
 * movimiento pasa a ser siempre decision del usuario.
 *
 * El visor es un dialogo modal: bloquea el scroll de fondo, se cierra con
 * Escape o clic fuera, y permite navegar con las flechas del teclado.
 *
 * @param {object} props
 * @param {string[]} props.imagenes
 * @param {string} props.nombreProyecto  usado en los textos alternativos
 */
export function Galeria({ imagenes, nombreProyecto }) {
  const [indice, setIndice] = useState(0);
  const [indiceAbierto, setIndiceAbierto] = useState(null);
  const [detenido, setDetenido] = useState(false);
  const [pestanaOculta, setPestanaOculta] = useState(false);

  const sinMovimiento = usePrefiereMenosMovimiento();
  const abierto = indiceAbierto !== null;
  const total = imagenes?.length ?? 0;

  useBloqueoScroll(abierto);

  const irA = useCallback(
    (siguiente) => setIndice(((siguiente % total) + total) % total),
    [total],
  );

  const mover = useCallback((delta) => irA(indice + delta), [irA, indice]);

  const moverVisor = useCallback(
    (delta) => {
      setIndiceAbierto((actual) => (actual === null ? null : (actual + delta + total) % total));
    },
    [total],
  );

  /* --- Avance automatico -------------------------------------------------- */

  // La pestaña en segundo plano no debe consumir el carrusel: al volver, el
  // usuario encontraria una imagen que nunca vio avanzar.
  useEffect(() => {
    const alCambiar = () => setPestanaOculta(document.hidden);
    document.addEventListener('visibilitychange', alCambiar);
    return () => document.removeEventListener('visibilitychange', alCambiar);
  }, []);

  const enPausa = detenido || abierto || pestanaOculta || sinMovimiento || total < 2;

  // `indice` esta entre las dependencias a proposito: cada cambio -manual o
  // automatico- reinicia el temporizador.
  useEffect(() => {
    if (enPausa) return undefined;
    const id = setTimeout(() => irA(indice + 1), INTERVALO);
    return () => clearTimeout(id);
  }, [enPausa, indice, irA]);

  /* --- Gesto de arrastre --------------------------------------------------- */

  const origenX = useRef(null);

  const alPresionar = (evento) => {
    origenX.current = evento.clientX;
    setDetenido(true);
  };

  const alSoltar = (evento) => {
    const inicio = origenX.current;
    origenX.current = null;
    setDetenido(false);
    if (inicio === null) return;

    const recorrido = evento.clientX - inicio;
    if (Math.abs(recorrido) >= UMBRAL_GESTO) mover(recorrido < 0 ? 1 : -1);
  };

  /* --- Teclado del visor --------------------------------------------------- */

  const cerrar = useCallback(() => setIndiceAbierto(null), []);

  useEffect(() => {
    if (!abierto) return undefined;

    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') cerrar();
      if (evento.key === 'ArrowRight') moverVisor(1);
      if (evento.key === 'ArrowLeft') moverVisor(-1);
    };

    window.addEventListener('keydown', alPresionarTecla);
    return () => window.removeEventListener('keydown', alPresionarTecla);
  }, [abierto, cerrar, moverVisor]);

  if (!total) return null;

  return (
    <>
      <div
        className={estilos.carrusel}
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Imágenes de ${nombreProyecto}`}
        onMouseEnter={() => setDetenido(true)}
        onMouseLeave={() => setDetenido(false)}
        onFocusCapture={() => setDetenido(true)}
        onBlurCapture={() => setDetenido(false)}
        onPointerDown={alPresionar}
        onPointerUp={alSoltar}
        onPointerCancel={() => { origenX.current = null; setDetenido(false); }}
      >
        <div className={estilos.marco}>
          <div
            className={`${estilos.pista} ${sinMovimiento ? estilos.sinTransicion : ''}`}
            style={{ transform: `translate3d(-${indice * 100}%, 0, 0)` }}
          >
            {imagenes.map((imagen, i) => (
              <div
                key={imagen}
                className={estilos.diapositiva}
                aria-hidden={i === indice ? undefined : 'true'}
              >
                <button
                  type="button"
                  className={estilos.ampliar}
                  // Las diapositivas ocultas quedan fuera del recorrido del
                  // tabulador: nadie deberia enfocar algo que no esta viendo.
                  tabIndex={i === indice ? 0 : -1}
                  onClick={() => setIndiceAbierto(i)}
                  aria-label={`Ampliar imagen ${i + 1} de ${total} de ${nombreProyecto}`}
                >
                  <img
                    src={imagen}
                    alt={`${nombreProyecto}, imagen ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable="false"
                  />
                </button>
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                className={`${estilos.navegar} ${estilos.anterior}`}
                onClick={() => mover(-1)}
                aria-label="Imagen anterior"
              >
                <Icono nombre="flechaDerecha" tamano={22} />
              </button>
              <button
                type="button"
                className={`${estilos.navegar} ${estilos.siguiente}`}
                onClick={() => mover(1)}
                aria-label="Imagen siguiente"
              >
                <Icono nombre="flechaDerecha" tamano={22} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className={estilos.controles}>
            <div className={estilos.puntos}>
              {imagenes.map((imagen, i) => (
                <button
                  key={imagen}
                  type="button"
                  className={`${estilos.punto} ${i === indice ? estilos.puntoActivo : ''}`}
                  onClick={() => irA(i)}
                  aria-label={`Ir a la imagen ${i + 1}`}
                  aria-current={i === indice ? 'true' : undefined}
                />
              ))}
            </div>

            <p className={`${estilos.contador} tabular`} aria-live="polite">
              {indice + 1} / {total}
            </p>
          </div>
        )}
      </div>

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
            className={`${estilos.navegarVisor} ${estilos.anteriorVisor}`}
            onClick={(e) => { e.stopPropagation(); moverVisor(-1); }}
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
            className={`${estilos.navegarVisor} ${estilos.siguienteVisor}`}
            onClick={(e) => { e.stopPropagation(); moverVisor(1); }}
            aria-label="Imagen siguiente"
          >
            <Icono nombre="flechaDerecha" tamano={22} />
          </button>

          <p className={estilos.contadorVisor} aria-live="polite">
            {indiceAbierto + 1} / {total}
          </p>
        </div>
      )}
    </>
  );
}
