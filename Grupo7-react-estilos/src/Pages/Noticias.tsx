const Noticias = () => {
    return<main className="content">
    <div className="header">
      <h2>Noticias</h2>
      <button id="addBtn">+ Agregar</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="ListaNoticias">
        <tr>
          <td>1</td>
          <td>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Nintendo_Switch_2_logo.svg/250px-Nintendo_Switch_2_logo.svg.png"
              alt="Switch 2"
            />
          </td>
          <td>Switch 2 revelada</td>
          <td>Nintendo acaba de revelar la nueva consola Switch 2..</td>
          <td className="actions">
            <button className="editBtn">Editar</button>
            <button className="elimBtn">Eliminar</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <img
              src="https://cdn.atomix.vg/wp-content/uploads/2020/01/ps-logo.jpg"
              alt="PS5"
            />
          </td>
          <td>La PS5 baja en ventas</td>
          <td>Sony ha reportado que este mes las ventas de las PS5 han bajado..</td>
          <td className="actions">
            <button className="editBtn">Editar</button>
            <button className="elimBtn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
}

export default Noticias