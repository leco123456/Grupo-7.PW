import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  // Estados para los inputs controlados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Caso especial: acceso admin fijo
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('userRole', 'admin');
      alert('Bienvenido admin, rol: admin');
      navigate('/paginaprincipal'); // Cambio aquí
      return;
    }
    

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuarioEncontrado = usuarios.find(
      (user: { username: string; email: string; password: string; role: string }) =>
        (user.username === username || user.email === username) && user.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem('userRole', usuarioEncontrado.role || 'user');
      alert(`Bienvenido ${usuarioEncontrado.username}, rol: ${usuarioEncontrado.role || 'user'}`);

      if (usuarioEncontrado.role === 'admin') {
        navigate('/adminjuegos');
      } else {
        navigate('/paginaprincipal');
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="signin-wrapper">
      <div className="container-signin">
        <div className="logo">GameStore</div>

        <h2 className="signin-title">Sign in to GameStore</h2>

        <div className="form-box">
          <label htmlFor="username">Username or email:</label>
          <input
            id="username"
            type="text"
            className="signin-input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="signin-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="signin-link">
            <a href="#">Forgot your password?</a>
          </div>

          <button className="signin-btn" onClick={handleSignIn}>
            Sign in
          </button>

          <div className="signin-bottom-text">
            New to GameStore?{' '}
            <span
              className="signup-link"
              onClick={handleNavigateToSignUp}
              style={{ cursor: 'pointer', color: '#007bff' }}
            >
              Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
