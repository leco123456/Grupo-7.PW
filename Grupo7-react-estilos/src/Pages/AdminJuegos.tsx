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

const juegosIniciales: Game[] = [
  {
    name: "Sven Co-op",
    description: "Sven Co-op es un mod cooperativo para Half-Life que te permite jugar en equipo con amigos.",
    category: "Cooperativo",
    price: 9.99,
    discount: 0,
    photo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225840/header.jpg?t=1735034103",
    date: "2023-01-01"
  },
  {
    name: "God of War",
    description: "Una épica aventura de Kratos y Atreus en la mitología nórdica.",
    category: "Aventura",
    price: 59.99,
    discount: 0,
    photo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1729030762",
    date: "2023-01-02"
  },
  {
    name: "Counter Strike 2",
    description: "Durante las dos últimas décadas, Counter‑Strike ha proporcionado una experiencia competitiva de primer nivel...",
    category: "FPS",
    price: 19.99,
    discount: 0,
    photo: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595",
    date: "2023-01-03"
  },
  {
    name: "Red Dead Redemption 2",
    description: "Una historia épica del salvaje oeste con Arthur Morgan y la banda de Dutch van der Linde.",
    category: "Aventura",
    price: 69.99,
    discount: 0,
    photo: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643",
    date: "2023-01-04"
  },
  {
    name: "Gang Beasts",
    description: "Gang Beasts es un desternillante juego multijugador de peleas absurdas entre personajes gelatinosos y gruñones.",
    category: "Multijugador",
    price: 14.99,
    discount: 0,
    photo: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/285900/header.jpg?t=1732109683",
    date: "2023-01-05"
  }
  // ...agrega más si tienes
];

const AdminJuegos = () => {
  const [juegos, setJuegos] = useState<Game[]>(() => {
    const juegosGuardados = localStorage.getItem('juegos');
    if (juegosGuardados) {
      try {
        const juegosParseados = JSON.parse(juegosGuardados);
        // Si está vacío, vuelve a cargar los juegos iniciales
        if (Array.isArray(juegosParseados) && juegosParseados.length > 0) {
          return juegosParseados;
        }
      } catch (e) {}
    }
    // Si no hay juegos o están vacíos, inicializa con los juegos por defecto
    localStorage.setItem('juegos', JSON.stringify(juegosIniciales));
    return juegosIniciales;
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
