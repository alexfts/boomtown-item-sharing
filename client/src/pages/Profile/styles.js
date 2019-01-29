const styles = theme => ({
  profile: {
    padding: `${theme.spacing.unit * 10}px`,
    paddingTop: `${theme.spacing.unit * 18}px`,
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    padding: `${theme.spacing.unit * 6}px`,
    marginBottom: '50px'
  },
  avatar: {
    height: '50px',
    width: '50px',
    marginRight: '10px'
  },
  itemCount: {
    fontWeight: 600
  },
  itemsOverview: {
    marginTop: '15px',
    marginBottom: '15px',
    fontSize: '21px'
  },
  title: {
    marginBottom: '20px'
  },
  name: {
    fontSize: '44px'
  }
});

export default styles;
