import React from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import PropTypes from 'prop-types';

const ProfileContainer = ({ classes, match }) => {
  const id = match.params.userid;
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => (
        <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: id || viewer.id }}>
          {({ loading, error, data }) => {
            if (loading) return <FullScreenLoader inverted />;
            if (error) return <p>{`Error! ${error.message}`}</p>;
            return <Profile classes={classes} user={data.user} />;
          }}
        </Query>
      )}
    </ViewerContext.Consumer>
  );
};

ProfileContainer.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ProfileContainer);
