import { useState } from 'react';
import AgregarJuego from './AgregarJuego';
import EditarJuego from './EditarJuego';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminJuegos.css';

// Tipo para los juegos
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
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [juegos, setJuegos] = useState<Game[]>([
    {
      name: 'God of War',
      description: 'Epic action game',
      category: 'Action',
      price: 60,
      discount: 10,
      photo: 'https://example.com/godofwar.jpg',
      date: '2025-05-20',
    },
  ]);
  const [juegoEnEdicion, setJuegoEnEdicion] = useState<Game | null>(null);
  const [juegoIndexEnEdicion, setJuegoIndexEnEdicion] = useState<number | null>(null);

  // Función para agregar un nuevo juego
  const agregarJuego = (juego: Omit<Game, 'date'>) => {
    const nuevoJuego: Game = {
      ...juego,
      date: new Date().toISOString().split('T')[0],
    };
    setJuegos([...juegos, nuevoJuego]);
    setMostrarAgregarModal(false);
  };

  // Función para iniciar la edición
  const handleEditarClick = (juego: Game, index: number) => {
    setJuegoEnEdicion(juego);
    setJuegoIndexEnEdicion(index);
    setMostrarEditarModal(true);
  };

  // Guardar los cambios del juego editado
  const guardarJuegoEditado = (juegoEditado: Game) => {
    if (juegoIndexEnEdicion !== null) {
      const juegosActualizados = [...juegos];
      juegosActualizados[juegoIndexEnEdicion] = juegoEditado;
      setJuegos(juegosActualizados);
    }
    setMostrarEditarModal(false);
    setJuegoEnEdicion(null);
    setJuegoIndexEnEdicion(null);
  };

  return (
    <>
      <aside className="sidebar">
        <p>Jon Shmoe</p>
        <nav>
          <button>Users</button>
          <button className="active">Games</button>
          <button>News</button>
          <button>Statistics</button>
          <button>Log out</button>
        </nav>
      </aside>

      <main className="admin-panel">
        <h2>Games</h2>
        <div className="actions">
          <button onClick={() => setMostrarAgregarModal(true)}>+ Add</button>
        </div>

        <table className="game-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Name</th>
              <th>Base Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {juegos.map((juego, index) => (
              <tr key={index}>
                <td>{juego.date}</td>
                <td>{juego.category}</td>
                <td>{juego.name}</td>
                <td>${juego.price}</td>
                <td>{juego.discount}%</td>
                <td>
                  <FaEdit
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleEditarClick(juego, index)}
                  />
                  <FaTrash style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {mostrarAgregarModal && (
        <AgregarJuego
          onClose={() => setMostrarAgregarModal(false)}
          onAddGame={agregarJuego}
        />
      )}

      {mostrarEditarModal && juegoEnEdicion && (
        <EditarJuego
          juego={juegoEnEdicion}
          onClose={() => setMostrarEditarModal(false)}
          onSave={guardarJuegoEditado}
        />
      )}
    </>
  );
};

export default AdminJuegos;
