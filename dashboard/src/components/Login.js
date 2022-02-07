import * as React from 'react';
import { useState } from 'react';
import {
  makeStyles,
  TextField,
  Grid
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// Layout
import Auth from './Auth';
import { setAuthToken } from '../utils';
import { clearAll, setErrors, postData, setUser, setNotifications, clearErrors } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../initializers';
import LoadingButton from './LoadingButton';
import isEmpty from 'is-empty';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector(store => store.errors.form);
  const {
    response,
    loading,
    success
  } = useSelector(store => store.fetch);
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postData(data, 'login'));
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    setData({...data, [name]: value });
    dispatch(setErrors({...errors, [name]: ''}));
  }

  React.useEffect(() => {
    clearErrors();
    if (!isEmpty(token)) {
      axios.get(`/activate-account/${token}`)
        .then(res => dispatch(setNotifications(res.data.message)));
    }
  }, []);

  React.useEffect(() => {
    if (success) {
      const { token, user } = response;
      setAuthToken(token);
      dispatch(setUser(user));
      dispatch(clearAll());
      history.push('/home');
    }
  }, [success]);

  return (
    <Auth title='Inicio de sesión'>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          error={errors.email && true}
          type='email'
          margin="normal"
          fullWidth
          id="login"
          label="Correo electrónico"
          name="email"
          onChange={handleData}
          required
          helperText={errors.email && errors.email}
        />
        <TextField
          variant="outlined"
          error={errors.password && true}
          margin="normal"
          fullWidth
          id="password"
          label="Contraseña"
          name="password"
          type="password"
          onChange={handleData}
          required
          helperText={errors.password && errors.password}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color='secondary'
          classes={classes.submit}
          icon={<ExitToAppIcon />}
          loading={loading}
          fullWidth
        >
          Acceder
        </LoadingButton>
      </form>
    </Auth>
  );
};

export default Login;
