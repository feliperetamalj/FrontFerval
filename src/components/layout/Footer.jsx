import { Contenedor, Icono, Logo } from '../ui/index.js';
import { EMPRESA, NAVEGACION } from '../../data/empresa.js';
import estilos from './Footer.module.css';

/**
 * Pie de pagina.
 *
 * Repite la promesa de marca a gran escala y entrega los datos de contacto
 * verificables. Cerrar con la promesa deja al visitante con el mismo mensaje
 * con que abrio la pagina.
 *
 * Tres columnas: marca, secciones del sitio y contacto. El listado de los
 * nueve proyectos se retiro por densidad; el portafolio y el sitemap ya
 * cubren esos enlaces.
 */
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className={`${estilos.footer} on-dark`}>
      <Contenedor>
        <p className={estilos.promesa}>
          Más de una década<br />
          construyendo hogares<br />
          <span className={estilos.promesaAcento}>en el Maule.</span>
        </p>

        <div className={estilos.rejilla}>
          <div className={estilos.columnaMarca}>
            <Logo tono="claro" />
            <p className={estilos.descripcion}>
              {EMPRESA.nombreLegal}. Diseñamos, construimos y entregamos viviendas
              en la Región del Maule y zona centro-sur de Chile.
            </p>
            <div className={estilos.redes}>
              <a
                href={EMPRESA.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={estilos.red}
                aria-label="Ferval en Instagram"
              >
                <Icono nombre="instagram" tamano={20} />
              </a>
              <a
                href={EMPRESA.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={estilos.red}
                aria-label="Ferval en Facebook"
              >
                <Icono nombre="facebook" tamano={20} />
              </a>
            </div>
          </div>

          <nav className={estilos.columna} aria-label="Secciones">
            <h2 className={estilos.tituloColumna}>Sitio</h2>
            <ul>
              {NAVEGACION.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={estilos.enlace}>{item.etiqueta}</a>
                </li>
              ))}
            </ul>
          </nav>

          <address className={estilos.columna}>
            <h2 className={estilos.tituloColumna}>Contacto</h2>
            <ul className={estilos.listaContacto}>
              <li>
                <Icono nombre="ubicacion" tamano={18} />
                <span>
                  {EMPRESA.contacto.direccion}
                  <br />
                  {EMPRESA.contacto.ciudad}
                </span>
              </li>
              <li>
                <Icono nombre="telefono" tamano={18} />
                <a href={`tel:${EMPRESA.contacto.telefonoLink}`} className={`${estilos.enlace} tabular`}>
                  {EMPRESA.contacto.telefono}
                </a>
              </li>
              <li>
                <Icono nombre="correo" tamano={18} />
                <a href={`mailto:${EMPRESA.contacto.email}`} className={estilos.enlace}>
                  {EMPRESA.contacto.email}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className={estilos.legal}>
          <p>© {anio} {EMPRESA.nombreLegal}. Todos los derechos reservados.</p>
          <p className={estilos.aviso}>
            Las imágenes son referenciales. Precios expresados en UF, sujetos a
            disponibilidad y a las condiciones vigentes de cada proyecto.
          </p>
        </div>
      </Contenedor>
    </footer>
  );
}
