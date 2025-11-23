import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobsApi } from "../../api/endpoints/jobs.api";
import DashboardView from "../../components/common/DashboardView";
import EditJobForm from "../../components/ui/Form/EditJobForm";
import "./EditJobPage.css";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setFetchLoading(true);
        const res = await jobsApi.getJob(id);
        setJobData(res.data || res);
        setError(null);
      } catch (err) {
        console.error("Error fetching job", err);
        setError("Failed to load job details");
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await jobsApi.updateJob(id, formData);
      navigate("/recruiter/jobs");
    } catch (err) {
      console.error("Error updating job", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBreadcrumbs = () => [
    { label: "Dashboard", onClick: () => navigate("/recruiter/dashboard") },
    { label: "Jobs", onClick: () => navigate("/recruiter/jobs") },
    { label: "Edit Job" },
  ];

  if (fetchLoading) {
    return (
      <DashboardView title="Edit Job" breadcrumbs={getBreadcrumbs()}>
        <div className="edit-job-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading job details...</p>
        </div>
      </DashboardView>
    );
  }

  if (error) {
    return (
      <DashboardView title="Edit Job" breadcrumbs={getBreadcrumbs()}>
        <div className="edit-job-error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
          <button
            onClick={() => navigate("/recruiter/jobs")}
            className="btn btn-primary"
          >
            Back to Jobs
          </button>
        </div>
      </DashboardView>
    );
  }

  return (
    <DashboardView title="Edit Job Posting" breadcrumbs={getBreadcrumbs()}>
      <div className="edit-job-page">
        <EditJobForm
          jobData={jobData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </DashboardView>
  );
};

export default EditJobPage;
