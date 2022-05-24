import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { useFormState } from 'react-final-form';

const validate = values => {
    const errors = {};

    if (values.title) {
      if (values.title.length > 100) {
        errors.title = ['El máximo número de caracteres permitidos es 100.'];
      }
    }

    if (!values.title || !values.title.trim()) {
      errors.title = ['Ingrese observación.'];
    }

    if (!values.description || !values.description.trim()) {
      errors.description = ['Ingrese una descripción.'];
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

    if (!values.phone) {
        errors.phone = 'Ingrese el número de contacto';
      }

    return errors;
};

const CommunitiesSelectInput = props => {
  const { values } = useFormState();

  if (values.parish_id) {
      return (
        <ReferenceInput
            source="community_id"
            reference="communities"
            label="Comunidades"
            sort={{ field: 'id', order: 'ASC' }}
            filter={{ parish_id: values.parish_id }}
            fullWidth
        >
            <SelectInput source="name" />
        </ReferenceInput>
      )
  }

  return null;
}

const parishes = [
  { id: 1, name: "BOLÍVAR" },
  { id: 2, name: "MACARAPANA" },
  { id: 3, name: "SANTA CATALINA" },
  { id: 4, name: "SANTA ROSA" },
  { id: 5, name: "SANTA TERESA" }
]



const ApplicationsCreate = props => (
  <Create {...props} title='Nueva Solicitud'>
    <SimpleForm validate={validate} redirect='/applications'>
      <Typography variant="subtitle1">
        Datos del solicitante
      </Typography>
      <TextInput source="full_name" label="Nombre" fullWidth />
      <TextInput source="dni" label="Cédula" fullWidth />
      <TextInput source="phone" label="Teléfono" fullWidth />
      <TextInput source="address" label="Dirección" fullWidth />
      <SelectInput label="Parroquia" source="parish_id" choices={parishes} />
      <CommunitiesSelectInput />
      <Typography variant="subtitle1">
        Datos de la solicitud
      </Typography>
      <TextInput source="title" label="Observación" multiline fullWidth />
      <TextInput source="description" label="Descripción" multiline fullWidth />
      <ReferenceInput label="Categoría" source="category_id" reference="categorias" >
        <SelectInput optionText="name" optionValue="id"/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default ApplicationsCreate;