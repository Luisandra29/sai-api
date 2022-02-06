import * as React from "react";
import {
  Show,
  TextField,
  SimpleShowLayout,
  DateField,
  NumberField
} from 'react-admin';

const UserTitle = ({ record   }) => (
  <span>{record ? `${record.name}` : ''}</span>
);

const UserShow = (props) => {
  return (
    <Show {...props} title={<UserTitle />}>
      <SimpleShowLayout>
        <TextField source="profile.full_name" label="Nombre completo" />
        <TextField source="profile.dni" label="Cédula" />
        <TextField source="profile.address" label='Dirección' />
        <TextField source="email" label='Correo electrónico' />
        <TextField source="applications_count" label='Solicitudes enviadas' />
      </SimpleShowLayout>
    </Show>
  );
}

export default UserShow;
