import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import "../Pages.css";
import { jobsApi } from "../../api/endpoints/jobs.api";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

 

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const data = await jobsApi.getJob(id);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };
    fetchJob();
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
