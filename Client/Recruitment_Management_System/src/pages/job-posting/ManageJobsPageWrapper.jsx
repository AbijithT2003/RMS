import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardView from "../../components/common/DashboardView";
import ManageJobsPage from "./ManageJobsPage";

const ManageJobsPageWrapper = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: "Dashboard", onClick: () => navigate("/recruiter/dashboard") },
    { label: "Jobs" },
  ];

  return (
    <DashboardView title="Jobs" breadcrumbs={breadcrumbs}>
      <ManageJobsPage />
    </DashboardView>
  );
};

export default ManageJobsPageWrapper;
