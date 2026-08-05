// src/pages/login.tsx (agrega el botón de volver)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ← Agrega Link
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Login con Email/Password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f0f0',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        border: '6px solid #1a1a1a',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '20px 20px 0 rgba(0,0,0,0.1)',
        position: 'relative' // ← Agrega esto
      }}>
        {/* ← BOTÓN VOLVER AL HOME */}
        <Link to="/" style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          textDecoration: 'none',
          color: '#4a5568',
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          ← Volver
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
          <h1 style={{ 
            fontFamily: "'Bangers', cursive",
            fontSize: '2.5rem',
            margin: 0,
            textShadow: '4px 4px 0 #ffd93d'
          }}>
            🐵 THEMONKEYS
          </h1>
          <p style={{ color: '#4a5568', fontFamily: "'Comic Sans MS', cursive" }}>
            Panel de Administración
          </p>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem',
            background: '#fee2e2',
            border: '3px solid #ef4444',
            borderRadius: '8px',
            color: '#991b1b',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '4px solid #1a1a1a',
              borderRadius: '12px',
              marginBottom: '1rem',
              fontSize: '1rem',
              fontFamily: "'Comic Sans MS', cursive",
              boxSizing: 'border-box'
            }}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '4px solid #1a1a1a',
              borderRadius: '12px',
              marginBottom: '1rem',
              fontSize: '1rem',
              fontFamily: "'Comic Sans MS', cursive",
              boxSizing: 'border-box'
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '4px solid #1a1a1a',
              borderRadius: '12px',
              background: '#ffd93d',
              fontSize: '1.1rem',
              fontFamily: "'Bangers', cursive",
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '10px 10px 0 rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.1)';
            }}
          >
            {loading ? '⏳ Cargando...' : '🔑 Iniciar Sesión'}
          </button>
        </form>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          margin: '1.5rem 0'
        }}>
          <div style={{ flex: 1, height: '3px', background: '#e2e8f0' }} />
          <span style={{ color: '#4a5568', fontFamily: "'Comic Sans MS', cursive" }}>o</span>
          <div style={{ flex: 1, height: '3px', background: '#e2e8f0' }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '4px solid #1a1a1a',
            borderRadius: '12px',
            background: '#ffffff',
            fontSize: '1rem',
            fontFamily: "'Comic Sans MS', cursive",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.1)',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '10px 10px 0 rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.1)';
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>G</span>
          Continuar con Google
        </button>
      </div>
    </div>
  );
};

export default Login;