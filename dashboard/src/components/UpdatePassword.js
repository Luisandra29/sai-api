import * as React from 'react';
import { useState } from 'react';
import {
  useNotify,
  Notification,
  Title
} from 'react-admin';
import {
  makeStyles,
  Typography,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications, clearAll, postData } from '../actions';
import { history } from '../utils';
import LoadingButton from './LoadingButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdatePassword = () => {
  const classes = useStyles();
  const errors = useSelector(store => store.errors.form);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const {
    response,
    loading,
    success
  } = useSelector(store => store.fetch);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postData(data, 'update-password'));
  };

  const handleData = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  React.useEffect(() => {
    if (success) {
      dispatch(setNotifications(response.message));
      history.goBack();
      dispatch(clearAll());
    }
  }, [success]);

  return (
    <>
      <Title title='Actualizar contraseña' />
      <Paper className={classes.paper}>
        <Typography variant="h5">
          Actualizar contraseña
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            error={errors.current_password && true}
            margin="normal"
            fullWidth
            id="login"
            type="password"
            label="Contraseña actual"
            name="current_password"
            onChange={handleData}
            required
            helperText={errors.current_password && errors.current_password}
          />
          <TextField
            variant="outlined"
            error={errors.new_password && true}
            margin="normal"
            name="new_password"
            label="Nueva contraseña"
            type="password"
            id="new_password"
            fullWidth
            onChange={handleData}
            required
            helperText={errors.new_password && errors.new_password}
          />
          <TextField
            variant="outlined"
            error={errors.new_password_confirmation && true}
            margin="normal"
            name="new_password_confirmation"
            label="Repita la contraseña"
            type="password"
            id="new_password_confirmation"
            onChange={handleData}
            fullWidth
            required
            helperText={errors.new_password_confirmation && errors.new_password_confirmation}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            classes={classes.submit} 
            loading={loading}
          >
            Actualizar
          </LoadingButton>
        </form>
      </Paper>
      <Notification />
    </>
  );
};

export default UpdatePassword;
