document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get("payment_id");

  const licenseBox = document.getElementById("license-box");

  if (!paymentId) {
    licenseBox.textContent = "No se encontró el ID de pago.";
    return;
  }

  fetch(`https://helpful-purpose-production-7db9.up.railway.app/license?payment_id=${paymentId}`)
    .then(res => res.json())
    .then(data => {
      if (data.license) {
        licenseBox.textContent = data.license;

        // Copiar al portapapeles
        document.getElementById("copiar").addEventListener("click", () => {
          navigator.clipboard.writeText(data.license);
          alert("¡Licencia copiada!");
        });
      } else {
        licenseBox.textContent = "No se encontró la licencia.";
      }
    })
    .catch(() => {
      licenseBox.textContent = "Error al consultar la licencia.";
    });
});
