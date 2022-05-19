import {
    Create,
    SimpleForm
} from 'react-admin';
import TextInput from '../components/TextInput'

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Ingrese un nombre.';
    }

    return errors;
}

const CategoriesCreate = props => (
    <Create {...props}  title='Nueva categoría'>
        <SimpleForm validate={validate} redirect='/categories'>
            <TextInput
                name='name'
                label='Nombre'
                placeholder="Nombre de la nueva categoría"
                fullWidth
            />
        </SimpleForm>
    </Create>
);

export default CategoriesCreate;
