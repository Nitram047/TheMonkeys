// src/App.tsx
import React from 'react';
import Layout from './components/common/layout';
import BlogList from './pages/blogList';

import './App.css';

import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";

import Gallery from './pages/gallery';
import Dashboard from './pages/dashboard';
import Home from './pages/home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Estas rutas SÍ usan el Layout público */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/blog" element={<Layout><BlogList /></Layout>} />
        
        {/* Dashboard NO usa el Layout público, tiene su propio layout */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;