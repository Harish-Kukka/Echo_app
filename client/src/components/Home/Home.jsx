import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsList } from '../../features/posts/postsSlice.js';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import homeStyles from './styles.js';
import Paginate from '../Paginate/Paginate.jsx';
import { MuiChipsInput } from 'mui-chips-input';

const Home = () => {
  const theme = useTheme();
  const styles = homeStyles(theme);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);

  const page = searchParams.get('page') || 1;
  const searchQuery = searchParams.get('searchQuery');

  const dispatch = useDispatch();
  // getting all the posts from the api server
  useEffect(() => {
    dispatch(getPostsList());
  }, [dispatch]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // navigate(`/search?searchQuery=${search}`);
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    const duplicateTag = tags.indexOf(tag);
    if (duplicateTag === -1) {
      setTags([...tags, tag]);
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (searchTerm.trim()) {
      //dispatch -> fetch search post
    } else {
      navigate('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          sx={styles.sxMainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              sx={styles.sxAppBarSearch}
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Echo"
                fullWidth
                onKeyDown={handleKeyDown}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MuiChipsInput
                sx={{ margin: '10px 0' }}
                label="Search Tags"
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                disableEdition
                renderChip={(Component, key, props) => {
                  return <Component {...props} color="primary" key={key} />;
                }}
              />
              <Button onClick={searchPost} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form />
            <Paper sx={styles.sxPagination} elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
