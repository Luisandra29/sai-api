import React from 'react';
import Totals from './Total';
import { Welcome } from '../components/Welcome';
import { Title } from 'react-admin';
import {
  Grid,
  useMediaQuery
} from '@material-ui/core';

const Dashboard = props => (
    <Grid container spacing={3}>
      <Title title='Inicio' />

      <Grid container>
        <Grid item xs={12}>
          <Welcome title={'Sistema de Atención Social Integral'} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
            <Totals />
        </Grid>
      </Grid>
    </Grid>
);

export default Dashboard;
