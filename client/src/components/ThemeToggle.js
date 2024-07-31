import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import styled from 'styled-components';

const ToggleWrapper = styled.button`
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleWrapper onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </ToggleWrapper>
  );
};

export default ThemeToggle;
