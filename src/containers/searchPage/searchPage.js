import React from 'react';
import TorrentSearch from '../../components/torrentSearch';
import ResultList from '../../components/resultList';
import Divider from '@material-ui/core/Divider';
import Message from '../../components/message';
import Loader from '../../components/loader';
import {connect} from 'react-redux';
import {
    setSearchQuery,
    setFromDate,
    setUntilDate,
    performSearch,
} from './actions';

const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchCriteria.searchQuery,
        dateFrom: state.searchCriteria.dateFrom,
        dateUntil: state.searchCriteria.dateUntil,
        limit: state.searchCriteria.limit,
        results: state.searchResults.results,
        isPending: state.searchResults.isPending
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchQuery(event.target.value)),
        onSubmitSearch: () => dispatch(performSearch()),
        onDateChangeFrom: (date) => dispatch(setFromDate(date)),
        onDateChangeUntil: (date) => dispatch(setUntilDate(date)),
    }
};

class SearchPage extends React.Component {

    componentDidMount() {
        this.props.onSubmitSearch();
    }

    render() {

        const {searchQuery,onSearchChange,onSubmitSearch,dateFrom,dateUntil,results,onDateChangeFrom,onDateChangeUntil,isPending} = this.props;

        return (
            <div>
                <TorrentSearch
                    className='center'
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                    onSubmitSearch={onSubmitSearch}
                    onDateChangeFrom={onDateChangeFrom}
                    dateValueFrom={dateFrom}
                    onDateChangeUntil={onDateChangeUntil}
                    dateValueUntil={dateUntil}
                />
                <Divider variant="middle"/>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);