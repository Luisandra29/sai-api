import {
    Create,
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

const CommunityCreate = props => (
    <Create {...props}>
        <SimpleForm validate={validate} redirect='/communities'>
            <TextInput
                label={false}
                source="name"
                placeholder="Ej. Avenida Libertad #217"
                fullWidth
            />
        </SimpleForm>
    </Create>
);

export default CommunityCreate;
