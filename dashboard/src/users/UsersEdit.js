// import * as React from "react";
// import {
//   Edit,
//   Toolbar,
//   SaveButton,
//   useRedirect,
//   useNotify,
//   Loading,
//   SelectInput,
//   SimpleForm,
//   useQuery,
//   useEditController,
//   TextInput
// } from 'react-admin';
// // import ActiveStatusButton from './ActiveStatusButton';
// import { useFetch } from '../fetch';

// const UserName = ({ record }) => (
//   <span>{record ? `${record.email}` : ''}</span>
// );

// const EditToolbar = props => (
//   <Toolbar {...props} >
//     <SaveButton />
//     {/* <ActiveStatusButton /> */}
//   </Toolbar>
// );

// const validator = (values) => {
//   const errors = {};

//   if (!values.rol) {
//     errors.rol = ['Seleccione un rol'];
//   }

//   return errors;
// }

// const UserEdit = (props) => {
//   const redirect = useRedirect();
//   const notify = useNotify();
//   const { isLoading, response: data } = useFetch('roles');
//   const {
//     loading,
//     record
//   } = useEditController(props);

//   return (
//     <Edit {...props} title={<UserName />} redirect={'/users'}>
//     { (isLoading)
//         ? <Loading loadingPrimary="Cargando..." loadingSecondary="Cargando..." />
//         : (
//           <SimpleForm toolbar={<EditToolbar />} validate={validator}>
//             <SelectInput
//               source="rol"
//               label='Rol'
//               choices={data}
//               options={{
//                 fullWidth: true
//               }}
//             />
//           </SimpleForm>
//         )
//       }
//     </Edit>
//   );
// };

// export default UserEdit;

import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
} from 'react-admin';

const validate = values => {
  const errors = {};

  if (!values.email) {
      errors.email = "Ingrese correo";
  }

  if (!values.rol) {
    errors.rol = ['Seleccione un rol'];
  }

  return errors;
};

const choices = [
  { id: '1', name: 'Admininistrador' },
  { id: '2', name: 'Analista' },
];

const UserEdit = props => (
  <Edit {...props}  title='Actualizar usuario'>
      <SimpleForm validate={validate}>
          <TextInput
              label={false}
              source="email"
              //placeholder="Ej. Avenida Libertad #217"
          />
          <SelectInput
              source="role"
              label='Rol'
              // choices={"${record.role.name}"}
              //validate={required()}
              choices={choices}
              options={{
                fullWidth: true
              }}
            />
      </SimpleForm>
  </Edit>
);

export default UserEdit;