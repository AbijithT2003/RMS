import React, { useState, useCallback } from "react";
import { NotificationContext } from "./NotificationContextSetup";
import NotificationDialog from "../../components/NotificationDialog/NotificationDialog";

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(
    (message, type = "info", duration = 5000, title = null) => {
      const id = Date.now();
      const notification = {
        id,
        message,
        type, // "success", "error", "warning", "info"
        title,
      };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          dismissNotification(id);
        }, duration);
      }

      return id;
    },
    [dismissNotification]
  );

  const success = useCallback(
    (message, title = "Success", duration = 5000) => {
      return showNotification(message, "success", duration, title);
    },
    [showNotification]
  );

  const error = useCallback(
    (message, title = "Error", duration = 5000) => {
      return showNotification(message, "error", duration, title);
    },
    [showNotification]
  );

  const warning = useCallback(
    (message, title = "Warning", duration = 5000) => {
      return showNotification(message, "warning", duration, title);
    },
    [showNotification]
  );

  const info = useCallback(
    (message, title = "Information", duration = 5000) => {
      return showNotification(message, "info", duration, title);
    },
    [showNotification]
  );

  const value = {
    showNotification,
    dismissNotification,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationDialog
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </NotificationContext.Provider>
  );
};
