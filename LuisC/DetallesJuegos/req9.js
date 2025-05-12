const juegos = [
  {
    id: 1,
    nombre: "Zelda",
    descripcion: "Un juego de aventuras en un mundo abierto impresionante.",
    imagen: "https://i.imgur.com/O3QfKxD.jpeg",
    trailer: "https://www.youtube.com/embed/zw47_q9wbBE",
    rating: 5,
    resenas: ["Una obra maestra.", "Increíble mundo abierto.", "10/10 en todos los aspectos."]
  },
  {
    id: 2,
    nombre: "God of War",
    descripcion: "Kratos y Atreus enfrentan su destino en la mitología nórdica.",
    imagen: "https://i.imgur.com/fptQtxS.jpeg",
    trailer: "https://www.youtube.com/embed/EE-4GvjKcfs",
    rating: 4,
    resenas: ["Gran historia y combate.", "Mejor que el anterior.", "Gráficos espectaculares."]
  },
  {
    id: 3,
    nombre: "Hollow Knight",
    descripcion: "Una aventura de acción en 2D con exploración y desafíos.",
    imagen: "https://i.imgur.com/vzGmP4X.jpeg",
    trailer: "https://www.youtube.com/embed/UAO2urG23S4",
    rating: 5,
    resenas: ["Una joya indie.", "Muy desafiante.", "Arte hermoso."]
  },
  {
    id: 4,
    nombre: "Elden Ring",
    descripcion: "Un vasto mundo de fantasía lleno de secretos y combates difíciles.",
    imagen: "https://i.imgur.com/Sz7j4Ql.jpeg",
    trailer: "https://www.youtube.com/embed/E3Huy2cdih0",
    rating: 5,
    resenas: ["Obra maestra de FromSoftware.", "Difícil pero justo.", "Mundo inmersivo."]
  },
  {
    id: 5,
    nombre: "Celeste",
    descripcion: "Una historia conmovedora y plataformas de precisión.",
    imagen: "https://i.imgur.com/WVG3DAE.jpeg",
    trailer: "https://www.youtube.com/embed/iofYDsPqAAA",
    rating: 4,
    resenas: ["Inspirador.", "Difícil pero gratificante.", "Excelente música."]
  }
];

  function getParametroURL(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
  }
  
  function mostrarDetalle() {
    const id = parseInt(getParametroURL("id"));
    const juego = juegos.find(j => j.id === id);
  
    if (!juego) {
      document.body.innerHTML = "<h1>Juego no encontrado</h1>";
      return;
    }
  
    document.getElementById("titulo-juego").textContent = juego.nombre;
    document.getElementById("descripcion-juego").textContent = juego.descripcion;
    document.getElementById("imagen-juego").src = juego.imagen;
    document.getElementById("trailer-juego").src = juego.trailer;
  
    // Estrellas
    const estrellasHTML = "★".repeat(juego.rating) + "☆".repeat(5 - juego.rating);
    document.getElementById("estrellas").textContent = estrellasHTML;
  
    // Reseñas
    const ul = document.getElementById("resenas");
    juego.resenas.forEach(r => {
      const li = document.createElement("li");
      li.textContent = r;
      ul.appendChild(li);
    });
  }
  
  window.onload = mostrarDetalle;
  