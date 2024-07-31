import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSignInAlt } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserContext } from '../UserContext'; // Assume you have a UserContext

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setUser } = useContext(UserContext); // Use context to update user state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData);
      setUser(response.data.user); // Update user context with profile details
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', { token: response.credential });
      setUser(res.data.user); // Update user context with profile details
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error with Google sign in:', error);
    }
  };

  const handleGoogleLoginFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <SignInWrapper>
      <SignInForm onSubmit={handleSubmit}>
        <FormHeader>
          <FaSignInAlt size={40} />
          <h1>Sign In</h1>
        </FormHeader>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Sign In</SubmitButton>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        />
      </SignInForm>
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  h1 {
    margin: 0;
    color: #007bff;
  }

  svg {
    color: #007bff;
    margin-bottom: 0.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default SignInPage;
