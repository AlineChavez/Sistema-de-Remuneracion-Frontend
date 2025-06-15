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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (
      !formData.usuario ||
      !formData.correo ||
      !formData.contraseña ||
      formData.contraseña !== formData.confirmar
    ) {
      alert('Verifica que todos los campos estén completos y que las contraseñas coincidan.');
      return;
    }

    // Simula que se registró correctamente
    alert('Registro exitoso.');
    navigate('/welcome'); // Redirige a Welcomepage
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
