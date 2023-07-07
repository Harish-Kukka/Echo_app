import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const getPostsList = createAsyncThunk(
  'posts/getPostsList',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.fetchPosts();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
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
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);

// the async function takes only one argument if you want to give multiple arguments.
// then you have to convert it to a object and then send it function in the dispatch.
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, updatedPost }, thunkAPI) => {
    try {
      const { data } = await api.updatePost(id, updatedPost);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.deletePost(id);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);

const initialState = {
  postsList: [],
  isLoading: true,
  errorMessage: '',
  currentId: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsList = action.payload;
        state.errorMessage = '';
      })
      .addCase(getPostsList.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.errorMessage = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsList = [...state.postsList, action.payload];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postsList = state.postsList.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postsList = state.postsList.filter(
          (post) => post._id !== action.payload._id
        );
      });
  },
});

// i am updating the local state as soon as the api request is fulfilled.
// so no need to grab the postsList every time from database.

export const { setCurrentId } = postsSlice.actions;

export default postsSlice.reducer;
