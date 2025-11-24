import React from "react";
import "./TimelineItem.css";

const TimelineItem = ({
  icon,
  title,
  description,
  timestamp,
  color = "primary",
  status,
}) => {
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className={`timeline-item timeline-${color}`}>
      <div className={`timeline-dot timeline-dot-${color}`}>
        <i className={icon}></i>
      </div>
      <div className="timeline-content">
        <div className="timeline-header">
          <h4 className="timeline-title">{title}</h4>
          {status && (
            <span className={`timeline-status timeline-status-${status}`}>
              {status}
            </span>
          )}
        </div>
        <p className="timeline-description">{description}</p>
        <small className="timeline-time">{formatTime(timestamp)}</small>
      </div>
    </div>
  );
};

export default TimelineItem;
