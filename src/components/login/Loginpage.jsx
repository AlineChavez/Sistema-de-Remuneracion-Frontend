import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Loginpage.css';

const Loginpage = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!correo || !contrasena) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasenaHash: contrasena })
      });

      if (!res.ok) {
        const errorText = await res.text();
        setError(errorText);
        return;
      }

      const usuario = await res.json();

      // Registrar sesión si login fue exitoso
      const sesionRes = await fetch('http://localhost:8080/api/sesiones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario: usuario.idUsuario })
      });

      const sesion = await sesionRes.json();

      if (!sesionRes.ok || !sesion.idSesion) {
        setError('Login correcto, pero error al registrar sesión');
        return;
      }

      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('idSesion', sesion.idSesion);
      navigate('/welcome');
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Ingresar</button>
        </form>
        <p className="signup-text">
          ¿No tienes cuenta? <Link to="/register">Crear una</Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
