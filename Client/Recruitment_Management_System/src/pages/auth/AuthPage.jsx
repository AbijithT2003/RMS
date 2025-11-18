import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../../api/endpoints/auth.api";
import "./AuthPage.css";

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(() => {
    const params = new URLSearchParams(
      window.location.search || location.search
    );
    return params.get("mode") !== "register";
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "applicant",
  });
  const navigate = useNavigate();

  // Update mode when query param changes (if user navigates with query)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "register") setIsLogin(false);
    if (params.get("mode") === "login") setIsLogin(true);
  }, [location.search]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authAPI.register(formData);
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      if (response.user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/applicant-dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const companies = [
    {
      name: "Google",
      positions: "312 open positions",
      color: "var(--accent-primary)",
    },
    {
      name: "Microsoft",
      positions: "185 open positions",
      color: "var(--accent-secondary)",
    },
    {
      name: "Amazon",
      positions: "420 open positions",
      color: "var(--accent-hover)",
    },
    {
      name: "Meta",
      positions: "96 open positions",
      color: "var(--accent-primary)",
    },
    {
      name: "Netflix",
      positions: "38 open positions",
      color: "var(--accent-warning)",
    },
    {
      name: "Apple",
      positions: "74 open positions",
      color: "var(--accent-secondary)",
    },
  ];

  return (
    <div className="auth-page">
      <div className="container">
        <header className="auth-header">
          
          <button onClick={() => navigate("/")} className="auth-back-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </button>
        </header>

        <div className="auth-content">
          <div className="auth-form-section">
      

            <div className="auth-form-container">
              <h1 className="auth-title">Welcome to RMS</h1>
              <p className="auth-subtitle">
                {isLogin
                  ? "Sign in to access your account"
                  : "Create your account to get started"}
              </p>

              <div className="auth-mode-toggle">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`mode-btn ${isLogin ? "active" : ""}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`mode-btn ${!isLogin ? "active" : ""}`}
                >
                  Create Account
                </button>
              </div>

              <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        className="form-input"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        type="text"
                        required={!isLogin}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-input"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-input"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      type="password"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="form-group">
                      <label className="form-label" htmlFor="role">
                        Role
                      </label>
                      <select
                        className="form-input"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="applicant">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit"
                  >
                    {loading
                      ? "Processing..."
                      : isLogin
                      ? "Sign In"
                      : "Create Account"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="auth-showcase">
            <div className="showcase-content">
              <h2 className="showcase-title">Explore Opportunities</h2>
              <p className="showcase-subtitle">
                Connect with top companies and discover your next career move.
              </p>

              <div className="showcase-grid">
                {companies.map((company, index) => (
                  <div key={index} className="showcase-card">
                    <div
                      className="showcase-icon"
                      style={{ backgroundColor: company.color }}
                    >
                      <span className="showcase-icon-text">
                        {company.name[0]}
                      </span>
                    </div>
                    <div className="showcase-info">
                      <h3 className="showcase-company">{company.name}</h3>
                      <p className="showcase-positions">{company.positions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
