import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { metadatosDe } from '../data/metadatos.js';

/**
 * Mantiene al dia el `<head>` durante la navegacion interna.
 *
 * El HTML que entrega el servidor ya viene con los metadatos correctos de cada
 * ruta, escritos por `scripts/prerender.mjs`. Este componente cubre lo que
 * pasa despues: cuando React Router cambia de pagina sin recargar, el `<head>`
 * seguiria mostrando los de la pagina anterior. Eso afecta al titulo de la
 * pestaña, al historial del navegador y a lo que copia quien comparte la URL
 * desde la barra de direcciones.
 *
 * No es un reemplazo del prerenderizado: los robots de WhatsApp y Facebook no
 * ejecutan JavaScript y nunca van a ver lo que se haga aqui.
 */
export function Meta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metadatosDe(pathname);

    document.title = meta.titulo;

    fijarAtributo('meta[name="description"]', 'content', meta.descripcion);
    fijarAtributo('link[rel="canonical"]', 'href', meta.canonical);
    fijarAtributo('meta[property="og:title"]', 'content', meta.titulo);
    fijarAtributo('meta[property="og:description"]', 'content', meta.descripcion);
    fijarAtributo('meta[property="og:url"]', 'content', meta.canonical);
    fijarAtributo('meta[property="og:image"]', 'content', meta.imagen);
    fijarAtributo('meta[property="og:type"]', 'content', meta.tipo);

    // `noindex` se pone y se quita: si no se quitara, bastaria pasar por
    // /gracias una vez para que el resto de la sesion quedara sin indexar.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (meta.noindex) {
      if (robots) robots.setAttribute('content', 'noindex, follow');
      else crear('meta', { name: 'robots', content: 'noindex, follow' });
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);

  return null;
}

function fijarAtributo(selector, atributo, valor) {
  const nodo = document.head.querySelector(selector);
  if (nodo) nodo.setAttribute(atributo, valor);
}

function crear(etiqueta, atributos) {
  const nodo = document.createElement(etiqueta);
  Object.entries(atributos).forEach(([clave, valor]) => nodo.setAttribute(clave, valor));
  document.head.appendChild(nodo);
}
