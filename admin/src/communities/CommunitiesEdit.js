import {
    Edit,
    SimpleForm,
    TextInput,
    SelectArrayInput,
} from 'react-admin';
  
const validate = (values) => {
    const errors = {};
  
    if (!values.name) {
        errors.name = ['Ingrese un nombre.'];
    }
  
    return errors;
}

const choices = [
    { id: '1', name: 'BOLÍVAR' },
    { id: '2', name: 'MACARAPANA' },
    { id: '3', name: 'SANTA CATALINA' },
    { id: '4', name: 'SANTA ROSA' },
    { id: '5', name: 'SANTA TERESA' },
];

const CommunitiesEdit = props => (
    <Edit {...props} title="Editar comunidad">
        <SimpleForm validate={validate}>
          <TextInput
            source="name"
            label="Nombre"
          />
          <SelectArrayInput
            source="parishes"
            label='Parroquia(s)'
            //choices={"${record.parish_names}"}
            //validate={required()}
            choices={choices}
            options={{
              fullWidth: true
            }}
          />
        </SimpleForm>
    </Edit>
);

export default CommunitiesEdit;
