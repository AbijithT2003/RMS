import React from 'react';
import { interviewsApi } from '../../api/endpoints/interviews.api';
import { useApi } from '../../hooks/useApi';
import './MyInterviewsPage.css';

const MyInterviewsPage = () => {
  const { data: interviews, loading, error, refetch } = useApi(
    () => interviewsApi.getMyInterviews()
  );

  if (loading) {
    return (
      <div className="interviews-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading interviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="interviews-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Unable to Load Interviews</h3>
          <p>There was an issue loading your interviews. This might be because:</p>
          <ul>
            <li>Your account is not properly configured as a recruiter</li>
            <li>The interview service is temporarily unavailable</li>
          </ul>
          <button onClick={refetch} className="retry-button">
            <i className="fas fa-redo"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const interviewsArray = Array.isArray(interviews) ? interviews : 
    (interviews?.content || interviews?.data || []);

  return (
    <div className="interviews-container">
      <div className="interviews-header">
        <h1>My Interviews</h1>
        <p>Manage your scheduled interviews</p>
      </div>
      
      {interviewsArray.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-calendar-times"></i>
          <h3>No Interviews Scheduled</h3>
          <p>You don't have any interviews scheduled at the moment.</p>
        </div>
      ) : (
        <div className="interviews-list">
          {interviewsArray.map(interview => (
            <div key={interview.id} className="interview-card">
              <div className="interview-header">
                <h3>{interview.jobTitle || 'Interview'}</h3>
                <span className={`status ${interview.status?.toLowerCase() || 'pending'}`}>
                  {interview.status || 'Pending'}
                </span>
              </div>
              <div className="interview-details">
                <p><strong>Candidate:</strong> {interview.candidateName || 'N/A'}</p>
                <p><strong>Date:</strong> {interview.scheduledDate ? new Date(interview.scheduledDate).toLocaleDateString() : 'TBD'}</p>
                <p><strong>Time:</strong> {interview.scheduledDate ? new Date(interview.scheduledDate).toLocaleTimeString() : 'TBD'}</p>
                <p><strong>Type:</strong> {interview.type || interview.interviewType || 'N/A'}</p>
                {interview.meetingLink && (
                  <p><strong>Meeting Link:</strong> <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterviewsPage;