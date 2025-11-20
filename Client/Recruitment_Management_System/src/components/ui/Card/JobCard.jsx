import React from 'react';
import Button from '../../atoms/Button/Button';
import './JobCard.css';

const JobCard = ({ 
  job, 
  onApply, 
  onEdit, 
  onDelete, 
  onViewApplications,
  showActions = true,
  isRecruiter = false 
}) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className={`job-type ${job.type?.toLowerCase()}`}>
          {job.type?.replace('_', ' ')}
        </span>
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
            <Button 
              variant="primary" 
              size="medium"
              onClick={() => onApply?.(job.id)}
            >
              <i className="fas fa-paper-plane"></i>
              Apply Now
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;