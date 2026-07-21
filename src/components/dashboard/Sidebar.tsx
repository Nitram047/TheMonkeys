// components/dashboard/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'images', label: ' Imágenes', icon: '🖼️' },
    { id: 'admins', label: ' Admins', icon: '👤' },
    { id: 'home', label: ' Home Preview', icon: '👁️' },
  ];

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar-header">
        <h2> THEMONKEYS</h2>
        <span className="dashboard-sidebar-subtitle">Admin Panel</span>
      </div>

      <nav className="dashboard-sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`dashboard-sidebar-btn ${activeTab === item.id ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="dashboard-sidebar-footer">
        <Link to="/" className="sidebar-footer-link">
           Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;