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

const CategoriesEdit = props => (
    <Edit {...props}  title='Actualizar categoría'>
        <SimpleForm validate={validate}>
            <TextInput
                label={false}
                source="name"
                fullWidth
            />
        </SimpleForm>
    </Edit>
);

export default CategoriesEdit;
