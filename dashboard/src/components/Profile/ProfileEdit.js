import React from 'react';
import {
  Edit,
  TextInput,
  SimpleForm,
  required
} from 'react-admin';

const ProfileEdit = ({ staticContext, ...props }) => {
  return (
    <Edit
      id='profile'
      resource='profile'
      basePath='/profile'
      redirect={false} // I don't need any redirection here, there's no list page
      title='Mi perfil'
      {...props}
    >
      <SimpleForm>
        <TextInput source="first_name" validate={required()} />
      </SimpleForm>
    </Edit>
  );
};

export default ProfileEdit;

