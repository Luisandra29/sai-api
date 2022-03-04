import * as React from "react";
import {
  Show,
  TextField,
  SimpleShowLayout,
} from 'react-admin';

const ApplicationsTitle = ({ record   }) => (
  <span>{record ? `${record.title}` : ''}</span>
);

const ApplicationsShow = (props) => {
  return (
    <Show {...props} title={<ApplicationsTitle />}>
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

export default ApplicationsShow;
