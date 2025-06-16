import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcomepage.css';
import imagewelcome from './imagewelcome.jpg';
import logo from './logo.png';

const Welcomepage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="welcome-container">
      <aside className="welcome-sidebar">
        <div className="welcome-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="welcome-logo-img" />
          <div className="welcome-logo-text">myPayslip</div>
        </div>
        <nav className="welcome-menu">
          <button onClick={() => navigate('/boletas')}>Mostrar boletas</button>
          <button onClick={() => navigate('/colaboradores')}>Mostrar trabajadores</button>
          <button onClick={() => navigate('/generarboleta')}>Nueva boleta</button>
        </nav>
      </aside>

      <main className="welcome-main">
        <header className="welcome-user-section">
          <div className="welcome-user-info">
            <span className="welcome-user-icon">👤</span>
            <button className="welcome-user-button" onClick={() => setMenuOpen(!menuOpen)}>Usuario</button>
          </div>
          {menuOpen && (
            <div className="welcome-dropdown">
              <button onClick={() => navigate('/configuracionusuario')}>Configuración</button>
              <hr />
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="welcome-content">
          <div className="welcome-text-section">
            <h1>¡Bienvenido a myPayslip!</h1>
            <p>
              Somos un software que te permite generar boletas contables de forma rápida y sencilla.
              Con él podés crear boletas de pago, comprobantes y resúmenes contables sin complicaciones.
              Está pensado para que el proceso sea automático, ordenado y cumpla con todos los requisitos legales,
              ideal para empresas que quieren ahorrar tiempo y evitar errores en la gestión de sueldos y contabilidad.
            </p>
          </div>
          <div className="welcome-image-section">
            <img src={imagewelcome} alt="Ilustración bienvenida" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Welcomepage;
