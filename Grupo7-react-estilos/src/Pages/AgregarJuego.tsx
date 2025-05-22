import { useState } from "react";

// Define la interfaz Game aquí (o impórtala desde un archivo común)
export interface Game {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date?: string;
  // Puedes agregar otros campos si lo necesitas
}

export interface AgregarJuegoProps {
  onClose: () => void;
  onAddGame: (game: Omit<Game, "date">) => void;
}

const AgregarJuego = ({ onAddGame, onClose }: AgregarJuegoProps) => {
  const [formData, setFormData] = useState<Omit<Game, "date">>({
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
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Game</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Nombre" required onChange={handleChange} />
          <textarea name="description" placeholder="Descripción" required onChange={handleChange} />
          <select name="category" required onChange={handleChange}>
            <option value="">Selecciona categoría</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Horror">Horror</option>
            <option value="Shooter">Shooter</option>
            <option value="Aventura">Aventura</option>
            <option value="Multijugador">Multijugador</option>
          </select>
          <input name="price" type="number" placeholder="Precio" required onChange={handleChange} />
          <input name="discount" type="number" placeholder="Descuento (%)" required onChange={handleChange} />
          <input name="photo" type="text" placeholder="URL de la imagen" required onChange={handleChange} />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarJuego;
