const Reseña = () => {
  const handleClose = () => {
    window.history.back();
  };

  return  <div className="modal">
      <span className="close" onClick={handleClose}>
        ✖
      </span>

      <h1 id="titulo">Nombre del Juego</h1>

      <div className="video-section">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/zw47_q9wbBE"
          title="Tráiler del juego"
          allowFullScreen
        ></iframe>
      </div>

      <div className="gallery">
        <img src="https://via.placeholder.com/100" alt="Gameplay 1" />
        <img src="https://via.placeholder.com/100" alt="Gameplay 2" />
        <img src="https://via.placeholder.com/100" alt="Gameplay 3" />
        <img src="https://via.placeholder.com/100" alt="Gameplay 4" />
      </div>

      <div className="review-box">
        <div className="user-section">
          <img src="https://via.placeholder.com/50" alt="Avatar" />
          <span id="username">Usuario123</span>
          <div id="rating" className="stars">
            ★★★★★
          </div>
        </div>

        <textarea
          id="texto-resena"
          placeholder="Escribe tu reseña aquí..."
        ></textarea>
        <button id="enviar-resena">Send Review</button>
      </div>

      <button className="play-btn">Play Now</button>
    </div>

};

export default Reseña;
