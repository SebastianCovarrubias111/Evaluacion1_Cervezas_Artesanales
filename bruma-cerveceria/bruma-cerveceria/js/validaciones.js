/* =========================================================
   CERVECERÍA BRUMA — validaciones.js
   Validación de formularios en el cliente: mensajes de error
   claros y específicos en el contexto de cada campo, tal como
   exige la evaluación (IE1.2.1 / IE1.2.2).
   ========================================================= */

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_TELEFONO = /^[+]?[\d\s()-]{7,15}$/;
const PATRON_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/;

function mostrarError(campo, texto) {
  const contenedor = campo.closest(".campo");
  if (!contenedor) return;
  contenedor.classList.add("con-error");
  contenedor.classList.remove("es-valido");
  const mensaje = contenedor.querySelector(".mensaje-error");
  if (mensaje) mensaje.textContent = texto;
  campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo) {
  const contenedor = campo.closest(".campo");
  if (!contenedor) return;
  contenedor.classList.remove("con-error");
  contenedor.classList.add("es-valido");
  campo.removeAttribute("aria-invalid");
}

function calcularEdad(fechaISO) {
  const nacimiento = new Date(fechaISO);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad -= 1;
  }
  return edad;
}

/* ---------- Formulario de contacto ---------- */
function inicializarFormularioContacto() {
  const formulario = document.getElementById("formulario-contacto");
  if (!formulario) return;

  const nombre = formulario.querySelector("#contacto-nombre");
  const correo = formulario.querySelector("#contacto-correo");
  const telefono = formulario.querySelector("#contacto-telefono");
  const asunto = formulario.querySelector("#contacto-asunto");
  const mensajeCampo = formulario.querySelector("#contacto-mensaje");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let esValido = true;

    if (!PATRON_SOLO_LETRAS.test(nombre.value.trim())) {
      mostrarError(nombre, "Ingresa tu nombre completo, solo letras (mínimo 2 caracteres).");
      esValido = false;
    } else {
      limpiarError(nombre);
    }

    if (!PATRON_CORREO.test(correo.value.trim())) {
      mostrarError(correo, "Ingresa un correo válido, por ejemplo nombre@dominio.cl");
      esValido = false;
    } else {
      limpiarError(correo);
    }

    if (telefono.value.trim() && !PATRON_TELEFONO.test(telefono.value.trim())) {
      mostrarError(telefono, "Ingresa un teléfono válido, solo números, espacios y '+'.");
      esValido = false;
    } else {
      limpiarError(telefono);
    }

    if (!asunto.value) {
      mostrarError(asunto, "Selecciona el motivo de tu mensaje.");
      esValido = false;
    } else {
      limpiarError(asunto);
    }

    if (mensajeCampo.value.trim().length < 10) {
      mostrarError(mensajeCampo, "Cuéntanos un poco más: mínimo 10 caracteres.");
      esValido = false;
    } else {
      limpiarError(mensajeCampo);
    }

    const aviso = document.getElementById("aviso-envio-contacto");
    if (esValido) {
      aviso.textContent = "¡Gracias! Tu mensaje fue enviado, te responderemos dentro de 48 horas hábiles.";
      aviso.classList.add("esta-visible");
      formulario.reset();
      formulario.querySelectorAll(".campo").forEach((c) => c.classList.remove("es-valido"));
    } else {
      aviso.classList.remove("esta-visible");
      formulario.querySelector(".con-error input, .con-error select, .con-error textarea")?.focus();
    }
  });

  [nombre, correo, telefono, asunto, mensajeCampo].forEach((campo) => {
    campo.addEventListener("input", () => {
      if (campo.closest(".campo").classList.contains("con-error")) {
        campo.closest(".campo").classList.remove("con-error");
      }
    });
  });
}

/* ---------- Formulario de newsletter (pie de página) ---------- */
function inicializarFormularioNewsletter() {
  const formulario = document.getElementById("formulario-newsletter");
  if (!formulario) return;
  const correo = formulario.querySelector("#newsletter-correo");
  const aviso = document.getElementById("aviso-newsletter");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!PATRON_CORREO.test(correo.value.trim())) {
      mostrarError(correo, "Ingresa un correo válido para suscribirte.");
      return;
    }
    limpiarError(correo);
    aviso.textContent = "¡Suscrito! Revisa tu correo para confirmar.";
    aviso.classList.add("esta-visible");
    formulario.reset();
  });
}

/* ---------- Login / Registro con verificación de mayoría de edad ---------- */
function inicializarPanelAcceso() {
  const panel = document.getElementById("panel-acceso");
  if (!panel) return;

  const pestanas = panel.querySelectorAll(".pestana-boton");
  const vistas = panel.querySelectorAll(".vista-formulario");
  pestanas.forEach((pestana) => {
    pestana.addEventListener("click", () => {
      pestanas.forEach((p) => p.classList.remove("esta-activa"));
      pestana.classList.add("esta-activa");
      vistas.forEach((v) => v.classList.remove("esta-visible"));
      document.getElementById(pestana.dataset.vista).classList.add("esta-visible");
    });
  });

  /* --- Registro --- */
  const formularioRegistro = document.getElementById("formulario-registro");
  if (formularioRegistro) {
    const nombre = formularioRegistro.querySelector("#registro-nombre");
    const correo = formularioRegistro.querySelector("#registro-correo");
    const nacimiento = formularioRegistro.querySelector("#registro-nacimiento");
    const clave = formularioRegistro.querySelector("#registro-clave");
    const claveConfirmar = formularioRegistro.querySelector("#registro-clave-confirmar");
    const terminos = formularioRegistro.querySelector("#registro-terminos");

    formularioRegistro.addEventListener("submit", (evento) => {
      evento.preventDefault();
      let esValido = true;

      if (!PATRON_SOLO_LETRAS.test(nombre.value.trim())) {
        mostrarError(nombre, "Ingresa tu nombre completo.");
        esValido = false;
      } else limpiarError(nombre);

      if (!PATRON_CORREO.test(correo.value.trim())) {
        mostrarError(correo, "Ingresa un correo electrónico válido.");
        esValido = false;
      } else limpiarError(correo);

      if (!nacimiento.value) {
        mostrarError(nacimiento, "Ingresa tu fecha de nacimiento.");
        esValido = false;
      } else if (calcularEdad(nacimiento.value) < 18) {
        mostrarError(nacimiento, "Debes ser mayor de 18 años para comprar en Cervecería Bruma.");
        esValido = false;
      } else if (calcularEdad(nacimiento.value) > 110) {
        mostrarError(nacimiento, "Revisa la fecha ingresada, no parece válida.");
        esValido = false;
      } else {
        limpiarError(nacimiento);
      }

      if (clave.value.length < 8) {
        mostrarError(clave, "La contraseña debe tener al menos 8 caracteres.");
        esValido = false;
      } else limpiarError(clave);

      if (claveConfirmar.value !== clave.value || claveConfirmar.value === "") {
        mostrarError(claveConfirmar, "Las contraseñas no coinciden.");
        esValido = false;
      } else limpiarError(claveConfirmar);

      if (!terminos.checked) {
        mostrarError(terminos, "Debes aceptar los términos y la política de consumo responsable.");
        esValido = false;
      } else limpiarError(terminos);

      const aviso = document.getElementById("aviso-registro");
      if (esValido) {
        localStorage.setItem("brumaEdadVerificada", "true");
        localStorage.setItem("brumaUsuario", JSON.stringify({ nombre: nombre.value.trim(), correo: correo.value.trim() }));
        aviso.textContent = `¡Bienvenido/a, ${nombre.value.trim().split(" ")[0]}! Tu edad fue verificada y tu cuenta quedó lista.`;
        aviso.classList.add("esta-visible");
        formularioRegistro.reset();
      } else {
        aviso.classList.remove("esta-visible");
      }
    });
  }

  /* --- Login --- */
  const formularioLogin = document.getElementById("formulario-login");
  if (formularioLogin) {
    const correo = formularioLogin.querySelector("#login-correo");
    const clave = formularioLogin.querySelector("#login-clave");

    formularioLogin.addEventListener("submit", (evento) => {
      evento.preventDefault();
      let esValido = true;

      if (!PATRON_CORREO.test(correo.value.trim())) {
        mostrarError(correo, "Ingresa un correo electrónico válido.");
        esValido = false;
      } else limpiarError(correo);

      if (clave.value.length < 8) {
        mostrarError(clave, "Tu contraseña debe tener al menos 8 caracteres.");
        esValido = false;
      } else limpiarError(clave);

      const aviso = document.getElementById("aviso-login");
      if (esValido) {
        localStorage.setItem("brumaEdadVerificada", "true");
        aviso.textContent = "Sesión iniciada correctamente. Ya puedes finalizar tus compras.";
        aviso.classList.add("esta-visible");
        formularioLogin.reset();
      } else {
        aviso.classList.remove("esta-visible");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarFormularioContacto();
  inicializarFormularioNewsletter();
  inicializarPanelAcceso();
});
