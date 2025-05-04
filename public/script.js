document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    const response = await fetch("/crear-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error al crear la sesión");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
});
