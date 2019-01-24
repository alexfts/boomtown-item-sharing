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
import ItemCard from '../../components/ItemCard';

const Items = ({ classes, items }) => {
  // @TODO refactor each card as separate component
  return (
    <div className={classes.cardGrid}>
      <Grid container spacing={24}>
        {items && // @TODO remove once loading component is there. Also refactor Grid into separate component
          items.map(item => (
            <Grid item sm={4} key={item.id}>
              <ItemCard classes={classes} item={item} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Items;
