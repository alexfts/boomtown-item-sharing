import React from 'react';
import { Grid } from '@material-ui/core';
import ItemCard from '../ItemCard';

const ItemGrid = ({ classes, items }) => (
  <Grid container spacing={24}>
    {items.map(item => (
      <Grid item sm={4} key={item.id}>
        <ItemCard classes={classes} item={item} />
      </Grid>
    ))}
  </Grid>
);

export default ItemGrid;
