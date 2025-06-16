import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/home/Homepage';
import Loginpage from './components/login/Loginpage';
import Registerpage from './components/register/Registerpage';
import Welcomepage from './components/welcome/Welcomepage';
import Boletaspage from './components/boletas/Boletaspage';
import Colaboradorespage from './components/colaboradores/Colaboradorespage';
import Generarboletapage from './components/generarboleta/Generarboletapage'; // 👈 Asegúrate que el nombre del archivo sea correcto

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
      </Routes>
    </Router>
  );
}

export default App;
