import React, { useState } from 'react';
import { interviewsApi } from '../../api/endpoints/interviews.api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/organisms/Header/Header';
import Button from '../../components/atoms/Button/Button';

const InterviewSchedulePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicationId: '',
    interviewerId: '',
    scheduledDate: '',
    scheduledTime: '',
    type: 'TECHNICAL',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
      const interviewData = {
        ...formData,
        scheduledDate: scheduledDateTime.toISOString()
      };
      
      await interviewsApi.scheduleInterview(interviewData);
      navigate('/recruiter/interviews');
    } catch (error) {
      console.error('Error scheduling interview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Schedule Interview</h1>
        
        <form onSubmit={handleSubmit} className="interview-form">
          <div className="form-group">
            <label>Application ID</label>
            <input
              type="text"
              name="applicationId"
              value={formData.applicationId}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Interviewer ID</label>
            <input
              type="text"
              name="interviewerId"
              value={formData.interviewerId}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Interview Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="TECHNICAL">Technical</option>
              <option value="HR">HR</option>
              <option value="BEHAVIORAL">Behavioral</option>
              <option value="FINAL">Final</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes for the interview..."
            />
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Scheduling...' : 'Schedule Interview'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InterviewSchedulePage;