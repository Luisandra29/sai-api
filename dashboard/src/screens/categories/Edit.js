import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput
} from 'react-admin';

const validator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = ['Ingrese un nombre.'];
  }

  return errors;
}

const CategoryEdit = (props) => { 
  return (
    <Edit {...props} title='Actualizar categoría'>
      <SimpleForm validate={validator}>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;

