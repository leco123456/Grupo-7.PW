import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmarOrden from './Confirmarorden';
import Detalle from './Detalle';
import './PaginaPrincipal.css';

const juegos = [
  {
    id: 1,
    nombre: "Sven Co-op",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225840/header.jpg?t=1735034103",
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    descripcion: "Sven Co-op es un mod cooperativo para Half-Life que te permite jugar en equipo con amigos.",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ],
    rating: 4.5,
  },
  {
    id: 2,
    nombre: "God of War",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1729030762",
    videoUrl: "https://www.youtube.com/embed/K0u_kAWLJOA",
    descripcion: "Una épica aventura de Kratos y Atreus en la mitología nórdica.",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ],
    rating: 5,
  },
  {
    id: 3,
    nombre: "Counter Strike 2",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595",
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    descripcion: "Durante las dos últimas décadas, Counter‑Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar. Hablamos de Counter‑Strike 2.",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ],
    rating: 4.5,
  },
  {
    id: 4,
    nombre: "Red Dead Redemption 2",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643",
    videoUrl: "https://www.youtube.com/embed/someVideoID2",
    descripcion: "Una épica aventura de Kratos y Atreus en la mitología nórdica.",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ],
    rating: 5,
  },
  {
    id: 5,
    nombre: "Gang Beasts",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/285900/header.jpg?t=1732109683",
    videoUrl: "https://www.youtube.com/embed/someVideoID1",
    descripcion: "Gang Beasts es un desternillante juego multijugador de peleas absurdas entre personajes gelatinosos y gruñones.",
    galeria: [
      "https://url.imagen1.jpg",
      "https://url.imagen2.jpg",
      "https://url.imagen3.jpg"
    ],
    rating: 4.5,
  },
];

const PaginaPrincipal = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [carrito, setCarrito] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleJuego, setDetalleJuego] = useState<any>(null);

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

  const abrirModalOrden = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío. Agrega al menos un juego para confirmar la orden.");
      return;
    }
    setModalVisible(true);
  };

  const cerrarModalOrden = () => setModalVisible(false);

  const abrirDetalle = (juego: any) => {
    setDetalleJuego(juego);
  };

  const cerrarDetalle = () => {
    setDetalleJuego(null);
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
            <button onClick={() => abrirDetalle(juegos[index])}>Detalles</button>
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
              <button onClick={() => abrirDetalle(juego)}>Detalles</button>
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
          <button onClick={abrirModalOrden}>✔ Confirmar Orden</button>
          <button onClick={cancelarCarrito}>✖ Cancelar Orden</button>
        </div>
      </section>

      <ConfirmarOrden visible={modalVisible} onClose={cerrarModalOrden} />
      <Detalle juego={detalleJuego} visible={!!detalleJuego} onClose={cerrarDetalle} />
    </div>
  );
};

export default PaginaPrincipal;

