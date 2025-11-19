import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ navigationItems}) => {
  const [activeSection, setActiveSection] = useState(null);
//   const navigate = useNavigate(); 
//   const location = useLocation();

//   const handleItemClick = (item) => {
//     if (item.href) {
//       navigate(item.href);
//       if (onNavigate) {
//         onNavigate(item);
//       }
//     }
//   };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navigationItems.map((section, index) => (
          <div key={index} className="sidebar-section">
            <button
              className={`sidebar-section-header ${activeSection === index ? 'active' : ''}`}
              onClick={() => toggleSection(index)}
            >
              <span>{section.label}</span>
              <i className={`fas fa-chevron-${activeSection === index ? 'up' : 'down'}`}></i>
            </button>
            
            {activeSection === index && (
              <div className="sidebar-items">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
                    // onClick={() => handleItemClick(item)}
                  >
                    {item.icon && <i className={item.icon}></i>}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;