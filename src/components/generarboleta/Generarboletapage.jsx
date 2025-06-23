import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Generarboletapage.css';
import logo from '../welcome/logo.png';

const Generarboletas = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [retencion, setRetencion] = useState(false);
  const [bancarizado, setBancarizado] = useState(false);
  const [trabajadores, setTrabajadores] = useState([]);

  const [formData, setFormData] = useState({
    correlativo: '',
    trabajador: '',
    tipoBoleta: '',
    dia: '',
    mes: '',
    anio: '',
    numeroBoleta: '',
    moneda: '',
    tipoCambio: '',
    sueldoBasico: '',
    asignacionFamiliar: '',
    snp: '',
    afp: '',
    comisionAfp: '',
    seguroAfp: '',
    totalNeto: '',
    essalud: '',
    descripcion: ''
  });

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const años = Array.from({ length: 10 }, (_, i) => 2025 - i);

  useEffect(() => {
    fetch('http://localhost:8080/api/trabajadores')
      .then(res => res.json())
      .then(data => setTrabajadores(data))
      .catch(err => {
        console.error('Error al cargar trabajadores:', err);
        alert('No se pudieron cargar los trabajadores');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAceptar = () => {
    const datosFinales = {
      ...formData,
      retencion,
      bancarizado,
    };
    localStorage.setItem('boletaGenerada', JSON.stringify(datosFinales));
    navigate('/formatoboleta');
  };

  return (
    <div className="generar-container">
      <aside className="generar-sidebar">
        <div className="generar-logo-bar" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
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
        <header className="generar-user-section">
          <div className="generar-user-info">
            <span className="generar-user-icon">👤</span>
            <button className="generar-user-button" onClick={() => setMenuOpen(!menuOpen)}>Usuario</button>
          </div>
          {menuOpen && (
            <div className="generar-dropdown">
              <button onClick={() => navigate('/configuracionusuario')}>Configuración</button>
              <hr />
              <button onClick={() => window.location.href = '/'}>Cerrar sesión</button>
            </div>
          )}
        </header>

        <section className="generar-content">
          <h1>Nueva Boleta de Pago</h1>

          <form className="generar-form">
            <div className="generar-grid">
              <label>Correlativo <input name="correlativo" value={formData.correlativo} onChange={handleChange} /></label>

              <div className="grupo-trabajador">
                <label className="campo-trabajador">
                  Trabajador
                  <select name="trabajador" className="select-grande" value={formData.trabajador} onChange={handleChange}>
                    <option value="">Elegir</option>
                    {trabajadores.map(t => (
                      <option key={t.idTrabajador} value={t.idTrabajador}>
                        {t.nombres} {t.apellidos}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="colaboradores-nuevo" type="button" onClick={() => navigate('/nuevotrabajador')}>Nuevo trabajador</button>
              </div>

              <label>Tipo de boleta
                <select name="tipoBoleta" className="select-grande" value={formData.tipoBoleta} onChange={handleChange}>
                  <option value="">Elegir</option>
                  <option>AFP Habitual</option>
                  <option>AFP Mixta</option>
                  <option>AFP Proyecto</option>
                  <option>SNP</option>
                </select>
              </label>

              <label>Fecha de emisión
                <div className="generar-selects">
                  <select name="dia" value={formData.dia} onChange={handleChange}>{dias.map(d => <option key={d}>{d}</option>)}</select>
                  <select name="mes" value={formData.mes} onChange={handleChange}>{meses.map((m, i) => <option key={i}>{m}</option>)}</select>
                  <select name="anio" value={formData.anio} onChange={handleChange}>{años.map(a => <option key={a}>{a}</option>)}</select>
                </div>
              </label>

              <label>Número de boleta <input name="numeroBoleta" value={formData.numeroBoleta} onChange={handleChange} /></label>

              <label>¿Retención Renta?
                <div className="switch">
                  <input type="checkbox" id="retencion" checked={retencion} onChange={() => setRetencion(!retencion)} />
                  <label htmlFor="retencion"></label>
                </div>
              </label>

              <label>Moneda
                <select name="moneda" className="select-grande" value={formData.moneda} onChange={handleChange}>
                  <option value="">Elegir</option>
                  <option>1 - SOLES</option>
                  <option>2 - DÓLARES</option>
                </select>
              </label>

              <label>Tipo de cambio <input name="tipoCambio" value={formData.tipoCambio} onChange={handleChange} /></label>
              <label>Remuneración básica <input name="sueldoBasico" value={formData.sueldoBasico} onChange={handleChange} /></label>
              <label>Asignación familiar <input name="asignacionFamiliar" value={formData.asignacionFamiliar} onChange={handleChange} /></label>
              <label>SNP <input name="snp" value={formData.snp} onChange={handleChange} /></label>
              <label>AFP <input name="afp" value={formData.afp} onChange={handleChange} /></label>
              <label>Comisión AFP <input name="comisionAfp" value={formData.comisionAfp} onChange={handleChange} /></label>
              <label>Seguro AFP <input name="seguroAfp" value={formData.seguroAfp} onChange={handleChange} /></label>
              <label>Total neto <input name="totalNeto" value={formData.totalNeto} onChange={handleChange} /></label>
              <label>ESSALUD - regular <input name="essalud" value={formData.essalud} onChange={handleChange} /></label>

              <label>¿Bancarizado?
                <div className="switch">
                  <input type="checkbox" id="bancarizado" checked={bancarizado} onChange={() => setBancarizado(!bancarizado)} />
                  <label htmlFor="bancarizado"></label>
                </div>
              </label>

              <label>Descripción (opcional)
                <textarea name="descripcion" rows="2" value={formData.descripcion} onChange={handleChange}></textarea>
              </label>
            </div>

            <div className="generar-botones">
              <button type="button" onClick={handleAceptar}>Aceptar</button>
              <button type="button" onClick={() => navigate('/boletas')}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Generarboletas;
