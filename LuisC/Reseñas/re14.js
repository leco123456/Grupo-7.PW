document.addEventListener("DOMContentLoaded", () => {
  const estrellas = document.getElementById("rating");
  let estrellasSeleccionadas = 5;

  // Permitir seleccionar calificación
  estrellas.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement("span");
    estrella.textContent = "☆";
    estrella.style.cursor = "pointer";
    estrella.dataset.valor = i;

    estrella.addEventListener("click", () => {
      estrellasSeleccionadas = i;
      actualizarEstrellas(estrellasSeleccionadas);
    });

    estrellas.appendChild(estrella);
  }

  function actualizarEstrellas(valor) {
    const estrellasDOM = document.querySelectorAll("#rating span");
    estrellasDOM.forEach((e, index) => {
      e.textContent = index < valor ? "★" : "☆";
    });
  }

  actualizarEstrellas(estrellasSeleccionadas);

  // Botón de enviar reseña
  document.getElementById("enviar-resena").addEventListener("click", () => {
    const texto = document.getElementById("texto-resena").value.trim();
    if (texto === "") {
      alert("Por favor, escribe tu reseña.");
      return;
    }

    const resena = {
      usuario: "Usuario123",
      estrellas: estrellasSeleccionadas,
      comentario: texto,
    };

    console.log("Reseña enviada:", resena);
    alert("¡Gracias por tu reseña!");
    document.getElementById("texto-resena").value = "";
    actualizarEstrellas(5);
  });
});
