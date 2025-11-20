import React from 'react';
import PageLayout from '../../components/common/PageLayout';
import Button from '../../components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import './ApplicantProfilePage.css';

const ApplicantProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <PageLayout title="My Profile">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-info">
              <h2>{user.firstName} {user.lastName}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/applicant/profile/edit')}
            >
              <i className="fas fa-edit"></i>
              Edit Profile
            </Button>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <i className="fas fa-phone"></i>
              <span>{user.phone || 'No phone number'}</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{user.location || 'No location set'}</span>
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <div className="section-card">
            <div className="section-header">
              <h3>
                <i className="fas fa-file-alt"></i>
                Resume
              </h3>
              <Button variant="primary" size="small">
                <i className="fas fa-upload"></i>
                Upload Resume
              </Button>
            </div>
            <p className="section-description">
              Upload your resume to apply for jobs and showcase your experience
            </p>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3>
                <i className="fas fa-cogs"></i>
                Skills
              </h3>
              <Button variant="secondary" size="small">
                <i className="fas fa-plus"></i>
                Add Skills
              </Button>
            </div>
            <div className="skills-list">
              {user.skills?.length > 0 ? (
                user.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))
              ) : (
                <p className="empty-state">No skills added yet. Add your skills to improve job matching.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApplicantProfilePage;