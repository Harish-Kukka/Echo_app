import { Alert, AlertTitle, Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = () => {
  const { errorMessage } = useSelector((state) => state.posts);
  return (
    <Container maxWidth="lg">
      {errorMessage ? (
        <Alert className="mainAlert" severity="error">
          <AlertTitle>
            Error : <strong>{errorMessage}</strong>, Please Try Again Later
          </AlertTitle>
        </Alert>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </Container>
  );
};

export default Layout;
