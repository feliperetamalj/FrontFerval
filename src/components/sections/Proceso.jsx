import { Contenedor, EncabezadoSeccion, Reveal, Seccion } from '../ui/index.js';
import { PROCESO } from '../../data/empresa.js';
import estilos from './Proceso.module.css';

/**
 * Los cuatro pasos de la compra.
 *
 * Responde la objecion silenciosa de quien compra su primera vivienda: "no sé
 * cómo se hace esto". Al mostrar el camino completo, el primer contacto deja
 * de parecer un compromiso.
 */
export function Proceso() {
  return (
    <Seccion id="proceso" fondo="hundida">
      <Contenedor>
        <EncabezadoSeccion
          etiqueta="Cómo funciona"
          titulo={<>De la primera consulta<br />a las llaves en la mano.</>}
          bajada="Sin letra chica ni pasos sorpresa. Este es el camino completo, y puedes bajarte en cualquier punto."
        />

        <ol className={estilos.pasos}>
          {PROCESO.map((paso, indice) => (
            <Reveal como="li" key={paso.paso} retraso={indice * 90} className={estilos.paso}>
              <span className={estilos.numero} aria-hidden="true">{paso.paso}</span>
              <h3 className={estilos.titulo}>{paso.titulo}</h3>
              <p className={estilos.texto}>{paso.texto}</p>
            </Reveal>
          ))}
        </ol>
      </Contenedor>
    </Seccion>
  );
}
