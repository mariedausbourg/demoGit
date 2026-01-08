document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("preferences-form");
  
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();


    const themeButton = document.querySelector('.dropdown-item.active');
    const theme = themeButton ? themeButton.dataset.theme : 'clair';
    
    const affichage = document.querySelector('input[name="affichage"]:checked');
    const affichageValue = affichage ? affichage.value : 'liste';

    localStorage.setItem("theme", theme);
    localStorage.setItem("affichage", affichageValue);
    
    console.log('Préférences sauvées:', { theme, affichage: affichageValue });
  });
})