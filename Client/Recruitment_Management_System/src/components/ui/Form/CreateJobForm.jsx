import React, { useState } from 'react';
import FormField from './FormField';
import './CreateJobForm.css';

const CreateJobForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    sector: '',
    description: '',
    requirements: '',
    jobType: '',
    workMode: '',
    locationCity: '',
    locationState: '',
    locationCountry: '',
    salaryMin: '',
    salaryMax: '',
    experienceRequired: '',
    status: 'ACTIVE',
    applicationDeadline: '',
    positionsAvailable: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const jobTypeOptions = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACT', label: 'Contract' },
    { value: 'INTERN', label: 'Internship' },
    { value: 'TEMPORARY', label: 'Temporary' }
  ];

  const workModeOptions = [
    { value: 'REMOTE', label: 'Remote' },
    { value: 'HYBRID', label: 'Hybrid' },
    { value: 'ONSITE', label: 'On-site' }
  ];

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'CLOSED', label: 'Closed' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (formData.title.length > 100) {
      newErrors.title = 'Title must not exceed 100 characters';
    }

    if (!formData.description || formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    if (formData.description.length > 5000) {
      newErrors.description = 'Description must not exceed 5000 characters';
    }

    if (!formData.requirements || formData.requirements.trim().length === 0) {
      newErrors.requirements = 'Requirements are required';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Job type is required';
    }

    if (!formData.workMode) {
      newErrors.workMode = 'Work mode is required';
    }

    if (formData.salaryMin && formData.salaryMax && Number(formData.salaryMin) > Number(formData.salaryMax)) {
      newErrors.salaryMin = 'Minimum salary cannot exceed maximum salary';
    }

    if (formData.applicationDeadline) {
      const deadline = new Date(formData.applicationDeadline);
      if (deadline <= new Date()) {
        newErrors.applicationDeadline = 'Application deadline must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      setSuccessMessage('Job created successfully!');
      setFormData({
        title: '',
        department: '',
        sector: '',
        description: '',
        requirements: '',
        jobType: '',
        workMode: '',
        locationCity: '',
        locationState: '',
        locationCountry: '',
        salaryMin: '',
        salaryMax: '',
        experienceRequired: '',
        status: 'ACTIVE',
        applicationDeadline: '',
        positionsAvailable: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      department: '',
      sector: '',
      description: '',
      requirements: '',
      jobType: '',
      workMode: '',
      locationCity: '',
      locationState: '',
      locationCountry: '',
      salaryMin: '',
      salaryMax: '',
      experienceRequired: '',
      status: 'ACTIVE',
      applicationDeadline: '',
      positionsAvailable: ''
    });
    setErrors({});
  };

  return (
    <div className="create-job-form">
      {successMessage && (
        <div className="success-banner">
          <i className="fas fa-check-circle"></i>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-left">
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>

            <div className="form-row two-cols">
              <FormField
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                required
                placeholder="e.g., Senior Software Engineer"
              />
              <FormField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
                placeholder="e.g., Engineering"
              />
            </div>

            <div className="form-row two-cols">
              <FormField
                label="Sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                error={errors.sector}
                placeholder="e.g., Technology"
              />
              <FormField
                label="Job Status"
                name="status"
                type="select"
                value={formData.status}
                onChange={handleChange}
                error={errors.status}
                options={statusOptions}
                required
              />
            </div>

            <FormField
              label="Job Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              required
              placeholder="Describe the role, responsibilities, and expectations... (50-5000 characters)"
            />
          </div>

          <div className="form-section">
            <h2 className="section-title">Employment Details</h2>

            <div className="form-row two-cols">
              <FormField
                label="Job Type"
                name="jobType"
                type="select"
                value={formData.jobType}
                onChange={handleChange}
                error={errors.jobType}
                options={jobTypeOptions}
                required
              />
              <FormField
                label="Work Mode"
                name="workMode"
                type="select"
                value={formData.workMode}
                onChange={handleChange}
                error={errors.workMode}
                options={workModeOptions}
                required
              />
            </div>

            <div className="form-row">
              <FormField
                label="Years of Experience Required"
                name="experienceRequired"
                type="number"
                value={formData.experienceRequired}
                onChange={handleChange}
                error={errors.experienceRequired}
                placeholder="e.g., 5"
              />
              <FormField
                label="Positions Available"
                name="positionsAvailable"
                type="number"
                value={formData.positionsAvailable}
                onChange={handleChange}
                error={errors.positionsAvailable}
                placeholder="e.g., 2"
              />
            </div>
          </div>
        </div>

        <div className="form-right">
          <div className="form-section">
            <h2 className="section-title">Requirements</h2>

            <FormField
              label="Requirements"
              name="requirements"
              type="textarea"
              value={formData.requirements}
              onChange={handleChange}
              error={errors.requirements}
              required
              rows={3}
              placeholder="List required skills, experience, qualifications..."
            />
          </div>

          <div className="form-section">
            <h2 className="section-title">Location</h2>

            <div className="form-row three-cols">
              <FormField
                label="City"
                name="locationCity"
                value={formData.locationCity}
                onChange={handleChange}
                error={errors.locationCity}
                placeholder="e.g., San Francisco"
              />
              <FormField
                label="State/Province"
                name="locationState"
                value={formData.locationState}
                onChange={handleChange}
                error={errors.locationState}
                placeholder="e.g., CA"
              />
              <FormField
                label="Country"
                name="locationCountry"
                value={formData.locationCountry}
                onChange={handleChange}
                error={errors.locationCountry}
                placeholder="e.g., USA"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Compensation & Application</h2>

            <div className="form-row two-cols">
              <FormField
                label="Minimum Salary"
                name="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={handleChange}
                error={errors.salaryMin}
                placeholder="e.g., 100000"
              />
              <FormField
                label="Maximum Salary"
                name="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={handleChange}
                error={errors.salaryMax}
                placeholder="e.g., 150000"
              />
              <FormField
                label="Application Deadline"
                name="applicationDeadline"
                type="datetime-local"
                value={formData.applicationDeadline}
                onChange={handleChange}
                error={errors.applicationDeadline}
                placeholder="Select date and time"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating...
              </>
            ) : (
              "Create Job Posting"
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;