import React, { useState } from 'react';
import { skillsApi } from '../../api/endpoints/skills.api';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/atoms/Button/Button';
import './SkillsManagementPage.css';

const SkillsManagementPage = () => {
  const { data: skills, loading, error, refetch } = useApi(() => skillsApi.getSkills());
  const [newSkill, setNewSkill] = useState({ name: '', category: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    
    try {
      await skillsApi.createSkill(newSkill);
      setNewSkill({ name: '', category: '', description: '' });
      refetch();
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsApi.deleteSkill(id);
        refetch();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="skills-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading skills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="skills-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Error loading skills: {error}</p>
          <button onClick={refetch} className="retry-button">
            <i className="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const skillsArray = Array.isArray(skills) ? skills : 
    (skills?.content || skills?.data || []);

  const filteredSkills = skillsArray.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h1>Skills Management</h1>
        <p>Manage system skills that can be added to job postings and applicant profiles</p>
      </div>
      
      <div className="skills-actions">
        <form onSubmit={handleAddSkill} className="add-skill-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Skill name..."
              value={newSkill.name}
              onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Category (optional)..."
              value={newSkill.category}
              onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
            />
          </div>
          <textarea
            placeholder="Description (optional)..."
            value={newSkill.description}
            onChange={(e) => setNewSkill({...newSkill, description: e.target.value})}
            rows="2"
          />
          <Button type="submit" variant="primary">
            <i className="fas fa-plus"></i>
            Add Skill
          </Button>
        </form>
        
        <div className="search-skills">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredSkills.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-cogs"></i>
          <h3>No Skills Found</h3>
          <p>No skills match your search criteria or no skills have been added yet.</p>
        </div>
      ) : (
        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <button 
                  onClick={() => handleDelete(skill.id)} 
                  className="delete-btn"
                  title="Delete skill"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              {skill.category && (
                <p className="skill-category">
                  <i className="fas fa-tag"></i>
                  {skill.category}
                </p>
              )}
              {skill.description && (
                <p className="skill-description">{skill.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsManagementPage;