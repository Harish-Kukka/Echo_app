// only the styles which can be applied with the help of sx API from the new MUI v5
import { useTheme } from '@mui/material';

const AppStyles = () => {
  const theme = useTheme();
  return {
    sxAppBar: {
      borderRadius: '10px',
      margin: '15px 0',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'center',
      alignItems: 'center',
    },

    sxHeading: {
      color: 'rgba(0,183,255, 1)',
    },
    sxMainContainer: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
    },
  };
};

export default AppStyles;
