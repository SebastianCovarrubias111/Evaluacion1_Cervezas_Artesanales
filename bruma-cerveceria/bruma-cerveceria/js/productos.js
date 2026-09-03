/* =========================================================
   CERVECERÍA BRUMA — productos.js
   Fuente de datos del catálogo + renderizado de tarjetas.
   Sin backend: arreglo estático en memoria (Evaluación Parcial 1
   solo exige frontend HTML/CSS/JS).
   ========================================================= */

const CATALOGO_CERVEZAS = [
  {
    id: "bru-01",
    nombre: "Bruma Costera",
    estilo: "Pale Ale",
    categoria: "ale",
    abv: "5.2%",
    ibu: 32,
    precio: 5990,
    imagen: "https://picsum.photos/seed/bruma-pale-ale/640/480",
    descripcion: "Pale Ale de cuerpo ligero con notas cítricas de lúpulo Cascade y un final seco, pensada para el atardecer frente al mar.",
    destacado: true
  },
  {
    id: "bru-02",
    nombre: "Niebla Negra",
    estilo: "Stout",
    categoria: "stout",
    abv: "6.8%",
    ibu: 40,
    precio: 6490,
    imagen: "https://picsum.photos/seed/niebla-negra-stout/640/480",
    descripcion: "Stout cremosa con café tostado y cacao amargo, madurada en barrica. La favorita de las noches de lluvia.",
    destacado: true
  },
  {
    id: "bru-03",
    nombre: "Volcánica IPA",
    estilo: "IPA",
    categoria: "ipa",
    abv: "7.1%",
    ibu: 61,
    precio: 6990,
    imagen: "https://picsum.photos/seed/volcanica-ipa/640/480",
    descripcion: "India Pale Ale intensa en lúpulo, con aromas a pino y fruta tropical. Amargor firme y memorable.",
    destacado: true
  },
  {
    id: "bru-04",
    nombre: "Rubia del Lago",
    estilo: "Lager",
    categoria: "lager",
    abv: "4.6%",
    ibu: 18,
    precio: 5490,
    imagen: "https://picsum.photos/seed/rubia-lager/640/480",
    descripcion: "Lager dorada, liviana y refrescante, fermentada en frío durante seis semanas para máxima limpieza de sabor.",
    destacado: true
  },
  {
    id: "bru-05",
    nombre: "Ámbar de Turbera",
    estilo: "Amber Ale",
    categoria: "ale",
    abv: "5.6%",
    ibu: 28,
    precio: 6190,
    imagen: "https://picsum.photos/seed/ambar-turbera/640/480",
    descripcion: "Ale ámbar con maltas caramelo y un leve toque ahumado que recuerda a las turberas del sur.",
    destacado: false
  },
  {
    id: "bru-06",
    nombre: "Doble Lúpulo",
    estilo: "Double IPA",
    categoria: "ipa",
    abv: "8.4%",
    ibu: 74,
    precio: 7490,
    imagen: "https://picsum.photos/seed/doble-lupulo-dipa/640/480",
    descripcion: "Double IPA robusta, para paladares que buscan intensidad. Dry-hopping triple con variedades del hemisferio sur.",
    destacado: false
  },
  {
    id: "bru-07",
    nombre: "Trigo del Estuario",
    estilo: "Witbier",
    categoria: "trigo",
    abv: "4.9%",
    ibu: 14,
    precio: 5790,
    imagen: "https://picsum.photos/seed/witbier-estuario/640/480",
    descripcion: "Cerveza de trigo turbia, con cáscara de naranja y cilantro. Suave, especiada y muy fácil de beber.",
    destacado: false
  },
  {
    id: "bru-08",
    nombre: "Imperial de Roble",
    estilo: "Imperial Stout",
    categoria: "stout",
    abv: "9.5%",
    ibu: 55,
    precio: 8990,
    imagen: "https://picsum.photos/seed/imperial-stout-roble/640/480",
    descripcion: "Imperial Stout envejecida en barricas de roble ex-whisky. Edición limitada de temporada fría.",
    destacado: false
  }
];

const formateadorCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0
});

/**
 * Construye el marcado HTML de una tarjeta de cerveza.
 * @param {object} cerveza
 * @returns {string}
 */
function plantillaTarjetaCerveza(cerveza) {
  return `
    <article class="tarjeta-cerveza reveal" data-categoria="${cerveza.categoria}">
      <div class="etiqueta-colgante" aria-hidden="true">
        <strong>${cerveza.abv}</strong>
        <span>ABV</span>
      </div>
      <div class="tarjeta-cerveza__marco">
        <img src="${cerveza.imagen}" alt="Botella de ${cerveza.nombre}, estilo ${cerveza.estilo}" loading="lazy" width="640" height="480">
      </div>
      <div class="tarjeta-cerveza__cuerpo">
        <span class="tarjeta-cerveza__estilo">${cerveza.estilo} · IBU ${cerveza.ibu}</span>
        <h3>${cerveza.nombre}</h3>
        <p>${cerveza.descripcion}</p>
        <div class="tarjeta-cerveza__pie">
          <span class="tarjeta-cerveza__precio">${formateadorCLP.format(cerveza.precio)}</span>
          <button type="button" class="boton boton--primario boton--pequeno" data-agregar-carrito="${cerveza.id}">
            Agregar
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renderiza una lista de cervezas dentro de un contenedor del DOM.
 * @param {string} idContenedor
 * @param {object[]} lista
 */
function renderizarCervezas(idContenedor, lista) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;
  contenedor.innerHTML = lista.map(plantillaTarjetaCerveza).join("");
  if (typeof activarRevelado === "function") activarRevelado();
  if (typeof inicializarBotonesCarrito === "function") inicializarBotonesCarrito(contenedor);
}

document.addEventListener("DOMContentLoaded", () => {
  // Página de inicio: solo destacados
  const contenedorDestacados = document.getElementById("grilla-destacados");
  if (contenedorDestacados) {
    renderizarCervezas("grilla-destacados", CATALOGO_CERVEZAS.filter((c) => c.destacado));
  }

  // Página de catálogo completo con filtros por estilo
  const contenedorCatalogo = document.getElementById("grilla-catalogo");
  if (contenedorCatalogo) {
    renderizarCervezas("grilla-catalogo", CATALOGO_CERVEZAS);

    const botonesFiltro = document.querySelectorAll(".filtro-boton");
    botonesFiltro.forEach((boton) => {
      boton.addEventListener("click", () => {
        botonesFiltro.forEach((b) => b.classList.remove("esta-activo"));
        boton.classList.add("esta-activo");
        const categoria = boton.dataset.filtro;
        const filtradas = categoria === "todas"
          ? CATALOGO_CERVEZAS
          : CATALOGO_CERVEZAS.filter((c) => c.categoria === categoria);
        renderizarCervezas("grilla-catalogo", filtradas);
      });
    });
  }
});
