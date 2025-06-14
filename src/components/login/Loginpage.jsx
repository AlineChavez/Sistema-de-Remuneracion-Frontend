import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form className="login-form">
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

