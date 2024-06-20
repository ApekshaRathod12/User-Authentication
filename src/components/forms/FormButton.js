import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({ type, label, className = 'btn btn-primary', onClick, disabled }) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FormButton;