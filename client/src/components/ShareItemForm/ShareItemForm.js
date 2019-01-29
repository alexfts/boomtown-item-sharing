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
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import CloudDone from '@material-ui/icons/CloudDone';
import { Link } from 'react-router-dom';
import styles from './styles';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      submitted: false
    };
  }

  onSubmit = values => {
    console.log(values);
    console.log(this.state.checked);
    this.setState({ submitted: true });
  };

  handleChange = event => {
    this.setState({ checked: event.target.value });
  };

  closeModal = () => {
    this.setState({ submitted: false });
    // @TODO clear form
  };

  render() {
    const { classes, tags, fullScreen } = this.props;
    const tagNames = tags.map(({ title }) => title);

    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
                    name="image"
                    render={({ input, meta }) => (
                      <Fragment>
                        <input
                          {...input}
                          accept="image/*"
                          id="file-upload-input"
                          type="file"
                          hidden
                        />
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
                      </Fragment>
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <TextField
                        inputProps={input}
                        placeholder="Name your item"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="description"
                    render={({ input, meta }) => (
                      <TextField
                        inputProps={input}
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
                      onChange={this.handleChange}
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

export default withMobileDialog()(withStyles(styles)(ShareItemForm));
