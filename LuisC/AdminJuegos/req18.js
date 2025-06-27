const juegos = [
  {
    id: 1,
    foto: "https://via.placeholder.com/50",
    categoria: "Zombies",
    nombre: "The Last of Us™ Remastered",
    descripcion: "Juego de supervivencia",
    precio: 159,
    descuento: "0%",
    fecha: "2023-12"
  },
  {
    id: 2,
    foto: "https://via.placeholder.com/50",
    categoria: "Souls like",
    nombre: "Elden Ring",
    descripcion: "Aventura en mundo abierto",
    precio: 172.5,
    descuento: "75%",
    fecha: "2022-10"
  }
];

let idAEliminar = null;
let editMode = false;
let juegoEditando = null;

function renderTabla(lista = juegos) {
  const tbody = document.getElementById("gameTableBody");
  tbody.innerHTML = "";

  lista.forEach((juego) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${juego.foto}" alt="game" /></td>
      <td>${juego.categoria}</td>
      <td>${juego.nombre}</td>
      <td>S/. ${juego.precio}</td>
      <td>${juego.descuento}</td>
      <td>
        <span class="action-icon" onclick="editarJuego(${juego.id})">✏️</span>
        <span class="action-icon" onclick="mostrarModal(${juego.id})">🗑️</span>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function mostrarModal(id) {
  idAEliminar = id;
  document.getElementById("deleteModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("deleteModal").style.display = "none";
  idAEliminar = null;
}

function confirmDelete() {
  const index = juegos.findIndex(j => j.id === idAEliminar);
  if (index !== -1) {
    juegos.splice(index, 1);
    renderTabla();
  }
  closeModal();
}

document.getElementById("addBtn").addEventListener("click", () => {
  editMode = false;
  document.getElementById("form-title").textContent = "Add game";
  document.getElementById("gameForm").reset();
  document.getElementById("gameFormModal").style.display = "flex";
});

function closeForm() {
  document.getElementById("gameFormModal").style.display = "none";
}

function editarJuego(id) {
  const juego = juegos.find(j => j.id === id);
  if (!juego) return;

  editMode = true;
  juegoEditando = juego;
  document.getElementById("form-title").textContent = "Edit game";

  document.getElementById("gameName").value = juego.nombre;
  document.getElementById("gameDesc").value = juego.descripcion || "";
  document.getElementById("gameCategory").value = juego.categoria;
  document.getElementById("gamePrice").value = juego.precio;
  document.getElementById("gameDiscount").value = parseInt(juego.descuento);
  document.getElementById("gamePhoto").value = juego.foto;
  document.getElementById("gameReleaseDate").value = juego.fecha;

  document.getElementById("gameFormModal").style.display = "flex";
}

document.getElementById("gameForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevoJuego = {
    id: editMode ? juegoEditando.id : Date.now(),
    nombre: document.getElementById("gameName").value,
    descripcion: document.getElementById("gameDesc").value,
    categoria: document.getElementById("gameCategory").value,
    precio: parseFloat(document.getElementById("gamePrice").value),
    descuento: document.getElementById("gameDiscount").value + "%",
    foto: document.getElementById("gamePhoto").value,
    fecha: document.getElementById("gameReleaseDate").value
  };

  if (editMode) {
    const index = juegos.findIndex(j => j.id === juegoEditando.id);
    juegos[index] = nuevoJuego;
  } else {
    juegos.push(nuevoJuego);
  }

  renderTabla();
  closeForm();
});

document.getElementById("filterBtn").addEventListener("click", () => {
  const form = document.getElementById("filterForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

document.getElementById("filterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cat = document.getElementById("filterCategory").value;
  const year = document.getElementById("filterYear").value;
  const order = document.getElementById("filterOrder").value;
  const minPrice = parseFloat(document.getElementById("filterMinPrice").value);
  const maxPrice = parseFloat(document.getElementById("filterMaxPrice").value);

  let juegosFiltrados = juegos.filter(juego => {
    const cumpleCategoria = !cat || juego.categoria === cat;
    const cumpleAño = !year || (juego.fecha && juego.fecha.startsWith(year));
    const cumplePrecio = (!minPrice || juego.precio >= minPrice) &&
                         (!maxPrice || juego.precio <= maxPrice);
    return cumpleCategoria && cumpleAño && cumplePrecio;
  });

  if (order === "newest") {
    juegosFiltrados.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  } else if (order === "oldest") {
    juegosFiltrados.sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
  }

  renderTabla(juegosFiltrados);
});

window.onload = () => renderTabla();
