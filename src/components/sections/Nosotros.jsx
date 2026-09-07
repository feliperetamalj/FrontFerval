import { Boton, Contenedor, Reveal, Seccion } from '../ui/index.js';
import { IMAGENES_GENERALES, CIFRAS } from '../../data/proyectos.js';
import { EMPRESA } from '../../data/empresa.js';
import { formatearNumero } from '../../utils/formato.js';
import estilos from './Nosotros.module.css';

/**
 * Quienes somos.
 *
 * La fotografia es de un proyecto ya terminado y habitado, no un render: es la
 * prueba mas directa de que la empresa efectivamente construye lo que vende.
 */
export function Nosotros() {
  return (
    <Seccion id="nosotros">
      <Contenedor>
        <div className={estilos.disposicion}>
          <Reveal className={estilos.columnaImagen}>
            <figure className={estilos.figura}>
              <img
                src={IMAGENES_GENERALES.nosotros}
                alt="Conjunto residencial construido y entregado por Ferval, con áreas verdes y juegos infantiles"
                className={estilos.imagen}
                loading="lazy"
                decoding="async"
              />
              <figcaption className={estilos.pie}>
                Proyecto entregado y habitado. Fotografía real, no render.
              </figcaption>
            </figure>
          </Reveal>

          <div className={estilos.columnaTexto}>
            <p className={estilos.etiqueta}>
              <span className={estilos.notch} aria-hidden="true" />
              Nosotros
            </p>

            <h2 className={estilos.titulo}>
              Somos de acá.
              <br />
              Construimos acá.
            </h2>

            <div className={estilos.parrafos}>
              <p>
                {EMPRESA.nombreLegal} nació en {EMPRESA.ciudad} y lleva más de una
                década levantando barrios en la {EMPRESA.region}. Compramos el
                terreno, diseñamos el proyecto, lo construimos y lo vendemos:
                cuando algo tiene que salir bien, hay un solo responsable.
              </p>
              <p>
                Trabajamos en los dos extremos del mercado con el mismo estándar.
                Departamentos con subsidio DS19 para quienes compran su primera
                vivienda, y casas de hasta 308 m² en sitios urbanizados para
                quienes buscan la definitiva.
              </p>
            </div>

            <dl className={estilos.cifras}>
              <div>
                <dt>Años de trayectoria</dt>
                <dd className="tabular">+{EMPRESA.trayectoria.anios}</dd>
              </div>
              <div>
                <dt>Viviendas proyectadas</dt>
                <dd className="tabular">+{formatearNumero(CIFRAS.viviendas)}</dd>
              </div>
              <div>
                <dt>Comunas con presencia</dt>
                <dd className="tabular">{CIFRAS.comunas}</dd>
              </div>
            </dl>

            <Boton como="a" href="#contacto" variante="contorno" icono="flechaDerecha">
              Conversemos
            </Boton>
          </div>
        </div>
      </Contenedor>
    </Seccion>
  );
}
