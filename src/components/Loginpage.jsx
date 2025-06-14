import React from 'react';
import './Loginpage.css';

const Loginpage = () => {
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form">
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};


export default Loginpage;

