// src/App.tsx
import React from 'react';
import Layout from './components/common/layout';
import BlogList from './pages/blogList';
import Dashboard from './pages/dashboard';

import Home from './pages/home';
import './App.css';

import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        {/* Ruta a home*/}
        <Route path='/' element={<Home/>}/>

        {/*Ruta a otras */}
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Layout>
    </BrowserRouter>
    
  );
}

export default App;