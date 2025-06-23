import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boletagenerada.css';
import logo from '../welcome/logo.png';

const Boletagenerada = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('boleta_generada');
    if (data) {
      setBoleta(JSON.parse(data));
    }
  }, []);

  if (!boleta) return <div>Cargando boleta...</div>;

  const totalIngresos = boleta.ingresos.reduce((sum, i) => sum + i.monto, 0);
  const totalDescuentos = boleta.descuentos.reduce((sum, d) => sum + d.monto, 0);
  const totalNeto = totalIngresos - totalDescuentos;

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
            <button className="colaboradores-user-button" onClick={() => setMenuOpen(!menuOpen)}>Usuario</button>
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
                  <p>{boleta.empresa.nombre}</p>
                  <p>{boleta.empresa.direccion}</p>
                  <p>{boleta.empresa.ruc}</p>
                  <p><strong>FECHA:</strong> {boleta.fecha}</p>
                </div>
              </div>
              <div className="boleta-numero">
                <p><strong>N° boleta:</strong> {boleta.numero}</p>
                <p><strong>Tipo boleta:</strong> {boleta.tipoBoleta}</p>
              </div>
            </div>

            <div className="boleta-trabajador">
              <p><strong>Nombres:</strong> {boleta.trabajador.nombres}</p>
              <p><strong>Fecha de ingreso:</strong> {boleta.trabajador.fechaIngreso}</p>
              <p><strong>Tipo documento:</strong> {boleta.trabajador.tipoDocumento}</p>
              <p><strong>N° documento:</strong> {boleta.trabajador.numeroDocumento}</p>
              <p><strong>Cargo:</strong> {boleta.trabajador.cargo}</p>
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
                    <td>{boleta.ingresos.map(i => <div key={i.concepto}>{i.concepto}</div>)}</td>
                    <td>{boleta.descuentos.map(d => <div key={d.concepto}>{d.concepto}</div>)}</td>
                    <td>{boleta.aportes.map(a => <div key={a.concepto}>{a.concepto}</div>)}</td>
                  </tr>
                  <tr>
                    <td className="right">{boleta.ingresos.map(i => <div key={i.concepto}>S/ {i.monto.toFixed(2)}</div>)}</td>
                    <td className="right">{boleta.descuentos.map(d => <div key={d.concepto}>S/ {d.monto.toFixed(2)}</div>)}</td>
                    <td className="right">{boleta.aportes.map(a => <div key={a.concepto}>S/ {a.monto.toFixed(2)}</div>)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Total Ingresos:</strong> S/ {totalIngresos.toFixed(2)}</td>
                    <td><strong>Total Descuentos:</strong> S/ {totalDescuentos.toFixed(2)}</td>
                    <td><strong>Total Neto:</strong> S/ {totalNeto.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="boleta-firma">
              _____________________________________
              <p>Firma y sello del empleador</p>
            </div>

            <div className="boleta-pdf-btn">
              <button onClick={() => alert('Próximamente: exportar a PDF')}>Ver PDF</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Boletagenerada;