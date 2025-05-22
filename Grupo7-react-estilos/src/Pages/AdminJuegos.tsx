import { useState, useEffect } from 'react';
import AgregarJuego from './AgregarJuego';
import EditarJuego from './EditarJuego';
import EliminarJuego from './EliminarJuego';
import { FaEdit, FaTrash, FaSync } from 'react-icons/fa';
import { useGameState } from './gameStateManager';
import '../estilos/AdminJuegos.css';

// INTERFAZ ACTUALIZADA - Ahora incluye videoUrl
interface Game {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date: string;
  rating?: number;      // Agregado
  videoUrl?: string;    // AGREGADO - ESTO ES LO QUE FALTABA
}

const AdminJuegos = () => {
  const { 
    getGamesForAdmin, 
    addGameFromAdmin, 
    updateGameFromAdmin, 
    deleteGameFromAdmin,
    resetToInitialGames 
  } = useGameState();
  
  const [juegos, setJuegos] = useState<Game[]>([]);
  const [juegoEnEdicion, setJuegoEnEdicion] = useState<Game | null>(null);
  const [juegoOriginalDate, setJuegoOriginalDate] = useState<string | null>(null);
  const [juegoAEliminar, setJuegoAEliminar] = useState<Game | null>(null);

  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  // 🔐 Verificar si el usuario es admin
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      alert('Acceso denegado. Solo para administradores.');
      window.location.href = '/';
    }
  }, []);

  // 🔄 Cargar juegos del estado centralizado
  useEffect(() => {
    const loadGames = () => {
      const gamesFromState = getGamesForAdmin();
      setJuegos(gamesFromState);
    };
    
    loadGames();
    
    // Configurar un listener para cambios en el localStorage
    const handleStorageChange = () => {
      loadGames();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar cambios internos (cuando se modifica desde este mismo componente)
    const interval = setInterval(loadGames, 1000); // Revisar cada segundo
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [getGamesForAdmin]);

  // ➕ Agregar juego nuevo
  const agregarJuego = (nuevoJuego: Omit<Game, 'date'>) => {
    console.log('🎮 Agregando juego con videoUrl:', nuevoJuego.videoUrl); // Debug
    addGameFromAdmin(nuevoJuego);
    setMostrarAgregar(false);
    
    // Recargar la lista después de agregar
    setTimeout(() => {
      const gamesFromState = getGamesForAdmin();
      setJuegos(gamesFromState);
    }, 100);
  };

  // ✏️ Preparar edición
  const handleEditar = (juego: Game) => {
    console.log('✏️ Editando juego con videoUrl:', juego.videoUrl); // Debug
    setJuegoEnEdicion(juego);
    setJuegoOriginalDate(juego.date); // Guardamos la fecha original como identificador
    setMostrarEditar(true);
  };

  // 💾 Guardar cambios de edición
  const guardarEdicion = (juegoEditado: Game) => {
    console.log('💾 Guardando juego editado con videoUrl:', juegoEditado.videoUrl); // Debug
    if (juegoOriginalDate) {
      updateGameFromAdmin(juegoOriginalDate, juegoEditado);
    }
    setMostrarEditar(false);
    setJuegoEnEdicion(null);
    setJuegoOriginalDate(null);
    
    // Recargar la lista después de editar
    setTimeout(() => {
      const gamesFromState = getGamesForAdmin();
      setJuegos(gamesFromState);
    }, 100);
  };

  // 🗑️ Confirmar eliminación
  const handleEliminar = (juego: Game) => {
    setJuegoAEliminar(juego);
    setMostrarEliminar(true);
  };

  const eliminarJuego = () => {
    if (juegoAEliminar) {
      deleteGameFromAdmin(juegoAEliminar.date);
    }
    setMostrarEliminar(false);
    setJuegoAEliminar(null);
    
    // Recargar la lista después de eliminar
    setTimeout(() => {
      const gamesFromState = getGamesForAdmin();
      setJuegos(gamesFromState);
    }, 100);
  };

  // 🔄 Sincronizar manualmente
  const sincronizarJuegos = () => {
    const gamesFromState = getGamesForAdmin();
    setJuegos(gamesFromState);
    alert('Juegos sincronizados correctamente');
  };

  // 🔄 Resetear juegos a valores iniciales
  const resetearJuegos = () => {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas resetear todos los juegos a los valores iniciales? Esta acción no se puede deshacer.'
    );
    
    if (confirmacion) {
      resetToInitialGames();
      setTimeout(() => {
        const gamesFromState = getGamesForAdmin();
        setJuegos(gamesFromState);
      }, 100);
      alert('Juegos reseteados correctamente');
    }
  };

  // 🚪 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    alert('Sesión cerrada.');
    window.location.href = '/';
  };

  return (
    <>
      <aside className="sidebar">
        <p>Admin Panel</p>
        <nav>
          <button>Users</button>
          <button className="active">Games</button>
          <button>News</button>
          <button>Statistics</button>
          <button onClick={handleLogout}>Log out</button>
        </nav>
      </aside>

      <main className="admin-panel">
        <h2>Gestión de Juegos</h2>

        <div className="actions">
          <button onClick={() => setMostrarAgregar(true)}>+ Agregar Juego</button>
          <button onClick={sincronizarJuegos} title="Sincronizar juegos">
            <FaSync /> Sincronizar
          </button>
          <button 
            onClick={resetearJuegos} 
            title="Resetear a juegos iniciales"
            style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}
          >
            🔄 Resetear
          </button>
        </div>

        <div className="info-panel" style={{
          background: '#f8f9fa',
          padding: '10px',
          borderRadius: '5px',
          margin: '10px 0',
          border: '1px solid #dee2e6'
        }}>
          <p><strong>ℹ️ Estado de Sincronización:</strong></p>
          <p>• Total de juegos: <strong>{juegos.length}</strong></p>
          <p>• Los cambios aquí se reflejan automáticamente en la página principal</p>
          <p>• Si no ves los cambios, haz clic en "Sincronizar"</p>
          <p>• <strong>Nuevos campos soportados:</strong> Rating y VideoUrl</p>
        </div>

        {juegos.length === 0 ? (
          <p className="info">No hay juegos registrados.</p>
        ) : (
          <table className="game-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Rating</th>
                <th>Video</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegos.map((juego, index) => (
                <tr key={`${juego.date}-${index}`}>
                  <td>{juego.date}</td>
                  <td>{juego.category}</td>
                  <td>{juego.name}</td>
                  <td>${juego.price.toFixed(2)}</td>
                  <td>{juego.discount}%</td>
                  <td>{juego.rating ? `⭐ ${juego.rating}` : 'N/A'}</td>
                  <td>
                    {juego.videoUrl ? 
                      <span style={{ color: 'green', fontSize: '12px' }}>✅ Sí</span> : 
                      <span style={{ color: 'red', fontSize: '12px' }}>❌ No</span>
                    }
                  </td>
                  <td>
                    <FaEdit
                      className="icon edit"
                      onClick={() => handleEditar(juego)}
                      title="Editar juego"
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleEliminar(juego)}
                      title="Eliminar juego"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* MODALES */}
      {mostrarAgregar && (
        <AgregarJuego
          onClose={() => setMostrarAgregar(false)}
          onAddGame={agregarJuego}
        />
      )}
      {mostrarEditar && juegoEnEdicion && (
        <EditarJuego
          juego={juegoEnEdicion}
          onClose={() => setMostrarEditar(false)}
          onSave={guardarEdicion}
        />
      )}
      {mostrarEliminar && juegoAEliminar && (
        <EliminarJuego
          juego={juegoAEliminar.name}
          onClose={() => setMostrarEliminar(false)}
          onConfirm={eliminarJuego}
        />
      )}
    </>
  );
};

export default AdminJuegos;