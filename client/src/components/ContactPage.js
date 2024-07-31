import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual endpoint for sending contact messages
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <ContactWrapper>
      <ContactHeader>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please fill out the form below or contact us through one of the following ways.</p>
      </ContactHeader>

      <ContactContent>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </FormGroup>
          <SubmitButton type="submit"><FaPaperPlane /> Send Message</SubmitButton>
          {status && <StatusMessage>{status}</StatusMessage>}
        </ContactForm>

        <ContactInfo>
          <InfoItem>
            <FaPhone />
            <p>+94 701 597 950</p>
          </InfoItem>
          <InfoItem>
            <FaEnvelope />
            <p>info@citizenservices.lk</p>
          </InfoItem>
          <InfoItem>
            <FaMapMarkerAlt />
            <p>123 Main Street, Colombo, Sri Lanka</p>
          </InfoItem>
        </ContactInfo>
      </ContactContent>
    </ContactWrapper>
  );
};

const ContactWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 0.5rem;
    color: #007bff;
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input, textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    height: 100px;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #007bff;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
    font-size: 1.1rem;
    color: #555;
  }

  svg {
    font-size: 1.5rem;
    color: #007bff;
  }
`;

export default ContactPage;
