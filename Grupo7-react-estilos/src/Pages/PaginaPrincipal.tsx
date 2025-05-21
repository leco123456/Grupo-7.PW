// PaginaPrincipal.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmarOrden from './Confirmarorden';
import './PaginaPrincipal.css';

const juegos = [
  {
    id: 1,
    nombre: "Sven Co-op",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225840/header.jpg?t=1735034103"
  },
  {
    id: 2,
    nombre: "God of War",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1729030762"
  },
  {
    id: 3,
    nombre: "Apex Legends™",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/b7e2d0c4b5f34b6751269c359070f706ff6d59fe/header.jpg?t=1746554828"
  },
  {
    id: 4,
    nombre: "Elden Ring",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1744748041"
  },
  {
    id: 5,
    nombre: "Marvel Rivals",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/15bae4d173dc131df80b8e853fb5dc4c765872d6/header.jpg?t=1747650710"
  }
];

const PaginaPrincipal = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [carrito, setCarrito] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? juegos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === juegos.length - 1 ? 0 : prevIndex + 1));
  };

  const agregarAlCarrito = (juego: any) => {
    if (carrito.find(item => item.id === juego.id)) {
      alert("Este juego ya está en el carrito.");
      return;
    }
    setCarrito((prev) => [...prev, juego]);
  };

  const cancelarCarrito = () => {
    if (carrito.length === 0) return;
    const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar la orden?");
    if (confirmacion) setCarrito([]);
  };

  const abrirModal = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío. Agrega al menos un juego para confirmar la orden.");
      return;
    }
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="pagina-principal">
      <header>
        <h1>Catálogo de Juegos</h1>
        <nav className="navbar">
          <button>Explore</button>
          <button>Categories</button>
          <button onClick={() => navigate('/paginaprincipal')}>Home</button>
          <button>Platform</button>
          <button>Special Offers</button>

          <div
            className="nav-icons"
            onClick={() => navigate('/adminjuegos')}
            title="Admin Panel"
            style={{ cursor: 'pointer' }}
          >
            <span role="img" aria-label="user">👤</span>
          </div>

          <input type="text" placeholder="Search..." />
        </nav>
      </header>

      <section className="carousel">
        <button className="carousel-btn" onClick={handlePrev}>⬅</button>
        <div className="carousel-images">
          <div className="carousel-image">
            <img src={juegos[index].imagen} alt={juegos[index].nombre} />
            <p>{juegos[index].nombre}</p>
            <button onClick={() => agregarAlCarrito(juegos[index])}>Agregar</button>
            <button>Detalles</button>
          </div>
        </div>
        <button className="carousel-btn" onClick={handleNext}>➡</button>
      </section>

      <section className="featured">
        <h2>Featured Games</h2>
        <div className="games-list">
          {juegos.map(juego => (
            <div key={juego.id} className="game-card">
              <img src={juego.imagen} alt={juego.nombre} />
              <h3>{juego.nombre}</h3>
              <button onClick={() => agregarAlCarrito(juego)}>Agregar</button>
              <button>Detalles</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h3>🛒 Shopping Cart (<span>{carrito.length}</span>)</h3>
        <div id="cart-items">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imagen} alt={item.nombre} width="50" />
                <span>{item.nombre}</span>
              </div>
            ))
          )}
        </div>
        <div className="cart-actions">
          <button onClick={abrirModal}>✔ Confirmar Orden</button>
          <button onClick={cancelarCarrito}>✖ Cancelar Orden</button>
        </div>
      </section>

      <ConfirmarOrden visible={modalVisible} onClose={cerrarModal} />
    </div>
  );
};

export default PaginaPrincipal;
