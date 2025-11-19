import React, { useState, useEffect } from 'react';
import { jobsApi } from '../../api/endpoints/jobs.api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/organisms/Header/Header';
import Button from '../../components/atoms/Button/Button';

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobsApi.getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsApi.deleteJob(id);
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-header">
          <h1>Manage Jobs</h1>
          <Button onClick={() => navigate('/recruiter/jobs/create')}>
            Create New Job
          </Button>
        </div>
        
        <div className="jobs-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>{new Date(job.createdDate).toLocaleDateString()}</td>
                  <td>{job.status}</td>
                  <td>
                    <Button onClick={() => navigate(`/recruiter/jobs/edit/${job.id}`)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(job.id)} variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobsPage;