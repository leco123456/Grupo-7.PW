import { useState } from 'react';
import AgregarJuego from './AgregarJuego';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminJuegos.css';

const AdminJuegos = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleAbrirModal = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
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
            <tr>
              <td>2025-05-20</td>
              <td>Action</td>
              <td>God of War</td>
              <td>$60</td>
              <td>10%</td>
              <td>
                <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FaTrash style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      {/* Mostrar modal */}
      {mostrarModal && <AgregarJuego onClose={handleCerrarModal} />}
    </>
  );
};

export default AdminJuegos;
