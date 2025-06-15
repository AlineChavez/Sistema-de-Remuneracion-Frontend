import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/home/Homepage';
import Loginpage from './components/login/Loginpage';
import Registerpage from './components/register/Registerpage';
import Welcomepage from './components/welcome/Welcomepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/welcome" element={<Welcomepage />} />
      </Routes>
    </Router>
  );
}

export default App;

