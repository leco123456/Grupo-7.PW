const PaginaPrincipal = () => {
  return <div>
      <h1>Catálogo de Juegos </h1>
      <nav className="navbar">
    <button>Explore</button>
    <button>Categories</button>
    <button>Home</button>
    <button>Platform</button>
    <button>Special Offers</button>
    <div className="nav-icons">
      <span>👤</span>
      <input type="text" placeholder="Search..." />
    </div>y
  </nav>

  <section className="carousel">
    <button className="carousel-btn">⬅</button>
    <div className="carousel-image">
      <p>Video Game Carousel</p>
      <button>Details</button>
    </div>
    <button className="carousel-btn">➡</button>
  </section>

  <section className="featured">
    <h2>Featured Games</h2>
    <div className="games-list" id="catalogo">
      <div className="game-card">
  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/225840/header.jpg?t=1735034103" alt="Sven Co-op" />
  <h3>Sven Co-op</h3>
  <button>Agregar</button>
  <button>Detalles</button>
</div>

<div className="game-card">
  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1729030762" alt="God of War" />
  <h3>God of War</h3>
  <button>Agregar</button>
  <button>Detalles</button>
</div>

<div className="game-card">
  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/b7e2d0c4b5f34b6751269c359070f706ff6d59fe/header.jpg?t=1746554828" alt="Apex Legends™" />
  <h3>Apex Legends™</h3>
  <button>Agregar</button>
  <button>Detalles</button>
</div>

<div className="game-card">
  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1744748041" alt="Elden Ring" />
  <h3>Elden Ring</h3>
  <button>Agregar</button>
  <button>Detalles</button>
</div>

<div className="game-card">
  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/15bae4d173dc131df80b8e853fb5dc4c765872d6/header.jpg?t=1747650710" alt="Marvel Rivals" />
  <h3>Marvel Rivals</h3>
  <button>Agregar</button>
  <button>Detalles</button>
</div>

    </div>
  </section>

  <section className="cart">
    <h3>🛒 Shopping Cart (<span id="carrito-contador">0</span>)</h3>
    <div id="cart-items"></div>
    <div className="cart-actions">
      <button id="confirmar">✔ Confirm Order</button>
      <button id="cancelar">✖ Cancel Order</button>
    </div>
  </section>
 


  
    </div>

  
}

export default PaginaPrincipal;