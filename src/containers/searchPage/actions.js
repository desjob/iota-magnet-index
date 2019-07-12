import {
    SET_SEARCH_QUERY,
    SET_SEARCH_DATE_FROM,
    SET_SEARCH_DATE_UNTIL,
    SET_DATE_FILTER_VALUE,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
} from './constants.js';

export const setSearchQuery = (text) => (dispatch, getState) => {

    dispatch({
        type: SET_SEARCH_QUERY,
        payload: text
    });

    // when the query has been cleared, trigger a new search to show all results
    if (text === '') {
        performSearch()(dispatch, getState);
    }
}

export const performSearch = () => (dispatch, getState) => {

    dispatch({type: SEARCH_PENDING});

    const {searchCriteria, subscriptions} = getState();

    const search = {
        field: "title",
        query: searchCriteria.searchQuery,
        suggest: true,
        limit: searchCriteria.limit,
        sort: "negativeDate" // created an issue to find a better way to do this: https://github.com/nextapps-de/flexsearch/issues/103
    };

    // show all results when the query is empty. use specially indexed "all" field for this.
    // created an issue to find a better way to do this: https://github.com/nextapps-de/flexsearch/issues/102
    if (searchCriteria.searchQuery === '') {
        search.field = 'all';
        search.query = '1';
    }


    if (searchCriteria.dateFrom !== null && searchCriteria.dateUntil !== null) {
        search.where = (item) => {
            return item.date >= searchCriteria.dateFrom.valueOf()
                && item.date <= searchCriteria.dateUntil.valueOf()
        };
    }
    else if (searchCriteria.dateUntil !== null) {
        search.where = (item) => {
            return item.date <= searchCriteria.dateUntil.valueOf()
        };
    }
    else if (searchCriteria.dateFrom !== null) {
        search.where = (item) => {
            return item.date >= searchCriteria.dateFrom.valueOf()
        };
    }

    setTimeout(() => {
        subscriptions.index.search(search)
            .then((results) => {
                dispatch({type: SEARCH_SUCCESS, payload: results})
            })
            .catch(error => {
                dispatch({type: SEARCH_FAIL, payload: error})
            });
    }, 500);
}

export const setFromDate = (date) => {
    return {
        type: SET_SEARCH_DATE_FROM,
        payload: date
    }
}

export const setUntilDate = (date) => {
    return {
        type: SET_SEARCH_DATE_UNTIL,
        payload: date
    }
}

export const setDateFilterValue = (value) => {
    return {
        type: SET_DATE_FILTER_VALUE,
        payload: value
    }
}