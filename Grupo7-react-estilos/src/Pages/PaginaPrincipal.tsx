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
    precio: 0,
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
    precio: 59.99,
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
    precio: 0,
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
    precio: 69.99,
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
    precio: 0,
  },
];

const PaginaPrincipal = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [carrito, setCarrito] = useState<{ id: number, nombre: string, imagen: string, cantidad: number, precio: number }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [detalleJuego, setDetalleJuego] = useState<any>(null);
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState<any[]>([]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? juegos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === juegos.length - 1 ? 0 : prevIndex + 1));
  };

  const handleCantidadChange = (id: number, value: number) => {
    setCantidades((prev) => ({ ...prev, [id]: value }));
  };

  const agregarAlCarrito = (juego: any) => {
    const cantidad = cantidades[juego.id] || 1;
    if (cantidad <= 0) {
      alert("La cantidad debe ser al menos 1");
      return;
    }

    const indexExistente = carrito.findIndex((item) => item.id === juego.id);
    if (indexExistente !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[indexExistente].cantidad += cantidad;
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...juego, cantidad }]);
    }

    setCantidades((prev) => ({ ...prev, [juego.id]: 1 }));
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
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

  const manejarBusqueda = (valor: string) => {
    setBusqueda(valor);
    const resultados = juegos.filter(juego =>
      juego.nombre.toLowerCase().includes(valor.toLowerCase())
    );
    setResultadosBusqueda(resultados);
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

          <input
            type="text"
            placeholder="Buscar juegos..."
            value={busqueda}
            onChange={(e) => manejarBusqueda(e.target.value)}
          />
        </nav>
        {busqueda && (
          <div className="search-results">
            <h3>Resultados para "{busqueda}":</h3>
            {resultadosBusqueda.length > 0 ? (
              <ul>
                {resultadosBusqueda.map(juego => (
                  <li key={juego.id} style={{ marginBottom: '10px' }}>
                    <strong>{juego.nombre}</strong>
                    <button className="boton-detalles" style={{ marginLeft: '10px' }} onClick={() => abrirDetalle(juego)}>Detalles</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron juegos.</p>
            )}
          </div>
        )}
      </header>

      <section className="carousel">
        <button className="carousel-btn" onClick={handlePrev}>⬅</button>
        <div className="carousel-images">
          <div className="carousel-image">
            <img src={juegos[index].imagen} alt={juegos[index].nombre} />
            <p>{juegos[index].nombre}</p>
            <p>Precio: ${juegos[index].precio.toFixed(2)}</p>
            <input
              type="number"
              min="1"
              value={cantidades[juegos[index].id] || 1}
              onChange={(e) => handleCantidadChange(juegos[index].id, parseInt(e.target.value))}
            />
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
              <p>Precio: ${juego.precio.toFixed(2)}</p>
              <input
                type="number"
                min="1"
                value={cantidades[juego.id] || 1}
                onChange={(e) => handleCantidadChange(juego.id, parseInt(e.target.value))}
              />
              <button onClick={() => agregarAlCarrito(juego)}>Agregar</button>
              <button onClick={() => abrirDetalle(juego)}>Detalles</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h3>🛒 Shopping Cart (<span>{carrito.reduce((total, item) => total + item.cantidad, 0)}</span>)</h3>
        <div id="cart-items">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imagen} alt={item.nombre} width="50" />
                <span>{item.nombre} x{item.cantidad} - ${item.precio.toFixed(2)}</span>
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
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
