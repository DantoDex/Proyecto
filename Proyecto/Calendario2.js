var contactoEditando = null; // Variable global para almacenar el contacto que se está editando

document.addEventListener("DOMContentLoaded", function () {
    cargarContactos();
});

function agregarContacto(nombre, apellido, numero) {
    var contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    var nuevoContacto = { nombre: nombre, apellido: apellido, numero: numero };
    contactos.push(nuevoContacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContactos();
}

function mostrarContactos() {
    var contactosDiv = document.getElementById("contactos");
    contactosDiv.innerHTML = ""; // Limpiar la lista de contactos
    var contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    contactos.forEach(function (contacto, index) {
        var contactoDiv = document.createElement("div");
        contactoDiv.innerHTML = "<p><strong>" + contacto.nombre + " " + contacto.apellido + "</strong>: " + contacto.numero + "</p>";

        var botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList.add("btn", "btn-primary", "btn-sm", "me-2");
        botonEditar.onclick = function () {
            editarContacto(index);
        };
        contactoDiv.appendChild(botonEditar);

        var botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "me-2");
        botonEliminar.onclick = function () {
            eliminarContacto(index);
        };
        contactoDiv.appendChild(botonEliminar);

        var botonEnviarMensaje = document.createElement("button");
        botonEnviarMensaje.textContent = "Enviar Mensaje";
        botonEnviarMensaje.classList.add("btn", "btn-success", "btn-sm", "me-2");
        botonEnviarMensaje.onclick = function () {
            window.open("https://wa.me/" + contacto.numero + "?text=" + encodeURIComponent, "_blank");
        };
        contactoDiv.appendChild(botonEnviarMensaje);

        contactosDiv.appendChild(contactoDiv);
    });
}

function editarContacto(index) {
    var contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    var contacto = contactos[index];
    document.getElementById("nombre").value = contacto.nombre;
    document.getElementById("apellido").value = contacto.apellido;
    document.getElementById("numero").value = contacto.numero;
    document.getElementById("guardarCambios").style.display = "inline";
    contactoEditando = index;
}

function guardarCambios() {
    var contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos[contactoEditando].nombre = document.getElementById("nombre").value;
    contactos[contactoEditando].apellido = document.getElementById("apellido").value;
    contactos[contactoEditando].numero = document.getElementById("numero").value;
    localStorage.setItem("contactos", JSON.stringify(contactos));
    contactoEditando = null;
    document.getElementById("formulario").reset();
    document.getElementById("guardarCambios").style.display = "none";
    mostrarContactos();
}

function eliminarContacto(index) {
    var contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.splice(index, 1);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContactos();
}

function cargarContactos() {
    mostrarContactos();
}

document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var numero = document.getElementById("numero").value;
    if (contactoEditando !== null) {
        guardarCambios();
    } else {
        agregarContacto(nombre, apellido, numero);
    }
    document.getElementById("formulario").reset();
});

document.getElementById("guardarCambios").addEventListener("click", function () {
    guardarCambios();
});