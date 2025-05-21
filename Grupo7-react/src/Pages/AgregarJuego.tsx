import { useState } from "react";

interface Game {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
}

interface AgregarJuegoProps {
  onAddGame: (game: Game) => void;
  onClose: () => void;
}

const AgregarJuego = ({ onAddGame, onClose }: AgregarJuegoProps) => {
  const [formData, setFormData] = useState<Game>({
    name: "",
    description: "",
    category: "",
    price: 0,
    discount: 0,
    photo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGame(formData);
    onClose(); // cierra el modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Game</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" required onChange={handleChange} />
          <textarea name="description" placeholder="Description" required onChange={handleChange} />
          <select name="category" required onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Horror">Horror</option>
            <option value="Shooter">Shooter</option>
          </select>
          <input name="price" type="number" placeholder="Price" required onChange={handleChange} />
          <input name="discount" type="number" placeholder="Discount (%)" required onChange={handleChange} />
          <input name="photo" type="text" placeholder="Photo URL" required onChange={handleChange} />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarJuego;
