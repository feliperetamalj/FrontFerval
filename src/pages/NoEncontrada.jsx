import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Boton, Contenedor, Seccion } from '../components/ui/index.js';
import { ProyectoCard } from '../components/sections/index.js';
import { PROYECTOS } from '../data/proyectos.js';
import estilos from './NoEncontrada.module.css';

/**
 * Pagina 404.
 *
 * En vez de un callejon sin salida, ofrece los tres proyectos con el precio de
 * entrada mas bajo: el visitante llego buscando vivienda y aqui la encuentra.
 */
export function NoEncontrada() {
  useEffect(() => {
    document.title = 'Página no encontrada · Ferval';
  }, []);

  const sugeridos = [...PROYECTOS]
    .filter((p) => typeof p.desdeUF === 'number')
    .sort((a, b) => a.desdeUF - b.desdeUF)
    .slice(0, 3);

  return (
    <Seccion className={estilos.pagina}>
      <Contenedor>
        <p className={estilos.codigo}>404</p>
        <h1 className={estilos.titulo}>Esta página ya no existe.</h1>
        <p className={estilos.texto}>
          Puede que el proyecto que buscabas se haya vendido o que el enlace
          esté desactualizado. Estos son los que tienen el precio de entrada
          más bajo hoy.
        </p>

        <div className={estilos.acciones}>
          <Boton como={Link} to="/" icono="flechaDerecha">Volver al inicio</Boton>
          <Boton como="a" href="/#proyectos" variante="contorno">Ver todos los proyectos</Boton>
        </div>

        <div className={estilos.sugeridos}>
          {sugeridos.map((proyecto) => (
            <ProyectoCard key={proyecto.slug} proyecto={proyecto} />
          ))}
        </div>
      </Contenedor>
    </Seccion>
  );
}
