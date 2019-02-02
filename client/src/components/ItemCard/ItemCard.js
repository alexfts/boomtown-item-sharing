import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import Gravatar from 'react-gravatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ViewerContext } from '../../context/ViewerProvider';
import countTimeAgo from './helpers/countTimeAgo';

const ItemCard = ({ classes, item }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Card className={classes.card}>
        <ButtonBase
          component={Link}
          to={`/profile/${item.itemowner.id}`}
          className={classes.buttonToProfile}
        >
          <div className={classes.buttonImage}>
            <CardMedia
              className={classes.media}
              image={
                item.imageurl ||
                'http://via.placeholder.com/500x300?text=No image provided'
              }
              title="Image title"
            />
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
                <Typography variant="caption" style={{ fontSize: '14px' }}>
                  {' '}
                  {countTimeAgo(item.created)}{' '}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </ButtonBase>

        <CardContent className={classes.cardContent}>
          <div className={classes.itemInfo}>
            <Typography variant="headline" className={classes.title}>
              {item.title}
            </Typography>
            <Typography variant="caption" className={classes.tags}>
              {item.tags.map(({ title }) => title).join(', ')}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '16px' }}>
              {item.description}
            </Typography>
          </div>
        </CardContent>
        {item.id && (
          <CardActions>
            <Button
              variant="contained"
              className={classes.borrowButton}
              disabled={item.itemowner.id === viewer.id}
            >
              Borrow
            </Button>
          </CardActions>
        )}
      </Card>
    )}
  </ViewerContext.Consumer>
);

ItemCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageurl: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    itemowner: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string
    })
  })
};

ItemCard.defaultProps = {
  item: {
    imageurl: 'http://via.placeholder.com/500x250?text=No image provided',
    itemowner: {
      fullname: 'Example',
      email: 'example@example.com'
    },
    title: 'No title provided',
    description: 'No description provided',
    tags: []
  }
};

export default withStyles(styles)(ItemCard);
