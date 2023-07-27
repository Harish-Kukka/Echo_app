import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
      component="div"
      sx={{
        height: '50px',
        display: 'grid',
        placeContent: 'center',
        marginTop: '5px',
      }}
    >
      <Typography color="textSecondary">Copyright &copy; {year}</Typography>
    </Box>
  );
};

export default Footer;
