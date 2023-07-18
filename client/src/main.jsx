import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';

// you can make your css apply first by using styledEngineProvider.
// To inject your css into the head on top of material ui styles.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_G_CLIENT_ID}`}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <Router>
            <App />
          </Router>
        </StyledEngineProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
