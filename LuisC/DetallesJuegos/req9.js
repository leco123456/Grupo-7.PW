const juegos = [
    {
      id: 1,
      nombre: "Zelda: Breath of the Wild",
      descripcion: "Un juego de aventuras en un mundo abierto impresionante.",
      imagen: "https://i.imgur.com/O3QfKxD.jpeg",
      trailer: "https://www.youtube.com/embed/zw47_q9wbBE",
      rating: 5,
      resenas: [
        "Una obra maestra.",
        "Increíble mundo abierto.",
        "10/10 en todos los aspectos."
      ]
    },
    {
      id: 2,
      nombre: "God of War Ragnarok",
      descripcion: "Kratos y Atreus enfrentan su destino en la mitología nórdica.",
      imagen: "https://i.imgur.com/fptQtxS.jpeg",
      trailer: "https://www.youtube.com/embed/EE-4GvjKcfs",
      rating: 4,
      resenas: [
        "Gran historia y combate.",
        "Mejor que el anterior.",
        "Gráficos espectaculares."
      ]
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
  