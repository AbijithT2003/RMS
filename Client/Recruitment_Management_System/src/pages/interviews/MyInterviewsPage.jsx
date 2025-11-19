import React, { useState, useEffect } from 'react';
import { interviewsApi } from '../../api/endpoints/interviews.api';
import Header from '../../components/organisms/Header/Header';

const MyInterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.id) {
        const response = await interviewsApi.getInterviewsByInterviewer(user.id);
        setInterviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>My Interviews</h1>
        
        <div className="interviews-list">
          {interviews.map(interview => (
            <div key={interview.id} className="interview-card">
              <h3>{interview.jobTitle}</h3>
              <p>Candidate: {interview.candidateName}</p>
              <p>Date: {new Date(interview.scheduledDate).toLocaleDateString()}</p>
              <p>Time: {new Date(interview.scheduledDate).toLocaleTimeString()}</p>
              <p>Type: {interview.type}</p>
              <span className={`status ${interview.status.toLowerCase()}`}>
                {interview.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyInterviewsPage;