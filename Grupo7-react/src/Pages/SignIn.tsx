import './SignIn.css';

const SignIn = () => {
  return (
    <div className="signin-wrapper">
      <div className="container-signin">
        <div className="logo">GameStore</div>

        <h2 className="signin-title">Sign in to GameStore</h2>

        <div className="form-box">
          <label className="signin-label">Username or email:</label>
          <input type="text" className="signin-input" placeholder="Enter username" />

          <label className="signin-label">Password:</label>
          <input type="password" className="signin-input" placeholder="Enter password" />

          <div className="signin-link">
            <a href="#">Forgot your password?</a>
          </div>

          <button className="signin-btn">Sign in</button>

          <div className="signin-bottom-text">
            New to GameStore? <a href="#">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;