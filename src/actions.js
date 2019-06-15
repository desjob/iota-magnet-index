import {
    SET_SEARCH_QUERY,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    SEARCH_FAIL
} from './constants.js';

export const setSearchQuery = (text) => ({
    type: SET_SEARCH_QUERY,
    payload: text
});

export const performSearch = () => (dispatch, getState) => {

    dispatch({type: SEARCH_PENDING});

    const {searchCriteria, searchIndex} = getState();

    const search = {
        field: "title",
        query: searchCriteria.searchQuery,
        suggest: true,
        limit: searchCriteria.limit
    }

    if(searchCriteria.dateFrom !== null){
        search.where = (item) => {
            return item.date >= searchCriteria.dateFrom
                && item.date <= searchCriteria.dateUntil
        };
    }
    else {
        search.where = (item) => {
            return item.date <= searchCriteria.dateUntil
        };
    }

    searchIndex.index.search(search)
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
}