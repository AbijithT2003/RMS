import React from 'react';
import Button from '../../atoms/Button/Button';
import './ApplicationCard.css';

const ApplicationCard = ({ 
  application, 
  onUpdateStatus, 
  onViewDetails,
  showActions = true 
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'pending';
      case 'reviewed': return 'reviewed';
      case 'accepted': return 'accepted';
      case 'rejected': return 'rejected';
      default: return 'pending';
    }
  };

  return (
    <div className="application-card">
      <div className="application-header">
        <div className="applicant-info">
          <h4 className="applicant-name">{application.applicantName}</h4>
          <p className="job-title">{application.jobTitle}</p>
        </div>
        <span className={`status-badge ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="application-details">
        <div className="application-meta">
          <span className="applied-date">
            <i className="fas fa-calendar"></i>
            Applied: {new Date(application.appliedDate).toLocaleDateString()}
          </span>
          {application.email && (
            <span className="applicant-email">
              <i className="fas fa-envelope"></i>
              {application.email}
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
          {application.status?.toLowerCase() === 'pending' && (
            <>
              <Button 
                variant="primary" 
                size="small"
                onClick={() => onUpdateStatus?.(application.id, 'REVIEWED')}
              >
                <i className="fas fa-check"></i>
                Review
              </Button>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => onUpdateStatus?.(application.id, 'REJECTED')}
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