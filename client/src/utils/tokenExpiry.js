import decode from 'jwt-decode';
import { getUserInfo } from '../api';

export const jwtTokenExpiry = (token, logout) => {
  const decoded = decode(token);
  if (decoded.exp < new Date().getTime() / 1000) {
    logout();
  }
};

export const googleTokenExpiry = (token, logout) => {
  try {
    const { data } = getUserInfo(token);
  } catch (error) {
    logout();
  }
};
