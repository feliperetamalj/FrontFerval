import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Boton } from './ui/index.js';
import estilos from './BannerCookies.module.css';

/**
 * Banner de consentimiento de cookies.
 *
 * ESTA APAGADO A PROPOSITO, y conviene que siga asi mientras no cambie la
 * analitica. El sitio no deja cookies: no tiene backend ni sesiones, y mide
 * las visitas con Vercel Analytics, que no usa identificadores persistentes.
 * Un banner que diga "usamos cookies" donde no las hay es informacion falsa,
 * y ademas cuesta conversiones: tapa el contenido y obliga a un clic extra
 * antes de poder mirar nada.
 *
 * Se deja escrito y probado porque la decision puede cambiar. Para activarlo:
 *
 *   1. Poner REQUIERE_CONSENTIMIENTO en true.
 *   2. Montar <BannerCookies /> en App.jsx.
 *   3. Cargar el script de medicion solo cuando `consentimiento()` sea
 *      'aceptado'. Un banner que aparece despues de que el script ya corrio
 *      no sirve de nada.
 *   4. Reescribir la seccion de cookies de `src/data/legales.js`, que hoy dice
 *      que el sitio no usa ninguna.
 */
const REQUIERE_CONSENTIMIENTO = false;

const CLAVE = 'ferval:cookies';

/**
 * Decision guardada del visitante.
 * @returns {'aceptado'|'rechazado'|null}
 */
export function consentimiento() {
  try {
    return window.localStorage.getItem(CLAVE);
  } catch {
    // Navegacion privada o almacenamiento bloqueado: sin decision guardada.
    return null;
  }
}

export function BannerCookies() {
  const [visible, setVisible] = useState(false);

  // La decision se lee despues del primer render: si se leyera durante, el
  // HTML prerenderizado y el del cliente no coincidirian.
  useEffect(() => {
    if (REQUIERE_CONSENTIMIENTO && !consentimiento()) setVisible(true);
  }, []);

  if (!REQUIERE_CONSENTIMIENTO || !visible) return null;

  const responder = (respuesta) => {
    try {
      window.localStorage.setItem(CLAVE, respuesta);
    } catch {
      // Si no se puede guardar, igual se cierra: insistir en cada pagina es peor.
    }
    setVisible(false);
  };

  return (
    <div className={estilos.banner} role="dialog" aria-label="Uso de cookies">
      <p className={estilos.texto}>
        Usamos cookies para medir cómo se navega el sitio y mejorarlo. Puedes
        rechazarlas sin perder ninguna función. Más detalles en la{' '}
        <Link to="/privacidad" className={estilos.enlace}>política de privacidad</Link>.
      </p>

      <div className={estilos.acciones}>
        {/* Rechazar cuesta lo mismo que aceptar: un boton al lado del otro. */}
        <Boton tamano="sm" variante="contorno" onClick={() => responder('rechazado')}>
          Solo las esenciales
        </Boton>
        <Boton tamano="sm" onClick={() => responder('aceptado')}>
          Aceptar
        </Boton>
      </div>
    </div>
  );
}
