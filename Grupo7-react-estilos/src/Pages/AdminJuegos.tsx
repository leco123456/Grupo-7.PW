import { useState, useEffect } from 'react';
import AgregarJuego from './AgregarJuego';
import EditarJuego from './EditarJuego';
import EliminarJuego from './EliminarJuego';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminJuegos.css';

interface Game {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date: string;
}

const AdminJuegos = () => {
  const [juegos, setJuegos] = useState<Game[]>(() => {
    const juegosGuardados = localStorage.getItem('juegos');
    if (juegosGuardados) {
      try {
        const juegosParseados = JSON.parse(juegosGuardados);
        if (Array.isArray(juegosParseados)) {
          return juegosParseados;
        }
      } catch (e) {}
    }
    return [];
  });

  const [juegoEnEdicion, setJuegoEnEdicion] = useState<Game | null>(null);
  const [indexEnEdicion, setIndexEnEdicion] = useState<number | null>(null);
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

  // 💾 Guardar juegos cada vez que cambian
  useEffect(() => {
    localStorage.setItem('juegos', JSON.stringify(juegos));
  }, [juegos]);

  // ➕ Agregar juego nuevo
  const agregarJuego = (nuevoJuego: Omit<Game, 'date'>) => {
    const juegoConFecha: Game = {
      ...nuevoJuego,
      date: new Date().toISOString().split('T')[0],
    };
    setJuegos([...juegos, juegoConFecha]);
    setMostrarAgregar(false);
  };

  // ✏️ Preparar edición
  const handleEditar = (juego: Game, index: number) => {
    setJuegoEnEdicion(juego);
    setIndexEnEdicion(index);
    setMostrarEditar(true);
  };

  // 💾 Guardar cambios de edición
  const guardarEdicion = (juegoEditado: Game) => {
    if (indexEnEdicion !== null) {
      const copia = [...juegos];
      copia[indexEnEdicion] = juegoEditado;
      setJuegos(copia);
    }
    setMostrarEditar(false);
    setJuegoEnEdicion(null);
    setIndexEnEdicion(null);
  };

  // 🗑️ Confirmar eliminación
  const handleEliminar = (juego: Game) => {
    setJuegoAEliminar(juego);
    setMostrarEliminar(true);
  };

  const eliminarJuego = () => {
    if (juegoAEliminar) {
      const actualizados = juegos.filter(j => j.date !== juegoAEliminar.date);
      setJuegos(actualizados);
    }
    setMostrarEliminar(false);
    setJuegoAEliminar(null);
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegos.map((juego, index) => (
                <tr key={index}>
                  <td>{juego.date}</td>
                  <td>{juego.category}</td>
                  <td>{juego.name}</td>
                  <td>${juego.price.toFixed(2)}</td>
                  <td>{juego.discount}%</td>
                  <td>
                    <FaEdit
                      className="icon edit"
                      onClick={() => handleEditar(juego, index)}
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleEliminar(juego)}
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
