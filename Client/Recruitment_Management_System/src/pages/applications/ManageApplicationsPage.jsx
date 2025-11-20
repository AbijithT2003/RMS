import React, { useState } from 'react';
import { applicationsApi } from '../../api/endpoints/applications.api';
import { useApi } from '../../hooks/useApi';
import ApplicationCard from '../../components/ui/Card/ApplicationCard';
import './ManageApplicationsPage.css';

const ManageApplicationsPage = () => {
  const { data: applications, loading, error, refetch } = useApi(() => applicationsApi.getApplications());
  const [selectedJob, setSelectedJob] = useState('all');

  const updateStatus = async (id, status) => {
    try {
      await applicationsApi.updateApplicationStatus(id, status);
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleViewDetails = (applicationId) => {
    console.log('View application details:', applicationId);
  };

  // Ensure applications is an array
  const applicationsArray = Array.isArray(applications) ? applications : 
    (applications?.content || applications?.data || []);

  // Group applications by job
  const groupedApplications = applicationsArray.reduce((acc, app) => {
    const jobTitle = app.jobTitle || 'Unknown Job';
    if (!acc[jobTitle]) acc[jobTitle] = [];
    acc[jobTitle].push(app);
    return acc;
  }, {});

  const filteredApplications = selectedJob === 'all' 
    ? applicationsArray 
    : groupedApplications[selectedJob] || [];

  if (loading) {
    return (
      <div className="manage-applications-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-applications-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Error loading applications: {error}</p>
          <button onClick={refetch} className="retry-button">
            <i className="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-applications-container">
      <div className="applications-header">
        <h1>Job Applications</h1>
        <div className="job-filter">
          <label>Filter by Job:</label>
          <select 
            value={selectedJob} 
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option value="all">All Jobs</option>
            {Object.keys(groupedApplications).map(jobTitle => (
              <option key={jobTitle} value={jobTitle}>
                {jobTitle} ({groupedApplications[jobTitle].length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {!filteredApplications || filteredApplications.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-inbox"></i>
          <h3>No Applications Found</h3>
          <p>There are currently no job applications to display.</p>
        </div>
      ) : (
        <div className="applications-grid">
          {filteredApplications.map(application => (
            <ApplicationCard
              key={application.id}
              application={application}
              onUpdateStatus={updateStatus}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageApplicationsPage;