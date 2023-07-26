import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Typography,
  ButtonBase,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import postStyles from './styles.js';
import Likes from './Likes.jsx';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setCurrentId } from '../../../features/posts/postsSlice.js';
import { deletePost, likePost } from '../../../features/posts/postsSlice.js';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isCreator =
    user?.result?._id === post?.creator || user?.result?.sub === post?.creator;

  const openPost = () => {
    navigate(`/allPosts/${post._id}`);
  };

  return (
    <Card sx={postStyles.card} raised elevation={6}>
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
      <ButtonBase sx={postStyles.cardAction} onClick={openPost}>
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
            {post.message.length > 125
              ? post.message.slice(0, 125)
              : post.message}
            {post.message.length > 125 ? (
              <Box component="strong">&nbsp;...</Box>
            ) : null}
          </Typography>
        </CardContent>
      </ButtonBase>
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
              dispatch(deletePost({ id: post._id, navigate }));
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
