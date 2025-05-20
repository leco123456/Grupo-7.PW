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