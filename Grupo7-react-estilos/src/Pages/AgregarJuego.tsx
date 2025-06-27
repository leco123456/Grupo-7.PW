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
  rating?: number;
  videoUrl?: string;
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
    rating: 4.0,
    videoUrl: "https://www.youtube.com/embed/defaultVideo"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" || name === "rating" ? Number(value) : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.category) {
      newErrors.category = "La categoría es requerida";
    }

    if (formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = "El descuento debe estar entre 0 y 100";
    }

    if (!formData.photo.trim()) {
      newErrors.photo = "La URL de la imagen es requerida";
    } else if (!isValidUrl(formData.photo)) {
      newErrors.photo = "Debe ser una URL válida";
    }

    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = "La calificación debe estar entre 0 y 5";
    }

    if (formData.videoUrl && !isValidYouTubeUrl(formData.videoUrl)) {
      newErrors.videoUrl = "Debe ser una URL válida de YouTube (formato embed)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com/embed/') || url.includes('youtu.be/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddGame(formData);
      onClose();
    }
  };

  return (
    <div className="modal" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      zIndex: 1000 
    }}>
      <div className="modal-content" style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        width: '90%', 
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
          ➕ Agregar Nuevo Juego
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nombre del Juego *
            </label>
            <input 
              name="name" 
              type="text" 
              placeholder="Ingrese el nombre del juego"
              value={formData.name}
              required 
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: errors.name ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            {errors.name && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.name}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Descripción *
            </label>
            <textarea 
              name="description" 
              placeholder="Ingrese la descripción del juego"
              value={formData.description}
              required 
              onChange={handleChange}
              rows={4}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: errors.description ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '5px',
                resize: 'vertical'
              }}
            />
            {errors.description && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.description}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Categoría *
            </label>
            <select 
              name="category" 
              value={formData.category}
              required 
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: errors.category ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '5px'
              }}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Acción">Acción</option>
              <option value="RPG">RPG</option>
              <option value="Horror">Horror</option>
              <option value="Shooter">Shooter</option>
              <option value="Aventura">Aventura</option>
              <option value="Multijugador">Multijugador</option>
              <option value="Cooperativo">Cooperativo</option>
              <option value="FPS">FPS</option>
              <option value="Estrategia">Estrategia</option>
              <option value="Simulación">Simulación</option>
            </select>
            {errors.category && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.category}</span>}
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Precio ($) *
              </label>
              <input 
                name="price" 
                type="number" 
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price}
                required 
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: errors.price ? '2px solid #dc3545' : '1px solid #ccc',
                  borderRadius: '5px'
                }}
              />
              {errors.price && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.price}</span>}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Descuento (%)
              </label>
              <input 
                name="discount" 
                type="number" 
                min="0"
                max="100"
                placeholder="0"
                value={formData.discount}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: errors.discount ? '2px solid #dc3545' : '1px solid #ccc',
                  borderRadius: '5px'
                }}
              />
              {errors.discount && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.discount}</span>}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Calificación (0-5)
            </label>
            <input 
              name="rating" 
              type="number" 
              step="0.1"
              min="0"
              max="5"
              placeholder="4.0"
              value={formData.rating}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: errors.rating ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            {errors.rating && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.rating}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              URL de la Imagen *
            </label>
            <input 
              name="photo" 
              type="url" 
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.photo}
              required 
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: errors.photo ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            {errors.photo && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.photo}</span>}
            {formData.photo && isValidUrl(formData.photo) && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={formData.photo} 
                  alt="Vista previa" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '100px', 
                    objectFit: 'cover',
                    borderRadius: '5px',
                    border: '1px solid #ddd'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              URL del Video (YouTube)
            </label>
            <input 
              name="videoUrl" 
              type="url" 
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              value={formData.videoUrl}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: errors.videoUrl ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
            {errors.videoUrl && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.videoUrl}</span>}
            <small style={{ color: '#666', fontSize: '12px' }}>
              Formato: https://www.youtube.com/embed/VIDEO_ID
            </small>
          </div>
          
          <div className="modal-buttons" style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
          }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ❌ Cancelar
            </button>
            <button 
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ✅ Agregar Juego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarJuego;