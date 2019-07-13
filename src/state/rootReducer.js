import {combineReducers} from 'redux';

import {navigation} from "../containers/navigation/reducers";
import {searchCriteria, searchResults} from "../containers/searchPage/reducers";
import {publish} from '../containers/publishPage/reducers';
import {subscriptions} from '../containers/subscriptionsPage/reducers';
import {nodeConfig} from '../containers/nodeConfig/reducers';

export const rootReducer = combineReducers({searchCriteria, searchResults, subscriptions, navigation, publish, nodeConfig});