import {
    CHANGE_ROUTE,
    OPEN_NAVBAR,
    CLOSE_NAVBAR
} from './constants.js';

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