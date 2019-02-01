export default function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (/.*@.*\..*/.test(values.email) === false) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (values.hasOwnProperty('fullname') && !values.fullname) {
    errors.fullname = 'Required';
  }
  return errors;
}
