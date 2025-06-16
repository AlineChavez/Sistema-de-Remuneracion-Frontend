import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Generar_boletapage.css';
import logo from '../welcome/logo.png';

const Generarboletas = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [retencion, setRetencion] = useState(false);
  const [bancarizado, setBancarizado] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="generar-container">
      <aside className="generar-sidebar">
        <div className="generar-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="generar-logo-img" />
          <div className="generar-logo-text">myPayslip</div>
        </div>
        <nav className="generar-menu">
          <button onClick={() => navigate('/boletas')}>Todas las boletas</button>
          <button onClick={() => navigate('/colaboradores')}>Mostrar trabajadores</button>
          <button className="active">Nueva boleta</button>
        </nav>
      </aside>

      <main className="generar-main">
        <header className="generar-user-section">
          <div className="generar-user-info">
            <span className="generar-user-icon">👤</span>
            <button className="generar-user-button" onClick={() => setMenuOpen(!menuOpen)}>Usuario</button>
          </div>
          {menuOpen && (
            <div className="generar-dropdown">
              <button onClick={() => alert('Configuración')}>Configuración</button>
              <hr />
              <button onClick={() => window.location.href = '/'}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="generar-content">
          <h1>Nueva Boleta de Pago</h1>

          <form className="generar-form">
            <div className="generar-grid">
              <label>Correlativo <input type="text" /></label>
              <label>Trabajador <select><option>Elegir</option></select></label>
              <label>Tipo de boleta
                <select>
                  <option>Elegir</option>
                  <option>1 - AFP HABITUAL</option>
                  <option>2 - AFP MIXTA</option>
                  <option>3 - AFP PROYECTO</option>
                  <option>4 - SNP</option>
                </select>
              </label>
              <label>Fecha de emisión
                <div className="generar-selects">
                  <select><option>Día</option></select>
                  <select><option>Mes</option></select>
                  <select><option>Año</option></select>
                </div>
              </label>
              <label>Número de boleta <input type="text" /></label>
              <label>¿Retención Renta?
                <div className="switch">
                  <input
                    type="checkbox"
                    id="retencion"
                    checked={retencion}
                    onChange={() => setRetencion(!retencion)}
                  />
                  <label htmlFor="retencion"></label>
                </div>
              </label>
              <label>Moneda
                <select>
                  <option>Elegir</option>
                  <option>S/ - SOLES</option>
                  <option>$ - DÓLARES</option>
                </select>
              </label>
              <label>Tipo de cambio <input type="text" /></label>
              <label>Remuneración básica <input type="text" /></label>
              <label>Asignación familiar <input type="text" /></label>
              <label>SNP <input type="text" /></label>
              <label>AFP <input type="text" /></label>
              <label>Comisión AFP <input type="text" /></label>
              <label>Seguro AFP <input type="text" /></label>
              <label>Total neto <input type="text" /></label>
              <label>ESSALUD - regular <input type="text" /></label>
              <label>¿Bancarizado?
                <div className="switch">
                  <input
                    type="checkbox"
                    id="bancarizado"
                    checked={bancarizado}
                    onChange={() => setBancarizado(!bancarizado)}
                  />
                  <label htmlFor="bancarizado"></label>
                </div>
              </label>
              <label>Descripción (opcional)
                <input type="text" />
              </label>
            </div>

            <div className="generar-botones">
              <button type="submit">Aceptar</button>
              <button type="button" onClick={() => navigate('/boletas')}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Generarboletas;
