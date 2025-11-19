import React, { useState, useEffect } from 'react';
import { applicationsApi } from '../../api/endpoints/applications.api';
import Header from '../../components/organisms/Header/Header';
import Button from '../../components/atoms/Button/Button';

const ManageApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsApi.getApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await applicationsApi.updateApplicationStatus(id, status);
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Manage Applications</h1>
        
        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td>{application.applicantName}</td>
                  <td>{application.jobTitle}</td>
                  <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                  <td>{application.status}</td>
                  <td>
                    <Button onClick={() => updateStatus(application.id, 'REVIEWED')}>
                      Review
                    </Button>
                    <Button onClick={() => updateStatus(application.id, 'REJECTED')}>
                      Reject
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

export default ManageApplicationsPage;