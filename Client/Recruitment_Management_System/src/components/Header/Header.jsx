import React from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/context/AuthContext";

const Header = ({
  onLogin,
  onRegister,
  navigationItems = [],
  showAuthButtons = true,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const Logout = async () => {
    await logout();
    navigate("/");
  };

  const handleFeatureClick = (featureTitle) => {
    // Convert feature title to an id format (lowercase, replace spaces with hyphens)
    const featureId = featureTitle.toLowerCase().replace(/\s+/g, "-");

    // Find the element with the corresponding id
    const element = document.getElementById(featureId);

    if (element) {
      // Scroll to the element smoothly
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <h2 className="panel-title">RMS</h2>
          </div>

          <nav className="header__nav">
            {navigationItems.map((item, index) => (
              <Dropdown
                key={index}
                trigger={<span className="fw-medium">{item.label}</span>}
              >
                {item.items &&
                  item.items.map((subItem, subIndex) => (
                    <span
                      key={subIndex}
                      className="dropdown-item small muted"
                      onClick={async () => {
                        // If a parent (e.g., DashboardContainer) provided a handler, delegate to it
                        if (onNavigate) {
                          await onNavigate(subItem);
                          return;
                        }

                        // Fallback behavior when Header is used standalone
                        if (item.label === "Features") {
                          handleFeatureClick(subItem.label);
                        } else if (subItem.label === "Logout") {
                          await Logout();
                        } else if (subItem.href) {
                          navigate(subItem.href);
                        }
                      }}
                    >
                      {subItem.label}
                    </span>
                  ))}
              </Dropdown>
            ))}
          </nav>
          {showAuthButtons && (
            <div className="header__auth">
              <Button variant="secondary" size="small" onClick={onLogin}>
                Login
              </Button>
              <Button variant="primary" size="small" onClick={onRegister}>
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
