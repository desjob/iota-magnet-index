import {
    SET_SEARCH_QUERY,
    SET_SEARCH_DATE_FROM,
    SET_SEARCH_DATE_UNTIL,
    SET_DATE_FILTER_VALUE,
    DIALOG_OPEN,
    DIALOG_CLOSE,
    SET_DIALOG_DATE_FROM,
    SET_DIALOG_DATE_UNTIL,
    SET_SEARCH_LIMIT,
    DEFAULT_SEARCH_LIMIT,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
} from './constants.js';

const initialStateSearchCriteria = {
    searchQuery: '',
    limit: DEFAULT_SEARCH_LIMIT,
    dateFrom: null,
    dateUntil: null,
    dateFilterValue: "",
    isDialogOpen: false,
    dialogDateFrom: null,
    dialogDateUntil: null,
}

export const searchCriteria = (state = initialStateSearchCriteria, action = {}) => {
    switch(action.type) {
        case SET_SEARCH_QUERY:
            return Object.assign({}, state, {searchQuery: action.payload});
        case SET_SEARCH_DATE_FROM:
            return Object.assign({}, state, {dateFrom: action.payload});
        case SET_SEARCH_DATE_UNTIL:
            return Object.assign({}, state, {dateUntil: action.payload});
        case SET_DATE_FILTER_VALUE:
            return Object.assign({}, state, {dateFilterValue: action.payload});
        case DIALOG_OPEN:
            return Object.assign({}, state, {isDialogOpen: true});
        case DIALOG_CLOSE:
            return Object.assign({}, state, {isDialogOpen: false});
        case SET_DIALOG_DATE_FROM:
            return Object.assign({}, state, {dialogDateFrom: action.payload});
        case SET_DIALOG_DATE_UNTIL:
            return Object.assign({}, state, {dialogDateUntil: action.payload});
        case SET_SEARCH_LIMIT:
            return Object.assign({}, state, {limit: action.payload});
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
