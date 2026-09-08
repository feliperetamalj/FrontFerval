import { Contenedor, EncabezadoSeccion, Etiqueta, Icono, Reveal, Seccion } from '../ui/index.js';
import { PROXIMOS, ESTADOS_PROXIMOS } from '../../data/proyectos.js';
import { EMPRESA } from '../../data/empresa.js';
import { enlaceWhatsApp } from '../../utils/contacto.js';
import { formatearNumero } from '../../utils/formato.js';

import estilos from './Proximos.module.css';

/**
 * Proyectos que aun no salen a la venta.
 *
 * Va despues del portafolio: primero lo que se puede comprar hoy, y solo
 * entonces lo que viene. Cumple dos funciones distintas de las fichas de
 * venta: mostrar que la empresa sigue construyendo, y capturar al que busca
 * en una comuna donde todavia no hay nada disponible.
 *
 * Las tarjetas no llevan fotografia a proposito. Estos proyectos aun no
 * tienen render propio, y poner una imagen de otro conjunto para rellenar
 * sugeriria un diseño que nadie ha aprobado. La cifra de viviendas y la
 * comuna son lo unico verificable, asi que son lo que se muestra.
 */
export function Proximos() {
  if (!PROXIMOS.length) return null;

  const viviendas = PROXIMOS.reduce((total, p) => total + p.viviendas, 0);
  const comunas = new Set(PROXIMOS.map((p) => p.comuna)).size;

  return (
    <Seccion id="proximos" fondo="hundida">
      <Contenedor>
        <EncabezadoSeccion
          etiqueta="Lo que viene"
          titulo={<>Próximos proyectos.</>}
          bajada={
            `${formatearNumero(viviendas)} viviendas más en ${comunas} comunas, ` +
            'todas con subsidio DS19. Déjanos tu contacto y te avisamos apenas ' +
            'abra la venta del que te interesa.'
          }
        />

        <ul className={estilos.rejilla}>
          {PROXIMOS.map((proyecto, indice) => {
            const estado = ESTADOS_PROXIMOS[proyecto.estado];

            return (
              <Reveal
                key={proyecto.nombre}
                como="li"
                retraso={indice * 50}
                className={estilos.celda}
              >
                <article className={estilos.tarjeta}>
                  <Etiqueta tono={estado.tono} punto>{estado.etiqueta}</Etiqueta>

                  <h3 className={estilos.nombre}>{proyecto.nombre}</h3>

                  <p className={estilos.ubicacion}>
                    <Icono nombre="ubicacion" tamano={15} />
                    {proyecto.comuna}
                    <span className={estilos.separador} aria-hidden="true">·</span>
                    {proyecto.region}
                  </p>

                  <p className={estilos.viviendas}>
                    <span className="tabular">{formatearNumero(proyecto.viviendas)}</span>
                    <span className={estilos.viviendasNota}>viviendas proyectadas</span>
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <p className={estilos.pie}>
          <a
            href={enlaceWhatsApp(
              EMPRESA.contacto.whatsapp,
              'Hola, quiero que me avisen cuando abra la venta de un próximo proyecto de Ferval.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={estilos.enlacePie}
          >
            Avísenme cuando abra la venta
            <Icono nombre="flechaDerecha" tamano={17} />
          </a>
        </p>
      </Contenedor>
    </Seccion>
  );
}
