import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Loginpage.css';

const Loginpage = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validación: campos vacíos
    if (!correo || !contrasena) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Validación: si parece un correo, valida su formato
    const esCorreo = correo.includes('@');
    if (esCorreo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError('El correo ingresado no es válido.');
      return;
    }

    // Simulación de login exitoso
    navigate('/welcome');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Correo o usuario"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Continuar</button>
        </form>
        <p className="signup-text">
          ¿No tienes cuenta? <Link to="/register">Crear una</Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
