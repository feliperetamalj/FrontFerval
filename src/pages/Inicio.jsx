import { useEffect } from 'react';

import {
  Hero,
  Portafolio,
  Proximos,
  PorQue,
  Subsidio,
  Proceso,
  Nosotros,
  Contacto,
} from '../components/sections/index.js';

/**
 * Portada.
 *
 * El orden responde al recorrido de decision de un comprador de vivienda:
 *
 *   1. Hero        ..... que ofrecen y desde cuanto
 *   2. Portafolio  ..... que hay disponible ahora mismo
 *   3. Proximos    ..... lo que viene, para quien no encontro su comuna
 *   4. Por que     ..... por que confiar en esta empresa
 *   5. Subsidio    ..... la objecion principal: "¿califico?"
 *   6. Proceso     ..... la objecion secundaria: "¿como se hace?"
 *   7. Nosotros    ..... prueba de que construyen de verdad
 *   8. Contacto    ..... la conversion
 *
 * El portafolio va antes que el discurso institucional a proposito: quien
 * llega a un sitio inmobiliario quiere ver casas, no leer sobre la empresa.
 */
export function Inicio() {
  useEffect(() => {
    document.title = 'Ferval · Casas y departamentos en Talca, Linares y San Javier';
  }, []);

  return (
    <>
      <Hero />
      <Portafolio />
      <Proximos />
      <PorQue />
      <Subsidio />
      <Proceso />
      <Nosotros />
      <Contacto />
    </>
  );
}
