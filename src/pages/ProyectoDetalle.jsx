import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Boton, Contenedor, Etiqueta, Icono, Reveal, Seccion } from '../components/ui/index.js';
import { Galeria, ProyectoCard } from '../components/sections/index.js';
import { proyectoPorSlug, PROYECTOS, ESTADOS } from '../data/proyectos.js';
import { EMPRESA } from '../data/empresa.js';
import {
  formatearUF,
  formatearM2,
  formatearRangoM2,
  formatearRangoSimple,
  formatearNumero,
} from '../utils/formato.js';
import { enlaceWhatsApp, enlaceCorreo, mensajeProyecto } from '../utils/contacto.js';
import estilos from './ProyectoDetalle.module.css';

/**
 * Ficha individual de proyecto.
 *
 * Estructura: portada -> ficha tecnica -> descripcion y caracteristicas ->
 * galeria -> modelos disponibles -> equipo de venta -> otros proyectos.
 *
 * El bloque de contacto usa la ejecutiva asignada al proyecto cuando existe;
 * si no, cae al numero comercial general.
 */
export function ProyectoDetalle() {
  const { slug } = useParams();
  const proyecto = proyectoPorSlug(slug);

  useEffect(() => {
    if (proyecto) {
      document.title = `${proyecto.nombre} · ${proyecto.comuna} · Ferval`;
    }
  }, [proyecto]);

  // Slug inexistente: se delega en la ruta comodin en vez de renderizar vacio.
  if (!proyecto) return <Navigate to="/404" replace />;

  const estado = ESTADOS[proyecto.estado];
  const mensaje = mensajeProyecto(proyecto);
  const contactoPrincipal = proyecto.ejecutivas[0];
  const whatsapp = contactoPrincipal?.whatsapp ?? EMPRESA.contacto.whatsapp;
  const correo = contactoPrincipal?.email ?? EMPRESA.contacto.email;

  const otros = PROYECTOS.filter((p) => p.slug !== proyecto.slug).slice(0, 3);

  return (
    <article>
      {/* ---------------------------------------------------------------- */}
      {/* Portada                                                           */}
      {/* ---------------------------------------------------------------- */}
      <header className={`${estilos.portada} on-dark`}>
        <img
          src={proyecto.imagenes.hero}
          srcSet={proyecto.imagenes.heroSrcSet}
          sizes="100vw"
          alt=""
          className={estilos.portadaImg}
          fetchpriority="high"
        />
        <div className={estilos.portadaVelo} aria-hidden="true" />

        <Contenedor className={estilos.portadaContenido}>
          <nav className={estilos.migas} aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link to="/#proyectos">Proyectos</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{proyecto.nombre}</span>
          </nav>

          <div className={estilos.insignias}>
            <Etiqueta tono={estado.tono === 'exito' ? 'exito' : 'claro'} punto>
              {estado.etiqueta}
            </Etiqueta>
            {proyecto.subsidio && <Etiqueta tono="claro">Subsidio DS19</Etiqueta>}
            <Etiqueta tono="claro">
              {proyecto.tipo === 'casa' ? 'Casas' : 'Departamentos'}
            </Etiqueta>
          </div>

          <h1 className={estilos.nombre}>{proyecto.nombre}</h1>
          <p className={estilos.titular}>{proyecto.titular}</p>

          <p className={estilos.ubicacion}>
            <Icono nombre="ubicacion" tamano={18} />
            {proyecto.comuna}, {proyecto.region}
          </p>
        </Contenedor>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Ficha tecnica                                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className={estilos.barraDatos}>
        <Contenedor>
          <dl className={estilos.datos}>
            <div className={estilos.datoDestacado}>
              <dt>Precio desde</dt>
              <dd className="tabular">{formatearUF(proyecto.desdeUF)}</dd>
            </div>
            <div className={estilos.dato}>
              <dt>Superficie</dt>
              <dd className="tabular">{formatearRangoM2(proyecto.superficie)}</dd>
            </div>
            <div className={estilos.dato}>
              <dt>Dormitorios</dt>
              <dd className="tabular">{formatearRangoSimple(proyecto.dormitorios)}</dd>
            </div>
            <div className={estilos.dato}>
              <dt>Baños</dt>
              <dd className="tabular">{formatearRangoSimple(proyecto.banos)}</dd>
            </div>
            {proyecto.unidades && (
              <div className={estilos.dato}>
                <dt>Viviendas</dt>
                <dd className="tabular">{formatearNumero(proyecto.unidades)}</dd>
              </div>
            )}
            {proyecto.sitioDesde && (
              <div className={estilos.dato}>
                <dt>Sitios desde</dt>
                <dd className="tabular">{formatearM2(proyecto.sitioDesde)}</dd>
              </div>
            )}
          </dl>

          <div className={estilos.accionesBarra}>
            <Boton
              como="a"
              href={enlaceWhatsApp(whatsapp, mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              icono="whatsapp"
            >
              Cotizar por WhatsApp
            </Boton>
            <Boton
              como="a"
              href={enlaceCorreo(correo, `Consulta por ${proyecto.nombre}`, mensaje)}
              variante="contorno"
            >
              Cotizar por correo
            </Boton>
          </div>
        </Contenedor>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Descripcion y caracteristicas                                     */}
      {/* ---------------------------------------------------------------- */}
      <Seccion espaciado="compacto">
        <Contenedor>
          <div className={estilos.descripcionBloque}>
            <div>
              <h2 className={estilos.tituloBloque}>El proyecto</h2>
              <p className={estilos.descripcion}>{proyecto.descripcion}</p>

              {proyecto.etapas && (
                <ul className={estilos.etapas}>
                  {proyecto.etapas.map((etapa) => (
                    <li key={etapa.nombre}>
                      <span className={estilos.etapaNombre}>{etapa.nombre}</span>
                      <span className={`${estilos.etapaValor} tabular`}>
                        {formatearNumero(etapa.viviendas)} viviendas
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {proyecto.mapa && (
                <a
                  href={proyecto.mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={estilos.enlaceMapa}
                >
                  <Icono nombre="ubicacion" tamano={18} />
                  Ver ubicación en Google Maps
                  <Icono nombre="flechaDerecha" tamano={16} />
                </a>
              )}
            </div>

            <div>
              <h2 className={estilos.tituloBloque}>Características</h2>
              <ul className={estilos.amenidades}>
                {proyecto.amenidades.map((amenidad) => (
                  <li key={amenidad}>
                    <Icono nombre="check" tamano={17} />
                    {amenidad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Contenedor>
      </Seccion>

      {/* ---------------------------------------------------------------- */}
      {/* Galeria                                                           */}
      {/* ---------------------------------------------------------------- */}
      {proyecto.imagenes.galeria.length > 0 && (
        <Seccion fondo="hundida" espaciado="compacto">
          <Contenedor>
            <h2 className={estilos.tituloSeccion}>El proyecto en imágenes</h2>
            <Galeria imagenes={proyecto.imagenes.galeria} nombreProyecto={proyecto.nombre} />
          </Contenedor>
        </Seccion>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Modelos                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Seccion espaciado="compacto">
        <Contenedor>
          <h2 className={estilos.tituloSeccion}>
            {proyecto.tipo === 'casa' ? 'Modelos de vivienda' : 'Modelos de departamento'}
          </h2>

          <div className={estilos.modelos}>
            {proyecto.modelos.map((modelo, indice) => (
              <Reveal key={modelo.nombre} retraso={indice * 60} className={estilos.celdaModelo}>
                <article className={estilos.modelo}>
                  <header className={estilos.modeloEncabezado}>
                    <div>
                      <h3 className={estilos.modeloNombre}>{modelo.nombre}</h3>
                      <p className={estilos.modeloTipologia}>{modelo.tipologia}</p>
                    </div>
                    <p className={estilos.modeloSuperficie}>
                      <span className="tabular">{formatearM2(modelo.m2)}</span>
                      <span className={estilos.modeloSuperficieNota}>construidos</span>
                    </p>
                  </header>

                  <dl className={estilos.modeloSpecs}>
                    <div>
                      <dt><Icono nombre="dormitorio" tamano={17} /><span className="sr-only">Dormitorios</span></dt>
                      <dd>{modelo.dormitorios} dorm.</dd>
                    </div>
                    <div>
                      <dt><Icono nombre="bano" tamano={17} /><span className="sr-only">Baños</span></dt>
                      <dd>{modelo.banos} {modelo.banos === 1 ? 'baño' : 'baños'}</dd>
                    </div>
                  </dl>

                  {modelo.detalle && <p className={estilos.modeloDetalle}>{modelo.detalle}</p>}

                  {modelo.extras?.length > 0 && (
                    <ul className={estilos.modeloExtras}>
                      {modelo.extras.map((extra) => (
                        <li key={extra}>{extra}</li>
                      ))}
                    </ul>
                  )}

                  <footer className={estilos.modeloPie}>
                    <p className={estilos.modeloPrecio}>
                      <span className={estilos.modeloPrecioEtiqueta}>Desde</span>
                      <span className="tabular">{formatearUF(modelo.uf)}</span>
                    </p>
                    <Boton
                      como="a"
                      href={enlaceWhatsApp(
                        whatsapp,
                        `Hola, me interesa el modelo ${modelo.nombre} de ${proyecto.nombre} en ${proyecto.comuna}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      variante="contorno"
                      tamano="sm"
                    >
                      Consultar
                    </Boton>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </Contenedor>
      </Seccion>

      {/* ---------------------------------------------------------------- */}
      {/* Equipo de venta                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Seccion fondo="oscura" espaciado="compacto">
        <Contenedor>
          <div className={estilos.venta}>
            <div>
              <h2 className={estilos.ventaTitulo}>
                {proyecto.ejecutivas.length > 0
                  ? 'Habla directo con quien vende este proyecto'
                  : '¿Te interesa este proyecto?'}
              </h2>
              <p className={estilos.ventaTexto}>
                {proyecto.ejecutivas.length > 0
                  ? 'Sin call center ni formularios que nadie contesta. Escríbeles por WhatsApp y agenda una visita.'
                  : 'Escríbenos y coordinamos una visita al proyecto con una ejecutiva.'}
              </p>
            </div>

            {proyecto.ejecutivas.length > 0 ? (
              <ul className={estilos.ejecutivas}>
                {proyecto.ejecutivas.map((ejecutiva) => (
                  <li key={ejecutiva.email} className={estilos.ejecutiva}>
                    <div className={estilos.ejecutivaDatos}>
                      <h3>{ejecutiva.nombre}</h3>
                      <a href={`mailto:${ejecutiva.email}`} className={estilos.ejecutivaCorreo}>
                        {ejecutiva.email}
                      </a>
                    </div>
                    <Boton
                      como="a"
                      href={enlaceWhatsApp(ejecutiva.whatsapp, mensaje)}
                      target="_blank"
                      rel="noopener noreferrer"
                      tamano="sm"
                      icono="whatsapp"
                    >
                      <span className="tabular">{ejecutiva.telefono}</span>
                    </Boton>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={estilos.ventaAcciones}>
                <Boton
                  como="a"
                  href={enlaceWhatsApp(whatsapp, mensaje)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tamano="lg"
                  icono="whatsapp"
                >
                  Escribir por WhatsApp
                </Boton>
                <Boton como="a" href="/#contacto" variante="contornoClaro" tamano="lg">
                  Ir al formulario
                </Boton>
              </div>
            )}
          </div>
        </Contenedor>
      </Seccion>

      {/* ---------------------------------------------------------------- */}
      {/* Otros proyectos                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Seccion espaciado="compacto">
        <Contenedor>
          <h2 className={estilos.tituloSeccion}>Otros proyectos de Ferval</h2>
          <div className={estilos.otros}>
            {otros.map((otro) => (
              <ProyectoCard key={otro.slug} proyecto={otro} />
            ))}
          </div>
        </Contenedor>
      </Seccion>
    </article>
  );
}
