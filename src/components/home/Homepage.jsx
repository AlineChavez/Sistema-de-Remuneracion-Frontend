import React from 'react';
import './Homepage.css';
import logo from './logo.png';
import image from './image.jpg';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register'); // aunque aún no exista, ya prepara la ruta

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="left-header">
          <img src={logo} alt="Logo de la empresa" className="logo-img" />
          <div className="app-name">myPayslip</div>
        </div>
        <div className="buttons">
          <button className="login-btn" onClick={handleLogin}>Iniciar Sesión</button>
          <button className="register-btn" onClick={handleRegister}>Registrarse</button>
        </div>
      </header>

      <main className="homepage-main">
        <div className="image-section">
          <img src={image} alt="Ilustración sobre confianza en la contabilidad" />
        </div>
        <div className="text-section">
          <h1>Transformamos<br />números<br />en confianza</h1>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
