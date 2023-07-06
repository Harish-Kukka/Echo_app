import {
  AppBar,
  Container,
  Grid,
  Grow,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { getPostsList } from './features/posts/postsSlice';
import echo from './images/echo.png';
import './index.css';
import { sxAppBar, sxHeading } from './styles.js';

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const { errorMessage } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  // getting all the posts from the api server
  useEffect(() => {
    dispatch(getPostsList());
  }, [currentId, dispatch]);

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
          <AppBar sx={sxAppBar} position="static" color="inherit">
            <Typography sx={sxHeading} variant="h2" align="center">
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
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
                // gap={10}
              >
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
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
