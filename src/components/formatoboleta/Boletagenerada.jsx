import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boletagenerada.css';
import logo from '../welcome/logo.png';

const Boletagenerada = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <header className="colaboradores-user-section">
          <div className="colaboradores-user-info">
            <span className="colaboradores-user-icon">👤</span>
            <button className="colaboradores-user-button" onClick={() => setMenuOpen(!menuOpen)}>
              Usuario
            </button>
          </div>
          {menuOpen && (
            <div className="colaboradores-dropdown">
              <button onClick={() => navigate('/configuracionusuario')}>Configuración</button>
              <hr />
              <button onClick={() => navigate('/')}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <div className="boleta-contenido">
          <div className="boleta-box">
            <div className="boleta-encabezado">
              <div className="boleta-logo-info">
                <div className="boleta-logo">LOGO</div>
                <div>
                  <p>Nombre de la empresa</p>
                  <p>Dirección</p>
                  <p>RUC</p>
                  <p><strong>FECHA:</strong> DD-MM-AAAA</p>
                </div>
              </div>
              <div className="boleta-numero">
                <p><strong>N° boleta:</strong> 0000 - 00123</p>
                <p><strong>Tipo boleta:</strong> AFP</p>
              </div>
            </div>

            <div className="boleta-trabajador">
              <p><strong>Nombres:</strong> Nombres y apellidos</p>
              <p><strong>Fecha de ingreso:</strong> DD-MM-AAAA</p>
              <p><strong>Tipo documento:</strong> DNI</p>
              <p><strong>N° documento:</strong> 45758565</p>
              <p><strong>Cargo:</strong> Docente</p>
            </div>

            <div className="boleta-tabla">
              <table>
                <thead>
                  <tr>
                    <th>Ingresos</th>
                    <th>Descuentos</th>
                    <th>Aportaciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sueldo básico<br />Asignación familiar</td>
                    <td>Retención de renta<br />AFP<br />Seguro AFP<br />Comisión AFP</td>
                    <td>ESSALUD</td>
                  </tr>
                  <tr>
                    <td className="right">3,124.20<br />120.20</td>
                    <td className="right">120.20<br />120.20<br />120.20<br />120.20</td>
                    <td className="right">150.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Total Ingresos:</strong> 3,244.40</td>
                    <td><strong>Total Descuentos:</strong> 480.80</td>
                    <td><strong>Total Neto:</strong> 2,743.60</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="boleta-firma">
              _____________________________________
              <p>Firma y sello del empleador</p>
            </div>

            <div className="boleta-pdf-btn">
              <button>Ver PDF</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Boletagenerada;
