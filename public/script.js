// DROPDOWN FUNCTIONS

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const header = dropdown.querySelector(".dropdown-header");
    const content = dropdown.querySelector(".dropdown-content");

    header.addEventListener("click", () => {
      // Cierra otros abiertos
      dropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("open");
          const c = d.querySelector(".dropdown-content");
          c.style.maxHeight = null;
          c.style.paddingTop = "0";
          c.style.paddingBottom = "0";
        }
      });

      // Alterna el actual
      dropdown.classList.toggle("open");

      if (dropdown.classList.contains("open")) {
        content.style.maxHeight = 200 + "px";
        content.style.paddingTop = "1rem";
        content.style.paddingBottom = "1rem";
        content.style.transition = "all .5s ease-in-out";
      } else {
        content.style.maxHeight = null;
        content.style.paddingTop = "0";
        content.style.paddingBottom = "0";
        content.style.transition = "all .5s ease-in-out";
      }
    });
  });
});
// LOCATION READER

document.addEventListener("DOMContentLoaded", () => {
  function isLATAM(timezone) {
    // Lista de zonas horarias de LATAM
    const latamTimezones = [
      // Argentina
      "America/Argentina",
      "America/Buenos_Aires",
      "America/Salta",
      "America/Cordoba",
      "America/Jujuy",
      "America/Mendoza",
      "America/Rio_Gallegos",
      "America/Ushuaia",

      // Bolivia
      "America/La_Paz",

      // Brasil
      "America/Sao_Paulo",
      "America/Rio_Branco",
      "America/Recife",
      "America/Fortaleza",
      "America/Belem",
      "America/Manaus",
      "America/Porto_Velho",

      // Chile
      "America/Santiago",
      "Pacific/Easter",

      // Colombia
      "America/Bogota",

      // Costa Rica
      "America/Costa_Rica",

      // Cuba
      "America/Havana",

      // República Dominicana
      "America/Santo_Domingo",

      // Ecuador
      "America/Guayaquil",
      "Pacific/Galapagos",

      // El Salvador
      "America/El_Salvador",

      // Guatemala
      "America/Guatemala",

      // Honduras
      "America/Tegucigalpa",

      // México
      "America/Mexico_City",
      "America/Cancun",
      "America/Chihuahua",
      "America/Hermosillo",
      "America/Monterrey",
      "America/Merida",

      // Nicaragua
      "America/Managua",

      // Panamá
      "America/Panama",

      // Paraguay
      "America/Asuncion",

      // Perú
      "America/Lima",

      // Puerto Rico
      "America/Puerto_Rico",

      // Uruguay
      "America/Montevideo",

      // Venezuela
      "America/Caracas",
    ];

    return latamTimezones.some((tz) => timezone.startsWith(tz));
  }

  function redirectToPayment() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Zona horaria detectada:", timezone);

    const checkoutBtn = document.getElementById("checkout-btn");

    if (isLATAM(timezone)) {
      checkoutBtn.href = "https://latam-payment-production.up.railway.app/"; // Cambia a la ruta correcta

      console.log("LATAM");
    } else {
      checkoutBtn.addEventListener("click", async () => {
        try {
          const response = await fetch("/crear-sesion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
          } else {
            alert("Error: No se pudo obtener la URL de pago.");
          }
        } catch (err) {
          console.error("Error en la solicitud:", err);
          alert("Error de conexión con el servidor.");
        }
      });
    }
  }

  redirectToPayment();
});
