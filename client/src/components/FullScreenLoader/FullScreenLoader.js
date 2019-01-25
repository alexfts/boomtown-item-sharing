import React from 'react';
import { CircularProgress } from '@material-ui/core';

const FullScreenLoader = ({ classes }) => (
  <div>
    <CircularProgress color="secondary" />
  </div>
);

export default FullScreenLoader;
