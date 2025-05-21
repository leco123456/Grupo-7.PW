import { useState, useEffect } from 'react';

interface Game {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date: string;
}

interface EditarJuegoProps {
  juego: Game;
  onClose: () => void;
  onSave: (juegoEditado: Game) => void;
}

const EditarJuego = ({ juego, onClose, onSave }: EditarJuegoProps) => {
  const [formData, setFormData] = useState<Game>(juego);

  // Sincroniza si se actualiza el juego (por seguridad)
  useEffect(() => {
    setFormData(juego);
  }, [juego]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'discount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Enviamos el juego editado al padre
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Game</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Horror">Horror</option>
            <option value="Shooter">Shooter</option>
          </select>
          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <input
            name="discount"
            type="number"
            placeholder="Discount (%)"
            required
            value={formData.discount}
            onChange={handleChange}
          />
          <input
            name="photo"
            type="text"
            placeholder="Photo URL"
            required
            value={formData.photo}
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarJuego;
