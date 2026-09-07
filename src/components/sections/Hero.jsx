import { Link } from 'react-router-dom';

import { Boton, Contenedor, Icono } from '../ui/index.js';
import { IMAGENES_GENERALES, CIFRAS, PROYECTO_DESTACADO } from '../../data/proyectos.js';
import { EMPRESA } from '../../data/empresa.js';
import { formatearUF, formatearNumero } from '../../utils/formato.js';
import { enlaceWhatsApp, MENSAJE_GENERAL } from '../../utils/contacto.js';
import estilos from './Hero.module.css';

/**
 * Seccion de apertura.
 *
 * Un solo mensaje y una sola accion principal. En vez del doble buscador de
 * seis campos del sitio anterior, el hero muestra el precio de entrada real
 * del portafolio y lleva directo al catalogo: el visitante ve un numero antes
 * de tener que decidir nada.
 */
export function Hero() {
  return (
    <section className={`${estilos.hero} on-dark`}>
      {/* Fotografia de fondo. `fetchpriority=high` la sube al frente de la cola
          de descarga: es el elemento LCP de la pagina. */}
      <img
        src={IMAGENES_GENERALES.heroPrincipal}
        alt=""
        className={estilos.fondo}
        fetchpriority="high"
        decoding="async"
      />
      <div className={estilos.velo} aria-hidden="true" />

      <Contenedor className={estilos.contenido}>
        <p className={estilos.antetitulo}>
          <span className={estilos.marcaNotch} aria-hidden="true" />
          {EMPRESA.ciudad} · {EMPRESA.region}
        </p>

        {/*
          Cada linea es un span en bloque, no un <br>. Ocultar un <br> en movil
          elimina tambien el espacio entre palabras ("el lugardonde"); con spans
          basta cambiar `display` y el espacio entre ellos se conserva.
        */}
        <h1 className={estilos.titular}>
          <span className={estilos.linea}>Construimos el lugar</span>{' '}
          <span className={estilos.linea}>
            donde parte<span className={estilos.acento}> tu historia.</span>
          </span>
        </h1>

        <p className={estilos.bajada}>
          {EMPRESA.promesa} Casas y departamentos desde{' '}
          <strong className="tabular">{formatearUF(CIFRAS.ufMinima)}</strong>, con
          subsidio DS19 y proyectos exclusivos en sitios urbanizados.
        </p>

        <div className={estilos.acciones}>
          <Boton como="a" href="#proyectos" tamano="lg" icono="flechaAbajo">
            Ver los {CIFRAS.proyectos} proyectos
          </Boton>
          <Boton
            como="a"
            href={enlaceWhatsApp(EMPRESA.contacto.whatsapp, MENSAJE_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            variante="contornoClaro"
            tamano="lg"
            icono="whatsapp"
          >
            Hablar con una ejecutiva
          </Boton>
        </div>

        {/* Cifras verificables, no adjetivos. */}
        <dl className={estilos.cifras}>
          <div className={estilos.cifra}>
            <dt>Años construyendo</dt>
            <dd className="tabular">+{EMPRESA.trayectoria.anios}</dd>
          </div>
          <div className={estilos.cifra}>
            <dt>Proyectos</dt>
            <dd className="tabular">{CIFRAS.proyectos}</dd>
          </div>
          <div className={estilos.cifra}>
            <dt>Comunas</dt>
            <dd className="tabular">{CIFRAS.comunas}</dd>
          </div>
          <div className={estilos.cifra}>
            <dt>Viviendas proyectadas</dt>
            <dd className="tabular">+{formatearNumero(CIFRAS.viviendas)}</dd>
          </div>
        </dl>
      </Contenedor>

      {/* Acceso directo al proyecto insignia, anclado a la esquina. */}
      <Link to={`/proyecto/${PROYECTO_DESTACADO.slug}`} className={estilos.destacado}>
        <img
          src={PROYECTO_DESTACADO.imagenes.hero}
          srcSet={PROYECTO_DESTACADO.imagenes.heroSrcSet}
          sizes="72px"
          alt=""
          className={estilos.destacadoImg}
          loading="lazy"
        />
        <span className={estilos.destacadoTexto}>
          <span className={estilos.destacadoEtiqueta}>Proyecto insignia</span>
          <span className={estilos.destacadoNombre}>{PROYECTO_DESTACADO.nombre}</span>
          <span className={estilos.destacadoComuna}>
            {PROYECTO_DESTACADO.comuna} · Casas de 150 a 308 m²
          </span>
        </span>
        <Icono nombre="flechaDerecha" tamano={20} className={estilos.destacadoFlecha} />
      </Link>
    </section>
  );
}
