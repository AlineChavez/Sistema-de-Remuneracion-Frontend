import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nuevotrabajadorpage.css';
import logo from '../welcome/logo.png';

const Nuevotrabajadorpage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const años = Array.from({ length: 10 }, (_, i) => 2025 - i);

  return (
    <div className="generar-container">
      <aside className="generar-sidebar">
        <div className="generar-logo-bar" onClick={() => navigate('/welcome')}>
          <img src={logo} alt="Logo" className="generar-logo-img" />
          <div className="generar-logo-text">myPayslip</div>
        </div>
        <nav className="generar-menu">
          <button onClick={() => navigate('/boletas')}>Todas las boletas</button>
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
              <button onClick={() => navigate('/')}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="generar-content">
          <h1>Nuevo Trabajador</h1>

          <form className="generar-form">
            <div className="generar-grid">
              <label>Número (RUC, DNI, etc.) <input type="text" /></label>
              <label>Tipo de documento
                <select className="select-grande">
                  <option>Elegir</option>
                </select>
              </label>
              <label>Tipo de entidad
                <select className="select-grande">
                  <option>Elegir</option>
                </select>
              </label>

              <label>Razón social <input type="text" /></label>
              <label>Apellido paterno <input type="text" /></label>
              <label>Apellido materno <input type="text" /></label>
              <label>Nombres completos <input type="text" /></label>

              <label>Dirección fiscal <input type="text" /></label>
              <label>Cargo <input type="text" /></label>

              <label>Fecha de ingreso
                <div className="generar-selects">
                  <select>{dias.map(d => <option key={d}>{d}</option>)}</select>
                  <select>{meses.map((m, i) => <option key={i}>{m}</option>)}</select>
                  <select>{años.map(a => <option key={a}>{a}</option>)}</select>
                </div>
              </label>

              <label>Email principal (opcional) <input type="email" /></label>
              <label>Teléfono (opcional) <input type="tel" /></label>
              <label>Nota (opcional) <input type="text" /></label>
            </div>

            <div className="generar-botones">
              <button type="button">Aceptar</button>
              <button type="submit" style={{ backgroundColor: 'black', color: 'white' }}>Aceptar y nuevo trabajador</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Nuevotrabajadorpage;
