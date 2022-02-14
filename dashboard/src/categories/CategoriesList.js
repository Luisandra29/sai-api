import * as React from "react";
import {
  TextInput,
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  DeleteButton
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { Filter } from '../components';

// const CategoriesFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Nombre" source='name' />
//   </Filter>
// );

const CategoriesList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List {...props}
      title="Categorías"
      //actions={<ModuleActions shouldCreate/>}
      bulkActionButtons={false}
      filters={<Filter defaultfilter='name' />}
      exporter={false}
    >
      {
        isSmall
        ? (
          <SimpleList
          primaryText={record => `${record.name}`}
          secondaryText={record => `${record.applications_count} solicitudes`}
        />
        )
        : (
          <Datagrid>
              <TextField source="name" label="Nombre"/>
              <TextField source='applications_count' label='Solicitudes' />
              {/* <Actions {...props} shouldEdit shouldDelete /> */}
              <EditButton />
              <DeleteButton />
          </Datagrid>
        )
      }
    </List>
  );
};

export default CategoriesList;
