import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ items, onNavigate }) => {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {item.onClick ? (
            <button 
              className="breadcrumb-link" 
              onClick={() => item.onClick()}
            >
              {item.label}
            </button>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;