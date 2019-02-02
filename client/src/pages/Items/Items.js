import React from 'react';
import ItemGrid from '../../components/ItemGrid';
import PropTypes from 'prop-types';

const Items = ({ classes, items }) => (
  <div className={classes.cardGrid}>
    <ItemGrid items={items} />
  </div>
);

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object
};

export default Items;
