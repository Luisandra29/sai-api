import * as React from "react";
import fileDownload from 'js-file-download';
import { useNotify } from 'react-admin';
import { ButtonMenu } from '../../components';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import isEmpty from 'is-empty';
import { apiURL } from '../../config';
import { download } from '../../utils';

export default function (props) {
  const { onClick, record, ...rest } = props;
  const notify = useNotify();
  const url = `${apiURL}/applications/${record.id}/download`;

  const handleDownload = async () => {
    const {
      error,
      response
    } = await axios.get(url, { responseType: 'blob'})
          .then(res => ({ response: res.data }))
          .catch(error => ({ error: error.message.data }));

    if (!isEmpty(response)) {
      fileDownload(response, 'certificado.pdf');
      notify('¡El certificado ha sido descargado!');
    }
    if (!isEmpty(error)) {
      notify('Ha ocurrido un error en su solicitud.')
    }
  };

  return (
    <ButtonMenu
      label='Descargar'
      icon={<GetAppIcon />}
      onClick={() => {
        handleDownload();
        onClick();
      }}
      {...rest}
    />
  );
}
