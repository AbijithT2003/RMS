import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobsApi } from "../../api/endpoints/jobs.api";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { useApi } from "../../hooks/useApi";
import DashboardView from "../../components/common/DashboardView";
import Button from "../../components/atoms/Button/Button";
import JobCard from "../../components/ui/Card/JobCard";
import "./ManageJobsPage.css";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const {
    data: jobsData,
    loading,
    error,
    refetch,
  } = useApi(() => jobsApi.getJobsByRecruiter());
  const jobs = Array.isArray(jobsData) ? jobsData : jobsData?.content || [];

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (id) => {
    navigate(`/recruiter/jobs/edit/${id}`);
  };

  const handleViewApplications = async (jobId) => {
    try {
      const response = await applicationsApi.getApplicationsByJob(
        jobId,
        0,
        1000
      );
      const applications = Array.isArray(response)
        ? response
        : response?.content || [];
      setSelectedJob(jobs.find((job) => job.id === jobId));
      setJobApplications(applications || []);
      setShowApplicationsModal(true);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };
  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async (id) => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await jobsApi.deleteJob(id);
      // Close dialog first
      setConfirmDeleteId(null);
      // Refresh list and wait for completion so UI updates reliably
      await refetch();
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting job. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="manage-jobs-content">
      <div className="controls-section">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading jobs...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>
            Error loading jobs. <Button onClick={refetch}>Retry</Button>
          </p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <h3 className="panel-title">No jobs found</h3>
          <p className="lead">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={() => handleEdit(job.id)}
              onViewApplications={() => handleViewApplications(job.id)}
              onDelete={() => handleDelete(job.id)}
              isRecruiter={true}
            />
          ))}
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="panel-title">
              Applications for: {selectedJob.title}
            </h2>
            {jobApplications.length === 0 ? (
              <p>No applications found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Email</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.applicantName || "N/A"}</td>
                      <td>{app.applicantEmail || "N/A"}</td>
                      <td>{app.yearsOfExperience || "N/A"} years</td>
                      <td>
                        <span
                          className={`status-badge ${(
                            app.status || ""
                          ).toLowerCase()}`}
                        >
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        {app.appliedDate
                          ? new Date(app.appliedDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/recruiter/applications/${app.id}`);
                            setShowApplicationsModal(false);
                          }}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="modal-buttons">
              <Button onClick={() => setShowApplicationsModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {confirmDeleteId && (
        <ConfirmDialog
          title="Delete Job?"
          message="This will permanently remove the job and all associated applications."
          onConfirm={() => executeDelete(confirmDeleteId)}
          onCancel={() => setConfirmDeleteId(null)}
          isProcessing={isDeleting}
        />
      )}
      <div
        className="up-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
};

export default ManageJobsPage;
