import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    PasswordInput
} from 'react-admin';
  
const validate = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.name = ['Ingrese un correo.'];
    }
    if (!values.password) {
        errors.name = ['Ingrese una contraseña.'];
    }
    if (!values.role_id) {
        errors.name = ['Seleccione un rol.'];
    }
  
    return errors;
}

const choices = [
    { id: '1', name: 'Admininistrador' },
    { id: '2', name: 'Analista' },
  ];

const UsersCreate = props => (
    <Create {...props}  title='Nuevo Usuario'>
        <SimpleForm validate={validate} redirect='/users'>
            <TextInput
                source='email'
                label='Correo'
                placeholder="Ingrese Correo"
                fullWidth
            />
            <PasswordInput
                    label={false}
                    source='password'
                    placeholder="Contraseña"
                    fullWidth
                />
            <ReferenceInput label="Rol" source="role_id" reference="roles" >
                <SelectInput optionText="name" optionValue="id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default UsersCreate;