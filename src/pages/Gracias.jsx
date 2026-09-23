import { Link } from 'react-router-dom';

import { Boton, Contenedor, Icono, Seccion } from '../components/ui/index.js';
import { ProyectoCard } from '../components/sections/index.js';
import { EMPRESA } from '../data/empresa.js';
import { PROYECTOS } from '../data/proyectos.js';
import estilos from './Gracias.module.css';

/**
 * Confirmacion despues de enviar el formulario.
 *
 * Cumple tres funciones. Confirma que el mensaje salio de verdad, que con un
 * formulario que abre WhatsApp en otra pestaña no es evidente. Dice cuando
 * esperar respuesta, que es la duda inmediata. Y es la URL donde se mide la
 * conversion, porque es el unico punto del sitio al que solo se llega despues
 * de completar la accion.
 *
 * Lleva `noindex`: es una pagina de paso, y que aparezca en Google ademas
 * ensucia la medicion.
 */
export function Gracias() {
  const sugeridos = [...PROYECTOS]
    .filter((p) => p.estado === 'entrega-inmediata' || p.subsidio)
    .slice(0, 3);

  return (
    <Seccion className={estilos.pagina}>
      <Contenedor>
        <div className={estilos.confirmacion}>
          <span className={estilos.marca} aria-hidden="true">
            <Icono nombre="check" tamano={30} />
          </span>

          <h1 className={estilos.titulo}>Listo, recibimos tu mensaje.</h1>

          <p className={estilos.texto}>
            Una ejecutiva te va a responder dentro del próximo día hábil. Si
            necesitas algo antes, escríbenos directo al{' '}
            <a href={`tel:${EMPRESA.contacto.telefonoLink}`} className={`${estilos.enlace} tabular`}>
              {EMPRESA.contacto.telefono}
            </a>{' '}
            o a{' '}
            <a href={`mailto:${EMPRESA.contacto.email}`} className={estilos.enlace}>
              {EMPRESA.contacto.email}
            </a>
            .
          </p>

          <p className={estilos.aviso}>
            Si no se abrió WhatsApp ni tu correo, es probable que el navegador
            haya bloqueado la ventana. Vuelve atrás y usa el otro botón del
            formulario.
          </p>

          <div className={estilos.acciones}>
            <Boton como={Link} to="/" icono="flechaDerecha">Volver al inicio</Boton>
            <Boton como="a" href="/#proyectos" variante="contorno">Seguir viendo proyectos</Boton>
          </div>
        </div>

        {sugeridos.length > 0 && (
          <div className={estilos.mientras}>
            <h2 className={estilos.subtitulo}>Mientras tanto</h2>
            <div className={estilos.sugeridos}>
              {sugeridos.map((proyecto) => (
                <ProyectoCard key={proyecto.slug} proyecto={proyecto} />
              ))}
            </div>
          </div>
        )}
      </Contenedor>
    </Seccion>
  );
}
