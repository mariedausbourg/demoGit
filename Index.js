
// Les infos dans le tableau

document.addEventListener('DOMContentLoaded', function() {
  afficherPromo();
});

async function afficherPromo() {
  try {
    const reponse = await fetch('promo.json');
    const promo = await reponse.json();
    console.log('Promo chargée:', promo);
    
    // Récupérer le tableau
    const tbody = document.querySelector('tbody');
    
    // Vider le Lorem atsum
    tbody.innerHTML = '';
    
    // Parcour les apprenants
    promo.apprenants.forEach(apprenant => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.ville}</td>
        <td><a href="#">Détail</a></td>
      `;
      tbody.appendChild(tr);
    });
    
  } catch (final) {

    const tbody = document.querySelector('tbody');
    
  }
}

document.addEventListener('DOMContentLoaded', function() {
  afficherPromo();
  
  // changement de type d'affichage
  const radios = document.querySelectorAll('input[name="affichage"]');
  radios.forEach(radio => {
    radio.addEventListener('change', afficherPromo);
  });
});

async function afficherPromo() {
  try {
    const reponse = await fetch('promo.json');
    const promo = await reponse.json();
    console.log('Promo chargée:', promo);
    
    // Vérifie quel type d'affichage est sélectionné

    const affichageListe = document.querySelector('input[name="affichage"]:checked').nextSibling.textContent.trim() === 'Liste';
    
    if (affichageListe) {
      afficherListe(promo.apprenants);
    } else {
      afficherCartes(promo.apprenants);
    }
    
  } catch (error) {
    console.error('Erreur lors du chargement de promo.json:', error);
  }
}

function afficherListe(apprenants) {
  const tbody = document.querySelector('tbody');
  const main = document.querySelector('main');
  
  // Afficher le tableau, cacher les cartes
  document.querySelector('.table-responsive').style.display = 'block';
  const cartesContainer = document.querySelector('.cartes-container');
  if (cartesContainer) cartesContainer.style.display = 'none';
  
  // Vider et remplir le tableau
  tbody.innerHTML = '';
  apprenants.forEach(apprenant => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${apprenant.nom}</td>
      <td>${apprenant.prenom}</td>
      <td>${apprenant.ville}</td>
      <td><a href="#">Détail</a></td>
    `;
    tbody.appendChild(tr);
  });
}

function afficherCartes(apprenants) {
  const main = document.querySelector('main');
  
  // Cacher le tableau
  document.querySelector('.table-responsive').style.display = 'none';
  
  // Créer ou récupérer le conteneur des cartes
  let cartesContainer = document.querySelector('.cartes-container');
  if (!cartesContainer) {
    cartesContainer = document.createElement('div');
    cartesContainer.className = 'cartes-container row g-3';
    main.appendChild(cartesContainer);
  }
  
  cartesContainer.style.display = 'flex';
  cartesContainer.innerHTML = '';
  
  // Créer les cartes
  apprenants.forEach(apprenant => {
    const carte = document.createElement('div');
    carte.className = 'col-md-4 col-lg-3';
    carte.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body text-center">
          <h5 class="card-title">${apprenant.prenom} ${apprenant.nom}</h5>
          <p class="card-text">
            <strong>Ville:</strong> ${apprenant.ville}
          </p>
          <a href="#" class="btn btn-outline-dark btn-sm">Détail</a>
        </div>
      </div>
    `;
    cartesContainer.appendChild(carte);
  });
}