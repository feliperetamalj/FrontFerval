import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Boton, Contenedor, Icono, Logo } from '../ui/index.js';
import { useScrollPosition, useBloqueoScroll } from '../../hooks/index.js';
import { NAVEGACION, EMPRESA } from '../../data/empresa.js';
import { enlaceWhatsApp, MENSAJE_GENERAL } from '../../utils/contacto.js';
import estilos from './Header.module.css';

/**
 * Barra de navegacion fija.
 *
 * Sobre el hero es transparente para que la fotografia respire; al separarse
 * del tope se vuelve una capa translucida con desenfoque, siguiendo el
 * principio de que la cromica flota sobre el contenido en vez de ocupar una
 * franja opaca fija.
 */
export function Header() {
  const desplazado = useScrollPosition(24);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { pathname } = useLocation();

  useBloqueoScroll(menuAbierto);

  // El menu se cierra al navegar a otra ruta.
  useEffect(() => setMenuAbierto(false), [pathname]);

  // Cerrar con Escape: salida obligada para usuarios de teclado.
  useEffect(() => {
    if (!menuAbierto) return undefined;
    const alPresionar = (evento) => {
      if (evento.key === 'Escape') setMenuAbierto(false);
    };
    window.addEventListener('keydown', alPresionar);
    return () => window.removeEventListener('keydown', alPresionar);
  }, [menuAbierto]);

  const enPortada = pathname === '/';

  return (
    <header
      className={[
        estilos.header,
        desplazado || !enPortada ? estilos.solido : '',
        menuAbierto ? estilos.conMenu : '',
      ].filter(Boolean).join(' ')}
    >
      <Contenedor className={estilos.barra}>
        <Link to="/" className={estilos.enlaceLogo} aria-label="Inmobiliaria Ferval · ir al inicio">
          <Logo tamano={52} />
        </Link>

        <nav className={estilos.navEscritorio} aria-label="Navegación principal">
          {NAVEGACION.map((item) => (
            <a key={item.href} href={item.href} className={estilos.enlace}>
              {item.etiqueta}
            </a>
          ))}
        </nav>

        <div className={estilos.acciones}>
          <a href={`tel:${EMPRESA.contacto.telefonoLink}`} className={estilos.telefono}>
            <Icono nombre="telefono" tamano={16} />
            <span className="tabular">{EMPRESA.contacto.telefono}</span>
          </a>

          <Boton
            como="a"
            href={enlaceWhatsApp(EMPRESA.contacto.whatsapp, MENSAJE_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            tamano="sm"
            icono="flechaDerecha"
            className={estilos.ctaEscritorio}
          >
            Cotizar
          </Boton>

          <button
            type="button"
            className={estilos.botonMenu}
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} tamano={24} />
          </button>
        </div>
      </Contenedor>

      {/* Panel movil. Se mantiene en el DOM y se oculta con `hidden` para
          conservar el foco y permitir la transicion de entrada y salida. */}
      <div id="menu-movil" className={estilos.panelMovil} hidden={!menuAbierto}>
        <nav aria-label="Navegación móvil">
          {NAVEGACION.map((item, indice) => (
            <a
              key={item.href}
              href={item.href}
              className={estilos.enlaceMovil}
              style={{ transitionDelay: `${indice * 40}ms` }}
              onClick={() => setMenuAbierto(false)}
            >
              {item.etiqueta}
              <Icono nombre="flechaDerecha" tamano={18} />
            </a>
          ))}
        </nav>

        <div className={estilos.pieMovil}>
          <a href={`tel:${EMPRESA.contacto.telefonoLink}`} className={estilos.telefonoMovil}>
            <Icono nombre="telefono" tamano={18} />
            <span className="tabular">{EMPRESA.contacto.telefono}</span>
          </a>
          <Boton
            como="a"
            href={enlaceWhatsApp(EMPRESA.contacto.whatsapp, MENSAJE_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            anchoCompleto
            icono="flechaDerecha"
          >
            Escribir por WhatsApp
          </Boton>
        </div>
      </div>
    </header>
  );
}
