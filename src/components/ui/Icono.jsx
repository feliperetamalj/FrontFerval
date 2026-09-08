/**
 * Set de iconos del proyecto.
 *
 * Todos comparten viewBox 24x24, trazo de 1.75 y `currentColor`, de modo que
 * heredan el color y el tamano del texto que los rodea. Se dibujan a mano en
 * lugar de usar una libreria para no cargar un paquete completo por doce
 * simbolos, y para que el grosor sea consistente con la tipografia.
 */

/** Trazos de cada icono, indexados por nombre. */
const TRAZOS = {
  // --- Navegacion -------------------------------------------------------
  flechaDerecha: <path d="M5 12h14M13 6l6 6-6 6" />,
  flechaAbajo: <path d="M12 5v14M6 13l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  cerrar: <path d="M6 6l12 12M18 6L6 18" />,
  mas: <path d="M12 5v14M5 12h14" />,
  check: <path d="M4 12.5l5.5 5.5L20 7" />,

  // --- Atributos de vivienda -------------------------------------------
  dormitorio: (
    <>
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
      <path d="M3 14h18M3 18h18M7 9V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
    </>
  ),
  bano: (
    <>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M7 12V6a2 2 0 0 1 4 0" />
      <path d="M7 19l-1 2M17 19l1 2" />
    </>
  ),
  superficie: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h4M3 15h4M9 3v4M15 3v4" />
    </>
  ),
  estacionamiento: (
    <>
      <path d="M4 16v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M17 16v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
      <path d="M3 16v-3.5L5 7h14l2 5.5V16H3Z" />
      <path d="M6.5 12.5h2M15.5 12.5h2" />
    </>
  ),
  casa: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />,
  // Planta arquitectonica: perimetro, un tabique y el vano de acceso.
  plano: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M10 3v8M10 15v6M3 11h7M14 21v-6M14 15h7" />
    </>
  ),
  edificio: (
    <>
      <path d="M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
      <path d="M15 10h4a1 1 0 0 1 1 1v10M2 21h20" />
      <path d="M8 7h3M8 11h3M8 15h3" />
    </>
  ),

  // --- Contacto ---------------------------------------------------------
  ubicacion: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  telefono: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  ),
  correo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </>
  ),

  // --- Confianza --------------------------------------------------------
  escudo: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.5-3.1 8.4-7.5 9.5-4.4-1.1-7.5-5-7.5-9.5V6L12 3Z" />
      <path d="M9 12.2l2 2 4-4.2" />
    </>
  ),
  grua: (
    <>
      <path d="M4 21h16M6 21V6l12 3M6 6l14 1.5" />
      <path d="M14 8.5V13a2 2 0 0 1-2 2h-1" />
    </>
  ),
  arbol: (
    <>
      <path d="M12 21v-5" />
      <path d="M12 16a5 5 0 0 1-1.5-9.8A4 4 0 0 1 18 7a4 4 0 0 1-1 9h-5Z" />
    </>
  ),

  // --- Redes (relleno solido, sin trazo) --------------------------------
  whatsapp: {
    relleno: true,
    trazo: (
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    ),
  },
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: {
    relleno: true,
    trazo: (
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    ),
  },
};

/**
 * @param {object} props
 * @param {keyof typeof TRAZOS} props.nombre  icono a dibujar
 * @param {number|string} [props.tamano=20]   ancho y alto en px
 * @param {string} [props.className]
 * @returns {JSX.Element|null}
 */
export function Icono({ nombre, tamano = 20, className }) {
  const definicion = TRAZOS[nombre];
  if (!definicion) return null;

  const esSolido = typeof definicion === 'object' && 'relleno' in definicion;
  const contenido = esSolido ? definicion.trazo : definicion;

  return (
    <svg
      className={className}
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill={esSolido ? 'currentColor' : 'none'}
      stroke={esSolido ? 'none' : 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      // Decorativo: el significado siempre lo aporta el texto adyacente.
      aria-hidden="true"
      focusable="false"
    >
      {contenido}
    </svg>
  );
}
