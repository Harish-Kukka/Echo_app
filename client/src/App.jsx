import { AppBar, Container, Grid, Grow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { getPostsList } from './features/posts/postsSlice';
import echo from './images/echo.png';
import './index.css';
import { sxAppBar, sxHeading } from './styles.js';

const App = () => {
  const dispatch = useDispatch();
  // getting all the posts from the api server
  useEffect(() => {
    dispatch(getPostsList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar sx={sxAppBar} position="static" color="inherit">
        <Typography sx={sxHeading} variant="h2" align="center">
          Echo
        </Typography>
        <img className="heading__image" src={echo} alt="echo-img" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            gap={10}
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
  );
};

export default App;
