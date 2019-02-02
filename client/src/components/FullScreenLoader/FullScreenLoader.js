import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const FullScreenLoader = ({ classes }) => (
  <div className={classes.container} background-color="secondary">
    <div className={classes.loader}>
      <Typography color="primary" variant="headline">
        "For it is in giving that we receive."
      </Typography>
      <CircularProgress color="primary" className={classes.spinner} />
    </div>
  </div>
);

FullScreenLoader.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(FullScreenLoader);
