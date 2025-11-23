import React from "react";
import { jobsApi } from "../../api/endpoints/jobs.api";
import { useApi } from "../../hooks/useApi";
import JobCard from "../../components/ui/Card/JobCard";
import "./SavedJobsPage.css";

const SavedJobsPage = () => {
  const {
    data: savedJobs,
    loading,
    error,
    refetch,
  } = useApi(() => jobsApi.getSavedJobs());

  const handleUnsaveJob = async (jobId) => {
    try {
      await jobsApi.unsaveJob(jobId);
      refetch();
    } catch (error) {
      console.error("Error unsaving job:", error);
    }
  };

  if (loading) {
    return (
      <div className="saved-jobs-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading saved jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-jobs-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Error loading saved jobs: {error}</p>
          <button onClick={refetch} className="retry-button">
            <i className="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const savedJobsArray = Array.isArray(savedJobs)
    ? savedJobs
    : savedJobs?.content || savedJobs?.data || [];

  // Only show saved jobs that are active (hide closed/inactive roles)
  const visibleSavedJobs = savedJobsArray.filter(
    (job) => job?.status === "ACTIVE"
  );

  return (
    <div className="saved-jobs-container">
      <div className="saved-jobs-header">
        <h1>Saved Jobs</h1>
        <p>Your bookmarked job opportunities</p>
      </div>

      {visibleSavedJobs.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-heart"></i>
          <h3>No Saved Jobs</h3>
          <p>
            You don't have any saved <strong>active</strong> jobs right now.
            Closed or inactive roles are hidden.
          </p>
        </div>
      ) : (
        <div className="saved-jobs-grid">
          {visibleSavedJobs.map((job) => (
            <div key={job.id} className="saved-job-card">
              <JobCard
                job={job}
                showSaveButton={false}
                onUnsave={() => handleUnsaveJob(job.id)}
              />
              <div className="saved-job-actions">
                <button
                  className="unsave-btn"
                  onClick={() => handleUnsaveJob(job.id)}
                  title="Remove from saved jobs"
                >
                  <i className="fas fa-heart-broken"></i>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;
