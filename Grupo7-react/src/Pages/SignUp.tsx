const SignUp = () => {
    return <div>
    <div className="container">
      <div className="left-side">
        <div className="logo-bar">
          <div className="logo">Logo</div>
          <div className="name">GameStore</div>
        </div>
        <h2>Create your free account</h2>
        <p>Explore your favorite games and play without restrictions</p>
      </div>
  
      <div className="right-side">
        <h2>Sign up to GameStore</h2>
  
        <label>Username or email address:</label>
        <input type="text" placeholder="Enter email or username"/>
  
        <label>Password:</label>
        <input type="password" placeholder="Enter password"/>
        <small>Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</small>
  
        <label>Username:</label>
        <input type="text" placeholder="Choose a username"/>
        <small>Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.</small>
  
        <label>Your Country/Region:</label>
        <select>
          <option>Select your country</option>
          <option>United States</option>
        </select>
        <small>For compliance reasons, we're required to collect country information to send you occasional updates and announcements.</small>
  
        <button>Continue →</button>
      </div>
    </div>
  </div>
}

export default SignUp