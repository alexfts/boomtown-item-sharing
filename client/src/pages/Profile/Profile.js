import React from 'react';
import { Grid, Paper, Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
import ItemGrid from '../../components/ItemGrid';
import PropTypes from 'prop-types';

const Profile = ({ classes, user }) => {
  if (!user) return <div />;
  const numShared = user.items.length;
  const numBorrowed = user.borrowed.length;
  const itemOrItems = item => (item === 1 ? 'Item' : 'Items');
  return (
    <div className={classes.profile}>
      <Paper className={classes.paper}>
        <Grid container alignItems="center">
          <Avatar className={classes.avatar}>
            <Gravatar email={user.email} />
          </Avatar>
          <Typography variant="display2" className={classes.name}>
            {user.fullname}
          </Typography>
        </Grid>
        <Typography variant="headline" className={classes.itemsOverview}>
          <span className={classes.itemCount}>{numShared}</span>{' '}
          {' ' + itemOrItems(numShared) + ' shared, '}
          <span className={classes.itemCount}>{numBorrowed + ' '}</span>{' '}
          {' ' + itemOrItems(numBorrowed) + ' borrowed.'}
        </Typography>
        <Typography variant="body1" className={classes.bio}>
          "{user.bio}"
        </Typography>
      </Paper>

      {numShared > 0 && (
        <Typography
          variant="display1"
          color="primary"
          className={classes.title}
        >
          Shared Items
        </Typography>
      )}

      <ItemGrid items={user.items} />
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    bio: PropTypes.string,
    email: PropTypes.string,
    fullname: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    borrowed: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default Profile;
