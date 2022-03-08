import React from 'react';
import UserIcon from '@material-ui/icons/People';
import UsersList from './UsersList';
import UsersCreate from './UsersCreate';
import UsersEdit from './UsersEdit';
import UsersShow from './UsersShow';

export default {
  name: 'users',
  icon: UserIcon,
  list: UsersList,
  create: UsersCreate,
  show: UsersShow,
  edit: UsersEdit,
  options: {
    label: 'Usuarios'
  }
}
