import React from "react";
import styles from "./Button.module.css";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "medium", 
  onClick, 
  disabled = false,
  className = "",
  ...props 
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn--${variant}`]} ${styles[`btn--${size}`]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;