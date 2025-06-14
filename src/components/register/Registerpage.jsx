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
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
          <button type="submit">Registrarse</button>
        </form>
        <p className="login-text">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registerpage;
