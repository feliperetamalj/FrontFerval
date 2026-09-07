import estilos from './Seccion.module.css';

/**
 * Bloque de seccion con el ritmo vertical del sistema y un fondo semantico.
 *
 * @param {object} props
 * @param {string} [props.id] ancla para la navegacion
 * @param {'clara'|'hundida'|'oscura'} [props.fondo='clara']
 * @param {'normal'|'compacto'|'amplio'} [props.espaciado='normal']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Seccion({
  id,
  fondo = 'clara',
  espaciado = 'normal',
  className = '',
  children,
  ...resto
}) {
  return (
    <section
      id={id}
      className={[
        estilos.seccion,
        estilos[fondo],
        estilos[espaciado],
        // `on-dark` cambia el color del anillo de foco sobre fondos oscuros.
        fondo === 'oscura' ? 'on-dark' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...resto}
    >
      {children}
    </section>
  );
}

/**
 * Encabezado de seccion: etiqueta superior, titulo y bajada opcional.
 *
 * @param {object} props
 * @param {string} [props.etiqueta] texto corto en mayusculas sobre el titulo
 * @param {React.ReactNode} props.titulo
 * @param {React.ReactNode} [props.bajada]
 * @param {'izquierda'|'centro'} [props.alineacion='izquierda']
 * @param {React.ReactNode} [props.accion] boton o enlace a la derecha
 */
export function EncabezadoSeccion({
  etiqueta,
  titulo,
  bajada,
  alineacion = 'izquierda',
  accion,
}) {
  return (
    <header className={`${estilos.encabezado} ${estilos[alineacion]}`}>
      <div className={estilos.encabezadoTexto}>
        {etiqueta && <p className={estilos.etiquetaSeccion}>{etiqueta}</p>}
        <h2 className={estilos.titulo}>{titulo}</h2>
        {bajada && <p className={estilos.bajada}>{bajada}</p>}
      </div>
      {accion && <div className={estilos.accion}>{accion}</div>}
    </header>
  );
}
