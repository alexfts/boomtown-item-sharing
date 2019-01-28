const styles = theme => ({
  profile: {
    padding: `${theme.spacing.unit * 10}px`,
    marginTop: 60,
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
    marginBottom: '15px'
  },
  title: {
    marginBottom: '20px'
  }
});

export default styles;
