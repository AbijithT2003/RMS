import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobsApi } from "../../api/endpoints/jobs.api";
import Header from "../../components/organisms/Header/Header";
import Button from "../../components/atoms/Button/Button";
import "../Pages.css";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    type: "FULL_TIME",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await jobsApi.getJob(id);
        const j = res.data;
        setFormData({
          title: j.title || "",
          description: j.description || "",
          requirements: j.requirements || "",
          location: j.location || "",
          salary: j.salary || "",
          type: j.type || "FULL_TIME",
        });
      } catch (err) {
        console.error("Error fetching job", err);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await jobsApi.updateJob(id, formData);
      navigate("/recruiter/jobs");
    } catch (err) {
      console.error("Error updating job", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Edit Job</h1>
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
