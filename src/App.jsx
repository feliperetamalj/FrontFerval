import { Routes, Route } from 'react-router-dom';

import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CtaFlotante } from './components/layout/CtaFlotante.jsx';
import { IrArriba } from './components/layout/IrArriba.jsx';
import { Inicio } from './pages/Inicio.jsx';
import { ProyectoDetalle } from './pages/ProyectoDetalle.jsx';
import { NoEncontrada } from './pages/NoEncontrada.jsx';

/**
 * Raiz de la aplicacion.
 *
 * Estructura fija (header, pie, CTA flotante) alrededor de las rutas:
 *   /                     portada
 *   /proyecto/:slug       ficha de proyecto
 *   *                     404
 */
export function App() {
  return (
    <>
      {/* Primer elemento enfocable: permite saltar la navegacion con el teclado. */}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyecto/:slug" element={<ProyectoDetalle />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
      <CtaFlotante />
      <IrArriba />
    </>
  );
}
