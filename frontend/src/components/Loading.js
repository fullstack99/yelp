import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    zIndex: 99999,
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, .4)',
  },
}));

const LoadingBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

export default LoadingBar;
