import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Boton, Contenedor, Icono, Seccion } from '../ui/index.js';
import { PROYECTOS } from '../../data/proyectos.js';
import { EMPRESA } from '../../data/empresa.js';
import { enlaceWhatsApp, enlaceCorreo, mensajeFormulario } from '../../utils/contacto.js';
import estilos from './Contacto.module.css';

/** Estado inicial del formulario. Se reutiliza para limpiarlo. */
const CAMPOS_VACIOS = { nombre: '', telefono: '', email: '', proyecto: '', mensaje: '' };

/**
 * Formulario de contacto.
 *
 * El sitio no tiene backend: el formulario compone el mensaje y lo entrega al
 * canal que el usuario elija —WhatsApp o correo—. Solo el nombre es
 * obligatorio; cada campo extra exigido cuesta conversiones, y el resto de los
 * datos se pueden pedir en la conversacion.
 */
export function Contacto() {
  const [campos, setCampos] = useState(CAMPOS_VACIOS);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(null);

  const navegar = useNavigate();
  const refs = { nombre: useRef(null), telefono: useRef(null) };

  const actualizar = (evento) => {
    const { name, value } = evento.target;
    setCampos((previos) => ({ ...previos, [name]: value }));
    if (error) setError(null);
  };

  /**
   * Valida y devuelve el mensaje compuesto, o null si falta lo minimo.
   *
   * El error apunta al campo que lo provoca y le devuelve el foco: un aviso
   * generico al pie obliga a adivinar cual de los cinco campos hay que tocar.
   *
   * @returns {string|null}
   */
  const componerMensaje = () => {
    const faltante = !campos.nombre.trim()
      ? { campo: 'nombre', texto: 'Necesitamos al menos tu nombre para responderte.' }
      : !campos.telefono.trim() && !campos.email.trim()
        ? { campo: 'telefono', texto: 'Déjanos un teléfono o un correo para poder contactarte.' }
        : null;

    if (faltante) {
      setError(faltante);
      refs[faltante.campo]?.current?.focus();
      return null;
    }
    return mensajeFormulario(campos);
  };

  /**
   * Lleva a la confirmacion despues de entregar el mensaje al canal elegido.
   *
   * La espera corta no es decorativa: en el celular el cambio de app tarda un
   * momento, y sin ninguna señal la gente vuelve a tocar el boton y termina
   * con dos conversaciones abiertas. Ademas le da tiempo al navegador a
   * procesar el mailto antes de que la pagina cambie.
   */
  const confirmar = () => {
    window.setTimeout(() => navegar('/gracias'), 700);
  };

  const enviarPorWhatsApp = () => {
    const mensaje = componerMensaje();
    if (!mensaje) return;

    setEnviando('whatsapp');

    /*
      Se abre sin la opcion `noopener` y se corta el `opener` a mano: con esa
      opcion el navegador devuelve null siempre, y entonces no hay forma de
      distinguir una ventana bloqueada de una que si se abrio.
    */
    const ventana = window.open(enlaceWhatsApp(EMPRESA.contacto.whatsapp, mensaje), '_blank');
    if (!ventana) {
      setEnviando(null);
      setError({
        campo: null,
        texto: 'Tu navegador bloqueó la ventana de WhatsApp. Permítela o envíanos el mensaje por correo.',
      });
      return;
    }
    ventana.opener = null;
    confirmar();
  };

  const enviarPorCorreo = () => {
    const mensaje = componerMensaje();
    if (!mensaje) return;

    setEnviando('correo');
    const asunto = campos.proyecto
      ? `Consulta por ${campos.proyecto}`
      : 'Consulta desde el sitio web';
    window.location.href = enlaceCorreo(EMPRESA.contacto.email, asunto, mensaje);
    confirmar();
  };

  return (
    <Seccion id="contacto">
      <Contenedor>
        <div className={estilos.disposicion}>
          {/* --- Datos de contacto --- */}
          <div className={estilos.columnaDatos}>
            <p className={estilos.etiqueta}>
              <span className={estilos.notch} aria-hidden="true" />
              Contacto
            </p>

            <h2 className={estilos.titulo}>
              Cuéntanos qué
              <br />
              estás buscando.
            </h2>

            <p className={estilos.bajada}>
              Respondemos con proyectos concretos que calcen con tu presupuesto,
              no con un catálogo completo. Si nada te sirve, te lo decimos.
            </p>

            <ul className={estilos.datos}>
              <li>
                <span className={estilos.icono}><Icono nombre="ubicacion" tamano={20} /></span>
                <div>
                  <h3>Oficina en Talca</h3>
                  <p>{EMPRESA.contacto.direccion}<br />{EMPRESA.contacto.ciudad}</p>
                </div>
              </li>
              <li>
                <span className={estilos.icono}><Icono nombre="telefono" tamano={20} /></span>
                <div>
                  <h3>Teléfono</h3>
                  <p>
                    <a href={`tel:${EMPRESA.contacto.telefonoLink}`} className="tabular">
                      {EMPRESA.contacto.telefono}
                    </a>
                  </p>
                </div>
              </li>
              <li>
                <span className={estilos.icono}><Icono nombre="correo" tamano={20} /></span>
                <div>
                  <h3>Correo</h3>
                  <p><a href={`mailto:${EMPRESA.contacto.email}`}>{EMPRESA.contacto.email}</a></p>
                </div>
              </li>
            </ul>

            <div className={estilos.redes}>
              <a href={EMPRESA.redes.instagram} target="_blank" rel="noopener noreferrer" className={estilos.red}>
                <Icono nombre="instagram" tamano={18} /> Instagram
              </a>
              <a href={EMPRESA.redes.facebook} target="_blank" rel="noopener noreferrer" className={estilos.red}>
                <Icono nombre="facebook" tamano={18} /> Facebook
              </a>
            </div>
          </div>

          {/* --- Formulario --- */}
          <form
            className={estilos.formulario}
            onSubmit={(evento) => {
              evento.preventDefault();
              enviarPorWhatsApp();
            }}
            noValidate
          >
            <div className={estilos.campo}>
              <label htmlFor="nombre">
                Nombre <span className={estilos.requerido} aria-hidden="true">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                ref={refs.nombre}
                value={campos.nombre}
                onChange={actualizar}
                autoComplete="name"
                aria-invalid={error?.campo === 'nombre' || undefined}
                aria-describedby={error?.campo === 'nombre' ? 'error-formulario' : undefined}
                required
              />
            </div>

            <div className={estilos.fila}>
              <div className={estilos.campo}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  ref={refs.telefono}
                  value={campos.telefono}
                  onChange={actualizar}
                  autoComplete="tel"
                  aria-invalid={error?.campo === 'telefono' || undefined}
                  aria-describedby={error?.campo === 'telefono' ? 'error-formulario' : undefined}
                  placeholder="+56 9 ..."
                />
              </div>
              <div className={estilos.campo}>
                <label htmlFor="email">Correo</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={campos.email}
                  onChange={actualizar}
                  autoComplete="email"
                  aria-invalid={error?.campo === 'telefono' || undefined}
                />
              </div>
            </div>

            <div className={estilos.campo}>
              <label htmlFor="proyecto">Proyecto de interés</label>
              <div className={estilos.envolturaSelect}>
                <select id="proyecto" name="proyecto" value={campos.proyecto} onChange={actualizar}>
                  <option value="">Aún no lo tengo claro</option>
                  {PROYECTOS.map((proyecto) => (
                    <option key={proyecto.slug} value={`${proyecto.nombre} (${proyecto.comuna})`}>
                      {proyecto.nombre} · {proyecto.comuna}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={estilos.campo}>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={campos.mensaje}
                onChange={actualizar}
                placeholder="Cuéntanos cuántos dormitorios necesitas, en qué comuna y si postulas a subsidio."
              />
            </div>

            {/* El error se anuncia in situ, junto a los controles. */}
            {error && (
              <p id="error-formulario" className={estilos.error} role="alert">
                <Icono nombre="cerrar" tamano={16} />
                {error.texto}
              </p>
            )}

            <div className={estilos.acciones}>
              <Boton
                type="submit"
                tamano="lg"
                icono={enviando === 'whatsapp' ? undefined : 'whatsapp'}
                className={estilos.botonPrincipal}
                disabled={Boolean(enviando)}
              >
                {enviando === 'whatsapp' ? 'Abriendo WhatsApp…' : 'Enviar por WhatsApp'}
              </Boton>
              <Boton
                type="button"
                variante="contorno"
                tamano="lg"
                onClick={enviarPorCorreo}
                disabled={Boolean(enviando)}
              >
                {enviando === 'correo' ? 'Abriendo tu correo…' : 'Enviar por correo'}
              </Boton>
            </div>

            {/* Lector de pantalla: el cambio de texto del boton no siempre se anuncia. */}
            <p className="sr-only" aria-live="polite">
              {enviando === 'whatsapp' ? 'Abriendo WhatsApp con tu mensaje.' : ''}
              {enviando === 'correo' ? 'Abriendo tu programa de correo con el mensaje.' : ''}
            </p>

            <p className={estilos.aviso}>
              Al enviar se abrirá WhatsApp o tu correo con el mensaje ya escrito.
              Tus datos no se almacenan en este sitio: revisa cómo los tratamos
              en la <Link to="/privacidad" className={estilos.enlaceAviso}>política de privacidad</Link>.
            </p>
          </form>
        </div>
      </Contenedor>
    </Seccion>
  );
}
