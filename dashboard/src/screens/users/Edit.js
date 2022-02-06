import * as React from "react";
import {
  Edit,
  Toolbar,
  SaveButton,
  useRedirect,
  useNotify,
  Loading,
  SelectInput,
  SimpleForm,
  useQuery,
  useEditController,
  TextInput
} from 'react-admin';
import ActiveStatusButton from './ActiveStatusButton';
import { useFetch } from '../../fetch';

const UserName = ({ record }) => (
  <span>{record ? `${record.profile.full_name}` : ''}</span>
);

const EditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
    <ActiveStatusButton />
  </Toolbar>
);

const validator = (values) => {
  const errors = {};

  if (!values.rol) {
    errors.rol = ['Seleccione un rol'];
  }

  return errors;
}

const UserEdit = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { isLoading, response: data } = useFetch('roles');
  const {
    loading,
    record
  } = useEditController(props);

  return (
    <Edit {...props} title={<UserName />} redirect={'/users'}>
    { (isLoading)
        ? <Loading loadingPrimary="Cargando..." loadingSecondary="Cargando..." />
        : (
          <SimpleForm toolbar={<EditToolbar />} validate={validator}>
            <SelectInput
              source="rol"
              label='Rol'
              choices={data}
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

export default UserEdit;

