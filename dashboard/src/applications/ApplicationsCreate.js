import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';
  
const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese solicitud";
    }

    return errors;
};

const ApplicationsCreate = props => (
    <Create {...props}>
        <SimpleForm validate={validate} redirect='/applications'>
            <TextInput
                label={false}
                source="name"
                placeholder="Ej. Avenida Libertad #217"
                fullWidth
            />
        </SimpleForm>
    </Create>
);

export default ApplicationsCreate;
