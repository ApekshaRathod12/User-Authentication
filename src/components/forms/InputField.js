import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const InputField = ({
  label = '',
  name,
  type,
  placeholder = '',
  classname = '',
  ...props
}) => {

  const [showPassword , setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (



    <div className='input_container'>
      <label htmlFor={name} className='form-label'>{label}</label>
      <div className='input_wrapper'>
      <Field
        id={name}
        name={name}
        type={showPassword ? type : 'text'}
        placeholder={placeholder}
        className="form-control"
        {...props}
      />
      {type === 'password' && (
        <span className='password-toggle-icon' onClick={togglePasswordVisibility}>
          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </span>
      )}
      </div>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  classname: PropTypes.string
};

export default InputField;
