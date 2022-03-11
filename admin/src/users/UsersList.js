import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    SimpleList,
    EditButton,
    DeleteButton
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const UsersList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <List {...props}
            title="Usuarios"
            bulkActionButtons={false}
            exporter={false}
        >
            {
                isSmall
                ? (
                <SimpleList
                primaryText={record => `${record.email}`}
                secondaryText={record => `${record.role.name} solicitudes`}

                />
                )
                : (
                <Datagrid>
                    <TextField source="email" label="Correo"/>
                    <TextField source='role.name' label='Rol' />
                    {/* <Actions {...props} shouldEdit shouldDelete /> */}
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
                )
            }
        </List>
    );
};

export default UsersList;
