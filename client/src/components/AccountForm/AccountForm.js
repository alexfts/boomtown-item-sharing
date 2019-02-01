import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';

import styles from './styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  onSubmit = async values => {
    const variables = {
      user: values
    };
    try {
      this.state.formToggle
        ? await this.props.loginMutation({ variables })
        : await this.props.signupMutation({ variables });
    } catch (e) {
      return {
        [FORM_ERROR]: this.state.formToggle
          ? 'Incorrect email and/or password'
          : 'An account with this email already exists.'
      };
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={values => validate(values, this.state.formToggle)}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          hasValidationErrors,
          hasSubmitErrors,
          submitError
        }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <Field
                  name="fullname"
                  render={({ input, meta }) => (
                    <Fragment>
                      <TextField
                        {...input}
                        label="Username"
                        id="fullname"
                        autoComplete="off"
                      />
                      {meta.touched &&
                        meta.invalid && (
                          <Typography className={classes.errorMessage}>
                            {meta.error}
                          </Typography>
                        )}
                    </Fragment>
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <Field
                name="email"
                render={({ input, meta }) => (
                  <Fragment>
                    <TextField
                      {...input}
                      id="email"
                      label="Email"
                      type="text"
                      autoComplete="off"
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <Typography className={classes.errorMessage}>
                          {meta.error}
                        </Typography>
                      )}
                  </Fragment>
                )}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <Field
                name="password"
                render={({ input, meta }) => (
                  <Fragment>
                    <TextField
                      {...input}
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="off"
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <Typography className={classes.errorMessage}>
                          {meta.error}
                        </Typography>
                      )}
                  </Fragment>
                )}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={submitting || pristine || hasValidationErrors}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      form.reset();
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            {hasSubmitErrors && (
              <Typography className={classes.errorMessage}>
                {submitError}
              </Typography>
            )}
          </form>
        )}
      />
    );
  }
}

// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
//export default withStyles(styles)(AccountForm);
const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
