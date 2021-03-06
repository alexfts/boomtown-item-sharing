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
import styles from './styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloudDone from '@material-ui/icons/CloudDone';
import { Link } from 'react-router-dom';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';
import validate from './helpers/validation';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      selectedTags: [],
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

  componentWillUnmount = () => {
    this.resetForm();
  };

  applyTags = tags => {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.title) > -1)
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

  onSubmit = async (values, addItem) => {
    this.setState({ submitted: true });
    const item = {
      title: values.title,
      description: values.description,
      tags: this.applyTags(this.props.tags)
    };
    addItem({ variables: { item, image: this.state.fileSelected } });
  };

  handleSelectTags = event => {
    this.setState({ selectedTags: event.target.value });
  };

  handleSelectFile = event => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  resetForm = form => {
    this.setState({ submitted: false, selectedTags: [] });
    form && form.reset();
    this.clearSelectedFile();
    this.props.resetItem();
  };

  clearSelectedFile = () => {
    this.fileInput.current.value = '';
    this.setState({ fileSelected: null });
    this.props.resetImage();
  };

  generateTagsText = (tags, selected) => {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  };

  render() {
    const { classes, tags, fullScreen, updateItem } = this.props;

    return (
      <Mutation mutation={ADD_ITEM_MUTATION}>
        {addItem => (
          <div>
            <Form
              onSubmit={values => this.onSubmit(values, addItem)}
              validate={values => {
                return validate(
                  values,
                  this.state.selectedTags,
                  this.state.fileSelected
                );
              }}
              render={({
                handleSubmit,
                form,
                pristine,
                submitting,
                invalid
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
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
                      <Grid item className={classes.titleContainer}>
                        <Typography
                          variant="display1"
                          color="secondary"
                          className={classes.title}
                        >
                          Share. Borrow. Prosper.
                        </Typography>
                      </Grid>
                      <Grid item className={classes.imageButton}>
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
                                <label
                                  htmlFor="file-upload-input"
                                  fullwidth="true"
                                >
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
                                  onClick={this.clearSelectedFile}
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
                            <Fragment>
                              <TextField
                                {...input}
                                label="Name your item"
                                fullWidth
                              />
                              {meta.touched &&
                                meta.invalid && (
                                  <Typography className={classes.error}>
                                    {meta.error}
                                  </Typography>
                                )}
                            </Fragment>
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          name="description"
                          render={({ input, meta }) => (
                            <Fragment>
                              <TextField
                                {...input}
                                placeholder="Describe your item"
                                multiline
                                rows="4"
                                fullWidth
                              />
                              {meta.touched &&
                                meta.invalid && (
                                  <Typography className={classes.error}>
                                    {meta.error}
                                  </Typography>
                                )}
                            </Fragment>
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="select-multiple-checkbox">
                            Add some tags
                          </InputLabel>
                          <Select
                            multiple
                            value={this.state.selectedTags}
                            onChange={this.handleSelectTags}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                          >
                            {tags.map(tag => (
                              <MenuItem key={tag.id} value={tag.title}>
                                <Checkbox
                                  checked={
                                    this.state.selectedTags.indexOf(tag.title) >
                                    -1
                                  }
                                />
                                <ListItemText primary={tag.title} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={pristine || submitting || invalid}
                        >
                          Share
                        </Button>
                      </Grid>
                    </Grid>
                    <Dialog
                      fullScreen={fullScreen}
                      open={this.state.submitted}
                      onClose={() => this.resetForm(form)}
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
                          You may add another item if you like. To add another
                          item click 'Add another item'. To view your item,
                          click 'Back to items page'.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => this.resetForm(form)}
                          color="primary"
                        >
                          Add another item
                        </Button>
                        <Button
                          component={Link}
                          to="/"
                          color="secondary"
                          autoFocus
                          onClick={() => this.resetForm(form)}
                        >
                          Back to items page
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </form>
                );
              }}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string
    })
  ).isRequired,
  fullScreen: PropTypes.bool,
  updateItem: PropTypes.func.isRequired,
  resetItem: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateItem: item => dispatch(updateItem(item)),
  resetItem: () => {
    return dispatch(resetItem());
  },
  resetImage: () => dispatch(resetImage())
});

export default connect(
  null,
  mapDispatchToProps
)(withMobileDialog()(withStyles(styles)(ShareItemForm)));
