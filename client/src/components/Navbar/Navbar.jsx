import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/Auth/authSlice';
import echo from '../../images/echo.png';
import NavbarStyles from './styles';

const Navbar = () => {
  const theme = useTheme();
  const navbarStyle = NavbarStyles(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogout } = useSelector((state) => state.auth);

  const user = !isLogout && JSON.parse(localStorage.getItem('userInfo'));

  return (
    <AppBar sx={navbarStyle.sxappBar} position="static" color="inherit">
      <Box sx={navbarStyle.sxbrandContainer} component={Link} to="/">
        <Box sx={navbarStyle.sximage} component="span">
          <img src={echo} alt="Echo-logo.png" height="60" />
        </Box>
        <Typography sx={navbarStyle.sxheading} variant="h2" align="center">
          Echo
        </Typography>
      </Box>
      <Toolbar sx={navbarStyle.sxtoolbar}>
        {user ? (
          <Box sx={navbarStyle.sxprofile} component="div">
            <Avatar
              sx={navbarStyle.purple}
              src={user.result.picture}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={navbarStyle.sxuserName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              sx={navbarStyle.sxlogout}
              variant="contained"
              color="warning"
              component={Link}
              to="/"
              onClick={() => {
                dispatch(logoutUser());
                navigate('/');
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="info" component={Link} to="/auth">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
