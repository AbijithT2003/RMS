import React from "react";
import Button from "../../atoms/Button/Button";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import "./Header.css";

const Header = ({ onLogin, onRegister }) => {
  const navigationItems = [
    {
      label: "Features",
      items: [
        { label: "Job Posting", href: "/features/job-posting" },
        { label: "Candidate Management", href: "/features/candidates" },
        { label: "Interview Scheduling", href: "/features/interviews" },
        { label: "Analytics", href: "/features/analytics" }
      ]
    },
    {
      label: "Solutions",
      items: [
        { label: "For Recruiters", href: "/solutions/recruiters" },
        { label: "For HR Teams", href: "/solutions/hr" },
        { label: "For Enterprises", href: "/solutions/enterprise" }
      ]
    },
    {
      label: "Departments",
      items: [
        { label: "Engineering", href: "/departments/engineering" },
        { label: "Sales", href: "/departments/sales" },
        { label: "Marketing", href: "/departments/marketing" },
        { label: "Operations", href: "/departments/operations" }
      ]
    }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <h2>RMS</h2>
          </div>
          
          <nav className="header__nav">
            {navigationItems.map((item, index) => (
              <Dropdown
                key={index}
                trigger={<span>{item.label}</span>}
              >
                {item.items.map((subItem, subIndex) => (
                  <a key={subIndex} href={subItem.href} className="dropdown-item">
                    {subItem.label}
                  </a>
                ))}
              </Dropdown>
            ))}
            <a href="/pricing" className="header__link">Pricing</a>
            <a href="/jobs" className="header__link">Job Postings</a>
          </nav>
          
          <div className="header__auth">
            <Button variant="secondary" size="small" onClick={onLogin}>
              Login
            </Button>
            <Button variant="primary" size="small" onClick={onRegister}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;