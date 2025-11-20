import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;