import React from 'react';
import './Home.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo">myPayslip</div>
        <div className="buttons">
          <button className="login-btn">Iniciar Sesión</button>
          <button className="register-btn">Registrarse</button>
        </div>
      </header>

      <main className="homepage-main">
        <div className="text-section">
          <h1>Transformamos<br />números<br />en confianza</h1>
        </div>
        <div className="image-section">
          <img src="/logo192.png" alt="Ilustración" />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
