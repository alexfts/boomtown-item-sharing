import React from 'react';
import { CircularProgress } from '@material-ui/core';

const FullScreenLoader = ({ classes }) => (
  <div>
    <div color="secondary">"For it is in giving that we receive."</div>
    <CircularProgress color="secondary" />
  </div>
);

export default FullScreenLoader;
