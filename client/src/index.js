import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { UserProvider } from './UserContext';

const clientId = '451439799090-bn53t49hj9vso4k8v4d56fi9ncd2kc0m.apps.googleusercontent.com'; // Replace with your Google Client ID

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <UserProvider>
        <App />
    </UserProvider>
  </GoogleOAuthProvider>
);
