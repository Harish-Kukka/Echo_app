import { Container, Grid, Grow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsList } from '../../features/posts/postsSlice.js';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import homeStyles from './styles.js';

const Home = () => {
  const theme = useTheme();
  const styles = homeStyles(theme);

  const dispatch = useDispatch();
  // getting all the posts from the api server
  useEffect(() => {
    dispatch(getPostsList());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          sx={styles.sxMainContainer}
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
  );
};

export default Home;
