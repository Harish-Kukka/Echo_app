import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';

// you can make your css apply first by using styledEngineProvider.
// To inject your css into the head on top of material ui styles.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
