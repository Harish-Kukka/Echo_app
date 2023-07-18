import { configureStore } from '@reduxjs/toolkit';
import postReducer from './features/posts/postsSlice.js';
import authReducer from './features/Auth/authSlice.js';

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
