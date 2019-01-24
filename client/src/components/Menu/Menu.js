import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';

const Menu = ({ classes, items }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton>
        <img src="/client/src/images/boomtown.svg" alt="Boomtown" />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Menu;
