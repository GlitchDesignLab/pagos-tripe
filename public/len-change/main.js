const switcher = document.getElementById("language-switcher");
const elements = document.querySelectorAll("[data-i18n]");

function setLanguage(lang) {
  if (!translations[lang]) return; // evita errores si el idioma no está definido

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
  switcher.value = lang; // sincroniza el selector con el idioma actual
}

// Detectar idioma del navegador
const userLang = navigator.language.slice(0, 2); // 'es', 'en', etc.
const initialLang = translations[userLang] ? userLang : "es"; // fallback a español

setLanguage(initialLang);

// Permitir cambio manual
switcher.addEventListener("change", (e) => {
  setLanguage(e.target.value);
});
