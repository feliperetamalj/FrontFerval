import { Routes, Route } from 'react-router-dom';

import { Meta } from './components/Meta.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CtaFlotante } from './components/layout/CtaFlotante.jsx';
import { IrArriba } from './components/layout/IrArriba.jsx';
import { Inicio } from './pages/Inicio.jsx';
import { ProyectoDetalle } from './pages/ProyectoDetalle.jsx';
import { NoEncontrada } from './pages/NoEncontrada.jsx';
import { Gracias } from './pages/Gracias.jsx';
import { Privacidad } from './pages/Privacidad.jsx';
import { Terminos } from './pages/Terminos.jsx';

/**
 * Raiz de la aplicacion.
 *
 * Estructura fija (header, pie, CTA flotante) alrededor de las rutas:
 *   /                     portada
 *   /proyecto/:slug       ficha de proyecto
 *   /gracias              confirmacion tras enviar el formulario
 *   /privacidad           politica de privacidad
 *   /terminos             terminos y condiciones
 *   *                     404
 */
export function App() {
  return (
    <>
      <Meta />

      {/* Primer elemento enfocable: permite saltar la navegacion con el teclado. */}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyecto/:slug" element={<ProyectoDetalle />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
      <CtaFlotante />
      <IrArriba />
    </>
  );
}
