import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthPage.css";
import { useAuth } from "../../api/context/AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth(); //to get login and register functions

  // Detect auth mode from query params
  const [isLogin, setIsLogin] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("mode") !== "register"; // default: login
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "CANDIDATE",
  });

  // Switch UI mode when ?mode changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsLogin(params.get("mode") !== "register");
  }, [location.search]);

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        ...(isLogin
          ? {}
          : { fullName: formData.fullName, role: formData.role }), //only include fullName and role if registering
      };

      const { user } = isLogin ? await login(payload) : await register(payload);

      console.log('Login successful, user:', user);
      console.log('User role:', user.role);
      console.log('User roles:', user.roles);

      // Redirect based on role
      const role = user.role;
      console.log('Redirecting based on role:', role);
      
      if (role === "ADMIN") {
        console.log('Navigating to admin dashboard');
        navigate("/admin-dashboard");
      } else if (role === "RECRUITER") {
        console.log('Navigating to recruiter dashboard');
        navigate("/recruiter-dashboard");
      } else if (role === "CANDIDATE" || role === "APPLICANT") {
        console.log('Navigating to applicant dashboard');
        navigate("/applicant-dashboard");
      } else {
        console.log('Unknown role, defaulting to applicant dashboard for now');
        navigate("/applicant-dashboard"); // Temporary fallback
      }

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Split showcase companies into two sets so the showcase grid matches the form height
  const companiesLogin = [
    { name: "Google", positions: "312 open positions", color: "#4285F4" },
    { name: "Microsoft", positions: "185 open positions", color: "#2B7CD3" },
    { name: "Amazon", positions: "420 open positions", color: "#FF9900" },
    { name: "Meta", positions: "96 open positions", color: "#1877F2" },
    { name: "Netflix", positions: "38 open positions", color: "#E50914" },
    { name: "Apple", positions: "74 open positions", color: "#A2AAAD" },
  ];

  const companiesRegister = [
    { name: "Google", positions: "312 open positions", color: "#4285F4" },
    { name: "Microsoft", positions: "185 open positions", color: "#2B7CD3" },
    { name: "Amazon", positions: "420 open positions", color: "#FF9900" },
    { name: "Meta", positions: "96 open positions", color: "#1877F2" },
    { name: "Netflix", positions: "38 open positions", color: "#E50914" },
    { name: "Apple", positions: "74 open positions", color: "#A2AAAD" },
    { name: "LinkedIn", positions: "58 open positions", color: "#0077B5" },
    { name: "Adobe", positions: "67 open positions", color: "#FF0000" },
    { name: "IBM", positions: "102 open positions", color: "#0530AD" },
    { name: "Salesforce", positions: "89 open positions", color: "#00A1E0" },
  ];

  const companiesToShow = isLogin ? companiesLogin : companiesRegister;

  return (
    <div className={`auth-page ${isLogin ? "mode-login" : "mode-register"}`}>
      <div className="container">
        <header className="auth-header">
          <button className="auth-back-btn" onClick={() => navigate("/")}>
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
        </header>

        <div className="auth-content">
          {/* FORM SECTION */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <h1 className="auth-title">Welcome to RMS</h1>
              <p className="auth-subtitle">
                {isLogin
                  ? "Sign in to access your account"
                  : "Create your account to get started"}
              </p>

              {/* Mode Toggle */}
              <div className="auth-mode-toggle">
                <button
                  className={`mode-btn ${isLogin ? "active" : ""}`}
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </button>
                <button
                  className={`mode-btn ${!isLogin ? "active" : ""}`}
                  onClick={() => setIsLogin(false)}
                >
                  Create Account
                </button>
              </div>

              {/* FORM */}
              <form className="auth-form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className="form-input"
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
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
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <div className="password-input-container">
                    <input
                      className="form-input"
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
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
                      onChange={handleChange}
                    >
                      <option value="CANDIDATE">Job Seeker</option>
                      <option value="RECRUITER">Recruiter</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={loading}
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

          {/* SHOWCASE SECTION */}
          <div className="auth-showcase">
            <div className="showcase-content">
              <h2 className="showcase-title">Explore Opportunities</h2>
              <p className="showcase-subtitle">
                Connect with top companies and discover your next career move.
              </p>

              <div className="showcase-grid">
                {companiesToShow.map((c, i) => (
                  <div className="showcase-card" key={i}>
                    <div
                      className="showcase-icon"
                      style={{ backgroundColor: c.color }}
                    >
                      <span className="showcase-icon-text">{c.name[0]}</span>
                    </div>
                    <div className="showcase-info">
                      <h3 className="showcase-company">{c.name}</h3>
                      <p className="showcase-positions">{c.positions}</p>
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
