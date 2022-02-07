import * as React from "react";
import {
  Edit,
  Loading,
  SelectArrayInput,
  SimpleForm,
  useQuery,
  useEditController,
  TextInput
} from 'react-admin';

const validator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = ['Ingrese un nombre.'];
  }

  return errors;
}

const CommunityEdit = (props) => { 
  const {
    loading,
    record
  } = useEditController(props);

  return (
    <Edit {...props}
      title="Editar comunidad" 
    >
    { (loading)
        ? <Loading loadingPrimary="Cargando..." loadingSecondary="Cargando..." />
        : ( 
          <SimpleForm validate={validator}>
            <TextInput
              source="name"
              label="Nombre"
            />
            <SelectArrayInput
              source="parishes"
              label='Parroquia(s)'
              choices={record.parishes}
              options={{
                fullWidth: true
              }}
            />
          </SimpleForm>
        )
      }
    </Edit>
  );
};

export default CommunityEdit;

