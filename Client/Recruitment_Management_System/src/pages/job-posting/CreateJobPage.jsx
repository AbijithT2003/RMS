import React, { useState } from 'react';
import { jobsApi } from '../../api/endpoints/jobs.api';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/common/PageLayout';
import JobForm from '../../components/ui/Form/JobForm';
import './CreateJobPage.css';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: 'FULL_TIME'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await jobsApi.createJob(formData);
      navigate('/recruiter/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Create New Job" hideHeader={true}>
      <div className="create-job-container">
        <JobForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Create Job"
          title="Create New Job Posting"
        />
      </div>
    </PageLayout>
  );
};

export default CreateJobPage;