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
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../features/Auth/authSlice';
import echo from '../../images/echo.png';
import NavbarStyles from './styles';
import { jwtTokenExpiry, googleTokenExpiry } from '../../utils/tokenExpiry.js';

const Navbar = () => {
  const theme = useTheme();
  const navbarStyle = NavbarStyles(theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('userInfo')) || null;

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
    window.location.reload();
  };

  React.useEffect(() => {
    const tokenArr = user?.token.split(' ');
    if (tokenArr) {
      tokenArr.length > 1
        ? googleTokenExpiry(tokenArr[1], logout)
        : jwtTokenExpiry(tokenArr[0], logout);
    }
  }, [location]);

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
              sx={navbarStyle.sxpurple}
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
              onClick={logout}
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
