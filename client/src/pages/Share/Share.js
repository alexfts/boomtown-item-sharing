import React from 'react';
import { Grid } from '@material-ui/core';
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 
  and upload an image.

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.sharePage}>
      <Grid container spacing={40} justify="space-around">
        <Grid item>
          <ShareItemPreview />
        </Grid>
        <Grid item>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Share;
