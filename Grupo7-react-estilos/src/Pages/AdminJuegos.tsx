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
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [mostrarEliminarModal, setMostrarEliminarModal] = useState(false); 
  const [juegos, setJuegos] = useState<Game[]>([]); // Empezamos con un array vacío
  const [juegoEnEdicion, setJuegoEnEdicion] = useState<Game | null>(null);
  const [juegoIndexEnEdicion, setJuegoIndexEnEdicion] = useState<number | null>(null);
  const [juegoAEliminar, setJuegoAEliminar] = useState<Game | null>(null); 

  // Cargar juegos desde localStorage al montar el componente
  useEffect(() => {
    const juegosGuardados = localStorage.getItem('juegos');
    if (juegosGuardados) {
      setJuegos(JSON.parse(juegosGuardados));  // Si hay juegos guardados, los cargamos
    }
  }, []);

  // Guardar juegos en localStorage cuando se actualicen
  useEffect(() => {
    if (juegos.length > 0) {
      localStorage.setItem('juegos', JSON.stringify(juegos));  // Guardamos los juegos cada vez que se actualizan
    }
  }, [juegos]);

  const agregarJuego = (juego: Omit<Game, 'date'>) => {
    const nuevoJuego: Game = {
      ...juego,
      date: new Date().toISOString().split('T')[0],  // Asignamos la fecha actual
    };
    setJuegos([...juegos, nuevoJuego]);  // Agregamos el nuevo juego a la lista
    setMostrarAgregarModal(false);  // Cerramos el modal
  };

  const handleEditarClick = (juego: Game, index: number) => {
    setJuegoEnEdicion(juego);
    setJuegoIndexEnEdicion(index);
    setMostrarEditarModal(true);
  };

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

  const handleEliminarClick = (juego: Game) => {
    setJuegoAEliminar(juego);
    setMostrarEliminarModal(true); 
  };

  const eliminarJuego = () => {
    if (juegoAEliminar) {
      setJuegos(juegos.filter((juego) => juego.name !== juegoAEliminar.name)); 
      setMostrarEliminarModal(false);
      setJuegoAEliminar(null); 
    }
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
                  <FaTrash
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEliminarClick(juego)}
                  />
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

      {mostrarEliminarModal && juegoAEliminar && (
        <EliminarJuego
          juego={juegoAEliminar.name}
          onClose={() => setMostrarEliminarModal(false)}
          onConfirm={eliminarJuego}
        />
      )}
    </>
  );
};

export default AdminJuegos;
