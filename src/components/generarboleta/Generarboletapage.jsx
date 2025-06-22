import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Generarboletapage.css';
import logo from '../welcome/logo.png';

const Generarboletas = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [retencion, setRetencion] = useState(false);
  const [bancarizado, setBancarizado] = useState(false);
  const navigate = useNavigate();

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const años = Array.from({ length: 10 }, (_, i) => 2025 - i);

  return (
    <div className="generar-container">
      <aside className="generar-sidebar">
        <div className="generar-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="generar-logo-img" />
          <div className="generar-logo-text">myPayslip</div>
        </div>
        <nav className="generar-menu">
          <button onClick={() => navigate('/boletas')}>Mostrar boletas</button>
          <button onClick={() => navigate('/colaboradores')}>Mostrar trabajadores</button>
          <button onClick={() => navigate('/generarboleta')}>Nueva boleta</button>
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
              <button onClick={() => navigate('/configuracionusuario')}>Configuración</button>
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

              <div className="grupo-trabajador">
                <label className="campo-trabajador">
                  Trabajador
                  <select className="select-grande">
                    <option>Elegir</option>
                  </select>
                </label>
                <button className="colaboradores-nuevo" onClick={() => navigate('/nuevotrabajador')}>Nuevo trabajador</button>
              </div>


              <label>Tipo de boleta
                <select className="select-grande">
                  <option>Elegir</option>
                  <option>AFP Habitual</option>
                  <option>AFP Mixta</option>
                  <option>AFP Proyecto</option>
                  <option>SNP</option>
                </select>
              </label>

              <label>Fecha de emisión
                <div className="generar-selects">
                  <select>{dias.map(d => <option key={d}>{d}</option>)}</select>
                  <select>{meses.map((m, i) => <option key={i}>{m}</option>)}</select>
                  <select>{años.map(a => <option key={a}>{a}</option>)}</select>
                </div>
              </label>

              <label>Número de boleta <input type="text" /></label>

              <label>¿Retención Renta?
                <div className="switch">
                  <input type="checkbox" id="retencion" checked={retencion} onChange={() => setRetencion(!retencion)} />
                  <label htmlFor="retencion"></label>
                </div>
              </label>

              <label>Moneda
                <select className="select-grande">
                  <option>Elegir</option>
                  <option>1 - SOLES</option>
                  <option>2 - DÓLARES</option>
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
                  <input type="checkbox" id="bancarizado" checked={bancarizado} onChange={() => setBancarizado(!bancarizado)} />
                  <label htmlFor="bancarizado"></label>
                </div>
              </label>

              <label>Descripción (opcional)
                <textarea rows="2"></textarea>
              </label>
            </div>

            <div className="generar-botones">
              <button type="button" onClick={() => navigate('/formatoboleta')}>Aceptar</button>
              <button type="button" onClick={() => navigate('/boletas')}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Generarboletas;
