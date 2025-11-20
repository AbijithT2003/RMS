import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/common/PageLayout';
import FormField from '../../components/common/FormField';
import Button from '../../components/atoms/Button/Button';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update profile
      localStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
      navigate(-1);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Edit Profile">
      <form onSubmit={handleSubmit} className="profile-form">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        
        <FormField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        
        <div className="form-actions">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default EditProfilePage;