import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {searchCriteria, searchResults, navigation} from "./reducers";
import {publish} from './containers/publishPage/reducers';
import {subscriptions} from './containers/subscriptionsPage/reducers';


const rootReducer = combineReducers({searchCriteria, searchResults, subscriptions, navigation, publish});

const reduxLogger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, reduxLogger));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter >
            <App store={store} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
