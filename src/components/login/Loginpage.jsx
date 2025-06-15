import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Loginpage.css';

const Loginpage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí podrías validar el usuario/contraseña antes de redirigir
    navigate('/welcome'); // Redirige a la página de bienvenida
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Correo o usuario" />
          <input type="password" placeholder="Contraseña" />
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
