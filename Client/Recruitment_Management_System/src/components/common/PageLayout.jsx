import React from "react";
import Header from "../organisms/Header/Header";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import "./PageLayout.css";

const PageLayout = ({
  children,
  title,
  loading = false,
  error = null,
  onRetry = null,
  navigationItems = [],
  showAuthButtons = false,
  hideHeader = false,
}) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={onRetry} />;

  const shouldRenderHeader =
    !hideHeader &&
    ((navigationItems && navigationItems.length > 0) || showAuthButtons);

  return (
    <div>
      {shouldRenderHeader && (
        <Header
          navigationItems={navigationItems}
          showAuthButtons={showAuthButtons}
        />
      )}
      <div className="page-layout-container">
        {title && !hideHeader && <h1 className="panel-title">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
