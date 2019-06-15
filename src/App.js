import React from 'react';
import Navigation from './components/navigation';
import {Route, Switch} from "react-router-dom";
import './App.css';
import SearchPage from './components/searchPage';
import UploadPage from './components/uploadPage';
import {connect} from 'react-redux';
import {
    setSearchQuery,
    setFromDate,
    setUntilDate,
    performSearch,
    changeRoute,
    openNavBar,
    closeNavbar
} from './actions';

const mapStateToProps = (state) => {
    return {
        searchQuery: state.searchCriteria.searchQuery,
        index: state.searchIndex.index,
        dateFrom: state.searchCriteria.dateFrom,
        dateUntil: state.searchCriteria.dateUntil,
        limit: state.searchCriteria.limit,
        results: state.searchResults.results,
        navOpen: state.navigation.navOpen,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchQuery(event.target.value)),
        onSubmitSearch: () => dispatch(performSearch()),
        onRouteChange: (route) => dispatch(changeRoute(route)),
        handleDrawerOpen: () => dispatch(openNavBar()),
        handleDrawerClose: () => dispatch(closeNavbar()),
        onDateChangeFrom: (date) => dispatch(setFromDate(date)),
        onDateChangeUntil: (date) => dispatch(setUntilDate(date)),
    }
};

class App extends React.Component {

    renderSearchPage = () => {
        const {searchQuery, onSearchChange, onSubmitSearch, dateFrom, dateUntil, results, onDateChangeFrom, onDateChangeUntil} = this.props;

        return (
            <SearchPage
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSubmitSearch={onSubmitSearch}
                onDateChangeFrom={onDateChangeFrom}
                dateValueFrom={dateFrom}
                onDateChangeUntil={onDateChangeUntil}
                dateValueUntil={dateUntil}
                results={results}
            />
        );
    }

    renderUploadPage = () =>  {
        return (
            <UploadPage/>
        );
    }

    render() {
        return (
            <div>
                <Navigation
                    handleDrawerOpen={this.props.handleDrawerOpen}
                    handleDrawerClose={this.props.handleDrawerClose}
                    open={this.props.navOpen}
                    onRouteChange={this.props.onRouteChange}
                />
                <main role='main' className='App'>
                    <Switch>
                        <Route exact path="/" component={this.renderSearchPage}/>
                        <Route path="/search" component={this.renderSearchPage}/>
                        <Route path="/upload" component={this.renderUploadPage}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
