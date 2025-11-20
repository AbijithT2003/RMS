import React from 'react';

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required = false, 
  options = [], 
  placeholder = '' 
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
          />
        );
      case 'select':
        return (
          <select name={name} value={value} onChange={onChange} required={required}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      {renderInput()}
    </div>
  );
};

export default FormField;