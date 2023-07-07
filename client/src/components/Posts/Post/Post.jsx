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
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import postStyles from './styles.js';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setCurrentId } from '../../../features/posts/postsSlice.js';
import { deletePost } from '../../../features/posts/postsSlice.js';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <Card sx={postStyles.card}>
      <CardMedia
        sx={postStyles.media}
        image={post.selectedFile}
        title={post.title}
      />
      <Box component="div" sx={postStyles.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>
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
      <Box component="div" sx={postStyles.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags[0].split(',').map((tag) => `#${tag} `)}
        </Typography>
      </Box>
      <Typography sx={postStyles.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography sx={postStyles.message} variant="body2" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx={postStyles.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <DeleteIcon fontSize="small" color="warning" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
