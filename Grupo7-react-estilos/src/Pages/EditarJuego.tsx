import { useState, useEffect } from 'react';

// Define la interfaz aquí o impórtala desde un archivo común
export interface Game {
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  photo: string;
  date: string;
  // Agrega otros campos si los necesitas (rating, videoUrl, etc.)
}

export interface EditarJuegoProps {
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

  // Mapea los nombres de los campos del formulario a los de la interfaz Juego
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
        <h3>Editar Juego</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Descripción"
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
            <option value="">Selecciona categoría</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Horror">Horror</option>
            <option value="Shooter">Shooter</option>
            <option value="Aventura">Aventura</option>
            <option value="Multijugador">Multijugador</option>
          </select>
          <input
            name="price"
            type="number"
            placeholder="Precio"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <input
            name="discount"
            type="number"
            placeholder="Descuento (%)"
            required
            value={formData.discount}
            onChange={handleChange}
          />
          <input
            name="photo"
            type="text"
            placeholder="URL de la imagen"
            required
            value={formData.photo}
            onChange={handleChange}
          />
          {/* Si tienes campos extra como videoUrl o rating, agrégalos aquí */}
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarJuego;
