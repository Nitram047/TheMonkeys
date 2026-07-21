// components/dashboard/DashboardLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="dashboard-layout">
      {/* Sidebar fijo */}
      <div className="dashboard-sidebar-wrapper">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Contenido principal */}
      <div className="dashboard-main-wrapper">
        {/* Header con botón de regreso */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <Link to="/" className="dashboard-back-btn">
              ← Volver al Home
            </Link>
          </div>
          <div className="dashboard-header-right">
            <span className="dashboard-user-badge">👤 Admin</span>
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