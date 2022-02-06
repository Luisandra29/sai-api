import * as React from "react";
import {
  Show,
  TextField,
  SimpleShowLayout,
  DateField,
  NumberField
} from 'react-admin';

const ApplicationTitle = ({ record   }) => (
  <span>{record ? `${record.name}` : ''}</span>
);

const ApplicationShow = (props) => {
  return (
    <Show {...props} title={<ApplicationTitle />}>
      <SimpleShowLayout>
        <TextField source="title" label="Asunto" />
        <TextField source="description" label="Mensaje" />
        <TextField source="category.name" label='Categoría' />
        <TextField source="state.name" label='Estado' />
        <TextField source="created_at" label="Enviada" />
        <TextField source="person.name" label='Nombre del solicitante' />
        <TextField source="person.dni" label='Cédula' />
        <TextField source="person.address" label='Direccón' />
      </SimpleShowLayout>
    </Show>
  );
}

export default ApplicationShow;
