document.addEventListener('DOMContentLoaded', function() {


  afficherPromo();
});

async function afficherPromo() {
  try {
    const reponse = await fetch('promo.json');
    const promo = await reponse.json();
    console.log('Promo chargée:', promo);
  } catch (error) {
    console.error('promo.json:');
  }
}
