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

  const applicationCount = Array.isArray(job.applications)
    ? job.applications.length
    : job.applications?.totalElements || 0;
  

  const isClosed = job.status !== "ACTIVE";
  // For recruiters, don't show closed state since they can edit job status
  const showClosedState = !isRecruiter && isClosed;

  return (
    <div className={`job-card ${showClosedState ? "closed-job" : ""}`}>
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className={`job-type ${job.jobType?.toLowerCase()}`}>
          {job.jobType?.replace("_", " ")}
        </span>
        {showClosedState && <span className="job-closed-badge">Closed</span>}
      </div>

      <div className="job-details">
        <div className="job-meta">
          <span className="job-location">
            <i className="fas fa-map-marker-alt"></i>
            {job.locationCity}
          </span>
          {job.salary && (
            <span className="job-salary">
              <i className="fas fa-dollar-sign"></i>
              {job.salary}
            </span>
          )}
        </div>

        <p className="job-description card-body">{job.description}</p>

        {job.requirements && (
          <div className="job-requirements">
            <strong className="fw-semibold">Requirements:</strong>
            <p className="card-body">{job.requirements}</p>
          </div>
        )}

        {isRecruiter && (
          <div className="job-applicants">
            <strong className="fw-semibold">
              Active Applicants({applicationCount})
            </strong>

            {applications.length === 0 ? (
              <p className="no-applicants">No applications to review</p>
            ) : (
              <ul className="applicant-list">
                {applications.map((app) => (
                  <li key={app.id}>
                    {app.applicantName || "Unnamed Applicant"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
                variant="danger"
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
