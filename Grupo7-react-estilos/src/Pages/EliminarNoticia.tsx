import React from 'react';

interface EliminarNoticiaProps {
  noticiaTitulo: string;  
  onClose: () => void;    
  onConfirm: () => void;  
}

const EliminarNoticia = ({ noticiaTitulo, onClose, onConfirm }: EliminarNoticiaProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Eliminar Noticia</h3>
        <p>¿Estás seguro de que quieres eliminar "Switch 2 revelada"?</p>
        <div className="modal-buttons">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="button" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default EliminarNoticia;