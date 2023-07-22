import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import PostDetails from './components/PostDetails/PostDetails';
import './index.css';
import { Container } from '@mui/material';

const App = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/posts" replace={true} />} />
          <Route path="posts">
            <Route index element={<Home />} />
            <Route path="search" element={<Home />} />
            <Route path=":id" element={<PostDetails />} />
          </Route>
          <Route
            path="auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
