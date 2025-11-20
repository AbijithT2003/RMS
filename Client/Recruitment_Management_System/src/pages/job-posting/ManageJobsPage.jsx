import React, { useState } from "react";
import { jobsApi } from "../../api/endpoints/jobs.api";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { useApi } from "../../hooks/useApi";
import PageLayout from "../../components/common/PageLayout";
import Button from "../../components/atoms/Button/Button";
import JobCard from "../../components/ui/Card/JobCard";
import "./ManageJobsPage.css";

const ManageJobsPage = () => {
  const {
    data: jobsData,
    loading,
    error,
    refetch,
  } = useApi(() => jobsApi.getAllJobs());
  const jobs = jobsData?.content || jobsData || [];

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [editForm, setEditForm] = useState({
    title: "",
    department: "",
    description: "",
    status: "ACTIVE",
  });

  const handleEdit = async (id) => {
    try {
      const jobDetails = await jobsApi.getJob(id);
      setSelectedJob(jobDetails);
      setEditForm({
        title: jobDetails.title || "",
        department: jobDetails.department || "",
        description: jobDetails.description || "",
        status: jobDetails.status || "ACTIVE",
      });
      setShowEditModal(true);
    } catch (error) {
      console.error("Failed to fetch job details:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await jobsApi.updateJob(selectedJob.id, editForm); // make sure your API supports update
      setShowEditModal(false);
      refetch();
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const handleViewApplications = async (jobId) => {
    try {
      const response = await applicationsApi.getApplications({ jobId });
      const applications = response?.content || response;
      setSelectedJob(jobs.find((job) => job.id === jobId));
      setJobApplications(applications || []);
      setShowApplicationsModal(true);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await jobsApi.deleteJob(id);
        refetch();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
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
    <div className="manage-jobs-page">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>Manage Job Postings</h1>
            <p>Create, edit, and manage your job postings</p>
          </div>
        </div>

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
            <h3>No jobs found</h3>
            <p>Try adjusting your search or filter criteria.</p>
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

        {/* Edit Job Modal */}
        {showEditModal && selectedJob && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Job: {selectedJob.title}</h2>
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Department
                <input
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Description
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows={4}
                />
              </label>
              <label>
                Status
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </label>
              <div className="modal-buttons">
                <Button onClick={handleSaveEdit}>Save</Button>
                <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Applications Modal */}
        {showApplicationsModal && selectedJob && (
          <div className="modal">
            <div className="modal-content">
              <h2>Applications for: {selectedJob.title}</h2>
              {jobApplications.length === 0 ? (
                <p>No applications found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Applicant Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Applied At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobApplications.map((app) => (
                      <tr key={app.id || app.userId}>
                        <td>{app.fullName || app.name || "N/A"}</td>
                        <td>{app.email || "N/A"}</td>
                        <td>{app.status || "Pending"}</td>
                        <td>
                          {app.appliedAt
                            ? new Date(app.appliedAt).toLocaleString()
                            : "N/A"}
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
      </div>
    </div>
  );
};

export default ManageJobsPage;
