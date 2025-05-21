const juegos = [
  { id: 1, nombre: "Zelda", precio: 50, imagen: "../../BrunoT_req 3_5_15_19/Zelda.jpg"  },
  { id: 2, nombre: "God of War", precio: 60, imagen: "../../BrunoT_req 3_5_15_19/GOW.jpg"  },
  { id: 3, nombre: "Hollow Knight", precio: 20, imagen: "../../BrunoT_req 3_5_15_19/Hollow.jpg "  },
  { id: 4, nombre: "Elder Ring", precio: 70, imagen: "../../BrunoT_req 3_5_15_19/Elder Ring.jpg"  },
  { id: 5, nombre: "Celeste", precio: 15, imagen: "../../BrunoT_req 3_5_15_19/Celeste.jpg"  },
  { id: 6, nombre: "Helldivers 2", precio: 55, imagen: "../../BrunoT_req 3_5_15_19/Helldivers2.jpg"  },
  { id: 7, nombre: "Spider-Man 2", precio: 65, imagen: "../../BrunoT_req 3_5_15_19/Spiderman2.jpg"  },
  { id: 8, nombre: "Resident Evil 4", precio: 45, imagen: "../../BrunoT_req 3_5_15_19/ResidentEvil4.jpg"  },
  { id: 9, nombre: "Cuphead", precio: 30, imagen: "../../BrunoT_req 3_5_15_19/Cuphead.jpg"  },
  { id: 10, nombre: "Starfield", precio: 75, imagen: "../../BrunoT_req 3_5_15_19/Starfield.jpg"    }
];

  
  let carrito = [];
  
function renderCatalogo() {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = ""; // Limpiar contenido previo (por si acaso)

  juegos.forEach(juego => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${juego.nombre}</h4>
      <img src="${juego.imagen}" alt="${juego.nombre}">
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
  