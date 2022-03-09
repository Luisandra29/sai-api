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

const UsersShow = (props) => {
  return (
    <Show {...props} title={<UserTitle />}>
      <SimpleShowLayout>
        <TextField source="email" label='Correo electrónico' />
        <TextField source="role.name" label='Rol' />
      </SimpleShowLayout>
    </Show>
  );
}

export default UsersShow;