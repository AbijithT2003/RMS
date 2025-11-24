import React from "react";
import Button from "../Button/Button";
import "./ApplicationCard.css";

const ApplicationCard = ({
  application,
  onUpdateStatus,
  onViewDetails,
  showActions = true,
}) => {
  /**
   * Map backend statuses to UI badge colors
   */
  const getStatusColor = (status) => {
    if (!status) return "submitted";

    switch (status) {
      case "SUBMITTED":
        return "submitted";
      case "UNDER_REVIEW":
        return "reviewed";
      case "SHORTLISTED":
        return "shortlisted";
      case "INTERVIEW_SCHEDULED":
        return "scheduled";
      case "INTERVIEWED":
        return "interviewed";
      case "SELECTED":
        return "accepted";
      case "REJECTED":
        return "rejected";
      case "WITHDRAWN":
        return "withdrawn";
      default:
        return "pending";
    }
  };

  return (
    <div className="application-card">
      <div className="application-header">
        <div className="applicant-info">
          <h4 className="applicant-name">
            {application.applicantName || "Unknown Applicant"}
          </h4>
          <p className="job-title">{application.jobTitle || "Unknown Job"}</p>
        </div>

        <span className={`status-badge ${getStatusColor(application.status)}`}>
          {application.status?.replaceAll("_", " ")}
        </span>
      </div>

      <div className="application-details">
        <div className="application-meta">
          <span className="applied-date">
            <i className="fas fa-calendar"></i>
            Applied:{" "}
            {new Date(application.appliedAt).toLocaleDateString() || "N/A"}
          </span>

          {(application.applicantEmail || application.email) && (
            <span className="applicant-email">
              <i className="fas fa-envelope"></i>
              {application.applicantEmail || application.email || "N/A"}
            </span>
          )}
        </div>
      </div>

      {showActions && (
        <div className="application-actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onViewDetails?.(application.id)}
          >
            <i className="fas fa-eye"></i>
            View Details
          </Button>

          {application.status === "PENDING" && (
            <>
              <Button
                variant="primary"
                size="small"
                onClick={() => onUpdateStatus?.(application.id, "UNDER_REVIEW")}
              >
                <i className="fas fa-check"></i>
                Review
              </Button>

              <Button
                variant="secondary"
                size="small"
                onClick={() => onUpdateStatus?.(application.id, "REJECTED")}
              >
                <i className="fas fa-times"></i>
                Reject
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
