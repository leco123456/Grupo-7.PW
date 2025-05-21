import './ResetPass.css'

const ResetPass = () => {
  return (
    <div className="reset-pass-wrapper">
      <div className="containerreset">
        <div className="logo">Logo</div>
        <h2 className="reset-title">Reset your Password</h2>
        <div className="form-box">
          <p>
            Enter your user account’s verified email address and we will send you a password reset confirmation message.
          </p>

          <input type="email" placeholder="Enter your email" className="reset-input" />

          <label className="reset-label">New password:</label>
          <input type="password" placeholder="New password" className="reset-input" />

          <label className="reset-label">Confirm new password:</label>
          <input type="password" placeholder="Confirm password" className="reset-input" />

          <button className="reset-btn">Send password reset email</button>
        </div>
      </div>
    </div>
  )
}

export default ResetPass
