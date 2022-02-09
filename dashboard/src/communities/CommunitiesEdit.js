import {
    Edit,
    SimpleForm,
    TextInput,
} from 'react-admin';
  
const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Ingrese el nombre del rubro";
    }

    return errors;
};

const CommunitiesEdit = props => (
    <Edit {...props}>
        <SimpleForm validate={validate}>
            <TextInput
                label={false}
                source="name"
                placeholder="Ej. Avenida Libertad #217"
                fullWidth
            />
        </SimpleForm>
    </Edit>
);

export default CommunitiesEdit;
