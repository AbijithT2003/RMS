import React, { useState } from 'react';
import { applicationsApi } from '../../api/endpoints/applications.api';
import { useApi } from '../../hooks/useApi';
import PageLayout from '../../components/common/PageLayout';
import ApplicationCard from '../../components/ui/Card/ApplicationCard';
import Button from '../../components/atoms/Button/Button';
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

  // Group applications by job
  const groupedApplications = applications?.reduce((acc, app) => {
    const jobTitle = app.jobTitle || 'Unknown Job';
    if (!acc[jobTitle]) acc[jobTitle] = [];
    acc[jobTitle].push(app);
    return acc;
  }, {}) || {};

  const filteredApplications = selectedJob === 'all' 
    ? applications 
    : groupedApplications[selectedJob] || [];

  return (
    <PageLayout 
      title="Manage Applications" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
      hideHeader={true}
    >
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

        <div className="applications-grid">
          {filteredApplications?.map(application => (
            <ApplicationCard
              key={application.id}
              application={application}
              onUpdateStatus={updateStatus}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ManageApplicationsPage;