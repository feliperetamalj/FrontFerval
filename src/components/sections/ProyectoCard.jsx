import { Link } from 'react-router-dom';

import { Etiqueta, Icono } from '../ui/index.js';
import { ESTADOS } from '../../data/proyectos.js';
import { formatearUF, formatearRangoM2Compacto, formatearRangoSimple } from '../../utils/formato.js';
import estilos from './ProyectoCard.module.css';

/**
 * Tarjeta de proyecto del portafolio.
 *
 * Muestra en la superficie los cuatro datos que deciden una compra —precio de
 * entrada, superficie, dormitorios y banos— en lugar de esconderlos tras un
 * parrafo descriptivo. Toda la tarjeta es un unico enlace: no hay controles
 * anidados que compitan por el foco del teclado.
 *
 * @param {object} props
 * @param {import('../../data/proyectos.js').PROYECTOS[number]} props.proyecto
 * @param {'normal'|'ancha'} [props.formato='normal']
 */
/*
 * Ancho del hueco que ocupa la imagen, para que el navegador elija el escalon
 * del `srcset` antes de conocer el layout. La rejilla es
 * `auto-fill minmax(320px, 1fr)` dentro de un contenedor de 1280 px: en
 * escritorio caben tres columnas de ~413 px, y la tarjeta destacada ocupa dos.
 */
const SIZES_NORMAL = '(min-width: 1360px) 413px, (min-width: 900px) 32vw, (min-width: 561px) 48vw, 94vw';
const SIZES_ANCHA = '(min-width: 1360px) 846px, (min-width: 900px) 65vw, (min-width: 561px) 48vw, 94vw';

export function ProyectoCard({ proyecto, formato = 'normal' }) {
  const estado = ESTADOS[proyecto.estado];

  return (
    <article className={`${estilos.tarjeta} ${estilos[formato]}`}>
      <Link to={`/proyecto/${proyecto.slug}`} className={estilos.enlace}>
        <div className={estilos.media}>
          <img
            src={proyecto.imagenes.hero}
            srcSet={proyecto.imagenes.heroSrcSet}
            sizes={formato === 'ancha' ? SIZES_ANCHA : SIZES_NORMAL}
            alt={`${proyecto.nombre}, ${proyecto.comuna}`}
            className={estilos.imagen}
            loading="lazy"
            decoding="async"
          />

          <div className={estilos.insignias}>
            <Etiqueta tono={estado.tono === 'exito' ? 'exito' : 'claro'} punto>
              {estado.etiqueta}
            </Etiqueta>
            {proyecto.subsidio && <Etiqueta tono="claro">Subsidio DS19</Etiqueta>}
          </div>

          {proyecto.imagenes.logo && (
            <img
              src={proyecto.imagenes.logo}
              alt=""
              className={estilos.logoProyecto}
              loading="lazy"
            />
          )}
        </div>

        <div className={estilos.cuerpo}>
          <header className={estilos.encabezado}>
            <h3 className={estilos.nombre}>{proyecto.nombre}</h3>
            <p className={estilos.ubicacion}>
              <Icono nombre="ubicacion" tamano={15} />
              {proyecto.comuna}
              <span className={estilos.separador} aria-hidden="true">·</span>
              {proyecto.tipo === 'casa' ? 'Casas' : 'Departamentos'}
            </p>
          </header>

          <p className={estilos.resumen}>{proyecto.resumen}</p>

          {/* Ficha tecnica. `dl` porque son pares atributo/valor. */}
          <dl className={estilos.especificaciones}>
            <div className={estilos.precio}>
              <dt>Desde</dt>
              <dd className="tabular">{formatearUF(proyecto.desdeUF)}</dd>
            </div>
            <div className={estilos.specs}>
              <div className={estilos.spec}>
                <dt><Icono nombre="superficie" tamano={16} /><span className="sr-only">Superficie</span></dt>
                <dd className="tabular">{formatearRangoM2Compacto(proyecto.superficie)}</dd>
              </div>
              <div className={estilos.spec}>
                <dt><Icono nombre="dormitorio" tamano={16} /><span className="sr-only">Dormitorios</span></dt>
                <dd className="tabular">{formatearRangoSimple(proyecto.dormitorios)} dorm.</dd>
              </div>
              <div className={estilos.spec}>
                <dt><Icono nombre="bano" tamano={16} /><span className="sr-only">Baños</span></dt>
                <dd className="tabular">{formatearRangoSimple(proyecto.banos)}</dd>
              </div>
            </div>
          </dl>

          <span className={estilos.accion}>
            Ver proyecto
            <Icono nombre="flechaDerecha" tamano={17} />
          </span>
        </div>
      </Link>
    </article>
  );
}
