import { useState } from 'react';
import AgregarJuego from './AgregarJuego';
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
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estado para la lista de juegos
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

  // Función para abrir el modal
  const handleAbrirModal = () => {
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  // Función para agregar un nuevo juego
  const agregarJuego = (juego: Omit<Game, 'date'>) => {
    const nuevoJuego: Game = {
      ...juego,
      date: new Date().toISOString().split('T')[0], // fecha actual
    };
    setJuegos((prev) => [...prev, nuevoJuego]);
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
          <button onClick={handleAbrirModal}>+ Add</button>
          <button>Editar</button>
          <button>Eliminar</button>
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
                  <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FaTrash style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal para agregar juego */}
      {mostrarModal && (
        <AgregarJuego onClose={handleCerrarModal} onAddGame={agregarJuego} />
      )}
    </>
  );
};

export default AdminJuegos;
