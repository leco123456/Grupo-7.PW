const juegos = [
  { id: 1, nombre: "Zelda", precio: 50 },
  { id: 2, nombre: "God of War", precio: 60 },
  { id: 3, nombre: "Hollow Knight", precio: 20 },
  { id: 4, nombre: "Elden Ring", precio: 70 },
  { id: 5, nombre: "Celeste", precio: 15 }
];

let carrito = [];

function renderCatalogo(){
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "";
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

function agregarAlCarrito(id){
  const juego = juegos.find(j => j.id === id);
  carrito.push(juego);
  renderCarrito();
}

function eliminarDelCarrito(index){
  carrito.splice(index,1);
  renderCarrito();
}

function renderCarrito(){
  const contenedor = document.getElementById("cart-items");
  contenedor.innerHTML = "";
  carrito.forEach((juego,i) => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      ${juego.nombre}
      <button onclick="eliminarDelCarrito(${i})">X</button>
    `;
    contenedor.appendChild(item);
  });
  document.getElementById("carrito-contador").textContent = carrito.length;
}

const modal = document.getElementById("order-modal");
const btnConfirmar = document.getElementById("confirmar");
const btnCancelar = document.getElementById("cancelar");
const btnCerrar = document.getElementById("close-modal");
const btnProceed = document.getElementById("proceed");

btnConfirmar.addEventListener("click", () => {
  if(carrito.length === 0){
    alert("El carrito está vacío.");
    return;
  }
  modal.style.display = "flex";
});

btnCerrar.addEventListener("click", () => {
  modal.style.display = "none";
  limpiarModal();
});

window.onclick = function(event){
  if(event.target === modal){
    modal.style.display = "none";
    limpiarModal();
  }
}

btnCancelar.addEventListener("click", () => {
  if(confirm("¿Cancelar todo el carrito?")){
    carrito = [];
    renderCarrito();
  }
});

btnProceed.addEventListener("click", () => {
  const nombre = document.getElementById("full-name").value.trim();
  const direccion = document.getElementById("address").value.trim();
  const tarjeta = document.getElementById("card-number").value.trim();
  const cvc = document.getElementById("cvc").value.trim();
  const expira = document.getElementById("expiration-date").value.trim();

  if(!nombre || !direccion || !tarjeta || !cvc || !expira){
    alert("Por favor llena todos los campos.");
    return;
  }

  carrito = [];
  renderCarrito();
  modal.style.display = "none";
  document.getElementById("success-modal").style.display = "flex";
  limpiarModal();

});


function limpiarModal(){
  document.getElementById("full-name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("card-number").value = "";
  document.getElementById("cvc").value = "";
  document.getElementById("expiration-date").value = "";
}

window.onload = function(){
  renderCatalogo();
  renderCarrito();
};


const successModal = document.getElementById("success-modal");
const successCloseBtn = document.getElementById("success-close-btn");

successCloseBtn.addEventListener("click", () => {
  successModal.style.display = "none";
});
