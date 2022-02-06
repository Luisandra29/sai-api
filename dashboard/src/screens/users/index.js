import React from 'react';
import UserIcon from '@material-ui/icons/People';
import UserList from './List';
import UserEdit from './Edit';
import UserShow from './Show';

export default {
  name: 'users',
  list: UserList,
  user: UserShow,
  edit: UserEdit,
  icon: <UserIcon />,
  options: {
    label: 'Usuarios'
  }
}
