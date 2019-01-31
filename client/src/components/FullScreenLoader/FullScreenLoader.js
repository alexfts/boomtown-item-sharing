import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

const FullScreenLoader = ({ classes }) => (
  <div>
    <Typography color="yellow">
      "For it is in giving that we receive."
    </Typography>
    <CircularProgress color="yellow" />
  </div>
);

export default FullScreenLoader;
