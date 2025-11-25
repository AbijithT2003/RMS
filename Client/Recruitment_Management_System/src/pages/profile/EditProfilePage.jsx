import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../api/context/useNotificationHook";
import PageLayout from "../../components/common/PageLayout";
import FormField from "../../components/common/FormField";
import Button from "../../components/Button/Button";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    firstName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update profile
      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      notification.success("Profile updated successfully!", "Success");
      navigate(-1);
    } catch (error) {
      notification.error("Failed to update profile", "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Edit Profile">
      <form onSubmit={handleSubmit} className="profile-form">
        <FormField
          label="Full Name"
          name="firstName"
          value={formData.fullname}
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
            {loading ? "Saving..." : "Save Changes"}
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
