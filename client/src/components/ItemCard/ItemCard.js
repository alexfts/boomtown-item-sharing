import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
import Gravatar from 'react-gravatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid } from '@material-ui/core';

const styles = {
  card: {},
  media: {
    minHeight: 160
  },
  avatar: {
    paddingRight: 20
  },
  userInfo: {
    marginBottom: 20
  }
};

const ItemCard = ({ classes, item }) => (
  <Card className={classes.card}>
    <CardMedia className={classes.media} image={item.imageurl} />
    <CardContent>
      <Grid container className={classes.userInfo}>
        <Grid item className={classes.avatar}>
          <Avatar>
            <Gravatar email={item.itemowner.email} />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="subheading">
            {item.itemowner.fullname}
          </Typography>
          <Typography variant="caption"> {item.created} </Typography>
        </Grid>
      </Grid>
      <Typography variant="headline">{item.title}</Typography>
      <Typography variant="caption">
        {item.tags.map(({ title }) => title).join(', ')}
      </Typography>
      <Typography>{item.description}</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained">Borrow</Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(ItemCard);

// <Card className={classes.card}>
// <CardMedia
//   image="https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg"
//   title="Contemplative Reptile"
// />
//
// </Card>
