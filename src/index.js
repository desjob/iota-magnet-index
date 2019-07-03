import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import Loader from './components/loader';
import * as serviceWorker from './serviceWorker';
import {rootReducer} from './state/rootReducer';
import {searchIndexTransform} from './state/transformers';

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
