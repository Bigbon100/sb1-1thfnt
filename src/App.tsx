import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBuilder from './pages/MenuBuilder';
import Dashboard from './pages/Dashboard';
import DishManagement from './pages/DishManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<DishManagement />} />
      </Routes>
    </Router>
  );
}

export default App;