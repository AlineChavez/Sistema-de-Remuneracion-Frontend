import React from 'react';
import './Homepage.css';
import logo from './logo.png';
import image from './image.jpg';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="left-header">
          <img src={logo} alt="Logo" className="logo-img" />
          <div className="app-name">myPayslip</div>
        </div>
        <div className="buttons">
          <button className="login-btn">Iniciar Sesión</button>
          <button className="register-btn">Registrarse</button>
        </div>
      </header>

      <main className="homepage-main">
        <div className="image-section">
          <img src={image} alt="Ilustración" />
        </div>
        <div className="text-section">
          <h1>Transformamos<br />números<br />en confianza</h1>
        </div>
      </main>
    </div>
  );
};

export default Homepage;

