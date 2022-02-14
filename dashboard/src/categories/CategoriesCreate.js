import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';
  
const validate = (values) => {
    const errors = {};
  
    if (!values.name) {
      errors.name = ['Ingrese un nombre.'];
    }
  
    return errors;
  }

const ItemCreate = props => (
    <Create {...props}  title='Nueva categoría'>
        <SimpleForm validate={validate} redirect='/categories'>
            <TextInput
                source='name'
                label='Nombre'
                placeholder="Nombre de la nueva categoría"
                fullWidth
            />
        </SimpleForm>
    </Create>
);

export default ItemCreate;
