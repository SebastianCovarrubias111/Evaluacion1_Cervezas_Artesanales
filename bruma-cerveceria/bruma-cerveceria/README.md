# Cervecería Bruma — Tienda online de cerveza artesanal

Proyecto frontend para la **Evaluación Parcial N.º 1 — DSY1104 Desarrollo FullStack II**.
Sitio construido solo con **HTML5, CSS3 y JavaScript vanilla** (sin frameworks ni backend),
que es justo lo que exige esta evaluación parcial.

## Cómo ejecutarlo en Visual Studio Code

1. Descomprime la carpeta `bruma-cerveceria` en tu equipo.
2. Ábrela en VS Code (`Archivo > Abrir carpeta...`).
3. Instala la extensión **Live Server** (autor: Ritwick Dey) si no la tienes.
4. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
   (También puedes abrir `index.html` directamente con doble clic; todo funciona
   igual porque no hay peticiones a un servidor ni módulos ES).
5. Navega por el menú: Inicio, Catálogo, Nosotros, Contacto, Carrito y la cuenta (👤).

## Estructura del proyecto

```
bruma-cerveceria/
├── index.html          → Landing: hero, destacados, video del proceso, newsletter
├── catalogo.html        → Catálogo completo con filtros por estilo
├── nosotros.html        → Historia, valores y equipo
├── contacto.html         → Formulario de contacto validado
├── login.html            → Login + registro con verificación de mayoría de edad (18+)
├── carrito.html           → Carrito de compras (localStorage)
├── css/
│   └── style.css          → Hoja de estilos externa única (variables, componentes, responsive)
└── js/
    ├── productos.js        → Catálogo de datos + render de tarjetas
    ├── carrito.js           → Lógica de carrito (agregar, quitar, cantidades, checkout)
    ├── validaciones.js       → Validación de formularios (contacto, login, registro, edad)
    └── main.js                → Menú responsive, animaciones al hacer scroll, año dinámico
```

## Checklist frente a la pauta de evaluación

- **Estructura HTML5 semántica**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>` en todas las páginas.
- **Hipervínculos funcionales**: navegación cruzada entre las 6 páginas.
- **Imágenes**: tarjetas de producto, historia y equipo (con `alt` descriptivo).
- **Botones operativos**: agregar al carrito, filtros de catálogo, sumar/restar cantidad,
  pestañas login/registro, finalizar compra.
- **Video embebido**: proceso de elaboración de cerveza en `index.html`.
- **Formularios interactivos**: contacto, newsletter, login y registro.
- **Footer informativo**: dirección, horario, contacto y redes en todas las páginas.
- **CSS externo**: un único `css/style.css` enlazado por todas las páginas.
- **Validación JS de formularios**: etiquetas asociadas (`label for`), `autocomplete`,
  mensajes de error claros y específicos por campo (ver `js/validaciones.js`), incluida
  la validación de **mayoría de edad (18+)** calculada desde la fecha de nacimiento.

## Pendiente para completar la entrega (no generado por Claude)

- **Repositorio Git**: crea un repositorio, sube este proyecto y trabaja con commits
  descriptivos por integrante (`git init`, `git add`, `git commit -m "..."`, `git push`).
  Reparte tareas del equipo por página o componente para que los commits reflejen el
  trabajo de cada integrante.
- **Documento ERS (versión 1)**: la pauta pide una propuesta previa de Especificación de
  Requisitos del Software. Puedes basarte en la estructura de este README (alcance,
  tecnologías, roles de usuario) para redactarlo.
- Reemplaza los datos de contacto, dirección y redes sociales por los reales de tu equipo
  si tu docente pidió un caso propio en vez de uno libre.

## Nota sobre las imágenes

Las fotografías se cargan desde `picsum.photos` (servicio público de imágenes reales) para
que el proyecto se vea completo sin depender de archivos locales. Si tu evaluación exige
imágenes propias, reemplaza los `src` en `productos.js` y en las páginas HTML por rutas
locales, por ejemplo `img/ipa.jpg`.
