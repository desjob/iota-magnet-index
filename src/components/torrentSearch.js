import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './torrentSearch.css';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 120,
    }
}));

const TorrentSearch = ({
    searchQuery,
    onSearchChange,
    onSubmitSearch,
    onDateChangeFrom,
    onDateChangeUntil,
    dateFilterValue,
    setDateFilterValue
}) => {
    const classes = useStyles();

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmitSearch();
        }
    }

    const onDateFilterChange = (event) => {
        setDateFilterValue(event.target.value);
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
                dateFrom.setDate(dateFrom.getDate() - 6);
                break;
            case "month":
                dateFrom.setMonth(dateFrom.getMonth() - 1);
                break;
            case "year":
                dateFrom.setFullYear(dateFrom.getFullYear() - 1);
                break;
            case "custom":
                //set dialog state to open
                return;
            default:
                dateFrom = null;
                break;
        }

        onDateChangeFrom(dateFrom);
        onDateChangeUntil(dateUntil);
    }

    return (
        <div>
            <div className="margins">
                <TextField
                    value={searchQuery}
                    type='search'
                    id="search"
                    label="Search torrents"
                    placeholder="Search on title or leave empty to browse all results"
                    onChange={onSearchChange}
                    onKeyPress={onKeyPress}
                    variant="outlined"
                    className="wide"
                />
            </div>
            <div className="margins">
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
            </div>
            <div>{/* 
            Include new dialog component with daterangepicker
            Default state is closed
            Set dateFrom and DateUntil when user clicks Save
                set the time dateFrom to 00:00
                set the time dateUntil to 23:59
            Set dialog state to closed when user clicks Save
            */}</div>
            <div className="margins">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onSubmitSearch}
                >Search
                    </Button>
            </div>
        </div>
    );
}

export default TorrentSearch;