import React from "react";
import Button from "../../atoms/Button/Button";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../api/context/AuthContext";


const Header = ({ onLogin, onRegister ,navigationItems=[],showAuthButtons=true } )=> {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');

  };
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
          </nav>
          {showAuthButtons &&(
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