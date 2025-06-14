import React from 'react';
import { Link } from 'react-router-dom';
import './Loginpage.css';

const Loginpage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form className="login-form">
          <input type="text" placeholder="Correo o usuario" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Continuar</button>
        </form>
        <p className="signup-text">
          ¿No tienes una cuenta?
          <Link to="/register" className="signup-link"> Crea una</Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
