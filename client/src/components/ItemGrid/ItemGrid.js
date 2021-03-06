import React from 'react';
import { Grid } from '@material-ui/core';
import ItemCard from '../ItemCard';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';

const ItemGrid = ({ items, viewer }) => (
  <Grid container spacing={24} background-color="secondary">
    {items.map(item => (
      <Grid item sm={4} key={item.id}>
        <ItemCard item={item} viewer={viewer} />
      </Grid>
    ))}
  </Grid>
);

ItemGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
  viewer: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemGrid);
