import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import postStyles from './styles.js';
import Likes from './Likes.jsx';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setCurrentId } from '../../../features/posts/postsSlice.js';
import { deletePost, likePost } from '../../../features/posts/postsSlice.js';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isCreator =
    user?.result?._id === post?.creator || user?.result?.sub === post?.creator;

  return (
    <Card sx={postStyles.card}>
      <CardMedia
        sx={postStyles.media}
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={post.title}
      />
      <Box component="div" sx={postStyles.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>
      {isCreator && (
        <Box component="div" sx={postStyles.overlay2}>
          <Button
            sx={{ color: 'white' }}
            size="small"
            onClick={() => {
              dispatch(setCurrentId(post._id));
            }}
          >
            <MoreVertIcon />
          </Button>
        </Box>
      )}

      <Box component="div" sx={postStyles.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Box>
      <Typography sx={postStyles.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography color="textSecondary" component="p" variant="body2">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx={postStyles.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes post={post} user={user} />
        </Button>
        {isCreator && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteForeverIcon fontSize="small" color="warning" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
