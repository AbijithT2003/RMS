import React, { useState } from 'react';
import { jobsApi } from '../../api/endpoints/jobs.api';
import { useApi } from '../../hooks/useApi';
import PageLayout from '../../components/common/PageLayout';
import Button from '../../components/atoms/Button/Button';
import JobCard from '../../components/ui/Card/JobCard';
import './JobListPage.css';
import {jobId} from '../../utils/constants';

const JobListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: jobs,
    loading,
    error,
    refetch,
  } = useApi(() => jobsApi.getJob(jobId));

  const handleSearch = async () => {
    if (!searchTerm) {
      refetch();
      return;
    }
    try {
      await jobsApi.searchJobs({ keyword: searchTerm });
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleApply = (jobId) => {
    console.log('Apply to job:', jobId);
  };

  return (
    <PageLayout 
      title="Available Jobs" 
      loading={loading} 
      error={error} 
      onRetry={refetch}
      hideHeader={true}
    >
      <div className="job-list-container">
        <div className="search-section">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search jobs by title, location, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch} variant="primary">
            <i className="fas fa-search"></i>
            Search
          </Button>
        </div>

        <div className="jobs-grid">
          {jobs?.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              isRecruiter={false}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default JobListPage;