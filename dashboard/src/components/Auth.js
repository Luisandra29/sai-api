import React from 'react';
import { Notification, Title } from 'react-admin';
import GradeIcon from '@material-ui/icons/Grade';
import {
  CssBaseline,
  Avatar,
  Card,
  Box,
  Typography,
  makeStyles
} from '@material-ui/core';

const background = 'images/front.jpg';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    margin: 0,
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  header: {
    margin: '1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    padding: '1em'
  },
  card: {
    padding: '0 2em 1em 2em',
    maxWidth: 500,
    minWidth: 300,
    marginTop: '6em',
    marginBottom: '6em'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#fff',
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Dirección de Estadísticas e Informática
    <br />
      <a color="inherit" href="http://somoscarupano.com.ve/">
        Alcaldía del Municipio Bermúdez
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Auth(props) {
  const { title, children } = props;
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Title title={title} />
      <Card className={classes.card}>
        <div className={classes.header}>
          <Avatar className={classes.avatar} variant="square" alt="logo" src="/images/logo.png"/>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" >
            Sistema de Atención Social Integral
          </Typography>
        </div>
        <div className="form-body">
          {children}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Card>

      <Notification />
    </div>
  );
}
