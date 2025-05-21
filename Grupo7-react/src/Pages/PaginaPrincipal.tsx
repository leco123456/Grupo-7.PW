import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="pagina-principal">
      <header>
        <h1>Catálogo de Juegos</h1>
        <nav className="navbar">
          <button>Explore</button>
          <button>Categories</button>
          <button>Home</button>
          <button>Platform</button>
          <button>Special Offers</button>

          <div className="nav-icons" onClick={() => navigate('/adminjuegos')} title="Admin Panel" style={{ cursor: 'pointer' }}>
            <span role="img" aria-label="user">👤</span>
          </div>

          <input type="text" placeholder="Search..." />
        </nav>
      </header>

      <section className="carousel">
        <button className="carousel-btn">⬅</button>
        <div className="carousel-images">
          {juegos.map(juego => (
            <div key={juego.id} className="carousel-image">
              <img src={juego.imagen} alt={juego.nombre} />
              <p>{juego.nombre}</p>
              <button>Detalles</button>
            </div>
          ))}
        </div>
        <button className="carousel-btn">➡</button>
      </section>

      <section className="featured">
        <h2>Featured Games</h2>
        <div className="games-list">
          {juegos.map(juego => (
            <div key={juego.id} className="game-card">
              <img src={juego.imagen} alt={juego.nombre} />
              <h3>{juego.nombre}</h3>
              <button>Agregar</button>
              <button>Detalles</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h3>🛒 Shopping Cart (<span id="carrito-contador">0</span>)</h3>
        <div id="cart-items"></div>
        <div className="cart-actions">
          <button id="confirmar">✔ Confirm Order</button>
          <button id="cancelar">✖ Cancel Order</button>
        </div>
      </section>
    </div>
  );
};

export default PaginaPrincipal;
