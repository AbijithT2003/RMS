import React, { useState, useEffect } from 'react';
import { usersApi } from '../../api/endpoints/users.api';
import Header from '../../components/organisms/Header/Header';

const UserManagementPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await usersApi.getApplicants();
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>User Management</h1>
        
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registration Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(applicant => (
                <tr key={applicant.id}>
                  <td>{applicant.firstName} {applicant.lastName}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{new Date(applicant.createdDate).toLocaleDateString()}</td>
                  <td>{applicant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;