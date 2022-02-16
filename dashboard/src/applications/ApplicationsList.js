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
  ListContextProvider,
  NullableBooleanInput
} from 'react-admin';
import { Tab, Tabs, Divider, useMediaQuery } from '@material-ui/core';
import isEmpty from 'is-empty';
import { useSelector } from 'react-redux';
import { ModuleActions } from '../components';
import MobileGrid from './MobileGrid';
import ApproveButton from './ApproveButton';
import DownloadButton from './DownloadButton';

// import { ModuleActions } from '../../components';
import { Actions } from '../components';
import { useFetch } from "../fetch";

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
      {/* <TextInput label="Documento de la persona" source="document" />
      <TextInput label="Nombre de la persona" source="person_name" />
      <TextInput label="Comunidad" source="community_name" />
      <TextInput label="Parroquia" source="parish_name" /> */}
      <TextInput label="Categoria" source="category" />
      {/* <DateInput label="Enviado" source="created_at" /> */}
    </Filter>
  );

const ApplicationsList = props => {
  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;
  const classes = useDatagridStyles();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [tabs] =React.useState([
    { id: 1, list_name: 'Pendientes' },
    { id: 2, list_name: 'Aprobadas' },
    { id: 3, list_name: 'Rechazadas' },
  ]);
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [refused, setRefused] = React.useState([]);
  const totals = useGetTotals(filterValues);

  const handleChange = React.useCallback((e, newValue) => {
    setFilters && setFilters({ ...filterValues, status: newValue }, displayedFilters);
  }, [displayedFilters, filterValues, setFilters]);

  React.useEffect(() => {
    if (ids) {
      switch (filterValues.status) {
        case 'Pendientes':
          setPending(ids);
          break;
        case 'Aprobadas':
          setApproved(ids);
          break;
        case 'Rechazadas':
          setRefused(ids);
          break;
      }
    }
  }, [ids, filterValues.status]);

  const selectedIds =
    filterValues.status == 'Pendientes'
      ? pending
      : filterValues.status == 'Aprobadas'
      ? approved
      : refused;

  return (
    <React.Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {(true) && (
          tabs.map(choice => (
            <Tab
              key={choice.id}
              label={
                totals[choice.list_name]
                  ? `${choice.list_name} (${totals[choice.list_name]})`
                  : choice.list_name
              }
              value={choice.list_name}
            />
          ))
        )}
      </Tabs>
      <Divider />
      {isSmall ? (
        <ListContextProvider value={{ ...listContext, ids: selectedIds }} >
          <MobileGrid {...props} ids={selectedIds} />
        </ListContextProvider>
      ) : (
        <div>
          
          {filterValues.status === 'Pendientes' && (
            <ListContextProvider value={{ ...listContext, ids: selectedIds }}>
              <Datagrid {...props} optimized>
                <TextField label='Número' source="num" />
                <TextField label='Asunto' source="title" />
                <ChipField label='Categoría' source="category.name" />
                <Actions {...props} shouldShow shouldDelete={{ label: 'Rechazar' }}>
                  <ApproveButton />
                </Actions>
              </Datagrid>
            </ListContextProvider>
          )}

          {filterValues.status === 'Aprobadas' && (
            <ListContextProvider value={{ ...listContext, ids: selectedIds }}>
              <Datagrid {...props} optimized>
                <TextField label='Número' source="num" />
                <TextField label='Asunto' source="title" />
                <ChipField label='Categoría' source="category.name" />
                <Actions {...props} shouldShow>
                  <DownloadButton /> 
                </Actions>
              </Datagrid>
            </ListContextProvider>
          )}

          {filterValues.status === 'Rechazadas' && (
            <ListContextProvider value={{ ...listContext, ids: selectedIds }}>
              <Datagrid {...props} optimized>
                <TextField label='Número' source="num" />
                <TextField label='Asunto' source="title" />
                <ChipField label='Categoría' source="category.name" />
                <Actions {...props} shouldShow />
              </Datagrid>
            </ListContextProvider>
          )}
        </div>
      )}
    </React.Fragment>
  )
};


const ApplicationsModuleActions = props => (
  <ModuleActions {...props}>
    <CreateButton basePath="applications" />
  </ModuleActions>
);


export default function(props) {
  return (
    <List {...props}
      title="Solicitudes"
      actions={<ApplicationsModuleActions {...props}/>}
      filterDefaultValues={{ status: 'Pendientes' }}
      filters={<ApplicationsFilter />}
      bulkActionButtons={false}
    >
      <ApplicationsList />
    </List>
  );
}

// export default ApplicationsList;