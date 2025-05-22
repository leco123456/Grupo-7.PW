import './ResetPass.css'

const ResetPass = () => {
  return (
    <div className="reset-pass-wrapper">
      <div className="containerreset">
        <div className="logo">Nivel 100</div>
        <h2 className="reset-title">Restablece tu contraseña</h2>
        <div className="form-box">
          <p>
          Ingrese la dirección de correo electrónico de su cuenta de usuario y le enviaremos un mensaje de confirmación de restablecimiento de contraseña.
          </p>

          <input type="email" placeholder="Ingrese su email" className="reset-input" />

          <label className="reset-label">Nueva contraseña:</label>
          <input type="password" placeholder="Nueva contraseña" className="reset-input" />

          <label className="reset-label">Confirmar contraseña:</label>
          <input type="password" placeholder="Confirmar contraseña" className="reset-input" />

          <button className="reset-btn">Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default ResetPass
