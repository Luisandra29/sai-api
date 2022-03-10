import React from 'react';
import { Title } from 'react-admin';
import Totals from './Total';

import { Welcome } from '../components';

import {
  Grid,
  useMediaQuery
} from '@material-ui/core';

// export default function {

const DashboardList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

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