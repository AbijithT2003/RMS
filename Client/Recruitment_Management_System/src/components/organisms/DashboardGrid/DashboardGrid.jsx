import React from 'react';
import './DashboardGrid.css';

const DashboardGrid = ({ cards }) => {
  return (
    <div className="dashboard-grid">
      {cards.map((card, index) => (
        <div key={index} className="dashboard-card" onClick={card.onClick}>
          <div className="card-icon">
            <i className={card.icon}></i>
          </div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardGrid;