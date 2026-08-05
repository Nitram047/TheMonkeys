// src/components/dashboard/DashboardLayout.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
}) => {
  const navigate = useNavigate();

  // 🔹 Función para cerrar sesión
  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      try {
        await signOut(auth);
        navigate('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
      }
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar fijo */}
      <div className="dashboard-sidebar-wrapper">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Contenido principal */}
      <div className="dashboard-main-wrapper">
        {/* Header con botones de navegación */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <Link to="/" className="dashboard-back-btn">
              ← Volver al Home
            </Link>
          </div>
          <div className="dashboard-header-right" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="dashboard-user-badge">👤 Admin</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                border: '3px solid #1a1a1a',
                borderRadius: '8px',
                background: '#fee2e2',
                cursor: 'pointer',
                fontFamily: "'Comic Sans MS', cursive",
                fontWeight: 'bold',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="dashboard-content-area">
          <div className="dashboard-content-inner">
            <h1 className="dashboard-title">Panel de Administración</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;