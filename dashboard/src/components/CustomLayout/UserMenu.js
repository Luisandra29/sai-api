import React, { forwardRef } from "react";
import { AppBar, UserMenu, MenuItemLink  } from 'react-admin';
import LogoutButton from './LogOut';
// Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const MenuItems = forwardRef(({ onClick  }, ref) => (
  <>
    <MenuItemLink
      ref={ref}
      to="/update-password"
      primaryText="Cambiar contraseña"
      leftIcon={<VpnKeyIcon />}
      onClick={onClick} // close the menu on click
    />
  </>
));

const CustomUserMenu = () => (
  <UserMenu logout={<LogoutButton />}>
    <MenuItems/>
  </UserMenu>
);

export default CustomUserMenu;
