import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ItemGrid from '../../components/ItemGrid';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.cardGrid}>
      <ItemGrid items={items} />
    </div>
  );
};

export default Items;
