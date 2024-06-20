
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/userSlice';
import FormComponent from '../components/forms/FormComponent';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
const Login = () => {
    const initialValues = {
        email : '',
        password: ''
    }
    
const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Must contain at least one lowercase character')
      .matches(/[A-Z]/, 'Must contain at least one uppercase character')
      .required('Password is required')
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      if (result) {
        await delay(2000);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false)
    }
  };
  const loginFields = [
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
  ];
  return (
    <div className="container mt-5 form_page">
      <h1>Login</h1>
      <FormComponent
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={loginFields}
      />
      <p>New User. <a href='/'>Register</a> </p>
      <ToastContainer/>
    </div>
  );
};
export default Login;