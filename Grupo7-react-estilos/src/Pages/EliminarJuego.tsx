import React from 'react';

interface EliminarJuegoProps {
  juego: string;  // Recibimos el nombre del juego para mostrarlo
  onClose: () => void;  // Para cerrar el modal
  onConfirm: () => void;  // Para confirmar la eliminación
}

const EliminarJuego = ({ juego, onClose, onConfirm }: EliminarJuegoProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Delete Game</h3>
        <p>Are you sure you want to delete "{juego}"?</p>
        <div className="modal-buttons">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="button" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default EliminarJuego;
