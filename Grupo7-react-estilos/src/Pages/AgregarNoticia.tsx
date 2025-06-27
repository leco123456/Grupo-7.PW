import { useState } from "react";

interface Noticia {
  nombre: string;
  descripcion: string;
  foto: string;
}

interface AgregarNoticiaProps {
  onAddNoticia: (noticia: Noticia) => void;
  onClose: () => void;
}

const AgregarNoticia = ({ onAddNoticia, onClose }: AgregarNoticiaProps) => {
  const [formData, setFormData] = useState<Noticia>({
    nombre: "",
    descripcion: "",
    foto: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNoticia(formData); // pasa la noticia creada al padre
    onClose(); // cierra el modal o formulario
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Agregar Noticia</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            required
            onChange={handleChange}
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            required
            onChange={handleChange}
          />
          <input
            name="foto"
            type="text"
            placeholder="URL de la foto"
            required
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarNoticia;