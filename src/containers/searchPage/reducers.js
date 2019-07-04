import {
    SET_SEARCH_QUERY,
    SET_SEARCH_DATE_FROM,
    SET_SEARCH_DATE_UNTIL,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
} from './constants.js';

var initialDateUntil = new Date();
initialDateUntil.setHours(23, 59, 59, 999);

const initialStateSearchCriteria = {
    searchQuery: '',
    limit: 100,
    dateFrom: null,
    dateUntil: initialDateUntil
}

export const searchCriteria = (state = initialStateSearchCriteria, action = {}) => {
    switch(action.type) {
        case SET_SEARCH_QUERY:
            return Object.assign({}, state, {searchQuery: action.payload});
        case SET_SEARCH_DATE_FROM:
            return Object.assign({}, state, {dateFrom: action.payload});
        case SET_SEARCH_DATE_UNTIL:
            return Object.assign({}, state, {dateUntil: action.payload});
        default:
            return state;
    }
}

const initialStateSearchResults = {
    isPending: false,
    results: [],
    error: ''
}

export const searchResults = (state = initialStateSearchResults, action = {}) => {
    switch(action.type) {
        case SEARCH_PENDING:
            return Object.assign({}, state, {isPending: true});
        case SEARCH_SUCCESS:
            return Object.assign({}, state, {results: action.payload, isPending: false});
        case SEARCH_FAIL:
            return Object.assign({}, state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}
