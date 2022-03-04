import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectArrayInput,
    SelectInput,
} from 'react-admin';
  
const validate = values => {
    const errors = {};

    if (!values.name || !values.name.trim()) {
      errors.name = ['Ingrese un nombre.'];
    }
  
    if (!values.parishes) {
      errors.parishes = ['Seleccione al menos una parroquia.'];
    }
  
    return errors;
};

const CommunityCreate = props => (
    <Create {...props} title='Nueva comunidad'>
        <SimpleForm validate={validate} redirect='/communities'>
            <TextInput source="name" label="Nombre" fullWidth />
             <ReferenceInput label="Parroquia(s)" source="parish_id" reference="parishes" >
                <SelectInput optionText="name" optionValue="id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default CommunityCreate;
