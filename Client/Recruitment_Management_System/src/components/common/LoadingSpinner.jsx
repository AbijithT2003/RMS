import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <div>{message}</div>
  </div>
);

export default LoadingSpinner;