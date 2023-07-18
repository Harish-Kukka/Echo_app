import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

// this is only for google login
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (access_token, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserInfo(access_token);
      return { result: data, token: `google ${access_token}` };
    } catch (error) {
      return rejectWithValue(`${error.message}`);
    }
  }
);

export const userSignIn = createAsyncThunk(
  'auth/userSignIn',
  async (Data, { rejectWithValue }) => {
    try {
      // log in the user
      const { data } = await api.signIn(Data.formData);
      //navigate to the homepage
      // Data.navigate('/');
      return data;
    } catch (error) {
      return rejectWithValue(`${error.message}`);
    }
  }
);
export const userSignUp = createAsyncThunk(
  'auth/userSignUp',
  async (Data, { rejectWithValue }) => {
    try {
      // register and login the user
      const { data } = await api.signUp(Data.formData);
      // navigate to the homepage
      // Data.navigate('/');
      return data;
    } catch (error) {
      return rejectWithValue(`${error.message}`);
    }
  }
);

const initialState = {
  authData: null,
  isLogout: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state) => {
      localStorage.setItem('userInfo', JSON.stringify(state.authData));
      state.isLogout = false;
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.authData = null;
      state.isLogout = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        // localStorage.setItem('userInfo', JSON.stringify(action.payload));
        state.authData = action.payload;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.authData = action.payload;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.authData = action.payload;
      });
  },
});

export const { logoutUser, loginUser } = authSlice.actions;

export default authSlice.reducer;
