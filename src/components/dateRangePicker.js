import React, { Fragment } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  date: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  }
}));

const DateRangePicker = ({ 
  setDialogDateFrom, 
  dialogDateFrom, 
  setDialogDateUntil,
  dialogDateUntil,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          inputVariant="outlined"
          autoOk
          disableFuture
          label="Date from"
          value={dialogDateFrom}
          onChange={date => setDialogDateFrom(date)}
          format="dd/MM/yyyy"
          placeholder="dd/MM/yyyy"
          className={classes.date}
        />
        <KeyboardDatePicker
          variant="inline"
          inputVariant="outlined"
          autoOk
          disableFuture
          label="Date until"
          value={dialogDateUntil}
          onChange={date => setDialogDateUntil(date)}
          format="dd/MM/yyyy"
          placeholder="dd/MM/yyyy"
          className={classes.date}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default DateRangePicker;