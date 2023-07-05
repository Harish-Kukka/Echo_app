import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const getPostsList = createAsyncThunk(
  'posts/getPostsList',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.fetchPosts();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`There was: ${err.message}`);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost, thunkAPI) => {
    try {
      const { data } = await api.createPost(newPost);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`There was: ${err.message}`);
    }
  }
);

const initialState = {
  postsList: [],
  isLoading: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPostsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsList = action.payload;
      })
      .addCase(getPostsList.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsList = [...state.postsList, action.payload];
      });
  },
});

// export const { createPost } = postsSlice.actions;

export default postsSlice.reducer;
