// only the styles which can be applied with the help of sx API from the new MUI v5

const appStyles = (theme) => ({
  sxMainContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
});

export default appStyles;
