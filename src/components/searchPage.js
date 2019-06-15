import React from 'react';
import TorrentSearch from './torrentSearch';
import ResultList from './resultList';
import Divider from '@material-ui/core/Divider';
import Message from './message';

const SearchPage = ({
    searchQuery,
    onSearchChange,
    onSubmitSearch,
    onKeyPress,
    onDateChangeFrom,
    onDateChangeUntil,
    onClickSevenDays,
    dateValueFrom,
    dateValueUntil,
    results
}) => {
    return (
        <div>
            <TorrentSearch
                className='center'
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSubmitSearch={onSubmitSearch}
                onKeyPress={onKeyPress}
                onDateChangeFrom={onDateChangeFrom}
                dateValueFrom={dateValueFrom}
                onDateChangeUntil={onDateChangeUntil}
                dateValueUntil={dateValueUntil}
                onClickSevenDays={onClickSevenDays}
            />
            <Divider variant="middle" />
            <br />
            { results.length === 0 ?
                <Message>No results yet.</Message>
                :
                <ResultList
                results={results}
                />
            }
        </div>
    );
}

export default SearchPage;