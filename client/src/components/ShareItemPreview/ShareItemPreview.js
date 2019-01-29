import React from 'react';
import ItemCard from '../ItemCard';
import { connect } from 'react-redux';

const mapStateToProps = ({ shareItemPreview }) => ({
  shareItemPreview
});

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

export default connect(mapStateToProps)(ShareItemPreview);
