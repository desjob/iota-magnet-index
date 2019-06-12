import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { HashRouter } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <HashRouter >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
        </MuiPickersUtilsProvider>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
