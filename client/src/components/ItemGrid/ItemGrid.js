import React from 'react';
import { Grid } from '@material-ui/core';
import ItemCard from '../ItemCard';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const ItemGrid = ({ classes, items }) => (
  <Grid container spacing={24} background-color="secondary">
    {items.map(item => (
      <Grid item sm={4} key={item.id}>
        <ItemCard item={item} />
      </Grid>
    ))}
  </Grid>
);

export default withStyles(styles)(ItemGrid);