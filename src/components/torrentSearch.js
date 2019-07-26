import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterBar from './filterBar';

const TorrentSearch = ({
    searchQuery,
    onSearchChange,
    onSubmitSearch,
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
}) => {

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmitSearch();
        }
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
            <FilterBar 
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
            />
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