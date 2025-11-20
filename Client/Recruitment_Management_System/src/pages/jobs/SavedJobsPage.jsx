import React from "react";
import Header from "../../components/organisms/Header/Header";
import "../Pages.css";

const SavedJobsPage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Saved Jobs</h1>
        <p>You haven't saved any jobs yet.</p>
      </div>
    </div>
  );
};

export default SavedJobsPage;
