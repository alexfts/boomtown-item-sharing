import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
import Gravatar from 'react-gravatar';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  card: {},
  media: {
    width: '100%',
    overflow: 'hidden'
  },
  avatarContainer: {
    paddingRight: 20
  },
  userInfo: {
    marginBottom: 20
  },
  avatar: {
    height: '50px',
    width: '50px'
  },
  title: {
    marginTop: '30px',
    marginBottom: '10px'
  },
  borrowButton: {
    marginTop: '10px',
    marginBottom: '15px',
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: 'none'
  }
};

const ItemCard = ({ classes, item }) => (
  <Card className={classes.card}>
    <ButtonBase component={Link} to={`/profile/${item.itemowner.id}`}>
      <div>
        <img className={classes.media} src={item.imageurl} />
        <Grid container className={classes.userInfo}>
          <Grid item className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <Gravatar email={item.itemowner.email} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              {item.itemowner.fullname}
            </Typography>
            <Typography variant="caption"> {item.created} </Typography>
          </Grid>
        </Grid>
      </div>
    </ButtonBase>

    <CardContent>
      <Typography variant="h5" className={classes.title}>
        {item.title}
      </Typography>
      <Typography variant="caption">
        {item.tags.map(({ title }) => title).join(', ')}
      </Typography>
      <Typography variant="body1">{item.description}</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" className={classes.borrowButton}>
        Borrow
      </Button>
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
