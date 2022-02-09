import * as React from "react";
import {
  Filter,
  TextInput,
  List,
  Datagrid,
  TextField,
  DateInput,
  SimpleList,
  EditButton,
  DeleteButton,
  useGetList,
  CreateButton,
  ChipField,
  useDatagridStyles,
  useListContext,
  ListContextProvider
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import isEmpty from 'is-empty';
import { useSelector } from 'react-redux';
import MobileGrid from './MobileGrid';
import ApproveButton from './ApproveButton';
// import { ModuleActions } from '../../components';
// import { Actions } from '../../components';


const useGetTotals = (filterValues) => {
    const { total: pendings } = useGetList(
      'applications',
      { perPage: 1, page: 1 },
      { field: 'id', order: 'ASC' },
      {...filterValues, status: 'Pendientes' }
    );
  
    const { total: approved } = useGetList(
      'applications',
      { perPage: 1, page: 1 },
      { field: 'id', order: 'ASC' },
      {...filterValues, status: 'Aprobadas' }
    );
  
    const { total: refused } = useGetList(
      'applications',
      { perPage: 1, page: 1 },
      { field: 'id', order: 'ASC' },
      {...filterValues, status: 'Rechazadas' }
    );
  
    return {
      'Pendientes': pendings,
      'Aprobadas': approved,
      'Rechazadas': refused
    };
  };

  const ApplicationsFilter = props => (
    <Filter {...props}>
      <TextInput label="Buscar" source='title' alwaysOn />
      <TextInput label="Número" source="num" />
      <TextInput label="Documento de la persona" source="document" />
      <TextInput label="Nombre de la persona" source="person_name" />
      <TextInput label="Comunidad" source="community_name" />
      <TextInput label="Parroquia" source="parish_name" />
      <TextInput label="Categoria" source="category" />
      <DateInput label="Enviado" source="created_at" />
    </Filter>
  );

const ApplicationsList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <List {...props}
      title="Solicitudes"
      //actions={<ApplicationsModuleActions {...props}/>}
      filterDefaultValues={{ status: 'Pendientes' }}
      bulkActionButtons={false}
      filters={<ApplicationsFilter />}
      exporter={false}
    >
      {
        isSmall
        ? (
          <SimpleList
            primaryText={record => `${record.title}`}
          />
        )
        : (
          <Datagrid>
              <TextField source="title" label="Nombre"/>
              <EditButton />
              <DeleteButton />
          </Datagrid>
        )
      }
    </List>
  );
};

export default ApplicationsList;