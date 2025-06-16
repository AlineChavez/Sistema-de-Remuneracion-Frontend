import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Colaboradorespage.css';
import logo from '../welcome/logo.png';

const Colaboradorespage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="colaboradores-container">
      <aside className="colaboradores-sidebar">
        <div className="colaboradores-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="colaboradores-logo-img" />
          <div className="colaboradores-logo-text">myPayslip</div>
        </div>
        <nav className="colaboradores-menu">
          <button onClick={() => navigate('/boletas')}>Todas las boletas</button>
          <button onClick={() => navigate('/colaboradores')} className="active">Mostrar trabajadores</button>
          <button>Nueva boleta</button>
        </nav>
      </aside>

      <main className="colaboradores-main">
        <header className="colaboradores-user-section">
          <div className="colaboradores-user-info">
            <span className="colaboradores-user-icon">👤</span>
            <button
              className="colaboradores-user-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Usuario
            </button>
          </div>
          {menuOpen && (
            <div className="colaboradores-dropdown">
              <button onClick={() => alert('Configuración')}>Configuración</button>
              <hr />
              <button onClick={() => (window.location.href = '/')}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="colaboradores-content">
          <h1>Mis Trabajadores</h1>

          <div className="colaboradores-filtros">
            <div className="colaboradores-busqueda">
              <label>🔍 Buscar</label>
              <input type="text" />
            </div>

            <button className="colaboradores-nuevo">+ Nuevo</button>
          </div>

          <table className="colaboradores-tabla">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="acciones-columna">
                  <button className="editar-btn">Editar</button>
                  <button className="eliminar-btn">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Colaboradorespage;
