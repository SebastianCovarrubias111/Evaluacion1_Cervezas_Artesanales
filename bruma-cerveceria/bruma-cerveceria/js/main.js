/* =========================================================
   CERVECERÍA BRUMA — main.js
   Comportamiento global compartido por todas las páginas:
   menú hamburguesa responsive, animaciones de aparición al
   hacer scroll y año dinámico del footer.
   ========================================================= */

function inicializarMenuMovil() {
  const boton = document.querySelector(".nav__toggle");
  const enlaces = document.querySelector(".nav__enlaces");
  if (!boton || !enlaces) return;

  boton.addEventListener("click", () => {
    const abierto = enlaces.classList.toggle("esta-abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });

  enlaces.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => enlaces.classList.remove("esta-abierto"));
  });
}

function activarRevelado() {
  const elementos = document.querySelectorAll(".reveal:not(.en-vista)");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("en-vista"));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("en-vista");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elementos.forEach((el) => observador.observe(el));
}

function marcarEnlaceActivo() {
  const rutaActual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__enlaces a").forEach((enlace) => {
    const destino = enlace.getAttribute("href");
    if (destino === rutaActual) {
      enlace.setAttribute("aria-current", "page");
    }
  });
}

function insertarAnioActual() {
  document.querySelectorAll("[data-anio-actual]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenuMovil();
  activarRevelado();
  marcarEnlaceActivo();
  insertarAnioActual();
});
