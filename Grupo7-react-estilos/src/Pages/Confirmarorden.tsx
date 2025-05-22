import React, { useState } from 'react';
import '../estilos/ConfirmarOrden.css';
import type { ItemCarrito } from './PaginaPrincipal'; // o desde donde definas ItemCarrito

interface ConfirmarOrdenProps {
  visible: boolean;
  onClose: () => void;
  carrito: ItemCarrito[];
  total: number;
}

const ConfirmarOrden: React.FC<ConfirmarOrdenProps> = ({ visible, onClose, carrito, total }) => {
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  if (!visible) return null;

  const handleProceed = () => {
    // Aquí podrías agregar validaciones o lógica para procesar la compra
    setPurchaseCompleted(true);
  };

  return (
    <div id="order-modal" className="modal">
      <div className="modal-content">
        <span id="close-modal" className="close" onClick={() => {
          setPurchaseCompleted(false);  // Resetear al cerrar
          onClose();
        }}>X</span>

        {!purchaseCompleted ? (
          <>
            <h2>Confirm Order</h2>

            <label htmlFor="full-name">Full Name:</label>
            <input type="text" id="full-name" />

            <label htmlFor="address">Address:</label>
            <input type="text" id="address" />

            <label htmlFor="card-number">Card Number:</label>
            <input type="text" id="card-number" />

            <label htmlFor="cvc">CVC:</label>
            <input type="text" id="cvc" />

            <label htmlFor="expiration-date">Expiration Date:</label>
            <input type="text" id="expiration-date" />

            <button id="proceed" onClick={handleProceed}>Proceed</button>
          </>
        ) : (
          <div className="purchase-success">
            <div className="checkmark">✔</div>
            <h2>Purchase successfully completed!</h2>
            <p>The keys for the purchased game(s) have been sent to the corresponding email address.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmarOrden;
