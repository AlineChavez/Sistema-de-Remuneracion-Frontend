import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Editartrabajadorpage.css';
import logo from '../welcome/logo.png';

const EditarTrabajadorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tiposEntidad, setTiposEntidad] = useState([]);

  const [formData, setFormData] = useState({
    numeroDocumento: '',
    tipoDocumento: '',
    tipoEntidad: '',
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
    cargarTrabajador();
  }, []);

  const cargarDatos = async () => {
    try {
      const resDocs = await fetch('http://localhost:8080/api/tipodocumentos');
      const resEnts = await fetch('http://localhost:8080/api/tipoentidades');

      setTiposDocumento(await resDocs.json());
      setTiposEntidad(await resEnts.json());
    } catch (err) {
      alert('Error al cargar tipos');
    }
  };

  const cargarTrabajador = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/trabajadores`);
      const data = await res.json();
      const trabajador = data.find(t => t.idTrabajador === parseInt(id));
      if (!trabajador) return;

      const fecha = new Date(trabajador.fechaIngreso);

      setFormData({
        numeroDocumento: trabajador.numeroDocumento,
        tipoDocumento: tiposDocumento.find(td => td.idTipoDocumento === trabajador.idTipoDocumento)?.nombreDocumento || '',
        tipoEntidad: tiposEntidad.find(te => te.idTipoEntidad === trabajador.idTipoEntidad)?.nombreEntidad || '',
        razonSocial: trabajador.razonSocial,
        apellidoPaterno: trabajador.apellidoPaterno,
        apellidoMaterno: trabajador.apellidoMaterno,
        nombres: trabajador.nombres,
        direccionFiscal: trabajador.direccionFiscal,
        cargo: trabajador.cargo,
        dia: fecha.getDate().toString(),
        mes: meses[fecha.getMonth()],
        anio: fecha.getFullYear().toString(),
        email: trabajador.email,
        telefono: trabajador.telefono,
        nota: trabajador.nota
      });
    } catch (err) {
      alert('Error al cargar trabajador');
    }
  };

  const obtenerIdDocumento = (nombre) => tiposDocumento.find(td => td.nombreDocumento === nombre)?.idTipoDocumento || null;
  const obtenerIdEntidad = (nombre) => tiposEntidad.find(te => te.nombreEntidad === nombre)?.idTipoEntidad || null;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleActualizar = async () => {
    const fechaIngreso = `${formData.anio}-${String(meses.indexOf(formData.mes) + 1).padStart(2, '0')}-${String(formData.dia).padStart(2, '0')}`;

    const trabajador = {
      idTrabajador: parseInt(id),
      numeroDocumento: formData.numeroDocumento,
      idTipoDocumento: obtenerIdDocumento(formData.tipoDocumento),
      idTipoEntidad: obtenerIdEntidad(formData.tipoEntidad),
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trabajador)
      });

      if (!res.ok) throw new Error('Error al actualizar');

      alert('Trabajador actualizado correctamente');
      navigate('/colaboradores');
    } catch (err) {
      alert(err.message);
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
          <h1>Editar Trabajador</h1>

          <form className="generar-form">
            <div className="generar-grid">
              {/** Campos similares al nuevo trabajador (reutilizados) */}
              {Object.entries({
                'Número documento': 'numeroDocumento',
                'Razón social': 'razonSocial',
                'Apellido paterno': 'apellidoPaterno',
                'Apellido materno': 'apellidoMaterno',
                'Nombres completos': 'nombres',
                'Dirección fiscal': 'direccionFiscal',
                'Cargo': 'cargo',
                'Email principal': 'email',
                'Teléfono': 'telefono',
                'Nota': 'nota'
              }).map(([label, name]) => (
                <label key={name}>{label} <input name={name} value={formData[name]} onChange={handleChange} /></label>
              ))}

              <label>Tipo de documento
                <select name="tipoDocumento" className="select-grande" value={formData.tipoDocumento} onChange={handleChange}>
                  <option value="">Elegir</option>
                  {tiposDocumento.map(td => (
                    <option key={td.idTipoDocumento} value={td.nombreDocumento}>{td.nombreDocumento}</option>
                  ))}
                </select>
              </label>

              <label>Tipo de entidad
                <select name="tipoEntidad" className="select-grande" value={formData.tipoEntidad} onChange={handleChange}>
                  <option value="">Elegir</option>
                  {tiposEntidad.map(te => (
                    <option key={te.idTipoEntidad} value={te.nombreEntidad}>{te.nombreEntidad}</option>
                  ))}
                </select>
              </label>

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
            </div>

            <div className="generar-botones">
              <button type="button" onClick={handleActualizar}>Actualizar</button>
              <button type="button" style={{ backgroundColor: 'gray', color: 'white' }} onClick={() => navigate('/colaboradores')}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default EditarTrabajadorPage;
