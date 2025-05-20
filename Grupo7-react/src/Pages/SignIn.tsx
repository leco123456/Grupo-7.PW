const SignIn = () => {
    return <div>
    <div className="top-bar">
      <div className="logo">Logo</div>
      <div className="name">GameStore</div>
    </div>
  
    <div className="login-box">
      <h2>Sign in to GameStore</h2>
  
      <label>Username or email:</label>
      <input type="text" placeholder="Enter username"/>
  
      <label>Password:</label>
      <input type="password" placeholder="Enter password"/>
  
      <div className="right-link">
        <a href="#">Forgot your password?</a>
      </div>
  
      <button>Sign in</button>
  
      <div className="bottom-text">
        <div>New to GameStore? <a href="#">Create an account</a></div>
      </div>
    </div>
  </div>
}

export default SignIn