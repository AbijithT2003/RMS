import React, { useState } from 'react';
import { skillsApi } from '../../api/endpoints/skills.api';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/atoms/Button/Button';
import './ApplicantProfilePage.css';

const ApplicantProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const { data: availableSkills } = useApi(() => skillsApi.getSkills());
  const { data: userSkills, refetch: refetchUserSkills } = useApi(() => 
    skillsApi.getSkillsByApplicant(user.applicantId || user.userId)
  );

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
              onClick={() => console.log('Edit profile clicked')}
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
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => setShowSkillsModal(true)}
              >
                <i className="fas fa-plus"></i>
                Add Skills
              </Button>
            </div>
            <div className="skills-list">
              {userSkills?.length > 0 ? (
                userSkills.map(skill => (
                  <div key={skill.id} className="skill-item">
                    <span className="skill-tag">{skill.skillName || skill.name}</span>
                    <span className="skill-level">{skill.proficiencyLevel}</span>
                  </div>
                ))
              ) : (
                <p className="empty-state">No skills added yet. Add your skills to improve job matching.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSkillsModal && (
        <SkillsModal 
          availableSkills={availableSkills}
          onClose={() => setShowSkillsModal(false)}
          onSkillAdded={refetchUserSkills}
          userId={user.applicantId || user.userId}
        />
      )}
    </div>
  );
};

const SkillsModal = ({ availableSkills, onClose, onSkillAdded, userId }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('BEGINNER');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!selectedSkill) return;

    try {
      await skillsApi.addSkillToApplicant({
        applicantId: userId,
        skillId: selectedSkill,
        proficiencyLevel,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : undefined
      });
      onSkillAdded();
      onClose();
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const skillsArray = Array.isArray(availableSkills) ? availableSkills : 
    (availableSkills?.content || availableSkills?.data || []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Skill</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleAddSkill} className="skill-form">
          <div className="form-group">
            <label>Skill</label>
            <select 
              value={selectedSkill} 
              onChange={(e) => setSelectedSkill(e.target.value)}
              required
            >
              <option value="">Select a skill...</option>
              {skillsArray.map(skill => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Proficiency Level</label>
            <select 
              value={proficiencyLevel} 
              onChange={(e) => setProficiencyLevel(e.target.value)}
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Years of Experience (optional)</label>
            <input 
              type="number" 
              min="0" 
              max="50"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              placeholder="e.g., 3"
            />
          </div>
          
          <div className="modal-actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Skill
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicantProfilePage;