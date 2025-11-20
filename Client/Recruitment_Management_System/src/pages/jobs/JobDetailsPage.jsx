import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import "../Pages.css";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // placeholder: in future fetch job details by id
    if (id) {
      setJob({
        id,
        title: `Job ${id}`,
        company: "Example Co",
        description: "Job details will appear here.",
      });
    }
  }, [id]);

  if (!job)
    return (
      <div>
        <Header />
        <div className="container">Loading job...</div>
      </div>
    );

  return (
    <div>
      <Header />
      <div className="container">
        <h1>{job.title}</h1>
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>{job.description}</p>
      </div>
    </div>
  );
};

export default JobDetailsPage;
