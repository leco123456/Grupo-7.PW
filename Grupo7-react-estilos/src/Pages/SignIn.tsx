import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  // Estados para los inputs controlados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetUser, setResetUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleSignIn = () => {
    // Caso especial: acceso admin fijo
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('userRole', 'admin');
      alert('Bienvenido admin, rol: admin');
      navigate('/paginaprincipal'); // Cambiado a paginaprincipal
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
      navigate('/paginaprincipal'); // Siempre navega a paginaprincipal
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  const handleResetPassword = () => {
    // Simulación de verificación y cambio de contraseña
    if (!resetUser || !newPass || !confirmNewPass) {
      setResetMessage('Por favor, completa todos los campos.');
      return;
    }
    if (newPass !== confirmNewPass) {
      setResetMessage('Las contraseñas no coinciden.');
      return;
    }
    // Simula búsqueda y cambio en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userIndex = usuarios.findIndex(
      (user: { username: string; email: string }) =>
        user.username === resetUser || user.email === resetUser
    );
    if (userIndex === -1) {
      setResetMessage('Usuario o email no encontrado.');
      return;
    }
    usuarios[userIndex].password = newPass;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setResetMessage('¡Contraseña restablecida con éxito!');
    setTimeout(() => {
      setShowResetModal(false);
      setResetMessage('');
      setResetUser('');
      setNewPass('');
      setConfirmNewPass('');
    }, 1500);
  };

  return (
    <div className="signin-wrapper">
      <div className="container-signin">
        <div className="logo">Nivel 100</div>

        <h2 className="signin-title">Sign in</h2>

        <div className="form-box">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            className="signin-input"
            placeholder="Ingresar usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="signin-input"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="signin-link">
            <span
              style={{ color: '#007bff', cursor: 'pointer' }}
              onClick={() => setShowResetModal(true)}
            >
              Olvidaste tu contraseña?
            </span>
          </div>

          <button className="signin-btn" onClick={handleSignIn}>
            Sign in
          </button>

          <div className="signin-bottom-text">
            No tienes cuenta?{' '}
            <span
              className="signup-link"
              onClick={handleNavigateToSignUp}
              style={{ cursor: 'pointer', color: '#007bff' }}
            >
              Crear cuenta
            </span>
          </div>
        </div>
      </div>

      {/* Modal de reset password */}
      {showResetModal && (
        <div className="modal-reset-overlay">
          <div className="modal-reset">
            <h3>Reset your password</h3>
            <p>
              Enter your user account's verified email address and we will send you a password reset confirmation message.
            </p>
            <input
              type="text"
              placeholder="Usuario o email"
              value={resetUser}
              onChange={(e) => setResetUser(e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPass}
              onChange={(e) => setConfirmNewPass(e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
            {resetMessage && (
              <div style={{ color: resetMessage.includes('éxito') ? 'green' : 'red', marginBottom: 8 }}>
                {resetMessage}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleResetPassword}>Send password reset email</button>
              <button onClick={() => setShowResetModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
