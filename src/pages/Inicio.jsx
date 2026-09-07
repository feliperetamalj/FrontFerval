import { useEffect } from 'react';

import {
  Hero,
  Portafolio,
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
 *   3. Por que     ..... por que confiar en esta empresa
 *   4. Subsidio    ..... la objecion principal: "¿califico?"
 *   5. Proceso     ..... la objecion secundaria: "¿como se hace?"
 *   6. Nosotros    ..... prueba de que construyen de verdad
 *   7. Contacto    ..... la conversion
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
      <PorQue />
      <Subsidio />
      <Proceso />
      <Nosotros />
      <Contacto />
    </>
  );
}
