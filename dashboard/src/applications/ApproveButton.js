import * as React from "react";
import { useRefresh, useNotify } from 'react-admin';
import { ButtonMenu } from '../components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import GradeIcon from '@material-ui/icons/Grade';
import axios from 'axios';
import isEmpty from 'is-empty';
//import { apiURL } from '../config';

const apiURL =  'http://localhost:8000/api';

export default function (props) {
  const { onClick, record, ...rest } = props;
  const [showDialog, setShowDialog] = React.useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => setShowDialog(!showDialog);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async () => {
    const { response, error } = await axios.put(`${apiURL}/applications/${record.id}`)
      .then(res => ({ response: res.data }))
      .catch(error => ({ error: error.message.data }));

    if (!isEmpty(response)) {
      handleClick();
      refresh();
      notify(response.message);
    }
  };

  return (<>
    { <ButtonMenu
      label='Aprobar'
      icon={<GradeIcon />}
      onClick={(e) => {
        handleClickOpen();
        onClick();
      }}
      {...rest}
    /> }

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`¿Realmente desea aprobar la solicitud #${record.num}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleApprove} autoFocus>
          Aprobar
          </Button>
        </DialogActions>
      </Dialog>
  </>);
}
