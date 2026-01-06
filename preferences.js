js

const form = document.getElementById("preferences-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const theme = document.querySelector('input[name="theme"]:checked').value;
  const affichage = document.querySelector('input[name="affichage"]:checked').value;

  localStorage.setItem("theme", theme);
  localStorage.setItem("affichage", affichage);
});
