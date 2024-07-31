import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from '../UserContext';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(user ? user.picture : '');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userId', user._id); // Ensure user ID is available in context

    try {
      const response = await axios.post('http://localhost:5000/api/upload-profile-picture', formData);
      const updatedUser = { ...user, picture: response.data.picture };
      setUser(updatedUser);
      navigate('/'); // Redirect to Home Page after successful upload
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <ProfileWrapper>
      <ProfileForm onSubmit={handleUpload}>
        <h1>Profile Page</h1>
        {preview && <img src={preview} alt="Profile Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </ProfileForm>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h1 {
    color: #007bff;
  }

  input[type='file'] {
    margin: 1rem 0;
  }

  button {
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
  }
`;

export default ProfilePage;
