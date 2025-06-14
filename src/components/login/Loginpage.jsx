import React from 'react';
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
        <p>¿No tienes una cuenta? <a href="#">Crea una</a></p>
      </div>
    </div>
  );

};

export default Loginpage;

