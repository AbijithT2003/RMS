import React, { useState, useMemo } from "react";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { usersApi } from "../../api/endpoints/users.api";
import { useApi } from "../../hooks/useApi";
import { useNotification } from "../../api/context/useNotificationHook";
import ApplicationCard from "../../components/Card/ApplicationCard";
import "./ManageApplicationsPage.css";


const STATUS_LABELS = {
  SUBMITTED: "submitted",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  INTERVIEWED: "Interviewed",
  SELECTED: "Selected",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

const STATUS_FLOW = {
  SUBMITTED: ["UNDER_REVIEW", "REJECTED"],
  UNDER_REVIEW: ["SHORTLISTED", "REJECTED"],
  SHORTLISTED: ["INTERVIEW_SCHEDULED", "REJECTED"],
  INTERVIEW_SCHEDULED: ["INTERVIEWED", "REJECTED"],
  INTERVIEWED: ["SELECTED", "REJECTED"],
  SELECTED: [],
  REJECTED: [],
  WITHDRAWN: [],
};

const allStatuses = Object.keys(STATUS_LABELS);

const canTransition = (fromStatus, toStatus) => {
  if (!fromStatus || !toStatus) return false;
  if (fromStatus === toStatus) return true;
  const possible = STATUS_FLOW[fromStatus] || [];
  return possible.includes(toStatus);
};

/* ---- Helpers to normalize application shape ---- */
const normalizeApplication = (app) => {
  if (!app || typeof app !== "object") return app;

  const normalized = { ...app };

  // Dates
  normalized.appliedAt =
    app.appliedAt || app.appliedDate || app.applied_on || null;
  normalized.updatedAt =
    app.updatedAt || app.updatedAt || app.updated_at || null;

  // Job fields
  normalized.job = normalized.job || {};
  // If backend provided job joined fields at top-level, map them into job object
  if (!normalized.job.id) {
    normalized.job.id =
      app.job?.id || app.jobId || app.job_id || app.jobIdFromJoin || null;
  }
  if (!normalized.job.title) {
    normalized.job.title =
      app.job?.title || app.jobTitle || app.job_title || null;
  }
  if (!normalized.job.recruiterName) {
    normalized.job.recruiterName =
      app.job?.recruiterName || app.recruiterName || app.recruiter_name || null;
  }

  // Applicant fields
  normalized.applicant = normalized.applicant || {};
  // sometimes API returns applicant object inside `app.applicant`, other times only applicantId
  normalized.applicant.id =
    normalized.applicant.id ||
    app.applicant?.id ||
    app.applicantId ||
    app.applicant_id ||
    null;
  normalized.applicant.fullName =
    normalized.applicant.fullName ||
    app.applicant?.fullName ||
    app.applicantName ||
    app.applicant_name ||
    app.applicant?.name ||
    null;
  normalized.applicant.email =
    normalized.applicant.email || app.applicant?.email || null;
  normalized.applicant.phone =
    normalized.applicant.phone || app.applicant?.phone || null;
  normalized.applicant.experience =
    normalized.applicant.experience ||
    app.applicant?.experience ||
    app.yearsOfExperience ||
    null;
  normalized.applicant.skills =
    normalized.applicant.skills || app.applicant?.skills || app.skills || [];

  // Application-level fields fallback
  normalized.coverLetter =
    app.coverLetter || app.cover_letter || app.cover || "";
  normalized.resumeUrl = app.resumeUrl || app.resume_url || app.resume || null;
  normalized.status = app.status || app.applicationStatus || "SUBMITTED";

  // names at top-level
  normalized.jobTitle = normalized.job.title || app.jobTitle || null;
  normalized.applicantName =
    normalized.applicant.fullName || app.applicantName || null;

  return normalized;
};

/* ---- Component ---- */
const ManageApplicationsPage = () => {
  const { data, loading, error, refetch } = useApi(() =>
    applicationsApi.getApplications(0,50)
  );
  const notification = useNotification();

  const [selectedJob, setSelectedJob] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Normalize input array from various shapes (pageable or array)
  const applicationsArrayRaw = Array.isArray(data)
    ? data
    : data?.content || data?.data || [];
  const applicationsArray = applicationsArrayRaw.map(normalizeApplication);

  // Grouping by job title (robust)
  const groupedApplications = useMemo(() => {
    return applicationsArray.reduce((acc, app) => {
      const jobTitle =
        app.jobTitle || app.job?.title || "Unknown Job";
      if (!acc[jobTitle]) acc[jobTitle] = [];
      acc[jobTitle].push(app);
      return acc;
    }, {});
  }, [applicationsArray]);

  // Apply job + status filters
  let filteredApplications =
    selectedJob === "all"
      ? applicationsArray
      : groupedApplications[selectedJob] || [];

  if (statusFilter !== "all") {
    filteredApplications = filteredApplications.filter(
      (app) => app.status === statusFilter
    );
  }

  /* ---- Update Status with flow enforcement ---- */
  const updateStatus = async (applicationId, newStatus) => {
    if (!applicationId || !newStatus) return;

    // find app in current list to get current status (fallback to API)
    const current =
      applicationsArray.find((a) => a.id === applicationId) ||
      applicationDetails;
    const currentStatus = current?.status || "SUBMITTED";

    // allow same status (no-op) but don't call API
    if (currentStatus === newStatus) {
      notification.info("Status unchanged", "Info");
      return;
    }

    if (!canTransition(currentStatus, newStatus)) {
      notification.error("Invalid status transition", "Error");
      return;
    }

    try {
      setIsUpdating(true);
      await applicationsApi.updateApplicationStatus(applicationId, newStatus);
      notification.success("Status updated successfully", "Success");
      await refetch(); // refresh list
      // if modal open, update details modal status locally
      if (applicationDetails?.id === applicationId) {
        setApplicationDetails((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      notification.error("Failed to update application status", "Error");
    } finally {
      setIsUpdating(false);
    }
  };

  /* ---- Fetch & show full details (application + applicant + job) ---- */
  const handleViewDetails = async (applicationId) => {
    try {
      setApplicationDetails(null);
      setShowDetailsModal(true);

      // 1) fetch application
      const appRaw = await applicationsApi.getApplicationById(applicationId);
      const app = normalizeApplication(appRaw);

      // 2) fetch applicant details using usersApi (getUserByValue supports id or email per examples)
      let applicant = null;
      const applicantId =
        app.applicant?.id || app.applicantId || app.applicantIdFromJoin;
      if (applicantId) {
        try {
          // usersApi.getUserByValue might accept id or email per your examples
          const userResp = await usersApi.getUserByValue(applicantId);
          // normalize user response shape to expected fields
          applicant = {
            id: userResp?.id || applicantId,
            fullName:
              userResp?.fullName ||
              userResp?.name ||
              app.applicant?.fullName ||
              app.applicantName,
            email: userResp?.email || app.applicant?.email || null,
            phone: userResp?.phone || null,
            experience:
              userResp?.experience ||
              app.applicant?.experience ||
              app.yearsOfExperience ||
              null,
            skills: userResp?.skills || app.applicant?.skills || [],
          };
        } catch (err) {
          // if usersApi fails, continue with whatever we have
          console.warn("Failed to load applicant via usersApi:", err);
          applicant = {
            id: applicantId,
            fullName:
              app.applicant?.fullName ||
              app.applicantName ||
              "Unknown Applicant",
            email: null,
            phone: null,
            experience:
              app.applicant?.experience || app.yearsOfExperience || null,
            skills: app.applicant?.skills || [],
          };
        }
      }

      // 3) fetch job details if needed
      let job = app.job || {};
      const jobId = job.id || app.jobId;
      if ((!job.title || !job.id) && jobId) {
        try {
          const jobResp = await applicationsApi.getJobById(jobId);
          job = {
            id: jobResp?.id || jobId,
            title: jobResp?.title || job.title || app.jobTitle,
            recruiterName:
              jobResp?.recruiterName ||
              jobResp?.postedByName ||
              app.recruiterName ||
              job.recruiterName,
          };
        } catch (err) {
          console.warn("Failed to load job details:", err);
        }
      }

      // Consolidate full details
      const fullDetails = {
        ...app,
        applicant,
        job,
      };

      setApplicationDetails(fullDetails);
    } catch (err) {
      console.error("Failed to load application details:", err);
      notification.error("Failed to load application details", "Error");
      setShowDetailsModal(false);
    }
  };

  /* ---- Date formatting helper ---- */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  /* ---- UI Rendering ---- */
  if (loading) {
    return (
      <div className="manage-applications-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin" />
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-applications-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle" />
          <p>Error loading applications: {String(error)}</p>
          <button onClick={refetch} className="retry-button">
            <i className="fas fa-redo" />
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
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!filteredApplications || filteredApplications.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-inbox" />
          <h3>No Applications Found</h3>
          <p>There are currently no job applications to display.</p>
        </div>
      ) : (
        <div className="applications-grid">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onUpdateStatus={(status) => updateStatus(application.id, status)}
              onViewDetails={() => handleViewDetails(application.id)}
            />
          ))}
          <div
            className="up-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && applicationDetails && (
        <div className="details-modal">
          <div className="details-modal-content">
            <h2>Application Details</h2>

            {/* Applicant Section */}
            <h3 className="section-title">Applicant Information</h3>
            <p>
              <strong>Name:</strong>{" "}
              {applicationDetails.applicant?.fullName ||
                applicationDetails.applicantName ||
                "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {applicationDetails.applicant?.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {applicationDetails.applicant?.phone || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {applicationDetails.applicant?.experience ??
                applicationDetails.yearsOfExperience ??
                "N/A"}{" "}
              {applicationDetails.applicant?.experience != null ? "years" : ""}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {applicationDetails.applicant?.skills?.length
                ? applicationDetails.applicant.skills.join(", ")
                : "N/A"}
            </p>

            {/* Job Section */}
            <h3 className="section-title">Job Information</h3>
            <p>
              <strong>Job Title:</strong>{" "}
              {applicationDetails.job?.title ||
                applicationDetails.jobTitle ||
                "N/A"}
            </p>
            <p>
              <strong>Job ID:</strong>{" "}
              {applicationDetails.job?.id || applicationDetails.jobId || "N/A"}
            </p>
            <p>
              <strong>Posted By:</strong>{" "}
              {applicationDetails.job?.recruiterName ||
                applicationDetails.recruiterName ||
                "Unknown"}
            </p>

            {/* Application Section */}
            <h3 className="section-title">Application Data</h3>
            <p>
              <strong>Status:</strong> {applicationDetails.status}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {formatDate(applicationDetails.appliedAt)}
            </p>

            <p>
              <strong>Resume:</strong>{" "}
              {applicationDetails.resumeUrl ? (
                <a
                  href={applicationDetails.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
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
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  // enforce transitions on UI too (gives quick feedback)
                  if (!canTransition(applicationDetails.status, newStatus)) {
                    notification.error("Invalid status transition", "Error");
                    return;
                  }
                  await updateStatus(applicationDetails.id, newStatus);
                }}
                disabled={isUpdating}
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
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
