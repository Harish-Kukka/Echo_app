import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import postDetailStyles from './styles.js';
import { getPostById, getPostsBySearch } from '../../features/posts/postsSlice';

const PostDetails = () => {
  const { post, postsList, isLoading } = useSelector((state) => state.posts);
  const theme = useTheme();
  const styles = postDetailStyles(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recommendedPosts = postsList.filter(({ _id }) => post._id !== _id);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ searchTerm: 'none', tags: post.tags?.join(',') })
      );
    }
  }, [post, dispatch]);

  const openPost = (_id) => {
    navigate(`/allPosts/${_id}`);
  };

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} sx={styles.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper elevation={6} sx={{ padding: '20px', borderRadius: '15px' }}>
      <Box component="div" sx={styles.card}>
        <Box component="div" sx={styles.imageSection}>
          <Box
            component="img"
            sx={styles.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </Box>
        <Box component="div" sx={styles.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
        </Box>
      </Box>
      {recommendedPosts.length > 0 && (
        <Box component="div" sx={styles.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Box component="div" sx={styles.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <Box
                  component="div"
                  sx={{ margin: '20px', cursor: 'pointer', width: '200px' }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="subtitle2"
                  >
                    {name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="subtitle2"
                  >
                    {message.length > 125
                      ? message.slice(0, 125) + ' ...'
                      : message}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="subtitle1"
                  >
                    Likes: {likes.length}
                  </Typography>
                  <Box
                    component="img"
                    src={selectedFile}
                    alt="image.png"
                    width="200px"
                  />
                </Box>
              )
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetails;
