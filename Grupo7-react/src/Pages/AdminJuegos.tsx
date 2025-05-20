const AdminJuegos = () => {
  return <>
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
          <button>+ Add</button>
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
        <table>{/* Tabla de juegos */}</table>
      </main>

      
    </>
  
};

export default AdminJuegos;
