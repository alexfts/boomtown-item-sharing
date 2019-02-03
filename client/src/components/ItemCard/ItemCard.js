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
import countTimeAgo from './helpers/countTimeAgo';
import { graphql, compose } from 'react-apollo';
import {
  ALL_ITEMS_QUERY,
  BORROW_MUTATION,
  RETURN_MUTATION,
  ALL_USER_ITEMS_QUERY
} from '../../apollo/queries';

const ItemCard = ({
  classes,
  item,
  borrowMutation,
  returnMutation,
  viewer
}) => (
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
          disabled={
            item.itemowner.id === viewer.id ||
            (item.borrower && item.borrower.id !== viewer.id)
          }
          onClick={() => {
            const variables = {
              itemid: item.id
            };
            if (!item.borrower) {
              borrowMutation({ variables });
            } else if (item.borrower && item.borrower.id === viewer.id) {
              returnMutation({ variables });
            }
          }}
        >
          {item.borrower && item.borrower.id === viewer.id
            ? 'Return'
            : 'Borrow'}
        </Button>
      </CardActions>
    )}
  </Card>
);

ItemCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageurl: PropTypes.string,
    created: PropTypes.number,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string
      })
    ),
    itemowner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string
    })
  }).isRequired,
  classes: PropTypes.object,
  borrowMutation: PropTypes.func.isRequired,
  returnMutation: PropTypes.func.isRequired,
  viewer: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

ItemCard.defaultProps = {
  item: {
    imageurl: 'http://via.placeholder.com/500x250?text=No image provided',
    itemowner: {
      id: '0',
      fullname: 'Example',
      email: 'example@example.com'
    },
    title: 'No title provided',
    description: 'No description provided',
    tags: []
  }
};

export default compose(
  graphql(BORROW_MUTATION, {
    options: props => ({
      refetchQueries: [
        {
          query: ALL_ITEMS_QUERY
        }
      ],
      fetchPolicy: 'network-only'
    }),
    name: 'borrowMutation'
  }),
  graphql(RETURN_MUTATION, {
    options: props => ({
      refetchQueries: [
        {
          query: ALL_USER_ITEMS_QUERY,
          variables: { id: props.viewer.id }
        }
      ],
      fetchPolicy: 'network-only'
    }),
    name: 'returnMutation'
  }),
  withStyles(styles)
)(ItemCard);
