import React from 'react';
import { applicationsApi } from '../../api/endpoints/applications.api';
import { useApi } from '../../hooks/useApi';
import PageLayout from '../../components/common/PageLayout';

const MyApplicationsPage = () => {
  const { data: applications, loading, error, refetch } = useApi(
    () => applicationsApi.getMyApplications()
  );

  return (
    <PageLayout 
      title="My Applications" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
      hideHeader={true}
    >
      <div className="applications-list">
        {applications?.map(application => (
          <div key={application.id} className="application-card">
            <h3>{application.jobTitle}</h3>
            <p>Company: {application.company}</p>
            <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
            <span className={`status ${application.status.toLowerCase()}`}>
              {application.status}
            </span>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MyApplicationsPage;