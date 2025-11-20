import React from 'react';
import Breadcrumb from './Breadcrumb';

const DashboardView = ({ title, breadcrumbs, children }) => {
  return (
    <div className="dashboard-view">
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="dashboard-view-content">
        {title && <h1 className="dashboard-view-title">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default DashboardView;