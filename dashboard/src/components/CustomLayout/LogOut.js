import * as React from 'react';
import { logout } from '../../actions';
import { useDispatch } from 'react-redux';
import { 
  MenuItem,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
// Icons
import ExitIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles(
  theme => ({
    icon: { minWidth: theme.spacing(5)  },
  })
);

const LogoutButton = props => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logout());
  const classes = useStyles();

  return (
    <MenuItem onClick={handleClick} style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ListItemIcon className={classes.icon} >
        <ExitIcon />
      </ListItemIcon>
      <span>Cerrar sesión</span>
    </MenuItem>
  );
};

export default LogoutButton;
