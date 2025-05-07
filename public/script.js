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
      checkoutBtn.href = "../latamPayment/public/index.html"; // Cambia a la ruta correcta

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
