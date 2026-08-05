// src/components/common/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../src/firebase/config"; // Ajusta la ruta según tu estructura
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./../css/Header.css";
import logo from '../assets/Logo_retro _The Monkeys_ en azul y turquesa.png';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Verificar estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="header">
      <div className="top-bar">
        <nav className="nav-left">
          <Link to='/'>Home</Link>
          <Link to='/gallery'>Gallery</Link>
        </nav>

        <div className="logo">
          <img src={logo} alt='logo de The Monkeys' />
        </div>

        <nav className="nav-right">
          <Link to='/blog'>Blog</Link>
          
          {/* ✅ Si está logueado, muestra Dashboard y Cerrar Sesión */}
          {user ? (
            <>
              <Link to='/dashboard'>Dashboard</Link>
              <button 
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '2px solid #ff4444',
                  color: '#ff4444',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: "'Comic Sans MS', cursive",
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ff4444';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ff4444';
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            /* ✅ Si NO está logueado, muestra Iniciar Sesión */
            <Link to='/login' style={{ color: '#ffd93d', fontWeight: 'bold' }}>
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>

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