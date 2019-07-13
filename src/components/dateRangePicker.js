import React, { Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  date: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  }
}));

const DateRangePicker = ({ 
  onDateChangeFrom, 
  dateValueFrom, 
  onDateChangeUntil,
  dateValueUntil,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          clearable
          disableFuture
          label="Date from"
          value={dateValueFrom}
          onChange={onDateChangeFrom}
          placeholder="dd/MM/yyyy"
          format="dd/MM/yyyy"
          className={classes.date}
        />
        <KeyboardDatePicker
          autoOk
          clearable
          disableFuture
          label="Date until"
          value={dateValueUntil}
          onChange={onDateChangeUntil}
          placeholder="dd/MM/yyyy"
          format="dd/MM/yyyy"
          className={classes.date}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default DateRangePicker;