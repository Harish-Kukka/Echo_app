import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { sxPaper, sxButtonSubmit, sxTextField } from './styles';
import imageToBase64, { clearFileName } from './../../utils/imageToBas64.js';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { useDispatch } from 'react-redux';
import { createPost } from '../../features/posts/postsSlice.js';

const Form = () => {
  const initialPostData = {
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  };
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialPostData);

  const handleChange = (e) => {
    const name = e.target.name;
    setPostData({
      ...postData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking if the values of the object submitted are all empty
    if (!Object.values(postData).every((x) => x === '')) {
      dispatch(createPost(postData));
    }
  };

  const clearForm = () => {
    setPostData(initialPostData);
    clearFileName();
  };
  // console.log(postData);

  return (
    <Paper sx={sxPaper}>
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Echo Your Adventure</Typography>
        <TextField
          sx={sxTextField}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        />
        <TextField
          sx={sxTextField}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          sx={sxTextField}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          sx={sxTextField}
          name="tags"
          variant="outlined"
          label="Tags"
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
          sx={sxButtonSubmit}
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
          color="error"
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
