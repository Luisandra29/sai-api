import * as React from "react";
import {
  Title,
  useCreate,
  Create,
  Loading,
  SelectArrayInput,
  SimpleForm,
  useQuery,
  TextInput,
  useNotify,
  useCreateController,
  CreateContextProvider,
  useRedirect
} from 'react-admin';
import { Typography, Grid, makeStyles, InputLabel, Box } from '@material-ui/core';
import { useFetch } from '../../fetch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  child: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

const validator = (values) => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = ['Ingrese un nombre.'];
  }

  if (!values.parishes) {
    errors.parishes = ['Seleccione al menos una parroquia.'];
  }

  return errors;
}

const CommunityCreate = (props) => {
  const [create] = useCreate('communities');
  const classes = useStyles();
  const createControllerProps = useCreateController(props);
  const { isLoading, response: data, error } = useFetch('communities/create');
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSave = React.useCallback((values) => {
    create({
      payload: { data: { ...values } }
    }, {
      onSuccess: (response) => {
        const { data: res } = response;
        notify(`¡El registro de la comunidad ${res.name} se ha ejecutado con éxito!`);
        redirect('/communities');
      }
    })
  }, [create, notify, redirect]);

  return (
    <CreateContextProvider value={createControllerProps}>
      <Title title='Nueva comunidad' />
      <Grid spacing={1}>
        { (isLoading)
          ? <Loading loadingPrimary="Cargando..." loadingSecondary="Cargando..." />
          : (
            <SimpleForm validate={validator} save={handleSave}>
              <div className={classes.root}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={4} className={classes.child}>
                    <TextInput source="name" label="Nombre" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} className={classes.child}>
                    <SelectArrayInput
                      source="parishes"
                      choices={data}
                      label='Parroquia(s)'
                      fullWidth
                      options={{
                        fullWidth: true
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </SimpleForm>
        )}
      </Grid>
    </CreateContextProvider>
  );
};

export default CommunityCreate;

