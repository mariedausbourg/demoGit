document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("preferences-form");
  
  // Charger thème au démarrage //
  const savedTheme = localStorage.getItem("theme") || "clair";
  document.body.classList.add(`theme-${savedTheme}`);
  
  // Dropdown thème //
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      document.querySelector(".dropdown-toggle").textContent = item.textContent;
    });
  });
  
  // Restaure thème actif //
  document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add("active");
  document.querySelector(".dropdown-toggle").textContent = savedTheme === 'clair' ? 'Clair' : 'Sombre';
  
  // Submit  //
   form.addEventListener("submit", (e) => {
    e.preventDefault();
    const theme = document.querySelector(".dropdown-item.active")?.dataset.theme || "clair";
    const affichage = document.querySelector('input[name="affichage"]:checked')?.value || "liste";
    

    
    localStorage.setItem("theme", theme);
    localStorage.setItem("affichage", affichage);
    
    document.body.classList.remove("theme-clair", "theme-sombre");
    document.body.classList.add(`theme-${theme}`);
    
    afficherPromo();
  });
  
});