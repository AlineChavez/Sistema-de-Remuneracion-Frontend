import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boletaspage.css';
import logo from '../welcome/logo.png';

const Boletaspage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Para los 3 puntitos
  const navigate = useNavigate();

  const handleDropdownToggle = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="boletas-container">
      <aside className="boletas-sidebar">
        <div className="boletas-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="boletas-logo-img" />
          <div className="boletas-logo-text">myPayslip</div>
        </div>
        <nav className="boletas-menu">
          <button onClick={() => navigate('/boletas')}>Todas las boletas</button>
          <button onClick={() => navigate('/colaboradores')}>Mostrar trabajadores</button>
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
                <select><option>Mes</option></select>
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
                <th></th> {/* Columna para los 3 puntitos */}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((id) => (
                <tr key={id}>
                  <td>Trabajador {id}</td>
                  <td>S/ 3000</td>
                  <td>S/ 250</td>
                  <td>S/ 300</td>
                  <td>S/ 2450</td>
                  <td className="boletas-opciones">
                    <div
                      className="boletas-menu-icon"
                      onClick={() => handleDropdownToggle(id)}
                    >
                      ⋮
                    </div>
                    {activeDropdown === id && (
                      <div className="boletas-dropdown-mini">
                        <button onClick={() => alert(`Vista previa del trabajador ${id}`)}>Vista previa</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Boletaspage;
