import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ImageManager from '../components/dashboard/ImageManager';
import AdminManager from '../components/dashboard/AdminManager';
import HomePreview from '../components/dashboard/HomePreview';
import '../css/dashboard.css'; // Si tienes estilos específicos

type TabType = 'images' | 'admins' | 'home';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('images');

  const renderContent = () => {
    switch (activeTab) {
      case 'images':
        return <ImageManager />;
      case 'admins':
        return <AdminManager />;
      case 'home':
        return <HomePreview />;
      default:
        return <ImageManager />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;