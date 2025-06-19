import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registerpage.css';

const Registerpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
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

  const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: campos vacíos
    if (!formData.usuario || !formData.correo || !formData.contraseña || !formData.confirmar) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Validación: correo válido
    if (!validarCorreo(formData.correo)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    // Validación: contraseña mínima
    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Validación: contraseñas iguales
    if (formData.contraseña !== formData.confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Registro simulado exitoso
    alert('Registro exitoso.');
    navigate('/welcome');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={formData.usuario}
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
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
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
