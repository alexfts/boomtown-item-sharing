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
  MenuItem
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }

  onSubmit = values => {
    console.log(values);
    console.log(this.state.checked);
  };

  handleChange = event => {
    this.setState({ checked: event.target.value });
  };

  render() {
    const { classes, tags } = this.props;
    const tagNames = tags.map(({ title }) => title);

    return (
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
                <Typography variant="display1" color="secondary">
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
    );
  }
}

export default withStyles(styles)(ShareItemForm);
