import * as React from "react";
import { useRefresh, useNotify } from 'react-admin';
import { ButtonMenu } from '../../components';
import { Dialog } from 'mui-extra';
import GradeIcon from '@material-ui/icons/Grade';
import axios from 'axios';
import isEmpty from 'is-empty';
import { apiURL } from '../../config';

export default function (props) {
  const { onClick, record, ...rest } = props;
  const [showDialog, setShowDialog] = React.useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = () => setShowDialog(!showDialog);

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
    <ButtonMenu
      label='Aprobar'
      icon={<GradeIcon />}
      onClick={() => {
        handleClick();
        onClick();
      }}
      {...rest}
    />

    <Dialog
      fullWidth
      open={showDialog}
      ariaLabel={'Aprobar solicitud'}
      title={`¿Realmente desea aprobar la solicitud #${record.num}?`}
      submitLabel={'Aprobar'}
      handleClick={handleClick}
      action={() => {
        handleApprove();
        handleClick();
      }}
    />
  </>);
}
