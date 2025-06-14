import React from 'react';
import { Link } from 'react-router-dom';
import './Registerpage.css';

const Registerpage = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>
        <form className="register-form">
          <input type="text" placeholder="Usuario" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="text" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar cotraseña" />
          <button type="submit">Registrarse</button>
        </form>
        <p className="login-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registerpage;
