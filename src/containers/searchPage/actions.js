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
    if (text === '') 
    {
        return performSearch()(dispatch, getState);
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

    if (searchCriteria.dateFrom && searchCriteria.dateUntil) {
        search.where = (item) => {
            return item.date >= searchCriteria.dateFrom.valueOf()
                && item.date <= searchCriteria.dateUntil.valueOf()
        };
    }
    else if (searchCriteria.dateUntil) {
        search.where = (item) => {
            return item.date <= searchCriteria.dateUntil.valueOf()
        };
    }
    else if (searchCriteria.dateFrom) {
        search.where = (item) => {
            return item.date >= searchCriteria.dateFrom.valueOf()
        };
    }

    return subscriptions.index.search(search)
        .then((results) => {
            dispatch({type: SEARCH_SUCCESS, payload: results})
        })
        .catch(error => {
            dispatch({type: SEARCH_FAIL, payload: error})
        });
}

export const setFromDate = (date) => ({
    type: SET_SEARCH_DATE_FROM,
    payload: date
});

export const setUntilDate = (date) => ({
    type: SET_SEARCH_DATE_UNTIL,
    payload: date
});

export const setDateFilterValue = (value) => ({
    type: SET_DATE_FILTER_VALUE,
    payload: value
});

export const openDialog = () => ({
    type: DIALOG_OPEN
});

export const closeDialog = () => ({
    type: DIALOG_CLOSE
});

export const setDialogDateFrom = (date) => {
    if (date != null) {
        date.setHours(0, 0, 0, 0);
    }

    return {
        type: SET_DIALOG_DATE_FROM,
        payload: date
    }
}

export const setDialogDateUntil = (date) => {
    if (date != null) {
        date.setHours(23, 59, 59, 999);
    }

    return {
        type: SET_DIALOG_DATE_UNTIL,
        payload: date
    }
}

export const setSearchLimit = (value) => ({
    type: SET_SEARCH_LIMIT,
    payload: value
});
