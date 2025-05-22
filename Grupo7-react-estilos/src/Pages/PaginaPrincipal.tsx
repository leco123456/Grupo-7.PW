import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmarOrden from './Confirmarorden';
import Detalle from './Detalle';
import { useGameState } from './gameStateManager';
import '../estilos/PaginaPrincipal.css';

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
  
  // Usar el hook de gestión de estado centralizado
  const { getGamesForMainPage } = useGameState();
  
  // Estados principales
  const [juegos, setJuegos] = useState<Juego[]>([]);
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

  // 🔄 Cargar juegos del estado centralizado
  useEffect(() => {
    const loadGames = () => {
      const gamesFromState = getGamesForMainPage();
      setJuegos(gamesFromState);
      
      // Ajustar el índice del carrusel si es necesario
      if (gamesFromState.length > 0 && index >= gamesFromState.length) {
        setIndex(0);
      }
    };
    
    loadGames();
    
    // Escuchar cambios en el localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'juegos_unificados') {
        loadGames();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // También revisar cambios internos periódicamente
    const interval = setInterval(loadGames, 2000); // Revisar cada 2 segundos
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [getGamesForMainPage, index]);

  // Auto-avance del carrusel (solo si hay juegos)
  useEffect(() => {
    if (juegos.length === 0) return;
    
    const intervalo = setInterval(() => {
      setIndex(prevIndex => (prevIndex === juegos.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalo);
  }, [juegos.length]);

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
    if (juegos.length === 0) return;
    setIndex(prevIndex => (prevIndex === 0 ? juegos.length - 1 : prevIndex - 1));
  }, [juegos.length]);

  const handleNext = useCallback(() => {
    if (juegos.length === 0) return;
    setIndex(prevIndex => (prevIndex === juegos.length - 1 ? 0 : prevIndex + 1));
  }, [juegos.length]);

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
  }, [busqueda, categoriaFiltro, ordenamiento, juegos]);

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    const cats = Array.from(new Set(juegos.map(juego => juego.categoria)));
    return ['todas', ...cats];
  }, [juegos]);

  // Calcular totales del carrito
  const totalCarrito = useMemo(() => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }, [carrito]);

  const totalItems = useMemo(() => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }, [carrito]);

  // Sincronizar juegos manualmente
  const sincronizarJuegos = () => {
    const gamesFromState = getGamesForMainPage();
    setJuegos(gamesFromState);
    mostrarMensaje('Catálogo sincronizado correctamente', 'success');
  };

  return (
    <div className="pagina-principal">
      {/* Mensaje temporal */}
      {mensaje && (
        <div className={`mensaje-temporal ${mensaje.includes('error') ? 'error' : 'success'}`}>
          {mensaje}
        </div>
      )}

      <header>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <h1>🎮 Catálogo de Juegos</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              📊 {juegos.length} juegos disponibles
            </span>
            <button 
              onClick={sincronizarJuegos}
              style={{
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              title="Sincronizar catálogo"
            >
              🔄 Sync
            </button>
          </div>
        </div>
        
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
      {juegos.length > 0 && (
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
                src={juegos[index]?.imagen || ''} 
                alt={juegos[index]?.nombre || ''}
                loading="lazy"
              />
              <div className="carousel-overlay">
                <h3>{juegos[index]?.nombre}</h3>
                <p className="descripcion">{juegos[index]?.descripcion}</p>
                <div className="rating">
                  {'⭐'.repeat(Math.floor(juegos[index]?.rating || 0))} 
                  <span>({juegos[index]?.rating})</span>
                </div>
                <p className="precio-carousel">
                  <span>${juegos[index]?.precio.toFixed(2)}</span>
                </p>
                <div className="carousel-actions">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={cantidades[juegos[index]?.id] || 1}
                    onChange={(e) => handleCantidadChange(juegos[index]?.id, parseInt(e.target.value) || 1)}
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
      )}

      {/* Mensaje cuando no hay juegos */}
      {juegos.length === 0 && (
        <section style={{ 
          textAlign: 'center', 
          padding: '50px', 
          background: '#f8f9fa', 
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <h3>📦 No hay juegos disponibles</h3>
          <p>El catálogo está vacío. Los administradores pueden agregar juegos desde el panel de administración.</p>
          <button 
            onClick={sincronizarJuegos}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            🔄 Intentar sincronizar
          </button>
        </section>
      )}

      {/* Lista de juegos destacados */}
      {juegos.length > 0 && (
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
      )}

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