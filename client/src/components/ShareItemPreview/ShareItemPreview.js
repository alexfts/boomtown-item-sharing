import React from 'react';
import ItemCard from '../ItemCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = ({ shareItemPreview }) => ({
  shareItemPreview
});

const ShareItemPreview = ({ shareItemPreview, viewer }) => (
  <ItemCard item={{ ...shareItemPreview, itemowner: viewer }} viewer={viewer} />
);

ShareItemPreview.propTypes = {
  shareItemPreview: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ShareItemPreview);
