import decode from 'jwt-decode';
import { getUserInfo } from '../api';

export const jwtTokenExpiry = (token, logout) => {
  const decoded = decode(token);
  if (decoded.exp < new Date().getTime() / 1000) {
    logout();
  }
};

export const googleTokenExpiry = async (token, logout) => {
  try {
    const { data } = await getUserInfo(token);
  } catch (error) {
    logout();
  }
};
