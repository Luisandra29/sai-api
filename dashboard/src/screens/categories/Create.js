import * as React from "react";
import {
  Create,
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

const CategoryCreate = (props) => { 
  return (
    <Create {...props} title='Nueva categoría'>
      <SimpleForm validate={validator} redirect="list">
        <TextInput source='name' label='Nombre'/>
      </SimpleForm>
    </Create>
  );
};

export default CategoryCreate;

