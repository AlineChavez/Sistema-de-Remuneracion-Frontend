import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nuevotrabajadorpage.css';
import logo from '../welcome/logo.png';

const Nuevotrabajadorpage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tiposEntidad, setTiposEntidad] = useState([]);

  const [formData, setFormData] = useState({
    numeroDocumento: '',
    idTipoDocumento: '',
    idTipoEntidad: '',
    razonSocial: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombres: '',
    direccionFiscal: '',
    cargo: '',
    dia: '',
    mes: '',
    anio: '',
    email: '',
    telefono: '',
    nota: ''
  });

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const años = Array.from({ length: 10 }, (_, i) => 2025 - i);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const resDocs = await fetch('http://localhost:8080/api/tipodocumentos');
      const resEnts = await fetch('http://localhost:8080/api/tipoentidades');
      setTiposDocumento(await resDocs.json());
      setTiposEntidad(await resEnts.json());
    } catch (err) {
      console.error('Error al cargar tipos:', err);
      alert('No se pudieron cargar los tipos de documento y entidad.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (redirigirANuevaPagina) => {
    if (!formData.dia || !formData.mes || !formData.anio) {
      alert('Completa la fecha de ingreso.');
      return;
    }

    const fechaIngreso = `${formData.anio}-${String(meses.indexOf(formData.mes) + 1).padStart(2, '0')}-${String(formData.dia).padStart(2, '0')}`;

    const trabajador = {
      numeroDocumento: formData.numeroDocumento,
      idTipoDocumento: parseInt(formData.idTipoDocumento),
      idTipoEntidad: parseInt(formData.idTipoEntidad),
      razonSocial: formData.razonSocial,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      nombres: formData.nombres,
      direccionFiscal: formData.direccionFiscal,
      cargo: formData.cargo,
      fechaIngreso,
      email: formData.email,
      telefono: formData.telefono,
      nota: formData.nota
    };

    try {
      const res = await fetch('http://localhost:8080/api/trabajadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trabajador)
      });

      if (!res.ok) throw new Error(await res.text());

      alert('Trabajador registrado con éxito.');

      if (redirigirANuevaPagina) {
        navigate('/colaboradores');
      } else {
        setFormData({
          numeroDocumento: '',
          idTipoDocumento: '',
          idTipoEntidad: '',
          razonSocial: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          nombres: '',
          direccionFiscal: '',
          cargo: '',
          dia: '',
          mes: '',
          anio: '',
          email: '',
          telefono: '',
          nota: ''
        });
      }
    } catch (err) {
      console.error('Error al guardar:', err.message);
      alert(`Error al guardar: ${err.message}`);
    }
  };

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
              <label>Número documento <input name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} /></label>

              <label>Tipo de documento
                <select name="idTipoDocumento" className="select-grande" value={formData.idTipoDocumento} onChange={handleChange}>
                  <option value="">Elegir</option>
                  {tiposDocumento.map(td => (
                    <option key={td.idTipoDocumento} value={td.idTipoDocumento}>{td.nombreDocumento}</option>
                  ))}
                </select>
              </label>

              <label>Tipo de entidad
                <select name="idTipoEntidad" className="select-grande" value={formData.idTipoEntidad} onChange={handleChange}>
                  <option value="">Elegir</option>
                  {tiposEntidad.map(te => (
                    <option key={te.idTipoEntidad} value={te.idTipoEntidad}>{te.nombreEntidad}</option>
                  ))}
                </select>
              </label>

              <label>Razón social <input name="razonSocial" value={formData.razonSocial} onChange={handleChange} /></label>
              <label>Apellido paterno <input name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} /></label>
              <label>Apellido materno <input name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} /></label>
              <label>Nombres completos <input name="nombres" value={formData.nombres} onChange={handleChange} /></label>
              <label>Dirección fiscal <input name="direccionFiscal" value={formData.direccionFiscal} onChange={handleChange} /></label>
              <label>Cargo <input name="cargo" value={formData.cargo} onChange={handleChange} /></label>

              <label>Fecha de ingreso
                <div className="generar-selects">
                  <select name="dia" value={formData.dia} onChange={handleChange}>
                    <option value="">Día</option>
                    {dias.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <select name="mes" value={formData.mes} onChange={handleChange}>
                    <option value="">Mes</option>
                    {meses.map((m, i) => <option key={i}>{m}</option>)}
                  </select>
                  <select name="anio" value={formData.anio} onChange={handleChange}>
                    <option value="">Año</option>
                    {años.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </label>

              <label>Email principal <input name="email" value={formData.email} onChange={handleChange} /></label>
              <label>Teléfono <input name="telefono" value={formData.telefono} onChange={handleChange} /></label>
              <label>Nota <input name="nota" value={formData.nota} onChange={handleChange} /></label>
            </div>

            <div className="generar-botones">
              <button type="button" onClick={() => handleGuardar(true)}>Aceptar</button>
              <button type="button" style={{ backgroundColor: 'black', color: 'white' }}
                onClick={() => handleGuardar(false)}>
                Aceptar y nuevo trabajador
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Nuevotrabajadorpage;
