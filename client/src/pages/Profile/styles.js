const styles = theme => ({
  profile: {
    padding: `${theme.spacing.unit * 10}px`,
    paddingTop: `${theme.spacing.unit * 18}px`,
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    padding: `${theme.spacing.unit * 6}px`
  },
  bio: {
    fontSize: '16px',
    marginBottom: '32px'
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
    marginBottom: '5px',
    fontSize: '21px'
  },
  title: {
    marginTop: '48px',
    marginBottom: '12px'
  },
  name: {
    fontSize: '44px'
  }
});

export default styles;
