import * as React from 'react';
import { useRedirect } from 'react-admin';
import { Grid, Box } from '@material-ui/core';
import { apiURL } from '../../config';
import { Chart, CardButton } from 'mui-extra';
import isEmpty from 'is-empty';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function Analytics() {
  const redirect = useRedirect();
  const [isLoading, setIsLoading] = React.useState(true);
  const [categories, setCategories] = React.useState({});
  const [status, setStatus] = React.useState({});
  const [applications, setApplications] = React.useState(0);
  const [users, setUsers] = React.useState(0);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    axios.get(`${apiURL}/home`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (!isEmpty(data)) {
      let names = data.categories.map(item => item.name);
      let values = data.categories.map(item => item.value);

      let statusNames = data.status.map(item => item.name);
      let statusValues = data.status.map(item => item.value);

      setCategories({
        'labels': names,
        'values': values
      });
      setStatus({
        'labels': statusNames,
        'values': statusValues
      });
      setApplications(data.applications);
      setUsers(data.users);
    }
  }, [data]);

  return (
    <Grid container>
      <Grid container>
        <Grid item md={12} sm={6} xs={12}>
          <CardButton
            title='Solicitudes aprobadas'
            loading={isLoading}
            total={applications}
            icon={<MailOutlineIcon />}
            handleClick={() => redirect('/applications')}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={4} sm={6} xs={12}>
          <Chart
            name='Solicitudes por estado'
            type='doughnut'
            height="400"
            width="350"
            loading={isLoading}
            labels={status.labels}
            data={status.values}
            borderWith={1}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Chart
            name='Categorías'
            type='pie'
            height="400"
            width="350"
            loading={isLoading}
            labels={categories.labels}
            data={categories.values}
            borderWith={1}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Analytics;
