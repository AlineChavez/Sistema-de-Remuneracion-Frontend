import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boletaspage.css';
import logo from '../welcome/logo.png';

const Boletaspage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const años = Array.from({ length: 25 }, (_, i) => 2025 - i);

  const [boletas, setBoletas] = useState([
    { id: 1, trabajador: 'Carlos Pérez', ingresos: 3000, descuentos: 250, aportes: 300, neto: 2450 },
    { id: 2, trabajador: 'Ana Torres', ingresos: 2800, descuentos: 200, aportes: 250, neto: 2350 },
    { id: 3, trabajador: 'Luis Díaz', ingresos: 3200, descuentos: 300, aportes: 350, neto: 2550 },
  ]);

  const handleDropdownToggle = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // Filtrar boletas por nombre del trabajador
  const boletasFiltradas = boletas.filter(b =>
    b.trabajador.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="boletas-container">
      <aside className="boletas-sidebar">
        <div className="boletas-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="boletas-logo-img" />
          <div className="boletas-logo-text">myPayslip</div>
        </div>
        <nav className="boletas-menu">
          <button onClick={() => navigate('/boletas')}>Mostrar boletas</button>
          <button onClick={() => navigate('/colaboradores')}>Mostrar trabajadores</button>
          <button onClick={() => navigate('/generarboleta')}>Nueva boleta</button>
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
              <button onClick={() => navigate('/configuracionusuario')}>Configuración</button>
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
                <select>{dias.map(d => <option key={d}>{d}</option>)}</select>
                <select>{meses.map((m, i) => <option key={i}>{m}</option>)}</select>
                <select>{años.map(a => <option key={a}>{a}</option>)}</select>
              </div>
            </div>

            <div className="boletas-busqueda">
              <label>🔍 Buscar</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre del trabajador"
              />
            </div>

            <button className="boletas-nuevo" onClick={() => navigate('/generarboleta')}>+ Nuevo</button>
          </div>

          <table className="boletas-tabla">
            <thead>
              <tr>
                <th>Trabajador</th>
                <th>Ingresos</th>
                <th>Descuentos</th>
                <th>Aportaciones</th>
                <th>Total neto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {boletasFiltradas.length > 0 ? (
                boletasFiltradas.map((b) => (
                  <tr key={b.id}>
                    <td>{b.trabajador}</td>
                    <td>S/ {b.ingresos}</td>
                    <td>S/ {b.descuentos}</td>
                    <td>S/ {b.aportes}</td>
                    <td>S/ {b.neto}</td>
                    <td className="boletas-opciones">
                      <div className="boletas-menu-icon" onClick={() => handleDropdownToggle(b.id)}>⋮</div>
                      {activeDropdown === b.id && (
                        <div className="boletas-dropdown-mini">
                          <button onClick={() => alert(`Vista previa del trabajador ${b.trabajador}`)}>Vista previa</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    Boleta no encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Boletaspage;
