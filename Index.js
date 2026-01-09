document.addEventListener('DOMContentLoaded', () => {
  const savedAffichage = localStorage.getItem("affichage") || "liste";

  const radio = document.querySelector(`input[name="affichage"][value="${savedAffichage}"]`);
  if (radio) radio.checked = true;

  afficherPromo();

  document.querySelectorAll('input[name="affichage"]').forEach(radio => {
    radio.addEventListener('change', function () {
      localStorage.setItem("affichage", this.value);
      afficherPromo();
    });
  });
});

async function afficherPromo() {
  try {
    const response = await fetch('promo.json');
    const promo = await response.json();

    const affichage = document.querySelector('input[name="affichage"]:checked').value;

    if (affichage === "liste") {
      afficherListe(promo.apprenants);
    } else {
      afficherCartes(promo.apprenants);
    }

  } catch (error) {
    console.error("Erreur chargement promo.json", error);
  }
}

//  liste  //
function afficherListe(apprenants) {
  document.querySelector('.table-responsive').style.display = 'block';

  const cartesContainer = document.querySelector('.cartes-container');
  if (cartesContainer) cartesContainer.style.display = 'none';

  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  apprenants.forEach(apprenant => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${apprenant.nom}</td>
      <td>${apprenant.prenom}</td>
      <td>${apprenant.ville}</td>
      <td>
        <button class="btn btn-sm btn-outline-dark detail-btn" data-id="${apprenant.id}">
          Détail
        </button>
      </td>
    `;
    tbody.appendChild(tr);

    // ligne détail cachée //
    const detailTr = document.createElement('tr');
    detailTr.classList.add('d-none');
    detailTr.innerHTML = `
      <td colspan="4" class="bg-light">
        <strong>Anecdote :</strong> ${apprenant.anecdotes}
      </td>
    `;
    tbody.appendChild(detailTr);

    tr.querySelector('.detail-btn').addEventListener('click', () => {
      detailTr.classList.toggle('d-none');
    });
  });
}

//  cardes //
function afficherCartes(apprenants) {
  document.querySelector('.table-responsive').style.display = 'none';

  let cartesContainer = document.querySelector('.cartes-container');
  if (!cartesContainer) {
    cartesContainer = document.createElement('div');
    cartesContainer.className = 'cartes-container row g-3 mt-3';
    document.querySelector('main').appendChild(cartesContainer);
  }

  cartesContainer.style.display = 'flex';
  cartesContainer.innerHTML = '';

  apprenants.forEach(apprenant => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3';

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <h5>${apprenant.prenom} ${apprenant.nom}</h5>
          <p><strong>Ville :</strong> ${apprenant.ville}</p>

          <button class="btn btn-outline-dark btn-sm detail-btn">
            Détail
          </button>

          <div class="mt-2 d-none detail-content">
            <p class="small">${apprenant.anecdotes}</p>
          </div>
        </div>
      </div>
    `;

    const btn = col.querySelector('.detail-btn');
    const detail = col.querySelector('.detail-content');

    btn.addEventListener('click', () => {
      detail.classList.toggle('d-none');
    });

    cartesContainer.appendChild(col);
  });
}
