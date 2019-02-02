import React from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';

const ItemsContainer = ({ classes }) => (
  <Query query={ALL_ITEMS_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <FullScreenLoader inverted />;
      if (error) return <p>{`Error! ${error.message}`}</p>;
      return (
        <Items
          classes={classes}
          items={data.items.filter(item => !item.borrower)}
        />
      );
    }}
  </Query>
);

export default withStyles(styles)(ItemsContainer);
