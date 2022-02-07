import React from 'react';
import { Title } from 'react-admin';
import Totals from './Total';
import { Welcome } from '../../components';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { useFetch } from '../../fetch';
import NewApplication from './NewApplication';
import isEmpty from 'is-empty';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const { response } = useFetch('user');

  React.useEffect(() => {
    if (!isEmpty(response)) {
      dispatch(setUser(response.user));
    }
  }, [response]);

  return (
    <Grid container spacing={3}>
      <Title title='Inicio' />

      <Grid container>
        <Grid item xs={12}>
          <Welcome title={'Sistema de Atención Social Integral'} />
        </Grid>
      </Grid>
      <Grid container>
        <Totals />
      </Grid>
    </Grid>
  );
};

