import React, { useState } from 'react';
import { jobsApi } from '../../api/endpoints/jobs.api';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

import PageLayout from '../../components/common/PageLayout';
import Button from '../../components/atoms/Button/Button';
import JobCard from '../../components/ui/Card/JobCard';
import './ManageJobsPage.css';

const ManageJobsPage = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { data: jobs, loading, error, refetch } = useApi(() => jobsApi.getallJobs());
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
    // For now, just log the edit action - implement edit functionality as needed
    console.log('Edit job:', id);
  };

  const handleViewApplications = (jobId) => {
    setSelectedJob(jobId);
    navigate(`/recruiter/applications?jobId=${jobId}`);
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  return (
    <div className="manage-jobs-page">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>Manage Job Postings</h1>
            <p>Create, edit, and manage your job postings</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => onNavigate ? onNavigate('create-job') : navigate('/recruiter/jobs/create')}
            className="create-btn"
          >
            <i className="fas fa-plus"></i>
            Create New Job
          </Button>
        </div>

        <div className="controls-section">
          <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search jobs by title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <i className="fas fa-filter filter-icon"></i>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error loading jobs. Please try again.</p>
            <Button onClick={refetch} variant="secondary">Retry</Button>
          </div>
        ) : (
          <div className="jobs-content">
            <div className="jobs-stats">
              <span className="stats-text">
                Showing {filteredJobs.length} of {jobs?.length || 0} jobs
              </span>
            </div>
            
            <div className="jobs-grid">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewApplications={handleViewApplications}
                    isRecruiter={true}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <h3>No jobs found</h3>
                  <p>Try adjusting your search or create a new job posting.</p>
                  <Button 
                    variant="primary" 
                    onClick={() => onNavigate ? onNavigate('create-job') : navigate('/recruiter/jobs/create')}
                  >
                    <i className="fas fa-plus"></i>
                    Create Your First Job
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobsPage;