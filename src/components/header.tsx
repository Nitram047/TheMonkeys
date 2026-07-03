
import React from "react";
import "./../css/Header.css";
import logo from '../assets/Logo_retro _The Monkeys_ en azul y turquesa.png';
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
          <img src={logo} alt='logo de The Monkeys' />
        </div>

        <nav className="nav-right">
          <a href="#">Blog</a>
          <a href="#">Contacto</a>
        </nav>
      </div>

      {/* Nivel inferior */}
      <div className="bottom-bar">
        <nav className="main-nav">
          <a href="#">Decals</a>
          <a href="#">Customs</a>
          <a href="#">Llantas de goma</a>
          <a href="#">Otros</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;