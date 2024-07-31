import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';

export const lightTheme = {
  body: '#FFF',
  text: '#333',
  backgroundColor: '#f8f9fa',
  cardBackground: '#fff',
  cardShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  cardHoverShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  navBackground: '#007bff',
};

export const darkTheme = {
  body: '#333',
  text: '#FFF',
  backgroundColor: '#444',
  cardBackground: '#555',
  cardShadow: '0 4px 10px rgba(255, 255, 255, 0.1)',
  cardHoverShadow: '0 8px 20px rgba(255, 255, 255, 0.1)',
  navBackground: '#222',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

export const HomePageWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  transition: all 0.3s linear;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.navBackground};
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  transition: color 0.3s;

  &:hover {
    color: #ddd;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.1rem;
`;

export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    color: #ddd;
  }
`;

export const Hero = styled(animated.header)`
  background: linear-gradient(135deg, #0056b3, #007bff);
  color: white;
  text-align: center;
  padding: 4rem 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  max-width: 600px;
  margin: 0 auto;

  input {
    flex-grow: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px 0 0 4px;
  }
`;

export const SearchButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style-type: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SuggestionItem = styled.li`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const HighlightedServices = styled.div`
  padding: 1rem 0;
  background-color: ${({ theme }) => theme.backgroundColor};
  text-align: center;
`;

export const ServiceGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 0.5rem;
`;

export const ServiceCard = styled.a`
  flex: 0 0 auto;
  width: 250px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.cardHoverShadow};
  }
`;

export const ServiceImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

export const ServiceName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #007bff;
`;

export const ServiceDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

export const ContentSection = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 2rem auto;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const QuickLinksSection = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 2rem;
  text-align: center;
`;

export const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const QuickLink = styled(Link)`
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ThemeToggle = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  margin-right: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
