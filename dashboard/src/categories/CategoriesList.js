import * as React from "react";
import {
  Filter,
  TextInput,
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  DeleteButton
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const CategoriesFilter = props => (
  <Filter {...props}>
    <TextInput label="Nombre" source='name' />
  </Filter>
);

const CategoriesList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List {...props}
      title="Rubros del mercado"
      bulkActionButtons={false}
      filters={<CategoriesFilter />}
      exporter={false}
    >
      {
        isSmall
        ? (
          <SimpleList
            primaryText={record => `${record.name}`}
          />
        )
        : (
          <Datagrid>
              <TextField source="name" label="Nombre"/>
              <EditButton />
              <DeleteButton />
          </Datagrid>
        )
      }
    </List>
  );
};

export default CategoriesList;
