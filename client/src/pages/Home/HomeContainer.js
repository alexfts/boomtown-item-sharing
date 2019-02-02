import React from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const HomeContainer = ({ classes }) => <Home classes={classes} />;
export default withStyles(styles)(HomeContainer);
