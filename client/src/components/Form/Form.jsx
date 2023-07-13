import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import formStyles from './styles';
import imageToBase64, { clearFileName } from './../../utils/imageToBas64.js';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../features/posts/postsSlice.js';
import { setCurrentId } from '../../features/posts/postsSlice.js';

const Form = () => {
  const { currentId, postsList } = useSelector((state) => state.posts);
  const postToUpdate = currentId
    ? postsList.find((post) => post._id === currentId)
    : null;

  const initialPostData = {
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  };
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialPostData);

  useEffect(() => {
    if (postToUpdate) {
      setPostData(postToUpdate);
    }
  }, [postToUpdate]);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'tags') {
      value = value.split(',');
    }
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking if the values of the object submitted are all empty
    if (!Object.values(postData).every((x) => x === '')) {
      if (currentId) {
        //refer to postSlice.js for this function
        dispatch(updatePost({ id: currentId, updatedPost: postData }));
      } else {
        dispatch(createPost(postData));
      }
      clearForm();
    }
  };

  const clearForm = () => {
    setPostData(initialPostData);
    dispatch(setCurrentId(0));
    clearFileName();
  };

  return (
    <Paper sx={formStyles.sxPaper}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editing ' : 'Echo '}Your Adventure
        </Typography>
        <TextField
          sx={formStyles.sxTextField}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        />
        <TextField
          sx={formStyles.sxTextField}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          sx={formStyles.sxTextField}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          sx={formStyles.sxTextField}
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />
        <div className="fileInput">
          <input
            type="file"
            name="selectedFile"
            id="imageUploader"
            accept="image/*"
            onChange={(e) => {
              imageToBase64(e, setPostData, postData);
            }}
          />
          <label htmlFor="imageUploader" id="uploadButton">
            <UploadFileOutlinedIcon className="upload__icon" />
            Upload Photo
          </label>
          <p id="fileName"></p>
        </div>
        <Button
          sx={formStyles.sxButtonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className="clearButton"
          variant="contained"
          color="warning"
          size="small"
          onClick={clearForm}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
