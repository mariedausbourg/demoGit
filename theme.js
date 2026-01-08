document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "clair";
  applyTheme(savedTheme);
});

function applyTheme(theme) {
  document.body.classList.remove("theme-clair", "theme-sombre");
  document.body.classList.add(`theme-${theme}`);
}
