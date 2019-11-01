import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function FindEventTextField({eventID, setEventID}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    eventID: '',
  });

  const handleChange = name => event => {
    setEventID(event.target.value)
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Event ID"
        className={classes.textField}
        value={values.eventID}
        onChange={handleChange('eventID')}
        margin="normal"
      />
    </form>
  );
}
