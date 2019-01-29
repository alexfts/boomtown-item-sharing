import React, { Component, Fragment } from 'react';
import {
  TextField,
  Typography,
  Button,
  Grid,
  Select,
  Input,
  Checkbox,
  FormControl,
  ListItemText,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Form, Field, FormSpy } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloudDone from '@material-ui/icons/CloudDone';
import { Link } from 'react-router-dom';
import styles from './styles';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      checked: [],
      submitted: false,
      fileSelected: null
    };
  }

  getBase64Url = () => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  };

  applyTags = tags => {
    return (
      tags &&
      tags
        .filter(t => this.state.checked.indexOf(t.title) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  };

  dispatchUpdate = (values, tags, updateNewItem) => {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        });
      });
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  };

  onSubmit = values => {
    console.log(values);
    console.log(this.state.checked);
    this.setState({ submitted: true });
  };

  handleSelectTags = event => {
    this.setState({ checked: event.target.value });
  };

  handleSelectFile = event => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  closeModal = () => {
    this.setState({ submitted: false });
    // @TODO clear form
  };

  generateTagsText = (tags, selected) => {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  };

  render() {
    const {
      classes,
      tags,
      fullScreen,
      updateItem,
      resetItem,
      resetImage
    } = this.props;
    const tagNames = tags.map(({ title }) => title);

    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  if (values) {
                    console.log('VALUES', values);
                    this.dispatchUpdate(values, tags, updateItem);
                  }
                  return '';
                }}
              />
              <Grid
                container
                direction="column"
                alignItems="stretch"
                justify="space-between"
                spacing={24}
              >
                <Grid item>
                  <Typography
                    variant="display1"
                    color="secondary"
                    className={classes.title}
                  >
                    Share. Borrow. Prosper.{' '}
                  </Typography>
                </Grid>
                <Grid item>
                  <Field
                    name="imageurl"
                    render={({ input, meta }) => (
                      <Fragment>
                        <input
                          {...input}
                          accept="image/*"
                          id="file-upload-input"
                          type="file"
                          ref={this.fileInput}
                          onChange={this.handleSelectFile}
                          hidden
                        />
                        {!this.state.fileSelected ? (
                          <label htmlFor="file-upload-input" fullwidth="true">
                            <Button
                              variant="contained"
                              component="span"
                              color="primary"
                              className={classes.formItem}
                            >
                              Select an image
                            </Button>
                          </label>
                        ) : (
                          <Button
                            variant="contained"
                            component="span"
                            className={classes.formItem}
                            onClick={() => {
                              this.fileInput.current.value = '';
                              this.setState({ fileSelected: null });
                              resetImage();
                            }}
                          >
                            Reset image
                          </Button>
                        )}
                      </Fragment>
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="title"
                    render={({ input, meta }) => (
                      <TextField {...input} label="Name your item" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="description"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        placeholder="Describe your item"
                        multiline
                        rows="4"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="select-multiple-checkbox">
                      Tags
                    </InputLabel>
                    <Select
                      multiple
                      value={this.state.checked}
                      onChange={this.handleSelectTags}
                      input={<Input id="select-multiple-checkbox" />}
                      renderValue={selected => selected.join(', ')}
                    >
                      {tags.map(tag => (
                        <MenuItem key={tag.id} value={tag.title}>
                          <Checkbox
                            checked={this.state.checked.indexOf(tag.title) > -1}
                          />
                          <ListItemText primary={tag.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Share{' '}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
        <Dialog
          fullScreen={fullScreen}
          open={this.state.submitted}
          onClose={this.closeModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div>
              <CloudDone />
            </div>
            {'Your item was added!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You may add another item if you like. To add another item click
              'Add another item'. To view your item, click 'Back to items page'.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              Add another item
            </Button>
            <Button component={Link} to="/" color="secondary" autoFocus>
              Back to items page
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateItem: item => dispatch(updateItem(item)),
  resetItem: () => dispatch(resetItem()),
  resetImage: () => dispatch(resetImage())
});

export default connect(
  null,
  mapDispatchToProps
)(withMobileDialog()(withStyles(styles)(ShareItemForm)));
