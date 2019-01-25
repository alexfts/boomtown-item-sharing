import React, { Component } from 'react';
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

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(values) {
    console.log(values);
  }

  // @TODO multi-select
  // @TODO items
  render() {
    const tags = this.props.tags.map(({ title }) => title);
    console.log(tags);
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="stretch">
              <Typography variant="display1" color="secondary">
                Share. Borrow. Prosper.{' '}
              </Typography>
              <Field
                name="image"
                render={({ input, meta }) => (
                  <input
                    {...input}
                    accept="image/*"
                    id="file-upload-input"
                    type="file"
                  />
                )}
              />

              <Field
                name="name"
                render={({ input, meta }) => (
                  <TextField inputProps={input} placeholder="Name your item" />
                )}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <TextField
                    inputProps={input}
                    placeholder="Describe your item"
                    multiline
                    rows="4"
                  />
                )}
              />

              <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
              <Select
                multiple
                value={[]}
                input={<Input id="select-multiple-checkbox" />}
              >
                {this.props.tags.map(tag => (
                  <MenuItem key={tag.id} value={tag.title}>
                    <Checkbox />
                    <ListItemText primary={tag.title} />
                  </MenuItem>
                ))}
              </Select>
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

export default ShareItemForm;
