import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import Button from '../../components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';

const RecruiterProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <PageLayout title="Recruiter Profile">
      <div className="profile-section">
        <div className="profile-info">
          <h2>{user.firstName} {user.lastName}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company}</p>
          <p><strong>Department:</strong> {user.department}</p>
        </div>
        
        <div className="profile-actions">
          <Button onClick={() => navigate('/recruiter/profile/edit')}>
            Edit Profile
          </Button>
        </div>

        <div className="stats-section">
          <h3>Recruitment Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Active Jobs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">48</span>
              <span className="stat-label">Applications</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Interviews</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RecruiterProfilePage;