import { useMemo, useState } from 'react';

import { Contenedor, EncabezadoSeccion, Reveal, Seccion, Icono } from '../ui/index.js';
import { ProyectoCard } from './ProyectoCard.jsx';
import { PROYECTOS, COMUNAS } from '../../data/proyectos.js';
import estilos from './Portafolio.module.css';

/** Opciones del filtro por tipo de vivienda. */
const TIPOS_FILTRO = [
  { valor: 'todos', etiqueta: 'Todos' },
  { valor: 'casa', etiqueta: 'Casas', icono: 'casa' },
  { valor: 'departamento', etiqueta: 'Departamentos', icono: 'edificio' },
];

/**
 * Catalogo de proyectos con filtros.
 *
 * El sitio anterior pedia seis campos en dos formularios distintos antes de
 * mostrar un solo proyecto. Aqui todo el portafolio esta visible desde el
 * primer momento y los filtros solo lo reducen: el usuario nunca se queda
 * mirando una pantalla vacia esperando a que le pregunten cosas.
 */
export function Portafolio() {
  const [tipo, setTipo] = useState('todos');
  const [comuna, setComuna] = useState('todas');
  const [soloSubsidio, setSoloSubsidio] = useState(false);

  const proyectosFiltrados = useMemo(
    () =>
      PROYECTOS.filter((proyecto) => {
        if (tipo !== 'todos' && proyecto.tipo !== tipo) return false;
        if (comuna !== 'todas' && proyecto.comuna !== comuna) return false;
        if (soloSubsidio && !proyecto.subsidio) return false;
        return true;
      }),
    [tipo, comuna, soloSubsidio],
  );

  const hayFiltros = tipo !== 'todos' || comuna !== 'todas' || soloSubsidio;

  const limpiar = () => {
    setTipo('todos');
    setComuna('todas');
    setSoloSubsidio(false);
  };

  return (
    <Seccion id="proyectos" fondo="hundida">
      <Contenedor>
        <EncabezadoSeccion
          etiqueta="Portafolio"
          titulo={<>Proyectos que<br />construyen futuro.</>}
          bajada="Departamentos con subsidio, casas familiares y sitios exclusivos en cinco comunas. Filtra por lo que estás buscando."
        />

        {/* --- Filtros --- */}
        <div className={estilos.filtros}>
          <div className={estilos.grupo} role="group" aria-label="Filtrar por tipo de vivienda">
            {TIPOS_FILTRO.map((opcion) => (
              <button
                key={opcion.valor}
                type="button"
                className={`${estilos.chip} ${tipo === opcion.valor ? estilos.chipActivo : ''}`}
                onClick={() => setTipo(opcion.valor)}
                aria-pressed={tipo === opcion.valor}
              >
                {opcion.icono && <Icono nombre={opcion.icono} tamano={16} />}
                {opcion.etiqueta}
              </button>
            ))}
          </div>

          <div className={estilos.grupoDerecha}>
            <label className={estilos.campoSelect}>
              <span className="sr-only">Filtrar por comuna</span>
              <Icono nombre="ubicacion" tamano={16} />
              <select value={comuna} onChange={(e) => setComuna(e.target.value)}>
                <option value="todas">Todas las comunas</option>
                {COMUNAS.map((nombre) => (
                  <option key={nombre} value={nombre}>{nombre}</option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className={`${estilos.chip} ${soloSubsidio ? estilos.chipActivo : ''}`}
              onClick={() => setSoloSubsidio((v) => !v)}
              aria-pressed={soloSubsidio}
            >
              <Icono nombre="escudo" tamano={16} />
              Con subsidio DS19
            </button>
          </div>
        </div>

        {/* Recuento en vivo. `aria-live` lo anuncia a los lectores de pantalla
            cuando cambia el filtro, que de otro modo no notarian nada. */}
        <p className={estilos.recuento} aria-live="polite">
          {proyectosFiltrados.length === PROYECTOS.length
            ? `${PROYECTOS.length} proyectos disponibles`
            : `${proyectosFiltrados.length} de ${PROYECTOS.length} proyectos`}
          {hayFiltros && (
            <button type="button" className={estilos.limpiar} onClick={limpiar}>
              <Icono nombre="cerrar" tamano={14} />
              Limpiar filtros
            </button>
          )}
        </p>

        {/* --- Rejilla --- */}
        {proyectosFiltrados.length > 0 ? (
          <div className={estilos.rejilla}>
            {proyectosFiltrados.map((proyecto, indice) => (
              <Reveal
                key={proyecto.slug}
                retraso={Math.min(indice, 5) * 60}
                className={indice === 0 && !hayFiltros ? estilos.celdaAncha : ''}
              >
                <ProyectoCard
                  proyecto={proyecto}
                  formato={indice === 0 && !hayFiltros ? 'ancha' : 'normal'}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={estilos.vacio}>
            <p className={estilos.vacioTitulo}>No hay proyectos con esos filtros</p>
            <p className={estilos.vacioTexto}>
              Prueba ampliando la búsqueda: puede que tengamos algo parecido en
              una comuna vecina.
            </p>
            <button type="button" className={estilos.limpiarGrande} onClick={limpiar}>
              Ver todos los proyectos
            </button>
          </div>
        )}
      </Contenedor>
    </Seccion>
  );
}
