import { Link } from 'react-router-dom';

import { Contenedor, Icono, Seccion } from '../components/ui/index.js';
import { ACTUALIZACION } from '../data/legales.js';
import estilos from './PaginaLegal.module.css';

/**
 * Armazon compartido de las paginas legales.
 *
 * Son textos largos y se leen distinto que el resto del sitio: la medida de
 * linea se acorta a unos 70 caracteres y el cuerpo crece, porque aqui nadie
 * esta mirando fotos sino buscando un parrafo concreto.
 *
 * Lo que venga marcado como [COMPLETAR] se resalta en pantalla a proposito.
 * Un texto legal a medio terminar publicado sin que nadie lo note es peor que
 * uno que se ve evidentemente incompleto.
 *
 * @param {object} props
 * @param {string} props.titulo
 * @param {string} props.bajada
 * @param {{titulo: string, parrafos: string[]}[]} props.secciones
 */
export function PaginaLegal({ titulo, bajada, secciones }) {
  return (
    <Seccion className={estilos.pagina}>
      <Contenedor>
        <nav className={estilos.migas} aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span>{titulo}</span>
        </nav>

        <h1 className={estilos.titulo}>{titulo}</h1>
        <p className={estilos.bajada}>{bajada}</p>
        <p className={estilos.fecha}>Última actualización: {ACTUALIZACION}</p>

        <div className={estilos.cuerpo}>
          {secciones.map((seccion) => (
            <section key={seccion.titulo}>
              <h2 className={estilos.subtitulo}>{seccion.titulo}</h2>
              {seccion.parrafos.map((parrafo) => (
                <p key={parrafo} className={estilos.parrafo}>
                  {resaltarPendientes(parrafo)}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className={estilos.pie}>
          <Link to="/" className={estilos.volver}>
            <Icono nombre="flechaDerecha" tamano={17} />
            Volver al inicio
          </Link>
        </p>
      </Contenedor>
    </Seccion>
  );
}

/** Envuelve cada [COMPLETAR: ...] en una marca visible. */
function resaltarPendientes(texto) {
  const partes = texto.split(/(\[COMPLETAR[^\]]*\])/g);
  return partes.map((parte, i) =>
    parte.startsWith('[COMPLETAR')
      ? (
        <mark key={i} className={estilos.pendiente}>
          {parte}
        </mark>
        )
      : parte,
  );
}
