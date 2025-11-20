import React, { useState } from 'react';
import CreateJobForm from '../../components/ui/Form/CreateJobForm';
import './CreateJobPage.css';
import { jobsApi } from "../../api/endpoints/jobs.api";

const CreateJobPage = () => {
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
        <div className="page-header">
          <h1>Create New Job Posting</h1>
          <p>Fill out all required fields to create a new job posting</p>
        </div>

        <CreateJobForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreateJobPage;