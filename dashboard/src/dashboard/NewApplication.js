import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Card,
  Grid,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core';
import { useRedirect } from 'react-admin';
import isEmpty from 'is-empty';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex'
  },
  cover: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function NewApplication({ profile }) {
  const classes = useStyles();
  const redirect = useRedirect();

  return (<>{
    (!isEmpty(profile)) &&
    <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent className={classes.details}>
          <Typography component="h5" variant="h5">
            {profile.full_name}
          </Typography>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                redirect('applications/create'); 
              }}
              fullWidth
            >
              {'Nueva solicitud'}
            </Button>
          </CardActions>
        </CardContent>
        <div className={classes.cover}>
          <Typography variant="h2">
            {profile.applications.length}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Solicitudes enviadas
          </Typography>
        </div>
      </Card>
    </Grid>
  }</>);
};

