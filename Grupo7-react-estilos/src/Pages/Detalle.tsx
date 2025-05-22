import React from 'react';
import './Detalle.css';

const Detalle = ({ juego, visible, onClose }: any) => {
  if (!visible || !juego) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="detalle-main">
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={juego.videoUrl}
              title={juego.nombre}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="detalle-info">
            <h2>{juego.nombre}</h2>
            <p>{juego.descripcion}</p>

            <div className="rating">
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(juego.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <div className="rating-number">{juego.rating.toFixed(1)}</div>
            </div>
          </div>
        </div>

        <div className="galeria">
          {juego.galeria.map((img: string, idx: number) => (
            <img
              key={idx}
              className="galeria-img"
              src={img}
              alt={`${juego.nombre} screenshot ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detalle;

