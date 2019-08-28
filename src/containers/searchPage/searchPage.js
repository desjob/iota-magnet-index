import React, { useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Divider from '@material-ui/core/Divider';

import TorrentSearch from '../../components/torrentSearch/torrentSearch';
import ResultList from '../../components/resultList';
import Message from '../../components/message';
import Loader from '../../components/loader';
import {
    setSearchQuery,
    setFromDate,
    setUntilDate,
    performSearch,
    setDateFilterValue,
    openDialog,
    closeDialog,
    setDialogDateFrom,
    setDialogDateUntil,
    setSearchLimit,
} from './actions';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(2),
    },
}));

const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchCriteria.searchQuery,
        limit: state.searchCriteria.limit,
        results: state.searchResults.results,
        isPending: state.searchResults.isPending,
        dateFilterValue: state.searchCriteria.dateFilterValue,
        isDialogOpen: state.searchCriteria.isDialogOpen,
        dialogDateFrom: state.searchCriteria.dialogDateFrom,
        dialogDateUntil: state.searchCriteria.dialogDateUntil,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchQuery(event.target.value)),
        onSubmitSearch: () => dispatch(performSearch()),
        onDateChangeFrom: (date) => dispatch(setFromDate(date)),
        onDateChangeUntil: (date) => dispatch(setUntilDate(date)),
        setDateFilterValue: (value) => dispatch(setDateFilterValue(value)),
        openDialog: () => dispatch(openDialog()),
        closeDialog:() => dispatch(closeDialog()),
        setDialogDateFrom: (date) => dispatch(setDialogDateFrom(date)),
        setDialogDateUntil: (date) => dispatch(setDialogDateUntil(date)),
        setSearchLimit: (value) => dispatch(setSearchLimit(value)),
    }
};

const SearchPage = (props) => {
    
    const { searchQuery, onSearchChange, onSubmitSearch, results, onDateChangeFrom, onDateChangeUntil, isPending, dateFilterValue, setDateFilterValue, isDialogOpen, openDialog, closeDialog, dialogDateFrom, dialogDateUntil, setDialogDateFrom, setDialogDateUntil, setSearchLimit, limit } = props;

    useEffect(() => {
        onSubmitSearch();
    }, [onSubmitSearch]);
    
    const classes = useStyles();

    return (
        <div>
            <TorrentSearch
                className='center'
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSubmitSearch={onSubmitSearch}
                onDateChangeFrom={onDateChangeFrom}
                onDateChangeUntil={onDateChangeUntil}
                dateFilterValue={dateFilterValue}
                setDateFilterValue={setDateFilterValue}
                isDialogOpen={isDialogOpen}
                openDialog={openDialog}
                closeDialog={closeDialog}
                setDialogDateFrom={setDialogDateFrom}
                setDialogDateUntil={setDialogDateUntil}
                dialogDateFrom={dialogDateFrom}
                dialogDateUntil={dialogDateUntil}
                setSearchLimit={setSearchLimit}
                limit={limit}
            />
            <Divider variant="middle" className={classes.divider}/>
            <br/>
            { 
                isPending === true ?
                    <Loader></Loader>
                    :
                    results.length === 0 ?
                        <Message>No results found.</Message>
                        :
                        <ResultList
                            results={results}
                        />
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);