import * as React from "react";
import {
  List,
  Datagrid,
  SimpleList,
  BulkDeleteButton,
  TextField
} from 'react-admin';
import { Actions, Filter, ModuleActions } from '../../components';
import { useMediaQuery } from '@material-ui/core';

export default function(props) {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List {...props}
      title="Categorías"
      actions={<ModuleActions shouldCreate/>}
      filters={<Filter defaultfilter='name'/>}
      bulkActionButtons={false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => `${record.name}`}
          secondaryText={record => `${record.applications_count} solicitudes`}
        />
      ) : (
        <Datagrid>
          <TextField source='name' label='Nombre' />
          <TextField source='applications_count' label='Solicitudes' />
          <Actions {...props} shouldEdit shouldDelete />
        </Datagrid>
      )}
    </List>
  );
}

