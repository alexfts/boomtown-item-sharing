import React from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';

const HomeContainer = ({ classes }) => <Home classes={classes} />;

HomeContainer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HomeContainer);
