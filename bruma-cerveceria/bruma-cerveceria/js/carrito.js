/* =========================================================
   CERVECERÍA BRUMA — carrito.js
   Carrito de compras persistido en localStorage. Simula el
   flujo de "pedido" de la tienda (agregar, modificar, quitar,
   calcular total y validar el paso a compra).
   ========================================================= */

const LLAVE_CARRITO = "brumaCarrito";
const LLAVE_EDAD_VERIFICADA = "brumaEdadVerificada";
const LLAVE_USUARIO = "brumaUsuario";

function obtenerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(LLAVE_CARRITO));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(LLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function agregarAlCarrito(idProducto) {
  const producto = CATALOGO_CERVEZAS.find((c) => c.id === idProducto);
  if (!producto) return;

  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === idProducto);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      estilo: producto.estilo,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  guardarCarrito(carrito);
  mostrarConfirmacionAgregado(producto.nombre);
}

function inicializarBotonesCarrito(contenedor) {
  const alcance = contenedor || document;
  alcance.querySelectorAll("[data-agregar-carrito]").forEach((boton) => {
    boton.addEventListener("click", () => {
      agregarAlCarrito(boton.dataset.agregarCarrito);
    });
  });
}

function mostrarConfirmacionAgregado(nombre) {
  const aviso = document.getElementById("aviso-flotante");
  if (!aviso) return;
  aviso.textContent = `${nombre} se añadió al carrito`;
  aviso.classList.add("esta-visible");
  clearTimeout(window.__timeoutAvisoCarrito);
  window.__timeoutAvisoCarrito = setTimeout(() => aviso.classList.remove("esta-visible"), 2600);
}

function actualizarContadorCarrito() {
  const totalUnidades = obtenerCarrito().reduce((acc, item) => acc + item.cantidad, 0);
  document.querySelectorAll("[data-contador-carrito]").forEach((el) => {
    el.textContent = totalUnidades;
    el.style.display = totalUnidades > 0 ? "grid" : "none";
  });
}

function cambiarCantidad(idProducto, delta) {
  const carrito = obtenerCarrito();
  const item = carrito.find((p) => p.id === idProducto);
  if (!item) return;
  item.cantidad = Math.max(1, Math.min(20, item.cantidad + delta));
  guardarCarrito(carrito);
  renderizarPaginaCarrito();
}

function quitarDelCarrito(idProducto) {
  const carrito = obtenerCarrito().filter((p) => p.id !== idProducto);
  guardarCarrito(carrito);
  renderizarPaginaCarrito();
}

function renderizarPaginaCarrito() {
  const cuerpoTabla = document.getElementById("cuerpo-tabla-carrito");
  const bloqueVacio = document.getElementById("carrito-vacio");
  const bloqueTabla = document.getElementById("bloque-tabla-carrito");
  if (!cuerpoTabla) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    bloqueVacio.style.display = "block";
    bloqueTabla.style.display = "none";
    return;
  }
  bloqueVacio.style.display = "none";
  bloqueTabla.style.display = "block";

  cuerpoTabla.innerHTML = carrito.map((item) => `
    <tr>
      <td>
        <div class="fila-carrito__producto">
          <img src="${item.imagen}" alt="${item.nombre}" width="66" height="66">
          <div>
            <strong>${item.nombre}</strong>
            <span class="tarjeta-cerveza__estilo">${item.estilo}</span>
          </div>
        </div>
      </td>
      <td>${formateadorCLP.format(item.precio)}</td>
      <td>
        <div class="control-cantidad">
          <button type="button" aria-label="Restar unidad" data-restar="${item.id}">−</button>
          <input type="text" value="${item.cantidad}" readonly aria-label="Cantidad de ${item.nombre}">
          <button type="button" aria-label="Sumar unidad" data-sumar="${item.id}">+</button>
        </div>
      </td>
      <td>${formateadorCLP.format(item.precio * item.cantidad)}</td>
      <td><button type="button" class="boton-quitar" data-quitar="${item.id}">Quitar</button></td>
    </tr>
  `).join("");

  cuerpoTabla.querySelectorAll("[data-sumar]").forEach((b) => b.addEventListener("click", () => cambiarCantidad(b.dataset.sumar, 1)));
  cuerpoTabla.querySelectorAll("[data-restar]").forEach((b) => b.addEventListener("click", () => cambiarCantidad(b.dataset.restar, -1)));
  cuerpoTabla.querySelectorAll("[data-quitar]").forEach((b) => b.addEventListener("click", () => quitarDelCarrito(b.dataset.quitar)));

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = subtotal > 0 && subtotal < 30000 ? 3500 : 0;
  const total = subtotal + envio;

  document.getElementById("resumen-subtotal").textContent = formateadorCLP.format(subtotal);
  document.getElementById("resumen-envio").textContent = envio === 0 ? "Gratis" : formateadorCLP.format(envio);
  document.getElementById("resumen-total").textContent = formateadorCLP.format(total);
}

function inicializarCheckout() {
  const botonFinalizar = document.getElementById("boton-finalizar-compra");
  if (!botonFinalizar) return;

  botonFinalizar.addEventListener("click", () => {
    const mensaje = document.getElementById("mensaje-checkout");
    const edadVerificada = localStorage.getItem(LLAVE_EDAD_VERIFICADA) === "true";

    if (obtenerCarrito().length === 0) return;

    if (!edadVerificada) {
      mensaje.textContent = "Debes iniciar sesión y verificar que eres mayor de 18 años para finalizar la compra.";
      mensaje.classList.add("esta-visible");
      return;
    }
    mensaje.textContent = "¡Pedido confirmado! Te llegará un correo con el detalle del despacho.";
    mensaje.classList.add("esta-visible");
    localStorage.removeItem(LLAVE_CARRITO);
    actualizarContadorCarrito();
    setTimeout(renderizarPaginaCarrito, 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderizarPaginaCarrito();
  inicializarCheckout();
  inicializarBotonesCarrito(document);
});
