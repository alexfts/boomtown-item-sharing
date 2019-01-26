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
  Fab
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import MoreVert from '@material-ui/icons/MoreVert';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import logo from '../../images/boomtown.svg';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ControlBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, items } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar>
        <Toolbar position="static">
          <IconButton component={Link} to="/" className={classes.logoButton}>
            <img src={logo} alt="Boomtown" width="40" />
          </IconButton>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            component={Link}
            to="/share"
            className={classes.shareButton}
            size="small"
          >
            <AddCircle color="secondary" className={classes.icon} />
            Share something
          </Fab>
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
                component={Link}
                to="/welcome"
                onClick={this.handleClose}
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

export default withStyles(styles)(ControlBar);
