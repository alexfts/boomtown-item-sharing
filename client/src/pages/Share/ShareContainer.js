import React from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import PropTypes from 'prop-types';

const ShareContainer = ({ classes }) => (
  <ViewerContext.Consumer>
    {({ viewer, viewerLoading }) => (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading || viewerLoading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          return <Share classes={classes} tags={data.tags} viewer={viewer} />;
        }}
      </Query>
    )}
  </ViewerContext.Consumer>
);

ShareContainer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ShareContainer);
