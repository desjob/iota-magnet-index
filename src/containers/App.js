import React from 'react';
import Navigation from '../components/navigation';
import {Route, Switch} from "react-router-dom";
import './App.css';
import SearchPage from './searchPage/searchPage';
import PublishPage from './publishPage/publishPage';
import SubscriptionsPage from '../containers/subscriptionsPage/subscriptionsPage';
import AboutPage from './aboutPage';
import DisclaimerPage from './disclaimerPage';
import {connect} from 'react-redux';
import {
    changeRoute,
    openNavBar,
    closeNavbar
} from '../actions';

const mapStateToProps = (state) => {
    return {
        navOpen: state.navigation.navOpen,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRouteChange: (route) => dispatch(changeRoute(route)),
        handleDrawerOpen: () => dispatch(openNavBar()),
        handleDrawerClose: () => dispatch(closeNavbar()),
    }
};

class App extends React.Component {

    renderSearchPage = () => {
        return (
            <SearchPage/>
        );
    }

    renderSubscriptionsPage = () =>  {
        return (
            <SubscriptionsPage/>
        );
    }

    renderPublishPage = () =>  {
        return (
            <PublishPage/>
        );
    }

    renderAboutPage = () =>  {
        return (
            <AboutPage/>
        );
    }

    renderDisclaimerPage = () =>  {
        return (
            <DisclaimerPage/>
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
                        <Route path="/subscriptions" component={this.renderSubscriptionsPage}/>
                        <Route path="/publish" component={this.renderPublishPage}/>
                        <Route path="/about" component={this.renderAboutPage}/>
                        <Route path="/disclaimer" component={this.renderDisclaimerPage}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
