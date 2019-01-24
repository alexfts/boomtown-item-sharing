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
import ItemCard from '../../components/ItemCard';

const Profile = ({ classes, user }) => {
  if (!user) return <div />;
  const numShared = user.items.length;
  const numBorrowed = user.borrowed.length;
  const itemsOverview = num => (num === 1 ? `${num} Item` : `${num} Items`);
  return (
    <div>
      <Paper>
        <Grid container alignItems="center">
          <Avatar>
            <Gravatar email={user.email} />
          </Avatar>
          <Typography variant="display2">{user.fullname}</Typography>
        </Grid>
        <Typography variant="headline">{`${itemsOverview(
          numShared
        )} shared, ${itemsOverview(numBorrowed)} borrowed`}</Typography>
        <Typography>"{user.bio}"</Typography>
      </Paper>

      <Typography variant="headline">Shared Items</Typography>

      <Grid container spacing={24}>
        {user.items.map(item => (
          <Grid item sm={4} key={item.id}>
            <ItemCard classes={classes} item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
