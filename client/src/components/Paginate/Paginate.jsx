import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import paginationStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostsList } from '../../features/posts/postsSlice.js';

const Paginate = ({ page }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPostsList(page));
  }, [page, dispatch]);

  const { numberOfPages } = useSelector((state) => state.posts);

  return (
    <Pagination
      sx={{ ul: paginationStyles.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      siblingCount={0}
      boundaryCount={1}
      size="small"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/allPosts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
