import React from 'react';
import Header from '../organisms/Header/Header';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const PageLayout = ({ 
  children, 
  title, 
  loading = false, 
  error = null, 
  onRetry = null,
  navigationItems = [],
  showAuthButtons = false,
  hideHeader = false
}) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={onRetry} />;

  return (
    <div>
      {!hideHeader && <Header navigationItems={navigationItems} showAuthButtons={showAuthButtons} />}
      <div className="container">
        {title && !hideHeader && <h1>{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;