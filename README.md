# Ferval · Landing Page

Sitio de **Inmobiliaria Ferval** (Talca, Región del Maule).
Rediseño completo en React + CSS, pensado para desplegarse en Vercel.

---

## Puesta en marcha

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:5173`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve `dist/` para revisar el build antes de desplegar |
| `npm run imagenes` | Convierte a WebP las fotos nuevas de `src/assets/proyectos/` |
| `npm run social` | Regenera `og-image.jpg` y `apple-touch-icon.png` |

> **Node.js** se instaló en `~/.local/node` (sin permisos de administrador).
> `~/.zshrc` ya incluye la línea que lo agrega al `PATH`. Si `node` no
> responde en una terminal nueva, ejecuta `source ~/.zshrc`.

---

## Estructura

```
src/
├── data/           Contenido del sitio. Editar aquí, no en los componentes.
│   ├── proyectos.js    Los 9 proyectos: modelos, UF, m², ejecutivas, imágenes
│   └── empresa.js      Datos de contacto, pilares, proceso y navegación
├── styles/
│   ├── tokens.css      Sistema de diseño: color, tipografía, espacio, motion
│   └── base.css        Reset y estilos globales
├── components/
│   ├── ui/             Primitivos: Boton, Etiqueta, Seccion, Logo, Icono…
│   ├── layout/         Header, Footer, CTA flotante
│   └── sections/       Bloques de la portada + tarjeta y galería de proyecto
├── pages/          Inicio · ProyectoDetalle · NoEncontrada
├── hooks/          useScrollReveal, useMediaQuery, useBloqueoScroll…
├── utils/          formato.js (UF, m², rangos) · contacto.js (WhatsApp, correo)
└── assets/         Imágenes optimizadas por proyecto
```

Cada componente lleva su propio archivo `.module.css`: los estilos quedan
acotados al componente y no se pisan entre sí.

---

## Sistema de diseño

Los colores salen del logotipo original, extraídos de la paleta del archivo
(no aproximados a ojo):

| Token | Valor | Uso |
|---|---|---|
| `--brand` | `#00B5EC` | Cyan Ferval |
| `--surface-inverse` | `#2C292F` | Grafito Ferval |
| `--brand-on-light` | `#067BA1` | Cyan legible sobre fondo claro |

**Regla de contraste.** El cyan puro sobre blanco da 2.38:1 y no cumple WCAG
AA. Sobre grafito da 6.03:1 y sí cumple. Por eso:

- el cyan se usa **como fondo** con texto grafito encima (los botones
  principales), o **como texto sobre superficies oscuras**;
- para texto cyan sobre fondo claro existe `--brand-on-light` (4.82:1).

Los tokens están en tres capas —primitivo → semántico → componente—. Los
componentes solo consumen la capa semántica: no hay valores hexadecimales
sueltos en el CSS de componentes.

**Tipografía.** Outfit para titulares (geométrica, dialoga con el cuadrado del
isotipo) e Inter para texto y cifras. El interletrado es negativo en tamaños
grandes y neutro en el cuerpo.

**Logotipo.** La cabecera y el pie usan el logotipo oficial completo: el
cuadrado grafito con marco cyan, la muesca en la esquina inferior derecha y el
nombre "INMOBILIARIA FERVAL" dentro. El nombre no es texto compuesto sino el
contorno vectorial del arte original, en `src/components/ui/nombreTrazado.js`.

`Logo` es el logotipo completo e `Isotipo` la versión sin nombre, reservada
para tamaños donde el texto no alcanzaría a leerse (el favicon). La muesca se
reutiliza como recurso gráfico en tarjetas, etiquetas de sección y en el
recorte de la fotografía de "Nosotros".

---

## Editar el contenido

**Cambiar precios, modelos o textos de un proyecto** → `src/data/proyectos.js`.

**Agregar un proyecto nuevo:**

1. Crea `src/assets/proyectos/<slug>/` con `hero.jpg`, `logo.png` y `g1.jpg`,
   `g2.jpg`… (los nombres importan).
2. Corre `npm run imagenes`. Convierte todo a WebP y genera las variantes
   `hero-480`, `hero-960` y `hero-1440` que alimentan el `srcset` de las
   tarjetas: sin ellas la tarjeta bajaría el archivo de 1920 px para pintarlo
   en un hueco de 400.
3. Agrega el objeto del proyecto al arreglo `PROYECTOS`, con su
   `heroSrcSet: heroSrcSet('<slug>')` junto al `hero`.

El resto se actualiza solo: portafolio, filtros, comunas, cifras del hero,
selector del formulario, pie de página y `sitemap.xml`.

---

## Formulario de contacto

No hay backend. El formulario compone el mensaje y lo entrega al canal que
elija el visitante: WhatsApp (`wa.me`) o correo (`mailto:`). En las fichas de
proyecto el mensaje va a la ejecutiva asignada; si el proyecto no tiene una,
cae al número comercial general.

Solo el nombre es obligatorio, más un teléfono **o** un correo. Cada campo
extra exigido cuesta conversiones.

---

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **Add New → Project** e importa el repositorio.
3. Vercel detecta Vite solo. No hay que tocar nada de la configuración.
4. Deploy. Cada push a `main` vuelve a desplegar.

No hay variables de entorno que configurar.

### Qué hace `vercel.json`

El archivo no admite comentarios —el esquema de Vercel rechaza cualquier
propiedad que no reconozca, incluida `comment`—, así que la explicación va aquí:

**`rewrites`** — Esto es una SPA: el servidor solo tiene `index.html` y las
rutas las resuelve React Router en el navegador. Sin la reescritura, entrar
directo a `/proyecto/rebeca-matte` o recargar esa página devuelve 404, porque
Vercel busca un archivo con ese nombre y no existe. La expresión excluye
`assets/`, el favicon, el icono de iOS, la imagen Open Graph, `robots.txt` y
`sitemap.xml`: esos sí son archivos reales y deben servirse tal cual, no como
`index.html`. Al agregar un archivo suelto en `public/` hay que sumarlo a esa
lista, o se servirá el HTML de la portada en su lugar.

**`headers` de `/assets/*`** — Vite pone un hash en el nombre de cada archivo
compilado (`index-BpaivkaF.css`). Si el contenido cambia, cambia el nombre, así
que se pueden cachear un año sin riesgo de servir algo viejo.

**`headers` de `/(.*)`** — Cabeceras de seguridad estándar: impedir que el
navegador adivine tipos MIME, bloquear el embebido en iframes de otros
dominios, limitar el referer que se filtra al salir del sitio y desactivar
cámara, micrófono y geolocalización, que el sitio no usa.

---

## Accesibilidad

- Contraste verificado sobre cada superficie.
- Foco visible en todo elemento interactivo, con anillo propio para fondos oscuros.
- Enlace "Saltar al contenido" como primer tabulador.
- Objetivos táctiles de 44 px en controles.
- Íconos SVG decorativos marcados `aria-hidden`; el significado siempre lo
  aporta texto adyacente o una etiqueta `sr-only`.
- Se respetan `prefers-reduced-motion`, `prefers-reduced-transparency` y
  `prefers-contrast`.
- El recuento del portafolio usa `aria-live` para anunciar los filtros.

---

## Material de origen

`_assets-src/` guarda las imágenes originales descargadas de fervali.cl antes
de optimizar. No se despliega (está en `.gitignore`) pero conviene conservarlo
por si hay que regenerar assets a otro tamaño.
