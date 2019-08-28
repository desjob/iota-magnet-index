import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import CustomDatesDialog from './customDatesDialog';
import { DEFAULT_SEARCH_LIMIT } from '../containers/searchPage/constants.js';

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    formControl: {
        minWidth: 120,
        marginRight: theme.spacing(2),
    },
    textField: {
        maxWidth: 80,
        marginRight: theme.spacing(2),
    },
    button: {
        marginLeft: "auto",
    },
}));

const FilterBar = ({
    onDateChangeFrom,
    onDateChangeUntil,
    dateFilterValue,
    setDateFilterValue,
    isDialogOpen,
    openDialog,
    closeDialog,
    setDialogDateFrom,
    setDialogDateUntil,
    dialogDateFrom,
    dialogDateUntil,
    setSearchLimit,
    limit,
}) => {
    const classes = useStyles();

    const onDateFilterChange = (event) => {
        var dateFrom = new Date();
        const dateUntil = new Date();
        
        switch (event.target.value){
            case "hour" :
                dateFrom.setMinutes(dateFrom.getMinutes() - 60);
                break;
            case "day" :
                dateFrom.setMinutes(dateFrom.getMinutes() - 1440);
                break;
            case "week" :
                dateFrom.setDate(dateFrom.getDate() - 7);
                break;
            case "month":
                dateFrom.setMonth(dateFrom.getMonth() - 1);
                break;
            case "year":
                dateFrom.setFullYear(dateFrom.getFullYear() - 1);
                break;
            case "custom":
                openDialog();
                return;
            default:
                dateFrom = null;
                break;
        }
    
        setDateFilterValue(event.target.value);
        onDateChangeFrom(dateFrom);
        onDateChangeUntil(dateUntil);
    }

    const onSetSearchLimit = (event) => {
        setSearchLimit(event.target.value);
    }

    const onResetFilters = () => {
        setDateFilterValue("");
        onDateChangeFrom(null);
        onDateChangeUntil(null);
        setSearchLimit(DEFAULT_SEARCH_LIMIT);
    }

    return (
        <Box 
            bgcolor="grey.200" 
            borderRadius="borderRadius"
            className={classes.box}
        >
            <TextField
                id="limit"
                label="Limit"
                value={limit}
                onChange={onSetSearchLimit}
                type="number"
                className={classes.textField}
                variant="outlined"
            />
            <FormControl 
                variant="outlined" 
                className={classes.formControl}
            >
                <InputLabel>Date filter</InputLabel>
                <Select
                    value={dateFilterValue}
                    onChange={onDateFilterChange}
                    input={<OutlinedInput name="dateFilter" id="dateFilter" labelWidth={70} />}
                    autoWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="hour">Last hour</MenuItem>
                    <MenuItem value="day">Last 24 hours</MenuItem>
                    <MenuItem value="week">Last 7 days</MenuItem>
                    <MenuItem value="month">Last month</MenuItem>
                    <MenuItem value="year">Last year</MenuItem>
                    <MenuItem value="custom">Custom dates</MenuItem>
                </Select>
            </FormControl>
            <CustomDatesDialog 
                    onDateChangeFrom={onDateChangeFrom}
                    onDateChangeUntil={onDateChangeUntil}
                    isDialogOpen={isDialogOpen}
                    closeDialog={closeDialog}
                    setDialogDateFrom={setDialogDateFrom}
                    setDialogDateUntil={setDialogDateUntil}
                    dialogDateFrom={dialogDateFrom}
                    dialogDateUntil={dialogDateUntil}
                    setDateFilterValue={setDateFilterValue}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={onResetFilters}
                className={classes.button}
                >Reset filters
            </Button>
        </Box>
    )
}

export default FilterBar;
