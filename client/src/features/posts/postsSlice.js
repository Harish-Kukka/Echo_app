import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const getPostsList = createAsyncThunk(
  'posts/getPostsList',
  async (page, thunkAPI) => {
    try {
      const { data } = await api.fetchPosts(page);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);

export const getPostsBySearch = createAsyncThunk(
  'posts/getPostsBySearch',
  async (searchQuery, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await api.fetchPostsBySearch(searchQuery);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.fetchPostById(id);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ newPost, navigate }, thunkAPI) => {
    try {
      const { data } = await api.createPost(newPost);
      navigate(`/allPosts/${data._id}`);
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
  async ({ id, navigate }, thunkAPI) => {
    try {
      const { data } = await api.deletePost(id);
      navigate('/');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(`${err.message}`);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.likePost(id);
      return data;
    } catch (err) {
      return rejectWithValue(`${err.message}`);
    }
  }
);

const initialState = {
  postsList: [],
  post: {},
  isLoading: true,
  errorMessage: '',
  currentId: 0,
  currentPage: 1,
  numberOfPages: 0,
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
        state.postsList = action.payload.data;
        state.numberOfPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.errorMessage = '';
      })
      .addCase(getPostsList.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.errorMessage = '';
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getPostsBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsList = action.payload;
        state.errorMessage = '';
      })
      .addCase(getPostsBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsList = [...state.postsList, action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
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
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.postsList = state.postsList.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  },
});

// i am updating the local postsList as soon as the api request is fulfilled.
// so no need to grab the postsList every time from database.

export const { setCurrentId } = postsSlice.actions;

export default postsSlice.reducer;
