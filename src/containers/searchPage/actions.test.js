import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import * as types from './constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('searchPage actions', () => {
    it('should set from date', () => {
        const date = new Date();
        const expectedAction = {
          type: types.SET_SEARCH_DATE_FROM,
          payload: date
        }
        expect(actions.setFromDate(date)).toEqual(expectedAction);
    })

    it('should set until date', () => {
        const date = new Date();
        const expectedAction = {
          type: types.SET_SEARCH_DATE_UNTIL,
          payload: date
        }
        expect(actions.setUntilDate(date)).toEqual(expectedAction);
    })

    it('should set the value of the date filter', () => {
        const value = 'hour';
        const expectedAction = {
          type: types.SET_DATE_FILTER_VALUE,
          payload: value
        }
        expect(actions.setDateFilterValue(value)).toEqual(expectedAction);
    })

    it('should open the dialog', () => {
        const expectedAction = {
            type: types.DIALOG_OPEN
        }
        expect(actions.openDialog()).toEqual(expectedAction);
    })

    it('should close the dialog', () => {
        const expectedAction = {
            type: types.DIALOG_CLOSE
        }
        expect(actions.closeDialog()).toEqual(expectedAction);
    })

    it('should set the dialog date from to null', () => {
        const expectedAction = {
          type: types.SET_DIALOG_DATE_FROM,
          payload: null
        }
        expect(actions.setDialogDateFrom(null)).toEqual(expectedAction);
    })

    it('should set the dialog date from to date', () => {
        const dateExpected = new Date();
        dateExpected.setHours(0, 0, 0, 0);
        const expectedAction = {
          type: types.SET_DIALOG_DATE_FROM,
          payload: dateExpected
        }

        const date = new Date();
        expect(actions.setDialogDateFrom(date)).toMatchObject(expectedAction);
    })

    it('should set the dialog date until to null', () => {
        const expectedAction = {
          type: types.SET_DIALOG_DATE_UNTIL,
          payload: null
        }
        expect(actions.setDialogDateUntil(null)).toEqual(expectedAction);
    })

    it('should set the dialog date until to date', () => {
        const dateExpected = new Date();
        dateExpected.setHours(23, 59, 59, 999);
        const expectedAction = {
          type: types.SET_DIALOG_DATE_UNTIL,
          payload: dateExpected
        }

        const date = new Date();
        expect(actions.setDialogDateUntil(date)).toMatchObject(expectedAction);
    })

    it('should set the search limit', () => {
        const expectedAction = {
            type: types.SET_SEARCH_LIMIT
        }
        expect(actions.setSearchLimit()).toEqual(expectedAction);
    })

    describe('searchPage async actions', () => {
      
        it('creates SEARCH_PENDING and SEARCH_SUCCESS when performing a search', () => {

            const searchMock = jest.fn().mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve([]);
                });
            });

            var index = { search: searchMock }
        
            const expectedActions = [
                { type: types.SEARCH_PENDING },
                { type: types.SEARCH_SUCCESS, payload: [] }
            ]

            const store = mockStore({ 
                searchCriteria: {
                    searchQuery: ''
                },
                searchResults: {
                    results: []
                },
                subscriptions: {
                    index: index
                }
            })
      
            store.dispatch(actions.performSearch()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        })

        it('creates SEARCH_PENDING and SEARCH_FAIL when search fails', () => {

            const searchMock = jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject('Search failed');
                });
            });

            var index = { search: searchMock }
        
            const expectedActions = [
                { type: types.SEARCH_PENDING },
                { type: types.SEARCH_FAIL, payload: 'Search failed' }
            ]

            const store = mockStore({ 
                searchCriteria: {
                    searchQuery: ''
                },
                searchResults: {
                    results: []
                },
                subscriptions: {
                    index: index
                }
            })
      
            store.dispatch(actions.performSearch()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        })

    //set search query
    //perform search when search query is empty
    })
})