import {
    Create,
    SimpleForm,
    TextInput,
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
    if (!values.role) {
        errors.name = ['Seleccione un rol.'];
    }
  
    return errors;
}

const choices = [
    { id: '1', name: 'Admininistrador' },
    { id: '2', name: 'Analista' },
  ];

const CategoriesCreate = props => (
    <Create {...props}  title='Nuevo Usuario'>
        <SimpleForm validate={validate} redirect='/users'>
            <TextInput
                source='email'
                label='Correo'
                placeholder="Nombre de la nueva categoría"
                fullWidth
            />
            <PasswordInput
                    label={false}
                    source='password'
                    placeholder="Contraseña"
                    fullWidth
                />
            <SelectInput
              source="role"
              label='Rol'
              choices={choices}
              options={{
                fullWidth: true
              }}
            />
        </SimpleForm>
    </Create>
);

export default CategoriesCreate;