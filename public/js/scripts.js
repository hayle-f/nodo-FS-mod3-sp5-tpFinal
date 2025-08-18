<script>
  // Abrir modal
  const modal = document.getElementById('modalInfoCompleta');
  const cerrarBtn = document.getElementById('cerrarModal');

  document.querySelectorAll('.ver-detalles').forEach(btn => {
    btn.addEventListener('click', () => {
      const pais = JSON.parse(btn.dataset.pais);

      // Llenamos el modal
      document.getElementById('modalNombre').textContent = pais.name || '-';
      document.getElementById('modalContinente').textContent = pais.continents?.join(', ') || '-';
      document.getElementById('modalRegion').textContent = pais.region || '-';
      document.getElementById('modalSubregion').textContent = pais.subregion || '-';
      document.getElementById('modalCapital').textContent = pais.capital?.[0] || '-';
      document.getElementById('modalLanguages').textContent = pais.languages?.join(', ') || '-';
      document.getElementById('modalPopulation').textContent = pais.population.toLocaleString() || '-';
      document.getElementById('modalArea').textContent = pais.area?.toLocaleString() || '-';
      document.getElementById('modalBorders').textContent = pais.borders?.join(', ') || '-';
      document.getElementById('modalLatlng').textContent = pais.latlng?.join(', ') || '-';
      document.getElementById('modalTimezones').textContent = pais.timezones?.join(', ') || '-';
      document.getElementById('modalGini').textContent = pais.gini || '-';
      document.getElementById('modalFlag').src = pais.flags?.svg || pais.flags?.png || '';
      document.getElementById('modalFlag').alt = 'Bandera de ' + (pais.name || '-');

      // Mostramos el modal
      modal.style.display = 'block';
    });
  });

  // Cerrar modal
  cerrarBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar al hacer click afuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
</script>