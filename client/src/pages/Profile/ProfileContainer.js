import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    const id = this.props.match.params.userid || '1'; // @TODO replace '1' with authenticated user
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          console.log('user', data.user);
          return <Profile classes={this.props.classes} user={data.user} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
