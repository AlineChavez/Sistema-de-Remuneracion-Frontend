import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/home/Homepage';
import Loginpage from './components/login/Loginpage';
import Registerpage from './components/register/Registerpage';
import Welcomepage from './components/welcome/Welcomepage';
import Boletaspage from './components/boletas/Boletaspage';
import Colaboradorespage from './components/colaboradores/Colaboradorespage';
import Generarboletapage from './components/generarboleta/Generarboletapage';
import Nuevotrabajadorpage from './components/nuevotrabajador/Nuevotrabajadorpage';
import Configuracionpage from './components/configuracionusuario/Configuracionpage';
import Boletagenerada from './components/formatoboleta/Boletagenerada';
import Editartrabajadorpage from './components/editartrabajador/Editartrabajadorpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/welcome" element={<Welcomepage />} />
        <Route path="/boletas" element={<Boletaspage />} />
        <Route path="/colaboradores" element={<Colaboradorespage />} />
        <Route path="/generarboleta" element={<Generarboletapage />} />
        <Route path="/nuevotrabajador" element={<Nuevotrabajadorpage />} />
        <Route path="/configuracionusuario" element={<Configuracionpage />} />
        <Route path="/formatoboleta" element={<Boletagenerada />} />
        {/* 👇 Nueva ruta de edición de trabajador */}
        <Route path="/editartrabajador/:id" element={<Editartrabajadorpage />} />
      </Routes>
    </Router>
  );
}

export default App;
