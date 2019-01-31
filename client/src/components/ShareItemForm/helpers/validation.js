export default function validate(values, checked, fileSelected) {
  const errors = {};
  if (!values.title || values.title === '') {
    errors.title = 'Required';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Required';
  }
  if (!checked || !(checked instanceof Array) || checked.length === 0) {
    errors.tags = 'Required';
  }
  if (!fileSelected) {
    errors.imageurl = 'Required';
  }
  return errors;
}
