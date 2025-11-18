import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.module.css";

const Dropdown = ({ trigger, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div className="dropdown__trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
        <i className={`fas fa-chevron-down dropdown__arrow ${isOpen ? 'dropdown__arrow--open' : ''}`}></i>
      </div>
      {isOpen && (
        <div className="dropdown__menu">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;