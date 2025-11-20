import React from 'react';
import Breadcrumb from './Breadcrumb';
import './DashboardView.css';

const DashboardView = ({ breadcrumbs, children }) => {
  return (
    <div className="dashboard-view">
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="dashboard-view-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardView;