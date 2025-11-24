import React from "react";
import "./NotificationDialog.css";

const NotificationDialog = ({ notifications, onDismiss }) => {
  const getIcon = (type) => {
    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-times-circle",
      warning: "fas fa-exclamation-circle",
      info: "fas fa-info-circle",
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <i
              className={`notification-icon ${getIcon(notification.type)}`}
            ></i>
            <div className="notification-message">
              {notification.title && (
                <h4 className="notification-title">{notification.title}</h4>
              )}
              <p className="notification-text">{notification.message}</p>
            </div>
          </div>
          <button
            className="notification-close"
            onClick={() => onDismiss(notification.id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationDialog;
