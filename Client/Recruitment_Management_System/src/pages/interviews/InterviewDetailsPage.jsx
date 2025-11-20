import React from 'react';
import { useParams } from 'react-router-dom';
import { interviewsApi } from '../../api/endpoints/interviews.api';
import { useApi } from '../../hooks/useApi';
import PageLayout from '../../components/common/PageLayout';

const InterviewDetailsPage = () => {
  const { id } = useParams();
  const { data: interview, loading, error, refetch } = useApi(
    () => interviewsApi.getInterviewById(id),
    [id]
  );

  return (
    <PageLayout 
      title="Interview Details" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
    >
      {interview && (
        <div className="interview-details">
          <h2>{interview.jobTitle}</h2>
          <p><strong>Candidate:</strong> {interview.candidateName}</p>
          <p><strong>Interviewer:</strong> {interview.interviewerName}</p>
          <p><strong>Date:</strong> {new Date(interview.scheduledDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(interview.scheduledDate).toLocaleTimeString()}</p>
          <p><strong>Type:</strong> {interview.type}</p>
          <p><strong>Status:</strong> {interview.status}</p>
          {interview.notes && (
            <div>
              <h3>Notes</h3>
              <p>{interview.notes}</p>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default InterviewDetailsPage;