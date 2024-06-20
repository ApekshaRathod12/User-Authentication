  import React from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import FormComponent from '../components/forms/FormComponent';
  import { registerUser } from '../redux/slices/userSlice';
  import * as Yup from 'yup'
  import { ToastContainer } from 'react-toastify';

  const registrationFields = [
    { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
    { label: 'Confirm Password', name: 'confirm_password', type: 'password', placeholder: 'Confirm your password' }
  ];

  const Registration = () => {
    
    const initialValues = {
      username : '',
      email : '',
      password : '',
      confirm_password : ''
    }

    const validationSchema = Yup.object({
      username: Yup.string()
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-z]/, 'Must contain at least one lowercase character')
        .matches(/[A-Z]/, 'Must contain at least one uppercase character')
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Required')
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = async (values, { setSubmitting }) => {
      try {
        const result = await dispatch(registerUser(values)).unwrap();
        if (result) {
          await delay(2000);
          navigate('/login');
        }
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className='container mt-5 form_page'>
        <h1>Registration</h1>
        {error && <p className="text-danger">{error}</p>}
        <FormComponent
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={registrationFields}
          isSubmitting={loading}
        />
        <p>Already Registered? <a href='/login'>Login</a> </p>
        <ToastContainer/>
      </div>
    );
  };

  export default Registration;
