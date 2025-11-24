import React from "react";
import "./PipelineCard.css";

const PipelineCard = ({
  label,
  count,
  percentage,
  color = "primary",
  icon,
}) => {
  return (
    <div className={`pipeline-card pipeline-card-${color}`}>
      <div className="pipeline-card-header">
        <div className="pipeline-card-info">
          {icon && <i className={`${icon} pipeline-card-icon`}></i>}
          <span className="pipeline-card-label">{label}</span>
        </div>
        <span className="pipeline-card-percentage">{percentage}%</span>
      </div>
      <div className="pipeline-card-bar">
        <div
          className={`pipeline-card-fill pipeline-fill-${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="pipeline-card-count">{count} applicants</div>
    </div>
  );
};

export default PipelineCard;
