document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todas las filas de la tabla
  const filas = document.querySelectorAll("tbody tr");
  const filasPorPagina = 8; // cuántas filas mostrar por página
  let paginaActual = 1; // página inicial
  const totalPaginas = Math.ceil(filas.length / filasPorPagina); // calculamos el total de páginas

  // Creamos un contenedor para los botones de paginación
  const contenedorPaginacion = document.createElement("div");
  contenedorPaginacion.classList.add("paginacion");
  document.querySelector(".container").appendChild(contenedorPaginacion);

  // Función para crear los botones cada vez que se cambia de página
  function crearBotones() {
    contenedorPaginacion.innerHTML = ''; // limpiar botones previos

    // Botón "Anterior"
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = paginaActual === 1; // deshabilitar si estamos en la primera página
    btnAnterior.classList.toggle('disabled', btnAnterior.disabled); // clase visual para deshabilitado
    btnAnterior.addEventListener("click", () => mostrarPagina(paginaActual - 1));
    contenedorPaginacion.appendChild(btnAnterior);

    // Botones numerados
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.toggle("activo", i === paginaActual); // marcar el número de página actual
      btn.addEventListener("click", () => mostrarPagina(i));
      contenedorPaginacion.appendChild(btn);
    }

    // Botón "Siguiente"
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.disabled = paginaActual === totalPaginas; // deshabilitar si estamos en la última página
    btnSiguiente.classList.toggle('disabled', btnSiguiente.disabled); // clase visual para deshabilitado
    btnSiguiente.addEventListener("click", () => mostrarPagina(paginaActual + 1));
    contenedorPaginacion.appendChild(btnSiguiente);
  }

  // Función para mostrar solo las filas correspondientes a la página
  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;

    filas.forEach((fila, i) => {
      fila.style.display = i >= inicio && i < fin ? "" : "none"; // mostrar u ocultar fila
    });

    paginaActual = pagina; // actualizar la página actual
    crearBotones(); // volver a crear los botones para reflejar cambios
  }

  // Inicializamos mostrando la primera página
  mostrarPagina(1);
});
