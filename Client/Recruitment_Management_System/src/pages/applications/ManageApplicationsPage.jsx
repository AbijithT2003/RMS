import React, { useState } from "react";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { useApi } from "../../hooks/useApi";
import ApplicationCard from "../../components/Card/ApplicationCard";
import "./ManageApplicationsPage.css";

const ManageApplicationsPage = () => {
  const { data, loading, error, refetch } = useApi(() =>
    applicationsApi.getApplications()
  );
  const [selectedJob, setSelectedJob] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState(null);

  const applicationsArray = Array.isArray(data)
    ? data
    : data?.content || data?.data || [];

  // Group applications by job
  const groupedApplications = applicationsArray.reduce((acc, app) => {
    const jobTitle = app.jobTitle || "Unknown Job";
    if (!acc[jobTitle]) acc[jobTitle] = [];
    acc[jobTitle].push(app);
    return acc;
  }, {});

  let filteredApplications =
    selectedJob === "all"
      ? applicationsArray
      : groupedApplications[selectedJob] || [];

  // Filter by status
  if (statusFilter !== "all") {
    filteredApplications = filteredApplications.filter(
      (app) => app.status === statusFilter
    );
  }

  const updateStatus = async (id, status) => {
    try {
      await applicationsApi.updateApplicationStatus(id, status);
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewDetails = async (applicationId) => {
    try {
      const app = await applicationsApi.getApplicationById(applicationId);

      // fetch applicant details
      const applicant = await applicationsApi.getApplicantById(app.applicantId);

      // fetch job details
      const job = await applicationsApi.getJobById(app.jobId);

      // merge everything into one object
      const fullDetails = {
        ...app,
        applicant,
        job,
      };

      setApplicationDetails(fullDetails);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Error loading full application details:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="manage-applications-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-applications-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Error loading applications: {error}</p>
          <button onClick={refetch} className="retry-button">
            <i className="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-applications-container">
      <div className="applications-header">
        <h1>Job Applications</h1>
        <div className="job-filter">
          <label>Filter by Job:</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option value="all">All Jobs</option>
            {Object.keys(groupedApplications).map((jobTitle) => (
              <option key={jobTitle} value={jobTitle}>
                {jobTitle} ({groupedApplications[jobTitle].length})
              </option>
            ))}
          </select>
        </div>
        <div className="status-filter">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {!filteredApplications || filteredApplications.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-inbox"></i>
          <h3>No Applications Found</h3>
          <p>There are currently no job applications to display.</p>
        </div>
      ) : (
        <div className="applications-grid">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onUpdateStatus={updateStatus}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
      {showDetailsModal && applicationDetails && (
        <div className="details-modal">
          <div className="details-modal-content">
            <h2>Application Details</h2>

            {/* Applicant Section */}
            <h3 className="section-title">Applicant Information</h3>
            <p>
              <strong>Name:</strong> {applicationDetails.applicant.fullName}
            </p>
            <p>
              <strong>Email:</strong> {applicationDetails.applicant.email}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {applicationDetails.applicant.phone || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {applicationDetails.applicant.experience ||
                applicationDetails.yearsOfExperience}{" "}
              years
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {applicationDetails.applicant.skills?.join(", ") || "N/A"}
            </p>

            {/* Job Section */}
            <h3 className="section-title">Job Information</h3>
            <p>
              <strong>Job Title:</strong> {applicationDetails.job.title}
            </p>
            <p>
              <strong>Job ID:</strong> {applicationDetails.job.id}
            </p>
            <p>
              <strong>Posted By:</strong>{" "}
              {applicationDetails.job.recruiterName || "Unknown"}
            </p>

            {/* Application Section */}
            <h3 className="section-title">Application Data</h3>
            <p>
              <strong>Status:</strong> {applicationDetails.status}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {formatDate(applicationDetails.appliedDate)}
            </p>

            <p>
              <strong>Resume:</strong>
              {applicationDetails.resumeUrl ? (
                <a href={applicationDetails.resumeUrl} target="_blank">
                  View Resume
                </a>
              ) : (
                "N/A"
              )}
            </p>

            <p>
              <strong>Cover Letter:</strong>
            </p>
            <p className="cover-letter-box">
              {applicationDetails.coverLetter || "No cover letter provided"}
            </p>

            {/* Update Status */}
            <div className="update-status">
              <label>Update Status:</label>
              <select
                value={applicationDetails.status}
                onChange={(e) =>
                  updateStatus(applicationDetails.id, e.target.value)
                }
              >
                <option value="PENDING">Pending</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowDetailsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplicationsPage;
