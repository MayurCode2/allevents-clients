import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
    <Auth0Provider
    domain="dev-luh53zpa86q0bcid.us.auth0.com"
    clientId="ASybN0qUEFWXuCI8rP4MXnSp9yLmj1H1"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
