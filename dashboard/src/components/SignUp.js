import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { history } from '../initializers';
import { useFetch } from '../fetch';
import { useNotify } from 'react-admin';
import isEmpty from 'is-empty';
import LoadingButton from './LoadingButton';
// Layout
import Auth from './Auth';
import { postData, setErrors, clearErrors } from '../actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const notify = useNotify();
  const classes = useStyles();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector(store => store.errors.form);
  const { response, loading, success } = useSelector(store => store.fetch);
  const [createData, setCreateData] = useState({});
  const { response: userCreateResponse } = useFetch('users/create');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postData(data, 'users'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({...data, [name]: value });
    dispatch(setErrors({...errors, [name]: ''}));
  }

  React.useEffect(() => {
    if (response.success) {
      history.push('/check-email');
      notify('Hemos enviado un enlace de confirmación a su correo electrónico.')
    }
  }, [response.success]);

  React.useEffect(() => {
    if (!isEmpty(userCreateResponse)) {
      setCreateData(userCreateResponse);
    }
  }, [userCreateResponse]);

  React.useEffect(() => {
    clearErrors();
  }, []);

  return (
    <Auth title={'Crear cuenta'}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={errors.first_name && true}
              margin="normal"
              fullWidth
              id="first_name"
              label="Primer nombre"
              name="first_name"
              onChange={handleChange}
              required
              helperText={errors.first_name && errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={errors.second_name && true}
              margin="normal"
              fullWidth
              id="second_name"
              label="Segundo nombre"
              name="second_name"
              onChange={handleChange}
              helperText={errors.second_name && errors.second_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={errors.surname && true}
              margin="normal"
              fullWidth
              id="surname"
              label="Primer apellido"
              name="surname"
              onChange={handleChange}
              required
              helperText={errors.surname && errors.surname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              error={errors.second_surname && true}
              margin="normal"
              fullWidth
              id="second_surname"
              label="Segundo apellido"
              name="second_surname"
              onChange={handleChange}
              helperText={errors.second_surname && errors.second_surname}
            />
          </Grid>
          { !isEmpty(createData) && (
              <FormControl error={errors.citizenship_id && true} className={classes.formControl}>
                <InputLabel id="genre_id">Género</InputLabel>
                <Select
                  variant="outlined"
                  error={errors.genre_id && true}
                  variant="outlined"
                  id="genre_id"
                  name="genre_id"
                  label="Género"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {createData.genres.map(genre => 
                    <MenuItem value={genre.id}>{genre.name}</MenuItem>
                  )}
                </Select>
                {errors.genre_id && <FormHelperText>{errors.genre_id}</FormHelperText>}
              </FormControl>
            )
          }
          
          { !isEmpty(createData) &&
            <FormControl error={errors.citizenship_id && true} className={classes.formControl}>
              <InputLabel id="citizenship_id">Nacionalidad</InputLabel>
              <Select
                variant="outlined"
                error={errors.citizenship_id && true}
                labelId="citizenship_id"
                id="demo-simple-select-error"
                name="citizenship_id"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                {createData.citizenships.map(citizenship => 
                  <MenuItem value={citizenship.id}>{citizenship.name}</MenuItem>
                )}
              </Select>
              {errors.citizenship_id && <FormHelperText>{errors.citizenship_id}</FormHelperText>}
            </FormControl>
          }
          
          { !isEmpty(createData) &&
            <FormControl error={errors.parish_id && true} className={classes.formControl}>
              <InputLabel id="parish_id">Parroquia</InputLabel>
              <Select
                variant="outlined"
                error={errors.parish_id && true}
                labelId="parish_id"
                id="demo-simple-select-error"
                name="parish_id"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                {createData.parishes.map(parish => 
                  <MenuItem value={parish.id}>{parish.name}</MenuItem>
                )}
              </Select>
              {errors.parish_id && <FormHelperText>{errors.parish_id}</FormHelperText>}
            </FormControl>
          }
          
          { !isEmpty(createData) &&
            <FormControl error={errors.community_id && true} className={classes.formControl}>
              <InputLabel id="community_id">Comunidad</InputLabel>
              <Select
                variant="outlined"
                error={errors.community_id && true}
                labelId="community_id"
                id="demo-simple-select-error"
                name="community_id"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                {createData.communities.map(community => 
                  <MenuItem value={community.id}>{community.name}</MenuItem>
                )}
              </Select>
              {errors.community_id && <FormHelperText>{errors.community_id}</FormHelperText>}
            </FormControl>
          }
          <TextField
            type="number"
            variant="outlined"
            error={errors.dni && true}
            margin="normal"
            fullWidth
            id="dni"
            label="Cédula de identidad"
            name="dni"
            onChange={handleChange}
            required
            helperText={errors.dni && errors.dni}
            onInput={(e)=>{ 
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
            }}
            min={0}
          />
          <TextField
            variant="outlined"
            error={errors.address && true}
            margin="normal"
            fullWidth
            id="address"
            label="Dirección"
            name="address"
            onChange={handleChange}
            required
            helperText={errors.address && errors.address}
          />
          <TextField
            variant="outlined"
            error={errors.email && true}
            margin="normal"
            fullWidth
            id="login"
            label="Correo electrónico"
            name="email"
            onChange={handleChange}
            required
            helperText={errors.email && errors.email}
          />
          <TextField
            variant="outlined"
            error={errors.password && true}
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            onChange={handleChange}
            required
            helperText={errors.password && errors.password}
          />
          <TextField
            variant="outlined"
            error={errors.password && true}
            margin="normal"
            fullWidth
            name="password_confirmation"
            label="Repita la contraseña"
            type="password"
            id="password_confirmation"
            onChange={handleChange}
            required
            helperText={errors.password && errors.password}
          />
        </Grid>
        <LoadingButton
          type="submit"
          variant="contained"
          color='secondary'
          classes={classes.submit}
          icon={<AccountBoxIcon />} 
          loading={loading}
          fullWidth
        >
          Registrarme
        </LoadingButton>
        <p>¿Ya tiene una cuenta? <Link to='/login'>Inicie sesión</Link></p>
      </form>
    </Auth>
  );
};

export default SignUp;
