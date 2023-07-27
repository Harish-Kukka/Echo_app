import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, useTheme, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import commentStyles from './styles.js';
import { commentPost } from '../../features/posts/postsSlice.js';

const CommentSection = ({ post }) => {
  const theme = useTheme();
  const commentStyle = commentStyles(theme);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const updatedPost = await dispatch(
      commentPost({ comment: finalComment, id: post._id })
    );
    setComments(updatedPost.payload.comments);
    setComment('');
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="div">
      <Box component="div" sx={commentStyle.commentsOuterContainer}>
        {user?.result?.name && (
          <Box component="div" sx={commentStyle.commentInputContainer}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={3}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.trim()}
              variant="contained"
              onClick={() => {
                handleClick();
                commentsRef.current.scrollIntoView(false, {
                  behavior: 'smooth',
                });
              }}
            >
              Comment
            </Button>
          </Box>
        )}
        <Box component="div" sx={commentStyle.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <Box component="div" sx={{ height: '25px' }} ref={commentsRef} />
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
