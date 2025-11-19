import React, { useState, useEffect } from 'react';
import { skillsApi } from '../../api/endpoints/skills.api';
import Header from '../../components/organisms/Header/Header';
import Button from '../../components/atoms/Button/Button';

const SkillsManagementPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsApi.getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    try {
      await skillsApi.addSkill({ name: newSkill });
      setNewSkill('');
      fetchSkills();
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchSkills();
      return;
    }
    try {
      const response = await skillsApi.searchSkills({ q: searchTerm });
      setSkills(response.data);
    } catch (error) {
      console.error('Error searching skills:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsApi.deleteSkill(id);
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Skills Management</h1>
        
        <div className="skills-actions">
          <form onSubmit={handleAddSkill} className="add-skill-form">
            <input
              type="text"
              placeholder="Add new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <Button type="submit">Add Skill</Button>
          </form>
          
          <div className="search-skills">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill.id} className="skill-card">
              <h3>{skill.name}</h3>
              <p>Category: {skill.category}</p>
              <Button onClick={() => handleDelete(skill.id)} variant="danger">
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsManagementPage;