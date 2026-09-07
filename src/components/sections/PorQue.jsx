import { Contenedor, EncabezadoSeccion, Reveal, Seccion } from '../ui/index.js';
import { PILARES } from '../../data/empresa.js';
import estilos from './PorQue.module.css';

/** Iconos asignados a cada pilar, en el mismo orden en que se declaran. */
const ICONOS = ['grua', 'escudo', 'ubicacion', 'casa'];

/**
 * Diferenciadores de Ferval.
 *
 * Cada tarjeta cierra con un dato concreto (`nota`) en lugar de un adjetivo.
 * Es la seccion que responde "por que ustedes y no la inmobiliaria de al lado".
 */
export function PorQue() {
  return (
    <Seccion id="por-que">
      <Contenedor>
        <EncabezadoSeccion
          etiqueta="Por qué Ferval"
          titulo={<>No solo vendemos casas.<br />Las construimos.</>}
          bajada="La misma empresa compra el terreno, levanta la obra y te entrega las llaves. Eso cambia quién responde cuando algo tiene que salir bien."
        />

        <div className={estilos.rejilla}>
          {PILARES.map((pilar, indice) => (
            <Reveal key={pilar.id} retraso={indice * 80} className={estilos.celda}>
              <article className={estilos.tarjeta}>
                <span className={estilos.numero} aria-hidden="true">
                  {String(indice + 1).padStart(2, '0')}
                </span>
                <h3 className={estilos.titulo}>{pilar.titulo}</h3>
                <p className={estilos.texto}>{pilar.texto}</p>
                <p className={estilos.nota}>{pilar.nota}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Contenedor>
    </Seccion>
  );
}
