 const ConfirmarOrden = () => {
  return <div id="order-modal" className="modal">
        <div className="modal-content">
        <span id="close-modal" className="close">X</span>
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

        <button id="proceed">Proceed</button>
        </div>
    </div>
  
 }
  export default ConfirmarOrden;