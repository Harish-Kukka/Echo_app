import { deepPurple } from '@mui/material/colors';

//All the styles will go to the sx api
const navbarStyles = (theme) => ({
  sxappBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  // sxheading: {
  //   color: 'rgba(0,183,255, 1)',
  //   fontWeight: 400,
  // },
  // sximage: {
  //   marginRight: '15px',
  //   float: 'right',
  // },
  sxtoolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  sxprofile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  sxuserName: {
    display: 'flex',
    alignItems: 'center',
  },
  sxbrandContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    textDecoration: 'none',
  },
  sxpurple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
});

export default navbarStyles;
