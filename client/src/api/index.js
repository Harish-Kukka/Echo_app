import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    req.headers.Authorization = `Bearer ${userInfo?.token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/update/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/delete/${id}`);

export const likePost = (id) => API.patch(`/posts/likePost/${id}`);

export const signIn = (formData) => API.post('user/signIn', formData);
export const signUp = (formData) => API.post('/user/signUp', formData);

// get the userInfo from google authentication using access_token.

export const getUserInfo = (access_token) =>
  axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
