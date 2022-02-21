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

// const parishes = [
//     { id: 1, name: "BOLÍVAR" },
//     { id: 2, name: "MACARAPANA" },
//     { id: 3, name: "SANTA CATALINA" },
//     { id: 4, name: "SANTA ROSA" },
//     { id: 5, name: "SANTA TERESA" }
//   ]

const CommunityCreate = props => (
    <Create {...props} title='Nueva comunidad'>
        <SimpleForm validate={validate} redirect='/communities'>
            <TextInput source="name" label="Nombre" fullWidth />
            {/* <SelectInput
                      source="parishes"
                      choices={parishes}
                      label='Parroquia(s)'
                      fullWidth
                      options={{
                        fullWidth: true
                      }}
                    /> */}
             <ReferenceInput label="Parroquia(s)" source="parish_id" reference="parishes" >
                <SelectInput optionText="name" optionValue="id" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default CommunityCreate;
