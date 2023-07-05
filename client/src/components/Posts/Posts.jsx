import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  // getting the state from the redux store
  const { postsList } = useSelector((state) => state.posts);
  console.log(postsList);
  return (
    <>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
