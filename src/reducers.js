import {
    SET_SEARCH_QUERY,
    SET_SEARCH_DATE_FROM,
    SET_SEARCH_DATE_UNTIL,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    CHANGE_ROUTE,
    OPEN_NAVBAR,
    CLOSE_NAVBAR
} from './constants.js';

import FlexSearch from "flexsearch";

var initialDateUntil = new Date();
initialDateUntil.setHours(0, 0, 0, 0);

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

var index = new FlexSearch({
    encode: "balance",
    tokenize: "strict",
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

var doc1 = {
    id: 1,
    title: "Game of Thrones season 1 episode 3",
    url: "magnet:?xt=bla",
    date: new Date("2019-06-05 00:00:00")
}

var doc2 = {
    id: 2,
    title: "Game of Thrones season 8 ep 5",
    url: "magnet:?xt=blb",
    date: new Date("2019-05-29 00:00:00")

}

var doc3 = {
    id: 3,
    title: "Game of Thrones season 8 episode 5",
    url: "magnet:?xt=bla",
    date: new Date("2019-05-30 00:00:00")

}

index.add([doc1, doc2, doc3]);

const initialStateSearchIndex = {
    index: index
}

export const searchIndex = (state = initialStateSearchIndex, action = {}) => {
    switch(action) {
        default:
            return state;
    }
}

const initialStateNavigation = {
    route: 'Search',
    navOpen: false
}

export const navigation = (state = initialStateNavigation, action = {}) => {

    switch(action.type) {
        case CHANGE_ROUTE:
            return Object.assign({}, state, {route: action.payload});

        case OPEN_NAVBAR:
            return Object.assign({}, state, {navOpen: true});

        case CLOSE_NAVBAR:
            return Object.assign({}, state, {navOpen: false});

        default:
            return state;
    }
}