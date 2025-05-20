const EditarJuego = () => {
  return <div className="modal">
      <div className="modal-content">
        <h3>Edit Game</h3>
        <form>
          <input type="text" placeholder="Name" required />
          <textarea placeholder="Description" required />
          <select required>
            <option value="">Select category</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Horror">Horror</option>
            <option value="Shooter">Shooter</option>
          </select>
          <input type="number" placeholder="Price" required />
          <input type="number" placeholder="Discount (%)" required />
          <input type="text" placeholder="Photo URL" required />
          <div className="modal-buttons">
            <button type="button">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  
};

export default EditarJuego;
