const juegos = [
    { id: 1, nombre: "Zelda", precio: 50 },
    { id: 2, nombre: "God of War", precio: 60 },
    { id: 3, nombre: "Hollow Knight", precio: 20 },
    { id: 4, nombre: "Elden Ring", precio: 70 },
    { id: 5, nombre: "Celeste", precio: 15 }
  ];
  
  let carrito = [];
  
  function renderCatalogo() {
    const contenedor = document.getElementById("catalogo");
    juegos.forEach(juego => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h4>${juego.nombre}</h4>
        <p>$${juego.precio}</p>
        <button onclick="agregarAlCarrito(${juego.id})">Agregar</button>
        <a href="../DetallesJuegos/index2.html?id=${juego.id}">Detalles</a>
      `;
      contenedor.appendChild(card);
    });
  }
  
  function agregarAlCarrito(id) {
    const juego = juegos.find(j => j.id === id);
    carrito.push(juego);
    renderCarrito();
  }
  
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderCarrito();
  }
  
  function renderCarrito() {
    const contenedor = document.getElementById("cart-items");
    contenedor.innerHTML = "";
    carrito.forEach((juego, i) => {
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        ${juego.nombre}
        <button onclick="eliminarDelCarrito(${i})">❌</button>
      `;
      contenedor.appendChild(item);
    });
    document.getElementById("carrito-contador").textContent = carrito.length;
  }
  
  document.getElementById("confirmar").addEventListener("click", () => {
    alert("Compra confirmada!");
    carrito = [];
    renderCarrito();
  });
  
  document.getElementById("cancelar").addEventListener("click", () => {
    if (confirm("¿Cancelar todo el carrito?")) {
      carrito = [];
      renderCarrito();
    }
  });
  
  window.onload = () => {
    renderCatalogo();
    renderCarrito();
  };
  