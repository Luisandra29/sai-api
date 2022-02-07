import * as React from 'react';
import { Title } from 'react-admin';
import {
  Grid,
  Card,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useNotify } from 'react-admin';
import isEmpty from 'is-empty';
import axios from 'axios';

// Icons
import fileDownload from 'js-file-download';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  card: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4)
  },
  downloadButton: {
    margin: theme.spacing(2)
  }
}));

export default function Help() {
  const notify = useNotify();
  const url = `${window.location.origin}/files/manual.pdf`;
  const classes = useStyles();

  const handleDownload = async () => {
    const {
      error,
      response
    } = await axios.get(url, { responseType: 'blob'})
      .then(res => ({ response: res.data }))
      .catch(error => ({ error: error.message.data }));

    if (!isEmpty(response)) {
      fileDownload(response, 'manual.pdf');
    }
    if (!isEmpty(error)) {
      notify('Ha ocurrido un error en su solicitud.')
    }
  }

  return (
    <Grid className={classes.root}>
      <Title title='Ayuda'>Ayuda</Title>
      <Typography variant="h3">Manual de usuario</Typography>

      <Grid item md={6}>
        <Card className={classes.card}>
          <Typography variant="subtitle1">
            Nuestro manual de usuario es un archivo descargable en formato PDF.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            className={classes.downloadButton}
          >
            <GetAppIcon />
            Descargar
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};