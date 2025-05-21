import './Detalle.css';
const Detalle = () => {
  return (
    <div className="container">
      <h1>Elden Ring</h1>

      <img
        src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_ef61b771ee6b269b1f0cb484233e07a0bfb5f81b.600x338.jpg?t=1744748041"
        alt="Portada de Elden Ring"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <p>Un RPG de acción y mundo abierto desarrollado por FromSoftware, con una historia envolvente creada por Hidetaka Miyazaki y George R.R. Martin.</p>

      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/E3Huy2cdih0"
          title="Tráiler de Elden Ring"
          allowFullScreen
        ></iframe>
      </div>

      <div className="estrellas">⭐⭐⭐⭐⭐</div>

      <h2>Reseñas</h2>
      <ul>
        <li>"Una obra maestra del género Souls-like."</li>
        <li>"Exploración, combate y narrativa en su máximo esplendor."</li>
        <li>"Impresionante mundo abierto con secretos en cada rincón."</li>
      </ul>
    </div>
  );
};

export default Detalle;
