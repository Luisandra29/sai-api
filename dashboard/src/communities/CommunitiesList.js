import * as React from "react";
import {
  TextInput,
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  DeleteButton,
  ChipField
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { Filter } from '../components';

// const CommunitiesFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Nombre" source='name' />
//   </Filter>
// );

const CommunitiesList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List {...props}
      title="Comunidades"
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
              <ChipField  source='applications_count' label='Solicitudes' />
              <TextField source='parish_names' label='Parroquia (s)' />
              <EditButton />
              <DeleteButton />
          </Datagrid>
        )
      }
    </List>
  );
};

export default CommunitiesList;
