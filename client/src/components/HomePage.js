import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaNewspaper, FaUserCircle, FaQuestionCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useSpring } from 'react-spring';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../UserContext';
import Menu from '../components/Menu';
import {
  HomePageWrapper, Nav, NavLinks, NavLink, UserProfile, ProfilePicture, LogoutButton, Hero, SearchBar, SearchButton, SuggestionsList, SuggestionItem, HighlightedServices, ServiceGrid, ServiceCard, ServiceImage, ServiceName, ServiceDescription, ContentSection, QuickLinksSection, QuickLinksGrid, QuickLink, ThemeToggle, lightTheme, darkTheme, GlobalStyle
} from '../styles/HomePageStyles';

const HomePage = () => {
  const [highlightedServices, setHighlightedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [theme, setTheme] = useState('light');
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighlightedServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/highlighted-services');
        setHighlightedServices(response.data);
      } catch (error) {
        console.error('Error fetching highlighted services:', error);
      }
    };

    fetchHighlightedServices();
  }, []);

  const handleLogout = () => {
    clearUser();
    navigate('/signin');
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        const categories = response.data;
        const filteredSuggestions = categories.filter(category =>
          category.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (category) => {
    navigate(`/category/${category}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  const heroProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <HomePageWrapper>
        <Nav>
          <NavLinks>
            {user ? (
              <UserProfile>
                <ProfilePicture src={user.picture} alt={user.name} />
                <span>{user.name}</span>
                <LogoutButton onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </LogoutButton>
              </UserProfile>
            ) : (
              <>
                <NavLink to="/signin">
                  <FaSignInAlt /> Sign In
                </NavLink>
                <NavLink to="/signup">
                  <FaUserPlus /> Sign Up
                </NavLink>
              </>
            )}
            <ThemeToggle onClick={toggleTheme}>
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </ThemeToggle>
          </NavLinks>
        </Nav>
        {user && <Menu />}
        <Hero style={heroProps}>
          <h1>Welcome to Sri Lanka Citizen Services Portal</h1>
          <p>Your one-stop solution for all government services</p>
          <SearchBar>
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchButton><FaSearch /></SearchButton>
            {suggestions.length > 0 && (
              <SuggestionsList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.replace('-', ' ')}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
          </SearchBar>
        </Hero>

        <HighlightedServices>
          <h2>Highlighted Services</h2>
          <ServiceGrid>
            {highlightedServices.map(service => (
              <ServiceCard key={service.id} href={service.url} target="_blank" rel="noopener noreferrer">
                <ServiceImage src={`/images/${service.image}`} alt={service.name} />
                <ServiceName>{service.name}</ServiceName>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </HighlightedServices>

        <QuickLinksSection>
          <h2>Quick Links</h2>
          <QuickLinksGrid>
            {user && <QuickLink to="/profile"><FaUserCircle /> My Profile</QuickLink>}
            <QuickLink to="/faq"><FaQuestionCircle /> FAQ</QuickLink>
            <QuickLink to="/contact"><FaEnvelope /> Contact Us</QuickLink>
          </QuickLinksGrid>
        </QuickLinksSection>
      </HomePageWrapper>
    </ThemeProvider>
  );
};

export default HomePage;
