import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Configuracionpage.css';
import logo from '../welcome/logo.png';

const Configuracionpage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombreUsuario: '',
    correo: '',
    contrasena: '',
    confirmar: '',
    empresa: '',
    direccion: '',
    ruc: '',
    logo: null,
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleCancelar = () => {
    navigate('/welcome');
  };

  const handleAceptar = async () => {
    const idUsuario = localStorage.getItem('id_usuario');
    const idEmpresa = localStorage.getItem('id_empresa');

    if (!idUsuario || !idEmpresa || idUsuario === '0' || idEmpresa === '0') {
      alert('No se encontró un ID válido de usuario o empresa.');
      return;
    }

    if (formData.contrasena || formData.confirmar) {
      if (formData.contrasena !== formData.confirmar) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      if (formData.contrasena.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
    }

    try {
      // Actualizar usuario
      const usuarioPayload = {
        nombreUsuario: formData.nombreUsuario,
        correo: formData.correo,
        estadoCuenta: true,
      };
      if (formData.contrasena) {
        usuarioPayload.contrasenaHash = formData.contrasena;
      }

      const resUsuario = await fetch(`http://localhost:8080/api/usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioPayload),
      });
      if (!resUsuario.ok) throw new Error('Error actualizando usuario');

      // Actualizar empresa
      const empresaPayload = {
        nombreEmpresa: formData.empresa,
        direccion: formData.direccion,
        ruc: formData.ruc,
        rutaLogo: formData.logo ? formData.logo.name : '',
      };

      const resEmpresa = await fetch(`http://localhost:8080/api/empresas/${idEmpresa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empresaPayload),
      });
      if (!resEmpresa.ok) {
        const errText = await resEmpresa.text();
        throw new Error(`Error actualizando empresa: ${errText}`);
      }

      alert('Datos actualizados correctamente');
      navigate('/welcome');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al guardar los datos');
    }
  };

  useEffect(() => {
    const idUsuario = localStorage.getItem('id_usuario');
    const idEmpresa = localStorage.getItem('id_empresa');

    if (!idUsuario || !idEmpresa || idUsuario === '0' || idEmpresa === '0') {
      console.warn('ID inválido para usuario o empresa');
      return;
    }

    const cargarDatos = async () => {
      try {
        // Usuario
        const resUsuario = await fetch(`http://localhost:8080/api/usuarios/${idUsuario}`);
        if (!resUsuario.ok) throw new Error('Usuario no encontrado');
        const dataUsuario = await resUsuario.json();

        // Empresa
        const resEmpresa = await fetch(`http://localhost:8080/api/empresas/${idEmpresa}`);
        if (!resEmpresa.ok) {
          const errorText = await resEmpresa.text();
          throw new Error(errorText);
        }
        const dataEmpresa = await resEmpresa.json();

        setFormData((prev) => ({
          ...prev,
          nombreUsuario: dataUsuario.nombreUsuario || '',
          correo: dataUsuario.correo || '',
          empresa: dataEmpresa.nombreEmpresa || '',
          direccion: dataEmpresa.direccion || '',
          ruc: dataEmpresa.ruc || '',
        }));
      } catch (err) {
        console.error('Error al cargar datos:', err.message);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="generar-container">
      <aside className="generar-sidebar">
        <div className="generar-logo-bar" onClick={() => navigate('/welcome')}>
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

        <section className="generar-content">
          <h1>Configuración usuario</h1>
          <form className="generar-form">
            <div className="generar-grid">
              <label>Nombre de Usuario
                <input type="text" value={formData.nombreUsuario} onChange={(e) => handleInputChange('nombreUsuario', e.target.value)} />
              </label>
              <label>Correo
                <input type="email" value={formData.correo} onChange={(e) => handleInputChange('correo', e.target.value)} />
              </label>
              <label>Cambiar contraseña
                <input type="password" value={formData.contrasena} onChange={(e) => handleInputChange('contrasena', e.target.value)} />
              </label>
              <label>Confirmar contraseña
                <input type="password" value={formData.confirmar} onChange={(e) => handleInputChange('confirmar', e.target.value)} />
              </label>
            </div>

            <h2>Configuración empresa</h2>
            <div className="generar-grid">
              <label>Nombre empresa
                <input type="text" value={formData.empresa} onChange={(e) => handleInputChange('empresa', e.target.value)} />
              </label>
              <label>Dirección
                <input type="text" value={formData.direccion} onChange={(e) => handleInputChange('direccion', e.target.value)} />
              </label>
              <label>RUC
                <input type="text" value={formData.ruc} onChange={(e) => handleInputChange('ruc', e.target.value)} />
              </label>
              <label>Añadir logo
                <input type="file" onChange={handleFileChange} />
              </label>
            </div>

            <div className="generar-botones">
              <button type="button" onClick={handleAceptar}>Aceptar</button>
              <button type="button" onClick={handleCancelar} style={{ backgroundColor: 'black', color: 'white' }}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Configuracionpage;
