import * as React from "react";
import {
  Title,
  NumberInput,
  TextInput,
  SimpleForm,
  SelectInput,
  useNotify,
  useCreateController,
  CreateContextProvider,
  useRedirect,
  AutocompleteInput,
  useMutation
} from 'react-admin';
import { 
  Typography, 
  makeStyles
} from '@material-ui/core';

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

  if (values.title) {
    if (values.title.length > 100) {
      errors.title = ['El máximo número de caracteres permitidos es 100.'];
    }
  }
  if (!values.title || !values.title.trim()) {
    errors.title = ['Ingrese un título.'];
  }
  if (!values.description || !values.description.trim()) {
    errors.description = ['Ingrese un asunto.'];
  }
  if (values.description) {
    if (values.description.length > 500) {
      errors.description = ['El máximo número de caracteres permitidos es 500.'];
    }
  }
  if (!values.category_id) {
    errors.category_id = ['Seleccione una categoría.'];
  }
  if (!values.parish_id) {
    errors.parish_id = ['Seleccione una parroquia.'];
  }
  if (!values.community_id) {
    errors.community_id = ['Seleccione una comunidad.'];
  }
  if (!values.full_name) {
    errors.full_name = 'Ingrese el nombre de la persona';
  }
  if (!values.dni) {
    errors.dni = 'Ingrese la cédula de identidad';
  }

  return errors;
}

const parishes = [
  { id: 1, name: "BOLÍVAR" },
  { id: 2, name: "MACARAPANA" },
  { id: 3, name: "SANTA CATALINA" },
  { id: 4, name: "SANTA ROSA" },
  { id: 5, name: "SANTA TERESA" }
]

const categories = [
  { id: 1, name: "Salud" },
  { id: 2, name: "Servicios Funerarios" },
  { id: 3, name: "Electricidad" },
  { id: 4, name: "Agua" },
  { id: 5, name: "Otros" },
  { id: 6, name: "Financiero" },
  { id: 7, name: "Gas" },
  { id: 8, name: "Transporte" },
  { id: 8, name: "Aseo" },
]

const communities = [
  {"id":1,"name":"CENTRO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA, SANTA ROSA"},{"id":2,"name":"LOS MOLINOS","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":3,"name":"UVEROS","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":4,"name":"COPEY","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":5,"name":"COPACABANA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":6,"name":"G\u00dcIRIA DE LA PLAYA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":7,"name":"PATILLA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":8,"name":"POZO COLORADO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":9,"name":"GUATAPANARE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":10,"name":"PLAYA GRANDE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":11,"name":"LAS PEONIAS","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":12,"name":"HATO ROMAN","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":13,"name":"GUACA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":14,"name":"LEBRANCHE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":15,"name":"EL MACO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"MACARAPANA"},{"id":16,"name":"TAPARO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"MACARAPANA"},{"id":17,"name":"URB. LA ESTANCIA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"MACARAPANA"},{"id":18,"name":"JOS\u00c9 FRANCISCO BERM\u00daDEZ","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":19,"name":"LA VI\u00d1A","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":20,"name":"1\u00ba DE MAYO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":21,"name":"GUAYAC\u00c1N DE LAS FLORES","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":22,"name":"CHARALLAVE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":23,"name":"CANCHUNCH\u00da","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":24,"name":"LOMA DE GRAN POBRE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":25,"name":"EL CHARCAL","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"}
]

const ApplicationCreate = (props) => {
  const createControllerProps = useCreateController(props);
  const [mutate, { loaded, data }] = useMutation();
  const redirect = useRedirect()
  const notify = useNotify();

  const handleSave = React.useCallback(async (values) => {
      try {
          await mutate({
              type: 'create',
              resource: props.resource,
              payload: { data: values }
          }, { returnPromise: true })
      } catch (error) {
          if (error.response.data.errors) {
              return error.response.data.errors;
          }
      }
  }, [mutate])

  React.useEffect(() => {
      if (loaded) {
          redirect('/applications')
          notify(`¡Ha creado una nueva solicitud`)
      }
  }, [loaded])

  return (
    <CreateContextProvider value={createControllerProps}>
      <Title title='Nueva solicitud' />
      <SimpleForm validate={validator} save={handleSave}>
        <Typography variant="subtitle1">
          Datos del solicitante
        </Typography>
        <TextInput source="full_name" label="Nombre" fullWidth />
        <TextInput source="dni" label="Cédula" fullWidth />
        <TextInput source="phone" label="Teléfono" fullWidth />
        <TextInput source="address" label="Dirección" fullWidth />
        <AutocompleteInput source="parish_id" label="Parroquia" choices={parishes} fullWidth />
        <AutocompleteInput source="community_id" label="Comunidad" choices={communities} fullWidth />
        <Typography variant="subtitle1">
          Datos de la solicitud
        </Typography>
        <TextInput source="title" label="Título" multiline fullWidth />
        <TextInput source="description" label="Mensaje" multiline fullWidth />
        <AutocompleteInput source="category_id" choices={categories} fullWidth label="Categoría" />
      </SimpleForm>
    </CreateContextProvider>
  );
};

export default ApplicationCreate;

