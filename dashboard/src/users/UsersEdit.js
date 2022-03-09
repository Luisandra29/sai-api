import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

const validate = values => {
  const errors = {};

  if (!values.email) {
      errors.email = "Ingrese correo";
  }

  if (!values.role_id) {
    errors.rol = ['Seleccione un rol'];
  }

  return errors;
};


const UsersEdit = props => (
  <Edit {...props}  title='Actualizar usuario'>
      <SimpleForm validate={validate}>
          <TextInput
              label={false}
              source="email"
              label='Correo'
          />
          <ReferenceInput label="Rol" source="role_id" reference="roles" >
              <SelectInput optionText="name" optionValue="id" />
          </ReferenceInput>
      </SimpleForm>
  </Edit>
);

export default UsersEdit;