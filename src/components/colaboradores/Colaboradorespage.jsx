import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Colaboradorespage.css';
import logo from '../welcome/logo.png';

const Colaboradorespage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [trabajadores, setTrabajadores] = useState([
    { id: 1, nombre: 'Nombre 1', apellido: 'Apellido 1', documento: '12345671', email: 'persona1@correo.com', cargo: 'Cargo 1' },
    { id: 2, nombre: 'Nombre 2', apellido: 'Apellido 2', documento: '12345672', email: 'persona2@correo.com', cargo: 'Cargo 2' },
  ]);

  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setDropdownOpen(prev => (prev === id ? null : id));
  };

  const eliminarTrabajador = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de eliminar este trabajador?');
    if (confirmacion) {
      setTrabajadores(prev => prev.filter(t => t.id !== id));
      setDropdownOpen(null);
    }
  };

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
              <button onClick={() => alert('Configuración')}>Configuración</button>
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
              <input type="text" />
            </div>
            <button className="colaboradores-nuevo">+ Nuevo</button>
          </div>

          <table className="colaboradores-tabla">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Cargo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((t) => (
                <tr key={t.id}>
                  <td>{t.nombre}</td>
                  <td>{t.apellido}</td>
                  <td>{t.documento}</td>
                  <td>{t.email}</td>
                  <td>{t.cargo}</td>
                  <td className="colaboradores-opciones">
                    <div className="colaboradores-menu-icon" onClick={() => toggleDropdown(t.id)}>⋮</div>
                    {dropdownOpen === t.id && (
                      <div className="colaboradores-dropdown-mini">
                        <button onClick={() => alert(`Editar trabajador ${t.id}`)}>Editar</button>
                        <hr className="dropdown-separator" />
                        <button onClick={() => eliminarTrabajador(t.id)}>Eliminar</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {trabajadores.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay trabajadores registrados.</td>
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
