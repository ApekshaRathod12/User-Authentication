import React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import InputField from './InputField';
import FormButton from './FormButton';

const FormComponent = ({
  onSubmit,
  initialValues,
  validationSchema,
  fields,
  isSubmitting = false,  
}) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      
    >
      {( { isSubmitting , resetForm }) => (
        <Form>
          {fields.map(field => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
          <div className="d-flex justify-content-between mt-3">
            <FormButton
              type="submit"
              label="Submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            />
            <FormButton
              type="button"
              label="Reset"
              className="btn btn-secondary"
              onClick={resetForm}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

FormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  })).isRequired,
  isSubmitting: PropTypes.bool,
};

export default FormComponent;
