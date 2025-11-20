import React from "react";
import Button from "../../atoms/Button/Button";
import "./JobCard.css";

const JobCard = ({
  job,
  onApply,
  onEdit,
  onDelete,
  onViewApplications,
  onSave,
  onUnsave,
  isSaved = false,
  showActions = true,
  isRecruiter = false,
}) => {
  // Normalize applications array
  const applications = Array.isArray(job.applications)
    ? job.applications
    : job.applications?.content || [];

  const isClosed = job.status !== "ACTIVE";

  return (
    <div className={`job-card ${isClosed ? "closed-job" : ""}`}>
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className={`job-type ${job.type?.toLowerCase()}`}>
          {job.type?.replace("_", " ")}
        </span>
        {isClosed && <span className="job-closed-badge">Closed</span>}
      </div>

      <div className="job-details">
        <div className="job-meta">
          <span className="job-location">
            <i className="fas fa-map-marker-alt"></i>
            {job.location}
          </span>
          {job.salary && (
            <span className="job-salary">
              <i className="fas fa-dollar-sign"></i>
              {job.salary}
            </span>
          )}
        </div>

        <p className="job-description">{job.description}</p>

        {job.requirements && (
          <div className="job-requirements">
            <strong>Requirements:</strong>
            <p>{job.requirements}</p>
          </div>
        )}

        <div className="job-applicants">
          <strong>Applicants:</strong>
          {applications.length === 0 ? (
            <p className="no-applicants">No applicants yet</p>
          ) : (
            <ul className="applicant-list">
              {applications.map((app) => (
                <li key={app.id}>{app.applicantName || "Unnamed Applicant"}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showActions && (
        <div className="job-actions">
          {isRecruiter ? (
            <>
              <Button
                variant="secondary"
                size="small"
                onClick={() => onViewApplications?.(job.id)}
              >
                <i className="fas fa-users"></i>
                Applications
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={() => onEdit?.(job.id)}
              >
                <i className="fas fa-edit"></i>
                Edit
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={() => onDelete?.(job.id)}
              >
                <i className="fas fa-trash"></i>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={isClosed ? "disabled" : "primary"}
                size="medium"
                onClick={() => !isClosed && onApply?.(job.id)}
                disabled={isClosed}
              >
                <i className="fas fa-paper-plane"></i>
                {isClosed ? "Applications Closed" : "Apply Now"}
              </Button>
              <Button
                variant={isSaved ? "secondary" : "outline"}
                size="medium"
                onClick={() =>
                  isSaved ? onUnsave?.(job.id) : onSave?.(job.id)
                }
                className={`save-btn ${isSaved ? "saved" : ""}`}
              >
                <i className={`fas ${isSaved ? "fa-heart" : "fa-heart"}`}></i>
                {isSaved ? "Saved" : "Save"}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;
