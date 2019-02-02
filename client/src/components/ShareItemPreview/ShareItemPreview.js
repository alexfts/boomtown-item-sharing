import React from 'react';
import ItemCard from '../ItemCard';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';

const mapStateToProps = ({ shareItemPreview }) => ({
  shareItemPreview
});

const ShareItemPreview = ({ shareItemPreview }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <ItemCard item={{ ...shareItemPreview, itemowner: viewer }} />
    )}
  </ViewerContext.Consumer>
);

export default connect(mapStateToProps)(ShareItemPreview);
