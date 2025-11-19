import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button/Button';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;