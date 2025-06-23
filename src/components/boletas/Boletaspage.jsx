import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Boletaspage.css';
import logo from '../welcome/logo.png';

const Boletaspage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [boletas, setBoletas] = useState([]);

  const navigate = useNavigate();

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const años = Array.from({ length: 25 }, (_, i) => 2025 - i);

  useEffect(() => {
    cargarBoletas();
  }, []);

  const cargarBoletas = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/boletas');
      const data = await res.json();
      setBoletas(data);
    } catch (err) {
      console.error('Error al obtener boletas:', err);
    }
  };

  const eliminarBoleta = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar esta boleta?');
    if (confirmacion) {
      try {
        await fetch(`http://localhost:8080/api/boletas/${id}`, {
          method: 'DELETE'
        });
        cargarBoletas(); // Actualiza la tabla
        setActiveDropdown(null);
      } catch (err) {
        console.error('Error al eliminar boleta:', err);
      }
    }
  };

  const boletasFiltradas = boletas.filter(b =>
    b.numeroBoleta?.toLowerCase().includes(busqueda.toLowerCase()) ||
    b.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="boletas-container">
      <aside className="boletas-sidebar">
        <div className="boletas-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="boletas-logo-img" />
          <div className="boletas-logo-text">myPayslip</div>
        </div>
        <nav className="boletas-menu">
          <button className="active">Mostrar boletas</button>
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
              <button onClick={() => (window.location.href = '/')}>Cerrar sesión</button>
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
                placeholder="Número o descripción de boleta"
              />
            </div>

            <button className="boletas-nuevo" onClick={() => navigate('/generarboleta')}>+ Nuevo</button>
          </div>

          <table className="boletas-tabla">
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Trabajador</th>
                <th>Monto Neto (aprox)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {boletasFiltradas.length > 0 ? (
                boletasFiltradas.map((b) => (
                  <tr key={b.idBoleta}>
                    <td>{b.numeroBoleta}</td>
                    <td>{b.fechaEmision}</td>
                    <td>{b.descripcion}</td>
                    <td>ID: {b.idTrabajador}</td>
                    <td>S/ {b.remuneracionBasica - b.retencionRenta}</td>
                    <td className="boletas-opciones">
                      <div className="boletas-menu-icon" onClick={() => setActiveDropdown(b.idBoleta)}>⋮</div>
                      {activeDropdown === b.idBoleta && (
                        <div className="boletas-dropdown-mini">
                          <button onClick={() => navigate(`/boletagenerada/${b.idBoleta}`)}>Vista previa</button>
                          <hr />
                          <button onClick={() => eliminarBoleta(b.idBoleta)}>Eliminar</button>
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
