import React from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import PropTypes from 'prop-types';
import { ViewerContext } from '../../context/ViewerProvider';

const ItemsContainer = ({ classes }) => (
  <ViewerContext.Consumer>
    {({ viewer, viewerLoading }) => (
      <Query query={ALL_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading || viewerLoading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          return (
            <Items
              classes={classes}
              items={data.items.filter(item => !item.borrower)}
              viewer={viewer}
            />
          );
        }}
      </Query>
    )}
  </ViewerContext.Consumer>
);

ItemsContainer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ItemsContainer);
