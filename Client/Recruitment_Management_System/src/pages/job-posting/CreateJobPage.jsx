import React, { useState } from 'react';
import CreateJobForm from '../../components/ui/Form/CreateJobForm';
import './CreateJobPage.css';
import { jobsApi } from "../../api/endpoints/jobs.api";

const CreateJobPage = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const createdJob = await jobsApi.createJob(formData);
      console.log("Job created successfully:", createdJob);
      return createdJob; // important so the form can show success
    } catch (error) {
      console.error("Error creating job:", error);
      throw error; // keep this so CreateJobForm can catch it
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-page">
      <div className="page-container">
        <CreateJobForm
          onSubmit={handleSubmit}
          loading={loading}
          onSuccessNavigate={() => onNavigate("jobs")}
        />
      </div>
      <div
        className="up-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
};

export default CreateJobPage;