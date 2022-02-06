import * as React from 'react';
import { Layout, AppBar, Notification } from 'react-admin';
import Menu from './Menu';
import UserMenu from './UserMenu';

const CustomAppBar = props =>
  <AppBar 
    {...props}
    userMenu={<UserMenu />}
  />

export default (props) => <Layout
  {...props}
  appBar={CustomAppBar}
  menu={Menu}
  notification={Notification}
/>;

