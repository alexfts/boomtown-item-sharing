import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Avatar
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
import ItemGrid from '../../components/ItemGrid';

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
          <Typography variant="display2">{user.fullname}</Typography>
        </Grid>
        <Typography variant="headline" className={classes.itemsOverview}>
          <span className={classes.itemCount}>{numShared}</span>{' '}
          {' ' + itemOrItems(numShared) + ' shared, '}
          <span className={classes.itemCount}>{numBorrowed + ' '}</span>{' '}
          {' ' + itemOrItems(numBorrowed) + ' borrowed.'}
        </Typography>
        <Typography variant="body1">"{user.bio}"</Typography>
      </Paper>

      <Typography variant="display1" color="primary" className={classes.title}>
        Shared Items
      </Typography>

      <ItemGrid classes={classes} items={user.items} />
    </div>
  );
};

export default Profile;
