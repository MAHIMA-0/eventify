import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/AddEvent';

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/AddEvent" element={<AddEvent />} />

    </Routes>
  </BrowserRouter>
);

export default App;
