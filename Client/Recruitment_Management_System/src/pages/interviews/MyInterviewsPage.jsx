import React from 'react';
import { interviewsApi } from '../../api/endpoints/interviews.api';
import { useApi } from '../../hooks/useApi';
import PageLayout from '../../components/common/PageLayout';

const MyInterviewsPage = () => {
  const { data: interviews, loading, error, refetch } = useApi(
    () => interviewsApi.getMyInterviews()
  );

  return (
    <PageLayout 
      title="My Interviews" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
      hideHeader={true}
    >
      <div className="interviews-list">
        {interviews?.map(interview => (
          <div key={interview.id} className="interview-card">
            <h3>{interview.jobTitle}</h3>
            <p>Candidate: {interview.candidateName}</p>
            <p>Date: {new Date(interview.scheduledDate).toLocaleDateString()}</p>
            <p>Time: {new Date(interview.scheduledDate).toLocaleTimeString()}</p>
            <p>Type: {interview.type}</p>
            <span className={`status ${interview.status.toLowerCase()}`}>
              {interview.status}
            </span>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MyInterviewsPage;