import React from 'react';
import TorrentSearch from '../components/torrentSearch';
import ResultList from '../components/resultList';
import Divider from '@material-ui/core/Divider';
import Message from '../components/message';
import Loader from '../components/loader';

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
    results,
    isPending
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
            { 
                isPending === true ?
                <Loader></Loader>
                :
                results.length === 0 ?
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