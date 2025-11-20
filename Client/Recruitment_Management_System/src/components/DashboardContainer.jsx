import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/context/AuthContext';
import Header from './organisms/Header/Header';

const DashboardContainer = ({ navigationItems, children, defaultView = 'dashboard' }) => {
  const [activeView, setActiveView] = useState(defaultView);
  const navigate = useNavigate();
  const { logout } = useAuth();

  console.log('DashboardContainer rendered:', { activeView, navigationItems });

  const handleNavigation = async (item) => {
    console.log('Navigation clicked:', item);
    if (item.label === 'Logout') {
      await logout();
      navigate('/');
    } else if (item.view) {
      setActiveView(item.view);
    }
  };

  try {
    return (
      <div className="dashboard">
        <Header 
          navigationItems={navigationItems} 
          onNavigate={handleNavigation}
          showAuthButtons={false} 
        />
        <main className="dashboard-main">
          {children(activeView, setActiveView)}
        </main>
      </div>
    );
  } catch (error) {
    console.error('DashboardContainer error:', error);
    return <div>Dashboard Error: {error.message}</div>;
  }
};

export default DashboardContainer;