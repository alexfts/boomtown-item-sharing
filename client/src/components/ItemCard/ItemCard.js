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
import countDaysAgo from './helpers/countDaysAgo';

const styles = {
  card: {},
  media: {
    overflow: 'hidden',
    height: '200px'
  },
  cardImg: {
    width: '100%'
  },
  avatarContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  userInfo: {
    marginTop: 10,
    marginBottom: 20
  },
  avatar: {
    height: '50px',
    width: '50px'
  },
  name: {
    paddingBottom: '5px'
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
        <div className={classes.media}>
          <img
            className={classes.cardImg}
            src={
              item.imageurl ||
              'http://via.placeholder.com/350x250?text=Please select an image'
            }
          />
        </div>
        <Grid container className={classes.userInfo} alignItems="center">
          <Grid item className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <Gravatar email={item.itemowner.email} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="subheading" className={classes.name}>
              {item.itemowner.fullname}
            </Typography>
            <Typography variant="caption">
              {' '}
              {countDaysAgo(item.created)}{' '}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ButtonBase>

    <CardContent>
      <Typography variant="headline" className={classes.title}>
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
