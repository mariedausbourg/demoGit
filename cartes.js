document.addEventListener('DOMContentLoaded', initMap);

async function initMap() {
  const map = L.map('map').setView([51.505, -0.09], 6);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  try {
    const response = await fetch('promo.json');
    const promo = await response.json();

    promo.apprenants.forEach(apprenant => {
      const coords = apprenant.coordonnees;
      if (!coords) return;

      const { latitude, longitude } = coords;
      if (latitude == null || longitude == null) return;

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`
          <strong>${apprenant.prenom} ${apprenant.nom}</strong><br>
          ${apprenant.ville}
        `);
    });

  } catch (error) {
    console.error('Erreur chargement JSON :', error);
  }
}
