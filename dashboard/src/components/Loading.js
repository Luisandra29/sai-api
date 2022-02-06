import React, { useEffect } from 'react';
import { green } from '@material-ui/core/colors';
import {
  CircularProgress,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circularProgress: {
    color: green[500]
  }
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress
        size={80}
        thickness={4}
        className={classes.circularProgress}
      />
    </div>
  ); 
}
  
