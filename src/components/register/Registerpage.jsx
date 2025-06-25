import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registerpage.css';

const Registerpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    correo: '',
    contrasenaHash: '',
    confirmar: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombreUsuario || !formData.correo || !formData.contrasenaHash || !formData.confirmar) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!validarCorreo(formData.correo)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (formData.contrasenaHash.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (formData.contrasenaHash !== formData.confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // 1. Crear usuario
      const res = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreUsuario: formData.nombreUsuario,
          correo: formData.correo,
          contrasenaHash: formData.contrasenaHash
        })
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || 'Error al registrar usuario');
        return;
      }

      // 2. Login automático después de registrar
      const loginRes = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: formData.correo,
          contrasenaHash: formData.contrasenaHash
        })
      });

      const usuario = await loginRes.json();

      if (!loginRes.ok || !usuario.idUsuario) {
        setError('Login automático falló');
        return;
      }

      // ✅ Guardar ID de usuario y empresa
      localStorage.setItem('id_usuario', usuario.idUsuario);
      localStorage.setItem('id_empresa', usuario.idEmpresa); // asegúrate que venga en la respuesta
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // 3. Crear sesión
      const sesionRes = await fetch('http://localhost:8080/api/sesiones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario: usuario.idUsuario })
      });

      const sesion = await sesionRes.json();

      if (!sesionRes.ok || !sesion.idSesion) {
        setError('Registro exitoso, pero error al crear sesión');
        return;
      }

      localStorage.setItem('idSesion', sesion.idSesion);
      navigate('/welcome');

    } catch (err) {
      console.error('Error en el registro:', err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombreUsuario"
            placeholder="Usuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
          />
          <input
            type="password"
            name="contrasenaHash"
            placeholder="Contraseña"
            value={formData.contrasenaHash}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmar"
            placeholder="Confirmar contraseña"
            value={formData.confirmar}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrarse</button>
        </form>
        <p className="login-text">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registerpage;
