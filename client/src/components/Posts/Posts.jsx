import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Box,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import postsStyles from './styles';

const Posts = () => {
  // getting the state from the redux store
  const { postsList, isLoading } = useSelector((state) => state.posts);
  return (
    <>
      {isLoading ? (
        <Box sx={postsStyles.sxProgressContainer}>
          <CircularProgress />
          <br />
          <Typography variant="h5" sx={postsStyles.sxLoadingLabel}>
            Loading...
          </Typography>
        </Box>
      ) : !postsList.length ? (
        <Alert severity="info">
          <AlertTitle>No Posts</AlertTitle>
          Please create one from the FORM!
        </Alert>
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {postsList.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
