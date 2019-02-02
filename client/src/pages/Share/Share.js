import React from 'react';
import { Grid } from '@material-ui/core';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => (
  <div className={classes.sharePage}>
    <Grid container spacing={40} justify="center">
      <Grid item sm={4} className={classes.shareComponent}>
        <ShareItemPreview />
      </Grid>
      <Grid item sm={4} className={classes.shareComponent}>
        <ShareItemForm tags={tags} />
      </Grid>
    </Grid>
  </div>
);

export default Share;
