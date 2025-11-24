import React from 'react';
import Button from '../../atoms/Button/Button';
import FormField from '../../common/FormField';
import './JobForm.css';

const JobForm = ({ 
  formData, 
  onChange, 
  onSubmit, 
  loading = false,
  submitText = "Create Job",
  title = "Create New Job"
}) => {
  const jobTypeOptions = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACT', label: 'Contract' }
  ];

  return (
    <div className="job-form-card">
      <div className="job-form-header">
        <h2>{title}</h2>
      </div>
      
      <form onSubmit={onSubmit} className="job-form">
        <div className="form-row">
          <FormField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            placeholder="e.g. Senior Software Engineer"
          />
          
          <FormField
            label="Job Type"
            type="select"
            name="type"
            value={formData.type}
            onChange={onChange}
            options={jobTypeOptions}
          />
        </div>

        <div className="form-row">
          <FormField
            label="Location"
            name="location"
            value={formData.location}
            onChange={onChange}
            required
            placeholder="e.g. San Francisco, CA"
          />
          
          <FormField
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={onChange}
            placeholder="e.g. $80,000 - $120,000"
          />
        </div>
        
        <FormField
          label="Job Description"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          placeholder="Describe the role, responsibilities, and what you're looking for..."
        />
        
        <FormField
          label="Requirements"
          type="textarea"
          name="requirements"
          value={formData.requirements}
          onChange={onChange}
          required
          placeholder="List the required skills, experience, and qualifications..."
        />
        
        <div className="form-actions">
          <Button 
            type="submit" 
            variant="primary"
            size="large"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i>
                {submitText}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;