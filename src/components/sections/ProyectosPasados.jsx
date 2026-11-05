import { Contenedor, EncabezadoSeccion, Reveal, Seccion } from '../ui/index.js';
import { ProyectoCard } from './ProyectoCard.jsx';
import { PASADOS } from '../../data/proyectos.js';
import estilos from './ProyectosPasados.module.css';

/**
 * Proyectos 100% vendidos.
 *
 * Salen del portafolio para que ahi solo quede lo que se puede comprar, pero
 * siguen publicados: son la prueba concreta de que la empresa termina lo que
 * empieza. Cada tarjeta lleva a su ficha, que conserva fotos, modelos y planos.
 */
export function ProyectosPasados() {
  if (!PASADOS.length) return null;

  return (
    <Seccion id="proyectos-pasados" fondo="hundida">
      <Contenedor>
        <EncabezadoSeccion
          etiqueta="Trayectoria"
          titulo={<>Proyectos pasados.</>}
          bajada="Proyectos que ya vendimos por completo. Siguen aquí para que conozcas lo que hemos construido."
        />

        <div className={estilos.rejilla}>
          {PASADOS.map((proyecto, indice) => (
            <Reveal key={proyecto.slug} retraso={indice * 60}>
              <ProyectoCard proyecto={proyecto} />
            </Reveal>
          ))}
        </div>
      </Contenedor>
    </Seccion>
  );
}
