import '../estilos/ListaValor.css';
const ListaValor = () => {
    return <div>
  <h1>Juegos Más Valorados</h1>
  <ul className="juego-lista">
    <li>
        <span className="ranking">1</span>
        <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595"/>
        Counter-Strike 2
    </li>
    <li>
        <span className="ranking">2</span>
        <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3017860/header.jpg?t=1747409289"/>
        DOOM: The Dark Ages
    </li>
    <li>
        <span className="ranking">3</span>
        <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header.jpg?t=1746519355"/>
        Cyberpunk 2077
    </li>
    <li>
        <span className="ranking">4</span>
        <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3489700/header.jpg?t=1747321345"/>
        Stellar Blade
    </li>
    <li>
        <span className="ranking">5</span>
        <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header.jpg?t=1746546713"/>
        Clair Obscur: Expedition 33
    </li>
  </ul>
</div>
}

export default ListaValor