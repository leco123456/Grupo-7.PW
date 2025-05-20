const ResetPass = () => {
    return <div>
    <div className="container">
      <div className="logo">Logo</div>
      <h2>Reset your Password</h2>
      <div className="form-box">
        <p>Enter your user account’s verified email address and we will send you a password reset confirmation message.</p>
        
        <input type="email" placeholder="Enter your email"/>
        
        <label>New password:</label>
        <input type="password" placeholder="New password"/>
        
        <label>Confirm new password:</label>
        <input type="password" placeholder="Confirm password"/>
        
        <button>Send password reset email</button>
      </div>
    </div>
  </div>
}

export default ResetPass