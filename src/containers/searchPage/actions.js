import {
    SET_SEARCH_QUERY,
    SET_SEARCH_DATE_FROM,
    SET_SEARCH_DATE_UNTIL,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
} from './constants.js';

export const setSearchQuery = (text) => ({
    type: SET_SEARCH_QUERY,
    payload: text
});

export const performSearch = () => (dispatch, getState) => {

    dispatch({type: SEARCH_PENDING});

    const {searchCriteria, subscriptions} = getState();

    const search = {
        field: "title",
        query: searchCriteria.searchQuery,
        suggest: true,
        limit: searchCriteria.limit
    }

    if(searchCriteria.dateFrom !== null){
        search.where = (item) => {
            return item.date >= searchCriteria.dateFrom.valueOf()
                && item.date <= searchCriteria.dateUntil.valueOf()
        };
    }
    else {
        search.where = (item) => {
            return item.date <= searchCriteria.dateUntil.valueOf()
        };
    }

    setTimeout(() => {
        subscriptions.index.search(search)
        .then((results) => {
            var resultsByDate = results.sort( (a, b) => {
                a = new Date(a.date);
                b = new Date(b.date);
                return a>b ? -1 : a<b ? 1 : 0;
            });

            dispatch({type: SEARCH_SUCCESS, payload: resultsByDate})
        })
        .catch(error => {
            dispatch({type: SEARCH_FAIL, payload: error})
        });
    }, 1500);
}

export const setFromDate = (date) => {

    if (date != null) {
        date.setHours(0,0,0,0);
    }

    return {
        type: SET_SEARCH_DATE_FROM,
        payload: date
    }
};

export const setUntilDate = (date) => {

    if (date != null) {
        date.setHours(23, 59, 59, 999);
    }

    return {
        type: SET_SEARCH_DATE_UNTIL,
        payload: date
    }
};