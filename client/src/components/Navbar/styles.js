import { deepPurple } from '@mui/material/colors';

//All the styles will go to the sx api
const navbarStyles = (theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
    },
  },
  image: {
    marginLeft: '-10px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    // marginRight: '15px',
    // float: 'right',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '160px',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      // marginTop: 20,
      justifyContent: 'center',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logout: {
    marginLeft: '20px',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
});

export default navbarStyles;
