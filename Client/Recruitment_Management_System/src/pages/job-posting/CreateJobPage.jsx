import React, { useState } from 'react';
import CreateJobForm from '../../components/ui/Form/CreateJobForm';
import './CreateJobPage.css';

const CreateJobPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Job created:', formData);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
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