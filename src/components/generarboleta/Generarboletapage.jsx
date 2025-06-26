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
  const [tiposBoleta, setTiposBoleta] = useState([]);
  const [monedas, setMonedas] = useState([]);

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
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [trabRes, tipoBolRes, monRes] = await Promise.all([
        fetch('http://localhost:8080/api/trabajadores'),
        fetch('http://localhost:8080/api/tipoboletas'),
        fetch('http://localhost:8080/api/monedas'),
      ]);

      const trabajadores = await trabRes.json();
      const tiposBoleta = await tipoBolRes.json();
      const monedas = await monRes.json();

      setTrabajadores(trabajadores);
      setTiposBoleta(tiposBoleta);
      setMonedas(monedas);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      alert('Error al cargar trabajadores, tipos de boleta o monedas.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAceptar = async () => {
      const idUsuario = parseInt(localStorage.getItem('id_usuario'));

      if (!idUsuario) {
        alert("⚠️ No se encontró el ID de usuario. Por favor, inicia sesión nuevamente.");
        return;
      }

      const fechaEmision = `${formData.anio}-${String(meses.indexOf(formData.mes) + 1).padStart(2, '0')}-${String(formData.dia).padStart(2, '0')}`;

      const boleta = {
        correlativo: formData.correlativo,
        numeroBoleta: formData.numeroBoleta,
        idTrabajador: parseInt(formData.trabajador) || 0,
        idTipoBoleta: parseInt(formData.tipoBoleta) || 0,
        fechaEmision,
        retencionRentaAplica: retencion,
        idMoneda: parseInt(formData.moneda) || 0,
        tipoCambio: parseFloat(formData.tipoCambio) || 0,
        remuneracionBasica: parseFloat(formData.sueldoBasico) || 0,
        asignacionFamiliar: parseFloat(formData.asignacionFamiliar) || 0,
        retencionRenta: retencion ? 70.0 : 0.0,
        snp: parseFloat(formData.snp) || 0,
        afp: parseFloat(formData.afp) || 0,
        comisionAfp: parseFloat(formData.comisionAfp) || 0,
        seguroAfp: parseFloat(formData.seguroAfp) || 0,
        essaludRegular: parseFloat(formData.essalud) || 0,
        bancarizado,
        descripcion: formData.descripcion,
        rutaPdf: `/boletas/pdf/${formData.numeroBoleta}.pdf`,
        fechaCreacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
        idUsuario
      };

      try {
        const res = await fetch('http://localhost:8080/api/boletas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(boleta)
        });

        if (!res.ok) throw new Error(await res.text());

        localStorage.setItem('boleta_generada', JSON.stringify({
          numero: boleta.numeroBoleta,
          tipoBoleta: tiposBoleta.find(t => t.idTipoBoleta === parseInt(boleta.idTipoBoleta))?.nombreTipoBoleta || '',
          fecha: boleta.fechaEmision,
          empresa: JSON.parse(localStorage.getItem('empresa')) || {},
          trabajador: trabajadores.find(t => t.idTrabajador === parseInt(boleta.idTrabajador)) || {},
          ingresos: [
            { concepto: 'Sueldo Básico', monto: boleta.remuneracionBasica },
            { concepto: 'Asignación Familiar', monto: boleta.asignacionFamiliar }
          ],
          descuentos: [
            { concepto: 'SNP', monto: boleta.snp },
            { concepto: 'AFP', monto: boleta.afp },
            { concepto: 'Comisión AFP', monto: boleta.comisionAfp },
            { concepto: 'Seguro AFP', monto: boleta.seguroAfp },
            { concepto: 'Retención Renta', monto: boleta.retencionRenta }
          ],
          aportes: [
            { concepto: 'Essalud', monto: boleta.essaludRegular }
          ]
        }));

        alert('✅ Boleta guardada en la base de datos.');
        navigate('/formatoboleta');
      } catch (err) {
        alert('❌ Error al guardar boleta: ' + err.message);
      }
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
                  {tiposBoleta.map(tb => (
                    <option key={tb.idTipoBoleta} value={tb.idTipoBoleta}>{tb.nombreTipoBoleta}</option>
                  ))}
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
                  {monedas.map(m => (
                    <option key={m.idMoneda} value={m.idMoneda}>{m.nombreMoneda}</option>
                  ))}
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