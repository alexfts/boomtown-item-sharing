import React from 'react';
import ItemGrid from '../../components/ItemGrid';
import PropTypes from 'prop-types';

const Items = ({ classes, items, viewer }) => (
  <div className={classes.cardGrid}>
    <ItemGrid items={items} viewer={viewer} />
  </div>
);

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object,
  viewer: PropTypes.object.isRequired
};

export default Items;
