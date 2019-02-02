import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Slide
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import MoreVert from '@material-ui/icons/MoreVert';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import logo from '../../images/boomtown.svg';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import styles from './styles';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, location, logoutMutation } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar>
        <Toolbar position="static">
          <IconButton component={Link} to="/" className={classes.logoButton}>
            <img src={logo} alt="Boomtown" width="40px" height="48px" />
          </IconButton>
          <Slide
            direction="left"
            in={location.pathname !== '/share'}
            mountOnEnter
            unmountOnExit
          >
            <Button
              aria-label="Add"
              component={Link}
              to="/share"
              className={classes.shareButton}
            >
              <AddCircle color="secondary" className={classes.icon} />
              <Typography
                color="secondary"
                variant="button"
                style={{ fontSize: '13px' }}
              >
                Share something
              </Typography>
            </Button>
          </Slide>
          <div className={classes.menu}>
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={this.handleClose}
              >
                <ListItemIcon>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText inset primary="Your Profile" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.handleClose();
                  logoutMutation();
                }}
              >
                <ListItemIcon>
                  <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText inset primary="Sign Out" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

ControlBar.propTypes = {
  location: PropTypes.object.isRequired,
  logoutMutation: PropTypes.func.isRequired,
  classes: PropTypes.object
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),
  withStyles(styles),
  withRouter
)(ControlBar);
