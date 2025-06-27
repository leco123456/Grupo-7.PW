const EditarNoticia = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Editar Noticia</h3>
          <form>
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Switch 2 revelada"
              
            />
  
            
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Nintendo acaba de revelar la nueva consola Switch 2"
              rows={4}
             
            />
  
            <label htmlFor="foto">URL de la foto:</label>
            <input
              id="foto"
              name="foto"
              type="text"
              placeholder="https://cdn.atomix.vg/wp-content/uploads/2020/01/ps-logo.jpg"
      
            />
  
            <div className="modal-buttons">
              <button type="button" disabled>
                Cancelar
              </button>
              <button type="button" disabled>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditarNoticia;