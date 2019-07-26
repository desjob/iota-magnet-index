import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from '@material-ui/core/Box';

import './torrentSearch.css';
import CustomDatesDialog from './customDatesDialog';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 120,
    }
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
    dialogDateUntil,s
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

    return (
        <Box 
            display="block" 
            p={2} 
            m={2} 
            bgcolor="grey.200" 
            borderRadius="borderRadius"
        >
            <FormControl variant="outlined" className={classes.formControl}>
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
        </Box>
    )
}

export default FilterBar;