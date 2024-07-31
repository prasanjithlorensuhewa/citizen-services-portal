import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${category}`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  const capitalize = (str) => {
    return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <CategoryWrapper>
      <CategoryTitle>{capitalize(category)}</CategoryTitle>
      <ServiceGrid>
        {services.map(service => (
          <ServiceLink key={service.id} href={service.url} target="_blank" rel="noopener noreferrer">
            <ServiceCard>
              <ServiceImage src={`/images/${service.image}`} alt={service.name} />
              <ServiceName>{service.name}</ServiceName>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          </ServiceLink>
        ))}
      </ServiceGrid>
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
`;

const CategoryTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-transform: capitalize;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ServiceLink = styled.a`
  text-decoration: none;
`;

const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 
  0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ServiceName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #007bff;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

export default CategoryPage;
