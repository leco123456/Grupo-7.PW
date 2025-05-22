import React from 'react';
import '../estilos/Detalle.css';

const Detalle = ({ juego, visible, onClose }: any) => {
  if (!visible || !juego) return null;

  // Función para transformar URLs de YouTube a formato embed
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      // YouTube corto
      if (parsed.hostname === "youtu.be") {
        const videoId = parsed.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // YouTube largo
      if (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com") {
        const params = parsed.searchParams;
        if (parsed.pathname === "/watch" && params.get("v")) {
          return `https://www.youtube.com/embed/${params.get("v")}`;
        }
        if (parsed.pathname.startsWith("/embed/")) {
          return url; // Ya está en formato embed
        }
      }
      return url; // Para otros servicios
    } catch {
      return url;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="detalle-main">
          <div className="video-container">
            {juego.videoUrl ? (
              <iframe
                width="560"
                height="315"
                src={getEmbedUrl(juego.videoUrl)}
                title={juego.nombre}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ width: '560px', height: '315px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>No hay video disponible</p>
              </div>
            )}
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

