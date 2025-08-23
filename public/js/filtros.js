document.addEventListener("DOMContentLoaded", () => {
  const filtroClave = document.getElementById("filtroClave");
  const filtroInput = document.getElementById("filtroInput");
  const filas = document.querySelectorAll("tbody tr");

  filtroClave.addEventListener("change", () => {
    filtroInput.innerHTML = ""; // limpio el div del input cada vez

    if (!filtroClave.value) {
      filas.forEach(fila => fila.style.display = ""); // muestro todas
      return;
    }

    if (filtroClave.value === "population") {
      const inputMin = document.createElement("input");
      inputMin.type = "number";
      inputMin.placeholder = "mín";
      inputMin.min = 0;

      const inputMax = document.createElement("input");
      inputMax.type = "number";
      inputMax.placeholder = "máx";
      inputMax.min = 0;

      filtroInput.appendChild(inputMin);
      filtroInput.appendChild(inputMax);

      const filtrar = () => {
        const min = inputMin.value ? parseInt(inputMin.value, 10) : 0;
        const max = inputMax.value ? parseInt(inputMax.value, 10) : Infinity;

        filas.forEach((fila) => {
          const popText = fila.cells[3].textContent.replace(/\./g, "").trim();
          const pop = popText ? parseInt(popText, 10) : 0;
          fila.style.display = (pop >= min && pop <= max) ? "" : "none";
        });
      };

      inputMin.addEventListener("input", filtrar);
      inputMax.addEventListener("input", filtrar);

    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `Escriba el/la ${filtroClave.options[filtroClave.selectedIndex].text}`;
      filtroInput.appendChild(input);

      input.addEventListener("input", () => {
        const valor = input.value.toLowerCase();

        filas.forEach((fila) => {
          let texto = "";
          switch (filtroClave.value) {
            case "name":
              texto = fila.cells[0].textContent.toLowerCase();
              break;
            case "capital":
              texto = fila.cells[1].textContent.toLowerCase();
              break;
            case "region":
              texto = fila.cells[2].textContent.toLowerCase();
              break;
          }
          fila.style.display = texto.includes(valor) ? "" : "none";
        });
      });
    }
  });
});
