/*
import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
      width:'100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',  //Esto centra el contenido del header 
        textAlign: 'center'
      }}>
        <h1>Mi Aplicación React</h1>
        <nav>
          <a href="#" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>
            Inicio
          </a>
          <a href="#" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>
            Acerca de
          </a>
          <a href="#" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
*/
import React from "react";
import "./../css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Nivel superior */}
      <div className="top-bar">
        <nav className="nav-left">
            <Link to='/'>Inicio</Link>
            <Link to='/dashboard'>Dashboard</Link>
        </nav>

        <div className="logo">
          <img src="/../assets/Logo_TheMonkeys_2.jpeg" alt="Logo" />
        </div>

        <nav className="nav-right">
          <a href="#">Blog</a>
          <a href="#">Contacto</a>
        </nav>
      </div>

      {/* Nivel inferior */}
      <div className="bottom-bar">
        <nav className="main-nav">
          <a href="#">Categoría 1</a>
          <a href="#">Categoría 2</a>
          <a href="#">Categoría 3</a>
          <a href="#">Categoría 4</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;