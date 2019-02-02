import React from 'react';
import ItemGrid from '../../components/ItemGrid';

const Items = ({ classes, items }) => (
  <div className={classes.cardGrid}>
    <ItemGrid items={items} />
  </div>
);

export default Items;
