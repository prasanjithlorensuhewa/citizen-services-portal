import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <Hamburger onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <NavMenu isOpen={isOpen}>
        <NavLink to="/category/government-services">Government Services</NavLink>
        <NavLink to="/category/health-services">Health Services</NavLink>
        <NavLink to="/category/education-services">Education Services</NavLink>
        <NavLink to="/category/transport-services">Transport Services</NavLink>
        <NavLink to="/category/agriculture-services">Agriculture Services</NavLink>
        <NavLink to="/category/housing-services">Housing Services</NavLink>
      </NavMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 1rem 2rem;
`;

const Hamburger = styled.div`
  display: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #007bff;
    text-align: center;
    padding: 1rem 0;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  transition: color 0.3s;

  &:hover {
    color: #ddd;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 1rem 0;
  }
`;

export default Menu;
