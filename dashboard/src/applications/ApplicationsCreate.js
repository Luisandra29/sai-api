import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    useCreate,
    Title,
    NumberInput,
    ReferenceInput,
    SelectInput,
    AutocompleteInput,
    Loading,
    useNotify,
    useCreateController,
    CreateContextProvider,
    useRedirect
} from 'react-admin';
import { useSelector } from 'react-redux';
import isEmpty from 'is-empty';
import { 
  Typography, 
  makeStyles
} from '@material-ui/core';
import { useFetch } from '../fetch';



const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%"
    },
    child: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }));
  
const validate = values => {
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
};


const choice = [
    { id: 1, name: 'Salud' },
    { id: 2, name: 'Servicios Funerarios'},
];

const parishes = [
  { id: 1, name: "BOLÍVAR" },
  { id: 2, name: "MACARAPANA" },
  { id: 3, name: "SANTA CATALINA" },
  { id: 4, name: "SANTA ROSA" },
  { id: 5, name: "SANTA TERESA" }
]

const communities = [
  {"id":1,"name":"CENTRO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA, SANTA ROSA"},{"id":2,"name":"LOS MOLINOS","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":3,"name":"UVEROS","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":4,"name":"COPEY","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":5,"name":"COPACABANA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":6,"name":"G\u00dcIRIA DE LA PLAYA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":7,"name":"PATILLA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":8,"name":"POZO COLORADO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":9,"name":"GUATAPANARE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":10,"name":"PLAYA GRANDE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":11,"name":"LAS PEONIAS","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":12,"name":"HATO ROMAN","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":13,"name":"GUACA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":14,"name":"LEBRANCHE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"BOL\u00cdVAR"},{"id":15,"name":"EL MACO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"MACARAPANA"},{"id":16,"name":"TAPARO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"MACARAPANA"},{"id":17,"name":"URB. LA ESTANCIA","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"MACARAPANA"},{"id":18,"name":"JOS\u00c9 FRANCISCO BERM\u00daDEZ","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":19,"name":"LA VI\u00d1A","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":20,"name":"1\u00ba DE MAYO","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":21,"name":"GUAYAC\u00c1N DE LAS FLORES","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":22,"name":"CHARALLAVE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":23,"name":"CANCHUNCH\u00da","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":24,"name":"LOMA DE GRAN POBRE","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"},{"id":25,"name":"EL CHARCAL","created_at":"2022-01-06T17:41:12.000000Z","updated_at":"2022-01-06T17:41:12.000000Z","applications_count":0,"parish_names":"SANTA CATALINA"}, { "id": 51, "name": "CLUB DE LEONES" }, { "id": 52, "name": "CHARALLAVE" }, { "id": 53, "name": "SAN MARTIN" }
]

// const ApplicationsCreate = props => (
    
//     <Create {...props}>
//         <SimpleForm validate={validate} redirect='/applications'>
//             <TextInput
//                 label={false}
//                 source="name"
//                 placeholder="Ej. Avenida Libertad #217"
//                 fullWidth
//             />
//         </SimpleForm>
//     </Create>
// );

// export default ApplicationsCreate;


const ApplicationsCreate = props => (
    // const user = useSelector(store => store.user.user);
    // const [create] = useCreate('applications');
    // const classes = useStyles();
    // const createControllerProps = useCreateController(props);
    // //const { isLoading, response: data } = useFetch('applications/create');
    // const notify = useNotify();
    // const redirect = useRedirect();


    // const handleSave = React.useCallback((values) => {
        
    //       onSuccess: (response) => {
    //         const { data: res } = response;
    //         notify(`¡Su solicitud ha sido enviada con éxito!`);
    //         redirect('/home');
    //       }
    //   }, [create, notify, redirect]);

      // return (
        <Create {...props} title='Nueva Solicitud'>
          {/* <Title title='Nueva solicitud' /> */}
          {/* <Grid spacing={1}> */}
          {/* { (isLoading)
            ? <Loading loadingPrimary="Cargando..." loadingSecondary="Cargando..." />
            : ( */}
              <SimpleForm redirect='/applications'>

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


                {/* <div className={classes.root}>
                  <Grid container className={classes.child}> */}
                    <TextInput source="title" label="Título" multiline fullWidth />
                    <TextInput source="description" label="Mensaje" multiline fullWidth />
                  {/* </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={4} className={classes.child}> */}
                      {/* <SelectInput label="Categoría" source="category_id" choices={choice}  optionValue="id" fullWidth/> */}
                    
                      <ReferenceInput label="Categoría" source="category_id" reference="categories">
                        <SelectInput optionText="name" />
                      </ReferenceInput>
{/*                     
                    </Grid>



                    <Grid item xs={12} sm={12} md={4} className={classes.child}> */}
                      <NumberInput source="quantity" label='Elementos requeridos' fullWidth/>
                    {/* </Grid>
                  </Grid>
                </div> */}
              </SimpleForm>
            {/* ) */}
          {/* } */}
          {/* </Grid> */}
        </Create>
      // );
);

    export default ApplicationsCreate;


