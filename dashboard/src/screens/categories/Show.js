import * as React from "react";
import { useShowController } from 'react-admin';
import {
  Card,
  CircularProgress,
  Grid,
  Typography,
  CardContent
} from '@material-ui/core';
import { CardProgress } from 'mui-extra';
import isEmpty from 'is-empty';

const CategoryTitle = ({ record  }) => (
  <span>{record ? `${record.name}` : ''}</span>
);

const CategoryShow = (props) => {
  const {
    basePath,
    loaded,
    loading,
    record,
  } = useShowController(props);

  return (
    <Grid>
      <Grid item xs={12}>
        {(loading) ?(
          <CardProgress circular />
          ) : (
          <Card>
            <CardContent>
              <Typography>{record.name}</Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default function(props) {
  return <CategoryShow {...props} />;
};
