import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  FormGroup,
  Button,
  makeStyles,
  Typography,
  TextField,
  Box,
  Grid,
  TablePagination,
} from '@material-ui/core';

import Item from './SearchItem';
import LoadingBar from '../../components/Loading';
import { searchActions } from '../../actions';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    marginBottom: 30,
  },
  formGroup: {
    marginRight: 10,
    flexDirection: 'row',
  },
  button: {
    width: 100,
  },
  error: {
    fontSize: 12,
    color: '#CD2328',
    textAlign: 'center',
    marginTop: 5,
  },
}));

function YelpSearch() {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const { total, yelp, isLoading } = useSelector((state) => state.search);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      term: '',
      location: '',
    },
  });

  useEffect(() => {
    setLoading(isLoading);
    setDisabled(isLoading);
  }, [isLoading]);

  const onSubmit = (data) => {
    setLocation(data.location);
    setTerm(data.term);
    setPage(0);
    handleSearch(data.term, data.location, rowsPerPage, 0);
  };

  const handleSearch = (term, location, limit, offset) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (!term || !location) return;
    dispatch(
      searchActions.searchRequest({
        term,
        location,
        limit,
        offset,
      })
    );
  };

  const handlePageChangePage = (event, newPage) => {
    if (!term || !location) return;
    setPage(newPage);
    handleSearch(term, location, rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleSearch(term, location, parseInt(event.target.value, 10), 0);
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box display="flex" alignItems="center">
            <FormGroup className={classes.formGroup}>
              <Controller
                name="term"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Find"
                    type="text"
                    name="term"
                    autoComplete="off"
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="location"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      name="location"
                      label="Nearby"
                      type="text"
                      variant="outlined"
                      autoComplete="off"
                    />
                  );
                }}
              />
            </FormGroup>
            <FormGroup>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                disabled={disabled}>
                Search
              </Button>
            </FormGroup>
          </Box>
          {errors.location && (
            <Typography className={classes.error}>
              Location is required
            </Typography>
          )}
        </form>
      </Grid>
      <Grid container spacing={3}>
        {yelp.map((result, index) => (
          <Item item={result} key={result.id} index={index} />
        ))}
      </Grid>
      {total > 0 && (
        <TablePagination
          component="div"
          count={total > 1000 ? 1000 : total}
          page={page}
          onPageChange={handlePageChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[20, 50, 100]}
        />
      )}
      {loading && <LoadingBar />}
    </Container>
  );
}

export default YelpSearch;
