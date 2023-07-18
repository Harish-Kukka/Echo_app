import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import Navbar from './components/Navbar/Navbar';
import './index.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
