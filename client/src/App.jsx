import {
  AppBar,
  Container,
  Grid,
  Grow,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { getPostsList } from './features/posts/postsSlice';
import echo from './images/echo.png';
import './index.css';
import AppStyles from './styles.js';

const App = () => {
  const appStyles = AppStyles();
  const { errorMessage } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // getting all the posts from the api server
  useEffect(() => {
    dispatch(getPostsList());
  }, [dispatch]);

  return (
    <>
      {errorMessage ? (
        <Alert className="mainAlert" severity="error">
          <AlertTitle>
            Error : <strong>{errorMessage}</strong>
          </AlertTitle>
        </Alert>
      ) : (
        <Container maxWidth="lg">
          <AppBar sx={appStyles.sxAppBar} position="static" color="inherit">
            <Typography sx={appStyles.sxHeading} variant="h2" align="center">
              Echo
            </Typography>
            <img
              className="heading__image"
              src={echo}
              alt="echo-img"
              height="60"
            />
          </AppBar>
          <Grow in>
            <Container>
              <Grid
                sx={appStyles.sxMainContainer}
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <Posts />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
      )}
    </>
  );
};

export default App;
