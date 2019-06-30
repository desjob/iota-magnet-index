import {
    CHANGE_ROUTE,
    OPEN_NAVBAR,
    CLOSE_NAVBAR,
} from './constants.js';

export const changeRoute = (route) => ({
    type: CHANGE_ROUTE,
    payload: route
});

export const openNavBar = () => ({
    type: OPEN_NAVBAR
});

export const closeNavbar = () => ({
    type: CLOSE_NAVBAR
});
