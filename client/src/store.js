import { configureStore } from '@reduxjs/toolkit';
import postReducer from './features/posts/postsSlice.js';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
