// only the styles which can be applied with the help of sx API from the new MUI v5

const appStyles = (theme) => ({
  sxMainContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  sxPagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  sxAppBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
});

export default appStyles;
