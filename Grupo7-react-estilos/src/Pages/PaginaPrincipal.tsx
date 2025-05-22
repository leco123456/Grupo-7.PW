import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmarOrden from './Confirmarorden';
import Detalle from './Detalle';
import './PaginaPrincipal.css';

// Datos de juegos - Idealmente esto vendría de una API
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
    precio: 9.99, // Cambiado, ya no es gratis
    categoria: "Cooperativo"
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
    categoria: "Aventura"
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
    precio: 19.99, // Cambiado, ya no es gratis
    categoria: "FPS"
  },
  {
    id: 4,
    nombre: "Red Dead Redemption 2",
    imagen: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643",
    videoUrl: "https://www.youtube.com/embed/someVideoID2",
    descripcion: "Una historia épica del salvaje oeste con Arthur Morgan y la banda de Dutch van der Linde.",
    galeria: [
      "https://url.imagen4.jpg",
      "https://url.imagen5.jpg",
      "https://url.imagen6.jpg"
    ],
    rating: 5,
    precio: 69.99,
    categoria: "Aventura"
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
    precio: 14.99, // Cambiado, ya no es gratis
    categoria: "Multijugador"
  },
  // Puedes agregar más juegos para llenar la cuadrícula 4x2 si lo deseas
];

// Tipos TypeScript para mejor tipado
interface Juego {
  id: number;
  nombre: string;
  imagen: string;
  videoUrl: string;
  descripcion: string;
  galeria: string[];
  rating: number;
  precio: number;
  categoria: string;
}

export interface ItemCarrito extends Juego {
  cantidad: number;
}

const PaginaPrincipal: React.FC = () => {
  const navigate = useNavigate();
  const [menuCategoriasVisible, setMenuCategoriasVisible] = useState(false);
  
  // Estados principales
  const [index, setIndex] = useState(0);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidades, setCantidades] = useState<Record<number, number>>({});
  const [detalleJuego, setDetalleJuego] = useState<Juego | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [ordenamiento, setOrdenamiento] = useState('nombre');
  
  // Estados para la interfaz
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Auto-avance del carrusel
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex(prevIndex => (prevIndex === juegos.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  // Persistir carrito en localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Funciones del carrusel
  const handlePrev = useCallback(() => {
    setIndex(prevIndex => (prevIndex === 0 ? juegos.length - 1 : prevIndex - 1));
  }, []);

  const handleNext = useCallback(() => {
    setIndex(prevIndex => (prevIndex === juegos.length - 1 ? 0 : prevIndex + 1));
  }, []);

  // Función para mostrar mensajes temporales
  const mostrarMensaje = (texto: string, tipo: 'success' | 'error' | 'info' = 'info') => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  // Gestión de cantidades
  const handleCantidadChange = useCallback((id: number, value: number) => {
    if (value < 1) return;
    setCantidades(prev => ({ ...prev, [id]: value }));
  }, []);

  // Agregar al carrito mejorado
  const agregarAlCarrito = useCallback((juego: Juego) => {
    const cantidad = cantidades[juego.id] || 1;
    
    if (cantidad <= 0) {
      mostrarMensaje("La cantidad debe ser al menos 1", 'error');
      return;
    }

    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.id === juego.id);
      
      if (itemExistente) {
        return prevCarrito.map(item =>
          item.id === juego.id 
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...juego, cantidad }];
      }
    });

    setCantidades(prev => ({ ...prev, [juego.id]: 1 }));
    mostrarMensaje(`${juego.nombre} agregado al carrito`, 'success');
  }, [cantidades]);

  // Eliminar del carrito
  const eliminarDelCarrito = useCallback((id: number) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
    mostrarMensaje("Producto eliminado del carrito", 'info');
  }, []);

  // Actualizar cantidad en carrito
  const actualizarCantidadCarrito = useCallback((id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    
    setCarrito(prev => 
      prev.map(item => 
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  }, [eliminarDelCarrito]);

  // Cancelar carrito
  const cancelarCarrito = useCallback(() => {
    if (carrito.length === 0) return;
    
    const confirmacion = window.confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmacion) {
      setCarrito([]);
      mostrarMensaje("Carrito vaciado", 'info');
    }
  }, [carrito.length]);

  // Modal de orden
  const abrirModalOrden = useCallback(() => {
    if (carrito.length === 0) {
      mostrarMensaje("El carrito está vacío. Agrega al menos un juego para confirmar la orden.", 'error');
      return;
    }
    setModalVisible(true);
  }, [carrito.length]);

  const cerrarModalOrden = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Detalles del juego
  const abrirDetalle = useCallback((juego: Juego) => {
    setDetalleJuego(juego);
  }, []);

  const cerrarDetalle = useCallback(() => {
    setDetalleJuego(null);
  }, []);

  // Filtros y búsqueda optimizados
  const juegosFiltrados = useMemo(() => {
    let resultado = juegos;

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      resultado = resultado.filter(juego =>
        juego.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        juego.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        juego.categoria.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (categoriaFiltro !== 'todas') {
      resultado = resultado.filter(juego => 
        juego.categoria.toLowerCase() === categoriaFiltro.toLowerCase()
      );
    }

    // Ordenar
    resultado.sort((a, b) => {
      switch (ordenamiento) {
        case 'precio-asc':
          return a.precio - b.precio;
        case 'precio-desc':
          return b.precio - a.precio;
        case 'rating':
          return b.rating - a.rating;
        case 'nombre':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return resultado;
  }, [busqueda, categoriaFiltro, ordenamiento]);

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    const cats = Array.from(new Set(juegos.map(juego => juego.categoria)));
    return ['todas', ...cats];
  }, []);

  // Calcular totales del carrito
  const totalCarrito = useMemo(() => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }, [carrito]);

  const totalItems = useMemo(() => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }, [carrito]);

  return (
    <div className="pagina-principal">
      {/* Mensaje temporal */}
      {mensaje && (
        <div className={`mensaje-temporal ${mensaje.includes('error') ? 'error' : 'success'}`}>
          {mensaje}
        </div>
      )}

      <header>
        <h1>🎮 Catálogo de Juegos</h1>
        <nav className="navbar">
          <button>Explorar</button>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setMenuCategoriasVisible((v) => !v)}
              className="dropdown-btn"
            >
              Categorías
            </button>
            {menuCategoriasVisible && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#222',
                  border: '1px solid #444',
                  zIndex: 10,
                  minWidth: '180px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <button
                  style={{ width: '100%', color: '#fff', background: 'none', border: 'none', padding: '10px 16px', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => {
                    setMenuCategoriasVisible(false);
                    navigate('/listavalor');
                  }}
                >
                  Juegos mejor valorados
                </button>
                <button
                  style={{ width: '100%', color: '#fff', background: 'none', border: 'none', padding: '10px 16px', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => {
                    setMenuCategoriasVisible(false);
                    navigate('/listaventa');
                  }}
                >
                  Juegos más vendidos
                </button>
              </div>
            )}
          </div>
          <button onClick={() => navigate('/paginaprincipal')} className="active">Inicio</button>
          <button>Plataformas</button>
          <button>Ofertas Especiales</button>

          <div
            className="nav-icons"
            onClick={() => navigate('/adminjuegos')}
            title="Panel de Administración"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/adminjuegos')}
          >
            <span role="img" aria-label="usuario">👤</span>
          </div>
        </nav>

        {/* Barra de búsqueda y filtros mejorada */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="Buscar juegos por nombre, descripción o categoría..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={categoriaFiltro} 
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="filter-select"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? 'Todas las Categorías' : cat}
              </option>
            ))}
          </select>

          <select 
            value={ordenamiento} 
            onChange={(e) => setOrdenamiento(e.target.value)}
            className="sort-select"
          >
            <option value="nombre">Ordenar por Nombre</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificación</option>
          </select>
        </div>

        {/* Resultados de búsqueda */}
        {busqueda && (
          <div className="search-results">
            <h3>Resultados para "{busqueda}" ({juegosFiltrados.length} encontrados):</h3>
            {juegosFiltrados.length > 0 ? (
              <div className="results-grid">
                {juegosFiltrados.slice(0, 6).map(juego => (
                  <div key={juego.id} className="result-card">
                    <img src={juego.imagen} alt={juego.nombre} />
                    <div className="result-info">
                      <strong>{juego.nombre}</strong>
                      <p className="categoria">{juego.categoria}</p>
                      <p className="precio">
                        <span>${juego.precio.toFixed(2)}</span>
                      </p>
                      <button 
                        className="boton-detalles" 
                        onClick={() => abrirDetalle(juego)}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">No se encontraron juegos que coincidan con tu búsqueda.</p>
            )}
          </div>
        )}
      </header>

      {/* Carrusel mejorado */}
      <section className="carousel">
        <button 
          className="carousel-btn prev" 
          onClick={handlePrev}
          aria-label="Juego anterior"
        >
          ⬅
        </button>
        
        <div className="carousel-container">
          <div className="carousel-image">
            <img 
              src={juegos[index].imagen} 
              alt={juegos[index].nombre}
              loading="lazy"
            />
            <div className="carousel-overlay">
              <h3>{juegos[index].nombre}</h3>
              <p className="descripcion">{juegos[index].descripcion}</p>
              <div className="rating">
                {'⭐'.repeat(Math.floor(juegos[index].rating))} 
                <span>({juegos[index].rating})</span>
              </div>
              <p className="precio-carousel">
                <span>${juegos[index].precio.toFixed(2)}</span>
              </p>
              <div className="carousel-actions">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={cantidades[juegos[index].id] || 1}
                  onChange={(e) => handleCantidadChange(juegos[index].id, parseInt(e.target.value) || 1)}
                  className="cantidad-input"
                />
                <button 
                  onClick={() => agregarAlCarrito(juegos[index])}
                  className="boton-agregar"
                >
                  🛒 Agregar
                </button>
                <button 
                  onClick={() => abrirDetalle(juegos[index])}
                  className="boton-detalles"
                >
                  📋 Detalles
                </button>
              </div>
            </div>
          </div>
          
          {/* Indicadores del carrusel */}
          <div className="carousel-indicators">
            {juegos.map((_, i) => (
              <button
                key={i}
                className={`indicator ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir al juego ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        <button 
          className="carousel-btn next" 
          onClick={handleNext}
          aria-label="Siguiente juego"
        >
          ➡
        </button>
      </section>

      {/* Lista de juegos destacados */}
      <section className="featured">
        <h2>🔥 Juegos Destacados</h2>
        <div className="games-grid">
          {juegosFiltrados.map(juego => (
            <div key={juego.id} className="game-card">
              <div className="card-image">
                <img src={juego.imagen} alt={juego.nombre} loading="lazy" />
              </div>
              
              <div className="card-content">
                <h3>{juego.nombre}</h3>
                <p className="categoria">{juego.categoria}</p>
                <div className="rating">
                  {'⭐'.repeat(Math.floor(juego.rating))} 
                  <span>({juego.rating})</span>
                </div>
                <p className="precio">
                  <span>${juego.precio.toFixed(2)}</span>
                </p>
                
                <div className="card-actions">
                  <div className="cantidad-control">
                    <button 
                      onClick={() => handleCantidadChange(juego.id, (cantidades[juego.id] || 1) - 1)}
                      disabled={(cantidades[juego.id] || 1) <= 1}
                    >
                      -
                    </button>
                    <span>{cantidades[juego.id] || 1}</span>
                    <button 
                      onClick={() => handleCantidadChange(juego.id, (cantidades[juego.id] || 1) + 1)}
                      disabled={(cantidades[juego.id] || 1) >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => agregarAlCarrito(juego)}
                    className="boton-agregar"
                  >
                    🛒 Agregar
                  </button>
                  <button 
                    onClick={() => abrirDetalle(juego)}
                    className="boton-detalles"
                  >
                    📋 Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carrito de compras mejorado */}
      <section className="cart">
        <div className="cart-header">
          <h3>
            🛒 Carrito de Compras 
            <span className="cart-count">({totalItems})</span>
          </h3>
          <p className="cart-total">Total: ${totalCarrito.toFixed(2)}</p>
        </div>
        
        <div className="cart-items">
          {carrito.length === 0 ? (
            <div className="cart-empty">
              <p>🛒 Tu carrito está vacío</p>
              <p>¡Explora nuestro catálogo y encuentra juegos increíbles!</p>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imagen} alt={item.nombre} />
                <div className="item-details">
                  <h4>{item.nombre}</h4>
                  <p className="item-precio">${item.precio.toFixed(2)} c/u</p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => actualizarCantidadCarrito(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button 
                    onClick={() => actualizarCantidadCarrito(item.id, item.cantidad + 1)}
                    disabled={item.cantidad >= 10}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </div>
                <button 
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="boton-eliminar"
                  title="Eliminar del carrito"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        
        {carrito.length > 0 && (
          <div className="cart-actions">
            <button 
              onClick={abrirModalOrden}
              className="boton-confirmar"
              disabled={cargando}
            >
              ✔ Confirmar Orden ({totalItems} items)
            </button>
            <button 
              onClick={cancelarCarrito}
              className="boton-cancelar"
              disabled={cargando}
            >
              🗑️ Vaciar Carrito
            </button>
          </div>
        )}
      </section>

      {/* Modales */}
      <ConfirmarOrden 
        visible={modalVisible} 
        onClose={cerrarModalOrden}
        carrito={carrito}
        total={totalCarrito}
      />
      
      <Detalle 
        juego={detalleJuego} 
        visible={!!detalleJuego} 
        onClose={cerrarDetalle}
        onAgregarCarrito={agregarAlCarrito}
      />
    </div>
  );
};

export default PaginaPrincipal;