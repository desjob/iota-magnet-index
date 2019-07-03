import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createTransform } from 'redux-persist';
import FlexSearch from "flexsearch";

import App from './App';
import Loader from './components/loader';
import {navigation} from "./containers/navigation/reducers";
import {searchCriteria, searchResults} from "./containers/searchPage/reducers";
import {publish} from './containers/publishPage/reducers';
import {subscriptions} from './containers/subscriptionsPage/reducers';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({searchCriteria, searchResults, subscriptions, navigation, publish});

const searchIndexTransform = createTransform(

    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {

        //export documents only
        const documents = inboundState.index.where(() => true);

        return { ...inboundState, index: documents };
    },

    // transform state being rehydrated
    (outboundState, key) => {

        //@todo: move this code to a central place, now its double @ initial state reducer
        var index = new FlexSearch({
            encode: "balance",
            tokenize: "forward",
            threshold: 0,
            resolution: 3,
            depth: 4,
            async: true,
            doc: {
                id: "id",
                field: [
                    "title",
                    "date"
                ]
            }
        });

        //import documents
        index.add(outboundState.index);

        return { ...outboundState, index: index, foo: 'bar' };
    },

    // define which reducers this transform gets called for.
    { whitelist: ['subscriptions'] }
);


const persistConfig = {
    key: 'root',
    storage: storage,
    transforms: [searchIndexTransform],
    whitelist: ['subscriptions', 'publish', 'navigation']
};

const pReducer = persistReducer(persistConfig, rootReducer);
const reduxLogger = createLogger();
const store = createStore(pReducer, applyMiddleware(thunkMiddleware, reduxLogger));
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <HashRouter >
                <App store={store} />
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
