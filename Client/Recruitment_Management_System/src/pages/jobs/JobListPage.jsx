import React, { useState, useEffect, useCallback } from "react";
import { jobsApi } from "../../api/endpoints/jobs.api";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { useAuth } from "../../api/context/AuthContext";
import { useNotification } from "../../api/context/useNotificationHook";
import PageLayout from "../../components/common/PageLayout";
import Button from "../../components/Button/Button";
import JobCard from "../../components/Card/JobCard";
import "./JobListPage.css";
import Dropdown from "../../components/Dropdown/Dropdown";

const JobListPage = () => {
  const { user } = useAuth();
  const notification = useNotification();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("ALL");
  const [workModeFilter, setWorkModeFilter] = useState("ALL");
  const [locationFilter, setLocationFilter] = useState("ALL");

  const [_appliedJobIds, setAppliedJobIds] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchSavedJobs = async () => {
    const saved = await jobsApi.getSavedJobs();
    setSavedJobIds(saved.map((job) => job.id));
  };

  // Fetch jobs with backend filtering
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const myApplications = await applicationsApi.getMyApplications(0, 1000);
      const appliedIds = myApplications?.content?.map((app) => app.jobId) || [];
      setAppliedJobIds(appliedIds);

      // Call backend search API with filters
      const filters = {
        keyword: searchTerm,
        jobType: jobTypeFilter,
        workMode: workModeFilter,
        location: locationFilter,
      };

      const searchResults = await jobsApi.searchJobs(filters, 0, 100);

      // Filter out already applied jobs
      const jobsToShow =
        searchResults?.content?.filter((job) => !appliedIds.includes(job.id)) ||
        [];

      setJobs(jobsToShow);

      // Extract unique locations for location filter dropdown
      const uniqueLocations = Array.from(
        new Set(jobsToShow.map((job) => job.locationCity).filter(Boolean))
      );
      setLocations(uniqueLocations);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, jobTypeFilter, workModeFilter, locationFilter]);

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, [fetchJobs]);

  // Jobs are already filtered by backend, no need for client-side filtering
  const filteredJobs = jobs || [];

  const handleApply = async (job) => {
    if (!user?.applicantId) {
      notification.warning(
        "You must be logged in as a candidate to apply.",
        "Login Required"
      );
      return;
    }

    if (job.status !== "ACTIVE") {
      notification.warning(
        `Applications for "${job.title}" are closed.`,
        "Applications Closed"
      );
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
      notification.success("Application submitted successfully!", "Success");

      // Remove job from list
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      setAppliedJobIds((prev) => [...prev, job.id]);
    } catch {
      notification.error(
        "Failed to apply. Please try again.",
        "Application Error"
      );
    }
  };

  const handlesave = async (jobId) => {
    try {
      await jobsApi.saveJob(jobId);
      setSavedJobIds((prev) => [...prev, jobId]);
      notification.success("Job saved successfully!", "Success");
    } catch {
      notification.error("Failed to save job. Please try again.", "Save Error");
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await jobsApi.unsaveJob(jobId);
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      notification.success("Job unsaved successfully!", "Success");
    } catch {
      notification.error(
        "Failed to unsave job. Please try again.",
        "Unsave Error"
      );
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
            {/* <i className="fas fa-search"></i> */}
            <input
              type="text"
              placeholder="Search jobs by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => {}} variant="primary">
            <i className="fas fa-search"></i>
            Search
          </Button>
          <div className="filters-container">
            {/* JOB TYPE FILTER */}
            <Dropdown
              trigger={<button className="filter-btn">Job Type</button>}
            >
              {[
                { label: "All", value: "ALL" },
                { label: "Full Time", value: "FULL_TIME" },
                { label: "Part Time", value: "PART_TIME" },
                { label: "Internship", value: "INTERNSHIP" },
                { label: "Contract", value: "CONTRACT" },
              ].map((item, index) => (
                <span
                  key={index}
                  className="dropdown-item small muted"
                  onClick={() => setJobTypeFilter(item.value)}
                >
                  {item.label}
                </span>
              ))}
            </Dropdown>

            {/* WORK MODE FILTER */}
            <Dropdown
              trigger={<button className="filter-btn">Work Mode</button>}
            >
              {[
                { label: "All", value: "ALL" },
                { label: "Remote", value: "REMOTE" },
                { label: "Onsite", value: "ONSITE" },
                { label: "Hybrid", value: "HYBRID" },
              ].map((item, index) => (
                <span
                  key={index}
                  className="dropdown-item small muted"
                  onClick={() => setWorkModeFilter(item.value)}
                >
                  {item.label}
                </span>
              ))}
            </Dropdown>

            {/* LOCATION FILTER */}
            <Dropdown
              trigger={<button className="filter-btn">Location</button>}
            >
              <span
                className="dropdown-item small muted"
                onClick={() => setLocationFilter("ALL")}
              >
                All Locations
              </span>

              {locations.map((loc, index) => (
                <span
                  key={index}
                  className="dropdown-item small muted"
                  onClick={() => setLocationFilter(loc)}
                >
                  {loc}
                </span>
              ))}
            </Dropdown>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs available</h3>
            <p>
              {jobs.length === 0
                ? "There are no active jobs at the moment."
                : "No jobs match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => handleApply(job)}
                onSave={() => handlesave(job.id)}
                onUnsave={() => handleUnsave(job.id)}
                isSaved={savedJobIds.includes(job.id)}
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
