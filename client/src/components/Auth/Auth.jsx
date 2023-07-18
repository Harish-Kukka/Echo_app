import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUserProfile,
  userSignIn,
  userSignUp,
} from '../../features/Auth/authSlice';
import Input from './Input.jsx';
import authStyles from './styles.js';
import { loginUser } from '../../features/Auth/authSlice';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const theme = useTheme();
  const styles = authStyles(theme);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const access_token = res?.access_token;
      await dispatch(getUserProfile(access_token));
      dispatch(loginUser());
      navigate('/');
    },
    onError: (error) => console.log(error),
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await dispatch(userSignUp({ formData }));
    } else {
      await dispatch(userSignIn({ formData }));
    }
    dispatch(loginUser());
    navigate('/');
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={styles.paper} elevation={3}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            sx={styles.googleButton}
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => login()}
          >
            <GoogleIcon /> &nbsp; Google {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
