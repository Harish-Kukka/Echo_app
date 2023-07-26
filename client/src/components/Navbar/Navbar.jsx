import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../features/Auth/authSlice';
import NavbarStyles from './styles';
import { jwtTokenExpiry, googleTokenExpiry } from '../../utils/tokenExpiry.js';
import logo from '../../images/echo_logo.png';
import logoText from '../../images/echo_text.png';

const Navbar = () => {
  const theme = useTheme();
  const navbarStyle = NavbarStyles(theme);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('userInfo')) || null;

  const logout = () => {
    dispatch(logoutUser());
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
    <AppBar sx={navbarStyle.appBar} position="static" color="inherit">
      <Box sx={navbarStyle.brandContainer} component={Link} to="/">
        <img src={logo} alt="Echo-logo.png" height="45px" />
        <Box
          component="img"
          sx={navbarStyle.image}
          src={logoText}
          alt="echo-text.png"
          height="50px"
        />
      </Box>
      <Toolbar sx={navbarStyle.toolbar}>
        {user ? (
          <Box sx={navbarStyle.profile} component="div">
            <Avatar
              sx={navbarStyle.purple}
              src={user.result.picture}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={navbarStyle.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              sx={navbarStyle.logout}
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
