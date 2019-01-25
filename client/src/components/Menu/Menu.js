import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../images/boomtown.svg';

const Menu = ({ classes, items }) => (
  <AppBar>
    <Toolbar position="static">
      <IconButton component={Link} to="/">
        <img src={logo} alt="Boomtown" width="40" />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Menu;
