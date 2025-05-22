import { useState } from 'react';
import '../estilos/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [modal, setModal] = useState({ show: false, message: '', type: '' });

  const showModal = (message: string, type: string = 'error') => {
    setModal({ show: true, message, type });
  };

  const closeModal = () => {
    setModal({ show: false, message: '', type: '' });
    if (modal.type === 'success') {
      window.location.href = '/';
    }
  };

  const goToSignIn = () => {
    window.location.href = '/';
  };

  const handleContinue = () => {
    if (!email.includes('@')) {
      showModal('Please enter a valid email address with "@"');
      return;
    }

    if (password.length < 8) {
      showModal('Password must be at least 8 characters');
      return;
    }

    if (!username) {
      showModal('Please enter a username');
      return;
    }

    const nuevoUsuario = {
      email,
      password,
      username,
      country,
      role: 'user',
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const existeUsuario = usuarios.some(
      (user: { email: string; username: string }) =>
        user.email === email || user.username === username
    );

    if (existeUsuario) {
      showModal('Email or username already registered');
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showModal('Account created successfully! ✅', 'success');

    setEmail('');
    setPassword('');
    setUsername('');
    setCountry('');
  };

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

          <label className="signup-label">Email address:</label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="signup-label">Password:</label>
          <input
            className="signup-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small className="signup-hint">
            Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
          </small>

          <label className="signup-label">Username:</label>
          <input
            className="signup-input"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <small className="signup-hint">
            Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
          </small>

          <label className="signup-label">Your Country/Region:</label>
          <select
            className="signup-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select your country</option>
            <option>United States</option>
            <option>Peru</option>
            <option>Argentina</option>
            <option>Mexico</option>
          </select>
          <small className="signup-hint">
            For compliance reasons, we're required to collect country information to send you occasional updates and announcements.
          </small>

          <button className="signup-btn" onClick={handleContinue}>Continue →</button>
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="modal-signup-overlay">
          <div className="modal-signup">
            <button className="close-btn" onClick={goToSignIn}>×</button>
            <div className="modal-icon">
              {modal.type === 'success' ? '✅' : '⚠️'}
            </div>
            <h3>{modal.type === 'success' ? 'Success!' : 'Error'}</h3>
            <p className={`modal-signup-message ${modal.type}`}>
              {modal.message}
            </p>
            <div className="modal-signup-actions">
              <button onClick={closeModal}>
                {modal.type === 'success' ? 'Go to Sign In' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
