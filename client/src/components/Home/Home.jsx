import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MuiChipsInput } from 'mui-chips-input';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getPostsBySearch } from '../../features/posts/postsSlice.js';
import Form from '../Form/Form';
import Paginate from '../Paginate/Paginate.jsx';
import Posts from '../Posts/Posts';
import homeStyles from './styles.js';

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // navigate(`/search?searchQuery=${search}`);
      searchPost();
    }
  };

  const handleAddTags = (tag) => {
    const duplicateTag = tags.indexOf(tag);
    if (duplicateTag === -1) {
      setTags([...tags, tag]);
    }
  };

  const handleDeleteTags = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (searchTerm.trim() || tags.length !== 0) {
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));
      navigate(
        `/allPosts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(
          ','
        )}`
      );
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
                onChange={(e) => setSearchTerm(e.target.value.trim())}
              />
              <MuiChipsInput
                sx={{ margin: '10px 0' }}
                label="Search Tags"
                value={tags}
                onAddChip={handleAddTags}
                onDeleteChip={handleDeleteTags}
                disableEdition
                hideClearAll
                renderChip={(Component, key, props) => {
                  return <Component {...props} color="primary" key={key} />;
                }}
              />
              <Button onClick={searchPost} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form />
            {!searchQuery && !tags.length && (
              <Paper sx={styles.sxPagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
