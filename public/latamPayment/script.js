document
  .getElementById("checkout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const coupon = document.getElementById("coupon").value;

    const res = await fetch("/crear-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, coupon }),
    });

    const data = await res.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      document.getElementById("message").innerText =
        data.error || "Error al procesar";
    }
  });
