import React, { useState, useEffect } from "react";
import { jobsApi } from "../../api/endpoints/jobs.api";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { useAuth } from "../../api/context/AuthContext";
import PageLayout from "../../components/common/PageLayout";
import Button from "../../components/atoms/Button/Button";
import JobCard from "../../components/ui/Card/JobCard";
import "./JobListPage.css";

const JobListPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  // Fetch all jobs and user's applied jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const allJobs = await jobsApi.getAllJobs(0,100); // Fetch all jobs
      const myApplications = await applicationsApi.getMyApplications(0, 1000); // large size

      // Extract job IDs already applied to
      const appliedIds = myApplications?.content?.map((app) => app.jobId) || [];
      setAppliedJobIds(appliedIds);

      // Filter out already applied jobs
      const jobsToShow =
        allJobs?.filter((job) => !appliedIds.includes(job.id)) || [];
      setJobs(jobsToShow);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs =
    jobs?.filter((job) => {
      const term = (searchTerm || "").toString().toLowerCase(); // safe conversion
      const matchesSearch =
        job.title?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term) ||
        job.company?.toLowerCase().includes(term);
      return matchesSearch;
    }) || [];


  const handleApply = async (job) => {
    if (!user?.applicantId) {
      alert("You must be logged in as a candidate to apply.");
      return;
    }

    if (job.status !== "ACTIVE") {
      alert(`Applications for "${job.title}" are closed.`);
      return;
    }

    try {
      const request = {
        jobId: job.id,
        applicantId: user.applicantId,
        coverLetter: "I am excited to apply for this position!",
        resumeUrl: "https://myresume.com/resume.pdf",
        platform: "OTHER",
      };

      await applicationsApi.applyToJob(request);
      alert("Application submitted successfully!");

      // Remove job from list
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      setAppliedJobIds((prev) => [...prev, job.id]);
    } catch (err) {
      console.error("Error applying to job:", err);
      alert("Failed to apply. Please try again.");
    }
  };

  if (loading) return <PageLayout title="Available Jobs" loading={true} />;
  if (error)
    return (
      <PageLayout title="Available Jobs" error={error} onRetry={fetchJobs} />
    );

  return (
    <PageLayout title="Available Jobs">
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
          <Button onClick={() => {}} variant="primary">
            <i className="fas fa-search"></i>
            Search
          </Button>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs available</h3>
            <p>Try adjusting your search or check back later.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => handleApply(job)}
                isRecruiter={false}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default JobListPage;
