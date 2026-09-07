import { Boton, Contenedor, Icono, Reveal, Seccion } from '../ui/index.js';
import { IMAGENES_GENERALES, PROYECTOS } from '../../data/proyectos.js';
import { EMPRESA } from '../../data/empresa.js';
import { enlaceWhatsApp } from '../../utils/contacto.js';
import estilos from './Subsidio.module.css';

/** Preguntas frecuentes sobre el DS19, redactadas como objeciones reales. */
const PREGUNTAS = [
  {
    pregunta: '¿Qué es el DS19?',
    respuesta:
      'Es el Programa de Integración Social y Territorial del Ministerio de Vivienda y Urbanismo. El Estado aporta un subsidio directo al precio de la vivienda, y tú financias el resto con ahorro y crédito hipotecario.',
  },
  {
    pregunta: '¿Necesito ahorro previo?',
    respuesta:
      'Sí. El monto varía según el tramo al que postulas y el valor de la vivienda. Te decimos cuánto necesitas en la primera conversación, antes de que reserves nada.',
  },
  {
    pregunta: '¿Puedo postular si ya tuve una vivienda?',
    respuesta:
      'Depende de tu situación en el Registro Social de Hogares y de si recibiste subsidio antes. Lo revisamos contigo y te damos una respuesta clara, aunque sea que no calificas.',
  },
  {
    pregunta: '¿Ustedes hacen el trámite?',
    respuesta:
      'Te acompañamos en la postulación y en la coordinación con el banco. El trámite es tuyo, pero no lo haces solo ni a ciegas.',
  },
];

/**
 * Explicacion del subsidio DS19.
 *
 * Es la principal barrera de entrada del publico objetivo: mucha gente no
 * compra porque no sabe si califica. Responder eso aqui, gratis y sin letra
 * chica, es lo que convierte una visita en un contacto.
 */
export function Subsidio() {
  const conSubsidio = PROYECTOS.filter((p) => p.subsidio);

  return (
    <Seccion id="subsidio" fondo="oscura">
      <Contenedor>
        <div className={estilos.disposicion}>
          <div className={estilos.columnaTexto}>
            <p className={estilos.etiqueta}>
              <span className={estilos.notch} aria-hidden="true" />
              Subsidio DS19
            </p>

            <h2 className={estilos.titulo}>
              ¿Calificas para
              <br />
              el subsidio?
              <span className={estilos.acento}> Averígualo antes de comprar.</span>
            </h2>

            <p className={estilos.bajada}>
              {conSubsidio.length} de nuestros proyectos se acogen al Programa de
              Integración Social y Territorial. Te decimos con franqueza si
              calificas, cuánto ahorro necesitas y qué modelo te alcanza — sin
              costo y sin compromiso de compra.
            </p>

            <ul className={estilos.beneficios}>
              <li><Icono nombre="check" tamano={18} />Revisión de tu caso sin costo</li>
              <li><Icono nombre="check" tamano={18} />Te decimos si <em>no</em> calificas</li>
              <li><Icono nombre="check" tamano={18} />Acompañamiento hasta la escritura</li>
            </ul>

            <Boton
              como="a"
              href={enlaceWhatsApp(
                EMPRESA.contacto.whatsapp,
                'Hola, quiero saber si califico para el subsidio DS19 en un proyecto de Ferval.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              tamano="lg"
              icono="whatsapp"
              className={estilos.cta}
            >
              Consultar si califico
            </Boton>

            <p className={estilos.proyectosSubsidio}>
              Disponible en{' '}
              {conSubsidio.map((p, i) => (
                <span key={p.slug}>
                  <a href={`/proyecto/${p.slug}`} className={estilos.enlaceProyecto}>{p.nombre}</a>
                  {i < conSubsidio.length - 2 ? ', ' : i === conSubsidio.length - 2 ? ' y ' : '.'}
                </span>
              ))}
            </p>
          </div>

          <Reveal className={estilos.columnaFaq}>
            <div className={estilos.faq}>
              {PREGUNTAS.map((item) => (
                <details key={item.pregunta} className={estilos.detalle}>
                  <summary className={estilos.pregunta}>
                    {item.pregunta}
                    <Icono nombre="mas" tamano={18} className={estilos.iconoFaq} />
                  </summary>
                  <p className={estilos.respuesta}>{item.respuesta}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Contenedor>

      <img src={IMAGENES_GENERALES.subsidio} alt="" className={estilos.fondo} loading="lazy" />
    </Seccion>
  );
}
