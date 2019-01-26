import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
import logo from '../../images/boomtown.svg';

const Menu = ({ classes, items }) => (
  <AppBar>
    <Toolbar position="static">
      <IconButton component={Link} to="/">
        <img src={logo} alt="Boomtown" width="40" />
      </IconButton>
      <Button variant="contained" color="primary">
        <AddCircle color="secondary" />
        Share something
      </Button>
    </Toolbar>
  </AppBar>
);

export default Menu;
