import React, { useState } from 'react';
import { jobsApi } from '../../api/endpoints/jobs.api';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/common/PageLayout';
import Button from '../../components/atoms/Button/Button';
import JobCard from '../../components/ui/Card/JobCard';
import './ManageJobsPage.css';

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const { data: jobs, loading, error, refetch } = useApi(() => jobsApi.getallJobs());
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsApi.deleteJob(id);
        refetch();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/recruiter/jobs/edit/${id}`);
  };

  const handleViewApplications = (jobId) => {
    setSelectedJob(jobId);
    navigate(`/recruiter/applications?jobId=${jobId}`);
  };

  return (
    <PageLayout 
      title="Manage Jobs" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
      hideHeader={true}
    >
      <div className="manage-jobs-container">
        <div className="page-header">
          <h1>Manage Job Postings</h1>
          <Button 
            variant="primary" 
            onClick={() => navigate('/recruiter/jobs/create')}
          >
            <i className="fas fa-plus"></i>
            Create New Job
          </Button>
        </div>

        <div className="jobs-grid">
          {jobs?.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewApplications={handleViewApplications}
              isRecruiter={true}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ManageJobsPage;