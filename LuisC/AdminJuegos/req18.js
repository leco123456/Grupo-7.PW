const juegos = [
  {
    id: 1,
    foto: "https://via.placeholder.com/50",
    categoria: "Zombies",
    nombre: "The Last of Us™ Remastered",
    descripcion: "Juego de supervivencia",
    precio: 159,
    descuento: "0%"
  },
  {
    id: 2,
    foto: "https://via.placeholder.com/50",
    categoria: "Souls like",
    nombre: "Elden Ring",
    descripcion: "Aventura en mundo abierto",
    precio: 172.5,
    descuento: "75%"
  }
];

let idAEliminar = null;
let editMode = false;
let juegoEditando = null;

function renderTabla() {
  const tbody = document.getElementById("gameTableBody");
  tbody.innerHTML = "";

  juegos.forEach((juego) => {
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
    foto: document.getElementById("gamePhoto").value
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

window.onload = renderTabla;
