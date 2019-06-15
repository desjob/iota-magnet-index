import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateRangePicker from "./dateRangePicker";
import './torrentSearch.css';

class TorrentSearch extends React.Component {

    onKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.onSubmitSearch();
        }
    }

    onClickSevenDays = () => {
        const dateUntil = new Date();
        dateUntil.setHours(0, 0, 0, 0);

        const dateMinusSeven = new Date();
        dateMinusSeven.setDate(dateMinusSeven.getDate()-6);
        dateMinusSeven.setHours(0, 0, 0, 0);

        this.props.onDateChangeFrom(dateMinusSeven);
        this.props.onDateChangeUntil(dateUntil);
    }

    render() {

        const {
            searchQuery,
            onSearchChange,
            onSubmitSearch,
            onDateChangeFrom,
            dateValueFrom,
            onDateChangeUntil,
            dateValueUntil,
        } = this.props;

        return (
            <div>
                <div className="margins">
                    <TextField
                        value={searchQuery}
                        type='search'
                        id="search"
                        label="Search torrents"
                        onChange={onSearchChange}
                        onKeyPress={this.onKeyPress}
                        variant="outlined"
                        className="wide"
                    />
                </div>
                <div className="margins">
                    <DateRangePicker
                        onDateChangeFrom={onDateChangeFrom}
                        dateValueFrom={dateValueFrom}
                        onDateChangeUntil={onDateChangeUntil}
                        dateValueUntil={dateValueUntil}
                        onClickSevenDays={this.onClickSevenDays}
                    />
                </div>
                <div className="margins">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmitSearch}
                    >Search
                    </Button>
                </div>
            </div>
        );
    }
}

export default TorrentSearch;