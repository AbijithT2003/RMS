import React, { useState, useEffect } from 'react';
import { applicationsApi } from '../../api/endpoints/applications.api';
import Header from '../../components/organisms/Header/Header';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.id) {
        const response = await applicationsApi.getApplicationsByApplicant(user.id);
        setApplications(response.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>My Applications</h1>
        
        <div className="applications-list">
          {applications.map(application => (
            <div key={application.id} className="application-card">
              <h3>{application.jobTitle}</h3>
              <p>Company: {application.company}</p>
              <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
              <span className={`status ${application.status.toLowerCase()}`}>
                {application.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApplicationsPage;