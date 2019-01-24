import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const ItemCard = ({ classes, item }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography variant="headline">{item.title}</Typography>
      <Typography variant="caption">
        {item.tags.map(({ title }) => title).join(', ')}
      </Typography>
      <Typography>{item.description}</Typography>
    </CardContent>
  </Card>
);

export default ItemCard;
