const Detalle = () => {
  return <div className="container">
      <h1 id="titulo-juego">Título</h1>

      <img
        id="imagen-juego"
        src=""
        alt="Portada del juego"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <p id="descripcion-juego">Descripción</p>

      <div className="video-container">
        <iframe
          id="trailer-juego"
          width="560"
          height="315"
          src=""
          title="Tráiler del juego"
          allowFullScreen
        ></iframe>
      </div>

      <div id="estrellas" className="estrellas"></div>

      <h2>Reseñas</h2>
      <ul id="resenas"></ul>
    </div>
  
}

export default Detalle;
