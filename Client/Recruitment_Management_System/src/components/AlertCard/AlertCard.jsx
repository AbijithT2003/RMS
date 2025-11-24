import React from "react";
import "./AlertCard.css";

const AlertCard = ({
  icon,
  title,
  subtitle,
  details = [],
  actionButton,
  severity = "info",
}) => {
  return (
    <div className={`alert-card alert-card-${severity}`}>
      <div className="alert-card-icon">
        <i className={icon}></i>
      </div>
      <div className="alert-card-content">
        <h3 className="alert-card-title">{title}</h3>
        {subtitle && <p className="alert-card-subtitle">{subtitle}</p>}
        {details.length > 0 && (
          <div className="alert-card-details">
            {details.map((detail, idx) => (
              <div key={idx} className="alert-detail-item">
                <span className="alert-detail-label">{detail.label}:</span>
                <span className="alert-detail-value">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        {actionButton && (
          <button className="alert-action-btn" onClick={actionButton.onClick}>
            {actionButton.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
