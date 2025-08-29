document.addEventListener("DOMContentLoaded", () => {
  const filtroClave = document.getElementById("filtroClave");
  const filtroInput = document.getElementById("filtroInput");
  const filas = Array.from(document.querySelectorAll("tbody tr")); // todas las filas
  const filasPorPagina = 8;
  let paginaActual = 1;

  // --- Contenedor de paginación ---
  const contenedorPaginacion = document.createElement("div");
  contenedorPaginacion.classList.add("paginacion");
  document.querySelector(".container").appendChild(contenedorPaginacion);

  // --- Función para mostrar página ---
  function mostrarPagina(pagina, filasAMostrar = filas) {
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;

    filas.forEach(fila => fila.style.display = "none"); // ocultar todas
    filasAMostrar.slice(inicio, fin).forEach(fila => fila.style.display = ""); // mostrar solo visibles

    paginaActual = pagina;
    crearBotones(filasAMostrar);
  }

  // --- Crear botones ---
  function crearBotones(filasAMostrar) {
    const totalPaginas = Math.ceil(filasAMostrar.length / filasPorPagina);
    contenedorPaginacion.innerHTML = "";

    if (totalPaginas <= 1) return;

    // Botón anterior
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.classList.toggle("disabled", btnAnterior.disabled);
    btnAnterior.addEventListener("click", () => mostrarPagina(paginaActual - 1, filasAMostrar));
    contenedorPaginacion.appendChild(btnAnterior);

    // Botones numéricos
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.toggle("activo", i === paginaActual);
      btn.addEventListener("click", () => mostrarPagina(i, filasAMostrar));
      contenedorPaginacion.appendChild(btn);
    }

    // Botón siguiente
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.classList.toggle("disabled", btnSiguiente.disabled);
    btnSiguiente.addEventListener("click", () => mostrarPagina(paginaActual + 1, filasAMostrar));
    contenedorPaginacion.appendChild(btnSiguiente);
  }

  // --- Función para filtrar ---
  function aplicarFiltro() {
    let filasFiltradas = filas;

    if (filtroClave.value) {
      const input = filtroInput.querySelector("input");
      if (input) {
        const valor = input.value.toLowerCase();
        filasFiltradas = filas.filter(fila => {
          let texto = "";
          switch (filtroClave.value) {
            case "name":
              texto = fila.cells[0].textContent.toLowerCase();
              break;
            case "capital":
              texto = fila.cells[1].textContent.toLowerCase();
              break;
            case "subregion":
              texto = fila.cells[2].textContent.toLowerCase();
              break;
            case "population":
              const popText = fila.cells[3].textContent.replace(/\./g, "").trim();
              const pop = popText ? parseInt(popText, 10) : 0;
              const min = parseInt(filtroInput.querySelector(".min")?.value) || 0;
              const max = parseInt(filtroInput.querySelector(".max")?.value) || Infinity;
              return pop >= min && pop <= max;
          }
          return texto.includes(valor);
        });
      }
    }

    mostrarPagina(1, filasFiltradas); // siempre mostrar página 1 de resultados filtrados
  }

  // --- Cuando cambia el select ---
  filtroClave.addEventListener("change", () => {
    filtroInput.innerHTML = ""; // limpiar inputs previos

    // Seleccionar: mostrar paginación normal
    if (!filtroClave.value) {
      mostrarPagina(1);
      return;
    }

    if (filtroClave.value === "population") {
      const inputMin = document.createElement("input");
      inputMin.type = "number";
      inputMin.placeholder = "mín";
      inputMin.classList.add("min");
      inputMin.min = 0;

      const inputMax = document.createElement("input");
      inputMax.type = "number";
      inputMax.placeholder = "máx";
      inputMax.classList.add("max");
      inputMax.min = 0;

      filtroInput.appendChild(inputMin);
      filtroInput.appendChild(inputMax);

      inputMin.addEventListener("input", aplicarFiltro);
      inputMax.addEventListener("input", aplicarFiltro);

    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `Escriba el/la ${filtroClave.options[filtroClave.selectedIndex].text}`;
      filtroInput.appendChild(input);

      input.addEventListener("input", aplicarFiltro);
    }

    aplicarFiltro(); // aplicar filtro inicial al cambiar select
  });

  // --- Inicializar paginación ---
  mostrarPagina(1);
});

