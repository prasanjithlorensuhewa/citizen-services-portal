import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFF',
  text: '#333',
  cardBackground: '#FFF',
  cardShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  body: '#333',
  text: '#FFF',
  cardBackground: '#444',
  cardShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }

  .card {
    background-color: ${({ theme }) => theme.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
  }
`;
