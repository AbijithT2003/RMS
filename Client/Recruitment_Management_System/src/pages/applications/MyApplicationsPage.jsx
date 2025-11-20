import React from "react";
import { applicationsApi } from "../../api/endpoints/applications.api";
import { useApi } from "../../hooks/useApi";
import PageLayout from "../../components/common/PageLayout";
import "./MyApplicationsPage.css";

const MyApplicationsPage = () => {
  const { data, loading, error, refetch } = useApi(() =>
    applicationsApi.getMyApplications()
  );

  const applications = data?.content || [];

  return (
    <PageLayout
      title="My Applications"
      loading={loading}
      error={error}
      onRetry={refetch}
      hideHeader={true}
    >
      <div className="applications-list">
        {applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="application-card">
              <h3>{app.jobTitle}</h3>

              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </p>
              {app.resumeUrl && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    View Resume
                  </a>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default MyApplicationsPage;
