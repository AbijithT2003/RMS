import React from 'react';
import { useParams } from 'react-router-dom';
import { applicationsApi } from '../../api/endpoints/applications.api';
import { useApi } from '../../hooks/useApi';
import PageLayout from '../../components/common/PageLayout';

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const { data: application, loading, error, refetch } = useApi(
    () => applicationsApi.getApplicationById(id),
    [id]
  );

  return (
    <PageLayout 
      title="Application Details" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
    >
      {application && (
        <div className="application-details">
          <h2>{application.jobTitle}</h2>
          <p><strong>Company:</strong> {application.company}</p>
          <p><strong>Applicant:</strong> {application.applicantName}</p>
          <p><strong>Applied Date:</strong> {new Date(application.appliedDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {application.status}</p>
          <div>
            <h3>Cover Letter</h3>
            <p>{application.coverLetter}</p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ApplicationDetailsPage;