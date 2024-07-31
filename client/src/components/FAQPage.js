import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I register for an account on the Citizen Services Portal?',
      answer: 'To register for an account, click on the "Sign Up" button on the top right corner and fill out the registration form with your details.',
    },
    {
      question: 'What types of services can I access through this portal?',
      answer: 'You can access various government services such as passport applications, vehicle registrations, health services, education services, and more.',
    },
    {
      question: 'How do I apply for a passport through the portal?',
      answer: 'To apply for a passport, navigate to the "Government Services" category, select "Passport Application," and follow the instructions provided.',
    },
    {
      question: 'How can I book a doctor’s appointment online?',
      answer: 'To book a doctor’s appointment, go to the "Health Services" category, select "Book an Appointment," and choose a healthcare provider from the available options.',
    },
    {
      question: 'What should I do if I encounter issues while using the portal?',
      answer: 'If you encounter any issues, you can contact customer support by visiting the "Contact Us" page and filling out the contact form or calling our support hotline.',
    },
    {
      question: 'How do I update my personal information on my profile?',
      answer: 'To update your personal information, log in to your account, go to the "Profile" page, and click on the "Edit" button to make changes.',
    },
    {
      question: 'Can I access this portal on my mobile device?',
      answer: 'Yes, the Citizen Services Portal is mobile-friendly and can be accessed on any device with an internet connection.',
    },
    {
      question: 'How do I reset my password if I forget it?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions to reset your password.',
    },
    {
      question: 'Is my personal information secure on this portal?',
      answer: 'Yes, your personal information is secure. We use advanced security measures to protect your data and ensure privacy.',
    },
    {
      question: 'How can I provide feedback about my experience with the portal?',
      answer: 'You can provide feedback by visiting the "Contact Us" page and submitting your comments or suggestions through the feedback form.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQWrapper>
      <FAQHeader>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most commonly asked questions below.</p>
      </FAQHeader>
      <FAQContent>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleFAQ(index)}>
              {faq.question}
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </Question>
            {activeIndex === index && <Answer>{faq.answer}</Answer>}
          </FAQItem>
        ))}
      </FAQContent>
    </FAQWrapper>
  );
};

const FAQWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
`;

const FAQHeader = styled.div`
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

const FAQContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff;

  svg {
    transition: transform 0.3s;
  }
`;

const Answer = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
  font-size: 1rem;
  color: #555;
`;

export default FAQPage;
