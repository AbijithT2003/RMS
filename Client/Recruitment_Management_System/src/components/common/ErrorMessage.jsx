import React from 'react';

const ErrorMessage = ({ error, onRetry }) => (
  <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
    <p>Error: {error}</p>
    {onRetry && <button onClick={onRetry}>Retry</button>}
  </div>
);

export default ErrorMessage;