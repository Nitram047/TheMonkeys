// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/common/layout';
import Home from './pages/home';
import Gallery from './pages/gallery';
import BlogList from './pages/blogList';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/blog" element={<Layout><BlogList /></Layout>} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Layout><h1>404</h1></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;