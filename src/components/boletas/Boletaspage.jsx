import React, { useState } from 'react';
import './Boletaspage.css';
import logo from '../welcome/logo.png'; // Ajusta según tu estructura

const Boletaspage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="boletas-container">
      <aside className="boletas-sidebar">
        <div className="boletas-logo-bar">
          <img src={logo} alt="Logo" className="boletas-logo-img" />
          <div className="boletas-logo-text">myPayslip</div>
        </div>
        <nav className="boletas-menu">
          <button>Todas las boletas</button>
          <button>Mostrar trabajadores</button>
          <button>Nueva boleta</button>
        </nav>
      </aside>

      <main className="boletas-main">
        <header className="boletas-user-section">
          <div className="boletas-user-info">
            <span className="boletas-user-icon">👤</span>
            <button className="boletas-user-button" onClick={() => setMenuOpen(!menuOpen)}>Usuario</button>
          </div>
          {menuOpen && (
            <div className="boletas-dropdown">
              <button onClick={() => alert('Configuración')}>Configuración</button>
              <hr />
              <button onClick={() => window.location.href = '/'}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="boletas-content">
          <h1>Mis Boletas</h1>

          <div className="boletas-filtros">
            <div className="boletas-fecha">
              <label>Fecha</label>
              <div className="selects">
                <select><option>Día</option></select>
                <select><option>Mes </option></select>
                <select><option>Año</option></select>
              </div>
            </div>

            <div className="boletas-busqueda">
              <label>🔍 Buscar</label>
              <input type="text" />
            </div>

            <button className="boletas-nuevo">+ Nuevo</button>
          </div>

          <table className="boletas-tabla">
            <thead>
              <tr>
                <th>Trabajador</th>
                <th>Ingresos</th>
                <th>Descuentos</th>
                <th>Aportaciones</th>
                <th>Total neto</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="5"></td></tr>
              <tr><td colSpan="5"></td></tr>
              <tr><td colSpan="5"></td></tr>
              <tr>
                <td colSpan="5" className="vista-previa">Vista previa</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Boletaspage;
