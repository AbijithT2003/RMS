import React, { useState, useEffect } from 'react';
import { jobsApi } from '../../api/endpoints/jobs.api';
import Header from '../../components/organisms/Header/Header';
import Button from '../../components/atoms/Button/Button';
import '../Pages.css';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchJobs();
      return;
    }
    try {
      setLoading(true);
      const response = await jobsApi.searchJobs({ q: searchTerm });
      setJobs(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Available Jobs</h1>
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <Button>Apply Now</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListPage;