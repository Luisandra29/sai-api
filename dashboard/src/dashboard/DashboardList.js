import React from 'react';
import { Title } from 'react-admin';
import Totals from './Total';

import { Welcome } from '../components';
import PublicIcon from '@material-ui/icons/Public';

import {
  Grid,
  useMediaQuery
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions';
import { useFetch } from '../fetch';
import NewApplication from './NewApplication';
import isEmpty from 'is-empty';

// export default function {

const DashboardList = props => {
        const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
      

//   const dispatch = useDispatch();
//   const { user } = useSelector(store => store.user);
//   const { response } = useFetch('user');

//   React.useEffect(() => {
//     if (!isEmpty(response)) {
//       dispatch(setUser(response.user));
//     }
//   }, [response]);

  return (
    <Grid container spacing={2}>
      <Title title='Inicio' />
    
      <Welcome title={'Sistema de Atención Social Integral'} />

      <Grid container>
        <Totals />
      </Grid>
    </Grid>
  );
};

export default DashboardList;