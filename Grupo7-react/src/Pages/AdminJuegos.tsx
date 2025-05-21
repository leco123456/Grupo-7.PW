const AdminJuegos = () => {
  const closeModal = () => {
    console.log("Cerrar modal de eliminación");
  };

  const confirmDelete = () => {
    console.log("Confirmar eliminación");
  };

  const closeForm = () => {
    console.log("Cerrar formulario");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviar datos del juego");
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
          <button id="filterBtn">Filter</button>
          <button id="addBtn">+ Add</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Category</th>
              <th>Name</th>
              <th>Base price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="gameTableBody">
            {/* Aquí puedes mapear dinámicamente juegos */}
          </tbody>
        </table>
      </main>

      {/* Modal para confirmar eliminación */}
      <div className="modal" id="deleteModal">
        <div className="modal-content">
          <h3>Delete game</h3>
          <p>Are you sure that you want to delete this register?</p>
          <div className="modal-buttons">
            <button onClick={closeModal}>Cancelar</button>
            <button onClick={confirmDelete}>Submit</button>
          </div>
        </div>
      </div>

      {/* Modal de Agregar/Editar */}
      <div className="modal" id="gameFormModal">
        <div className="modal-content">
          <h3 id="form-title">Add game</h3>
          <form id="gameForm" onSubmit={handleSubmit}>
            <input type="text" id="gameName" placeholder="Name" required />
            <textarea id="gameDesc" placeholder="Description"></textarea>
            <select id="gameCategory" required>
              <option value="">Select category</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Horror">Horror</option>
              <option value="Shooter">Shooter</option>
            </select>
            <input type="number" id="gamePrice" placeholder="Price" required />
            <input type="number" id="gameDiscount" placeholder="Discount (%)" required />
            <input type="text" id="gamePhoto" placeholder="Photo URL" required />
            <div className="modal-buttons">
              <button type="button" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminJuegos;
