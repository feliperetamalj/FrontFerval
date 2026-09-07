import { useLocation } from 'react-router-dom';

import { Icono } from '../ui/index.js';
import { useScrollPosition } from '../../hooks/index.js';
import { EMPRESA } from '../../data/empresa.js';
import { enlaceWhatsApp, MENSAJE_GENERAL } from '../../utils/contacto.js';
import estilos from './CtaFlotante.module.css';

/**
 * Barra de accion fija en movil y boton flotante de WhatsApp en escritorio.
 *
 * En movil el usuario no tiene el telefono del header a la vista, y el
 * portafolio es largo: sin una accion permanente el contacto queda a varias
 * pantallas de distancia. Aparece recien pasado el hero para no competir con
 * el llamado principal.
 */
export function CtaFlotante() {
  const visible = useScrollPosition(560);
  const { pathname } = useLocation();

  // En las fichas de proyecto manda el CTA propio de la ficha.
  const enFicha = pathname.startsWith('/proyecto/');
  const enlace = enlaceWhatsApp(EMPRESA.contacto.whatsapp, MENSAJE_GENERAL);

  return (
    <>
      <div className={`${estilos.barraMovil} ${visible && !enFicha ? estilos.visible : ''}`}>
        <a href={`tel:${EMPRESA.contacto.telefonoLink}`} className={estilos.accionSecundaria}>
          <Icono nombre="telefono" tamano={18} />
          Llamar
        </a>
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className={estilos.accionPrincipal}
        >
          <Icono nombre="whatsapp" tamano={18} />
          Cotizar por WhatsApp
        </a>
      </div>

      <a
        href={enlace}
        target="_blank"
        rel="noopener noreferrer"
        className={`${estilos.burbuja} ${visible ? estilos.visible : ''}`}
        aria-label="Escribir a Ferval por WhatsApp"
      >
        <Icono nombre="whatsapp" tamano={26} />
      </a>
    </>
  );
}
