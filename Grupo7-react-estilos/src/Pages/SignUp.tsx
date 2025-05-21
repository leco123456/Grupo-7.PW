import './SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-left-side">
          <div className="signup-logo-bar">
            <div className="signup-logo">Logo</div>
            <div className="signup-name">GameStore</div>
          </div>
          <h2 className="signup-left-title">Create your free account</h2>
          <p className="signup-description">
            Explore your favorite games and play without restrictions
          </p>
        </div>

        <div className="signup-right-side">
          <h2 className="signup-title">Sign up to GameStore</h2>

          <label className="signup-label">Username or email address:</label>
          <input className="signup-input" type="text" placeholder="Enter email or username" />

          <label className="signup-label">Password:</label>
          <input className="signup-input" type="password" placeholder="Enter password" />
          <small className="signup-hint">
            Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
          </small>

          <label className="signup-label">Username:</label>
          <input className="signup-input" type="text" placeholder="Choose a username" />
          <small className="signup-hint">
            Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
          </small>

          <label className="signup-label">Your Country/Region:</label>
          <select className="signup-input">
            <option>Select your country</option>
            <option>United States</option>
          </select>
          <small className="signup-hint">
            For compliance reasons, we're required to collect country information to send you occasional updates and announcements.
          </small>

          <button className="signup-btn">Continue →</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
