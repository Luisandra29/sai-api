import * as React from "react";
import fileDownload from 'js-file-download';
import { stringify } from 'qs';
import {
  useResourceContext,
  useListContext,
  useDataProvider,
  Button
} from 'react-admin';
import axios from 'axios';
import isEmpty from 'is-empty';
import { apiURL } from '../../config';
import DownloadIcon from '@material-ui/icons/PlayForWork';

export default function (props) {
  const {
    filter,
    filterValues,
    currentSort,
    total
  } = useListContext(props);
  const resource = useResourceContext(props);
  const dataProvider = useDataProvider();

  const handleClick = React.useCallback(
    async (event) => {
      let query = {
        page: 1,
        perPage: 1000,
        type: 'pdf'
      };

      Object.keys(filter || {}).forEach((key) => {
        query[`filter[${key}]`] = filter[key];
      });

      Object.keys(filterValues || {}).forEach((key) => {
        query[`filter[${key}]`] = filterValues[key];
      });

      const url = `${apiURL}/${resource}?${stringify(query)}`;

      const {
        error,
        response
      } = await axios.get(url, { responseType: 'blob'})
          .then(res => ({ response: res.data }))
          .catch(error => ({ error: error.message.data }));

      if (!isEmpty(response)) {
        fileDownload(response, 'reporte.pdf');
      }
    },
    [
      filter,
      filterValues,
      resource
    ]
  );

  return (
    <Button
      label='Imprimir'
      onClick={handleClick}
      disabled={total === 0}
    >
      <DownloadIcon />
    </Button>
  );
}
