import * as React from "react";
import { useRefresh, useNotify } from 'react-admin';
import { ButtonMenu } from '../../components';
import { Dialog } from 'mui-extra';
import DoneIcon from '@material-ui/icons/DoneAll';
import axios from 'axios';
import isEmpty from 'is-empty';
import { apiURL } from '../../config';

export default function (props) {
  const { onClick, record, ...rest } = props;
  const [showDialog, setShowDialog] = React.useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = () => setShowDialog(!showDialog);

  const handleRequest = async () => {
    const { response, error } = await axios.post(`${apiURL}/users/${record.id}/update-status`)
      .then(res => ({ response: res.data }))
      .catch(error => ({ error: error.message.data }));

    if (!isEmpty(response)) {
      handleClick();
      refresh();
      notify(response.message);
    }
  };

  if (!record) {
    return null;
  }

  const message = (record.active)
    ? `¿Desea inhabilitar al usuario ${record.profile.full_name}?`
    : `¿Desea habilitar el usuario ${record.profile.full_name}?`;

  return (<>
    <ButtonMenu
      label={(record.active) ? 'Desactivar' : 'Activar'}
      icon={<DoneIcon />}
      onClick={() => {
        handleClick();
        onClick();
      }}
      {...rest}
    />

    <Dialog
      fullWidth
      open={showDialog}
      ariaLabel={'Desactivar usuario'}
      title={message}
      submitLabel={(record.active) ? 'Desactivar' : 'Activar'}
      handleClick={handleClick}
      action={() => {
        handleRequest();
        handleClick();
      }}
    />
  </>);
}
