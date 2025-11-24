import React from "react";
import "./StatsCard.css";

const StatsCard = ({
  icon,
  label,
  value,
  trend,
  trendDirection = "up",
  color = "primary",
  onClick,
}) => {
  return (
    <div
      className={`stats-card stats-card-${color}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="stats-card-icon">
        <i className={icon}></i>
      </div>
      <div className="stats-card-content">
        <p className="stats-card-label">{label}</p>
        <div className="stats-card-value-group">
          <h3 className="stats-card-value">{value}</h3>
          {trend && (
            <span className={`stats-card-trend trend-${trendDirection}`}>
              <i
                className={`fas fa-arrow-${
                  trendDirection === "up" ? "up" : "down"
                }`}
              ></i>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
