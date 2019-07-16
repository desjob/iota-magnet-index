import React from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import SearchPage from './containers/searchPage/searchPage';
import PublishPage from './containers/publishPage/publishPage';
import SubscriptionsPage from './containers/subscriptionsPage/subscriptionsPage';
import AboutPage from './containers/aboutPage';
import DisclaimerPage from './containers/disclaimerPage';
import Navigation from "./containers/navigation/navigation";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: blue, //#2196f3
    secondary: orange, //#ff9100
  },
});

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
                <MuiThemeProvider theme={theme}>
                    <Navigation>
                        <div className='App'>
                            <Switch>
                                <Route exact path="/" component={this.renderSearchPage} />
                                <Route path="/search" component={this.renderSearchPage} />
                                <Route path="/subscriptions" component={this.renderSubscriptionsPage} />
                                <Route path="/publish" component={this.renderPublishPage} />
                                <Route path="/about" component={this.renderAboutPage} />
                                <Route path="/disclaimer" component={this.renderDisclaimerPage} />
                            </Switch>
                        </div>
                    </Navigation>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
