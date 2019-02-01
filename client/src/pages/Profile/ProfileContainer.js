import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';

class ProfileContainer extends Component {
  render() {
    const id = this.props.match.params.userid;
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <Query
            query={ALL_USER_ITEMS_QUERY}
            variables={{ id: id || viewer.id }}
          >
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader inverted />;
              if (error) return <p>{`Error! ${error.message}`}</p>;
              console.log('user', data.user);
              return <Profile classes={this.props.classes} user={data.user} />;
            }}
          </Query>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
