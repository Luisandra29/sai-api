import React from 'react';
import { connect, useSelector } from 'react-redux';
import { MenuItemLink, getResources, Responsive  } from 'react-admin';
import EmojiPeople from '@material-ui/icons/EmojiPeople';
import { withRouter } from 'react-router-dom';
import isEmpty from 'is-empty';

import DashboardIcon from '@material-ui/icons/Dashboard';

const Menu = ({ resources, onMenuClick }) => {
  const user = useSelector(store => store.user.user);
  const [rol, setRol] = React.useState(3);

  React.useEffect(() => {
    if (!isEmpty(user)) {
      setRol(user.role_id);
    }
  }, [user]);

  return (
    <>
      <MenuItemLink
        to="/home"
        primaryText="Inicio"
        onClick={onMenuClick}
        leftIcon={<DashboardIcon />}
      />

      {
        resources.map(resource => (
          <MenuItemLink
            key={resource.name}
            to={`/${resource.name}`}
            primaryText={resource.options.label}
            leftIcon={resource.icon}
            onClick={onMenuClick}
          />
        ))
      }

      { (rol != 3) &&
        <MenuItemLink
          to="/help"
          primaryText="Ayuda"
          onClick={onMenuClick}
          leftIcon={<EmojiPeople />}
        />
      }
    </>
  );
}

const mapStateToProps = state => ({
  resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));
