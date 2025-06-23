import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Colaboradorespage.css';
import logo from '../welcome/logo.png';

const Colaboradorespage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [trabajadores, setTrabajadores] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    cargarTrabajadores();
  }, []);

  const cargarTrabajadores = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/trabajadores');
      const data = await res.json();
      console.log("Trabajadores recibidos:", data);
      setTrabajadores(data);
    } catch (err) {
      console.error('Error al obtener trabajadores:', err);
    }
  };

  const eliminarTrabajador = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este trabajador?');
    if (confirmacion) {
      try {
        await fetch(`http://localhost:8080/api/trabajadores/${id}`, {
          method: 'DELETE'
        });
        cargarTrabajadores();
        setDropdownOpen(null);
      } catch (error) {
        console.error('Error al eliminar trabajador:', error);
      }
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  const trabajadoresFiltrados = trabajadores.filter(t =>
    `${t.nombres ?? ''} ${t.apellidos ?? ''} ${t.dni ?? ''}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="colaboradores-container">
      <aside className="colaboradores-sidebar">
        <div className="colaboradores-logo-bar" onClick={() => navigate('/welcome')}>
          <img src={logo} alt="Logo" className="colaboradores-logo-img" />
          <div className="colaboradores-logo-text">myPayslip</div>
        </div>
        <nav className="colaboradores-menu">
          <button onClick={() => navigate('/boletas')}>Mostrar boletas</button>
          <button className="active">Mostrar trabajadores</button>
          <button onClick={() => navigate('/generarboleta')}>Nueva boleta</button>
        </nav>
      </aside>

      <main className="colaboradores-main">
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
              <button onClick={() => (window.location.href = '/')}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="colaboradores-content">
          <h1>Mis Trabajadores</h1>

          <div className="colaboradores-filtros">
            <div className="colaboradores-busqueda">
              <label>🔍 Buscar</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre, Apellido o Documento"
              />
            </div>
            <button className="colaboradores-nuevo" onClick={() => navigate('/nuevotrabajador')}>+ Nuevo</button>
          </div>

          <table className="colaboradores-tabla">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trabajadoresFiltrados.length > 0 ? (
                trabajadoresFiltrados.map((t) => (
                  <tr key={t.idTrabajador}>
                    <td>{t.nombres ?? '-'}</td>
                    <td>{t.apellidos ?? '-'}</td>
                    <td>{t.dni ?? '-'}</td>
                    <td>{t.correo ?? '-'}</td>
                    <td>{t.telefono ?? '-'}</td>
                    <td className="colaboradores-opciones">
                      <div className="colaboradores-menu-icon" onClick={() => toggleDropdown(t.idTrabajador)}>⋮</div>
                      {dropdownOpen === t.idTrabajador && (
                        <div className="colaboradores-dropdown-mini">
                          <button onClick={() => navigate(`/editartrabajador/${t.idTrabajador}`)}>Editar</button>
                          <hr className="dropdown-separator" />
                          <button onClick={() => eliminarTrabajador(t.idTrabajador)}>Eliminar</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    Trabajador no encontrado.
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

export default Colaboradorespage;
